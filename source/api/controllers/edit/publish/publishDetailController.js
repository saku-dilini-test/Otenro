
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
            var details = req.body;
            var searchApp = {
                appId :req.body.appId,
                appType: req.body.appType
            }

            var searchAppData = {
                id :req.body.appId
            }


        PublishDetails.update(searchApp,details).exec(function(err,app) {
                if (err) res.send(err);
                else {
                    if (app.length==0) {
                        PublishDetails.create(details).exec(function(err,appDetails) {
                            if (err) res.send(err);
                        });
                    }
                }
        });

        Application.update(searchAppData, {status :"PENDING"}).exec(function(err,app) {
            if (err) res.send(err);
            else {
                res.send({
                    appId: app.appId,
                    message: "New Publish Details has been created"
                });
            }
        });

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
    },

    /* image uploading with validation*/
    uploadPublishFiles :function (req,res) {
        var imagePath;
        if(req.body.isNew == true || req.body.isNew == 'true'){
            imagePath = config.APP_FILE_SERVER+req.userId + '/progressiveTemplates/' + req.body.appId +'/assets/images/publish/';
        } else{
            imagePath = config.APP_FILE_SERVER+req.userId + '/templates/' + req.body.appId +'/img/publish/';
        }
         req.file('file').upload({
            dirname: require('path').resolve(imagePath)
         },function (err, uploadedFiles) {
             if (err) return res.negotiate(err);
             else {
                 fs.rename(uploadedFiles[0].fd, imagePath+req.body.imgId+'.png', function (err) {

                     if (err) return res.send(err);
                     else {
                         return res.json({
                             message: true
                         });
                     }
                 });
             }
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
                 message: "New Publish Details has been created"
                 });
             }


         });
    },


    setAppStoreDetails: function(req,res){
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
                    message: "New Publish Details has been created"
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
                 message: "New Publish Details has been created"
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