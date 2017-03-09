/**
 * Created by thusithz on 5/3/16.
 */
/**
 * ApplicationController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs-extra'),
    config = require('../services/config'),
    xml2js = require('xml2js');

module.exports = {

    designApps : function(req,res){
        Template.find().exec(function(err, template) {
            if (err) res.send(err);
            res.send(template);
        });
    },
    getAppsCommerce: function(req,res){
        Template.find({templateType:'ecommerce'}).exec(function(err, template) {
            if (err) res.send(err);
            res.send(template);
        });
    },

    templatePreview : function (req,res) {
    },

    viewTemplate : function(req,res){

        var templateName = req.body.templateName,
            templateCategory = req.body.templateCategory,
            userId = req.body.userId,
            tempAppDirPath = config.ME_SERVER + userId + '/templates/',
            templatePath = config.TEMPLATES_PATH + templateName,
            appName = req.body.appName,
            serverTmp="http://localhost:port",
            serverOrg=config.server.host;

        var loginPath = '/#/',
            isApplyStyle =  {
                color : {
                    backgroundColor: true,
                    footerColor: true,
                    navigationColor: true
                },
                typography : {
                    header : true,
                    content : true,
                    footer : true
                },
                button : true
            };
        if(templateName == 'foodDemoApp' || templateName == 'foodDemoApp2'){
            loginPath = '/#/app/login';
            isApplyStyle = {
                color : {
                    backgroundColor: true,
                    navigationColor: true,
                    footerColor: false
                },
                typography : {
                    header : true,
                    content : true,
                    footer : false
                },
                button : true
            }
        }

        if(templateName == 'clothingApp' || templateName == 'GlamourUpApp'|| templateName == 'CrushApp'|| templateName == 'HeadphoneApp'){
            loginPath = '/#/app/category';
            isApplyStyle = {
                color : {
                    backgroundColor: true,
                    navigationColor: true,
                    footerColor: false
                },
                typography : {
                    header : true,
                    content : true,
                    footer : false
                },
                button : true
            }
        }

        if(templateName == 'hkRising' || templateName == 'RecipeApp'|| templateName == 'NewsApp'){
            loginPath = '/#/app/home/firstMenu';
            isApplyStyle = {
                color : {
                    backgroundColor: true,
                    navigationColor: true,
                    footerColor: false
                },
                typography : {
                    header : true,
                    content : true,
                    footer : false
                },
                button : false
            }
        }

        if(templateName == 'fashionApp'){
            loginPath = '/#/app/categories';
            isApplyStyle = {
                color : {
                    backgroundColor: true,
                    navigationColor: true,
                    footerColor: false
                },
                typography : {
                    header : true,
                    content : true,
                    footer : false
                },
                button : false
            }
        }
        if(templateName == 'ECommerceApp' || templateName == 'BondiApp'){
            loginPath = '/#/tab/home';
            isApplyStyle = {
                color : {
                    backgroundColor: true,
                    navigationColor: true,
                    footerColor: false
                },
                typography : {
                    header : true,
                    content : true,
                    footer : false
                },
                button : true
            }

        }
        if(templateName == 'pizzaHut'){
            isApplyStyle = {
                color : {
                    backgroundColor: true,
                    navigationColor: true,
                    footerColor: false
                },
                typography : {
                    header : true,
                    content : true,
                    footer : false
                },
                button : false
            }
        }
        if(templateName == 'florist'){
            isApplyStyle = {
                color : {
                    backgroundColor: false,
                    navigationColor: true,
                    footerColor: true
                },
                typography : {
                    header : true,
                    content : true,
                    footer : true
                },
                button : false
            }
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
                    sign : "$",
                    currency: "USD",
                    symbol: "usd"
                },
                isApplyBGImage : true,
                isApplyStyle : isApplyStyle,
                backgroundColor : "#FFFFFF",
                navigationBarColor : "#FFFFFF",
                footerColor : "#FFFFFF",
                headerFontColor : "#FFFFFF",
                contentFontColor : "#FFFFFF",
                footerFontColor : "#FFFFFF",
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
            console.log("app.id "   + app.id );

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


            fs.readFile(tempAppDirPath +app.id+'/config.xml', 'utf-8',
                function(err, data) {
                    if (err) return res.negotiate(err);
                    var parser = new xml2js.Parser(),
                        xmlBuilder = new xml2js.Builder();

                    parser.parseString(data, function (err, result) {
                        result.widget['$'].id="com.otenro."+appName.replace(/\s/g, '').toLowerCase()+app.id;
                        var xml = xmlBuilder.buildObject(result);

                        fs.writeFile(tempAppDirPath +app.id+'/config.xml', xml,'utf-8', function(err) {

                            if (err) return res.negotiate(err);
                        });

                    });
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
            
            /** config -|- copy template images to App File Server 
             * TODO : future development, Template dummy data move to another folder
             * **/
            var appFileServerPath  = config.APP_FILE_SERVER + userId + '/templates/' + app.id +'/';
            var tempDummyImagesPath = templatePath + '/img/';
            var tempDummyImagesDesPath = appFileServerPath +  'img/';
            /** Copy Template Dummy Images to APP File Server for given userID & appID **/
            fs.copy(tempDummyImagesPath,tempDummyImagesDesPath,function (err) {
                if (err) return res.negotiate(err);
                    sails.log('Third-navigation images copy to app-File-Server');
                }
            );

        });
        /**
         * Add Main Navigation
         */

        /**
         * If Only foodDemoApp or foodDemoApp2 Category & Product Feed to DB
         */
        if(templateName == 'foodDemoApp' || templateName == 'foodDemoApp2' || templateName == 'clothingApp'
            || templateName == 'ECommerceApp'|| templateName == 'GlamourUpApp'|| templateName == 'CrushApp'|| templateName == 'HeadphoneApp' || templateName == 'BondiApp' ) {
            var searchAppInitialData = {
                'templateName': templateName
            }
            AppInitialData.findOne(searchAppInitialData, function (err, appInitData) {
                if (err) return done(err);

                /**
                 * add Second Navigation
                 */
                var secondNaviList = appInitData.secondNavi;
                secondNaviList.forEach(function(secondNavi){
                var scondNaviAttribute = secondNavi.attribute;
                scondNaviAttribute.templateName = appInitData.templateName;
                scondNaviAttribute.appId = app.id;
                var thirdNaviList = secondNavi.thirdNavi;
                    SecondNavigation.create(scondNaviAttribute).exec(function (err, secondN) {
                        if (err) return err;
                        /**
                        * Add Third Navigation
                        */
                            for (var j = 0; j < thirdNaviList.length; j++) {
                                thirdNaviList[j].appId = app.id;
                                thirdNaviList[j].childId = secondN.id;

                                ThirdNavigation.create(thirdNaviList[j]).exec(function (err, thirdN) {
                                    if (err) return err;
                                });
                            }
                    });

                    })
            });

            /**
             * If hkRising or fashionApp Details Feed to DB
             */
        }else if(templateName == 'hkRising' || templateName == 'fashionApp'|| templateName == 'RecipeApp'|| templateName == 'NewsApp'){
                var searchAppInitialData = {
                    'templateName' : templateName
                }
                AppInitialData.findOne(searchAppInitialData, function(err, appInitData) {
                    if (err) return done(err);
                    var articleCategoryList = appInitData.articleCategory;
                    articleCategoryList.forEach(function (articleCategory) {
                        var articleCategoryattribute = articleCategory.attribute;
                        articleCategoryattribute.appId = app.id;
                        var articalList = articleCategory.article;

                        ArticleCategory.create(articleCategoryattribute).exec(function (err, articleCategory) {

                            articalList.forEach(function (article) {
                                var articalAttribute = article;
                                    articalAttribute.appId = app.id;
                                articalAttribute.categoryId = articleCategory.id;
                                Article.create(articalAttribute).exec(function (err, artical) {
                                    if (err) return err;
                                });
                            });
                        })
                    })
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
                    "tempImageArray" : [
                        {
                            "img" : "article-0-1A9F1DAA000005DC-669_634x447.jpg"
                        }
                    ],
                    "variants":[{
                      "name": "Low price ",
                      'sku': "1111",
                      'size': "11",
                      'price': "100",
                      'quantity': 11
                    }],
                    "imageUrl": "article-0-1A9F1DAA000005DC-669_634x447.jpg",
                    "createdDate": Date.now()
                },
                {
                    "appId": app.id,
                    "name": "High price ",
                    "price": 200,
                    "tempImageArray" : [
                        {
                            "img" : "OOMPizza-Pepperoni-300x233.jpg"
                        }
                    ],
                    "variants":[{
                      "name": "Low price ",
                      'sku': "1111",
                      'size': "11",
                      'price': "200",
                      'quantity': 11
                    }],
                    "imageUrl": "OOMPizza-Pepperoni-300x233.jpg",
                    "createdDate": Date.now()
                }
            ];
            var thirdNavi2 = [
                {
                    "appId": app.id,
                    "name": "Low price ",
                    "price": 100,
                    "tempImageArray" : [
                        {
                            "img" : "pizza.jpg"
                        }
                    ],
                    "variants":[{
                      "name": "Low price ",
                      'sku': "1111",
                      'size': "11",
                      'price': "100",
                      'quantity': 11
                    }],
                    "imageUrl": "pizza.jpg",
                    "createdDate": Date.now()
                },
                {
                    "appId": app.id,
                    "name": "High price ",
                    "price": 200,
                    "tempImageArray" : [
                        {
                            "img" : "melko-21290330.jpg"
                        }
                    ],
                    "variants":[{
                      "name": "Low price ",
                      'sku': "1111",
                      'size': "11",
                      'price': "200",
                      'quantity': 11
                    }],
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
            message: "New Application has been created"
        });
         });

    },

    getApplicationData :function(req,res){
    Application.findOne({'id':req.param('appId')}).exec(function(err, application) {
        if (err) {
            res.send(err);
        }else {
            res.json(application);
        }

    })
    },
    iconAllowance : function(req,res){
        ApplicationStoreSettings.findOne({appId: req.param('appId')}).exec(function(err,data){
            if(err) res.send(err);
                res.send(data);
        })
    },
    createTempTemplates : function(req,res){
        var templateName = req.body.templateName,
            userId = req.body.userId,
            appId = req.body.appId,
            tempAppDirPath = config.ME_SERVER + userId + '/templates/',
            templatePath = sails.config.appPath + '/api/templates/' + templateName;


        fs.copy(templatePath, tempAppDirPath + 'changePreview' , function(err) {
            if (err) return console.error(err);
            var madeEasyFilePath = tempAppDirPath + appId + '/madeEasy.Project';
            sails.log.info(madeEasyFilePath);
            fs.copy(madeEasyFilePath, tempAppDirPath + 'changePreview/madeEasy.Project' , function(err){
                if (err) return console.error(err);
                var bgFilePath = tempAppDirPath + appId + '/img/background.jpg';
                fs.copy(bgFilePath, tempAppDirPath + 'changePreview/img/background.jpg' , function(err){
                    if (err) return console.error(err);

                    res.send({
                        message: "New Application has been created"
                    });
                });
            });

        });



    },
    changeTemplatePermanent : function(req,res){
        var userId = req.body.userId,
            appId = req.body.appId,
            tempAppDirPath = config.ME_SERVER + userId + '/templates/changePreview',
            templatePath = config.ME_SERVER + userId + '/templates/'+appId;
            //templatePath = sails.config.appPath + '/api/templates/' + templateName;
            sails.log.info(templatePath);

        fs.copy(tempAppDirPath, templatePath , function(err) {
            if (err) return console.error(err);
            res.send({
                message: "New Application has been created"
            });

        });



    }
};