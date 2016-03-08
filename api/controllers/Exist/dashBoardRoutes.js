/**
 * Created by udeshikaperera on 16/07/2015.
 */
var express = require('express'),
    dashBoardRoutes = express.Router(),
    mongoose = require('mongoose'),
    isAuthenticated = require('../services/authentication/authMiddleWare'),
    Applications = require('../models/Applications');

/**
 * retrieve all apps request userId
 */
dashBoardRoutes.get('/allApps',isAuthenticated,
    function(req, res) {
        var userId = req.userId;
        var searchApp = {
            userId: userId
        };
        Applications.find(searchApp, function(err, apps) {
            if (err) return done(err);
            res.send(apps);
        });
    });

dashBoardRoutes.post('/getTemplatesData',isAuthenticated,
    function(req, res) {
        var userId = req.userId;
        var searchApp = {
            userId: userId
        };
        Applications.find(searchApp, function(err, apps) {
            if (err) return done(err);
            res.send(apps);
        });
    });
dashBoardRoutes.get('/addProducts', isAuthenticated,
    function(req, res) {
        mongoose.model('Application').find(function(err, template) {
            res.send(template);
        });
    });
module.exports = dashBoardRoutes;
