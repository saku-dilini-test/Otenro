/**
 * IdeabizSMSController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var adminAPI = require('./IdeabizAdminapiController');
var utilsService = require('../../services/utilsService');
var config = require('../../services/config');
var dateFormat = require('dateformat');

module.exports = {
    /**
     * api's refered:
     *      https://www.ideabiz.lk/sandbox/site/pages/api-sms.jag?task=sms-retrieve
     *      http://docs.ideabiz.lk/APIs/SMS#delivery-notifications
     * @param req
     * @param res
     * @returns {*}
     */
    onReceivingSMS : function(req,res){
        var reqBody = req.body;

        sails.log.debug("IdeabizSMSController: Request received to onReceivingSMS message body: " + JSON.stringify(reqBody));

        //Request forwarding to specified URLs
        utilsService.forwardRequests(req,res,'/sms/report','POST');

        try {
            var inboundSMSMessage = reqBody.inboundSMSMessageNotification.inboundSMSMessage;
            var msisdn = inboundSMSMessage.senderAddress;
            var message = inboundSMSMessage.message;
            var deviceUUID = null;
            var uuidStr = "uuid";
            var thisController = this;
            //Make the keyword from message body, format should be <keyword> <reg> or <unreg>
            var regStr = "start";
            var unregStr = "stop";
            var isRegistration = null;
            var prefix = '';
            var keyword = "";

            message = message.toLowerCase();

            if(message.indexOf(unregStr)==-1 && message.indexOf(regStr)==-1){
                sails.log.error("IdeabizSMSController: Message body does not contains '" + regStr + " or " + unregStr);
                return res.badRequest("SMS body does not contains required data");
            }

            if(message.indexOf(unregStr)!=-1){
                isRegistration = false;
                prefix = unregStr;
            }else if(message.indexOf(regStr)!=-1){
                isRegistration = true;
                prefix = regStr;
            }

            if(message.indexOf(uuidStr)!=-1){
                deviceUUID = message.substring(message.indexOf(uuidStr)+uuidStr.length+1);
            }

            if(message.indexOf(uuidStr)==-1){
                keyword = message.substring(message.indexOf(prefix)+prefix.length+1).trim();
            }else{
                keyword = message.substring(message.indexOf(prefix)+prefix.length+1,message.indexOf(uuidStr)-1).trim();
            }

            if (!keyword || (keyword && keyword.length===0)) {
                sails.log.error("IdeabizSMSController: SMS body does not contains keyword");
                return res.badRequest("SMS body does not contains required data");
            }

            var queryApp = { 'keyword': keyword };

            try {
                PublishDetails.findOne(queryApp).exec(function(err,app){
                    if(err){
                        sails.log.error("IdeabizSMSController: Error when searching for a app using keyword: " + keyword + " error: " + err);
                        return res.serverError(err);
                    }

                    if(!app){
                        sails.log.error("IdeabizSMSController: No app in the system for the keyword: " + keyword);
                        return res.badRequest("No app in the system for the keyword: " + keyword);
                    }

                    var appID = app.appId;
                    var queryUser = {
                        'msisdn': msisdn,
                        'appId': appID
                    }

                    AppUser.findOrCreate(queryUser, queryUser).exec(function (err, user) {
                        //Will update the user statuses while receiving a status change call
                        if (user) {
                            var setFields = {};
                            var isDeviceChangedByUser = false;

                            if(isRegistration) {
                                sails.log.debug("IdeabizSMSController: In Registration: msisdn: " + msisdn + " and for the appID: " + appID);

                                setFields.status = config.APP_USER_STATUS.ACTIVE;

                                if (!deviceUUID) {
                                    sails.log.error("IdeabizSMSController: No deviceUUID returned from msisdn: " + msisdn);
                                } else {
                                    setFields.deviceUUID = deviceUUID;

                                    isDeviceChangedByUser = user.deviceUUID && user.deviceUUID !== deviceUUID;//Check whether the User has changed the Device
                                }
                            }else{
                                sails.log.debug("IdeabizSMSController: In Un-Registration: msisdn: " + msisdn + " and for the appID: " + appID);

                                setFields.status = config.APP_USER_STATUS.INACTIVE;
                                setFields.unsubscribeDate = dateFormat(new Date(), "yyyy-mm-dd");
                                setFields.subscriptionStatus = config.IDEABIZ_SUBSCRIPTION_STATUS.UNSUBSCRIBED.code;
                                setFields.deviceUUID = null;
                            }

                            AppUser.update(queryUser, setFields).exec(function (err, users) {
                                if (err) {
                                    sails.log.error("IdeabizSMSController: Error when update the msisdn: " + msisdn + " error: " + err);
                                    return res.serverError("Error when update the msisdn: " + msisdn + " error: " + err);
                                }

                                if(isRegistration && users[0].deviceUUID && users[0].subscriptionStatus===config.IDEABIZ_SUBSCRIPTION_STATUS.SUBSCRIBED.code) {
                                    var message = "";
                                    if(isDeviceChangedByUser){
                                        message = "Successfully updated your device details." ;
                                    }else{
                                        message = "Your subscription to " + app.title  + " has been success." ;
                                    }

                                    sails.log.debug('IdeabizSMSController: Sent Push Notification message"%s" for msisdn: %s appId:%s AppUser ID:%s',message,msisdn,appID,users[0].id);
                                    adminAPI.notifyUsers(req, res, users[0], message);
                                }

                                return res.ok("ok");
                            });
                        }
                    });
                });
            }catch(err){
                sails.log.error("IdeabizSMSController: Exception in registerUser, error: " + err);
                res.serverError("Exception in registerUser, error: " + err);
            }
        }catch(err){
            sails.log.error("IdeabizSMSController: " + err);
            res.serverError(err);
        }
    }
};
