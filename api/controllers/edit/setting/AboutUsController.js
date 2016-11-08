/**
 * ContactUsController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    addAboutUs: function (req, res) {

        var data = req.body;

        var searchApp = {
            appId: req.body.appId
        };

        ApplicationAboutUs.update(searchApp, data).exec(function (err, app) {
            if (app.length == 0) {
                ApplicationAboutUs.create(data).exec(function (err, appAboutUs) {
                    if (err) res.send(err);

                    res.send({
                        appId: appAboutUs.appId,


                        message: "New About Us Record Create Successfully created"
                    });
                });
            } else {
                res.send({
                    appId: req.body.appId,
                    message: "About Us Record Successfully updated"
                });
            }
        });

    },

    getAboutUsData: function (req, res) {
        console.log("req.param('appId') " + req.param('appId'));
        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };
        ApplicationStoreSettings.findOne(searchApp).exec(function (err, app) {
            if (err) return err;

            res.json(app);
        });
    }
};
