/**
 * IdeabizSMSController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var config = require('../../services/config');

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

        sails.log.debug("onReceivingSMS message body: " + JSON.stringify(reqBody,null,2));

        try {
            var inboundSMSMessage = reqBody.inboundSMSMessageNotification.inboundSMSMessage;
            var msisdn = inboundSMSMessage.senderAddress;
            var message = inboundSMSMessage.message;
            var deviceUUID = reqBody.inboundSMSMessageNotification.callbackData.deviceUUID;
            // var serviceID = reqBody.inboundSMSMessageNotification.callbackData.serviceID;
            // var appId = reqBody.inboundSMSMessageNotification.callbackData.appId;
            var thisController = this;

            //Make the keyword from message body, format should be <keyword> <reg> or <unreg>
            var regStr = "reg";
            var unregStr = "unreg";
            var isRegistration = null;
            var postfix = '';

            if(message.indexOf(unregStr)>0){
                isRegistration = false;
                postfix = unregStr;
            }else if(message.indexOf(regStr)>0){
                isRegistration = true;
                postfix = regStr;
            }

            if(!isRegistration){
                sails.log.error("Message body does not contains '" + regStr + " or " + unregStr);
                return res.badRequest("SMS body does not contains required data");
            }

            var keyword = message.substring(0, message.indexOf(postfix)-1);

            if (!keyword || (keyword && keyword.length===0)) {
                sails.log.error("SMS body does not contains keyword");
                return res.badRequest("SMS body does not contains required data");
            }

            var queryApp = { 'keyword': keyword };

            try {
                PublishDetails.findOne(queryApp).exec(function(err,app){
                    if(err){
                        sails.log.error("Error when searching for a app using keyword: " + keyword + " error: " + err);
                        return res.serverError(err);
                    }

                    if(!app){
                        sails.log.error("No app in the system for the keyword: " + keyword);
                        return res.badRequest("No app in the system for the keyword: " + keyword);
                    }

                    var appID = app.appId;
                    var queryUser = {
                        'msisdn': msisdn,
                        'appID': appID
                    }

                    AppUser.findOne(queryUser).exec(function (err, user) {
                        //Will update the user statuses while receiving a status change call
                        if (user) {
                            if(isRegistration) {
                                sails.log.debug("In Registration: User exists for the msisdn: " + msisdn + " and for the appID: " + appID);

                                var setFields = {
                                    'deviceUUID': deviceUUID
                                };

                                if (user.status === config.APP_USER_STATUS.ACTIVE) {
                                    sails.log.info("Active msisdn: " + msisdn + " just update the deviceUUID");
                                }

                                AppUser.update(queryUser, setFields).exec(function (err, users) {
                                    if (err) {
                                        sails.log.error("Error when update the msisdn: " + msisdn + " error: " + err);
                                        return res.serverError("Error when update the msisdn: " + msisdn + " error: " + err);
                                    }

                                    sails.log.debug("Update users: " + users.length);

                                    if (user.status === config.APP_USER_STATUS.INACTIVE) {
                                        sails.log.info("Inactive msisdn: " + msisdn + " need to subscribe");
                                        thisController.subscribeUser(req, res, msisdn, serviceID);
                                    }

                                    return res.ok("User updated");
                                });
                            }else{
                                sails.log.debug("In Un-Registration: User exists for the msisdn: " + msisdn + " and for the appID: " + appID);
                                thisController.unsubscribeUser(req,res,msisdn,serviceID);
                            }
                        }else {
                            if(!isRegistration){
                                sails.log.debug("In Un-Registration: User does not exists in the System for the msisdn: " + msisdn + " and for the appID: " + appID);
                                return res.badRequest("In Un-Registration: User is not registered in the System for the msisdn: " + msisdn);
                            }

                            //Will create new User if him self is not a subscribed user in the system before
                            var newAppUser = {
                                'msisdn': msisdn,
                                'appID': appID,
                                'deviceUUID': deviceUUID,
                                'status': config.APP_USER_STATUS.INACTIVE,
                                'serviceID': app.serviceID
                            };

                            AppUser.create(newAppUser).exec(function (err, user) {
                                if (err) {
                                    return res.serverError(err);
                                }

                                sails.log.debug("New user created for the msisdn: " + msisdn + " serviceID=" + serviceID);
                                thisController.subscribeUser(req,res,msisdn,serviceID);

                                return res.created(user);
                            });
                        }
                    });
                });
            }catch(err){
                sails.log.error("Exception in registerUser, error: " + err);
                res.serverError("Exception in registerUser, error: " + err);
            }
        }catch(err){
            sails.log.error(err);
            res.serverError(err);
        }
    },

    subscribeUser: function(req,res,msisdn,serviceID){
        sails.log.debug("Call subscription api in Ideabiz");
        //Call User subscription api in Ideabiz
    },
    unsubscribeUser: function(req,res,msisdn,serviceID){
        sails.log.debug("Call unsubscription api in Ideabiz");
        //Call User unsubscription api in Ideabiz
    }


};