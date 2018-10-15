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


    getShareSplit: function (operatorData, callback) {

        console.log("operatorData " + operatorData);

        var operator = operatorData.toLowerCase().charAt(0).toUpperCase() + operatorData.slice(1);
        var shareSplit = 0;

        if (operator == "Mobitel") {

            shareSplit = config.IDEABIZ_USER_NETWORK_CLIENTS.Mobitel.shareSplit;
            return callback(shareSplit, "error");

        } else if (operator == "Dialog") {

            shareSplit = config.IDEABIZ_USER_NETWORK_CLIENTS.Dialog.shareSplit;
            return callback(shareSplit, "error");

        } else if (operator == "Hutch") {

            shareSplit = config.IDEABIZ_USER_NETWORK_CLIENTS.Hutch.shareSplit;
            return callback(shareSplit, "error");

        } else if (operator == "Airtel") {

            shareSplit = config.IDEABIZ_USER_NETWORK_CLIENTS.Airtel.shareSplit;
            return callback(shareSplit, "error");

        } else {
            return callback(shareSplit, "error");
        }

    },


    insertReconciliationDailySummary: function () {

        var date = new Date();
        date.setDate(date.getDate() - 1);
        var reconciliationIntance = this;

        PublishDetails.find().exec(function (err, publishDetailsData) {

            if (err) {
                return console.log(err);
            }

            publishDetailsData.forEach(function (publishDetails) {

                Application.findOne({id: publishDetails.appId}).exec(function (error, applicationData) {
                    if (error) {
                        return console.log(error);
                    }
                    if (applicationData){

                        User.findOne({id: applicationData.userId}).exec(function (error, userData) {

                            if (error) {
                                return console.log(error);
                            }

                            if (userData){
                                SubscriptionPayment.find({
                                        date: dateFormat(date, "yyyy-mm-dd"),
                                        status: 1,
                                        appId: publishDetails.appId
                                    },
                                    {
                                        groupBy: ['appId', 'operator'],
                                        sum: ['amount']
                                    }).exec(function (error, subscriptionPaymentData) {

                                    if (error) {
                                        return console.log(error);
                                    }

                                    console.log("subscriptionPaymentData.length " + subscriptionPaymentData.length);

                                    if (subscriptionPaymentData.length > 0) {

                                        subscriptionPaymentData.forEach(function (subscriptionPayment) {

                                            reconciliationIntance.getShareSplit(subscriptionPayment.operator, function (shareSplit, err) {

                                                /*  console.log(JSON.stringify(subscriptionPaymentData[0] ? subscriptionPaymentData[0].amount/100*shareSplit : 0));*/

                                                var data = {
                                                    date: dateFormat(date, "yyyy-mm-dd"),
                                                    appId: publishDetails.appId,
                                                    revenue: subscriptionPayment.amount / 100 * shareSplit,
                                                    userId: userData.id,
                                                    name: userData.firstName + " " + userData.lastName,
                                                    bankCode: userData.bankCode,
                                                    branchCode: userData.branchCode,
                                                    branchName: userData.branchName,
                                                    uniqueAppId: applicationData.uniqueAppId,
                                                    bankAccountNumber: userData.accountNumber,
                                                    operator: subscriptionPayment.operator
                                                };

                                                ReconciliationDailySummary.create(data).exec(function (err, result) {

                                                    if (err) console.log(err);
                                                    console.log(result);

                                                });
                                            });

                                        });
                                    }
                                })
                            };
                        });
                    }
                });
            });
        });
    },


    insertReconciliationMonthlySummary: function () {

        var date = new Date();
        date.setDate(date.getDate() - 1);

        ReconciliationDailySummary.destroy({month: date.getMonth() + 1, year: date.getFullYear()}).exec(function (err) {
            if (err) console.log("Error while deleting ApplicationBaseMonthlySummary " + err);

            ReconciliationDailySummary.native(function (err, collection) {

                if (err) return console.log(err);


                collection.aggregate([
                    {
                        "$match": {
                            date: {
                                $gte: dateFormat(getFirstDayOfMonth(date.getFullYear(), date.getMonth()), "yyyy-mm-dd"),
                                $lte: dateFormat(getLastDayOfMonth(date.getFullYear(), date.getMonth()), "yyyy-mm-dd")
                            }
                        }
                    },
                    {
                        "$group": {
                            "_id": {
                                "appId": "$appId",
                                "operator": "$operator"
                            },
                            "revenue": {"$sum": "$revenue"}
                        }
                    }
                ]).toArray(function (err, dailySummaryData) {
                    if (err) {
                        return console.log(err);
                    }

                    dailySummaryData.forEach(function (dailySummaryResultData) {

                        console.log("dailySummaryData " + JSON.stringify(dailySummaryData));

                        Application.findOne({id: dailySummaryResultData._id.appId}).exec(function (error, applicationData) {

                            if (error){
                                return console.log("User find Error " + error);
                            }

                            console.log("applicationData " + JSON.stringify(applicationData));

                            if (applicationData){

                                User.findOne({id: applicationData.userId}).exec(function (error, userData) {

                                    if (error){
                                        return console.log("User find Error " + error);
                                    }

                                    if (userData){

                                        var data = {
                                            month: date.getMonth() + 1,
                                            year: date.getFullYear(),
                                            appId: dailySummaryResultData._id.appId,
                                            revenue: dailySummaryResultData.revenue,
                                            userId: applicationData.userId,
                                            name: userData.firstName + " " + userData.lastName,
                                            bankCode: userData.bankCode,
                                            branchCode: userData.branchCode,
                                            branchName: userData.branchName,
                                            uniqueAppId: applicationData.uniqueAppId,
                                            bankAccountNumber: userData.accountNumber,
                                            operator: dailySummaryResultData._id.operator
                                        };


                                        ReconciliationMonthlySummary.create(data).exec(function (err, result) {
                                            if (err) return console.log(err);
                                            console.log(result);
                                        });

                                    }
                                })
                            }
                        });
                    })
                });
            });
        });
    },


    insertReconciliationYearlySummary: function () {

        var date = new Date();
        date.setDate(date.getDate() - 1);

        ReconciliationYearlySummary.destroy({year: date.getFullYear()}).exec(function (err) {
            if (err) console.log("Error while deleting ApplicationBaseYearlySummary " + err);

            ReconciliationMonthlySummary.native(function (err, collection) {

                if (err) {
                    console.log(err)
                }

                collection.aggregate([
                    {
                        "$match": {
                            "year": date.getFullYear()
                        }
                    },
                    {
                        "$group": {
                            "_id": {
                                "appId": "$appId",
                                "operator": "$operator"
                            },
                            "revenue": {"$sum": "$revenue"}
                        }
                    }
                ]).toArray(function (err, monthlySummaryData) {
                    if (err) {
                        console.log(err);
                    }

                    monthlySummaryData.forEach(function (monthlySummaryDataResultData) {

                        console.log("dailySummaryData " + JSON.stringify(monthlySummaryData));

                        Application.findOne({id: monthlySummaryDataResultData._id.appId}).exec(function (error, applicationData) {

                            console.log("applicationData " + JSON.stringify(applicationData));

                            User.findOne({id: applicationData.userId}).exec(function (error, userData) {

                                var data = {
                                    year: date.getFullYear(),
                                    appId: monthlySummaryDataResultData._id.appId,
                                    revenue: monthlySummaryDataResultData.revenue,
                                    userId: applicationData.userId,
                                    name: userData.firstName + " " + userData.lastName,
                                    bankCode: userData.bankCode,
                                    branchCode: userData.branchCode,
                                    branchName: userData.branchName,
                                    uniqueAppId: applicationData.uniqueAppId,
                                    bankAccountNumber: userData.accountNumber,
                                    operator: monthlySummaryDataResultData._id.operator
                                };


                                ReconciliationYearlySummary.create(data).exec(function (err, result) {
                                    if (err) console.log(err);
                                    console.log(result);
                                });
                            })

                        });
                    })
                });
            });
        });
    },


    getReconciliationDataForDateRange: function (req, res) {

        var reqData = req.body;

        var dateFrom = reqData.dateFrom;
        var dateTo = reqData.dateTo;
        var operator = reqData.operator;
        var query = "";

        if (operator == "all") {
            query = {date: {'>=': dateFormat(dateFrom, "yyyy-mm-dd"), '<=': dateFormat(dateTo, "yyyy-mm-dd")}}

        } else {

            query = {
                date: {'>=': dateFormat(dateFrom, "yyyy-mm-dd"), '<=': dateFormat(dateTo, "yyyy-mm-dd")},
                operator: operator
            }
        }


        ReconciliationDailySummary.find(query).exec(function (err, app) {
            if (err) {
                console.log(err);
            }
            res.send(app);
        });

    },

    getReconciliationDataForMonthly: function (req, res) {

        var reqData = req.body;

        var yearFrom = reqData.yearFrom;
        var yearTo = reqData.yearTo;
        var monthFrom = reqData.monthFrom;
        var monthTo = reqData.monthTo;
        var operator = reqData.operator;

        var query = "";

        if (operator == "all") {
            query = {month: {'>=': monthFrom, '<=': monthTo}, year: {'>=': yearFrom, '<=': yearTo}}

        } else {

            query = {month: {'>=': monthFrom, '<=': monthTo}, year: {'>=': yearFrom, '<=': yearTo}, operator: operator}
        }


        ReconciliationMonthlySummary.find(query).exec(function (err, data) {
            if (err) {
                console.log(err);
            }
            res.send(data);
        });

    },

    getReconciliationDataForYearly: function (req, res) {

        var reqData = req.body;

        var yearFrom = reqData.yearFrom;
        var yearTo = reqData.yearTo;
        var operator = reqData.operator;

        var query = "";

        if (operator == "all") {

            query = {year: {'>=': yearFrom, '<=': yearTo}}

        } else {

            query = {year: {'>=': yearFrom, '<=': yearTo}, operator: operator}
        }

        ReconciliationYearlySummary.find(query).exec(function (err, data) {
            if (err) {
                console.log(err);
            }
            res.send(data);
        });

    }

};


function getFirstDayOfMonth(year, month) {

    var firstDay = new Date(year, month, 1);

    console.log("first day " + firstDay);
    return firstDay;
}


function getLastDayOfMonth(year, month) {

    var lastDay = new Date(year, month + 1, 0);
    console.log("lastDay " + lastDay);
    return lastDay;

}























