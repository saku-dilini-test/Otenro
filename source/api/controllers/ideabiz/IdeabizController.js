var config = require('../../services/config');
var utilsService = require('../../services/utilsService');
var dateFormat = require('dateformat');
var SIMPLE_DATE_FORMAT = 'yyyy-mm-dd';
var IdeabizAdminapiController = require('../../controllers/ideabiz/IdeabizAdminapiController');
var chargingAPICallLogService = require('../../services/IdeabizChargingAPICallLogService');

/**
 * IdeabizController
 *
 */

module.exports = {

    isSubscribed: function(req,res){
        var msisdn = req.param("msisdn");
        var uuId = req.param("uuId");
        var appId = req.param("appId");

        sails.log.debug('IdeabizController: ++++++++++ isSubscribed appId:%s uuId:%s msisdn:%s ++++++++++++',appId,uuId,msisdn);

        var thisCtrl = this;
        var response = {
            'isSubscribed': false, //This will use to check whether the user actually subscribed to the service
            'isUnubscribed': false, //This will use to check whether the user actually un-subscribed to the service
            'msisdn': '',
            'isError': true, //This might true when delete the app by app creator or for the other issues.If this is true then will need to set and show the displayMessage to the end user.
            'displayMessage': '', //Will show to the end user.
            'errorMessage': '', //This is the actual error message to use in our debugging purposes, will not show to the end user.
            'date': new Date().toLocaleString(),
            'isPaymentSuccess': false
        };

        Application.findOne({id:appId}).exec(function(err, app){
            if(err){
                sails.log.error("IdeabizController: Error while getting the Application for the  appId: " + appId + ' error: ' + err);
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
                                sails.log.error('IdeabizController: Error getting the operator for the msisdn: ' + appUser.msisdn + ' Error: ' + err);
                                response.displayMessage = config.END_USER_MESSAGES.SERVER_ERROR;
                                return res.ok(response);
                            }

                            if(operatorFor_msisdn){
                                PublishDetails.findOne({ 'appId': appId }).exec(function(err,details) {
                                    if (err) {
                                        sails.log.error("IdeabizController: Error when searching for a app using appId: " + appId + " error: " + err);
                                        response.displayMessage = config.END_USER_MESSAGES.SERVER_ERROR;
                                        return res.ok(response);
                                    }

                                    if(details){
                                        var operatorObj = utilsService.getAppOperatorByOperatorFor_msisdn(details.operators,operatorFor_msisdn);
                                        if(operatorObj.isEnabled && operatorObj.status==='APPROVED'){
                                            if(appUser.subscriptionStatus===config.IDEABIZ_SUBSCRIPTION_STATUS.SUBSCRIBED.code){
                                                if(operatorObj.interval === config.RENEWAL_INTERVALS.DAILY.code){
                                                    sails.log.debug('IdeabizController: The msisdn:%s will have Daily renewal interval', appUser.msisdn);
                                                    thisCtrl.checkPayments(req,res,appId,appUser.msisdn,response,config.RENEWAL_INTERVALS.DAILY.code);
                                                } else if(operatorObj.interval === config.RENEWAL_INTERVALS.MONTHLY.code){
                                                    sails.log.debug('IdeabizController: The msisdn:%s will have Monthly renewal interval', appUser.msisdn);
                                                    var renewalQuery = {
                                                        appId: appId,
                                                        msisdn: appUser.msisdn
                                                    };

                                                    RenewalAppUser.findOne(renewalQuery).exec(function (err, renewalAppUser) {
                                                        if (err){
                                                            sails.log.error("IdeabizController: Error when searching for a RenewalAppUser for the details: " + JSON.stringify(renewalQuery));
                                                            response.displayMessage = config.END_USER_MESSAGES.SERVER_ERROR;
                                                            return res.ok(response);
                                                        }

                                                        if(renewalAppUser){
                                                            var nextPaymentDate = dateFormat(renewalAppUser.nextPaymentDate, SIMPLE_DATE_FORMAT);
                                                            var today = dateFormat(new Date(), SIMPLE_DATE_FORMAT);
                                                            if(today<=nextPaymentDate) {
                                                                response.isSubscribed = true;
                                                                response.msisdn = renewalAppUser.msisdn;
                                                                response.isError = false;
                                                                return res.ok(response);
                                                            }else{

                                                                sails.log.debug('IdeabizController: msisdn: %s will not allows to access the contents today %s since the nextPaymentDate %s is not valid.' ,renewalAppUser.msisdn,today,nextPaymentDate);

                                                                IdeabizAdminapiController.chargeUserAPiCall(appUser.msisdn,appId,function(paymentData, err){
                                                                    if (err) {
                                                                        sails.log.error('IdeabizController: No Sufficient balance in the account for msisdn: ' + msisdn);
                                                                        response.displayMessage = config.END_USER_MESSAGES.INSUFFICIENT_BALANCE;
                                                                        return res.ok(response);
                                                                    }else if (paymentData.payment=="ok"){
                                                                        sails.log.debug('IdeabizController: Charging success, Updating renewal app user for msisdn: ' + msisdn);
                                                                        IdeabizAdminapiController.updateRenewalAppUser(appId,appUser.msisdn,
                                                                            operatorObj.interval,function(renewalAppUserData, err) {
                                                                            if (err){
                                                                                sails.log.error('IdeabizController: No Sufficient balance in the account for msisdn: ' + msisdn);
                                                                                response.displayMessage = config.END_USER_MESSAGES.INSUFFICIENT_BALANCE;
                                                                                return res.ok(response);
                                                                            }else if (renewalAppUserData.updateRenewalAppUser=="ok") {
                                                                                response.isSubscribed = true;
                                                                                response.msisdn = appUser.msisdn;
                                                                                response.isError = false;
                                                                                response.isPaymentSuccess =true;
                                                                                response.dispalyMessage = config.END_USER_MESSAGES.SUCCESSFULLY_RENEWED;
                                                                                return res.ok(response);
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        }else{
                                                            sails.log.debug("IdeabizController: renewalAppUser details could not find for the paymentQuery: " + JSON.stringify(renewalQuery));
                                                            thisCtrl.checkPayments(req,res,appId,appUser.msisdn,response,config.RENEWAL_INTERVALS.MONTHLY.code);
                                                        }
                                                    });
                                                } else {
                                                    sails.log.error("IdeabizController: Haven't coded for the Renewal interval: " + operatorObj.interval + " appId: " + appId + " error: " + err);
                                                    response.displayMessage = config.END_USER_MESSAGES.SERVER_ERROR;
                                                    return res.ok(response);
                                                }
                                            }else{
                                                sails.log.debug('IdeabizController: Unsubscribed from the service msisdn: ' + appUser.msisdn);
                                                response.isUnubscribed = true;
                                                response.isError = false;
                                                response.displayMessage = config.END_USER_MESSAGES.USER_UNSUBSCRIBED;
                                                return res.ok(response);
                                            }
                                        }else{
                                            sails.log.debug('IdeabizController: App is not Approved for the operator: ' + operatorObj.operator + ' msisdn: ' + appUser.msisdn + ' status: ' + operatorObj.status);
                                            response.displayMessage = utilsService.getDisplayMessageByStatus(operatorObj.status);
                                            return res.ok(response);
                                        }
                                    }else{
                                        sails.log.error("IdeabizController: PublishDetails not available for the appId: " + appId + " error: " + err);
                                        response.displayMessage = config.END_USER_MESSAGES.SERVER_ERROR;
                                        return res.ok(response);
                                    }
                                });
                            }else{
                                sails.log.error('IdeabizController: There is no operator in the system for the msisdn: ' + msisdn);
                                response.displayMessage = config.END_USER_MESSAGES.OPERATOR_NOT_FOUND;
                                return res.ok(response);
                            }
                        });
                    }else{
                        sails.log.error('IdeabizController: AppUser or msisdn does not exists for the query:' + JSON.stringify(query));
                        response.isError = false;
                        return res.ok(response);
                    }
                });
            } else{
                sails.log.error("IdeabizController: Application has been deleted for the appId: " + appId);
                response.displayMessage = config.END_USER_MESSAGES.APP_DELETED;
                return res.ok(response);
            }
        });
    },

    checkPayments: function(req,res,appId,msisdn,response,interval){
        var paymentQuery = {
            appId: appId,
            msisdn: msisdn,
            date: dateFormat(new Date(), SIMPLE_DATE_FORMAT)
        };

        sails.log.debug("IdeabizController: Call checkPayments for msisdn: %s appID: %s ",msisdn,appId);

        SubscriptionPayment.findOne(paymentQuery).exec(function (err, payment) {
            if (err){
                sails.log.error("IdeabizController: Error when searching for a payment for the details: " + JSON.stringify(paymentQuery));
                response.displayMessage = config.END_USER_MESSAGES.SERVER_ERROR;
                return res.ok(response);
            }

            if(payment){
                sails.log.debug("IdeabizController: Payment found for msisdn: %s appID: %s Payment: %s",msisdn,appId,JSON.stringify(payment));
                if(payment.status === 1) {
                    if(chargingAPICallLogService.isAppIdMSISDNExistsInChargingMap(appId,msisdn)) {
                        chargingAPICallLogService.removeFromChargingMap(appId, msisdn);
                    }
                    response.isSubscribed = true;
                    response.msisdn = msisdn;
                    response.isError = false;
                    return res.ok(response);
                }else if(!chargingAPICallLogService.isAppIdMSISDNExistsInChargingMap(appId,msisdn)){
                    sails.log.debug("IdeabizController: Payment status is 0 for msisdn: %s appID: %s, hence call charging api",msisdn,appId);
                    IdeabizAdminapiController.chargeUserAPiCall(msisdn,appId,function(paymentData, err){
                        sails.log.debug("IdeabizController: (When Payment status is 0) Immediate Charging cll initiated for msisdn: %s appID: %s ", msisdn, appId);
                        chargingAPICallLogService.removeFromChargingMap(appId,msisdn);
                        if (err) {
                            sails.log.error("IdeabizController: (When Payment status is 0) No Sufficient balance in the account for msisdn: %s appID: %s",msisdn,appId);
                            response.displayMessage = config.END_USER_MESSAGES.INSUFFICIENT_BALANCE;
                            return res.ok(response);
                        }else if (paymentData.payment=="ok"){
                            sails.log.debug("IdeabizController: (When Payment status is 0) Charging success for msisdn: %s appID: %s, paymentData: %s",msisdn,appId,JSON.stringify(paymentData));
                            response.isSubscribed = true;
                            response.msisdn = msisdn;
                            response.isError = false;
                            response.isPaymentSuccess = true;
                            response.dispalyMessage = config.END_USER_MESSAGES.SUCCESSFULLY_RENEWED;
                            return res.ok(response);
                        }
                    });
                }else{
                    sails.log.error("IdeabizController: (When Payment status is 0) appId_msisdn exists in the map, hence no charging request made for msisdn: %s appID: %s",msisdn,appId);
                }
            }else{
                sails.log.debug("IdeabizController: No Payment record found for paymentQuery: %s ",JSON.stringify(paymentQuery));

                if(!chargingAPICallLogService.isAppIdMSISDNExistsInChargingMap(appId,msisdn)){
                    sails.log.debug("IdeabizController: (No Payment record) Immediate Charging cll initiated for msisdn: %s appID: %s ", msisdn, appId);
                    IdeabizAdminapiController.chargeUserAPiCall(msisdn, appId, function (paymentData, err) {
                        chargingAPICallLogService.removeFromChargingMap(appId,msisdn);
                        if (err) {
                            sails.log.debug("IdeabizController: (No Payment record) Charging failed since no sufficient balance in the acc, just after complete the Charging call, for msisdn: %s appID: %s ", msisdn, appId);
                            response.displayMessage = config.END_USER_MESSAGES.INSUFFICIENT_BALANCE;
                            return res.ok(response);
                        } else if (paymentData.payment == "ok") {
                            sails.log.debug("IdeabizController: (No Payment record) Charging successfully Renewed just after complete the Charging call, for msisdn: %s appID: %s ", msisdn, appId);
                            response.isSubscribed = true;
                            response.msisdn = msisdn;
                            response.isError = false;
                            response.isPaymentSuccess = true;
                            return res.ok(response);
                        }
                    });
                }else{
                    sails.log.error("IdeabizController: (No Payment record) appId_msisdn exists in the map, hence no charging request made for msisdn: %s appID: %s",msisdn,appId);
                }
            }
        });
    },

    /**
     * Will print the Map of AppIds and MSISDNs which currently being calling to the Charging API
     * @param req
     * @param res
     */
    printCurrentChargingMap: function(req,res){
        var map = IdeabizChargingAPICallLogService.getCurrentChargingMap();
        sails.log.debug("IdeabizController: IDEABIZ_PAYMENT_CALLS_MAP: ", map);
        res.json(map);
    },

    /**
     * Will reset the charging map
     * @param req
     * @param res
     */
    resetChargingMap: function(req,res){
        IdeabizChargingAPICallLogService.resetChargingMap();
        res.ok('Map reset');
    },

    /**
     * Remove <appId>_<msisdn>
     * Will remove from the map
     * @param req
     * @param res
     */
    removeFromChargingMap: function(req,res){
        var msisdn = req.param("msisdn");
        var appId = req.param("appId");
        IdeabizChargingAPICallLogService.removeFromChargingMap(appId,msisdn);
        res.ok('Removed from Charging map');
    }
};
