var fs = require('fs-extra');
var http = require('http');
var request = require('request');

module.exports = {


    /**
     * Send push message for given appID
     * @param req
     * @param res
     */
    sendPushMessage: function(req, res){

        // Create push collection
        PushMessage.create(req.body).exec(function(err,data){
            if(err) return done(err);

            var findDevicedQuery = {
                appId : req.body.appId
            };
            // Find device by appID
            DeviceId.find(findDevicedQuery).exec(function(err,deviceArray){

                var message = req.body.message;
                var pushUrl = "https://api.ionic.io/push/notifications";
                var profile = "dev_push_sun";
                var Authorization = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwM2RjZDE0ZS0zNGRhLTQyZDYtYTAyZi0wNWFmZmE3OTBjODAifQ.wB9jy0C3a0bn4eb4wKvr521UwqIB0gTQXn5DYk92_KE";

                for(var i=0; i<deviceArray.length; i++){
                    // push API request
                    request.post(pushUrl,
                        {json:{"tokens": [deviceArray[i].deviceId],
                            "profile": profile,
                            "notification": {
                                "message": message
                            }},
                            headers:{
                                'Content-Type': 'application/json',
                                'Authorization': Authorization
                            }} , function(error, response, body){
                            if (error) sails.log.info(error);
                                sails.log.info(response);
                        });
                }
                res.send(data);
                });
        });
    },
    getMessageDetails: function(req, res){
    var appId = req.param('appId');
    var userId = req.param('userId');
        var searchApp ={
            appId: appId,
            userId:userId
        }
        PushMessage.find(searchApp).exec(function(err, app) {
            if (err) return done(err);
            res.send(app);
        });

    }
}