/**
 * SecondNavigationController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs-extra'),
    config = require('../../../services/config');
require('skipper')() ;

module.exports = {

    getSecondNavigation : function(req,res){

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };
        SecondNavigation.find(searchApp, function(err, app) {
            if (err) return done(err);
            res.send(app);
        });
    },

    addSecondNavigation : function(req, res) {

        var dePath = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/secondNavi/';
        req.file('file').upload({
            dirname: require('path').resolve(dePath)
        },function (err, uploadedFiles) {
            if (err) return res.send(500, err);

            var newFileName=Date.now()+'.png';
            fs.rename(uploadedFiles[0].fd, dePath+'/'+newFileName, function (err) {
                if (err) return res.send(err);
            });

            var secondNavi =req.body;
            secondNavi.imageUrl = newFileName;
            SecondNavigation.create(secondNavi).exec(function(err, appProduct) {
                if (err) res.send(err);
                res.send({
                    appId: appProduct,
                    message: "New Navigation has been created"
                });
            });
        });
    },

    addNewNavi : function(req,res){

        var imagePath = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId + '/img/'+ 'default.jpg';
        var fileName  = Date.now()+ '.jpg';
        var dePath    = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/secondNavi/';

        fs.readFile(imagePath, function (err, data) {
            if (err) throw err;
            fs.writeFile(dePath+fileName, data, function (err) {

                if (err) throw err;
                var childMenu = req.body;
                childMenu.imageUrl=fileName;

                SecondNavigation.create(childMenu).exec(function(err, menu) {
                    res.json(menu);
                });
            });
        });
    },
    updateSecondNavi : function(req,res){
        if(req.body.childList){
            var childList=req.body.childList;
            for (var i = 0; i < childList.length; i++) {
                SecondNavigation.update({id :childList[i].id},childList[i]).exec(function(err) {
                    if (err) res.send(err);
                });
            }
            res.send('ok');

        }else{
            SecondNavigation.update({id :req.body.id},req.body).exec(function(err) {
                if (err) res.send(err);
                res.send('ok');
            });
        }
    },

    checkNavi : function(req,res){
        var search={
            appId : req.body.appId,
            childId : req.body.categoryID
        };
        ThirdNavigation.find(search).exec(function (err,navi) {
            if (err) return err;
            if(typeof navi[0] != 'undefined' ){
                res.send({
                    message: "Yes"
                });
            }else{
                res.send({
                    message: "No"
                });
            }
        });
    },

    deleteSecondNavi : function(req,res){

        SecondNavigation.destroy({ id : req.body.categoryID}, function (err) {
            if (err) return err;
            var filePath = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/secondNavi/'+ req.body.imageUrl;
            fs.unlink(filePath, function (err) {
                if (err) return console.error(err);
            });

        });
    },

    updateSecondNaviImage : function(req,res){

        var isNew = req.body.isNew;
        var randomstring = require("randomstring");
        var tmpImage = req.body.file;
        var appId = req.body.appId;

        var imgeFileName = randomstring.generate()+".png";
        var data = tmpImage[0].replace(/^data:image\/\w+;base64,/, "");
        var buf = new Buffer(data, 'base64');

    if(isNew == 'true' || isNew == true){

        var filePath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + '/assets/images/secondNavi/'+ req.body.imageUrl;

        var desPath  = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId+ '/assets/images/secondNavi/';


                        fs.unlink(filePath, function (err) {
                            if (err) return console.error(err);
                        });

                        sails.log.info("req.body.imageUrl, " + req.body.imageUrl);
                        if (typeof req.body.imageUrl != "undefined") {
                            // Create new img file name using date.now()
                        fs.writeFile(desPath + imgeFileName, buf, function (err) {
                              if (err) {
                                  return res.send(err);
                              }
                              res.json({ok: true,imageUrl : imgeFileName});

                        });

                        }else {
                            res.json({ok: true});
                        }

    }else{

        var filePath = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/secondNavi/'+ req.body.imageUrl;
            var desPath  = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/secondNavi/';


                fs.unlink(filePath, function (err) {
                   if (err) return console.error(err);
                });

               sails.log.info("req.body.imageUrl, " + req.body.imageUrl);
               if (typeof req.body.imageUrl != "undefined") {
                   // Create new img file name using date.now()
               fs.writeFile(desPath + imgeFileName, buf, function (err) {
                     if (err) {
                         return res.send(err);
                     }
                     res.json({ok: true,imageUrl : imgeFileName});

               });

               }else {
                   res.json({ok: true});
               }

    }


    }
};