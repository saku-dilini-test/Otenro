/**
 * ApplicationController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs-extra'),
    config = require('../services/config');

module.exports = {

    designApps : function(req,res){
        Template.find().exec(function(err, template) {
            if (err) res.send(err);
            res.send(template);
        });
    },

    viewTemplate : function(req,res){

        var templateName = req.body.templateName;
        var userId = req.userId;
        var tempAppDirPath = config.ME_SERVER + userId + '/templates/';
        var templatePath = sails.config.appPath + '/api/templates/' + templateName;
        var appName = req.body.appName;

        var application ={
            appName : req.body.appName,
            appTempPath :tempAppDirPath,
            templateId : req.body.templateId,
            userId : userId,
            status : "DRAFT",
            appSettings:{
                appCurrency : "Rs.",
                backgroundColor : "#FFFFFF",
                navigationBarColor : "#FFFFFF",
                footerColor : "#FFFFFF",
                buttonColor : "#FFFFFF",
                headerFontFamily : "Arial",
                contentFontFamily : "Arial",
                footerFontFamily : "Arial",
                buttonFontFamily : "Arial",
                headerFontSize : 10,
                contentFontSize : 10,
                footerFontSize : 10,
                headerFontWeight : "normal",
                contentFontWeight : "normal",
                footerFontWeight : "normal",
                buttonBorderWidth : "0px",
                buttonBorderRadius : "0px"
            }
        };


        Application.create(application).exec(function(err,app) {
            if (err) res.negotiate(err);

            fs.copy(templatePath, tempAppDirPath + app.id, function(err) {
                if (err) return console.error(err);
                var madeEasyFilePath = tempAppDirPath +'/'+app.id+'/madeEasy.Project';
                var madeEasyFileContent = {
                    name : appName,
                    appId : app.id,
                    userId : userId,
                    serviceApi: config.server
                };
                fs.outputJson(madeEasyFilePath,madeEasyFileContent, function (err) {
                    if(err) return console.error(err);
                })

            });
            /**
             * Add Main Navigation
             */

            var mainNavi=[{
                "name" : "Promo",
                "link" : "promo",
                "appId" : app.id,
                "icon"  : "glyphicon glyphicon-cloud"
            },
                {
                    "name" : "Category",
                    "link" : "category",
                    "appId" :  app.id,
                    "icon"  : "glyphicon glyphicon-cloud"
                },
                {
                    "name" : "Best Seller",
                    "link" : "bestSeller",
                    "appId" : app.id,
                    "icon"  : "glyphicon glyphicon-cloud"
                },
                {
                    "name" : "Contact Us",
                    "link" : "contact",
                    "appId" : app.id,
                    "icon"  : "glyphicon glyphicon-cloud"
                }
            ];

            var secondNavi =[{
                "imageUrl" : "category_61_5327.jpg",
                "appId" : app.id,
                "name" : "Hot",
                "desc" : "Hot description"
            },
                {
                    "imageUrl" : "melko-21290330.jpg",
                    "appId" : app.id,
                    "name" : "Low",
                    "desc" : "Low description"
                }];

            var thirdNavi1 =[
                {
                    "appId" : app.id,
                    "name" : "Low price ",
                    "price" : 100,
                    "imageUrl" : "article-0-1A9F1DAA000005DC-669_634x447.jpg",
                    "createdDate" : Date.now()
                },
                {
                    "appId" : app.id,
                    "name" : "High price ",
                    "price" : 200,
                    "imageUrl" : "OOMPizza-Pepperoni-300x233.jpg",
                    "createdDate" : Date.now()
                }
            ];
            var thirdNavi2 =[
                {
                    "appId" : app.id,
                    "name" : "Low price ",
                    "price" : 100,
                    "imageUrl" : "pizza.jpg",
                    "createdDate" : Date.now()
                },
                {
                    "appId" : app.id,
                    "name" : "High price ",
                    "price" : 200,
                    "imageUrl" : "melko-21290330.jpg",
                    "createdDate" : Date.now()
                }
            ];

            for(var i=0 ; i < mainNavi.length ; i++){
                MainNavigation.create(mainNavi[i]).exec(function(err,mainN){
                    if(err) return err;
                    /**
                     * Add Second Navigation
                     *
                     */

                    if(mainN.name == "Category"){
                        for(var j=0 ; j < secondNavi.length ; j++){
                            secondNavi[j].mainId =mainN.id;
                            SecondNavigation.create(secondNavi[j]).exec(function(err,secondN){
                                if(err) return err;

                                /**
                                 * Add Third Navigation
                                 */

                                if(j == 0){
                                    for(var z=0 ; z < thirdNavi1.length ; z++){
                                        thirdNavi1[z].childId = secondN.id;

                                        ThirdNavigation.create(thirdNavi1[z]).exec(function(err,thirdN){
                                            if(err) return err;
                                        });
                                    }
                                }else{
                                    for(var z=0 ; z < thirdNavi2.length ; z++){
                                        thirdNavi2[z].childId = secondN.id;
                                        ThirdNavigation.create(thirdNavi2[z]).exec(function(err,thirdN){
                                            if(err) return err;
                                        });

                                    }
                                }
                            });
                        }
                    }
                });
            }

            res.send({
                appId: app.id,
                message: "New Application is created!!"
            });
        });

    }
};