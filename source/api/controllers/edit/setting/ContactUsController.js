/**
 * ContactUsController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

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
        var isPlusMarkExists = false;
        var searchApp = {
            appId: req.body.appId
        };

        ApplicationContactUs.update(searchApp, data).exec(function (err, app) {
            if(err) return err;

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
            if (app) {
                app.isBeta = sails.config.isBeta;
            }
            res.send(app);
        });
    }
};
