var config = require('../../services/config');
var utilsService = require('../../services/utilsService');
var chargingAPICallLogService = require('../../services/IdeabizChargingAPICallLogService');
var pushService = require('../../services/pushNotificationsService');
var dateFormat = require('dateformat');
var IdeaBizPINVerificationAPIService = require('../../services/IdeaBizPINVerificationAPIService');
var request = require('request');


/**
 * IdeabizAdminapiController
 *
 * @help        :: Ideabiz Admin api ::  http://docs.ideabiz.lk/Go_Live/Admin_API_v2
 */

module.exports = {

    /**
     * This will handle nessasary actions according to the Action receive via the request body
     * @param req
     * @param res
     */
    takeAction: function(req,res){
        var body = req.body;

        sails.log.debug("IdeabizAdminapiController: Request received to IdeabizAdminapiController.takeaction with req.body: " + JSON.stringify(body));

        //Request forwarding to specified URLs
        utilsService.forwardRequests(req,res,'/adminapi/index','POST');

        //Log the API call
        this.logApiCall(body);

        if(body && body.action){
            switch (body.action){
                case config.IDEABIZ_ADMIN_API_ACTIONS.STATE_CHANGE:
                    sails.log.debug("IdeabizAdminapiController: in state change");
                    this.onActionStateChange(req,res);
                    break;
                case config.IDEABIZ_ADMIN_API_ACTIONS.HISTORY:
                    sails.log.debug("IdeabizAdminapiController: in history");
                    this.onSearchHistory(req,res);
                    break;
                case config.IDEABIZ_ADMIN_API_ACTIONS.STATE_CHECK:
                    sails.log.debug("IdeabizAdminapiController: in state check");
                    this.onStateCheck(req,res);
                    break;
                default:
                    sails.log.error("IdeabizAdminapiController: Havent impliment the action: " + body.action);
                    return res.serverError("No Action implimented for: " + body.action);
            }
        }else{
            sails.log.error("IdeabizAdminapiController: Body is empty or no action");
            return res.badRequest('invalid request body');
        }
    },

    /**
     * History Sample api call:
     * http://192.168.8.112:1337/adminapi/index
     * JSON Body:
     * {
          "action" : "HISTORY",
          "msisdn" : "94777123456",
          "serviceID" : "0401f3c2-d2dd-4a25-bb30-4fe4cabbe988",
          "appID" : "APP001",
          "offset" : 0,
          "limit" : 2
        }
     **/
    onSearchHistory: function(req,res){
        var reqBody = req.body;
        var msisdn = reqBody.msisdn;
        var serviceID = reqBody.serviceID;
        var ideabizAppID = reqBody.appID;
        var offset = reqBody.offset;
        var limit = reqBody.limit;

        var notFound = {
            "subscription": {
                "number": msisdn,
                "status": "NOTFOUND"
            }
        };

        sails.log.info("IdeabizAdminapiController: Exec onSearchHistory");

        if(!ideabizAppID){
            sails.log.error("IdeabizAdminapiController: ideabizAppID not found");
            res.json(notFound);
            return;
        }

        if(!msisdn){
            sails.log.error("IdeabizAdminapiController: msisdn not found");
            res.json(notFound);
            return;
        }

        if(!serviceID){
            sails.log.error("IdeabizAdminapiController: Service ID not found");
            res.json(notFound);
            return;
        }

        var queryWhere = {
            where: {
                'serviceId': serviceID,
                'msisdn': msisdn
            },
            limit: limit,
            skip: offset,
            sort: 'date DESC'
        };

        IdeabizUserHistory.findOne(queryWhere).exec(function(err,history){
            if(err){
                sails.log.error("IdeabizAdminapiController: Error when searching for the history using serviceID: " + serviceID + " msisdn: " + msisdn + " error: " + err);
                return res.json(notFound);
            }

            if(!history){
                sails.log.error("IdeabizAdminapiController: No history in the system for the serviceID: " + serviceID);
                return res.json(notFound);
            }

            var responseBody = {
                "subscriberHistory": {
                    "msisdn" : msisdn,
                    "appID" : ideabizAppID,
                    "serviceID" : serviceID,
                    "offset" : offset,
                    "limit" : limit,
                    "history": []
                }
            };

            history.forEach(function(row){
                responseBody.subscriberHistory.history.push({
                    "datetime": row.date,
                    "trigger": "SYSTEM",
                    "event": row.subscriptionStatus,
                    "note": row.note,
                    "status": "SUCCESS",
                    "serviceID" : serviceID
                });
            });

            return res.json(responseBody);
        });
    },

    /**
     * State check Sample api call:
     * http://192.168.8.103:1337/adminapi/index
     * JSON Body:
     * {
          "action" : "STATE_CHECK",
          "msisdn" : "94777123456",
          "serviceID" : "0401f3c2-d2dd-4a25-bb30-4fe4cabbe988",
          "appID" : "APP001"
        }
     **/
    onStateCheck: function(req,res){
        var reqBody = req.body;
        var msisdn = reqBody.msisdn;
        var serviceID = reqBody.serviceID;
        var ideabizAppID = reqBody.appID;
        var thisController = this;

        var notFound = {
            "subscription": {
                "number": msisdn,
                "status": "NOTFOUND"
            }
        };

        sails.log.info("IdeabizAdminapiController: Exec onStateCheck");

        if(!ideabizAppID){
            sails.log.error("IdeabizAdminapiController: ideabizAppID not found");
            res.json(notFound);
            return;
        }

        if(!msisdn){
            sails.log.error("IdeabizAdminapiController: msisdn not found");
            res.json(notFound);
            return;
        }

        if(!serviceID){
            sails.log.error("IdeabizAdminapiController: Service ID not found");
            res.json(notFound);
            return;
        }

        var searchAppUser = {
            serviceID: serviceID,
            msisdn: msisdn
        };

        //Get the current status of the User
        AppUser.findOne(searchAppUser).exec(function(err, appUser){
            if(err){
                sails.log.error("IdeabizAdminapiController: There is an error when getting AppUser: " + err);
                return res.json(notFound);
            }

            //If user not registered
            if(!appUser){
                sails.log.error("IdeabizAdminapiController: No user registered for msisdn: " + msisdn + " for the serviceId: " + serviceID);
                return res.json(notFound);
            }

            //If user already registered
            var userCurrentStatus = appUser.status;

            //Get all the Subscribed and Unsubscribed history for the User

            var searchQuery = {
                where: {
                    OR: [
                        { subscriptionStatus: config.IDEABIZ_SUBSCRIPTION_STATUS.SUBSCRIBED.code },
                        { subscriptionStatus: config.IDEABIZ_SUBSCRIPTION_STATUS.UNSUBSCRIBED.code}
                    ],
                    serviceId: serviceID,
                    msisdn: msisdn
                },
                limit: 10,
                sort: 'date DESC'
            };

            IdeabizUserHistory.find(searchQuery).exec(function(err,history) {
                if (err) {
                    sails.log.error("IdeabizAdminapiController: Error when searching for the history using serviceID: " + serviceID + " msisdn: " + msisdn + " error: " + err);
                    return res.json(notFound);
                }

                if (!history) {
                    sails.log.error("IdeabizAdminapiController: No history in the system for the serviceID: " + serviceID);
                    return res.json(notFound);
                }

                var attrRegLog = "registration-log";
                var attrUnRegLog = "unregistration-log";

                var responseBody = {
                    "statusCode": "SUCCESS",
                    "message": "",
                    "data": {
                        "subscription": [{
                            "msisdn":msisdn,
                            "appID":ideabizAppID,
                            "serviceID" : serviceID,
                            "status":null,
                            "microSubscriptions" : 0
                        }]
                    }
                };

                var sub = responseBody.data.subscription[0];
                sub[attrRegLog] = null;
                sub[attrUnRegLog] = null;

                var count = 0;

                for(var i=0; i<history.length; i++){
                    var row = history[i];

                    if(sub[attrRegLog] && sub[attrUnRegLog]){
                        break;
                    }

                    if(!sub[attrRegLog] && row.subscriptionStatus === config.IDEABIZ_SUBSCRIPTION_STATUS.SUBSCRIBED.code){
                        var regLog_ = {
                            datetime: row.date,
                            method: row.method
                        }

                        sub[attrRegLog] = regLog_;

                        if(count===0) {
                            sub.status = 'REGISTERED';
                        }
                    }

                    if(!sub[attrUnRegLog] && row.subscriptionStatus === config.IDEABIZ_SUBSCRIPTION_STATUS.UNSUBSCRIBED.code){
                        var unregLog_ = {
                            datetime: row.date,
                            method: row.method
                        };

                        sub[attrUnRegLog] = unregLog_;

                        if(count===0) {
                            sub.status = 'UNREGISTERED';
                        }
                    }
                    count++;
                };
                return res.json(responseBody);
            });
        });
    },



    /**
     * State Change Sample api call:
     * http://192.168.8.103:1337/adminapi/index
     * JSON Body:
     * {
          "action":"STATE_CHANGE",
          "method":"RENTAL",
          "msisdn":"94777123456",
          "appID":"545",
          "serviceID":"0401f3c2-d2dd-4a25-bb30-4fe4cabbe988",
          "status":"SUBSCRIBED"
        }
     **/
    onActionStateChange : function(req,res){
        sails.log.debug("onActionStateChange");

        var reqBody = req.body;
        var msisdn = reqBody.msisdn;
        var serviceID = reqBody.serviceID;
        var subscriptionStatus = reqBody.status;
        var method = reqBody.method;
        var note = reqBody.note;
        var actionStateChangeInstance = this;

        msisdn = msisdn.substring(msisdn.length-11);

        var notFound = {
            "subscription": {
                "number": msisdn,
                "status": "NOTFOUND"
            }
        };
        //Checking the incoming status is valid with our Statuses in config.IDEABIZ_SUBSCRIPTION_STATUS <- Should remove once we impliment the renewal api

        if(!actionStateChangeInstance.isStatusValid(subscriptionStatus)){
            sails.log.error("IdeabizAdminapiController: Incoming status: " + subscriptionStatus + " is not matching any status in config.IDEABIZ_STATUS");
            return res.badRequest("Invalid status: " + subscriptionStatus);
        }

        try {
            if(reqBody.status==config.IDEABIZ_SUBSCRIPTION_STATUS.SUBSCRIBED.code||reqBody.status==config.IDEABIZ_SUBSCRIPTION_STATUS.UNSUBSCRIBED.code ) {

                if(!serviceID){
                    sails.log.error('IdeabizAdminapiController: The serviceID sent through the response is not valid: ', serviceID);
                    return res.badRequest("IThe serviceID sent through the response is not valid: " + serviceID);
                }

                var queryApp = { 'serviceID': serviceID };

                try {
                    PublishDetails.findOne(queryApp).exec(function(err,publishDetailsData){
                        if(err){
                            sails.log.error("IdeabizAdminapiController: Error when searching for a app using serviceID: " + serviceID + " error: " + err);
                            return res.serverError(err);
                        }

                        if(!publishDetailsData){
                            sails.log.error("IdeabizAdminapiController: No app in the system for the serviceID: " + serviceID);
                            return res.badRequest("No app in the system for the serviceID: " + serviceID);
                        }

                        var appID = publishDetailsData.appId;
                        var queryUser = {
                            'msisdn': msisdn,
                            'appId': appID
                        }

                        AppUser.findOne(queryUser).exec(function (err, user) {
                            //Will update the user statuses while receiving a status change call
                            if (user) {
                                var log = {
                                    'date': new Date(),
                                    'appID': user.appID,
                                    'msisdn': msisdn,
                                    'serviceId': serviceID,
                                    'subscriptionStatus': subscriptionStatus,
                                    'method': method,
                                    'note': note,
                                    'messageBody': reqBody
                                };

                                actionStateChangeInstance.logStateChange(log);



                                if(reqBody.status==config.IDEABIZ_SUBSCRIPTION_STATUS.SUBSCRIBED.code) {
                                    var setFields = {
                                        'status': config.APP_USER_STATUS.ACTIVE,
                                        'registeredDate':dateFormat(new Date(), "yyyy-mm-dd"),
                                        'subscriptionStatus':config.IDEABIZ_SUBSCRIPTION_STATUS.SUBSCRIBED.code
                                    };

                                    if(user.subscriptionStatus==config.IDEABIZ_SUBSCRIPTION_STATUS.SUBSCRIBED.code){
                                        sails.log.debug('IdeabizAdminapiController: msisdn: ' + msisdn + ' already Subscribed');
                                    }else if(user.subscriptionStatus==config.IDEABIZ_SUBSCRIPTION_STATUS.UNSUBSCRIBED.code){
                                        var paymentQuery = {
                                            appId: appID,
                                            msisdn: msisdn,
                                            date: dateFormat(new Date(), "yyyy-mm-dd")
                                        };

                                        SubscriptionPayment.findOne(paymentQuery).exec(function (err, payment) {
                                            if (err){
                                                sails.log.error("IdeabizAdminapiController: Error when searching SubscriptionPayment: " + JSON.stringify(paymentQuery));
                                                return res.serverError(err);
                                            }

                                            if(payment){
                                                sails.log.debug('IdeabizAdminapiController: There is a payment record for today for msisdn: ' + msisdn + ' as payment status: ' + payment.status);
                                            }else{
                                                sails.log.debug('IdeabizAdminapiController: No payment record for today therefore will charge for the msisdn: ' + msisdn);
                                                actionStateChangeInstance.sendForCharging(msisdn,serviceID,publishDetailsData,user.appID,function(data,err){
                                                    if(err){
                                                        sails.log.error('IdeabizAdminapiController: Issue when send for charging for msisdn: %s appId:%s err:%s',msisdn,user.appID,err);
                                                    }else {
                                                        sails.log.debug('IdeabizAdminapiController: Charging success for msisdn: %s appId:%s',msisdn,user.appID);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }else{
                                    var setFields = {
                                        'status': config.APP_USER_STATUS.INACTIVE,
                                        'unsubscribeDate':dateFormat(new Date(), "yyyy-mm-dd"),
                                        'subscriptionStatus':config.IDEABIZ_SUBSCRIPTION_STATUS.UNSUBSCRIBED.code,
                                        'deviceUUID': null
                                    };
                                }

                                sails.log.debug("IdeabizAdminapiController: In Subscription: User exists for the msisdn: " + msisdn + " and for the appID: " + appID);

                                AppUser.update(queryUser, setFields).exec(function (err, users) {
                                    if (err) {
                                        sails.log.error("IdeabizAdminapiController: Error when update the msisdn: " + msisdn + " error: " + err);
                                        return res.serverError("Error when update the msisdn: " + msisdn + " error: " + err);
                                    }

                                    if(user.deviceUUID) {
                                        // Send the notifications to the AppUser
                                        var message = "Your subscription to " + publishDetailsData.title + " has been success. Click to open " + publishDetailsData.title;
                                        sails.log.debug('IdeabizAdminapiController: Sent Push Notification message"%s" for msisdn: %s appId:%s AppUser ID:%s',message,msisdn,appID,user.id);
                                        actionStateChangeInstance.notifyUsers(req, res, user, message);
                                    }else{
                                        sails.log.error('IdeabizAdminapiController: User does not have a UUID attached. msisdn: %s appId:%s AppUser ID:%s',msisdn,appID,user.id);
                                    }

                                    return res.ok("User updated");
                                });
                            }else {
                                var newAppUser = {
                                    'msisdn': msisdn,
                                    'appId': appID,
                                    'status': config.APP_USER_STATUS.ACTIVE,
                                    'registeredDate':dateFormat(new Date(), "yyyy-mm-dd"),
                                    'subscriptionStatus':config.IDEABIZ_SUBSCRIPTION_STATUS.SUBSCRIBED.code

                                };

                                AppUser.create(newAppUser).exec(function (err, user) {
                                    if (err) {
                                        return res.serverError(err);
                                    }
                                    sails.log.debug("IdeabizAdminapiController: New user created for the msisdn: " + msisdn + " serviceID=" + publishDetailsData.serviceID);
                                    actionStateChangeInstance.sendForCharging(msisdn,serviceID,publishDetailsData,appID,function(data,err){
                                        if(err){
                                            sails.log.error('IdeabizAdminapiController: (New user created) Issue when send for charging for msisdn: %s appId:%s err:%s',msisdn,appID,err);
                                        }else {
                                            sails.log.debug('IdeabizAdminapiController: (New user created) Charging success for msisdn: %s appId:%s',msisdn,appID);
                                        }
                                    });
                                    return res.created(user);
                                });
                            }
                        });
                    });
                }catch(err){
                    sails.log.error("IdeabizAdminapiController: Exception in registerUser, error: " + err);
                    res.serverError("Exception in registerUser, error: " + err);
                }
            }

        }catch(err){

            sails.log.error("IdeabizAdminapiController: Exception in registerUser, error: " + err);
            res.serverError("Exception in registerUser, error: " + err);
        }
    },

    logApiCall : function(log){
        sails.log.info("IdeabizAdminapiController: Exec takeaction body: " + JSON.stringify(log));

        // IdeabizUserHistory.create({ 'log': log }).exec(function(err,log){
        //     // sails.log.debug("log inserted");
        // });
    },

    logStateChange : function(log){
        IdeabizUserHistory.create(log).exec(function(err,log){
            // sails.log.debug("log inserted");
        });
    },

    isStatusValid: function(status){
        if(config.IDEABIZ_SUBSCRIPTION_STATUS[status] || config.IDEABIZ_RENTAL_STATUS[status] ){
            return true;
        }else{
            return false;
        }
    },

    chargeUserAPiCall :function (msisdn,appId,callback) {

        var queryApp = {appId:appId};
        var chargeUserAPiCallInstance =this;

        PublishDetails.findOne(queryApp).exec(function(err,publishDetailsData) {
            if (err) {
                sails.log.error("IdeabizAdminapiController: Error when searching publishDetails Data: "  + " error: " + err);
                return callback(null,err);
            }else {
                sails.log.debug("IdeabizAdminapiController: Found publishDetails. Calling sendForCharging");
                chargeUserAPiCallInstance.sendForCharging(msisdn,publishDetailsData.serviceID, publishDetailsData,appId,function(data,err){
                    if (err&&data==null){
                        return callback(null, "error");

                    } else if (data){
                       return callback({payment:data.payment}, null);
                    }
                });

            }
        })
    },


    sendForCharging:function(msisdn,serviceID,publishDetailsData,appID,callback){
        //Record the Charging request
        chargingAPICallLogService.addToChargingMap(appID,msisdn);

        sails.log.debug("IdeabizAdminapiController: Sending for Charging msisdn: %s serviceID: %s appID: %s ",msisdn,serviceID,appID);
        var sendForChargingIntance = this;

        sails.log.debug("IdeabizAdminapiController: About to Call the getBalance msisdn: %s serviceID: %s appID: %s ",msisdn,serviceID,appID);
        IdeaBizPINVerificationAPIService.getBalance(msisdn,function(response,err){
            if(err){
                sails.log.debug("IdeabizAdminapiController: getBalance failed for the mobile: " + msisdn + " err:" + JSON.stringify(err));
                chargingAPICallLogService.setInProgress(appID,msisdn,false);
                return callback(null, "error");
            }
            if(!(response && response.body)){
                sails.log.debug("IdeabizAdminapiController: Response received in getBalance request seems not valid response: " + JSON.stringify(response));
                chargingAPICallLogService.setInProgress(appID,msisdn,false);
                return callback(null, "error");
            }

            var responseBody = JSON.parse(response.body);

            if(responseBody && responseBody.statusCode === "ERROR"){
                sails.log.debug("IdeabizAdminapiController: Error while requesting the getBalance, err:  " + responseBody.message);
                chargingAPICallLogService.setInProgress(appID,msisdn,false);
                return callback(null, "error");

            }else if (responseBody && response.statusCode === 200){

                sails.log.debug("IdeabizAdminapiController: Balance check success for the msisdn: %s serviceID %s appID: %s ",msisdn,serviceID,appID);
                sails.log.debug("IdeabizAdminapiController: responseBody.accountInfo.balance " + responseBody.accountInfo.balance);

               /* return callback(null, "error");*/
                sails.log.debug("IdeabizAdminapiController: Call getChargeAmount msisdn: %s serviceID %s appID: %s ",msisdn,serviceID,appID);
                sendForChargingIntance.getChargeAmount(publishDetailsData,msisdn,function(data, err){
                    if(err){
                        sails.log.debug("IdeabizAdminapiController: getChargeAmount failed for the mobile: "+ err);
                        chargingAPICallLogService.setInProgress(appID,msisdn,false);
                        return callback(null, "error");
                    }
                    if (responseBody.accountInfo.balance > data.amount){
                        sails.log.debug("IdeabizAdminapiController: Call IdeaBizPINVerificationAPIService.chargeUser msisdn: %s serviceID %s appID: %s ",msisdn,serviceID,appID);
                        IdeaBizPINVerificationAPIService.chargeUser(
                            msisdn,serviceID,data.amount,function(response,err){
                                if(err){
                                    sails.log.debug("IdeabizAdminapiController: charge failed for the mobile: " + msisdn + " err:" + JSON.stringify(err));
                                    chargingAPICallLogService.setInProgress(appID,msisdn,false);
                                    return callback(null, "error");
                                }

                                sails.log.debug("IdeabizAdminapiController: Response after requesting charge: msisdn: %s serviceID %s appID: %s Response: %s",msisdn,serviceID,appID,JSON.stringify(response));

                                if(!(response && response.body)){
                                    sails.log.debug("IdeabizAdminapiController: Response received in charge request seems not valid response: " + JSON.stringify(response));
                                    chargingAPICallLogService.setInProgress(appID,msisdn,false);
                                    return callback(null, "error");
                                }

                                var responseBody = JSON.parse(response.body);

                                if(responseBody && responseBody.statusCode === "ERROR"){

                                    sails.log.debug("IdeabizAdminapiController: Error while requesting the charge, err:  " + responseBody.message);
                                    chargingAPICallLogService.setInProgress(appID,msisdn,false);
                                    return callback(null, "error");

                                }else if (responseBody && (response.statusCode === 200 || response.statusCode === 201)){

                                   // console.log(responseBody);
                                    var paymentQuery = {
                                        appId: publishDetailsData.appId,
                                        msisdn: msisdn,
                                        date: dateFormat(new Date(),  "yyyy-mm-dd")
                                    };

                                    SubscriptionPayment.findOne(paymentQuery).exec(function (err, payment) {

                                        if (err){
                                            sails.log.error("IdeabizAdminapiController: Error when searching for a payment for the details: " + JSON.stringify(paymentQuery));
                                        }

                                        if(payment){
                                            SubscriptionPayment.update(paymentQuery, {status:1,amount:data.amount}).exec(function (err, updatedPayment) {
                                                if (err) {
                                                    sails.log.error("IdeabizAdminapiController: Payment updated Error");
                                                    chargingAPICallLogService.setInProgress(appID,msisdn,false);
                                                    return callback(null, "error");

                                                }else {
                                                    sails.log.debug("IdeabizAdminapiController: Payment updated successfully for msisdn: %s serviceID: %s appID: %s Payment: %s",msisdn,serviceID,appID,JSON.stringify(updatedPayment));
                                                    chargingAPICallLogService.setInProgress(appID,msisdn,false);
                                                    return callback({payment:"ok"}, null);
                                                }
                                            });

                                        }else {
                                            var saveData = {appId:publishDetailsData.appId,msisdn:msisdn,amount:data.amount,
                                                operator:data.operator,status:1,date:dateFormat(new Date(), "yyyy-mm-dd")};

                                            SubscriptionPayment.create(saveData).exec(function (err, newPayment) {

                                                if (err) {
                                                    sails.log.error("IdeabizAdminapiController: SubscriptionPayment Create Error");
                                                    chargingAPICallLogService.setInProgress(appID,msisdn,false);
                                                    return callback(null, "error");
                                                }
                                                sails.log.debug("IdeabizAdminapiController: Payment created successfully for msisdn: %s serviceID: %s appID: %s Payment:%s ",msisdn,serviceID,appID,JSON.stringify(newPayment));
                                                chargingAPICallLogService.setInProgress(appID,msisdn,false);
                                                return callback({payment:"ok"}, null);
                                            });

                                        }

                                    });
                                }else {
                                    sails.log.debug("IdeabizAdminapiController: Error while requesting the charge, err: %s  for msisdn: %s serviceID: %s appID: %s ",responseBody.message,msisdn,serviceID,appID);
                                    sendForChargingIntance.getOperator(msisdn,function(operator, err){

                                        if (err) {
                                            sails.log.error("IdeabizAdminapiController: Operator find Error");
                                            chargingAPICallLogService.setInProgress(appID,msisdn,false);
                                            return callback(null, "error");
                                        }else {

                                            var data= {appId:publishDetailsData.appId,date:dateFormat(new Date(), "yyyy-mm-dd"),
                                                statusCode:response.statusCode,operator:operator};

                                            FailedTransactionLog.create(data).exec(function (err, result) {

                                                if (err) {
                                                    sails.log.error("IdeabizAdminapiController: FailedTransactionLog Create Error");
                                                    chargingAPICallLogService.setInProgress(appID,msisdn,false);
                                                    return callback(null, "error");
                                                }
                                                chargingAPICallLogService.setInProgress(appID,msisdn,false);
                                                return callback(null, "error");
                                            });
                                        }

                                    });

                                }
                            });
                    }else {
                        sails.log.debug("IdeabizAdminapiController: Account balance: %s is not enough to charge the service amount: %s for the  msisdn: %s serviceID %s appID: %s ",responseBody.accountInfo.balance,data.amount,msisdn,serviceID,appID);
                        var data = {appId:publishDetailsData.appId,msisdn:msisdn,
                            amount:0.0,operator:data.operator,status:0 ,date:dateFormat(new Date(), "yyyy-mm-dd")}

                        SubscriptionPayment.create(data).exec(function (err, newPayment) {

                            if (err) {
                                sails.log.error("IdeabizAdminapiController: SubscriptionPayment Create Error");
                                chargingAPICallLogService.setInProgress(appID,msisdn,false);
                                return callback(null, "error");
                            }
                            sails.log.debug("IdeabizAdminapiController: Payment created successfully with status 0 and for amnt 0.0 for msisdn: %s serviceID: %s appID: %s Payment:%s ",msisdn,serviceID,appID,JSON.stringify(newPayment));
                            chargingAPICallLogService.setInProgress(appID,msisdn,false);
                            return callback(null, "error");
                        });
                    }
                })
            }else {
                sails.log.debug("IdeabizAdminapiController: Error while requesting the balance check, err:  " + responseBody.message);
                sendForChargingIntance.getOperator(msisdn,function(operator, err){
                    if (err) {
                        sails.log.error("IdeabizAdminapiController: Operator find Error");
                        chargingAPICallLogService.setInProgress(appID,msisdn,false);
                        return callback(null, "error");
                    }else {
                        var data= {appId:publishDetailsData.appId,date:dateFormat(new Date(), "yyyy-mm-dd"),
                            statusCode:response.statusCode,operator:operator};

                        FailedTransactionLog.create(data).exec(function (err, result) {

                            if (err) {
                                sails.log.error("IdeabizAdminapiController: FailedTransactionLog Create Error");
                                chargingAPICallLogService.setInProgress(appID,msisdn,false);
                                return callback(null, "error");
                            }
                            chargingAPICallLogService.setInProgress(appID,msisdn,false);
                            return callback(null, "error");
                        });

                    }
                });
            }
        });
    },


    updateRenewalAppUser:function (appId,msisdn,intervalObj ,callback){

        var renewalQuery = {
            appId: appId,
            msisdn: msisdn
        };

        RenewalAppUser.findOne(renewalQuery).exec(function (err, renewalAppUser) {
            if (err) {
                sails.log.error("IdeabizAdminapiController: Error when searching for a RenewalAppUser for the details: " + JSON.stringify(renewalQuery));
                return callback(null, "error");
            }
            if (renewalAppUser) {
                var nextPaymentDate = "";
                var date = new Date();

                if(intervalObj.noOfDays !== 1){

                    date.setDate(date.getDate() + intervalObj.noOfDays);
                    nextPaymentDate = dateFormat(date,"yyyy-mm-dd");
                }
                RenewalAppUser.update(renewalQuery, {nextPaymentDate:nextPaymentDate}).exec(function (err, result) {
                    if (err) {
                        sails.log.error("IdeabizAdminapiController: RenewalAppUser updated Error");
                        return callback(null, "error");

                    }else {
                        return callback({updateRenewalAppUser:"ok"}, null);
                    }
                });
            }else {
                sails.log.error("IdeabizAdminapiController: RenewalAppUser not found: " + JSON.stringify(renewalQuery));
                return callback(null, "error");
            }
        });
    },




    getOperator:function(msisdn,callback){
        Operator.findOne({operator_code:parseInt(msisdn.substring(0, 4))}).exec(function (err, data) {
            if (err) {
                sails.log.error("IdeabizAdminapiController: Operator find Error");
                return callback(null,err);
            }else {
                return callback( data.operator,err);
            }

        });
    },

    getChargeAmount:function(publishDetailsData,msisdn,callback){

        var actionStateChangeInstance =this;

        publishDetailsData.operators.forEach(function(operatorData) {

            actionStateChangeInstance.getOperator(msisdn,function(operator, err){

                if (err) {
                    sails.log.error("IdeabizAdminapiController: Operator find Error");
                    return callback(null,err);

                }else if (operatorData.operator.toLowerCase()==operator){
                     return callback({amount:operatorData.amount,operator:operator},err);
                }
            });
        });

    },

    getAppUserStatus: function(subscriptionStatus){
        sails.log.debug("IdeabizAdminapiController: subscriptionStatus=" + subscriptionStatus);
        if(this.isStatusValid(subscriptionStatus)){
            switch (subscriptionStatus){
                case config.IDEABIZ_SUBSCRIPTION_STATUS.SUBSCRIBED.code:
                    return config.APP_USER_STATUS.ACTIVE;
                    break;
                case config.IDEABIZ_SUBSCRIPTION_STATUS.RENTAL_CHARGED.code:
                    return config.APP_USER_STATUS.ACTIVE;
                    break;
                default:
                    return config.APP_USER_STATUS.INACTIVE;
            }
        }
        return config.APP_USER_STATUS.INACTIVE;
    },

    notifyUsers: function(req,res,user,message){
        DeviceId.find({
            where: {appId:user.appId,deviceUUID:user.deviceUUID},
            sort: 'createdAt DESC'
        }).exec(function (err, devices) {
            if(devices && devices.length>0) {
                var messageObj = {
                    "to": devices[0].deviceId,
                    "notification": {
                        "body": message
                    }
                };
                pushService.sendPushNotification(messageObj);
            }else{
                sails.log.debug("IdeabizAdminapiController: No devices found to send the push notification for the msisdn:" + user.msisdn + " appID:" + user.appId + " ");
            }
        });
    }
};
