var config = require('../../services/config');
var pushService = require('../../services/pushNotificationsService');

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

        sails.log.debug("Request received to IdeabizAdminapiController.takeaction with req.body: " + JSON.stringify(body));

        //Log the API call
        this.logApiCall(body);

        if(body && body.action){
            switch (body.action){
                case config.IDEABIZ_ADMIN_API_ACTIONS.STATE_CHANGE:
                    sails.log.debug("in state change");
                    this.onActionStateChange(req,res);
                    break;
                case config.IDEABIZ_ADMIN_API_ACTIONS.HISTORY:
                    sails.log.debug("in history");
                    this.onSearchHistory(req,res);
                    break;
                case config.IDEABIZ_ADMIN_API_ACTIONS.STATE_CHECK:
                    sails.log.debug("in state check");
                    this.onStateCheck(req,res);
                    break;
                default:
                    sails.log.error("Havent impliment the action: " + body.action);
                    return res.serverError("No Action implimented for: " + body.action);
            }
        }else{
            sails.log.error("Body is empty or no action");
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

        sails.log.info("Exec onSearchHistory");

        if(!ideabizAppID){
            sails.log.error("ideabizAppID not found");
            res.json(notFound);
            return;
        }

        if(!msisdn){
            sails.log.error("msisdn not found");
            res.json(notFound);
            return;
        }

        if(!serviceID){
            sails.log.error("Service ID not found");
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
                sails.log.error("Error when searching for the history using serviceID: " + serviceID + " msisdn: " + msisdn + " error: " + err);
                return res.json(notFound);
            }

            if(!history){
                sails.log.error("No history in the system for the serviceID: " + serviceID);
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

        sails.log.info("Exec onStateCheck");

        if(!ideabizAppID){
            sails.log.error("ideabizAppID not found");
            res.json(notFound);
            return;
        }

        if(!msisdn){
            sails.log.error("msisdn not found");
            res.json(notFound);
            return;
        }

        if(!serviceID){
            sails.log.error("Service ID not found");
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
                sails.log.error("There is an error when getting AppUser: " + err);
                return res.json(notFound);
            }

            //If user not registered
            if(!appUser){
                sails.log.error("No user registered for msisdn: " + msisdn + " for the serviceId: " + serviceID);
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
                    sails.log.error("Error when searching for the history using serviceID: " + serviceID + " msisdn: " + msisdn + " error: " + err);
                    return res.json(notFound);
                }

                if (!history) {
                    sails.log.error("No history in the system for the serviceID: " + serviceID);
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

        var notFound = {
            "subscription": {
                "number": msisdn,
                "status": "NOTFOUND"
            }
        };
        //Checking the incoming status is valid with our Statuses in config.IDEABIZ_SUBSCRIPTION_STATUS <- Should remove once we impliment the renewal api

        if(!actionStateChangeInstance.isSubscriptionStatusValid(subscriptionStatus)){
            sails.log.error("Incoming status: " + subscriptionStatus + " is not matching any status in config.IDEABIZ_SUBSCRIPTION_STATUS");
            return res.badRequest("Invalid status: " + subscriptionStatus);
        }

        try {
            var queryUser = {
                'msisdn': msisdn,
                'serviceId': serviceID
            }

            console.log(queryUser);

            AppUser.find(queryUser).exec(function (err, user) {
                console.log(user);

                var appUserStatus = actionStateChangeInstance.getAppUserStatus(subscriptionStatus);

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

                            sails.log.debug("User exists for the msisdn: " + msisdn + " and will update the statuses");
                            var currentSubscriptionStatus = user.subscriptionStatus;

                            var setFields = {
                                'status': appUserStatus,
                                'subscriptionStatus': subscriptionStatus
                            };

                            console.log("setFields " + JSON.stringify(setFields));

                            AppUser.update(queryUser, setFields).exec(function(err, users){

                                console.log(users);

                                if(err){
                                    sails.log.error("Error when update the msisdn: " + msisdn + " error: " + err);
                                    return res.serverError("Error when update the msisdn: " + msisdn + " error: " + err);
                                }

                                sails.log.debug("Update users: " + users.length);

                                actionStateChangeInstance.logStateChange(log);

                                //Send the notifications to the AppUser
                                actionStateChangeInstance.notifyUsers(req,res,users,currentSubscriptionStatus,subscriptionStatus);

                                return res.ok("Status updated");
                            });



                }else{
                        sails.log.error("No user registered for msisdn: " + msisdn + " for the serviceId: " + serviceID);
                        return res.json(notFound);
                }
            });
        }catch(err){
            sails.log.error("Exception in registerUser, error: " + err);
            res.serverError("Exception in registerUser, error: " + err);
        }
    },

    logApiCall : function(log){
        sails.log.info("Exec takeaction body: " + JSON.stringify(log));

        // IdeabizUserHistory.create({ 'log': log }).exec(function(err,log){
        //     // sails.log.debug("log inserted");
        // });
    },

    logStateChange : function(log){
        IdeabizUserHistory.create(log).exec(function(err,log){
            // sails.log.debug("log inserted");
        });
    },

    isSubscriptionStatusValid: function(subscriptionStatus){
        if(config.IDEABIZ_SUBSCRIPTION_STATUS[subscriptionStatus]){
            return true;
        }else{
            return false;
        }
    },

    getAppUserStatus: function(subscriptionStatus){
        console.log("subscriptionStatus=" + subscriptionStatus);
        if(this.isSubscriptionStatusValid(subscriptionStatus)){
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

    notifyUsers: function(req,res,users,oldSubscriptionStatus,newSubscriptionStatus){

        console.log(users[0].msisdn);



        DeviceId.findOne({appId:users[0].appId,deviceUUID:users[0].deviceUUID}).exec(function (err, device) {

            Application.findOne({id:users[0].appId}).exec(function (err, app) {

                pushService.sendPushNotifications(device[0].deviceId , "Your subscription to "+ app.appName + " has been successfully renewed. Click to open " +app.appName );
            });
        });

    },

    sendPushMessage: function(req,res){
        var messages =  [
            {
                "to": "f1lYHGPvvF0:APA91bFrEPln_eCLmchfTG5iGUzxUc-_Zm70yoboxUNI_-pjfM1sKYNb0UNni4BFHSn2VBtlJd5W5cazzIjFvDXvGM-D2Xv8DFZo2xW2D7sXr6h00n2iI9J-sXQ2LfYnwyIQCFeOh9Gi",
                "notification": {
                    "body" : "111111111"
                }
            }, {
                "to": "f1lYHGPvvF0:APA91bFrEPln_eCLmchfTG5iGUzxUc-_Zm70yoboxUNI_-pjfM1sKYNb0UNni4BFHSn2VBtlJd5W5cazzIjFvDXvGM-D2Xv8DFZo2xW2D7sXr6h00n2iI9J-sXQ2LfYnwyIQCFeOh9Gi",
                "notification": {
                    "body" : "222222222"
                }
            }
        ];

        pushService.sendPushNotifications(messages);
        return res.ok();
    }
};