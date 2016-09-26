


var fs = require('fs-extra'),
    config = require('../../../services/config'),
    email = require("../../../../node_modules/emailjs/email");

var server  = email.server.connect({
    user:    "onbilabsttest@gmail.com",
    password:"0nb1tl@b$",
    host:    "smtp.gmail.com",
    ssl:     true
});

var notifyEmailAddressTO = 'udeshika@onbitlabs.com';
var notifyEmailAddressCSS = '';

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

        console.log("details.splash4 "+details.splash4);

        var buf = new Buffer(splash4y ,'base64'); // decode
        fs.writeFile(config.APP_FILE_SERVER+"myimg.png", buf, function(err) {
            if(err) {
                console.log("err", err);
            }
        })

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

                // Email Subject
                var emailSubject = 'Ready to Publish : '+details.title;
                // Email Body
                var emailBody    =  "<html>" +
                                        "<p> appID  :  "+details.appId+  "</p>"+
                                        "<p> Title  :  "+details.title+  "</p>"+
                                        "<p> AppType:  "+details.appType+"</p>"+
                                    "</html>";
                // Email Content
                var emailDetails = {
                    from    : "onbilabsttest@gmail.com",
                    to      : notifyEmailAddressTO,
                    cc      : notifyEmailAddressCSS,
                    subject : emailSubject,
                    attachment  :
                        [
                            { data : emailBody, alternative : true }
                        ]
                };
                // PublishDetails Update or Create Email Notification Function
                server.send(emailDetails, function (err, message) {
                    sails.log(err || message);
                });

            });
},
    setContentRating: function(req,res){
            var details = req.body;
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
    setAppReviewInformation: function(req,res){
            var details = req.body;
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
        var appType = req.param('appType');
        var searchApp = {
            appId: appId,
            appType: appType
        };
        PublishDetails.find(searchApp, function(err, app) {
            if (err) return done(err);
            res.send(app)
        });
    },

    getContentRatings : function(req,res){
        ContentRating.find().exec(function(err, app) {
                if (err) res.send(err);
                res.send(app);
        });
    }

}