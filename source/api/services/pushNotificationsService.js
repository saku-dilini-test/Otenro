
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
        sails.log.debug("Call sendPushNotifications message length: " + messagesArray.length);

        messagesArray.forEach(function(message){
            sails.log.debug("Call sendPushNotifications message: " + JSON.stringify(message,null,2));
            request.post(
                PushUrl,{
                    json: message,
                    headers:{
                        'Authorization' : Authorization,
                        'Content-Type' : 'application/json'
                    }} , function(error, response, body){
                    if (error) sails.log.info(error);
                    if(response.statusCode === 200){
                        sails.log("push message send success =>", response.statusCode);
                    }else{
                        sails.log("push message send failed =>", response.statusCode);
                    }
            });
       });
    },

    sendPushNotification: function(message){
        this.sendPushNotifications([message]);
    }
};

