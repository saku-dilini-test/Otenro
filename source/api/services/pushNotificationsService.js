
var request = require('request');
var config = require('./config');

var PushUrl = config.PUSH_API_URL;
var Authorization = config.AUTHORIZATION;

module.exports = {

    /**
     * Message should formatted as this
     * {
            "to": deviceId,
            "notification": {
                                "body" : req.body.message
                            }
        }
     * @param message
     */
    sendPushNotifications: function(messagesArray){
        messagesArray.forEach(function(message){
            sails.log.debug("pushNotificationsService: message: " + JSON.stringify(message));
            request.post(
                PushUrl,{
                    json: message,
                    headers:{
                        'Authorization' : Authorization,
                        'Content-Type' : 'application/json'
                    }} , function(error, response, body){
                    if (error) sails.log.info(error);
                    if(response && response.statusCode === 200){
                        sails.log("pushNotificationsService: push message send success =>", response.statusCode);
                    }else{
                        sails.log("pushNotificationsService: push message send failed =>", JSON.stringify(response,null,2));
                    }
            });
       });
    },

    sendPushNotification: function(message){
        this.sendPushNotifications([message]);
    }
};

