/**
 * ContactUsController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var config = require('../../../services/config');

module.exports = {

    addContactUs: function (req, res) {

        var data = req.body;
        var searchApp = {
            appId: req.body.appId
        };

        data.telPhone = "+" + data.telPhone;
        ApplicationContactUs.update(searchApp, data).exec(function (err, app) {
            if (app.length == 0) {


                ApplicationContactUs.create(data).exec(function (err, appContactUs) {
                    if (err) res.send(err);

                    res.send({
                        appId: appContactUs.appId,


                        message: "New Contact Us Record Successfully created"
                    });
                });
            } else {
                res.send({
                    appId: req.body.appId,
                    message: "Contact Us Record Successfully updated"
                });
            }
        });
    },
    addBasicInfo: function (req, res) {

        var data = req.body;
        var searchApp = {
            appId: req.body.appId
        };
        var contactUsController = this;
                data.telPhone = "+" + data.telPhone;
        ApplicationContactUs.update(searchApp, data).exec(function (err, app) {
            if(err) return err;

            contactUsController.updateAppHeaderData(app[0].appId, app[0].showOnWebsiteContact);

            if (app.length == 0) {
                ApplicationContactUs.create(data).exec(function (err, appContactUs) {
                    if (err) return res.send(err);

                    contactUsController.updateAppHeaderData(appContactUs[0].appId, appContactUs[0].showOnWebsiteContact);

                    res.send({
                        appId: appContactUs.appId,


                        message: "New Contact Us Record Successfully created"
                    });
                });
            } else {
                res.send({
                    appId: req.body.appId,
                    message: "Contact Us Record Successfully updated"
                });
            }
        });
    },
    addWebInfo: function (req, res) {

        var data = req.body;
        var searchApp = {
            appId: req.body.appId
        };
                        data.telPhone = "+" + data.telPhone;
        ApplicationContactUs.update(searchApp, data).exec(function (err, app) {
            if (app.length == 0) {
                ApplicationContactUs.create(data).exec(function (err, appContactUs) {
                    if (err) res.send(err);

                    res.send({
                        appId: appContactUs.appId,


                        message: "New Contact Us Record Successfully created"
                    });
                });
            } else {
                res.send({
                    appId: req.body.appId,
                    message: "Contact Us Record Successfully updated"
                });
            }
        });
    },
    addGoogleMapInfo: function (req, res) {
        var data = req.body;
        var searchApp = {
            appId: req.body.appId
        };
                        data.telPhone = "+" + data.telPhone;
        ApplicationContactUs.update(searchApp, data).exec(function (err, app) {
            if (app.length == 0) {
                ApplicationContactUs.create(data).exec(function (err, appContactUs) {
                    if (err) res.send(err);

                    res.send({
                        appId: appContactUs.appId,


                        message: "New Contact Us Record Successfully created"
                    });
                });
            } else {
                res.send({
                    appId: req.body.appId,
                    message: "Contact Us Record Successfully updated"
                });
            }
        });
    },
    addOpenHoursInfo: function (req, res) {
        var data = req.body;
        var searchApp = {
            appId: req.body.appId
        };
                        data.telPhone = "+" + data.telPhone;
        ApplicationContactUs.update(searchApp, data).exec(function (err, app) {
            if(err) sails.log.info(err);
            if (app.length == 0) {
                ApplicationContactUs.create(data).exec(function (err, appContactUs) {
                    if (err) res.send(err);

                    res.send({
                        appId: appContactUs.appId,


                        message: "New Contact Us Record Successfully created"
                    });
                });
            } else {
                res.send({
                    appId: req.body.appId,
                    message: "Contact Us Record Successfully updated"
                });
            }
        });
    },

    getContactUs:function(req, res){

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };
        ApplicationContactUs.findOne(searchApp).exec(function (err, app) {
            if (err) return done(err);
            res.send(app);
        });
    },

    addNewBranchLocation:function(req, res){

        var data = req.body;

        if(!data.id){
            BranchLocations.create(data).exec(function (err, branch) {
                if (err) res.send(err);

                res.send({
                    appId: branch.appId,
                    message: "Branch record successfully created"
                });
            });
        }else{
            var searchApp = {
                id: req.body.id
            };
            BranchLocations.update(searchApp, data).exec(function (err, updatedBranch) {
                if(err) return err;

                res.send({
                    appId: req.body.appId,
                    message: "Branch record successfully updated"
                });

            });
        }
    },

    getAppBranches: function (req,res) {
        var appId = req.param('appId');
        var searchBranches = {
            appId: appId
        };
        BranchLocations.find(searchBranches).exec(function (err, branches) {
            if (err) return done(err);
            res.send(branches);
        });
    },

    deleteBranch: function (req,res) {
        BranchLocations.destroy(req.body).exec(function (err) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(200,{message:' Branch deleted'});
            }
        });
    },

    updateAppHeaderData: function (appId, isContactUsShown) {

        var contactUsCharacterLength = config.APP_HEADER_INITIAL_DATA.CONTACT_US_CHARACTER_COUNT;

        AppHeaderData.findOne({ appId: appId }).exec(function (err, appHeaderData) {

            if (err) {

                sails.log.error('Error occurred at ContactUsController.updateAppHeaderData , error : ' + err);
            }
            if (appHeaderData) {

                if (isContactUsShown && !appHeaderData.isContactUsChecked) {

                    appHeaderData.usedCategoryCharacterLength = appHeaderData.usedCategoryCharacterLength + contactUsCharacterLength;
                    appHeaderData.isContactUsChecked = true;
                }
                if (!isContactUsShown && appHeaderData.isContactUsChecked) {

                    appHeaderData.usedCategoryCharacterLength = appHeaderData.usedCategoryCharacterLength - contactUsCharacterLength;
                    appHeaderData.isContactUsChecked = false;
                }
                appHeaderData.save(function (err) {

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
