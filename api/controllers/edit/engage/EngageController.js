var fs = require('fs-extra');
var http = require('http');
var request = require('request');

var config = require('../../../services/config');

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

            // Testing dummy data here
            // var pushUrl = "https://api.ionic.io/push/notifications";
            // var profile = "dev_push_sun";
            // var Authorization = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwM2RjZDE0ZS0zNGRhLTQyZDYtYTAyZi0wNWFmZmE3OTBjODAifQ.wB9jy0C3a0bn4eb4wKvr521UwqIB0gTQXn5DYk92_KE";

            // Find device by appID
            PushConfig.findOne(findDevicedQuery).exec(function(err,pushConfigData){


                console.log( pushConfigData);

                var Message = req.body.message;
                var PushUrl = config.PUSH_API_URL;
                var Profile = pushConfigData.profile;
                var Authorization = "Bearer "+pushConfigData.authorization;

                // Find device by appID
                DeviceId.find(findDevicedQuery).exec(function(err,deviceArray){
                    var message = req.body.message;
                    for(var i=0; i<deviceArray.length; i++){
                        // push API request

                        console.log(" deviceArray " + deviceArray[i].deviceId);
                        request.post(PushUrl,
                            {json:{"tokens": [deviceArray[i].deviceId],
                                "profile": Profile,
                                "notification": {
                                    "message": Message
                                }},
                                headers:{
                                    'Content-Type': 'application/json',
                                    'Authorization': Authorization
                                }} , function(error, response, body){
                                if (error) sails.log.info(error);
			       console.log("push response "+JSON.stringify(response));
                                sails.log.info("push response "+response);
                            });
                    }
                    res.send(data);
                });
            });
        });
    },


    // get registered user Details

    getAppUserData : function(req,res){
        var appId = req.param('appId');
        var searchQuery = {
            appId: appId
        };
        AppUser.find(searchQuery).exec(function(err, result) {
            if (err) return res.send(err);
            return res.send(result);
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

    },

    getUserOrders: function (req, res) {
        var registeredUser = req.param('registeredUser');
        console.log(registeredUser);
        console.log(req.param('registeredUser'));
        var searchApp = {
            registeredUser: registeredUser
        }
        ApplicationOrder.find(searchApp).exec(function (err, app) {
            if (err) return done(err);
            console.log(app);
            res.send(app);
        })
    }

}
