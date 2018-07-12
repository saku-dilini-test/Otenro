/**
 * Created by thusithz on 5/3/16.
 */
/**
 * ApplicationController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


var dateFormat = require('dateformat');
var config = require('../../services/config');
var operator = [];

var ObjectId = require('mongodb').ObjectID;
module.exports = {



    insertReconciliationDailySummary: function () {

        var date = new Date();
        date.setDate(date.getDate() -1);

        PublishDetails.find().exec(function(err, publishDetailsData){

            if (err) return done(err);

            publishDetailsData.forEach(function(publishDetails) {

                Application.findOne({id:publishDetails.appId}).
                exec(function(error, applicationData) {

                    User.findOne({id: applicationData.userId}).
                    exec(function(error, userData) {

                        SubscriptionPayment.find({date: dateFormat(date, "yyyy-mm-dd"), status:1,appId:publishDetails.appId},
                            {groupBy:  ['appId'] , sum: [ 'amount' ] }).
                        exec(function(error, subscriptionPaymentData) {

                            var data = {date:dateFormat(date, "yyyy-mm-dd"),appId:publishDetails.appId,
                                revenue:subscriptionPaymentData[0] ? (subscriptionPaymentData[0].amount) : 0 ,userId:userData.id,
                                name:userData.firstName+ " "+ userData.lastName ,bankCode:userData.bankCode,
                                branchCode:userData.branchCode,branchName:userData.branchName,bankAccountNumber:userData.accountNumber};

                            ReconciliationDailySummary.create(data).exec(function (err, result) {

                                if (err) console.log(err);
                                console.log(result);

                            });

                        });
                    });

                });

            });
        });
    },


    insertReconciliationMonthlySummary: function (year ,month) {

        PublishDetails.find().exec(function(err, publishDetailsDataArray){

            publishDetailsDataArray.forEach(function(publishDetailsData) {

                console.log(publishDetailsData);

                    ReconciliationDailySummary.native(function (err, collection) {

                        if (err) return res.serverError(err);

                        collection.aggregate([
                            {
                                "$match": {
                                    "date": {
                                        $gte: dateFormat(getFirstDayOfMonth(year, month), "yyyy-mm-dd"),
                                        $lte: dateFormat(getLastDayOfMonth(year, month), "yyyy-mm-dd")
                                    },
                                    "appId": publishDetailsData.appId
                                }
                            },
                            {
                                "$group": {
                                    "_id": "$appId",
                                    "revenue": {"$sum": "$revenue"}
                                }
                            }
                        ]).toArray(function (err, dailySummaryData) {
                            if (err) {
                                console.log(err);
                            }

                            console.log(JSON.stringify(dailySummaryData[0]));

                            if (dailySummaryData.length>0){

                                var data = {month:month,year:year,appId:publishDetailsData.appId,
                                    revenue:dailySummaryData[0] ? (dailySummaryData[0].revenue) : 0 ,userId:publishDetailsData.userId,
                                    name:publishDetailsData.name ,bankCode:publishDetailsData.bankCode,
                                    branchCode:publishDetailsData.branchCode,branchName:publishDetailsData.branchName,
                                    bankAccountNumber:publishDetailsData.accountNumber};


                                ReconciliationMonthlySummary.create(data).exec(function (err, result) {
                                    if (err) console.log(err);
                                    //console.log(result);
                                });

                            }
                        });
                    });
                });
        });
    },


    getRevenueAndTrafficSummaryForDateRange: function (req,res){

        var reqData = req.body;

        var dateFrom = reqData.dateFrom;
        var dateTo = reqData.dateTo;
        var operator = reqData.operator;
        var query="";

        if (operator=="all"){

            query = {date:{'>=':dateFormat(dateFrom, "yyyy-mm-dd"),'<=':dateFormat(dateTo, "yyyy-mm-dd")}}

        }else {
            query = {date:{'>=':dateFormat(dateFrom, "yyyy-mm-dd"),'<=':dateFormat(dateTo, "yyyy-mm-dd")},operator:operator}
        }



        RevenueAndTrafficDailySummary.find(query).exec(function(err, app){
            if (err) return done(err);
            res.send(app);
        });

    },

    getRevenueAndTrafficSummaryForMonthly: function (req,res){

        var reqData = req.body;

        var year = reqData.year;
        var monthFrom = reqData.monthFrom;
        var monthTo = reqData.monthTo;
        var operator = reqData.operator;

        var query="";

        if (operator=="all"){

            query = {month:{'>=':monthFrom,'<=':monthTo},year:year}

        }else {
            query = {month:{'>=':monthFrom,'<=':monthTo},year:year,operator:operator}
        }



        RevenueAndTrafficMonthlySummary.find(query).exec(function(err, data){
            if (err) return done(err);
            res.send(data);
        });

    },

    getRevenueAndTrafficSummaryForYearly: function (req,res){

        var reqData = req.body;

        var yearFrom = reqData.yearFrom;
        var yearTo = reqData.yearTo;
        var operator = reqData.operator;

        var query="";

        if (operator=="all"){

            query = {year:{'>=':yearFrom,'<=':yearTo}}

        }else {
            query = {year:{'>=':yearFrom,'<=':yearTo},operator:operator}
        }


        RevenueAndTrafficYearlySummary.find(query).exec(function(err, data){
            if (err) return done(err);
            res.send(data);
        });

    },



    insertRevenueAndTrafficMonthlySummary: function (year,month) {

        console.log("year " + year + " " + "month " + month);

        //var operator = ['mobitel', 'dialog', 'airtel','hutch'];
        var date = new Date();
        date.setDate(date.getDate() -1);

        Operator.find().exec(function(err, operatorData){

            operatorData.forEach(function(operatorData) {


                RevenueAndTrafficDailySummary.native(function(err, collection) {

                    if (err) return res.serverError(err);

                    collection.aggregate([
                        {
                            "$match": {
                                "date": {$gte: getFirstDayOfMonth(year,month), $lte: getLastDayOfMonth(year,month)},
                                "operator":operatorData.operator
                            }
                        },
                        {
                            "$group": {
                                "_id": "$operator",
                                "viewCount": { "$sum": "$viewCount" },
                                "revenue" : {"$sum": "$revenue" }
                            }
                        }
                    ]).toArray(function (err, dailySummaryData) {
                        if (err) {
                            console.log(err);
                        }

                        var data = {"operator":operatorData.operator ,"revenue":dailySummaryData[0] ? dailySummaryData[0].revenue : 0 ,
                            "viewCount":dailySummaryData[0] ?dailySummaryData[0].viewCount:0 , "month":month,"year":year};

                        console.log(data);


                        RevenueAndTrafficMonthlySummary.create(data).exec(function (err, result) {
                            if (err) console.log(err);
                            console.log(result);
                        });
                    });
                });
            })
        });
    },


    insertRevenueAndTrafficYearSummary: function (year) {

        console.log("year " + year );

        Operator.find().exec(function(err, operatorData){

            operatorData.forEach(function(operatorData) {


                RevenueAndTrafficMonthlySummary.native(function(err, collection) {

                    if (err) return res.serverError(err);

                    collection.aggregate([
                        {
                            "$match": {
                                "year": year,
                                "operator":operatorData.operator
                            }
                        },
                        {
                            "$group": {
                                "_id": "$operator",
                                "viewCount": { "$sum": "$viewCount" },
                                "revenue" : {"$sum": "$revenue" }
                            }
                        }
                    ]).toArray(function (err, monthlySummaryData) {
                        if (err) {
                            console.log(err);
                        }

                        var data = {"operator":operatorData.operator ,"revenue":monthlySummaryData[0] ? monthlySummaryData[0].revenue : 0 ,
                            "viewCount":monthlySummaryData[0] ?monthlySummaryData[0].viewCount:0 ,"year":year};

                        console.log(data);


                        RevenueAndTrafficYearlySummary.create(data).exec(function (err, result) {
                            if (err) console.log(err);
                            console.log(result);
                        });
                    });
                });
            })
        })
    }

};









function getFirstDayOfMonth(year,month) {

    var firstDay = new Date(year, month, 1);

    console.log("first day " + firstDay );
    return firstDay;
}


function getLastDayOfMonth(year,month) {

    var lastDay = new Date(year, month + 1, 0);
    console.log("lastDay " + lastDay );
    return lastDay;

}
























