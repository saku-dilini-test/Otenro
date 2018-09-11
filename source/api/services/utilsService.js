var config = require('./config');
var request = require('request');

module.exports = {
    /**
     * Use to find the operator by msisdn
     **/
    getOperator:function(msisdn,callback){
        try {
            var operatorCode = parseInt(msisdn.substring(0, 4));
            sails.log.debug("operatorCode: " + operatorCode + ' for the msisdn: ' + msisdn);
            Operator.findOne({operator_code: parseInt(operatorCode)}).exec(function (err, data) {
                if (err) {
                    sails.log.error("Operator find Error: " + err);
                    return callback(null, err);
                } else {
                    return callback(data.operator, null);
                }
            });
        }catch (e){
            sails.log.error('Cannot extract the operator code from msisdn: ' + msisdn + ' error:' + e);
            return callback(null,e);
        }
    },

    /**
     * Use to find the operator object from the operators array in PublishDetails collection,
     * using the operator for the msisdn(Use the method utilsService.getOperator to find the operator by msisdn)
     *
     * @param operators -> PublishDetails.operators
     * @param operatorFor_msisdn -> Can get this using utilsService.getOperator by passing msisdn
     * @returns a JS object operatorObj
     */
    getAppOperatorByOperatorFor_msisdn:function(operators,operatorFor_msisdn){
        var operatorObj = null;

        operators.forEach(function(operator) {
            if (operator.operator.toLowerCase()===operatorFor_msisdn){
                operatorObj = operator;
            }
        });
        return operatorObj;
    },

    /**
     * Use to get the message to show in the app for the End User for each Status for the status stack in config.IDEABIZ_ADMIN_APP_STATUS
     *
     * @param status -> Status is the status in the operators array in PublishDetails(PublishDetails.operators)
     */
    getDisplayMessageByStatus:function(status){
        var message = '';
        switch (status){
            case 'NOT_SUBMITTED':
                message = config.END_USER_MESSAGES.APP_NOT_SUBMITTED;
                break;
            case 'SUBMITTED_FOR_CONFIG':
                message = config.END_USER_MESSAGES.APP_SUBMITTED_FOR_CONFIGURATION;
                break;
            case 'SUBMITTED_FOR_APPROVAL':
                message = config.END_USER_MESSAGES.APP_SUBMITTED_FOR_APPROVAL;
                break;
            case 'REJECTED':
                message = config.END_USER_MESSAGES.APP_REJECTED;
                break;
            case 'SUSPENDED':
                message = config.END_USER_MESSAGES.APP_SUSPENDED;
                break;
            case 'TERMINATED':
                message = config.END_USER_MESSAGES.APP_TERMINATED;
                break;
            default:
                message = config.END_USER_MESSAGES.APP_NOT_SUBMITTED;
        }
        return message;
    },

    /**
     * This will use to do some Testing only, Prod envirenment should not call this
     * Mostly this is use to forward the Admin API and SMS mo Callbacks to different servers
     * @param method
     */
    forwardRequests: function(req,res,api,method){
        if(config.IDEABIZ_ADMIN_MO_CALLBACK_FORWARD_URLS.length>0){
            sails.log.debug('Request forward to urls: ', config.IDEABIZ_ADMIN_MO_CALLBACK_FORWARD_URLS);

            config.IDEABIZ_ADMIN_MO_CALLBACK_FORWARD_URLS.forEach(function(url){
                var requestObj = {
                    'url': url + api,
                    'method': method,
                    'body': JSON.stringify(req.body)
                };
                console.log("Request Obj:", JSON.stringify(requestObj));
                request(requestObj, function(err, response, body) {
                    if(err) {
                        sails.log.error('Will not receive a Success response if the response not handled properly.');
                        return;
                    }
                    sails.log.debug('Received a Success response.');
                    return;
                });
            });
        }
    }

};