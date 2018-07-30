/**
 * ApplicationBaseReportController
 *
 * @description :: This is responsible for handling server side login for generating
 * application base reports
 *
 **/

var ERROR = { message: 'error'},
    NOT_FOUND = { message: 'not_found'};
var dateFormat = require('dateformat');
var config = require('../../services/config');



module.exports = {






    insertFiledTransactionDailySummary : function () {

        var date = new Date();
        date.setDate(date.getDate()-1);

        console.log(date);

                    FailedTransactionLog.native(function(err, collection) {

                        if (err) {

                            console.log(err);
                        };

                        collection.aggregate([
                            {
                                "$match": {
                                    "date": dateFormat(date, "yyyy-mm-dd")
                                }
                            },
                            {
                                "$group": {
                                    "_id": {"oprator":"$operator","statusCode":"$statusCode","date":"$date","appId":"$appId"},
                                    "count": { "$sum":1 }
                                }
                            }
                        ]).toArray(function (err, failedTransactionLogData) {
                            if (err) {
                                console.log(err);
                            }

                            failedTransactionLogData.forEach(function(failedTransaction) {

                                Application.findOne({id:failedTransaction._id.appId}).
                                exec(function(error, applicationData) {

                                    var data = {date:dateFormat(date, "yyyy-mm-dd"),
                                        operator:failedTransaction._id.oprator,
                                        statusCode:failedTransaction._id.statusCode,
                                         appName:applicationData.appName,count:failedTransaction.count};


                                    FailedTransactionLogDailySummary.create(data).exec(function (err, result) {

                                        if (err) console.log(err);
                                        console.log(result);

                                    });

                                });


                            });
                        });
                    });
    },




    getFailedTransactionReportDataForDateRange: function (req,res){

        var reqData = req.body;

        var dateFrom = reqData.dateFrom;
        var dateTo = reqData.dateTo;

            var query = {date:{'>=':dateFormat(dateFrom, "yyyy-mm-dd"),'<=':dateFormat(dateTo, "yyyy-mm-dd")}}

        FailedTransactionLogDailySummary.find(query).
        exec(function(error, failedTransactionLogDailySummary) {

            res.send(failedTransactionLogDailySummary);

        })

    }

};

