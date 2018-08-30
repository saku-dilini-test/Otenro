var config = require('../../services/config');
var utilsService = require('../../services/utilsService');
var dateFormat = require('dateformat');

/**
 * IdeabizController
 *
 */

module.exports = {

    isSubscribed: function(req,res){
        var msisdn = req.param("msisdn");
        var uuId = req.param("uuId");
        var appId = req.param("appId");
        var response = {
            'isSubscribed': false, //This will use to check whether the user actually subscribed to the service
            'isUnubscribed': false, //This will use to check whether the user actually un-subscribed to the service
            'msisdn': '',
            'isError': true, //This might tru when delete the app by app creator ot for the other issues.If this is tru then will need to set and show the displayMessage to the end user.
            'displayMessage': '', //Will show to the end user.
            'errorMessage': '', //This is the actual error message to use in our debugging purposes, will not show to the end user.
            'date': new Date().toLocaleString()
        };

        Application.findOne({id:appId}).exec(function(err, app){
            if(err){
                sails.log.error("Error while getting the Application for the  appId: " + appId + ' error: ' + err);
                response.displayMessage = config.END_USER_MESSAGES.SERVER_ERROR;
                return res.ok(response);
            }

            if(app && app.isActive){
                console.log(uuId);
                var query = {
                    'appId': appId
                };

                if(uuId){
                    query.deviceUUID = uuId;
                }else{
                    query.msisdn = msisdn;
                }

                console.log("Search AppUser query: ");
                console.log(query);
                AppUser.findOne(query).exec(function(err, appUser){
                    if(err){
                        sails.log.error("Error while checking App User Status, error: " + err);
                        response.displayMessage = config.END_USER_MESSAGES.SERVER_ERROR;
                        return res.ok(response);
                    }

                    //Check whether the service is available for the operator for the subscribed msisdn.
                    if(appUser && appUser.msisdn){
                        utilsService.getOperator(appUser.msisdn, function (operatorFor_msisdn,err) {
                            if(err){
                                sails.log.error('Error getting the operator for the msisdn: ' + msisdn + ' Error: ' + err);
                                response.displayMessage = config.END_USER_MESSAGES.SERVER_ERROR;
                                return res.ok(response);
                            }

                            if(operatorFor_msisdn){
                                PublishDetails.findOne({ 'appId': appId }).exec(function(err,details) {
                                    if (err) {
                                        sails.log.error("Error when searching for a app using appId: " + appId + " error: " + err);
                                        response.displayMessage = config.END_USER_MESSAGES.SERVER_ERROR;
                                        return res.ok(response);
                                    }

                                    if(details){
                                        var operatorObj = utilsService.getAppOperatorByOperatorFor_msisdn(details.operators,operatorFor_msisdn);
                                        if(operatorObj.status==='APPROVED'){
                                            if(appUser.subscriptionStatus===config.IDEABIZ_SUBSCRIPTION_STATUS.SUBSCRIBED.code){
                                                var paymentQuery = {
                                                    appId: appId,
                                                    msisdn: appUser.msisdn,
                                                    date: dateFormat(new Date(), "yyyy-mm-dd")
                                                };

                                                SubscriptionPayment.findOne(paymentQuery).exec(function (err, payment) {
                                                    if (err){
                                                        sails.log.error("Error when searching for a payment for the details: " + JSON.stringify(paymentQuery));
                                                        response.displayMessage = config.END_USER_MESSAGES.SERVER_ERROR;
                                                        return res.ok(response);
                                                    }

                                                    if(payment){
                                                        if(payment.status === 1) {
                                                            response.isSubscribed = true;
                                                            response.msisdn = appUser.msisdn;
                                                            response.isError = false;
                                                        }else{
                                                            sails.log.debug('No Sufficient balance in the account for msisdn: ' + appUser.msisdn);
                                                            response.displayMessage = config.END_USER_MESSAGES.INSUFFICIENT_BALANCE;
                                                        }
                                                    }else{
                                                        sails.log.error("Payment details could not find for the paymentQuery: " + JSON.stringify(paymentQuery));
                                                        response.isError = false;
                                                    }
                                                    return res.ok(response);
                                                });
                                            }else{
                                                sails.log.debug('Unsubscribed from the service msisdn: ' + appUser.msisdn);
                                                response.isUnubscribed = true;
                                                response.isError = false;
                                                response.displayMessage = config.END_USER_MESSAGES.USER_UNSUBSCRIBED;
                                                return res.ok(response);
                                            }
                                        }else{
                                            sails.log.debug('App is not Approved for the operator: ' + operatorObj.operator + ' msisdn: ' + appUser.msisdn + ' status: ' + operatorObj.status);
                                            response.displayMessage = utilsService.getDisplayMessageByStatus(operatorObj.status);
                                            return res.ok(response);
                                        }
                                    }else{
                                        sails.log.error("PublishDetails not available for the appId: " + appId + " error: " + err);
                                        response.displayMessage = config.END_USER_MESSAGES.SERVER_ERROR;
                                        return res.ok(response);
                                    }
                                });
                            }else{
                                sails.log.error('There is no operator in the system for the msisdn: ' + msisdn);
                                response.displayMessage = config.END_USER_MESSAGES.OPERATOR_NOT_FOUND;
                                return res.ok(response);
                            }
                        });
                    }else{
                        sails.log.error('AppUser or msisdn does not exists for the query:' + JSON.stringify(query));
                        response.isError = false;
                        return res.ok(response);
                    }
                });
            } else{
                sails.log.error("Application has been deleted for the appId: " + appId);
                response.displayMessage = config.END_USER_MESSAGES.APP_DELETED;
                return res.ok(response);
            }
        });
    }
};