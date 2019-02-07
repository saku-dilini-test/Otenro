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
    easyimg = require('easyimage')
    /*lwip = require('lwip');*/

module.exports = {

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
     * Apply background image for given appId
     * @param req
     * @param res
     */
    applyBackgroundImage : function(req,res){
        var userId = req.userId;
        var appId = req.body.appId;
        var mainCssFile = config.ME_SERVER + userId + '/progressiveTemplates/' + appId + '/assets/main.css';
        var isApplyBGImage = req.body.isApplyBGImage;
        var findQuery = { id : appId };

        Application.findOne(findQuery).exec(function(err, app) {
            if (err) res.send(err);

            app.appSettings.isApplyBGImage = isApplyBGImage;
            Application.update(findQuery,app).exec(function(err, appUpdate) {
                if (err) return res.send(err);

                if(isApplyBGImage == true){
                    updateFile(mainCssFile, [{
                        rule: 'made-easy-background-image',
                        target: "background",
                        replacer: "url(assets/images/background.png)"
                    }], function (err) {
                        sails.log.info((err));
                    });
                }else{
                    updateFile(mainCssFile, [{
                        rule: 'made-easy-background-image',
                        target: "background",
                        replacer: 'null'
                    }], function (err) {
                        sails.log.info((err));
                    });
                }
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
     * Update background image given appId
     */
    addBackgroundImage : function(req,res){

        sails.log.info("addBackgroundImage running ");
        var userId = req.userId;
        var appId = req.body.appId;
        var backImg = req.body.backgroundImg;
        var data = backImg;
        var backgroundExist = config.APP_FILE_SERVER + userId + '/progressiveTemplates/' + appId + '/assets/images/'+ 'background.png';
        var backgroundDimensions = sizeOf(backgroundExist);


        var data = backImg.replace(/^data:image\/\w+;base64,/, "");
        var buf = new Buffer(data, 'base64');
        // product images copy to app file server
        fs.writeFile(config.APP_FILE_SERVER + userId + '/progressiveTemplates/' + appId + '/assets/images/'+ 'background.png', buf, function(err) {
            if(err) {
                if (err) res.send(err);
            }
            res.send('ok');
        });



    },

    /**
     * Update Background Color , Navigation Bar , Footer and Button given appId with common function
     * also Update Header , Content & Footer Color given appId also integrated
     */
    addWebStyleColor : function(req,res){
        var userId = req.body.userId;
        var appId = req.body.appId;
        var mainCssFile = config.ME_SERVER + userId + '/progressiveTemplates/' + appId + '/assets/main.css';
        var styleColor = req.body.styleColor;
        var type = req.body.type;
        var colorTypeCss = '';

         var query = { id : appId };

         Application.findOne(query).exec(function(err, app) {
             if (err) res.send(err);

            // here update background-color in Css class
            if(type == 'backgroundColor'){
                 app.appSettings.backgroundColor= styleColor;
                colorTypeCss = ".main-background";
            }else if(type == 'navigationBarColor'){
                 app.appSettings.navigationBarColor= styleColor;
                colorTypeCss = ".main-navigation";
            }else if(type == 'footerColor'){
                 app.appSettings.footerColor =  styleColor;
                colorTypeCss = ".made-easy-footerColor";
            }else if(type == 'buttonColor'){
                 app.appSettings.buttonColor = styleColor  ;
                colorTypeCss = ".main-button";
            }
            // here to update button border color
            else if(type == 'buttonBorderColor'){
                 app.appSettings.buttonBorderColor = styleColor  ;
                colorTypeCss = ".main-button";
            }
            // here update color in Css class
            else if(type == 'navigationBarFontColor') {
                 app.appSettings.navigationBarFontColor = styleColor;
                colorTypeCss = ".main-navigation";
            }
            else if(type == 'buttonFontColor') {
                 app.appSettings.buttonFontColor = styleColor;
                colorTypeCss = ".main-button";
            }
            else if(type == 'headerFontColor') {
                 app.appSettings.headerFontColor = styleColor;
                colorTypeCss = ".main-header-font";
            }
            else if(type == 'contentFontColor') {
                 app.appSettings.contentFontColor = styleColor;
                colorTypeCss = ".main-content-font";
            }
            else if(type == 'footerBackColor') {
                 app.appSettings.footerColor = styleColor;
                colorTypeCss = ".main-footer-back";
            }
            else if(type == 'footerFontColor') {
                 app.appSettings.footerFontColor = styleColor;
                colorTypeCss = ".main-footer-font";
            }
            else if(type == 'footerHeaderFontColor') {
                 app.appSettings.footerHeaderFontColor = styleColor;
                colorTypeCss = ".main-footer-header";
            }

            //Has to delete the id else there will be an error
            delete app.id;

             Application.update(query,app).exec(function(err, appUpdate) {
                if (err) 
                {
                    sails.log.error('webStyleController: Error when updating Application.Err: ', err);
                    return res.send(err);
                }

                // here update color in Css class
                if(type == 'buttonFontColor' || type == 'navigationBarFontColor' || type == 'headerFontColor' || type == 'contentFontColor' || type == 'footerFontColor' || type == 'footerHeaderFontColor'){
                    updateFile(mainCssFile, [{
                        rule: colorTypeCss,
                        target: "color",
                        replacer: styleColor+ " "+"!important"
                    }], function (err) {
                        sails.log.info((err));
                    });

                }// here update border-color in Css class
                else if(type == 'buttonBorderColor'){
                    updateFile(mainCssFile, [{
                        rule: colorTypeCss,
                        target: "border-color",
                        replacer: styleColor + " "+"!important"
                    }], function (err) {
                        sails.log.info((err));
                    });

                }else
                // here update background-color in Css class
                {
                    updateFile(mainCssFile, [{
                        rule: colorTypeCss,
                        target: "background-color",
                        replacer: styleColor + " "+"!important"
                    }], function (err) {
                        sails.log.info((err));
                    });
                }
                res.send("success");

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
                        sails.log.info("Test")
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
    addWebStyleFontFamily : function(req,res){
        var userId = req.body.userId;
        var appId = req.body.appId;
        var mainCssFile = config.ME_SERVER + userId + '/progressiveTemplates/' + appId + '/assets/main.css';
        var styleFontFamily = req.body.styleFontFamily;
        var type = req.body.type;
        var fontFamilyCss = '';
        var data = req.body;

        console.log("req.data :  " + JSON.stringify(data))

        // var query = {id:appId};
        //
        // Application.findOne(query).exec(function(err, app) {
        //     if (err) res.send(err);

            if(type == 'headerFont'){
                // app.appSettings.headerFontFamily = styleFontFamily;
                fontFamilyCss = ".main-header-font";

                updateFile(mainCssFile, [{
                    rule: fontFamilyCss,
                    target: "font-family",
                    replacer: styleFontFamily
                }], function (err) {
                    sails.log.info((err));
                });

                res.send("success");
            }else if(type == 'contentFont'){
                // app.appSettings.contentFontFamily = styleFontFamily;
                fontFamilyCss = ".main-content-font";

                updateFile(mainCssFile, [{
                    rule: fontFamilyCss,
                    target: "font-family",
                    replacer: styleFontFamily
                }], function (err) {
                    sails.log.info((err));
                });

                res.send("success");
            }else if(type == 'footerFont'){
                // app.appSettings.footerFontFamily = styleFontFamily;
                fontFamilyCss = ".made-easy-footer-font";
            }else if(type == 'buttonFont'){
                // app.appSettings.buttonFontFamily = styleFontFamily;
                fontFamilyCss = ".made-easy-button-setting";
            }

            // Application.update(query,app).exec(function(err, appUpdate) {
            //     if (err) res.send(err);


            // });

        // });

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
    addWebStyleFontSize : function(req,res){
        var userId = req.body.userId;
        var appId = req.body.appId;
        var mainCssFile = config.ME_SERVER + userId + '/progressiveTemplates/' + appId + '/assets/main.css';
        var styleFontSize = req.body.styleFontSize;
        var type = req.body.type;
        var data = {};
        var fontSizeCss = '';

        // var query = {id:appId};
        //
        // Application.findOne(query).exec(function(err, app) {
        //     if (err) res.send(err);

            if(type == 'headerFont'){
                // app.appSettings.headerFontSize = styleFontSize;
                fontSizeCss = ".main-header-font";

                updateFile(mainCssFile, [{
                    rule: fontSizeCss,
                    target: "font-size",
                    replacer: styleFontSize +'vh'
                }], function (err) {
                    sails.log.info((err));
                });
                res.send("success");

            }else if(type == 'contentFont'){
                // app.appSettings.contentFontSize= styleFontSize;
                fontSizeCss = ".main-content-font";

                updateFile(mainCssFile, [{
                    rule: fontSizeCss,
                    target: "font-size",
                    replacer: styleFontSize +'vh'
                }], function (err) {
                    sails.log.info((err));
                });
                res.send("success");

            }else if(type == 'footerFont'){
                // app.appSettings.footerFontSize = styleFontSize;
                fontSizeCss = ".made-easy-footer-font"

                updateFile(mainCssFile, [{
                    rule: fontSizeCss,
                    target: "font-size",
                    replacer: styleFontSize +'vh'
                }], function (err) {
                    sails.log.info((err));
                });
                res.send("success");
            }

            // Application.update(query,app).exec(function(err, appUpdate) {
            //     if (err) res.send(err);
            //         updateFile(mainCssFile, [{
            //             rule: fontSizeCss,
            //             target: "font-size",
            //             replacer: styleFontSize +'vh'
            //         }], function (err) {
            //             sails.log.info((err));
            //         });
            //     res.send(appUpdate);
            // });

        // });


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
    addWebStyleFontWeight : function(req,res){
        var userId = req.body.userId;
        var appId = req.body.appId;
        var mainCssFile = config.ME_SERVER + userId + '/progressiveTemplates/' + appId + '/assets/main.css';
        var styleFontWeight = req.body.styleFontWeight;
        var type = req.body.type;
        var fontWeightCss = '';

        // var query = {id:appId};
        //
        // Application.findOne(query).exec(function(err, app) {
        //     if (err) res.send(err);

            if(type == 'headerFont'){
                // app.appSettings.headerFontWeight = styleFontWeight;
                fontWeightCss = ".main-header-font";

                updateFile(mainCssFile, [{
                    rule: fontWeightCss,
                    target: "font-weight",
                    replacer: styleFontWeight
                }], function (err) {
                    sails.log.info((err));
                });

                res.send("success");

            }else if(type == 'contentFont'){
                // app.appSettings.contentFontWeight = styleFontWeight;
                fontWeightCss = ".main-content-font";

                updateFile(mainCssFile, [{
                    rule: fontWeightCss,
                    target: "font-weight",
                    replacer: styleFontWeight
                }], function (err) {
                    sails.log.info((err));
                });

                res.send("success");

            }else if(type == 'footerFont'){
                // app.appSettings.footerFontWeight = styleFontWeight;
                fontWeightCss = ".made-easy-footer-font";
            }

            // Application.update(query,app).exec(function(err, appUpdate) {
            //     if (err) res.send(err);



            // });

        // });
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
    addWebStyleButtonBorderWidth : function(req,res){
        var userId = req.body.userId;
        var appId = req.body.appId;
        var mainCssFile = config.ME_SERVER + userId + '/progressiveTemplates/' + appId + '/assets/main.css';
        var buttonBorderWidth = req.body.styleButtonBorderWidth;
        var buttonBorderWidthCss = '.main-button';

        // var query = {id:appId};
        //
        // Application.findOne(query).exec(function(err, app) {
        //     if (err) res.send(err);
        //     app.appSettings.buttonBorderWidth = buttonBorderWidth;
        //     Application.update(query, app).exec(function (err, appUpdate) {
        //         if (err) res.send(err);

                updateFile(mainCssFile, [{
                    rule: buttonBorderWidthCss,
                    target: "border-width",
                    replacer: buttonBorderWidth +" "+"!important"
                }], function (err) {
                    sails.log.info((err));
                });

                res.send("success");
            // });

        // });

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
    addWebStyleButtonBorderRadius : function(req,res){
        sails.log.info(req.body);
        var userId = req.body.userId;
        var appId = req.body.appId;
        var mainCssFile = config.ME_SERVER + userId + '/progressiveTemplates/' + appId + '/assets/main.css';
        var buttonBorderRadius = req.body.styleButtonBorderRadius;
        var buttonBorderRadiusCss = '.main-button';

        // var query = {id:appId};
        //
        // Application.findOne(query).exec(function(err, app) {
        //     if (err) res.send(err);
        //     app.appSettings.buttonBorderRadius = buttonBorderRadius;
        //     Application.update(query, app).exec(function (err, appUpdate) {
        //         if (err) res.send(err);

                updateFile(mainCssFile, [{
                    rule: buttonBorderRadiusCss,
                    target: "border-radius",
                    replacer: buttonBorderRadius
                }], function (err) {
                    sails.log.info((err));
                });

                res.send("success");
            // });

        // });


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
                sails.log.info((err));
            });
        } else if (font == "Arial") {
            updateFile(mainCssFile, [{
                rule: ".made-easy-themeFontSize",
                target: "font-size",
                replacer: fontSize + "em"
            }], function(err) {
                sails.log.info((err));
            });
        } else if (fontSize == 11) {
            updateFile(mainCssFile, [{
                rule: ".made-easy-themeFont",
                target: "font-family",
                replacer: font
            }], function(err) {
                sails.log.info((err));
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
                sails.log.info((err));
            });

        }
    },

    /*addLogoImage: function(req,res) {


        var dePath = config.ME_SERVER + req.userId + '/templates/' + req.body.appId + '/img/';
        var headerExist = config.ME_SERVER + req.userId + '/templates/' + req.body.appId + '/img/header.jpg';
        var headerDimensions = sizeOf(headerExist);

        sails.log.info(headerDimensions);

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
    }*/
};
