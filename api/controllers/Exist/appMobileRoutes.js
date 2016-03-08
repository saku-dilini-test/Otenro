/**
 * Created by amila on 2/5/16.
 */

var express = require('express'),
    mobileRoutes = express.Router(),
    mongoose = require('mongoose'),
    isAuthenticated = require('../services/authentication/authMiddleWare'),
    Applications = require('../models/Applications'),
    config = require('../config');

/**
 * retrieve all apps request userId
 */
mobileRoutes.get('/allApps',isAuthenticated,
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

/**
 * retrieve meServerUrl
 */
mobileRoutes.get('/meServerUrl',isAuthenticated,
    function(req,res){
       res.send({meServerUrl:config.server.host+':'+config.server.port})
    });

module.exports = mobileRoutes;
