/**
 * Created by MadhurangaWeerasinghe on 05/08/2015.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


router.post('/getProducts', function(req, res) {

    var appId = req.body.appId;

    var searchApp = {
        appId: appId
    };
    ApplicationProduct.findOne(searchApp, function(err, app) {
        if (err) return done(err);
        console.log(app);
        res.send(app);
    });
});

module.exports = router;
