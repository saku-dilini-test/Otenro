/**
 * StyleController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var sizeOf = require('image-size'),
    mkpath = require('mkpath'),
    fs = require('fs-extra'),
    config = require('../../../services/config'),
    im = require('imagemagick'),
    easyimg = require('easyimage'),
    lwip = require('lwip');

module.exports = {

    addStyles : function(req,res){

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
    },

    /**
     *  Return appSetting given appId
     */
    getAppSettings: function(req, res) {
        var appId = req.body.appId;
        var searchApp = {
            id : appId
        };
        Application.findOne(searchApp, function(err, apps) {
            if (err) return done(err);
            res.send(apps);
        });
    },

    /**
     * Update header image given appId
     */

    addHeaderImage : function(req,res){
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
    },
    /**
     * Update background image given appId
     */
    addBackgroundImage : function(req,res){
        console.log("AddBackGroundImage");
        console.log("AppId"+req.body.appId);
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
            mkpath(config.ME_SERVER + userId + '/templates/' + appId + '/img/'+ 'background.jpg', 0777, function (err) {
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

                    lwip.open(backgroundImage, function(err, image) {
                        if (err)  return res.send(500, err);

                        fs.unlink(backgroundExist, function (err) {
                            if (err)  return res.send(500, err);
                        });
                        image.resize(backgroundDimensions.width,backgroundDimensions.height, function(err, rzdImg) {
                            rzdImg.writeFile(backgroundExist, function(err) {
                                if (err)  return res.send(500, err);

                                fs.unlink(backgroundImage, function (err) {
                                    if (err)  return res.send(500, err);
                                    res.send('ok');
                                });
                            });
                        });
                    });
                });
            });
        }
    },
    ///**
    // * Update Background Color given appId
    // */
    //
    //addBackgroundColor : function(req,res){
    //    var userId = req.userId;
    //    var appId = req.body.appId;
    //    var mainCssFile = config.ME_SERVER + userId + '/templates/' + appId + '/css/main.css';
    //    var backgroundColor = req.body.backgroundColor;
    //
    //    var data = {
    //        appSettings:{
    //            color: backgroundColor
    //        }
    //    };
    //    var query = {id:appId};
    //    Application.update(query,data).exec(function(err, appProduct) {
    //        if (err) res.send(err);
    //    });
    //
    //    /**
    //     * update css file with new changes
    //     */
    //    function updateFile(filename, replacements) {
    //        return new Promise(function(resolve) {
    //            fs.readFile(filename, 'utf-8', function(err, data) {
    //                var regex, replaceStr;
    //                if (err) {
    //                    throw (err);
    //                } else {
    //                    for (var i = 0; i < replacements.length; i++) {
    //                        regex = new RegExp("(\\" + replacements[i].rule + "\\s*{[^}]*" + replacements[i].target + "\\s*:\\s*)([^\\n;}]+)([\\s*;}])");
    //                        replaceStr = "$1" + replacements[i].replacer + "$3";
    //                        data = data.replace(regex, replaceStr);
    //                    }
    //                }
    //                fs.writeFile(filename, data, 'utf-8', function(err) {
    //                    if (err) {
    //                        throw (err);
    //                    } else {
    //                        resolve();
    //                    }
    //                });
    //            });
    //        })
    //    }
    //
    //    if (backgroundColor == '#FFFFFF') {
    //        updateFile(mainCssFile, [{
    //
    //        }], function (err) {
    //            console.log((err));
    //        });
    //    }else{
    //        updateFile(mainCssFile, [{
    //            rule: ".made-easy-themeColor",
    //            target: "color",
    //            replacer: backgroundColor
    //        }], function (err) {
    //            console.log((err));
    //        });
    //    }
    //},
    /**
     * Update Background Color , Navigation Bar , Footer and Button given appId with common function
     */
    addStyleColor : function(req,res){
        var userId = req.userId;
        var appId = req.body.appId;
        var mainCssFile = config.ME_SERVER + userId + '/templates/' + appId + '/css/main.css';
        var styleColor = req.body.styleColor;
        var type = req.body.type;
        var colorTypeCss = '';

        var query = { id : appId };

        Application.findOne(query).exec(function(err, app) {
            if (err) res.send(err);
            console.log(app);
            if(type == 'backgroundColor'){
                app.appSettings.backgroundColor= styleColor;
                colorTypeCss = ".made-easy-backgroundColor";
            }else if(type == 'navigationBarColor'){
                app.appSettings.navigationBarColor= styleColor;
                colorTypeCss = ".made-easy-navigationBarColor";
            }else if(type == 'footerColor'){
                app.appSettings.footerColor =  styleColor;
                colorTypeCss = ".made-easy-footerColor";
            }else if(type == 'buttonColor'){
                app.appSettings.buttonColor = styleColor  ;
                colorTypeCss = ".made-easy-button-setting";
            }

            Application.update(query,app).exec(function(err, appUpdate) {
                if (err) res.send(err);

                updateFile(mainCssFile, [{
                    rule: colorTypeCss,
                    target: "background-color",
                    replacer: styleColor
                }],function (err) {
                    console.log((err));
                });
                res.send(appUpdate);

            });

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
                        console.log("Test")
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



    },

    /**
     * Update header, content , footer and button font family given appId with common function
     */
    addStyleFontFamily : function(req,res){
        var userId = req.userId;
        var appId = req.body.appId;
        var mainCssFile = config.ME_SERVER + userId + '/templates/' + appId + '/css/main.css';
        var styleFontFamily = req.body.styleFontFamily;
        var type = req.body.type;
        var fontFamilyCss = '';


        var query = {id:appId};

        Application.findOne(query).exec(function(err, app) {
            if (err) res.send(err);

            if(type == 'headerFont'){
                app.appSettings.headerFontFamily = styleFontFamily;
                fontFamilyCss = ".made-easy-header-font";
            }else if(type == 'contentFont'){
                app.appSettings.contentFontFamily = styleFontFamily;
                fontFamilyCss = ".made-easy-content-font";
            }else if(type == 'footerFont'){
                app.appSettings.footerFontFamily = styleFontFamily;
                fontFamilyCss = ".made-easy-footer-font";
            }else if(type == 'buttonFont'){
                app.appSettings.buttonFontFamily = styleFontFamily;
                fontFamilyCss = ".made-easy-button-setting";
            }

            Application.update(query,app).exec(function(err, appUpdate) {
                if (err) res.send(err);

                updateFile(mainCssFile, [{
                    rule: fontFamilyCss,
                    target: "font-family",
                    replacer: styleFontFamily
                }], function (err) {
                    console.log((err));
                });

                res.send(appUpdate);
            });

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

    },
    /**
     * Update header, content and footer font Size given appId with common function
     */
    addStyleFontSize : function(req,res){
        var userId = req.userId;
        var appId = req.body.appId;
        var mainCssFile = config.ME_SERVER + userId + '/templates/' + appId + '/css/main.css';
        var styleFontSize = req.body.styleFontSize;
        var type = req.body.type;
        var data = {};
        var fontSizeCss = '';

        var query = {id:appId};

        Application.findOne(query).exec(function(err, app) {
            if (err) res.send(err);

            if(type == 'headerFont'){
                app.appSettings.headerFontSize = styleFontSize;
                fontSizeCss = ".made-easy-header-font";
            }else if(type == 'contentFont'){
                app.appSettings.contentFontSize= styleFontSize;
                fontSizeCss = ".made-easy-content-font";
            }else if(type == 'footerFont'){
                app.appSettings.footerFontSize = styleFontSize;
                fontSizeCss = ".made-easy-footer-font";
            }

            Application.update(query,app).exec(function(err, appUpdate) {
                if (err) res.send(err);
                    updateFile(mainCssFile, [{
                        rule: fontSizeCss,
                        target: "font-size",
                        replacer: styleFontSize
                    }], function (err) {
                        console.log((err));
                    });
                res.send(appUpdate);
            });

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

    },

    /**
     * Update header, content and footer font Weight given appId with common function
     */
    addStyleFontWeight : function(req,res){
        var userId = req.userId;
        var appId = req.body.appId;
        var mainCssFile = config.ME_SERVER + userId + '/templates/' + appId + '/css/main.css';
        var styleFontWeight = req.body.styleFontWeight;
        var type = req.body.type;
        var fontWeightCss = '';

        var query = {id:appId};

        Application.findOne(query).exec(function(err, app) {
            if (err) res.send(err);

            if(type == 'headerFont'){
                app.appSettings.headerFontWeight = styleFontWeight;
                fontWeightCss = ".made-easy-header-font";
            }else if(type == 'contentFont'){
                app.appSettings.contentFontWeight = styleFontWeight;
                fontWeightCss = ".made-easy-content-font";
            }else if(type == 'footerFont'){
                app.appSettings.footerFontWeight = styleFontWeight;
                fontWeightCss = ".made-easy-footer-font";
            }

            Application.update(query,app).exec(function(err, appUpdate) {
                if (err) res.send(err);

                updateFile(mainCssFile, [{
                    rule: fontWeightCss,
                    target: "font-weight",
                    replacer: styleFontWeight
                }], function (err) {
                    console.log((err));
                });

                res.send(appUpdate);
            });

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

    },

    /**
     * Update button border width function
     */
    addStyleButtonBorderWidth : function(req,res){
        var userId = req.userId;
        var appId = req.body.appId;
        var mainCssFile = config.ME_SERVER + userId + '/templates/' + appId + '/css/main.css';
        var buttonBorderWidth = req.body.styleButtonBorderWidth;
        var buttonBorderWidthCss = '.made-easy-button-setting';

        var query = {id:appId};

        Application.findOne(query).exec(function(err, app) {
            if (err) res.send(err);
            app.appSettings.buttonBorderWidth = buttonBorderWidth;
            Application.update(query, app).exec(function (err, appUpdate) {
                if (err) res.send(err);

                updateFile(mainCssFile, [{
                    rule: buttonBorderWidthCss,
                    target: "border-width",
                    replacer: buttonBorderWidth
                }], function (err) {
                    console.log((err));
                });

                res.send(appUpdate);
            });

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

    },

    /**
     * Update button border Radius function
     */
    addStyleButtonBorderRadius : function(req,res){
        console.log(req.body);
        var userId = req.userId;
        var appId = req.body.appId;
        var mainCssFile = config.ME_SERVER + userId + '/templates/' + appId + '/css/main.css';
        var buttonBorderRadius = req.body.styleButtonBorderRadius;
        var buttonBorderRadiusCss = '.made-easy-button-setting';

        var query = {id:appId};

        Application.findOne(query).exec(function(err, app) {
            if (err) res.send(err);
            app.appSettings.buttonBorderRadius = buttonBorderRadius;
            Application.update(query, app).exec(function (err, appUpdate) {
                if (err) res.send(err);

                updateFile(mainCssFile, [{
                    rule: buttonBorderRadiusCss,
                    target: "border-radius",
                    replacer: buttonBorderRadius
                }], function (err) {
                    console.log((err));
                });

                res.send(appUpdate);
            });

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

    },
    /**
     * Update Fonts given appId
     */

    addFonts : function(req,res){
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
        var query = {id:appId};
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
    },

    addLogoImage: function(req,res) {


        var dePath = config.ME_SERVER + req.userId + '/templates/' + req.body.appId + '/img/';
        var headerExist = config.ME_SERVER + req.userId + '/templates/' + req.body.appId + '/img/header.jpg';
        var headerDimensions = sizeOf(headerExist);

        console.log(headerDimensions);

        req.file('file').upload({
            dirname: require('path').resolve(dePath)
        },function (err, uploadedFiles) {
            if (err) return res.send(500, err);

            fs.rename(uploadedFiles[0].fd,dePath+'headertemp.jpg', function (err) {
                if (err) return res.send(err);

                lwip.open(dePath+'headertemp.jpg', function(err, image) {
                    if (err) return res.send(500, err);

                    fs.unlink(headerExist, function (err) {
                        if (err) return console.error(err);

                        image.resize(headerDimensions.width,headerDimensions.height, function(err, rzdImg) {
                            rzdImg.writeFile(headerExist, function(err) {
                                if (err) return res.send(500, err);

                                fs.unlink(dePath+'headertemp.jpg', function (err) {
                                    if (err) return res.send(500, err);
                                    res.send('ok');
                                });
                            });
                        });
                    });
                });
            });
        });
    }
};
