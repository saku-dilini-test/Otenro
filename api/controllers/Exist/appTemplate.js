/**
 * Created by udeshikaperera on 16/07/2015.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ApplicationProduct = require('../models/ApplicationProducts');

router.post('/designApps', function(req, res, next) {
    mongoose.model('template').find(function(err, template) {
        res.send(template);
    });
});

router.post('/getProducts', function(req, res) {

    var appId = req.appId;
    var searchApp = {
        appId: appId
    };

    ApplicationProduct.findOne(searchApp, function(err, app) {
        if (err) return done(err);
        res.send(app);
    });
});



module.exports = router;
