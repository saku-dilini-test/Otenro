/**
 * IdeabizSMSController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var config = require('../../../services/config');

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

        sails.log.debug("onReceivingSMS message body: " + reqBody);

        try {
            var inboundSMSMessage = reqBody.inboundSMSMessageNotification.inboundSMSMessage;
            var msisdn = inboundSMSMessage.senderAddress;
            var message = inboundSMSMessage.message;
            var deviceUUID = reqBody.inboundSMSMessageNotification.callbackData.deviceUUID;
            var appId = reqBody.inboundSMSMessageNotification.callbackData.appId;

            // if (smsMessage && port && msisdn && deviceUUID) {
            //     //Checking the incoming status is valid with our Statuses in config.IDEABIZ_SUBSCRIPTION_STATUS <- Should remove once we impliment the renewal api
            //
            //
            //     var queryApp = { 'port': port };
            //
                try {
            //         PublishDetails.findOne(queryApp).exec(function(err,app){
            //             if(err){
            //                 sails.log.error("Error when searching for a app using port: " + port + " error: " + err);
            //                 return res.serverError(err);
            //             }
            //
            //             if(!app){
            //                 sails.log.error("No app in the system for the port: " + port);
            //                 return res.notFound("No app in the system for the port: " + port);
            //             }

                        var appID = appId;//app.id;
                        var queryUser = {
                            'msisdn': msisdn,
                            'appID': appID
                        }

                        AppUser.findOne(queryUser).exec(function (err, user) {
                            //Will update the user statuses while receiving a status change call
                            if (user) {
                                sails.log.debug("User exists for the msisdn: " + msisdn + " and will update the statuses");

                                var setFields = {
                                    'deviceUUID': deviceUUID
                                };

                                AppUser.update(queryUser, setFields).exec(function(err, users){
                                    if(err){
                                        sails.log.error("Error when update the msisdn: " + msisdn + " error: " + err);
                                        return res.serverError("Error when update the msisdn: " + msisdn + " error: " + err);
                                    }

                                    sails.log.debug("Update users: " + users.length);

                                    return res.ok("User updated");
                                });
                            }else {
                                //Will create new User if him self is not a subscribed user in the system before
                                var newAppUser = {
                                    'msisdn': msisdn,
                                    'appID': appID,
                                    'deviceUUID': deviceUUID,
                                    'status': config.APP_USER_STATUS.ACTIVE
                                };

                                AppUser.create(newAppUser).exec(function (err, user) {
                                    if (err) {
                                        return res.serverError(err);
                                    }

                                    sails.log.debug("New user created for the msisdn: " + msisdn);

                                    return res.created(user);
                                });
                            }
                        });
                    // });
                }catch(err){
                    sails.log.error("Exception in registerUser, error: " + err);
                    res.serverError("Exception in registerUser, error: " + err);
                }
            // } else {
            //     sails.log.error("SMS bidy does not contains requred data : " + reqBody);
            //     res.badRequest("SMS bidy does not contains requred data");
            // }
        }catch(err){
            sails.log.error(err);
            res.serverError(err);
        }
    }


};