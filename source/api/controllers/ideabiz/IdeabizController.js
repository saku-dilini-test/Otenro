var config = require('../../services/config');
var utilsService = require('../../services/utilsService');
var dateFormat = require('dateformat');
var SIMPLE_DATE_FORMAT = 'yyyy-mm-dd';
var IdeabizAdminapiController = require('../../controllers/ideabiz/IdeabizAdminapiController');
var chargingAPICallLogService = require('../../services/IdeabizChargingAPICallLogService');
var moment = require('moment');

var DATE_FORMAT = "YYYY-MM-DD";

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
            'isPaymentSuccess': false,
            'subscriptionStatus': null //Will tell thet the user SUBSCRIBED/UNSUBSCRIBED/null
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
                        response.subscriptionStatus = appUser.subscriptionStatus;

                        utilsService.getOperator(appUser.msisdn, function (operatorFor_msisdn,err) {
                            if(err){
                                sails.log.error('IdeabizController: Error getting the operator for the msisdn: ' + appUser.msisdn + ' Error: ' + err);
                                response.displayMessage = config.END_USER_MESSAGES.SERVER_ERROR;
                                return res.ok(response);
                            }

                            if(operatorFor_msisdn){
                                PublishDetails.findOne({ 'appId': appId }).exec(function(err,details) {
                                    if (err) {
                                        sails.log.error("IdeabizController: Error when searching for a app using appId: " + appId + " appUser.msisdn: " + appUser.msisdn + " error: " + err);
                                        response.displayMessage = config.END_USER_MESSAGES.SERVER_ERROR;
                                        return res.ok(response);
                                    }

                                    if(details){
                                        var operatorObj = utilsService.getAppOperatorByOperatorFor_msisdn(details.operators,operatorFor_msisdn);
                                        if(operatorObj.isEnabled && operatorObj.status==='APPROVED'){
                                            if(appUser.subscriptionStatus===config.IDEABIZ_SUBSCRIPTION_STATUS.SUBSCRIBED.code){
                                                RenewalIntervals.findOne({'code': operatorObj.interval }).exec(function (err, intervalObj) {
                                                    if (err) {
                                                        sails.log.error("IdeabizController: Error when searching for a RenewalIntervals for the code: " + operatorObj.interval + " appId:" + appId + " appUser.msisdn: " + appUser.msisdn + " error: " + err);
                                                        response.displayMessage = config.END_USER_MESSAGES.SERVER_ERROR;
                                                        return res.ok(response);
                                                    }

                                                    if (intervalObj.noOfDays === 1) {
                                                        sails.log.debug('IdeabizController: The msisdn:%s will have Daily renewal interval', appUser.msisdn);
                                                        thisCtrl.checkPayments(req, res, appId, appUser.msisdn, response, intervalObj);
                                                    } else {
                                                        sails.log.debug('IdeabizController: Renewal interval: %s noOfDays: %s appId:%s msisdn:%s ',intervalObj.code,intervalObj.noOfDays,appId,appUser.msisdn);
                                                        var renewalQuery = {
                                                            appId: appId,
                                                            msisdn: appUser.msisdn
                                                        };

                                                        RenewalAppUser.findOne(renewalQuery).exec(function (err, renewalAppUser) {
                                                            if (err) {
                                                                sails.log.error("IdeabizController: Error when searching for a RenewalAppUser for appId:%s msisdn:%s ",appId,appUser.msisdn);
                                                                response.displayMessage = config.END_USER_MESSAGES.SERVER_ERROR;
                                                                return res.ok(response);
                                                            }

                                                            if (renewalAppUser) {
                                                                var nextPaymentDate = dateFormat(renewalAppUser.nextPaymentDate, SIMPLE_DATE_FORMAT);
                                                                var today = dateFormat(new Date(), SIMPLE_DATE_FORMAT);
                                                                sails.log.debug('IdeabizController: renewalAppUser Exists for msisdn: %s today: %s nextPaymentDate: %s ', renewalAppUser.msisdn, today, nextPaymentDate);
                                                                if (today < nextPaymentDate) {
                                                                    return thisCtrl.sendSubscribedResponse(res,response,renewalAppUser.msisdn,appId);
                                                                } else {

                                                                    sails.log.debug('IdeabizController: msisdn: %s will not allows to access the contents today %s since the nextPaymentDate %s is not valid.', renewalAppUser.msisdn, today, nextPaymentDate);

                                                                    IdeabizAdminapiController.chargeUserAPiCall(appUser.msisdn, appId, function (paymentData, err) {
                                                                        if (err) {
                                                                            sails.log.error('IdeabizController: No Sufficient balance in the account for appId:%s msisdn:%s ',appId,appUser.msisdn);
                                                                            response.displayMessage = config.END_USER_MESSAGES.INSUFFICIENT_BALANCE;
                                                                            return res.ok(response);
                                                                        } else if (paymentData.payment == "ok") {
                                                                            sails.log.debug('IdeabizController: Charging success, Updating renewal app user for appId:%s msisdn:%s ',appId,appUser.msisdn);
                                                                            IdeabizAdminapiController.updateRenewalAppUser(appId, appUser.msisdn,
                                                                                intervalObj, function (renewalAppUserData, err) {
                                                                                    if (err) {
                                                                                        sails.log.error('IdeabizController: No Sufficient balance in the account for appId:%s msisdn:%s ',appId,appUser.msisdn);
                                                                                        response.displayMessage = config.END_USER_MESSAGES.INSUFFICIENT_BALANCE;
                                                                                        return res.ok(response);
                                                                                    } else if (renewalAppUserData.updateRenewalAppUser == "ok") {
                                                                                        return thisCtrl.sendPaymentRenewedResponse(res,response,appUser.msisdn,appId);
                                                                                    }
                                                                                });
                                                                        }
                                                                    });
                                                                }
                                                            } else {
                                                                sails.log.debug("IdeabizController: renewalAppUser details could not find for appId:%s msisdn:%s ",appId,appUser.msisdn);
                                                                thisCtrl.checkPayments(req, res, appId, appUser.msisdn, response, intervalObj);
                                                            }
                                                        });
                                                    }
                                                });
                                            }else{
                                                sails.log.debug('IdeabizController: Unsubscribed from the service msisdn: ' + appUser.msisdn);
                                                thisCtrl.sendUnsubscribedResponse(res,response,appUser.msisdn,appId);
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

    checkPayments: function(req,res,appId,msisdn,response,intervalObj){
        var thisCtrl = this;
        var paymentQuery;

        sails.log.debug("IdeabizController: Call checkPayments for msisdn: %s appID: %s interval: %s noOfDays: %s",msisdn,appId,intervalObj.code,intervalObj.noOfDays);

        if(intervalObj.noOfDays===1){
            paymentQuery = {
                appId: appId,
                msisdn: msisdn,
                date: dateFormat(new Date(), SIMPLE_DATE_FORMAT)
            };

            sails.log.debug("IdeabizController: Call checkPayments(Daily) for msisdn: %s appID: %s paymentQuery:%s",msisdn,appId,JSON.stringify(paymentQuery));

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
                        return thisCtrl.sendSubscribedResponse(res,response,msisdn,appId);
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
                                return thisCtrl.sendPaymentRenewedResponse(res,response,msisdn,appId);
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
                                thisCtrl.sendSubscribedAndChargedResponse(res,response,msisdn,appId);
                            }
                        });
                    }else{
                        sails.log.error("IdeabizController: (No Payment record) appId_msisdn exists in the map, hence no charging request made for msisdn: %s appID: %s",msisdn,appId);
                    }
                }
            });
        }else{
            paymentQuery = {
                where: {
                    appId: appId,
                    msisdn: msisdn,
                },
                limit: 10,
                sort: 'createdAt DESC'
            };

            sails.log.debug("IdeabizController: Call checkPayments(Monthly) for msisdn: %s appID: %s paymentQuery:%s",msisdn,appId,JSON.stringify(paymentQuery));

            SubscriptionPayment.find(paymentQuery).exec(function (err, payments) {
                if (err){
                    sails.log.error("IdeabizController: Error when searching for a payment for the details: " + JSON.stringify(paymentQuery));
                    response.displayMessage = config.END_USER_MESSAGES.SERVER_ERROR;
                    return res.ok(response);
                }

                if(payments.length>0 && payments[0]){
                    sails.log.debug("IdeabizController: Payment found for msisdn: %s appID: %s Payment: %s",msisdn,appId,JSON.stringify(payments[0]));

                    var paymentDate = moment(payments[0].date,DATE_FORMAT);
                    var today = moment().startOf('day');
                    var nextRenewalDate = paymentDate.add(intervalObj.noOfDays, 'days');

                    sails.log.debug("IdeabizController: Payment found for msisdn: %s appID: %s paymentDate: %s nextRenewalDate: %s today: %s",msisdn,appId,moment(payments[0].date,DATE_FORMAT),nextRenewalDate,today);

                    if(today<nextRenewalDate) {
                        if(payments[0].status === 1) {
                            if (chargingAPICallLogService.isAppIdMSISDNExistsInChargingMap(appId, msisdn)) {
                                chargingAPICallLogService.removeFromChargingMap(appId, msisdn);
                            }
                            return thisCtrl.sendSubscribedResponse(res,response,msisdn,appId);
                        }else{
                            sails.log.error("IdeabizController: Payment record exists but the Payment Status is 0, for msisdn: %s appID: %s",msisdn,appId);
                            response.displayMessage = config.END_USER_MESSAGES.INSUFFICIENT_BALANCE;
                            return res.ok(response);
                        }
                    }else if(!chargingAPICallLogService.isAppIdMSISDNExistsInChargingMap(appId,msisdn)){
                        sails.log.debug("IdeabizController: Initiate the Charging for the next period  msisdn: %s appID: %s, hence call charging api",msisdn,appId);
                        IdeabizAdminapiController.chargeUserAPiCall(msisdn,appId,function(paymentData, err){
                            sails.log.debug("IdeabizController: Immediate Charging cll initiated for msisdn: %s appID: %s ", msisdn, appId);
                            chargingAPICallLogService.removeFromChargingMap(appId,msisdn);
                            if (err) {
                                sails.log.error("IdeabizController: No Sufficient balance in the account for msisdn: %s appID: %s",msisdn,appId);
                                response.displayMessage = config.END_USER_MESSAGES.INSUFFICIENT_BALANCE;
                                return res.ok(response);
                            }else if (paymentData.payment=="ok"){
                                sails.log.debug("IdeabizController: Charging success for msisdn: %s appID: %s, paymentData: %s",msisdn,appId,JSON.stringify(paymentData));
                                return thisCtrl.sendPaymentRenewedResponse(res,response,msisdn,appId);
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
                                thisCtrl.sendSubscribedAndChargedResponse(res,response,msisdn,appId);
                            }
                        });
                    }else{
                        sails.log.error("IdeabizController: (No Payment record) appId_msisdn exists in the map, hence no charging request made for msisdn: %s appID: %s",msisdn,appId);
                    }
                }
            });
        }
    },

    /**
     * This will send a response object when the msisdn successfully subscribed to a service
     * @param res
     * @param response
     * @param msisdn
     * @param appId
     */
    sendSubscribedResponse: function(res,response,msisdn,appId){
        sails.log.debug('<<<<<<<<<<<< SUBSCRIBED msisdn: %s appId: %s >>>>>>>>>>>>',msisdn,appId);
        response.isSubscribed = true;
        response.msisdn = msisdn;
        response.isError = false;
        return res.ok(response);
    },

    /**
     * This will send a response object when subscribed by immediate charging
     * @param res
     * @param response
     * @param msisdn
     * @param appId
     */
    sendSubscribedAndChargedResponse: function(res,response,msisdn,appId){
        sails.log.debug('<<<<<<<<<<<< SUBSCRIBED (By Immediate charging) msisdn: %s appId: %s >>>>>>>>>>>>',msisdn,appId);
        response.isSubscribed = true;
        response.msisdn = msisdn;
        response.isError = false;
        response.isPaymentSuccess = true;
        return res.ok(response);
    },

    /**
     * This will send a response object when payment re-newed
     * @param res
     * @param response
     * @param msisdn
     * @param appId
     */
    sendPaymentRenewedResponse: function(res,response,msisdn,appId){
        sails.log.debug('<<<<<<<<<<<< SUBSCRIBED (Payment Renewed) msisdn: %s appId: %s >>>>>>>>>>>>',msisdn,appId);
        response.isSubscribed = true;
        response.msisdn = msisdn;
        response.isError = false;
        response.isPaymentSuccess = true;
        response.dispalyMessage = config.END_USER_MESSAGES.SUCCESSFULLY_RENEWED;
        return res.ok(response);
    },

    /**
     * This will send a response object when Un-Subscribed from a service
     * @param res
     * @param response
     * @param msisdn
     * @param appId
     */
    sendUnsubscribedResponse: function(res,response,msisdn,appId){
        sails.log.debug('<<<<<<<<<<<< UN-SUBSCRIBED msisdn: %s appId: %s >>>>>>>>>>>>',msisdn,appId);
        response.isUnubscribed = true;
        response.isError = false;
        response.displayMessage = config.END_USER_MESSAGES.USER_UNSUBSCRIBED;
        return res.ok(response);
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
    },

    /**
     * This will give you the End User Subascription Status whether SUBSCRIBE/UNSUBSCRIBE/null(If msisdn does not registered yet)
     * @param req
     * @param res
     */
    getSubscriptionStatus: function(req,res){
        var msisdn = req.param("msisdn");
        var uuId = req.param("uuId");
        var appId = req.param("appId");

        sails.log.debug("IdeabizController: Get Subscription Status for the  appId: " + appId + ' UUID: ' + uuId + ' msisdn:' + msisdn);

        var response = {
            'subscriptionStatus': null //Will tell thet the user SUBSCRIBED/UNSUBSCRIBED/null
        };

        Application.findOne({id:appId}).exec(function(err, app){
            if(err){
                sails.log.error("IdeabizController: Error while getting the Application for the  appId: " + appId + ' error: ' + err);
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
                        return res.ok(response);
                    }

                    //Check whether the service is available for the operator for the subscribed msisdn.
                    if(appUser && appUser.msisdn){
                        response.subscriptionStatus = appUser.subscriptionStatus;
                    }else{
                        sails.log.error('IdeabizController: AppUser or msisdn does not exists for the query:' + JSON.stringify(query));
                    }
                    return res.ok(response);
                });
            } else{
                sails.log.error("IdeabizController: Application has been deleted for the appId: " + appId);
                return res.ok(response);
            }
        });
    }


};
