/**
 * Created by thusithz on 2/24/16.
 */
/**
 * DashboardController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    allApps: function (req, res) {

        var userId = req.userId;
        var searchApp = {
            userId: userId
        };
        Application.find(searchApp, function (err, apps) {
            if (err) return done(err);
            res.send(apps);
        });
    },
    getAllCategory: function (req, res) {

        TemplateCategory.find().exec(function (err, category) {
            if (err) res.send(err);
            res.send(category);
        });

    },
    getSelectedCategory: function (req, res) {
        var categoryId = req.body.id;
        if (categoryId == null) {

            Template.find().exec(function (err, apps) {
                if (err) res.send(err);
                res.send(apps);
            });
        } else {
            var searchApp = {
                templateCategory: categoryId
            };

            sails.log.info(searchApp);
            Template.find(searchApp, function (err, apps) {
                if (err) return done(err);
                res.send(apps);
            });
        }

    },
    getSelectedCategoryDashboard: function (req, res) {
        var categoryId = req.body.id;
        var userId = req.userId;
        if (categoryId == null) {
            var searchApp = {
                userId: userId
            };
        } else {
            var searchApp = {
                templateCategory: categoryId,
                userId: userId
            };
        }


        sails.log.info(searchApp);
        Application.find(searchApp, function (err, apps) {
            if (err) return done(err);
            res.send(apps);
        });
    },
    /**
     * return template meta data collections for given template category Id
     * menulable also retun for related template category
     * @param req
     * @param res
     */
    getTemplateMetaData: function (req, res) {
        var templateCategoryId = req.param('templateCategoryId');
        var searchQuery = {
            templateCategoryId: templateCategoryId,
            menuTitle: { "!" : ["Payment Activities","Featured","Secondary","Ads","Subscriptions","View Controls","Communication"]} //ME-2778,2781 Hide all tasks which say coming soon
        };
        var firstMenuLabel = '';
        if (templateCategoryId == '2') {
            firstMenuLabel = 'Commerce'
        }
        if (templateCategoryId == '3') {
            firstMenuLabel = 'Article'
        }
        if (templateCategoryId == '1') {
            firstMenuLabel = 'Commerce'
        }
        var response = {
            firstMenuLabel: firstMenuLabel
        }


        var Query = TemplateMetaData.find(searchQuery);
            Query.sort('templateCategoryId,orderId ASC');

        Query.exec(function callBack(err,results){
            if (err) return done(err);
            response['btnArray'] = results;
            res.send(response);
        });
    }

};