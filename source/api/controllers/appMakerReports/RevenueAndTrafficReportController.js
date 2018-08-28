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
        date.setDate(date.getDate() - 1);

        PublishDetails.find().exec(function (err, publishDetails) {

            if (err) console.log("PublishDetails find error " + err);

            publishDetails.forEach(function (publishDetailsData) {

                Operator.find().exec(function (err, operator) {

                    operator.forEach(function (operatorData) {

                        SubscriptionPayment.find({
                                date: dateFormat(date, "yyyy-mm-dd"),
                                appId: publishDetailsData.appId,
                                operator: operatorData.operator
                            },
                            {
                                groupBy: ['operator', 'appId'],
                                sum: ['amount']
                            }).exec(function (error, subscriptionPaymentData) {

                            if (error) {
                                console.log("SubscriptionPayment find error " + error);
                            }
                            else {
                                AppVisitDataLog.native(function (err, collection) {

                                    if (err) {
                                        console.log("AppVisitDataLog data retrieve error");
                                    }

                                    collection.aggregate([
                                        {
                                            "$match": {
                                                "viewDate": dateFormat(date, "yyyy-mm-dd"),
                                                "operator": operatorData.operator,
                                                "appId": publishDetailsData.appId
                                            }
                                        },
                                        {
                                            "$group": {
                                                "_id": {"operator": "$operator", "appId": "$appId"},
                                                "count": {"$sum": 1}
                                            }
                                        }
                                    ]).toArray(function (err, appVisitDataLog) {
                                        if (err) {
                                            console.log(err);
                                        }
                                        //console.log(operatorData + " operator.length " + operator.length + " count " + count + "date " + date);

                                        var data = {
                                            "operator": operatorData.operator,
                                            "revenue": subscriptionPaymentData[0]?subscriptionPaymentData[0].amount:0,
                                            "viewCount": appVisitDataLog[0] ? appVisitDataLog[0].count : 0,
                                            "date": dateFormat(date, "yyyy-mm-dd"),
                                            "appId":publishDetailsData.appId
                                        };

                                        console.log(data);


                                        RevenueAndTrafficDailySummary.create(data).exec(function (err, result) {
                                            if (err) console.log(err);
                                            console.log(result);
                                        });
                                    });
                                });
                            }
                        });
                    });
                });
            });
        });
    },


    getRevenueAndTrafficSummaryForDateRange: function (req, res) {

        var reqData = req.body;

        var dateFrom = reqData.dateFrom;
        var dateTo = reqData.dateTo;
        var operator = reqData.operator;
        var appId = reqData.appId;

        console.log("appId " + appId);



        var query,groupBy = "";

        groupBy= {
            groupBy: ['operator','date'],
            sum: ['revenue','viewCount']
        }

        if (operator == "all") {

            if (appId){
                query = {date: {'>=': dateFormat(dateFrom, "yyyy-mm-dd"), '<=': dateFormat(dateTo, "yyyy-mm-dd")},appId:appId}

            }else {
                query = {date: {'>=': dateFormat(dateFrom, "yyyy-mm-dd"), '<=': dateFormat(dateTo, "yyyy-mm-dd")}}
            }
        } else {

            if (appId){
                query = {
                    date: {'>=': dateFormat(dateFrom, "yyyy-mm-dd"), '<=': dateFormat(dateTo, "yyyy-mm-dd")},
                    operator: operator,appId:appId
                }
            }else {

                query = {
                    date: {'>=': dateFormat(dateFrom, "yyyy-mm-dd"), '<=': dateFormat(dateTo, "yyyy-mm-dd")},
                    operator: operator
                }
            }

        }

        RevenueAndTrafficDailySummary.find(query,groupBy).exec(function (err, revenueAndTrafficDailySummary) {
            if (err) return res.serverError();
            res.send(revenueAndTrafficDailySummary);
        });

    },

    getRevenueAndTrafficSummaryForMonthly: function (req, res) {

        var reqData = req.body;

        var year = reqData.year;
        var monthFrom = reqData.monthFrom;
        var monthTo = reqData.monthTo;
        var operator = reqData.operator;
        var query,groupBy = "";

        var appId = reqData.appId;

        groupBy= {
            groupBy: ['operator','month','year'],
            sum: ['revenue','viewCount']
        }

        var query = "";

        if (operator == "all") {

             if (appId){
                 query = {month: {'>=': monthFrom, '<=': monthTo}, year: year,appId:appId}
             }else {
                 query = {month: {'>=': monthFrom, '<=': monthTo}, year: year}
             }
        } else {
            if (appId){
                query = {month: {'>=': monthFrom, '<=': monthTo}, year: year, operator: operator,appId:appId}
            }else {
                query = {month: {'>=': monthFrom, '<=': monthTo}, year: year, operator: operator}
            }
        }


        RevenueAndTrafficMonthlySummary.find(query,groupBy).exec(function (err, data) {
            if (err) return done(err);
            res.send(data);
        });

    },

    getRevenueAndTrafficSummaryForYearly: function (req, res) {

        var reqData = req.body;

        var yearFrom = reqData.yearFrom;
        var yearTo = reqData.yearTo;
        var operator = reqData.operator;
        var appId = reqData.appId;

        var query,groupBy = "";

        groupBy= {
            groupBy: ['operator','year'],
            sum: ['revenue','viewCount']
        }

        if (operator == "all") {
            if (appId){
                query = {year: {'>=': yearFrom, '<=': yearTo},appId:appId}
            }else {
                query = {year: {'>=': yearFrom, '<=': yearTo}}
            }
        } else {
            if (appId){
                query = {year: {'>=': yearFrom, '<=': yearTo}, operator: operator,appId:appId}
            }else {
                query = {year: {'>=': yearFrom, '<=': yearTo}, operator: operator}
            }

        }


        RevenueAndTrafficYearlySummary.find(query,groupBy).exec(function (err, data) {
            if (err) return done(err);
            res.send(data);
        });

    },


    insertRevenueAndTrafficMonthlySummary: function (year, month) {

                console.log("year " + year + " " + "month " + month);

                RevenueAndTrafficDailySummary.native(function (err, collection) {

                    if (err) {
                        console.log("SubscriptionPayment find error " + error);
                    }

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
                                "_id": {"operator": "$operator", "appId": "$appId"},
                                "viewCount": {"$sum": "$viewCount"},
                                "revenue": {"$sum": "$revenue"}
                            }
                        }
                    ]).toArray(function (err, dailySummaryData) {
                        if (err) {
                            console.log(err);
                        }

                        dailySummaryData.forEach(function (dailySummary) {

                            var data = {
                                "appId":dailySummary._id.appId,
                                "operator": dailySummary._id.operator,
                                "revenue": dailySummary.revenue,
                                "viewCount": dailySummary.viewCount ,
                                "month": month,
                                "year": year
                            };

                            RevenueAndTrafficMonthlySummary.create(data).exec(function (err, result) {
                                if (err) console.log(err);
                                console.log(result);
                            });
                        });

                    });

                });

    },


    insertRevenueAndTrafficYearSummary: function (year) {

        RevenueAndTrafficMonthlySummary.native(function (err, collection) {

            if (err) {
                console.log("SubscriptionPayment find error " + error);
            }

            collection.aggregate([
                {
                    "$match": {
                        "year": year
                    }
                },
                {
                    "$group": {
                        "_id": {"operator": "$operator", "appId": "$appId"},
                        "viewCount": {"$sum": "$viewCount"},
                        "revenue": {"$sum": "$revenue"}
                    }
                }
            ]).toArray(function (err, monthlySummaryData) {
                if (err) {
                    console.log(err);
                }

                monthlySummaryData.forEach(function (monthlySummary) {

                    var data = {
                        "appId":monthlySummary._id.appId,
                        "operator": monthlySummary._id.operator,
                        "revenue": monthlySummary.revenue,
                        "viewCount": monthlySummary.viewCount ,
                        "year": year
                    };

                    RevenueAndTrafficYearlySummary.create(data).exec(function (err, result) {
                        if (err) console.log(err);
                        console.log(result);
                    });
                });

            });

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
























