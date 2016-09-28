var fs = require('fs-extra');
var http = require('http');
var request = require('request');
var ionicPushUrl = 'https://api.ionic.io/push/notifications';
module.exports = {


    sendPushMessage: function(req, res){
        PushMessage.create(req.body).exec(function(err,data){
        if(err) return done(err);
        postDeviceId.find().exec(function(err,deviceId){
            console.log(deviceId);
            console.log(deviceId.length);
            for(var i=0; i<deviceId.length; deviceId++){
            request.post('https://api.ionic.io/push/notifications',
            {json:{"tokens": [deviceId],
                    "profile": "test",
                    "notification": {
                         "message": req.body.message
                    }},
            headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMGE3OTMzOS02MWUzLTQ2ZTUtOThjYy00YWExZGRjOWI3YmEifQ.3lIA11DSJj1iah4YDbyBTpjKWTKo3ipNAEzNsa81ml8',
            }} , function(error, response, body){
                if (error) console.log(error);
                console.log(body);
//                console.log(response);
            })
            }
            res.send(data);
            })
        })
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