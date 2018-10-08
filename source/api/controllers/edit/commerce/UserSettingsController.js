/**
 * UserSettingsController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs-extra'),
    config = require('../../../services/config');
var NOT_FOUND = { status : 'NOT_FOUND' };    
module.exports = {

    saveStoreSettings: function (req, res) {

        var data = req.body;
        var appId = req.body.appId;
        var query = { appId: appId };
        var userSettingsController = this;

        userSettingsController.updateAppHeaderData(appId, data.showOnWebsiteAbout, 'about_us');

        Application.update({ id: appId }, { appName: data.appName }).exec(function (err, updatedApp) {

            if (err) {

                sails.log.error('UserSettingsController => saveStoreSettings => ' + err);
                return res.serverError(err);
            }
            data.appName = updatedApp[0].appName;

            ApplicationStoreSettings.update(query, data).exec(function (err, user) {

                if (err) {

                    sails.log.error('UserSettingsController => saveStoreSettings => ' + err);
                    return res.serverError(err);
                }
                if (user.length == 0) {

                    ApplicationStoreSettings.create(data).exec(function (err, app) {

                        if (err) {

                            sails.log.error('UserSettingsController => saveStoreSettings => ' + err);
                            return res.serverError(err);
                        }

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
        });
    },
    showStoreSettings: function (req, res) {

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };
        var appName;

        Application.findOne({ id: appId }).exec(function (err, foundApp) {

            if (err) {

                sails.log.error('UserSettingsController => showStoreSettings => ' + err);
                return done(err);
            }

            if (!foundApp) {

                return res.send(NOT_FOUND);
            }

            appName = foundApp.appName;

            ApplicationStoreSettings.find(searchApp, function (err, app) {

                if (err) return done(err);

                if (app.length == 0) {

                    res.send([{ currencySign: '$', appName: appName }]);
                } else {

                    app.appName = appName;
                    res.send(app);
                }
            });
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
        var userSettingsController = this;

        userSettingsController.updateAppHeaderData(req.body.appId, data.showOnWebsitePolicies, 'policies');

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


        var tmpImage = req.body.file;
        console.log(tmpImage);
        var data = tmpImage[0].replace(/^data:image\/\w+;base64,/, "");
        var buf = new Buffer(data, 'base64');

        var dePath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + '/assets/images/';
        var filePath = config.APP_FILE_SERVER + req.body.userId + '/progressiveTemplates/' + req.body.appId + '/assets/images/ABOUTUS.png';


                     fs.writeFile(filePath, buf, function (err) {
                        if (err) {
                            return res.send(err);
                        }
                        res.send('ok');
                    });

    },
        deleteAboutUsImage: function (req, res){
        console.log(req.userId);
        console.log(req.body);
            var ImagePath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + "/assets/images/ABOUTUS.png";

                fs.unlink(ImagePath, function (err) {
                    if (err){
//                        sails.config.logging.custom.error("Error deleting image UserID: " +req.userId );
                        return console.error(err);
                    }
//                    sails.config.logging.custom.info("About us Image deleted Successfully! UserID: " + req.userId );
                    res.send(200,{message:' About us Image deleted!'});
                });


        },

        updateAppHeaderData: function(appId, isShowOnHeader, type) {

            var policiesCharacterLength = config.APP_HEADER_INITIAL_DATA.POLICIES_CHARACTER_COUNT;
            var aboutUsCharacterLength = config.APP_HEADER_INITIAL_DATA.ABOUT_US_CHARACTER_COUNT;

            AppHeaderData.findOne({appId: appId}).exec(function(err, appHeaderData) {

                if (err) {

                    sails.log.error('Error occurred at UserSettingsController.updateAppHeaderData , error : ' + err);
                }

                if (appHeaderData) {

                    if (type === 'policies') {

                        if (isShowOnHeader && !appHeaderData.isPoliciesChecked) {

                            appHeaderData.usedCategoryCharacterLength = appHeaderData.usedCategoryCharacterLength + policiesCharacterLength;
                            appHeaderData.isPoliciesChecked = true;
                        }
                        if (!isShowOnHeader && appHeaderData.isPoliciesChecked) {

                            appHeaderData.usedCategoryCharacterLength = appHeaderData.usedCategoryCharacterLength - policiesCharacterLength;
                            appHeaderData.isPoliciesChecked = false;
                        }
                    }
                    if (type === 'about_us') {

                        if (isShowOnHeader && !appHeaderData.isAboutUsChecked) {

                            appHeaderData.usedCategoryCharacterLength = appHeaderData.usedCategoryCharacterLength + aboutUsCharacterLength;
                            appHeaderData.isAboutUsChecked = true;
                        }
                        if (!isShowOnHeader && appHeaderData.isAboutUsChecked) {

                            appHeaderData.usedCategoryCharacterLength = appHeaderData.usedCategoryCharacterLength - aboutUsCharacterLength;
                            appHeaderData.isAboutUsChecked = false;
                        }
                    }
                    appHeaderData.save(function(err) {

                        if (err) {

                            sails.log.error('Error occurred in updating AppHeaderData , error : ' + err);
                        } else {
    
                            sails.log.debug('Successfully updated AppHeaderData.');
                        }
                    });
                }
            });
        }

};