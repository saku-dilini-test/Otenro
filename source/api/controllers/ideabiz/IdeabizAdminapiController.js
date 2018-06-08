var config = require('../../services/config');
var pushService = require('../../services/pushNotificationsService');

/**
 * IdeabizAdminapiController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
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
                    return res.serverError("No Action implimented for: " + body.action);
                    break;
                case config.IDEABIZ_ADMIN_API_ACTIONS.STATE_CHECK:
                    sails.log.debug("in state check");
                    return res.serverError("No Action implimented for: " + body.action);
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

    onActionStateChange : function(req,res){
        sails.log.debug("onActionStateChange");

        var reqBody = req.body;
        var msisdn = reqBody.msisdn;
        var serviceID = reqBody.serviceID;
        var subscriptionStatus = reqBody.status;
        var actionStateChangeInstance = this;
        //Checking the incoming status is valid with our Statuses in config.IDEABIZ_SUBSCRIPTION_STATUS <- Should remove once we impliment the renewal api

        if(!actionStateChangeInstance.isSubscriptionStatusValid(subscriptionStatus)){
            sails.log.error("Incoming status: " + subscriptionStatus + " is not matching any status in config.IDEABIZ_SUBSCRIPTION_STATUS");
            return res.notFound("Invalid status: " + subscriptionStatus);
        }

        var queryApp = { 'serviceID': serviceID };

        try {
            PublishDetails.findOne(queryApp).exec(function(err,app){
                if(err){
                    sails.log.error("Error when searching for a app using serviceID: " + serviceID + " error: " + err);
                    return res.serverError(err);
                }

                if(!app){
                    sails.log.error("No app in the system for the serviceID: " + serviceID);
                    return res.notFound("No app in the system for the serviceID: " + serviceID);
                }

                var appID = app.appId;
                var queryUser = {
                    'msisdn': msisdn,
                    'appID': appID
                }

                AppUser.findOne(queryUser).exec(function (err, user) {
                    var appUserStatus = actionStateChangeInstance.getAppUserStatus(subscriptionStatus);

                    //Will update the user statuses while receiving a status change call
                    if (user) {
                        sails.log.debug("User exists for the msisdn: " + msisdn + " and will update the statuses");
                        var currentSubscriptionStatus = user.subscriptionStatus;

                        var setFields = {
                            'status': appUserStatus,
                            'subscriptionStatus': subscriptionStatus
                        };

                        AppUser.update(queryUser, setFields).exec(function(err, users){
                            if(err){
                                sails.log.error("Error when update the msisdn: " + msisdn + " error: " + err);
                                return res.serverError("Error when update the msisdn: " + msisdn + " error: " + err);
                            }

                            sails.log.debug("Update users: " + users.length);

                            //Send the notifications to the AppUser
                            actionStateChangeInstance.notifyUsers(req,res,users,currentSubscriptionStatus,subscriptionStatus);

                            return res.ok("Status updated");
                        });
                    }else {
                        //Will create new User if him self is not a subscribed user in the system before
                        var newAppUser = {
                            'msisdn': msisdn,
                            'appID': appID,
                            'status': appUserStatus,
                            'subscriptionStatus': subscriptionStatus,
                            'lastAccessTime': new Date(),
                            'registeredDate': new Date().toLocaleString()
                        };

                        AppUser.create(newAppUser).exec(function (err, user) {
                            if (err) {
                                return res.serverError(err);
                            }

                            sails.log.debug("New user created for the msisdn: " + msisdn);

                            //Send the notifications to the AppUser
                            actionStateChangeInstance.notifyUsers(req, res, user, currentSubscriptionStatus, subscriptionStatus);

                            return res.created(user);
                        });
                    }
                });
            });
        }catch(err){
            sails.log.error("Exception in registerUser, error: " + err);
            res.serverError("Exception in registerUser, error: " + err);
        }
    },

    logApiCall : function(log){
        IdeabizAPICallLog.create({ 'log': log }).exec(function(err,log){
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
                default:
                    return config.APP_USER_STATUS.INACTIVE;
            }
        }
        return config.APP_USER_STATUS.INACTIVE;
    },

    notifyUsers: function(req,res,users,oldSubscriptionStatus,newSubscriptionStatus){

        // DeviceId.findOne

        var messages =  [
            {
                "to": "f1lYHGPvvF0:APA91bFrEPln_eCLmchfTG5iGUzxUc-_Zm70yoboxUNI_-pjfM1sKYNb0UNni4BFHSn2VBtlJd5W5cazzIjFvDXvGM-D2Xv8DFZo2xW2D7sXr6h00n2iI9J-sXQ2LfYnwyIQCFeOh9Gi",
                "notification": {
                    "body" : "111111111"
                }
            }
        ];
        sails.log.debug("Notify users: " + users + " Subscription Status changed from " + oldSubscriptionStatus + " to " + newSubscriptionStatus);
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