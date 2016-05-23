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

                    if(main.n === 0 || mainNodes.length == 0){
                        x++;
                        setFunction(x,length,data);
                    }
                    for(var i=0 ; i < mainNodes.length ; i++){

                        var childNodes = mainNodes[i].nodes;
                        SecondNavigation.update({ id : mainNodes[i].id ,appId : appId },mainNodes[i],function(err,child){

                            for(var j=0 ; j < childNodes.length ; j++) {
                                ThirdNavigation.update({id: childNodes[j].id, appId: appId}, childNodes[j], function (err, subchild) {
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

        var setFunctionSecondNavi =function( x , length , data){
            if(x < length){
                var childNodes = data[x].nodes;
                SecondNavigation.update({ id : data[x].id , appId : appId },data[x],function(err,parent){

                    if(parent.n === 0 || childNodes.length == 0){
                        x++;
                        setFunctionSecondNavi(x,length,data);
                    }
                    for(var i=0 ; i < childNodes.length ; i++){

                        ThirdNavigation.update({ id : childNodes[i].id ,appId : appId },childNodes[i],function(err,child){

                        });
                        if(i == childNodes.length-1 ){
                            x++;
                            setFunctionSecondNavi(x,length,data);
                        }
                    }
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

        var mainMenu = req.body;
        mainMenu.icon ="glyphicon glyphicon-cloud";

        SecondNavigation.create(mainMenu).exec(function(err,newMenu) {
            res.json(newMenu);
        });
    },

    deleteItem : function (req,res) {

        if(req.body.icon){
            MainNavigation.destroy({ id : req.body.id}).exec(function (err) {
                if (err) return callback("Error while deleting " + err.message);
                res.send(200,{message:'Deleted Main Navigation'});
            });

        }if(req.body.mainId){
            SecondNavigation.destroy({ id : req.body.id}).exec(function (err) {
                if (err) return callback("Error while deleting " + err.message);
                var filePath =config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/secondNavi/'+ req.body.imageUrl;
                fs.unlink(filePath, function (err) {
                    if (err) throw err;
                    res.send(200,{message:'Deleted Second Navigation'});
                });
            });

        }if(req.body.childId){
            ThirdNavigation.destroy({ id : req.body.id}).exec(function (err) {
                if (err) return callback("Error while deleting " + err.message);
                var filePath =config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/thirdNavi/'+ req.body.imageUrl;
                fs.unlink(filePath, function (err) {
                    if (err) throw err;
                    res.send(200,{message:'Deleted Third Navigation'});
                });
            });
        }
    }
};