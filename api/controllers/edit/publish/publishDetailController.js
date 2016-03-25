


var fs = require('fs-extra');
module.exports = {

    setPublishDetails: function(req,res){

        var details = req.body;

            PublishDetails.update({appId :req.body.appId},details).exec(function(err,app) {
                if (err) res.send(err);

                if (app.length == 0) {
                    PublishDetails.create(details).exec(function(err,appDetails) {
                        if (err) res.send(err);
                        res.send('ok');
                    });
                }
                else{
                    res.send({
                    appId: details.appId,
                    message: "New PublishDetails are created!!"
                    });
                }


            });
},

    getAllLanguages: function(req,res){
          Languages.find().exec(function(err, app) {
               if (err) res.send(err);
               res.send(app);
          });
    },

    getAllPrimaryCategories:function(req,res){
        PrimaryCategory.find().exec(function(err, app) {
               if (err) res.send(err);
               res.send(app);
        });
    },
    getAllSecondaryCategories:function(req,res){
        SecondaryCategory.find().exec(function(err, app) {
                if (err) res.send(err);
                res.send(app);
        });
    },

    getLanguage : function(req,res){
        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };
        PublishDetails.find(searchApp, function(err, app) {
            if (err) return done(err);
            var language = app
            res.send(language)
        });
    },

}