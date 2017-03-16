/**
 * Created by thusithz on 2/24/16.
 */
/**
 * DashboardController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    allApps: function(req, res) {

        var userId = req.userId;
        var searchApp = {
            userId: userId
        };
        Application.find(searchApp, function(err, apps) {
            if (err) return done(err);
            res.send(apps);
        });
    },
    getAllCategory: function (req,res) {

        TemplateCategory.find().exec(function(err, category) {
            if (err) res.send(err);
            res.send(category);
        });

    }
};