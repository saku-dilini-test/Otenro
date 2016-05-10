


var fs = require('fs-extra');
module.exports = {

    setPublishDetails: function(req,res){
    var ex = req.body.file.replace('{"blobUrl":"','');
    var y = ex.replace('"}','');

        var details = req.body;
        details.file = y;

        var splash1ex = req.body.splash1.replace('{"blobUrl":"','');
        var splash1y = splash1ex.replace('"}','');
        details.splash1 = splash1y;

        var splash2ex = req.body.splash2.replace('{"blobUrl":"','');
        var splash2y = splash2ex.replace('"}','');
        details.splash2 = splash2y;

        var splash3ex = req.body.splash3.replace('{"blobUrl":"','');
        var splash3y = splash3ex.replace('"}','');
        details.splash3 = splash3y;

        var splash4ex = req.body.splash4.replace('{"blobUrl":"','');
        var splash4y = splash4ex.replace('"}','');
        details.splash4 = splash4y;

            var searchApp = {
                appId :req.body.appId,
                category: req.body.category
            }
            PublishDetails.update(searchApp,details).exec(function(err,app) {
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
        var category = req.param('category');
        var searchApp = {
            appId: appId,
            category: category
        };
        PublishDetails.find(searchApp, function(err, app) {
            if (err) return done(err);
            var language = app
            res.send(language)
        });
    },

    getContentRatings : function(req,res){
        ContentRating.find().exec(function(err, app) {
                if (err) res.send(err);
                res.send(app);
        });
    }

}