/**
 * Created by thusithz on 5/3/16.
 */
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

        var templateName = req.body.templateName,
            userId = req.userId,
            templateCategory = req.body.templateCategory,
            userId = req.body.userId,
            tempAppDirPath = config.ME_SERVER + userId + '/templates/',
            templatePath = sails.config.appPath + '/api/templates/' + templateName,
            appName = req.body.appName,
            serverTmp="http://localhost:port",
            serverOrg=config.server.host+':'+config.server.port;

        var loginPath = '/#/';
        if(templateName == 'foodDemoApp'){
            loginPath = '/#/app/login';
        }
        if(templateName == 'hkRising'){
            loginPath = '/#/app/home/active';
        }

        var application ={
            appName : req.body.appName,
            appTempPath :tempAppDirPath,
            templateId : req.body.templateId,
            userId : userId,
            status : "DRAFT",
            displayImage: req.body.templateUrl,
            templateCategory : templateCategory,
            appSettings:{
                appCurrency:{
                    sign : "Rs.",
                    currency: "SLR",
                },
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
            },
            appUpdateLocationSetting : {
                loginUrl : loginPath
            }
        };

        Application.create(application).exec(function(err,app) {
            if (err) res.negotiate(err);


        fs.copy(templatePath, tempAppDirPath + app.id, function(err) {
            if (err) return console.error(err);
            var madeEasyFilePath = tempAppDirPath +app.id+'/madeEasy.Project';
            var madeEasyFileContent = {
                name : appName,
                appId : app.id,
                userId : userId,
                serviceApi: config.server
            };
            fs.outputJson(madeEasyFilePath,madeEasyFileContent, function (err) {
                if(err) return console.error(err);
            });

            fs.readFile(tempAppDirPath +app.id+'/js/constantsService.js', 'utf-8',
                function(err, data) {
                    if (err) return res.negotiate(err);
                    fs.writeFile(tempAppDirPath +app.id+'/js/constantsService.js', data.replace(serverTmp,serverOrg),'utf-8',function(err) {
                        if (err) return res.negotiate(err);
                    });
                });

            fs.readFile(tempAppDirPath +app.id+'/js/app.js', 'utf-8',
                function(err, data) {
                    if (err) return res.negotiate(err);
                    data=data.replace(serverTmp,serverOrg);
                    data=data.replace(serverTmp,serverOrg);
                    fs.writeFile(tempAppDirPath + app.id +'/js/app.js', data.replace(serverTmp,serverOrg),'utf-8',function(err) {
                        if (err) return res.negotiate(err);
                    });
                });

        });
        /**
         * Add Main Navigation
         */

        /**
         * If Only foodDemoApp Category & Product Feed to DB
         */
        if(templateName == 'foodDemoApp') {
            var searchAppInitialData = {
                'templateName': 'foodDemoApp'
            }
            AppInitialData.findOne(searchAppInitialData, function (err, appInitData) {
                if (err) return done(err);

                /**
                 * add Second Navigation
                 */
                var secondNaviList = appInitData.secondNavi;
                for (var i = 0; i < secondNaviList.length; i++) {
                    var scondNaviAttribute = secondNaviList[i].attribute;
                    scondNaviAttribute.templateName = appInitData.templateName;
                    scondNaviAttribute.appId = app.id;
                    var thirdNaviList = secondNaviList[i].thirdNavi;
                    SecondNavigation.create(scondNaviAttribute).exec(function (err, secondN) {
                        if (err) return err;

                        /**
                         * Add Third Navigation
                         */
//                        if (i == 0) {
                            for (var j = 0; j < thirdNaviList.length; j++) {
                                thirdNaviList[j].appId = app.id;
                                thirdNaviList[j].childId = secondN.id;
                                ThirdNavigation.create(thirdNaviList[j]).exec(function (err, thirdN) {
                                    if (err) return err;
                                });
                            }
                    });
                }
            });

            /**
             * If Only hkRising Details Feed to DB
             */
        }else if(templateName == 'hkRising'){
                var searchAppInitialData = {
                    'templateName' : 'hkRising'
                }
                AppInitialData.findOne(searchAppInitialData, function(err, appInitData) {
                    if (err) return done(err);

                    /**
                     * add Article Category for hkRising Application
                     * Append appId
                     */

                    var articleCategoryList = appInitData.articleCategory;
                    for (var j = 0; j < articleCategoryList.length; j++) {
                        articleCategoryList[j].appId = app.id;
                        ArticleCategory.create(articleCategoryList[j]).exec(function (err, articleCategory) {
                            if (err) return err;
                        });
                    }
                });

        }else {
            var mainNavi = [{
                "name": "Promo",
                "link": "promo",
                "appId": app.id,
                "icon": "glyphicon glyphicon-cloud"
            },
                {
                    "name": "Category",
                    "link": "category",
                    "appId": app.id,
                    "icon": "glyphicon glyphicon-cloud"
                },
                {
                    "name": "Best Seller",
                    "link": "bestSeller",
                    "appId": app.id,
                    "icon": "glyphicon glyphicon-cloud"
                },
                {
                    "name": "Contact Us",
                    "link": "contact",
                    "appId": app.id,
                    "icon": "glyphicon glyphicon-cloud"
                }
            ];

            var secondNavi = [{
                "imageUrl": "category_61_5327.jpg",
                "appId": app.id,
                "name": "Hot",
                "desc": "Hot description"
            },
                {
                    "imageUrl": "melko-21290330.jpg",
                    "appId": app.id,
                    "name": "Low",
                    "desc": "Low description"
                }];

            var thirdNavi1 = [
                {
                    "appId": app.id,
                    "name": "Low price ",
                    "price": 100,
                    "imageUrl": "article-0-1A9F1DAA000005DC-669_634x447.jpg",
                    "createdDate": Date.now()
                },
                {
                    "appId": app.id,
                    "name": "High price ",
                    "price": 200,
                    "imageUrl": "OOMPizza-Pepperoni-300x233.jpg",
                    "createdDate": Date.now()
                }
            ];
            var thirdNavi2 = [
                {
                    "appId": app.id,
                    "name": "Low price ",
                    "price": 100,
                    "imageUrl": "pizza.jpg",
                    "createdDate": Date.now()
                },
                {
                    "appId": app.id,
                    "name": "High price ",
                    "price": 200,
                    "imageUrl": "melko-21290330.jpg",
                    "createdDate": Date.now()
                }
            ];

            for (var i = 0; i < mainNavi.length; i++) {
                MainNavigation.create(mainNavi[i]).exec(function (err, mainN) {
                    if (err) return err;
                    /**
                     * Add Second Navigation
                     *
                     */

                    if (mainN.name == "Category") {
                        for (var j = 0; j < secondNavi.length; j++) {
                            secondNavi[j].mainId = mainN.id;
                            SecondNavigation.create(secondNavi[j]).exec(function (err, secondN) {
                                if (err) return err;

                                /**
                                 * Add Third NavigatThirdNavigation.jsion
                                 */

                                if (j == 0) {
                                    for (var z = 0; z < thirdNavi1.length; z++) {
                                        thirdNavi1[z].childId = secondN.id;

                                        ThirdNavigation.create(thirdNavi1[z]).exec(function (err, thirdN) {
                                            if (err) return err;
                                        });
//                                        PriceAndVariants.create(thirdNavi1[z]).exec(function (err, thirdN) {
//                                            if (err) return err;
//                                        });
                                    }
                                } else {
                                    for (var z = 0; z < thirdNavi2.length; z++) {
                                        thirdNavi2[z].childId = secondN.id;
                                        ThirdNavigation.create(thirdNavi2[z]).exec(function (err, thirdN) {
                                            if (err) return err;
                                        });
//                                        PriceAndVariants.create(thirdNavi2[z]).exec(function (err, thirdN) {
//                                            if (err) return err;
//                                        });

                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
        res.send({
            appId: app.id,
            message: "New Application is created!!"
        });
         });

    }
};