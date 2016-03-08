/**
 * Created by MadhurangaWeerasinghe on 03/08/2015.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');
var Application = require('../models/Applications');
var ApplicationProduct = require('../models/ApplicationProducts');
var ApplicationCategory = require('../models/ApplicationCategorys');
var MainMenu = require('../models/MainMenu');
var ApplicationContactUs = require('../models/ApplicationContactUs');
var ApplicationInventory = require('../models/ApplicationInventory');
var ApplicationOrders = require('../models/ApplicationOrders');


router.post('/getProducts', function(req, res) {

    var appId = req.body.appId;

    var searchApp = {
        appId: appId
    };
    ApplicationProduct.find(searchApp, function(err, app) {
        if (err) return done(err);
        res.send(app);
    });
});

router.get('/getMainMenus', function(req, res) {

    var appId = req.param('appId');
    var searchApp = {
        appId: appId
    };
    MainMenu.find(searchApp, function(err, app) {
        if (err) return done(err);
        res.send(app);
    });
});

router.get('/getCategories', function(req, res) {

    var appId = req.param('appId');
    var searchApp = {
        appId: appId
    };
    ApplicationCategory.find(searchApp, function(err, app) {
        if (err) return done(err);
        res.send(app);
    });
});
/**
 * Get Specific child details
 ***/
router.get('/getSpecificChild', function(req, res) {

    var appId = req.param('appId');
    var mainId=req.param('mainId');
    var searchApp = {
        appId: appId,
        mainId : mainId
    };
    ApplicationCategory.find(searchApp, function(err, app) {
        if (err) return done(err);
        res.send(app);
    });
});

/**
 *  Return Contact Us collection for given appId
 */
router.get('/getContactUs', function(req, res) {

    var appId = req.param('appId');
    var searchApp = {
        appId: appId
    };
    ApplicationContactUs.findOne(searchApp, function(err, app) {
        if (err) return done(err);
        res.send(app);
    });
});
router.post('/getProductsByCatId', function(req, res) {

    console.log(req.body);
    var ObjectId = mongoose.Types.ObjectId;
    var catId = req.body.category;
    var searchApp = {
        childId: new ObjectId(catId)
    };
    ApplicationProduct.find(searchApp, function(err, app) {
        if (err) return done(err);
        res.send(app);
    });
});
router.get('/getCurrency', function(req, res) {
    var appId = req.param('appId');
    var searchApp = {
        _id: appId
    };
    Application.findOne(searchApp, function(err, app) {
        if (err) return done(err);
        res.send(app);
    });
});

/**
 * Return Product Collection for given productId
 */
router.get('/getProductById', function(req, res) {

    var productId = req.param('productId');

    var searchApp = {
        _id: productId
    };
    mongoose.set('debug', true);
    ApplicationProduct.find(searchApp, function(err, app) {
        if (err) return done(err);
        res.send(app);
    });
});

router.get('/getProducts', function(req, res) {

    var appId = req.param('appId');
    var searchApp = {
        appId: appId
    };
    ApplicationProduct.find(searchApp, function(err, app) {
        if (err) return done(err);
        res.send(app);
    });

});

router.get('/getInventoryList', function(req, res) {

//    var appId = req.param('appId');
//    var searchApp = {
//        _id : "56bb0f376a42d2a3403bfc96"
//    };

    ApplicationInventory.find(function(err, app) {
        if (err) return done(err);
        res.send(app);
    });

});

router.post('/getMainmenu', function(req, res) {

    var appId = req.body.appId;
    var searchApp = {
        appId:appId
    };
    console.log(appId);
    MainMenu.find(searchApp).sort({order : 1 }).exec(function(err, app){
        if (err) return done(err);
        res.send(app);
    });
});


/**
 * Return Orders Collection for given appId
 */
router.get('/getOrders', function(req, res) {

    //var appId = req.param('appId');
    //var searchApp = {
    //    appId: appId
    //};
    //ApplicationOrders.find(searchApp, function(err, app) {
    ApplicationOrders.find(function(err, app) {
        if (err) return done(err);
        res.send(app);
    });
});


module.exports = router;
