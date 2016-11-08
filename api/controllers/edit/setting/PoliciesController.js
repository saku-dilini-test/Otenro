/**
 * ContactUsController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    addPolicies: function (req, res) {

        var data = req.body;

        var searchApp = {
            appId: req.body.appId
        };

        ApplicationPolicies.update(searchApp, data).exec(function (err, app) {
            if (app.length == 0) {
                ApplicationPolicies.create(data).exec(function (err, appPolicies) {
                    if (err) res.send(err);

                    res.send({
                        appId: appPolicies.appId,


                        message: "New Policies Record Successfully created"
                    });
                });
            } else {
                res.send({
                    appId: req.body.appId,
                    message: "Policies Record Successfully updated"
                });
            }
        });

    },

    getPoliciesData: function (req, res) {

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
