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


module.exports = {



    insertRevenueAndTrafficDailySummary: function () {


        var date = new Date();

        // add a day
        date.setDate(date.getDate() -1);

        Operator.find().exec(function(err, operatorData){

            if (err) return done(err);

            operatorData.forEach(function(operatorData) {

            SubscriptionPayment.find({date: dateFormat(date, "yyyy-mm-dd"), status:1,operator:operatorData.operator},
                                     {groupBy:  ['operator'] , sum: [ 'amount' ] }).
            exec(function(error, subscriptionPaymentData) {

                AppVisitDataLog.native(function(err, collection) {

                    if (err) return res.serverError(err);

                    collection.aggregate([
                        {
                            "$match": {
                                "viewDate": dateFormat(date, "yyyy-mm-dd"),
                                "operator":operatorData.operator
                            }
                        },
                        {
                            "$group": {
                                "_id": "$operator",
                                "count": { "$sum": 1 }
                            }
                        }
                    ]).toArray(function (err, appVisitDataLog) {
                        if (err) {
                            console.log(err);
                        }
                        //console.log(operatorData + " operator.length " + operator.length + " count " + count + "date " + date);

                        var data = {"operator":operatorData.operator ,"revenue":subscriptionPaymentData[0] ? subscriptionPaymentData[0].amount : 0 ,
                            "viewCount":appVisitDataLog[0] ?appVisitDataLog[0].count:0 , "date":dateFormat(date, "yyyy-mm-dd")};

                        console.log(data);


                        RevenueAndTrafficDailySummary.create(data).exec(function (err, result) {
                            if (err) console.log(err);
                            console.log(result);
                        });
                    });
                });
            });

          })
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

        RevenueAndTrafficDailySummary.find(query).exec(function(err, revenueAndTrafficDailySummary){
            if (err) return done(err);
            res.send(revenueAndTrafficDailySummary);
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
























