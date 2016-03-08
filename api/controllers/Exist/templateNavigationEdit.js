/**
 * Created by amila on 12/28/15.
 */

var express = require('express');
var router = express.Router();
var moment = require('moment');
var fs = require('fs-extra');
var config = require('../config');
var MainMenu = require('../models/MainMenu');
var ApplicationCategory = require('../models/ApplicationCategorys');
var ApplicationProduct = require('../models/ApplicationProducts');
var isAuthenticated = require('../services/authentication/authMiddleWare');
var multipart = require('connect-multiparty');
multipartyMiddleware = multipart();
/**
 * Update mainMenu and save newly created mainMenu
 */
router.post('/saveMainMenu', function(req, res) {

    var menuItems = req.body.menuItems;
    var appId = req.body.appId;

    console.log(req.body);
    var setFunction=function( x , length , data){
        if(x < length){
            var mainNodes = data[x].nodes;
            MainMenu.update({ _id : data[x]._id , appId : appId },data[x],function(err,main){

                if(main.n === 0 || mainNodes.length == 0){
                    x++;
                    setFunction(x,length,data);
                }
                for(var i=0 ; i < mainNodes.length ; i++){

                    var childNodes = mainNodes[i].nodes;
                    ApplicationCategory.update({ _id : mainNodes[i]._id ,appId : appId },mainNodes[i],function(err,child){

                        for(var j=0 ; j < childNodes.length ; j++) {
                            console.log("j"+j);
                            console.log(childNodes[j]);
                            ApplicationProduct.update({_id: childNodes[j]._id, appId: appId}, childNodes[j], function (err, subchild) {
                                console.log(subchild);
                            });
                        }

                    });

                    if(i == mainNodes.length-1 ){
                        x++;
                        setFunction(x,length,data);
                    }
                }

            });
        }else{
            res.send('ok');
        }
    };

    setFunction(0,menuItems.length,menuItems);

    //for(var i=0 ; i < menuItems.length ; i++){
    //    console.log(i);
    //    console.log(menuItems[i]);
    //
    //    MainMenu.update({ id : menuItems[i]._id },menuItems[i],function(err,app){
    //        if(app.n === 0){
    //            console.log( "N==0");
    //            //var applicationContactUs = new ApplicationContactUs(data);
    //            //applicationContactUs.save(function(err, appContactUs) {
    //            //    if (err) res.send(err);
    //            //    res.send({
    //            //        appId: appContactUs.appId,
    //            //        message: "New Contact Us Record Create Success !"
    //            //    });
    //            //});
    //        }else{
    //            console.log( "Find");
    //            //console.log(menuItems[i].name );
    //            //res.send({
    //            //    appId: req.body.appId,
    //            //    message: "Contact Us Record Update Success !"
    //            //});
    //        }
    //    });
    //}

    //for (var i = 0; i < menuItems.length; i++) {
    //
    //    var data = menuItems[i];
    //
    //    if(typeof data.appId == 'undefined'){
    //        data.appId = appId;
    //        data.createDate = moment();
    //        MainMenu.create(data);
    //    }else{
    //        data.modifyDate = moment();
    //        var query = {_id:data._id};
    //        MainMenu.update(query,data).exec(function(err, result) {
    //        });
    //    }
    //}

    //res.send('ok');

});

/**
 * Find availability of category given appId & mainMenuId
 * if available response message is 'YES'
 * else message is 'No'
 */
router.post('/checkMainMenu', function(req, res) {

    var search={
        appId : req.body.appId,
        mainMenuId : req.body._id
    };
    ApplicationCategory.find(search, function (err,category) {
        if (err) return callback("Error while deleting " + err.message);

        if(typeof category[0] != 'undefined'){
            res.send(200,{
                message: "YES"
            });
        }else{
            res.send(200,{
                message: "NO"
            });
        }
    });

});

/**
 * delete mainMenu collection given appId & _id
 */
router.post('/deleteMainMenu', function(req, res) {

    var query = {
        appId : req.body.appId,
        _id : req.body._id
    };
    MainMenu.remove(query, function (err,result) {
        if (err) return callback("Error while deleting " + err.message);

        res.send(200,{message:'OK'});
    });
});


/**
 * add new Menu
 *
 *
 */
router.post('/addNewMenu', function(req, res) {

    var mainMenu = new MainMenu(req.body);
    mainMenu.createDate = moment();
    mainMenu.icon ="glyphicon glyphicon-cloud";
    console.log(mainMenu);
    mainMenu.save(function(err,newMenu) {
        res.send(newMenu);
    });

});

/**
 * add Child Menu
 */
router.post('/addChildMenu',isAuthenticated,multipartyMiddleware, function(req, res) {

    var imagePath = config.ME_SERVER + req.userId + '/templates/' + req.body.appId + '/img/'+ 'default.jpg';
    var fileName = Date.now()+ '.jpg';
    var dePath=config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/categories/';

    fs.readFile(imagePath, function (err, data) {
        if (err) throw err;
        fs.writeFile(dePath+fileName, data, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
            var childMenu = new ApplicationCategory(req.body);
            childMenu.createDate = moment();
            childMenu.imageUrl=fileName;
            childMenu.save(function(err,child) {
                res.send(child);
            });
        });
    });

});

/**
 * add Sub Child
 */
router.post('/addSubChild',isAuthenticated,multipartyMiddleware, function(req, res) {

    var imagePath = config.ME_SERVER + req.userId + '/templates/' + req.body.appId + '/img/'+ 'default.jpg';
    var fileName = Date.now()+ '.jpg';
    var dePath=config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/products/';

    fs.readFile(imagePath, function (err, data) {
        if (err) throw err;
        fs.writeFile(dePath+fileName, data, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
            var subChild = new ApplicationProduct(req.body);
            subChild.createDate = moment();
            subChild.imageUrl=fileName;
            subChild.save(function(err,subDetail) {
                res.send(subDetail);
            });

        });
    });

});

/**
 * Delete Level Item
 */
router.post('/deleteItem',isAuthenticated,multipartyMiddleware, function(req, res) {
    console.log(req.body);

    if(req.body.icon){

        MainMenu.remove({ _id : req.body._id}, function (err) {
            if (err) return callback("Error while deleting " + err.message);
            res.send(200,{message:'OK'});
        });

    }if(req.body.mainId){
        ApplicationCategory.remove({ _id : req.body._id}, function (err) {
            if (err) return callback("Error while deleting " + err.message);
            var filePath =config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/categories/'+ req.body.imageUrl;
            fs.unlink(filePath, function (err) {
                if (err) throw err;
                res.send(200,{message:'OK'});
            });
        });

    }if(req.body.childId){
        ApplicationProduct.remove({ _id : req.body._id}, function (err) {
            if (err) return callback("Error while deleting " + err.message);
            var filePath =config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/products/'+ req.body.imageUrl;
            fs.unlink(filePath, function (err) {
                if (err) throw err;
                res.send(200,{message:'OK'});
            });
        });
    }

});

module.exports = router;
