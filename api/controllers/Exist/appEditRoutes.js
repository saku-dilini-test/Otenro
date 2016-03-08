/**
 * Created by udeshikaperera on 17/07/2015.
 */
var express = require('express');
var mkpath = require('mkpath');
var fs = require('fs-extra');
var path = require('path');
var im = require('imagemagick');
var sizeOf = require('image-size');
var config = require('../config');
var moment = require('moment');
var Application = require('../models/Applications');
var ApplicationProduct = require('../models/ApplicationProducts');
var ApplicationCategory = require('../models/ApplicationCategorys');
var ApplicationContactUs = require('../models/ApplicationContactUs');
var User = require('../models/User');
var appEditorRouter = express.Router();
var app = express();
var isAuthenticated = require('../services/authentication/authMiddleWare');
var multipart = require('connect-multiparty');
multipartyMiddleware = multipart();
var MainMenu = require('../models/MainMenu');
var mongoose = require('mongoose');
var BuildVersions = require('../models/BuildVersions');
var xml2js = require('xml2js');//, util = require('util');

appEditorRouter.post('/viewTemplate',isAuthenticated,function(req, res) {

    var templateName = req.body.templateName;
    var userId = req.userId;
    var tempAppDirPath = config.ME_SERVER + userId + '/templates/';
    var templatePath = 'templates/' + templateName;
    var appName = req.body.appName;

    var application = new Application(req.body);
    application.appTempPath = tempAppDirPath;
    application.userId = userId;
    application.status = "DRAFT";
    application.appSettings= { appCurrency : "Rs." };

    application.save(function(err, app) {
        if (err) res.send(err);

        fs.copy(templatePath, tempAppDirPath + app.id, function(err) {
            if (err) return console.error(err);

            var madeEasyFilePath = tempAppDirPath +'/'+app.id+'/madeEasy.Project';
            var madeEasyFileContent = {
                name : appName,
                appId : app.id,
                userId : userId
            };
            fs.outputJson(madeEasyFilePath,madeEasyFileContent, function (err) {
                if(err) return console.error(err);
            })

        });
        /**
         * Add Menu list
         */
        MainMenu.create(
            {
                "name" : "Promo",
                "link" : "promo",
                "appId" : app.id,
                "icon"  : "glyphicon glyphicon-cloud",
                "createdDate" : moment()
            },
            {
                "name" : "Category",
                "link" : "category",
                "appId" :  app.id,
                "icon"  : "glyphicon glyphicon-cloud",
                "createdDate" : moment()
            },
            {
                "name" : "Best Seller",
                "link" : "bestSeller",
                "appId" : app.id,
                "icon"  : "glyphicon glyphicon-cloud",
                "createdDate" : moment()
            },
            {
                "name" : "Contact Us",
                "link" : "contact",
                "appId" : app.id,
                "icon"  : "glyphicon glyphicon-cloud",
                "createdDate" : moment()
            }
        );
        /**
         * Add Category list and link to mainMenuCategory
         */
        MainMenu.findOne({appId: app.id , name:'Category'}, function(err, mainMenuCategory) {
            if (err) return done(err);
            console.log("Manu detail");
            console.log(mainMenuCategory.id);
            ApplicationCategory.create(
                {
                    "imageUrl" : "category_61_5327.jpg",
                    "appId" : app.id,
                    "mainId" : mainMenuCategory.id,
                    "name" : "Hot",
                    "desc" : "Hot description"
                },
                {
                    "imageUrl" : "melko-21290330.jpg",
                    "appId" : app.id,
                    "mainId" : mainMenuCategory.id,
                    "name" : "Low",
                    "desc" : "Low description"
                }
            );
            /**
             * Add product list
             */
            ApplicationCategory.find({appId: app.id }, function(err, child) {
                if (err) return done(err);
                for(var i=0; i < child.length ; i++){


                    if(i == 0){
                        ApplicationProduct.create(
                            {
                                "appId" : app.id,
                                "name" : "Low price ",
                                "price" : "100",
                                "childId" : child[i].id,
                                "imageUrl" : "article-0-1A9F1DAA000005DC-669_634x447.jpg",
                                "createdDate" : Date.now()
                            },
                            {
                                "appId" : app.id,
                                "name" : "High price ",
                                "price" : "200",
                                "childId" : child[i].id,
                                "imageUrl" : "OOMPizza-Pepperoni-300x233.jpg",
                                "createdDate" : Date.now()
                            }
                        );
                    }else{
                        ApplicationProduct.create(
                            {
                                "appId" : app.id,
                                "name" : "Low price ",
                                "price" : "100",
                                "childId" : child[i].id,
                                "imageUrl" : "pizza.jpg",
                                "createdDate" : Date.now()
                            },
                            {
                                "appId" : app.id,
                                "name" : "High price ",
                                "price" : "200",
                                "childId" : child[i].id,
                                "imageUrl" : "melko-21290330.jpg",
                                "createdDate" : Date.now()
                            }
                        );
                    }
                }
            });
        });

        res.send({
            appId: app.id,
            message: "New Application is created!!"
        });
    });

    //app.use(express.static(__dirname + '/templates/resturant/'));
    // var newTemplate = req.param('newTemplate');
    // var id = req.param('id');
    //res.sendFile(__dirname + '/templates/resturant/index.html');
    //var path = 'http://localhost:8080/app';
    //var path = 'http://localhost:9000/#/home';
    //res.writeHead(302, {
    //    'Location': "jkhj"
    //});
    //res.end();
});


appEditorRouter.post('/buildSource', isAuthenticated, function(req, res) {
    var userId = req.userId;
    var appId = req.body.appId;
    var copyDir = userId + '/build/' + appId;
    var copyDirPath = config.ME_SERVER + copyDir + '/madeEasyApp';
    var platFormPath = 'platforms';
    var selectedTemplatePath = config.ME_SERVER + userId + '/templates/' + appId;
    var wwwPath = copyDirPath + '/www/';
    var configFile = copyDirPath + '/www/config.xml';
    var moveConfigFile = copyDirPath + '/config.xml';
    var appIconFile = copyDirPath + '/www/res/android/icon/icon.jpg';
    var srcPath = 'src/hybrid';

    fs.readFile(moveConfigFile, 'utf-8',
        function(err, data) {

            if(!data){

                fs.copy(srcPath, copyDirPath, function (err) {
                    if (err) return console.error(err);

                    //Success
                    var removeDirArray = ['www'];
                    for (var i = 0; i < removeDirArray.length; i++) {
                        var removeDirPath = copyDirPath + '/' + removeDirArray[i];
                        fs.remove(removeDirPath, function (err) {
                            if (err) return console.error(err);

                            //Success
                            fs.copy(selectedTemplatePath, wwwPath, function (err) {
                                if (err) return console.error(err);

                                var searchApp = {
                                    _id: appId
                                };
                                Application.findOne(searchApp, function (err, app) {
                                    if (err) return console.error(err);
                                    replaceAppNameNIcon(app.appName, app.appIcon);
                                });
                            });
                        })
                    }

                });

            }else{

                var parser = new xml2js.Parser(),
                    xmlBuilder = new xml2js.Builder();

                fs.readFile(moveConfigFile, 'utf-8',
                    function(err, data) {
                        if (err) {
                            return console.log(err);
                        }
                        parser.parseString(data, function (err, result) {

                            var preVersion=result.widget['$'].version;
                            var version=increaseVersion(preVersion);
                            result.widget['$'].version=version;
                            var xml = xmlBuilder.buildObject(result);

                            fs.writeFile(moveConfigFile, xml,'utf-8', function(err) {
                                if (err) return console.log(err);
                            });

                            BuildVersions.create({
                                appId: appId,
                                previousVersion: preVersion,
                                version : version,
                                createdDate : moment()
                            });
                        });
                    });

                fs.copy(selectedTemplatePath, wwwPath, function (err) {
                    if (err) return console.error(err);

                    fs.unlink(configFile, function (err) {
                        if (err) throw err;
                    });
                });


            }
        });

    function replaceAppNameNIcon(appName, icon) {
        var parser = new xml2js.Parser(),
            xmlBuilder = new xml2js.Builder();
        fs.readFile(configFile, 'utf-8',
            function(err, data) {
                if (err) {
                    return console.log(err);
                }

                parser.parseString(data, function (err, result) {

                    result.widget.name=appName;

                    var xml = xmlBuilder.buildObject(result);

                    fs.writeFile(configFile, xml,'utf-8', function(err) {

                                if (err) return console.log(err);
                    });

                    fs.writeFile(moveConfigFile, xml,'utf-8', function(err) {

                        if (err) return console.log(err);
                    });

                    fs.unlink(configFile, function (err) {
                        if (err) throw err;
                    });

                    fs.writeFile(appIconFile, icon, 'base64', function(err) {
                        if (err) return console.log(err);
                    });


                    BuildVersions.create({
                        appId: appId,
                        previousVersion:result.widget['$'].version,
                        version : result.widget['$'].version,
                        createdDate : moment()
                    });
                });
            }
        );
    }

    function increaseVersion(version){
       var array=version.split(".");
        if(array[2]==9){
            if(array[1]==9){
                array[2]=0;
                array[1]=0;
                array[0]++;
            }else{
                array[2]=0;
                array[1]++
            }
        }else{
            array[2]++;
        }
        return array[0]+"."+array[1]+"."+array[2];
    }
});

appEditorRouter.post('/addProducts', isAuthenticated, multipartyMiddleware, function(req, res) {

    var path = req.files.file.path;
    var fileName = Date.now() + '_' + req.files.file.name;
    var dePath=config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/products/';
    fs.stat(path, function(err, stat) {
        if (err == null) {
            fs.move(path, dePath + fileName, function(err) {
                if (err) return console.error(err);
                console.log("success!");
            })

        } else if (err.code == 'ENOENT') {
            fs.writeFile('log.txt', 'Some log\n');
        } else {
            console.log('Some other error: ', err.code);
        }
    });

    var data = {
        'appId': req.body.appId,
        'name': req.body.name,
        'price': req.body.price,
        'childId': req.body.childId,
        'imageUrl': fileName,
        'createdDate':moment(),
      // 'desc' : req.body.desc,
        'discount' : req.body.discount
    };

    console.log(data);
    var applicationProduct = new ApplicationProduct(data);
    applicationProduct.save(function(err, appProduct) {
        if (err) res.send(err);

        res.send({
            appId: appProduct,
            message: "New Application is created!!"
        });
    });

});
appEditorRouter.post('/setCurrency', isAuthenticated, multipartyMiddleware, function(req, res) {
//updating the selected currency in the Application model
    var data = {
        appSettings:{
            'appCurrency': req.body.currency
        }
    };
    var query = {_id:req.body.appId};
    Application.update(query,data).exec(function(err, appProduct) {
        if (err) res.send(err);
        res.send({
            appId: appProduct,
            message: "Successfully added the currency!!!"
        });
    });

});

appEditorRouter.post('/addStyles', isAuthenticated,multipartyMiddleware, function(req, res) {

    var userId = req.userId;
    var appId = req.body.appId;
    var main = config.ME_SERVER + userId + '/templates/' + appId + '/css/main.css';


    var header = req.body.header;
    var color = req.body.color;
    var font = req.body.font;
    var fontSize = req.body.fontSize;
    var backImg = req.body.headerImg;
    var data = header;
    var bdata = backImg;

    var headerImage = config.ME_SERVER + userId + '/templates/' + appId + '/img/'+ 'headerTemp.jpg';
    var headerExist = config.ME_SERVER + userId + '/templates/' + appId + '/img/'+ 'header.jpg';
    var backgroundImage = config.ME_SERVER + userId + '/templates/' + appId + '/img/'+ 'backgroundTemp.jpg';
    var background = config.ME_SERVER + userId + '/templates/' + appId + '/img/'+ 'background.jpg';

    var headerDimensions = sizeOf(headerExist);
    var backgroundDimensions = sizeOf(background);

    var query = { appId: req.body.appId };
    Application.update(query,
        { $set:
        {
            'appSettings.header' : header,
            'appSettings.color' : color,
            'appSettings.font' : font,
            'appSettings.fontSize' : fontSize,
            'appSettings.backImg' : backImg
        }
        });
    /**
     *  Decode Image
     * @param dataString
     * @returns {*}
     */
    function decodeBase64Image(dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');
        return response;
    }

    try{
        mkpath(config.ME_SERVER + userId + '/templates/' + appId + '/img/'+ 'header.jpg', 0777, function (err) {
        })
    }
    catch(e){
        if(e.code != 'EEXIT') throw e;
    }

    /**
     * read header image and create temporary image with new image then resize new header image and overwrite it
     */
    if(typeof data != "undefined"){
        var headerimageBuffer = decodeBase64Image(data);
        fs.readFile(headerExist, function (err, data) {
            if(err){
                return console.dir(err);
            }
            console.log("Header file read");
            fs.writeFile(headerImage, headerimageBuffer.data, function (err) {
                if(err){
                    //this will log specific error to file
                    return console.dir(err);
                }
                console.log("Header image write");
                im.resize({
                    srcPath:headerImage,
                    dstPath: headerExist,
                    width: headerDimensions.width,
                    height: headerDimensions.height

                }, function(err, stdout, stderr){
                    if (err) throw err;
                    console.log('resized image to fit within ' + headerDimensions.width + ' and ' + headerDimensions.height);
                });
                console.log("success");
            });
        });
    }
    /**
     * read background image and create temporary image with new image then resize new header image and overwrite it
     */
    if(typeof bdata != "undefined"){

        var backgroundimageBuffer = decodeBase64Image(bdata);

        fs.readFile(background, function (err, data){
            if(err){
                return console.dir(err);
            }
            fs.writeFile(backgroundImage, backgroundimageBuffer.data, function (err) {
                if(err){
                    return console.dir(err);
                }
                im.resize({
                    srcPath:backgroundImage,
                    dstPath: background,
                    width: backgroundDimensions.width,
                    height: backgroundDimensions.height
                }, function(err, stdout, stderr){
                    if (err) throw err;
                    console.log('resized image to fit within ' + backgroundDimensions.width + ' and ' + backgroundDimensions.height);
                });

                console.log("success");
            });
        });
    }
    /**
     * update css file with new changes
     */
    function updateFile(filename, replacements) {
        return new Promise(function(resolve) {
            fs.readFile(filename, 'utf-8', function(err, data) {
                var regex, replaceStr;
                if (err) {
                    throw (err);
                } else {
                    for (var i = 0; i < replacements.length; i++) {
                        regex = new RegExp("(\\" + replacements[i].rule + "\\s*{[^}]*" + replacements[i].target + "\\s*:\\s*)([^\\n;}]+)([\\s*;}])");
                        replaceStr = "$1" + replacements[i].replacer + "$3";
                        data = data.replace(regex, replaceStr);
                    }
                }
                fs.writeFile(filename, data, 'utf-8', function(err) {
                    if (err) {
                        throw (err);
                    } else {
                        resolve();
                    }
                });
            });
        })
    }
    if (font == "Arial" && fontSize == 11) {
        updateFile(main, [{
            rule: ".made-easy-themeColor",
            target: "color",
            replacer: color
        }], function(err) {
            console.log((err));
        });
    } else if (color == "#FFFFFF" && font == "Arial") {
        updateFile(main, [{
            rule: ".made-easy-themeFontSize",
            target: "font-size",
            replacer: fontSize + "em"
        }], function(err) {
            console.log((err));
        });
    } else if (color == "#FFFFFF" && fontSize == 11) {
        updateFile(main, [{
            rule: ".made-easy-themeFont",
            target: "font-family",
            replacer: font
        }], function(err) {
            console.log((err));
        });
    } else if (font == "Arial") {
        updateFile(main, [{
            rule: ".made-easy-themeColor",
            target: "color",
            replacer: color
        }, {
            rule: ".made-easy-themeFontSize",
            target: "font-size",
            replacer: fontSize + "em"
        }], function(err) {
            console.log((err));
        });
    } else if (fontSize == 11) {
        updateFile(main, [{
            rule: ".made-easy-themeColor",
            target: "color",
            replacer: color
        }, {
            rule: ".made-easy-themeFont",
            target: "font-family",
            replacer: font
        }], function(err) {
            console.log((err));
        });
    } else {
        updateFile(main, [{
            rule: ".made-easy-themeColor",
            target: "color",
            replacer: color
        }, {
            rule: ".made-easy-themeFont",
            target: "font-family",
            replacer: font
        }, {
            rule: ".made-easy-themeFontSize",
            target: "font-size",
            replacer: fontSize + "em"
        }], function(err) {
            console.log((err));
        });

    }
});

/**
 * Update header image given appId
 */
appEditorRouter.post('/addHeaderImage', isAuthenticated,multipartyMiddleware, function(req, res) {

    var userId = req.userId;
    var appId = req.body.appId;
    var headerImg = req.body.headerImg;
    var data = headerImg;
    var headerImage = config.ME_SERVER + userId + '/templates/' + appId + '/img/'+ 'headerTemp.jpg';
    var headerExist = config.ME_SERVER + userId + '/templates/' + appId + '/img/'+ 'header.jpg';
    var headerDimensions = sizeOf(headerExist);

    /**
     *  Decode Image
     * @param dataString
     * @returns {*}
     */
    function decodeBase64Image(dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');
        return response;
    }
    try{
        mkpath(config.ME_SERVER + userId + '/templates/' + appId + '/img/'+ 'header.jpg', 0777, function (err) {
        })
    }
    catch(e){
        if(e.code != 'EEXIT') throw e;
    }

    /**
     * read header image and create temporary image with new image then resize new header image and overwrite it
     */
    if(typeof data != "undefined"){
        var headerimageBuffer = decodeBase64Image(data);
        fs.readFile(headerExist, function (err, data) {
            if(err){
                return console.dir(err);
            }
            console.log("Header file read");
            fs.writeFile(headerImage, headerimageBuffer.data, function (err) {
                if(err){
                    //this will log specific error to file
                    return console.dir(err);
                }
                console.log("Header image write");
                console.log(headerDimensions.height);
                im.resize({
                    srcPath:headerImage,
                    dstPath: headerExist,
                    width: headerDimensions.width,
                    height: headerDimensions.height

                }, function(err, stdout, stderr){
                    if (err) throw err;
                    console.log('resized image to fit within ' + headerDimensions.width + ' and ' + headerDimensions.height);
                });
                console.log("success");
            });
        });
    }

});

/**
 * Update background image given appId
 */
appEditorRouter.post('/addBackgroundImage', isAuthenticated,multipartyMiddleware, function(req, res) {

    var userId = req.userId;
    var appId = req.body.appId;
    var backImg = req.body.backgroundImg;
    var data = backImg;
    var backgroundImage = config.ME_SERVER + userId + '/templates/' + appId + '/img/'+ 'backgroundTemp.jpg';
    var backgroundExist = config.ME_SERVER + userId + '/templates/' + appId + '/img/'+ 'background.jpg';
    var backgroundDimensions = sizeOf(backgroundExist);

    /**
     *  Decode Image
     * @param dataString
     * @returns {*}
     */
    function decodeBase64Image(dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');
        return response;
    }
    try{
        mkpath(config.ME_SERVER + userId + '/templates/' + appId + '/img/'+ 'header.jpg', 0777, function (err) {
        })
    }
    catch(e){
        if(e.code != 'EEXIT') throw e;
    }

    /**
     * read background image and create temporary image with new image then resize new header image and overwrite it
     */
    if(typeof data != "undefined"){

        var backgroundimageBuffer = decodeBase64Image(data);

        fs.readFile(backgroundExist, function (err, data){
            if(err){
                return console.dir(err);
            }
            fs.writeFile(backgroundImage, backgroundimageBuffer.data, function (err) {
                if(err){
                    return console.dir(err);
                }
                im.resize({
                    srcPath:backgroundImage,
                    dstPath: backgroundExist,
                    width: backgroundDimensions.width,
                    height: backgroundDimensions.height
                }, function(err, stdout, stderr){
                    if (err) throw err;
                    console.log('resized image to fit within ' + backgroundDimensions.width + ' and ' + backgroundDimensions.height);
                });

                console.log("success");
            });
        });
    }

});

/**
 * Update Background Color given appId
 */
appEditorRouter.post('/addBackgroundColor', isAuthenticated, multipartyMiddleware, function(req, res) {

    var userId = req.userId;
    var appId = req.body.appId;
    var mainCssFile = config.ME_SERVER + userId + '/templates/' + appId + '/css/main.css';
    var backgroundColor = req.body.backgroundColor;

    var data = {
        appSettings:{
            color: backgroundColor
        }
    };
    var query = {_id:appId};
    Application.update(query,data).exec(function(err, appProduct) {
        if (err) res.send(err);
    });

    /**
     * update css file with new changes
     */
    function updateFile(filename, replacements) {
        return new Promise(function(resolve) {
            fs.readFile(filename, 'utf-8', function(err, data) {
                var regex, replaceStr;
                if (err) {
                    throw (err);
                } else {
                    for (var i = 0; i < replacements.length; i++) {
                        regex = new RegExp("(\\" + replacements[i].rule + "\\s*{[^}]*" + replacements[i].target + "\\s*:\\s*)([^\\n;}]+)([\\s*;}])");
                        replaceStr = "$1" + replacements[i].replacer + "$3";
                        data = data.replace(regex, replaceStr);
                    }
                }
                fs.writeFile(filename, data, 'utf-8', function(err) {
                    if (err) {
                        throw (err);
                    } else {
                        resolve();
                    }
                });
            });
        })
    }

    if (backgroundColor == '#FFFFFF') {
        updateFile(mainCssFile, [{

        }], function (err) {
            console.log((err));
        });
    }else{
        updateFile(mainCssFile, [{
            rule: ".made-easy-themeColor",
            target: "color",
            replacer: backgroundColor
        }], function (err) {
            console.log((err));
        });
    }
});

/**
 * Update Background Color , Navigation Bar , Footer and Button given appId with common function
 */
appEditorRouter.post('/addStyleColor', isAuthenticated, multipartyMiddleware, function(req, res) {

    var userId = req.userId;
    var appId = req.body.appId;
    var mainCssFile = config.ME_SERVER + userId + '/templates/' + appId + '/css/main.css';
    var styleColor = req.body.styleColor;
    var type = req.body.type;
    var data = {};
    var colorTypeCss = '';
    if(type == 'backgroundColor'){
        data['appSettings.backgroundColor'] = styleColor;
        colorTypeCss = ".made-easy-backgroundColor";
    }else if(type == 'navigationBarColor'){
        data['appSettings.navigationBarColor'] = styleColor;
        colorTypeCss = ".made-easy-navigationBarColor";
    }else if(type == 'footerColor'){
        data['appSettings.footerColor'] = styleColor;
        colorTypeCss = ".made-easy-footerColor";
    }else if(type == 'buttonColor'){
        data['appSettings.buttonColor'] = styleColor;
        colorTypeCss = ".made-easy-button-setting";
    }

    var query = {_id:appId};
    Application.update(query,data).exec(function(err, app) {
        if (err) res.send(err);
        res.send(app);
    });

    /**
     * update css file with new changes
     *
     */
    function updateFile(filename, replacements) {
        return new Promise(function(resolve) {
            fs.readFile(filename, 'utf-8', function(err, data) {
                var regex, replaceStr;
                if (err) {
                    throw (err);
                } else {
                    for (var i = 0; i < replacements.length; i++) {
                        regex = new RegExp("(\\" + replacements[i].rule + "\\s*{[^}]*" + replacements[i].target + "\\s*:\\s*)([^\\n;}]+)([\\s*;}])");
                        replaceStr = "$1" + replacements[i].replacer + "$3";
                        data = data.replace(regex, replaceStr);
                    }
                }
                fs.writeFile(filename, data, 'utf-8', function(err) {
                    if (err) {
                        throw (err);
                    } else {
                        resolve();
                    }
                });
            });
        })
    }

    updateFile(mainCssFile, [{
        rule: colorTypeCss,
        target: "background-color",
        replacer: styleColor
    }], function (err) {
        console.log((err));
    });

});

/**
 * Update header, content , footer and button font family given appId with common function
 */
appEditorRouter.post('/addStyleFontFamily', isAuthenticated, multipartyMiddleware, function(req, res) {

    var userId = req.userId;
    var appId = req.body.appId;
    var mainCssFile = config.ME_SERVER + userId + '/templates/' + appId + '/css/main.css';
    var styleFontFamily = req.body.styleFontFamily;
    var type = req.body.type;
    var data = {};
    var fontFamilyCss = '';

    if(type == 'headerFont'){
        data['appSettings.headerFontFamily'] = styleFontFamily;
        fontFamilyCss = ".made-easy-header-font";
    }else if(type == 'contentFont'){
        data['appSettings.contentFontFamily'] = styleFontFamily;
        fontFamilyCss = ".made-easy-content-font";
    }else if(type == 'footerFont'){
        data['appSettings.footerFontFamily'] = styleFontFamily;
        fontFamilyCss = ".made-easy-footer-font";
    }else if(type == 'buttonFont'){
        data['appSettings.buttonFontFamily'] = styleFontFamily;
        fontFamilyCss = ".made-easy-button-setting";
    }

    var query = {_id:appId};
    Application.update(query,data).exec(function(err, app) {
        if (err) res.send(err);
        res.send(app);
    });

    /**
     * update css file with new changes
     *
     */
    function updateFile(filename, replacements) {
        return new Promise(function(resolve) {
            fs.readFile(filename, 'utf-8', function(err, data) {
                var regex, replaceStr;
                if (err) {
                    throw (err);
                } else {
                    for (var i = 0; i < replacements.length; i++) {
                        regex = new RegExp("(\\" + replacements[i].rule + "\\s*{[^}]*" + replacements[i].target + "\\s*:\\s*)([^\\n;}]+)([\\s*;}])");
                        replaceStr = "$1" + replacements[i].replacer + "$3";
                        data = data.replace(regex, replaceStr);
                    }
                }
                fs.writeFile(filename, data, 'utf-8', function(err) {
                    if (err) {
                        throw (err);
                    } else {
                        resolve();
                    }
                });
            });
        })
    }

    updateFile(mainCssFile, [{
        rule: fontFamilyCss,
        target: "font-family",
        replacer: styleFontFamily
    }], function (err) {
        console.log((err));
    });

});

/**
 * Update header, content and footer font Size given appId with common function
 */
appEditorRouter.post('/addStyleFontSize', isAuthenticated, multipartyMiddleware, function(req, res) {

    var userId = req.userId;
    var appId = req.body.appId;
    var mainCssFile = config.ME_SERVER + userId + '/templates/' + appId + '/css/main.css';
    var styleFontSize = req.body.styleFontSize;
    var type = req.body.type;
    var data = {};
    var fontSizeCss = '';

    if(type == 'headerFont'){
        data['appSettings.headerFontSize'] = styleFontSize;
        fontSizeCss = ".made-easy-header-font";
    }else if(type == 'contentFont'){
        data['appSettings.contentFontSize'] = styleFontSize;
        fontSizeCss = ".made-easy-content-font";
    }else if(type == 'footerFont'){
        data['appSettings.footerFontSize'] = styleFontSize;
        fontSizeCss = ".made-easy-footer-font";
    }

    var query = {_id:appId};
    Application.update(query,data).exec(function(err, app) {
        if (err) res.send(err);
        res.send(app);
    });

    /**
     * update css file with new changes
     *
     */
    function updateFile(filename, replacements) {
        return new Promise(function(resolve) {
            fs.readFile(filename, 'utf-8', function(err, data) {
                var regex, replaceStr;
                if (err) {
                    throw (err);
                } else {
                    for (var i = 0; i < replacements.length; i++) {
                        regex = new RegExp("(\\" + replacements[i].rule + "\\s*{[^}]*" + replacements[i].target + "\\s*:\\s*)([^\\n;}]+)([\\s*;}])");
                        replaceStr = "$1" + replacements[i].replacer + "$3";
                        data = data.replace(regex, replaceStr);
                    }
                }
                fs.writeFile(filename, data, 'utf-8', function(err) {
                    if (err) {
                        throw (err);
                    } else {
                        resolve();
                    }
                });
            });
        })
    }

    updateFile(mainCssFile, [{
        rule: fontSizeCss,
        target: "font-size",
        replacer: styleFontSize
    }], function (err) {
        console.log((err));
    });

});

/**
 * Update header, content and footer font Weight given appId with common function
 */
appEditorRouter.post('/addStyleFontWeight', isAuthenticated, multipartyMiddleware, function(req, res) {

    var userId = req.userId;
    var appId = req.body.appId;
    var mainCssFile = config.ME_SERVER + userId + '/templates/' + appId + '/css/main.css';
    var styleFontWeight = req.body.styleFontWeight;
    var type = req.body.type;
    var data = {};
    var fontWeightCss = '';

    if(type == 'headerFont'){
        data['appSettings.headerFontWeight'] = styleFontWeight;
        fontWeightCss = ".made-easy-header-font";
    }else if(type == 'contentFont'){
        data['appSettings.contentFontWeight'] = styleFontWeight;
        fontWeightCss = ".made-easy-content-font";
    }else if(type == 'footerFont'){
        data['appSettings.footerFontWeight'] = styleFontWeight;
        fontWeightCss = ".made-easy-footer-font";
    }

    var query = {_id:appId};
    Application.update(query,data).exec(function(err, app) {
        if (err) res.send(err);
        res.send(app);
    });

    /**
     * update css file with new changes
     *
     */
    function updateFile(filename, replacements) {
        return new Promise(function(resolve) {
            fs.readFile(filename, 'utf-8', function(err, data) {
                var regex, replaceStr;
                if (err) {
                    throw (err);
                } else {
                    for (var i = 0; i < replacements.length; i++) {
                        regex = new RegExp("(\\" + replacements[i].rule + "\\s*{[^}]*" + replacements[i].target + "\\s*:\\s*)([^\\n;}]+)([\\s*;}])");
                        replaceStr = "$1" + replacements[i].replacer + "$3";
                        data = data.replace(regex, replaceStr);
                    }
                }
                fs.writeFile(filename, data, 'utf-8', function(err) {
                    if (err) {
                        throw (err);
                    } else {
                        resolve();
                    }
                });
            });
        })
    }

    updateFile(mainCssFile, [{
        rule: fontWeightCss,
        target: "font-weight",
        replacer: styleFontWeight
    }], function (err) {
        console.log((err));
    });

});

/**
 * Update button border width function
 */
appEditorRouter.post('/addStyleButtonBorderWidth', isAuthenticated, multipartyMiddleware, function(req, res) {

    var userId = req.userId;
    var appId = req.body.appId;
    var mainCssFile = config.ME_SERVER + userId + '/templates/' + appId + '/css/main.css';
    var buttonBorderWidth = req.body.styleButtonBorderWidth;
    var data = {'appSettings.buttonBorderWidth' : buttonBorderWidth}
    var buttonBorderWidthCss = '.made-easy-button-setting';

    var query = {_id:appId};
    Application.update(query,data).exec(function(err, app) {
        if (err) res.send(err);
        res.send(app);
    });

    /**
     * update css file with new changes
     *
     */
    function updateFile(filename, replacements) {
        return new Promise(function(resolve) {
            fs.readFile(filename, 'utf-8', function(err, data) {
                var regex, replaceStr;
                if (err) {
                    throw (err);
                } else {
                    for (var i = 0; i < replacements.length; i++) {
                        regex = new RegExp("(\\" + replacements[i].rule + "\\s*{[^}]*" + replacements[i].target + "\\s*:\\s*)([^\\n;}]+)([\\s*;}])");
                        replaceStr = "$1" + replacements[i].replacer + "$3";
                        data = data.replace(regex, replaceStr);
                    }
                }
                fs.writeFile(filename, data, 'utf-8', function(err) {
                    if (err) {
                        throw (err);
                    } else {
                        resolve();
                    }
                });
            });
        })
    }

    updateFile(mainCssFile, [{
        rule: buttonBorderWidthCss,
        target: "border-width",
        replacer: buttonBorderWidth
    }], function (err) {
        console.log((err));
    });

});

/**
 * Update button border Radius function
 */
appEditorRouter.post('/addStyleButtonBorderRadius', isAuthenticated, multipartyMiddleware, function(req, res) {

    var userId = req.userId;
    var appId = req.body.appId;
    var mainCssFile = config.ME_SERVER + userId + '/templates/' + appId + '/css/main.css';
    var buttonBorderRadius = req.body.styleButtonBorderRadius;
    var data = {'appSettings.buttonBorderRadius' : buttonBorderRadius}
    var buttonBorderRadiusCss = '.made-easy-button-setting';

    var query = {_id:appId};
    Application.update(query,data).exec(function(err, app) {
        if (err) res.send(err);
        res.send(app);
    });

    /**
     * update css file with new changes
     *
     */
    function updateFile(filename, replacements) {
        return new Promise(function(resolve) {
            fs.readFile(filename, 'utf-8', function(err, data) {
                var regex, replaceStr;
                if (err) {
                    throw (err);
                } else {
                    for (var i = 0; i < replacements.length; i++) {
                        regex = new RegExp("(\\" + replacements[i].rule + "\\s*{[^}]*" + replacements[i].target + "\\s*:\\s*)([^\\n;}]+)([\\s*;}])");
                        replaceStr = "$1" + replacements[i].replacer + "$3";
                        data = data.replace(regex, replaceStr);
                    }
                }
                fs.writeFile(filename, data, 'utf-8', function(err) {
                    if (err) {
                        throw (err);
                    } else {
                        resolve();
                    }
                });
            });
        })
    }

    updateFile(mainCssFile, [{
        rule: buttonBorderRadiusCss,
        target: "border-radius",
        replacer: buttonBorderRadius
    }], function (err) {
        console.log((err));
    });

});

/**
 * Update Fonts given appId
 */
appEditorRouter.post('/addFonts', isAuthenticated,multipartyMiddleware, function(req, res) {

    var userId = req.userId;
    var appId = req.body.appId;
    var mainCssFile = config.ME_SERVER + userId + '/templates/' + appId + '/css/main.css';
    var font = req.body.font;
    var fontSize = req.body.fontSize;

    var data = {
        appSettings: {
            font: font,
            fontSize: fontSize
        }
    };
    var query = {_id:appId};
    Application.update(query,data).exec(function(err, appFonts) {
        if (err) res.send(err);
    });

    /**
     * update css file with new changes
     */
    function updateFile(filename, replacements) {
        return new Promise(function(resolve) {
            fs.readFile(filename, 'utf-8', function(err, data) {
                var regex, replaceStr;
                if (err) {
                    throw (err);
                } else {
                    for (var i = 0; i < replacements.length; i++) {
                        regex = new RegExp("(\\" + replacements[i].rule + "\\s*{[^}]*" + replacements[i].target + "\\s*:\\s*)([^\\n;}]+)([\\s*;}])");
                        replaceStr = "$1" + replacements[i].replacer + "$3";
                        data = data.replace(regex, replaceStr);
                    }
                }
                fs.writeFile(filename, data, 'utf-8', function(err) {
                    if (err) {
                        throw (err);
                    } else {
                        resolve();
                    }
                });
            });
        })
    }

    if (font == "Arial" && fontSize == 11) {
        updateFile(mainCssFile, [{

        }], function(err) {
            console.log((err));
        });
    } else if (font == "Arial") {
        updateFile(mainCssFile, [{
            rule: ".made-easy-themeFontSize",
            target: "font-size",
            replacer: fontSize + "em"
        }], function(err) {
            console.log((err));
        });
    } else if (fontSize == 11) {
        updateFile(mainCssFile, [{
            rule: ".made-easy-themeFont",
            target: "font-family",
            replacer: font
        }], function(err) {
            console.log((err));
        });
    }else {
        updateFile(mainCssFile, [{
            rule: ".made-easy-themeFont",
            target: "font-family",
            replacer: font
        }, {
            rule: ".made-easy-themeFontSize",
            target: "font-size",
            replacer: fontSize + "em"
        }], function(err) {
            console.log((err));
        });

    }
});

appEditorRouter.post('/addCategory', isAuthenticated, multipartyMiddleware, function(req, res) {

    console.log(req.files);
    var updatedStatus=req.body.updateStatus;
    var path = req.files.file.path;
    var fileName = Date.now() + '_' + req.files.file.name;
    var dePath=config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/categories/';
    fs.stat(path, function(err, stat) {
        if (err == null) {
            fs.move(path, dePath + fileName, function(err) {
                if (err) return console.error(err);
                console.log("success!");
                console.log('test');
            })
        } else if (err.code == 'ENOENT') {
            fs.writeFile('log.txt', 'Some log\n');
        } else {
            console.log('Some other error: ', err.code);
        }
    });

    var applicationCategory = new ApplicationCategory(req.body);
    applicationCategory.imageUrl = fileName;
    applicationCategory.save(function(err, appProduct) {
        if (err) res.send(err);

        res.send({
            appId: appProduct,
            message: "New Category is created!!"
        });
    });
});

appEditorRouter.post('/addGooglePlayInfo', isAuthenticated, multipartyMiddleware, function(req, res) {

    var appId = req.body.appId;
    var path = req.files.file.path;
    var fileName = Date.now() + '_' + req.files.file.name;
    var dePath=   'images/'+ req.userId + '/google/' + req.body.appId+ '/';
    fs.stat(path, function(err, stat) {
        if (err == null) {
            fs.move(path, dePath + fileName, function(err) {
                if (err) return console.error(err);
                console.log("success!");
                console.log('test');
            })
        } else if (err.code == 'ENOENT') {
            fs.writeFile('log.txt', 'Some log\n');
        } else {
            console.log('Some other error: ', err.code);
        }
    });

    var data = {
        appIcon:dePath+fileName
    };
    var query = {_id:appId};
    Application.update(query,data).exec(function(err, appProduct) {
        if (err) res.send(err);
    });
    res.send('ok');
});



appEditorRouter.post('/addLogoImage', isAuthenticated, multipartyMiddleware, function(req, res) {

    var appId = req.body.appId;
    var path = req.files.file.path;
    var fileName = Date.now() + '_' + req.files.file.name;
    var dePath= config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/headertemp.jpg';
    var headerExist= config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/header.jpg';
    var headerDimensions = sizeOf(headerExist);
    console.log('test2');
    fs.stat(path, function(err, stat) {
        if (err == null) {
            fs.unlink(headerExist, function(err) {
                if (err) return console.error(err);
                console.log("success!");
                console.log('test');
            });
            //fs.unlink(dePath, function(err) {
            //    if (err) return console.error(err);
            //    console.log("success!");
            //    console.log('test');
            //});
            fs.move(path, dePath, function(err) {
                if (err) return console.error(err);
                console.log("success!");
                console.log('test');
                fs.stat(dePath, function(err, stat) {
                    if (err == null) {
                        console.log('found');
                    }
                    if (err.code == 'ENOENT') {
                        console.log('Some other error: ', err.code);
                    }
                });
                //im.resize({
                //    srcPath:dePath,
                //    dstPath: headerExist,
                //    width: 300
                //
                //}, function(err, stdout, stderr){
                //    if (err) console.log(err + 'ff');
                //    console.log('resized image to fit within ' + headerDimensions.width + ' and ' + headerDimensions.height);
                //});
            })
        } else if (err.code == 'ENOENT') {
            fs.writeFile('log.txt', 'Some log\n');
        } else {
            console.log('Some other error: ', err.code);
        }
    });

    console.log(headerDimensions.height);

    //fs.stat(dePath, function(err, stat) {
    //    if (err == null) {
    //        console.log('found');
    //    }
    //    if (err.code == 'ENOENT') {
    //        console.log('Some other error: ', err.code);
    //    }
    //});
    console.log(dePath);
    //im.identify(dePath, function(err, features){
    //    if (err) throw err;
    //    console.log(features);
    //    // { format: 'JPEG', width: 3904, height: 2622, depth: 8 }
    //});

    //var data = {
    //    appIcon:dePath+fileName
    //};
    //var query = {_id:appId};
    //Application.update(query,data).exec(function(err, appProduct) {
    //    if (err) res.send(err);
    //});
    res.send('ok');
});
/**
 * Update Category -Use in edit erea
 * */

appEditorRouter.post('/updateCategory', function(req, res) { // TODO delete category document in product collection

    if(req.body.childList){
        var childList=req.body.childList;
        for (var i = 0; i < childList.length; i++) {
            ApplicationCategory.update({_id :childList[i]._id},childList[i]).exec(function(err) {
                if (err) res.send(err);
            });
        }
        res.send('ok');

    }else{
        ApplicationCategory.update({_id :req.body._id},req.body).exec(function(err) {
            if (err) res.send(err);
            res.send('ok');
        });
    }

});
/**
 * Update Category Image
 *
 */
appEditorRouter.post('/updateCategoryImage',isAuthenticated, multipartyMiddleware, function(req, res) {

    var path = req.files.file.path;
    var filePath =config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/categories/'+ req.body.imageUrl;
    var desPath=config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/categories/';

    fs.unlink(filePath, function (err) {
        if (err) return console.error(err);
    });

    fs.stat(path, function(err, stat) {
        if (err == null) {
            fs.move(path, desPath + req.body.imageUrl , function(err) {
                if (err) return console.error(err);

                res.json({ok:true});
            })
        } else if (err.code == 'ENOENT') {
            fs.writeFile('log.txt', 'Some log\n');
        } else {
            console.log('Some other error: ', err.code);
        }
    });

});

/**
 * Check category has product.
 **/
appEditorRouter.post('/checkCategory',isAuthenticated, function(req, res) {

    var search={
        appId : req.body.appId,
        categoryId : req.body.categoryID

    };

    ApplicationProduct.find(search, function (err,product) {
        if (err) return callback("Error while deleting " + err.message);

        if(typeof product[0] != 'undefined' ){
            res.send({
                message: "Yes"
            });
        }else{

            res.send({
                message: "No"
            });
        }
    });

});

/**
 * Category Deleting
 */

appEditorRouter.post('/deleteCategory',isAuthenticated,  multipartyMiddleware, function(req, res) {

    console.log(req.body);
    ApplicationCategory.remove({ _id : req.body.categoryID}, function (err) {
        if (err) return callback("Error while deleting " + err.message);

        var filePath =config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/categories/'+ req.body.imageUrl;
        fs.unlink(filePath, function (err) {
            if (err) return console.error(err);
        });

    });

});

/**
 * Update Product Image
 *
 */

appEditorRouter.post('/updateProductImage',isAuthenticated, multipartyMiddleware, function(req, res) {

    var path = req.files.file.path;
    var filePath =config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/products/'+ req.body.imageUrl;
    var desPath=config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/products/';

    fs.unlink(filePath, function (err) {
        if (err) throw err;
    });


    fs.stat(path, function(err, stat) {
        if (err == null) {
            fs.move(path, desPath + req.body.imageUrl , function(err) {
                if (err) return console.error(err)

                res.json({ok:true});
            })
        } else if (err.code == 'ENOENT') {
            fs.writeFile('log.txt', 'Some log\n');
        } else {
            console.log('Some other error: ', err.code);
        }
    });

});

/**
 * Update Product -Use in edit erea
 * */
appEditorRouter.post('/updateProduct', function(req, res) {

    var conn = mongoose.connection;

    if(req.body.subChildList){
        var sChildList=req.body.subChildList;
        for (var i = 0; i < sChildList.length; i++) {
            ApplicationProduct.update({_id :sChildList[i]._id},sChildList[i]).exec(function(err) {
                if (err) res.send(err);
            });
        }
        res.send('ok');

    }else{
        ApplicationProduct.update({_id :req.body._id},req.body).exec(function(err) {
            if (err) res.send(err);
            res.send('ok');
        });
    }

});

/**
 * Product Deleting
 */

appEditorRouter.post('/deleteProduct',isAuthenticated,multipartyMiddleware,  function(req, res) {

    ApplicationProduct.remove({ _id : req.body.productId}, function (err) {
        if (err) return callback("Error while deleting " + err.message);

        var filePath =config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/products/'+ req.body.imageUrl;
        fs.unlink(filePath, function (err) {
            if (err) throw err;
        });
    });

});


/**
 * Contact Us Collection Update for given appId
 * If not, Create new Contact Us Collection for given appId
 */
appEditorRouter.post('/addContactUs',isAuthenticated,multipartyMiddleware,function(req,res){

    var data = req.body;
    data['updateAt'] = moment();
    var searchApp = {
        appId: req.body.appId
    };

    ApplicationContactUs.update(searchApp,data,function(err,app){
        if(app.n === 0){
            var applicationContactUs = new ApplicationContactUs(data);
            applicationContactUs.save(function(err, appContactUs) {
                if (err) res.send(err);
                res.send({
                    appId: appContactUs.appId,
                    message: "New Contact Us Record Create Success !"
                });
            });
        }else{
            res.send({
                appId: app.appId,
                message: "Contact Us Record Update Success !"
            });
        }

    });

});

/**
 * Contact Us Collection Update for given appId
 * update : address, telphone
 */
appEditorRouter.post('/addBasicInfo',isAuthenticated,multipartyMiddleware,function(req,res){

    var data = req.body;
    data['updateAt'] = moment();
    var searchApp = {
        appId: req.body.appId
    };

    ApplicationContactUs.update(searchApp,data,function(err,app){
        if(app.n === 0){
            var applicationContactUs = new ApplicationContactUs(data);
            applicationContactUs.save(function(err, appContactUs) {
                if (err) res.send(err);
                res.send({
                    appId: appContactUs.appId,


                    message: "New Contact Us Record Create Success !"
                });
            });
        }else{
            res.send({
                appId: req.body.appId,
                message: "Contact Us Record Update Success !"
            });
        }
    });
});

/**
 * Contact Us Collection Update for given appId
 * update : email, webSite
 */
appEditorRouter.post('/addWebInfo',isAuthenticated,multipartyMiddleware,function(req,res){

    var data = req.body;
    data['updateAt'] = moment();
    var searchApp = {
        appId: req.body.appId
    };

    ApplicationContactUs.update(searchApp,data,function(err,app){
        if(app.n === 0){
            var applicationContactUs = new ApplicationContactUs(data);
            applicationContactUs.save(function(err, appContactUs) {
                if (err) res.send(err);
                res.send({
                    appId: appContactUs.appId,


                    message: "New Contact Us Record Create Success !"
                });
            });
        }else{
            res.send({
                appId: req.body.appId,
                message: "Contact Us Record Update Success !"
            });
        }
    });
});

/**
 * Contact Us Collection Update for given appId
 * update : latitude, longitude
 */
appEditorRouter.post('/addGoogleMapInfo',isAuthenticated,multipartyMiddleware,function(req,res){

    var data = req.body;
    data['updateAt'] = moment();
    var searchApp = {
        appId: req.body.appId
    };

    ApplicationContactUs.update(searchApp,data,function(err,app){
        if(app.n === 0){
            var applicationContactUs = new ApplicationContactUs(data);
            applicationContactUs.save(function(err, appContactUs) {
                if (err) res.send(err);
                res.send({
                    appId: appContactUs.appId,


                    message: "New Contact Us Record Create Success !"
                });
            });
        }else{
            res.send({
                appId: req.body.appId,
                message: "Contact Us Record Update Success !"
            });
        }
    });
});

/**
 * Contact Us Collection Update for given appId
 * update : Open hours
 */
appEditorRouter.post('/addOpenHoursInfo',isAuthenticated,multipartyMiddleware,function(req,res){

    var data = req.body;
    data['updateAt'] = moment();
    var searchApp = {
        appId: req.body.appId
    };

    ApplicationContactUs.update(searchApp,data,function(err,app){
        if(app.n === 0){
            var applicationContactUs = new ApplicationContactUs(data);
            applicationContactUs.save(function(err, appContactUs) {
                if (err) res.send(err);
                res.send({
                    appId: appContactUs.appId,
                    //Application:getIdentificton.function(),
                    message: "New Contact Us Record Create Success !"
                });
            });
        }else{
            res.send({
                appId: req.body.appId,
                message: "Contact Us Record Update Success !"
            });
        }
    });
});

appEditorRouter.get('/viewTemplate', function(req, res) {
    app.use(express.static(__dirname + '/templates/pizzaHut/'));
    res.sendFile(__dirname + '/templates/pizzaHut/index.html');
    var path = 'http://localhost:8080';
    // var path = 'http://localhost:9000/#/home';

    res.writeHead(302, {
        'Location': path
    });
});
/**
 * Get  Images
 * */
appEditorRouter.get('/viewImages', function(req, res) {
    res.sendFile(config.ME_SERVER + req.query.userId + '/templates/' + req.query.appId + '/img/'+ req.query.img);
});

appEditorRouter.get('/viewImagesIn', function(req, res) {

    console.log(path.dirname(require.main.filename));
    res.sendFile(path.dirname(require.main.filename)+'/' +req.query.img);

});



appEditorRouter.post('/editUserProfile', function(req, res) {

console.log(req.body);
    var data = req.body;
    var query = {email:req.body.email};
    User.update(query,data).exec(function(err, appProduct) {
        if (err) res.send(err);
        console.log(appProduct);
    });
    res.send('ok');

});

module.exports = appEditorRouter;