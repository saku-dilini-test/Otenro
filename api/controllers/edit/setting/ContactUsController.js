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


        ApplicationContactUs.update(searchApp, data).exec(function (err, app) {
            if (app.length == 0) {
                ApplicationContactUs.create(data).exec(function (err, appContactUs) {
                    if (err) res.send(err);

                    res.send({
                        appId: appContactUs.appId,


                        message: "New Contact Us Record Create Success !"
                    });
                });
            } else {
                res.send({
                    appId: req.body.appId,
                    message: "Contact Us Record Update Success !"
                });
            }
        });
    },
    addBasicInfo: function (req, res) {

        var data = req.body;
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


                        message: "New Contact Us Record Create Success !"
                    });
                });
            } else {
                res.send({
                    appId: req.body.appId,
                    message: "Contact Us Record Update Success !"
                });
            }
        });
    },
    addWebInfo: function (req, res) {

        var data = req.body;
        var searchApp = {
            appId: req.body.appId
        };
        ApplicationContactUs.update(searchApp, data).exec(function (err, app) {
            if (app.length == 0) {
                ApplicationContactUs.create(data).exec(function (err, appContactUs) {
                    if (err) res.send(err);

                    res.send({
                        appId: appContactUs.appId,


                        message: "New Contact Us Record Create Success !"
                    });
                });
            } else {
                res.send({
                    appId: req.body.appId,
                    message: "Contact Us Record Update Success !"
                });
            }
        });
    },
    addGoogleMapInfo: function (req, res) {
        var data = req.body;
        var searchApp = {
            appId: req.body.appId
        };
        ApplicationContactUs.update(searchApp, data).exec(function (err, app) {
            if (app.length == 0) {
                ApplicationContactUs.create(data).exec(function (err, appContactUs) {
                    if (err) res.send(err);

                    res.send({
                        appId: appContactUs.appId,


                        message: "New Contact Us Record Create Success !"
                    });
                });
            } else {
                res.send({
                    appId: req.body.appId,
                    message: "Contact Us Record Update Success !"
                });
            }
        });
    },
    addOpenHoursInfo: function (req, res) {
        var data = req.body;
        var searchApp = {
            appId: req.body.appId
        };
        ApplicationContactUs.update(searchApp, data).exec(function (err, app) {
            if(err) console.log(err);
            if (app.length == 0) {
                ApplicationContactUs.create(data).exec(function (err, appContactUs) {
                    if (err) res.send(err);

                    res.send({
                        appId: appContactUs.appId,


                        message: "New Contact Us Record Create Success !"
                    });
                });
            } else {
                res.send({
                    appId: req.body.appId,
                    message: "Contact Us Record Update Success !"
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
    }
};
