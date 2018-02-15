/**
 * UserSettingsController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs-extra'),
    config = require('../../../services/config');
module.exports = {

    saveStoreSettings : function(req,res){
        var data = req.body;
        var query = {appId:req.body.appId};
        ApplicationStoreSettings.update(query,data).exec(function(err,user) {
               if (err) res.send(err);
               if (user.length == 0) {
                   ApplicationStoreSettings.create(data).exec(function (err, app) {
                       if (err) res.send(err);

                       res.send({
                           app: app,
                           message: "New Store Settings Record successfully Created"

                       });
                   });
               } else {
                   res.send({
                       app: user,
                       message: "New Store Settings Record  Successfully updated"
                   });
               }
        });
    },
    showStoreSettings: function(req,res){
     var appId = req.param('appId');
            var searchApp = {
                appId: appId
            };
        ApplicationStoreSettings.find(searchApp, function(err, app) {
            if (err) return done(err);
            if(app.length == 0){
                res.send([{currencySign : '$'}]);
            }else{
                res.send(app);
            }
        });
    },
    getAllSiteType: function(req,res){
        SiteType.find().exec(function(err, app) {
             if (err) res.send(err);
             res.send(app);
        });
    },
    getAllMeasurementType: function(req,res){
           MeasurementStandard.find().exec(function(err, app) {
                if (err) res.send(err);
                res.send(app);
           });
    },
    getAllTimeAndRegion: function(req,res){
            TimeAndRegion.find().exec(function(err, app) {
                 if (err) res.send(err);
                 res.send(app);
            });
    },
    savePolicies: function(req,res){
        var data = req.body;
        var query = {appId:req.body.appId};
        ApplicationStoreSettings.update(query,data).exec(function(err,user) {
               if (err) res.send(err);
               if (user.length == 0) {
                   ApplicationStoreSettings.create(data).exec(function (err, app) {
                       if (err) res.send(err);

                       res.send({
                           app: app,
                           message: "New Store Settings Record successfully Created"
                       });
                   });
               } else {
                   res.send({
                       app: user,
                       message: "New Store Settings Record  Successfully updated"
                   });
               }
        });
    },
    showPolicies:function(req,res){
        var appId = req.param('appId');
            var searchApp = {
                appId: appId
            };
        ApplicationStoreSettings.find(searchApp, function(err, app) {
            if (err) return done(err);
            res.send(app);
        });
    },    
    uploadFile : function(req,res){
      console.log("Exec uploadFile!!!");
        var uploadedFileType = req.body.uploadedFileType;

        var dePath = config.APP_FILE_SERVER + req.body.userId + '/progressiveTemplates/' + req.body.appId + '/src/assets/images/';

        req.file('file').upload({
            dirname: require('path').resolve(dePath)
        },function (err, uploadedFiles) {
            if (err) return res.send(500, err);

            var newFileName = uploadedFileType+'.png';
            fs.rename(uploadedFiles[0].fd, dePath+'/'+newFileName, function (err) {
                if (err) return res.send(err);
            });

            res.send('ok');
        });
    },

};