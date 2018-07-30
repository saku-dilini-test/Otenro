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


    getShareSplit: function(operatorData,callback){

        console.log("operatorData " + operatorData);

        var operator = operatorData.toLowerCase().charAt(0).toUpperCase()+ operatorData.slice(1);
        var shareSplit =0;

        if (operator=="Mobitel"){

            shareSplit = config.IDEABIZ_USER_NETWORK_CLIENTS.Mobitel.shareSplit;
            return callback(shareSplit,"error");

        }else if (operator=="Dialog"){

            shareSplit = config.IDEABIZ_USER_NETWORK_CLIENTS.Dialog.shareSplit;
            return callback(shareSplit,"error");

        }else if (operator=="Hutch"){

            shareSplit = config.IDEABIZ_USER_NETWORK_CLIENTS.Hutch.shareSplit;
            return callback(shareSplit,"error");

        }else if (operator=="Airtel"){

            shareSplit = config.IDEABIZ_USER_NETWORK_CLIENTS.Airtel.shareSplit;
            return callback(shareSplit,"error");

        }else {
            return callback(shareSplit,"error");
        }

    },



    insertReconciliationDailySummary: function () {

        var date = new Date();
        date.setDate(date.getDate() -1);
        var reconciliationIntance = this;

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



                            reconciliationIntance.getShareSplit("dialog",function(shareSplit, err){

                                console.log(JSON.stringify(subscriptionPaymentData[0] ? subscriptionPaymentData[0].amount/100*shareSplit : 0));

                                var data = {date:dateFormat(date, "yyyy-mm-dd"),appId:publishDetails.appId,
                                    revenue:subscriptionPaymentData[0] ? subscriptionPaymentData[0].amount/100*shareSplit : 0 ,userId:userData.id,
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
        });
    },


    insertReconciliationMonthlySummary: function (year ,month) {

        ReconciliationDailySummary.native(function (err, collection) {

            if (err) return res.serverError(err);

            collection.aggregate([
                {
                    "$match": {
                        "date": {
                            $gte: dateFormat(getFirstDayOfMonth(year, month), "yyyy-mm-dd"),
                            $lte: dateFormat(getLastDayOfMonth(year, month), "yyyy-mm-dd")
                        }
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

                dailySummaryData.forEach(function(dailySummaryResultData) {

                    console.log("dailySummaryData " + JSON.stringify(dailySummaryData));

                    Application.findOne({id:dailySummaryResultData._id}).
                    exec(function(error, applicationData) {

                        console.log("applicationData " + JSON.stringify(applicationData));

                        User.findOne({id: applicationData.userId}).
                        exec(function(error, userData) {

                            var data = {month:month,year:year,appId:dailySummaryResultData._id,
                                revenue:dailySummaryResultData.revenue ,userId:applicationData.userId,
                                name:userData.firstName+ " "+ userData.lastName ,bankCode:userData.bankCode,
                                branchCode:userData.branchCode,branchName:userData.branchName,
                                bankAccountNumber:userData.accountNumber};


                            ReconciliationMonthlySummary.create(data).exec(function (err, result) {
                                if (err) console.log(err);
                                console.log(result);
                            });
                        })

                    });
                })
            });
        });
    },


    insertReconciliationYearlySummary: function (year) {

        ReconciliationMonthlySummary.native(function (err, collection) {

            if (err) return res.serverError(err);

            collection.aggregate([
                {
                    "$match": {
                        "year": year
                    }
                },
                {
                    "$group": {
                        "_id": "$appId",
                        "revenue": {"$sum": "$revenue"}
                    }
                }
            ]).toArray(function (err, monthlySummaryData) {
                if (err) {
                    console.log(err);
                }

                monthlySummaryData.forEach(function(monthlySummaryDataResultData) {

                    console.log("dailySummaryData " + JSON.stringify(monthlySummaryData));

                    Application.findOne({id:monthlySummaryDataResultData._id}).
                    exec(function(error, applicationData) {

                        console.log("applicationData " + JSON.stringify(applicationData));

                        User.findOne({id: applicationData.userId}).
                        exec(function(error, userData) {

                            var data = {year:year,appId:monthlySummaryDataResultData._id,
                                revenue:monthlySummaryDataResultData.revenue ,userId:applicationData.userId,
                                name:userData.firstName+ " "+ userData.lastName ,bankCode:userData.bankCode,
                                branchCode:userData.branchCode,branchName:userData.branchName,
                                bankAccountNumber:userData.accountNumber};


                            ReconciliationYearlySummary.create(data).exec(function (err, result) {
                                if (err) console.log(err);
                                console.log(result);
                            });
                        })

                    });
                })
            });
        });
    },


    getReconciliationDataForDateRange: function (req,res){

        var reqData = req.body;

        var dateFrom = reqData.dateFrom;
        var dateTo = reqData.dateTo;
        var query="";


            query = {date:{'>=':dateFormat(dateFrom, "yyyy-mm-dd"),'<=':dateFormat(dateTo, "yyyy-mm-dd")}}


        ReconciliationDailySummary.find(query).exec(function(err, app){
            if (err) return done(err);
            res.send(app);
        });

    },

    getReconciliationDataForMonthly: function (req,res){

        var reqData = req.body;

        var year = reqData.year;
        var monthFrom = reqData.monthFrom;
        var monthTo = reqData.monthTo;
        var operator = reqData.operator;

        var query="";

            query = {month:{'>=':monthFrom,'<=':monthTo},year:year}

        ReconciliationMonthlySummary.find(query).exec(function(err, data){
            if (err) return done(err);
            res.send(data);
        });

    },

    getReconciliationDataForYearly: function (req,res){

        var reqData = req.body;

        var yearFrom = reqData.yearFrom;
        var yearTo = reqData.yearTo;

        var query="";

            query = {year:{'>=':yearFrom,'<=':yearTo}}

            console.log("query "+ query);

        ReconciliationYearlySummary.find(query).exec(function(err, data){
            if (err) return done(err);
            res.send(data);
        });

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
























