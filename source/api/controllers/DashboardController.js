/**
 * Created by thusithz on 2/24/16.
 */
/**
 * DashboardController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var config = require('../services/config');
var fs = require('fs-extra');

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
    /**
     * This method returns all the Apps as the method allApps, but with additional details attached such as images etc for dashboard.
     * This will be little slower than the above allApps method since we are checking whether the files are exists etc...
     * Therefore recomands to use the allApps method if you just want the app details without more info.
     * @param req
     * @param res
     */
    allAppsForDashboard: function (req, res) {

        var userId = req.userId;
        var searchApp = {
            userId: userId
        };

        Application.find(searchApp, function (err, apps) {
            if (err) return res.serverError(err);

            var newApps = [];

            if(apps.length>0) {
                apps.forEach(function(app){
                    var splashImageAbsolutePath = config.APP_FILE_SERVER + userId + '/progressiveTemplates/' + app.id + '/assets/images/publish/6.png';
                    var splashImageUrl = config.server.host + "/templates/viewWebImages?userId="+ userId + "&appId=" + app.id + "&" + new Date().getTime() + "&images=publish/6.png";
                    var defaultImageUrl = config.ME_SERVER_URL + userId + '/progressiveTemplates/' + app.id + '/assets/images/test.png';

                    app.splashScreenPath = defaultImageUrl;

                    fs.stat(splashImageAbsolutePath, function (err, fileStat) {
                        if (err) {
                            if (err.code != 'ENOENT') {
                                // sails.log.debug('File does not exists in the path:' , splashImageAbsolutePath);
                            }else{
                                sails.log.error('Error in allAppsForDashboard: ', err);
                            }
                        } else {
                            //Adding Splash screen if uploaded already
                            app.splashScreenPath = splashImageUrl;
                        }
                        newApps.push(app);

                        //Only sent the response just after adding all the image paths
                        if(newApps.length===apps.length){
                            return res.send(newApps);
                        }
                    });
                });
            }else{
                sails.log.debug('No Apps found for the userId:', userId);
                res.send(apps);
            }
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
            firstMenuLabel = 'Pages'
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