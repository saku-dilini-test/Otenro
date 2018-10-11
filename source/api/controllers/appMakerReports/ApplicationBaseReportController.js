/**
 * ApplicationBaseReportController
 *
 * @description :: This is responsible for handling server side login for generating
 * application base reports
 *
 **/

var ERROR = {message: 'error'},
    NOT_FOUND = {message: 'not_found'};
var dateFormat = require('dateformat');
var config = require('../../services/config');


module.exports = {


    getShareSplit: function (operator, callback) {

        var operator = operator.toLowerCase().charAt(0).toUpperCase() + operator.slice(1);
        var shareSplit = 0;



        if (operator == "Mobitel") {

            shareSplit = config.IDEABIZ_USER_NETWORK_CLIENTS.Mobitel.shareSplit;
            console.log("shareSplit " +shareSplit + " operator" + operator);
            return callback(shareSplit, "error");

        } else if (operator == "Dialog") {

            shareSplit = config.IDEABIZ_USER_NETWORK_CLIENTS.Dialog.shareSplit;
            console.log("shareSplit " +shareSplit + " operator" + operator);
            return callback(shareSplit, "error");

        } else if (operator == "Hutch") {

            shareSplit = config.IDEABIZ_USER_NETWORK_CLIENTS.Hutch.shareSplit;
            console.log("shareSplit " +shareSplit + " operator" + operator);
            return callback(shareSplit, "error");

        } else if (operator == "Airtel") {

            shareSplit = config.IDEABIZ_USER_NETWORK_CLIENTS.Airtel.shareSplit;
            console.log("shareSplit " +shareSplit + " operator" + operator);
            return callback(shareSplit, "error");

        } else {
            console.log("else shareSplit ");
            return callback(shareSplit, "error");
        }

    },


    insertApplicationBaseDailySummary: function () {

        var date = new Date();
        date.setDate(date.getDate() - 1);
        var appBaseintance = this;

        PublishDetails.find().exec(function (err, publishDetailsData) {

            if (err) return done(err);

            publishDetailsData.forEach(function (publishDetails) {

                Application.findOne({id: publishDetails.appId}).exec(function (error, applicationData) {

                    if (error) {
                        return console.log(" Application find error " + error)
                    }

                    if (applicationData) {

                        publishDetails.operators.forEach(function (operators) {

                            Operator.findOne({operator: operators.operator.toLowerCase()}).exec(function (err, oprator_data) {

                                if (err) {
                                    return console.log(" Operator find error " + err)
                                }

                                if (oprator_data) {

                                    oprator_data.operator_code.forEach(function (code) {

                                        AppUser.count({
                                            appId: applicationData.id,
                                            subscriptionStatus: "SUBSCRIBED",
                                            msisdn: {$regex: new RegExp('^' + code, 'i')},  //msisdn value that starts with code.
                                            registeredDate: dateFormat(date, "yyyy-mm-dd"),
                                        }).exec(function countCB(error, subcount) {

                                            if (error) {
                                                return console.log(" appUser count find error " + error)
                                            }
                                            AppUser.count(
                                                {
                                                    appId: applicationData.id,
                                                    subscriptionStatus: "UNSUBSCRIBED",
                                                    msisdn: {$regex: new RegExp('^' + code, 'i')},
                                                    unsubscribeDate: dateFormat(date, "yyyy-mm-dd")
                                                })
                                                .exec(function countCB(error, unsubcount) {

                                                    if (error) {
                                                        return console.log(" appUser count find error " + error)
                                                    }
                                                    AppUser.count(
                                                        {
                                                            appId: applicationData.id,
                                                            subscriptionStatus: "UNSUBSCRIBED",
                                                            msisdn: {$regex: new RegExp('^' + code, 'i')},
                                                            registeredDate: dateFormat(date, "yyyy-mm-dd"),
                                                            unsubscribeDate: dateFormat(date, "yyyy-mm-dd")

                                                        })
                                                        .exec(function countCB(error, unsubcountDiff) {

                                                            if (error) {
                                                                return console.log(" appUser count find error " + error)
                                                            }

                                                            AppVisitDataLog.count(
                                                                {
                                                                    appId: applicationData.id,
                                                                    msisdn: {$regex: new RegExp('^' + code, 'i')},
                                                                    viewDate: dateFormat(date, "yyyy-mm-dd")
                                                                })
                                                                .exec(function countCB(error, appVisitCount) {

                                                                    if (error) {
                                                                        return console.log(" AppVisitDataLog count find error " + error)
                                                                    }

                                                                    SubscriptionPayment.find({
                                                                            status: 1, appId: publishDetails.appId,
                                                                            operator: operators.operator.toLowerCase(),
                                                                            msisdn: {$regex: new RegExp('^' + code, 'i')},
                                                                            date: dateFormat(date, "yyyy-mm-dd")
                                                                        },

                                                                        {
                                                                            groupBy: ['appId'],
                                                                            sum: ['amount']
                                                                        }).exec(function (error, subscriptionPaymentData) {

                                                                        if (error) {
                                                                            return console.log(" SubscriptionPayment count find error " + error)
                                                                        }

                                                                        appBaseintance.getShareSplit(operators.operator, function (shareSplit, err) {


                                                                            var data = {
                                                                                appName: applicationData.appName,
                                                                                type: "appMaker",
                                                                                caaTaxable: true,
                                                                                date: dateFormat(date, "yyyy-mm-dd"),
                                                                                operator: operators.operator.toLowerCase(),
                                                                                platformEarning: subscriptionPaymentData[0] ? subscriptionPaymentData[0].amount : 0,
                                                                                spEarning: subscriptionPaymentData[0] ? subscriptionPaymentData[0].amount / 100 * shareSplit : 0,
                                                                                appTotRevenue: subscriptionPaymentData[0] ? subscriptionPaymentData[0].amount : 0,
                                                                                appTrafficCount: appVisitCount,
                                                                                subscriptionCount: subcount,
                                                                                unSubscriptionCount: unsubcount,
                                                                                totSubs: (subcount - unsubcountDiff)
                                                                            };


                                                                            console.log(JSON.stringify(data));

                                                                            ApplicationBaseDailySummary.create(data).exec(function (err, result) {
                                                                                if (err) console.log(err);
                                                                                console.log(result);
                                                                            });

                                                                        });
                                                                    });

                                                                });
                                                        });
                                                });
                                        });
                                    });
                                }
                            });
                        });
                    }
                });
            });
        });
    },


    insertApplicationBaseMonthlySummary: function () {

        var date = new Date();
        date.setDate(date.getDate() - 1);

        ApplicationBaseMonthlySummary.destroy({
            month: date.getMonth() + 1,
            year: date.getFullYear()
        }).exec(function (err) {
            if (err) console.log("Error while deleting ApplicationBaseMonthlySummary " + err);

            ApplicationBaseDailySummary.find({

                    date: {
                        '>=': dateFormat(getFirstDayOfMonth(date.getFullYear(), date.getMonth()), "yyyy-mm-dd"),
                        '<=': dateFormat(getLastDayOfMonth(date.getFullYear(), date.getMonth()), "yyyy-mm-dd")
                    }
                },
                {
                    groupBy: ['appName', 'operator', 'type'], sum: ['platformEarning', 'spEarning', 'appTotRevenue',
                    'appTrafficCount', 'subscriptionCount', 'unSubscriptionCount', 'totSubs']
                }).exec(function (error, applicationBaseDailySummaryData) {

                if (error) {

                    if (error) console.log("Error while finding ApplicationBaseMonthlySummary " + error);
                }

                applicationBaseDailySummaryData.forEach(function (appBaseMonthlySummary) {

                    appBaseMonthlySummary.year = date.getFullYear();
                    appBaseMonthlySummary.month = date.getMonth() + 1;

                    ApplicationBaseMonthlySummary.create(appBaseMonthlySummary).exec(function (err, result) {
                        if (err) console.log(err);
                        console.log(result);
                    });

                })

            })
        });
    },

    insertApplicationBaseYearlySummary: function () {

        var date = new Date();
        date.setDate(date.getDate() - 1);

        ApplicationBaseYearlySummary.destroy({year: date.getFullYear()}).exec(function (err) {
            if (err) console.log("Error while deleting ApplicationBaseYearlySummary " + err);

            ApplicationBaseMonthlySummary.find({year: date.getFullYear()},
                {
                    groupBy: ['appName', 'operator', 'type'], sum: ['platformEarning', 'spEarning', 'appTotRevenue',
                    'appTrafficCount', 'subscriptionCount', 'unSubscriptionCount', 'totSubs']
                }).exec(function (error, applicationBaseMonthlySummaryData) {

                applicationBaseMonthlySummaryData.forEach(function (appBaseYearlySummary) {

                    appBaseYearlySummary.year = date.getFullYear();

                    ApplicationBaseYearlySummary.create(appBaseYearlySummary).exec(function (err, result) {
                        if (err) console.log(err);
                        console.log(result);
                    });

                })

            })
        })
    },

    getApplicationBaseDailySummary: function (req, res) {

        var reqData = req.body;

        var dateFrom = reqData.dateFrom;
        var dateTo = reqData.dateTo;
        var appName = reqData.appName;
        var operator = reqData.operator.toLowerCase();

        var query = "";

        if (appName == "all" && operator == "all") {

            query = {date: {'>=': dateFormat(dateFrom, "yyyy-mm-dd"), '<=': dateFormat(dateTo, "yyyy-mm-dd")}}

        } else if (appName == "all" && operator !== "all") {

            query = {
                date: {'>=': dateFormat(dateFrom, "yyyy-mm-dd"), '<=': dateFormat(dateTo, "yyyy-mm-dd")},
                operator: operator
            }

        } else if (appName !== "all" && operator == "all") {

            query = {
                date: {'>=': dateFormat(dateFrom, "yyyy-mm-dd"), '<=': dateFormat(dateTo, "yyyy-mm-dd")},
                appName: appName
            }

        } else {

            query = {
                date: {'>=': dateFormat(dateFrom, "yyyy-mm-dd"), '<=': dateFormat(dateTo, "yyyy-mm-dd")},
                appName: appName,
                operator: operator
            }
        }

        if (appName == "all"&&reqData.appNamesArray.length > 0){
            query.appName = { '$in': reqData.appNamesArray};
        }

        ApplicationBaseDailySummary.find(query,
            {
                groupBy: ['appName', 'operator', 'date', 'type', 'caaTaxable'],
                sum: ['platformEarning', 'spEarning', 'appTotRevenue',
                    'appTrafficCount', 'subscriptionCount', 'unSubscriptionCount', 'totSubs']
            }).exec(function (error, applicationBaseDailySummaryData) {

            res.send(applicationBaseDailySummaryData);

        })

    },

    getApplicationBaseMonthlySummary: function (req, res) {

        var reqData = req.body;

        var yearFrom = reqData.yearFrom;
        var yearTo = reqData.yearTo;
        var monthFrom = reqData.monthFrom;
        var monthTo = reqData.monthTo;
        var appName = reqData.appName;
        var operator = reqData.operator.toLowerCase();




        var query = "";

        if (appName == "all" && operator == "all") {

            query = {month: {'>=': monthFrom, '<=': monthTo}, year: {'>=': yearFrom, '<=': yearTo}}

        } else if (appName == "all" && operator !== "all") {

            query = {month: {'>=': monthFrom, '<=': monthTo}, year: {'>=': yearFrom, '<=': yearTo}, operator: operator}

        } else if (appName !== "all" && operator == "all") {

            query = {month: {'>=': monthFrom, '<=': monthTo}, year: {'>=': yearFrom, '<=': yearTo}, appName: appName}

        } else {

            query = {month: {'>=': monthFrom, '<=': monthTo}, year: {'>=': yearFrom, '<=': yearTo}, appName: appName, operator: operator}
        }

        if (appName == "all"&&reqData.appNamesArray.length > 0){
            query.appName = {'$in': reqData.appNamesArray};

        }
        ApplicationBaseMonthlySummary.find(query,
            {
                groupBy: ['appName', 'operator', 'year', 'month', 'type', 'caaTaxable'],
                sum: ['platformEarning', 'spEarning', 'appTotRevenue',
                    'appTrafficCount', 'subscriptionCount', 'unSubscriptionCount', 'totSubs']
            }).exec(function (error, applicationBaseMonthlySummaryData) {

            res.send(applicationBaseMonthlySummaryData);

        })

    },


    getApplicationBaseYearlySummary: function (req, res) {


        var reqData = req.body;

        var yearFrom = reqData.yearFrom;
        var yearTo = reqData.yearTo;
        var appName = reqData.appName;
        var operator = reqData.operator.toLowerCase();


        var query = "";

        if (appName == "all" && operator == "all") {

            query = {year: {'>=': yearFrom, '<=': yearTo}}

        } else if (appName == "all" && operator !== "all") {

            query = {year: {'>=': yearFrom, '<=': yearTo}, operator: operator}

        } else if (appName !== "all" && operator == "all") {

            query = {year: {'>=': yearFrom, '<=': yearTo}, appName: appName}

        } else {

            query = {year: {'>=': yearFrom, '<=': yearTo}, appName: appName, operator: operator}
        }

        if (appName == "all"&&reqData.appNamesArray.length > 0){
            query.appName = { '$in': reqData.appNamesArray};
        }

        ApplicationBaseYearlySummary.find(query,
            {
                groupBy: ['appName', 'operator', 'year', 'type', 'caaTaxable'],
                sum: ['platformEarning', 'spEarning', 'appTotRevenue',
                    'appTrafficCount', 'subscriptionCount', 'unSubscriptionCount', 'totSubs']
            }).exec(function (error, applicationBaseDailySummaryData) {

            if (error) console.log(error);
            console.log("applicationBaseDailySummaryData " + applicationBaseDailySummaryData);
            res.send(applicationBaseDailySummaryData);

        })


    },

    getAllOperators: function (req, res) {

        Operator.find().exec(function (err, operator_data) {
            res.send(operator_data);

        });
    },

    allApps: function (req, res) {

        var appData = [];
        var count = 0;

        PublishDetails.find().exec(function (err, publishDetailsData) {
            if (err) {
                sails.log.error('error publishDetailsData ');
                return res.serverError(err);
            }
            if (publishDetailsData.length == 0) {
                sails.log.debug('no publishDetailsData');
                return res.send([]);
            }
            publishDetailsData.forEach(function (publishDetails) {
                Application.find({id: publishDetails.appId}).exec(function (err, application) {
                    count++;
                    appData.push(application);

                    if (count == publishDetailsData.length) {
                        res.send(appData);
                    }

                });
            });
        });
    },


    /*
     *SubscriptonPayments
     */

    getSubscriptionPayments: function (req, res) {

        SubscriptionPayment.find().exec(function (errOne, payments) {
            var paymnt = [];
            if (errOne) {
                return res.send(errOne);
            } else {
                if (payments) {
                    Application.find().exec(function (errTwo, appData) {

                        if (appData) {
                            payments.forEach(function (pay) {
                                appData.forEach(function (apdata) {
                                    if (apdata.id == pay.appId) {
                                        pay.appName = apdata.appName
                                        paymnt.push(pay);


                                    }
                                });
                            })
                        }
                        return res.send(paymnt);
                        if (errTwo) {
                            return res.send(errTwo);
                        }

                    });


                }
            }
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