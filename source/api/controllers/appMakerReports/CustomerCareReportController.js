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

    getOperator:function(req,res){

        console.log("getOperator " );
        try {
            var operatorCode = parseInt((req.body.msisdn).substring(0, 4));
            sails.log.debug("operatorCode: " + operatorCode + ' for the msisdn: ' + req.body.msisdn);
            Operator.findOne({operator_code: parseInt(operatorCode)}).exec(function (err, data) {
                if (err) {
                    sails.log.error("Operator find Error: " + err);
                     res.send(err);
                } else {
                    if (data){
                        res.send({operator:data.operator});
                    }else {
                        res.send({operator:""});

                    }

                }
            });
        }catch (e){
            sails.log.error('Cannot extract the operator code from msisdn: ' + msisdn + ' error:' + e);
            res.send(e);
        }
    },


    getPaymentStatusOfUser: function (req, res) {

        console.log("a1");

        var reqData = req.body;
        var msisdn = reqData.msisdn;
        var dateFrom = reqData.dateFrom;
        var dateTo = reqData.dateTo;
        var responseArray= [];
        var count =0;


        var query = {msisdn:msisdn,date:{'>=':dateFormat(dateFrom, "yyyy-mm-dd"),'<=':dateFormat(dateTo, "yyyy-mm-dd")},
                     status:1}

        SubscriptionPayment.find(query).exec(function (err, subscriptionPaymentArray) {

            if (err) {
                console.log('Error occurred getting SubscriptionPayment data , error: '+ err);
                return res.send(err);
            }

            if(subscriptionPaymentArray.length>0){

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
                                return res.send(responseArray);
                            }
                        });

                })
            }else {
                    return res.send([]);
            }
        });
    }

};

