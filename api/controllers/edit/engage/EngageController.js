var fs = require('fs-extra');

module.exports = {


    sendPushMessage: function(req, res){
        PushMessage.create(req.body).exec(function(err,data){
        if(err) return done(err);
            res.send(data);
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