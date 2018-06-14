
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
        sails.log.debug("Call sendPushNotifications");

        messagesArray.forEach(function(message){
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
                    }
                    else{
                        sails.log("push message send failed =>", response.statusCode);
                    }
                });
        });
    },

    sendPushNotification: function(req,res){
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

        this.sendPushNotification(messages);
    }
};

