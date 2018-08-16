/**
 * MainNavigationController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs-extra'),
    config = require('../../../services/config');
module.exports = {

    getMainNavigation : function(req, res) {

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };
        MainNavigation.find(searchApp, function(err, app) {
            if (err) return done(err);
            res.send(app);
        });
    },

    saveMainMenu : function(req,res){
        var menuItems = req.body.menuItems;
        var appId = req.body.appId;
        var topLevel = req.body.topLevel;

        var setFunction=function( x , length , data){
            if(x < length){
                var mainNodes = data[x].nodes;
                MainNavigation.update({ id : data[x].id , appId : appId },data[x],function(err,main){

//                    if(main.n === 0 || mainNodes.length == 0){
                        x++;
                        setFunction(x,length,data);
//                    }
//                    for(var i=0 ; i < mainNodes.length ; i++){
//
//                        var childNodes = mainNodes[i].nodes;
//                        SecondNavigation.update({ id : mainNodes[i].id ,appId : appId },mainNodes[i],function(err,child){
//
//                            for(var j=0 ; j < childNodes.length ; j++) {
//                                ThirdNavigation.update({id: childNodes[j].id, appId: appId}, childNodes[j], function (err, subchild) {
//                                    sails.log.info(subchild);
//                                });
//                            }
//                        });
//                        if(i == mainNodes.length-1 ){
//                            x++;
//                            setFunction(x,length,data);
//                        }
//                    }

                });
            }else{
                res.send('ok');
            }
        };

        var setFunctionSecondNavi =function( x , length , data){
            if(x < length){
                var childNodes = data[x].nodes;
                SecondNavigation.update({ id : data[x].id , appId : appId },data[x],function(err,parent){

//                    if(parent.n === 0 || childNodes.length == 0){
                        x++;
                        setFunctionSecondNavi(x,length,data);
//                    }
//                    for(var i=0 ; i < childNodes.length ; i++){
//
//                        ThirdNavigation.update({ id : childNodes[i].id ,appId : appId },childNodes[i],function(err,child){
//
//                        });
//                        if(i == childNodes.length-1 ){
//                            x++;
//                            setFunctionSecondNavi(x,length,data);
//                        }
//                    }
                });
            }else{
                res.send('ok');
            }
        };

        /**
         * if top Level == second Navigation
         */
        if(topLevel == 'secondNavi') {
            setFunctionSecondNavi(0, menuItems.length, menuItems);
        }else {
            setFunction(0,menuItems.length,menuItems);
        }
    },

    addNewNavi : function(req,res){
        var isNew = req.body.isNew;
        var randomstring = require("randomstring");
        var tmpImage = req.body.file;

        var imgeFileName = randomstring.generate()+".jpeg";
        var data = tmpImage[0].replace(/^data:image\/\w+;base64,/, "");
        var buf = new Buffer(data, 'base64');

        var dePath;
        if(isNew == 'true' || isNew == true){
            dePath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + '/assets/images/secondNavi/';

        }else {
            dePath = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId + '/img/secondNavi/';
        }


        fs.writeFile(dePath + imgeFileName, buf, function (err) {
            if (err) {
                return res.send(err);
            }
        });


            var secondNavi =req.body;
            secondNavi.imageUrl = imgeFileName;
            SecondNavigation.create(secondNavi).exec(function(err, newMenu) {
                if (err) res.send(err);
                res.json(newMenu);
            });

    },

    addNewCategory : function (req,res) {
            var isNew = req.body.isNew;
        var searchApp = {
            appId: req.body.appId,
            name: req.body.name
        };
        var dePath;

        if(isNew == 'true' || isNew == true){
            dePath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + '/assets/images/secondNavi/';
        }else {
            dePath = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/category/';
        }

        ArticleCategory.find(searchApp, function (err, found) {
            if (err) return res.send(err);

            if(found.length != 0){
                return res.send(409, {message:'Category name already exists!'});
            }else{
                req.file('file').upload({
                    dirname: require('path').resolve(dePath)
                },function (err, uploadedFiles) {
                    if (err) return res.send(500, err);

                    var newFileName=Date.now()+'.png';
                    fs.rename(uploadedFiles[0].fd, dePath+'/'+newFileName, function (err) {
                        if (err) return res.send(err);
                    });

                    var articleCategoryattribute =req.body;
                    articleCategoryattribute.imageUrl = newFileName;
                    ArticleCategory.create(articleCategoryattribute).exec(function (err, articleCategory) {
                        if (err){
                            res.send(err)
                        }else{
                            res.json(articleCategory);
                        }

                    });
                });

            }
        })

    },

    deleteItems : function (req,res,itemIds) {

        var secondNaviPath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/';
        var secondNaviPath2 = '/assets/images/secondNavi/';

    MainNavigation.find({id: itemIds}).exec(function(err,main){


        if (err) res.send(err);
        if (main != ""){
            MainNavigation.destroy({ id : itemIds}).exec(function (err) {
                if (err) return callback("Error while deleting " + err.message);
                res.send(200,{message:' Main Navigation deleted'});
            })
        }
        else {
            SecondNavigation.find({id: itemIds}).exec(function(err,second){
                if (err) res.send(err);

                    second.forEach(function(second){
                        fs.unlink(secondNaviPath + second.appId + secondNaviPath2 + second.imageUrl, function (err) {
                            if (err) return console.error(err);
                    });
                });

                console.log(second);
                if (second != ""){
                    SecondNavigation.destroy({ id : itemIds}).exec(function (err) {
                        if (err) return callback("Error while deleting " + err.message);
                        ThirdNavigation.find({childId: itemIds}).exec(function(err,child){
                            if (err) return callback("Error while deleting " + err.message);
                            if (child){
                            child.forEach(function(product){
                                ThirdNavigation.destroy({ childId : itemIds}).exec(function (err) {
                                    if (err) return callback("Error while deleting " + err.message);
                                })
                            })
                            }
                            res.send(200,{message:' Main Navigation deleted'});
                        })
                    })
                }
                else{
                    ThirdNavigation.find({id: itemIds}).exec(function(err,third){
                        if (err) res.send(err);
                        if (third !=""){
                            ThirdNavigation.destroy({ id : itemIds}).exec(function (err) {
                                if (err) return callback("Error while deleting " + err.message);
                                res.send(200,{message:' Main Navigation deleted'});
                            })
                        }
                    })
                }
            })
        }
    })
    },

    deleteItem : function (req,res) {
        console.log("Executing deleteItem");
        return this.deleteItems(req,res,[req.body.id]);
    },

    deleteCategories : function (req,res) {
        console.log("Executing deleteCategories");
        console.log(req.body);
        var categoryIds = req.body;
        return this.deleteItems(req,res,categoryIds);
    }
};