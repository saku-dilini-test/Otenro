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


module.exports = {




    getPaymentStatusOfUser: function (req, res) {

        var reqData = req.body;
        var msisdn = reqData.msisdn;
        var dateFrom = reqData.dateFrom;
        var dateTo = reqData.dateTo;
        var responseArray= [];
        var count =0;

        var query = {msisdn:msisdn,date:{'>=':dateFormat(dateFrom, "yyyy-mm-dd"),'<=':dateFormat(dateTo, "yyyy-mm-dd")},status:1}

        SubscriptionPayment.find(query).exec(function (err, subscriptionPaymentArray) {

            if (err) {
                sails.log.error('Error occurred getting SubscriptionPayment data , error: '+ err);
                return res.send(ERROR);
            }
            subscriptionPaymentArray.forEach(function(subscriptionPaymentData) {

                Application.findOne({id:subscriptionPaymentData.appId}).
                exec(function(error, applicationData) {

                    //console.log(JSON.stringify(applicationData));

                   var data = {msisdn:subscriptionPaymentData.msisdn,
                       appName:applicationData.appName,dateTime:subscriptionPaymentData.date,
                       status:1,amount:subscriptionPaymentData.amount};

                    responseArray.push(data);
                    count++;

                    if (count==subscriptionPaymentArray.length){
                        res.send(responseArray);

                    }

                });

            })
        });
    }

};

