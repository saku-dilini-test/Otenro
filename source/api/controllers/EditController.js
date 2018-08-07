/**
 * TemplateController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs-extra'),
     gracefulFs = require('graceful-fs'),
    config = require('../services/config'),
    xml2js = require('xml2js'),
    zipFolder = require('zip-folder');

gracefulFs.gracefulify(fs);
var rimraf = require('rimraf');


module.exports = {

    designApps : function(req,res){
        Template.find().exec(function(err, template) {
            if (err) res.send(err);
            res.send(template);
        });

    },

    getSelectedApp : function(req,res){
        var appId = req.param('appId');
        var searchApp = {
            id: appId
        };
        Application.findOne(searchApp).exec(function (err, app) {
            if (err) return res.negotiate(err);
            res.json(app);
        });
    },

    deleteSelectedApp : function(req,res){

        var appId = req.param('appId');
        var tempNew = req.param('isNew');
        var searchApp = {
            id: appId
        };
        Application.findOne(searchApp).exec(function (err, app) {
            if (err) return res.negotiate(err);
            else {
                if (app.status=='DRAFT'){
                    Application.destroy(searchApp).exec(function (err, app) {
                        if (err) return res.negotiate(err);

                        var resourcesPath  = [];
                        var applicationPath;
                        var appPath;
                        if(tempNew == 'true'){
                            applicationPath= config.APP_FILE_SERVER + req.param('userId') + '/progressiveTemplates/' + appId;
                            appPath= config.ME_SERVER+ req.param('userId') + '/progressiveTemplates/' + appId;

                        }else{
                            applicationPath= config.APP_FILE_SERVER + req.param('userId') + '/templates/' + appId + '/';
                            appPath= config.ME_SERVER+ req.param('userId') + '/templates/' + appId + '/';
                        }
                        resourcesPath.push(applicationPath);
                        resourcesPath.push(appPath);

                        resourcesPath.forEach(function(path){
                        console.log(path)
                            fs.stat(path, function (err, fileStat) {
                                if (err) {
                                    if (err.code == 'ENOENT') {
                                        sails.log.info('Does not exist.');
                                    }
                                } else {
//                                    if (fileStat.isFile()) {
                                   rimraf(path, function () {
                                       console.log('done');
                                   });

                            //     } else if (fileStat.isDirectory()) {
//                                        sails.log.info('Directory found.');
//                                    }
                                }
                            });
                        });

                        Slider.destroy({'appId': req.param('appId')}).exec(function (err, slider){
                             if (err) return res.negotiate(err);
                        });

                        ThirdNavigation.destroy({'appId': req.param('appId')}).exec(function (err, thirdNavi){
                            if(err) return res.negotiate(err);
                        });

                        SecondNavigation.destroy({'appId': req.param('appId')}).exec(function (err, thirdNavi){
                            if(err) return res.negotiate(err);
                        });

                        res.json(app);
                    });
                }else {
                    res.json({massage:"can not delete"});
                }
            }



        });

    },

    deleteDefaultData : function(req,res){
        var appId = req.param('appId');
        var isNew = req.param('isNew');
        var userId = req.param('userId');
        var searchApp = {
            appId: appId,
            enteredBy:'demo'
        };

        var secondNaviPath = config.APP_FILE_SERVER + userId + "/progressiveTemplates/" + appId + '/src/assets/images/secondNavi/';
        var thirdNaviPath = config.APP_FILE_SERVER + userId + "/progressiveTemplates/" + appId + '/src/assets/images/thirdNavi/';
        var sliderPath = config.APP_FILE_SERVER + userId + "/progressiveTemplates/" + appId + '/src/assets/images/slider/';

        console.log(searchApp);

        sails.log.info(searchApp);
        MainCategory.destroy(searchApp).exec(function (err, app) {

            var data = app;

            if (err) {return res.negotiate(err);}
            else {
              data.forEach(function(sec){
                    fs.unlink(secondNaviPath + sec.imageUrl, function (err) {
                        if (err) return console.error(err);
                    });
                });

                ThirdNavigation.destroy(searchApp).exec(function (err, app) {
                    if (err) return res.negotiate(err);

                    app.forEach(function(third){
                        fs.unlink(thirdNaviPath + third.imageUrl, function (err) {
                            if (err) return console.error(err);
                        });
                    });

                });
            }
        });

        if(isNew == 'true'){
             Slider.destroy({'appId': appId}).exec(function (err, slider){
                    if (err) return res.negotiate(err);

                    slider.forEach(function(slider){
                        fs.unlink(sliderPath + slider.imageUrl, function (err) {
                            if (err) return console.error(err);
                        });
                    });
             });
        }

        ArticleCategory.destroy(searchApp).exec(function (err, app) {
            if (err) {return res.negotiate(err);}
            else {
                Article.destroy(searchApp).exec(function (err, app) {
                    if (err) return res.negotiate(err);
                    else {

                    }
                });
            }
        });
        res.send({
            appId: appId,
            message: "All data Removed"
        });

    },
        deleteDefaultSliderData : function(req,res){
            var appId = req.param('appId');
            var searchApp = {
                appId: appId,
                enteredBy:'demo'
            };
            sails.log.info(searchApp);

                 Slider.destroy({'appId': appId}).exec(function (err, slider){
                        if (err) return res.negotiate(err);
                 });


            res.send({
                appId: appId,
                message: "All data Removed"
            });

        },

    viewImages : function(req,res){
        res.sendfile(config.ME_SERVER + req.param('userId') + '/templates/' + req.param('appId') + '/img/'+ req.param('img'));
    },

    /**
     * Build the android source for mobile app
     * @param req
     * @param res
     */
    buildSource : function(req,res){
        var userId = req.param('userId'),
            appId = req.param('appId'),
            copyDirPath = config.ME_SERVER + userId + '/build/' + appId + '/',
            wwwPath = copyDirPath + 'www/',
            moveConfigFile = copyDirPath + 'config.xml',
            selectedTemplatePath = config.ME_SERVER + userId + '/templates/' + appId +'/',
            configFile = copyDirPath + 'www/config.xml',
            appIconFile = copyDirPath + 'www/res/android/icon/icon.jpg',
            srcPath = sails.config.appPath + '/api/src/hybrid/',
            appIconFileRES = config.APP_FILE_SERVER + userId + '/templates/' + appId + '/' + 'img/publish/0.png',
            appIconFileDES = copyDirPath + 'resources' + '/' + 'icon.png',
            indexPath = selectedTemplatePath + 'index.html';

        fs.readFile(indexPath,'utf8', function (err, data) {
            if(err){
                sails.log.info(err);
            }
            else{
                var result = data.replace(/<!-- cordova.js -->/g, '<script src="cordova.js"></script>')
                    .replace(/<!-- cdv-plugin-paypal-mobile-sdk -->/g, '<script src="lib/cdv-plugin-paypal-mobile-sdk.js"></script>');

                fs.writeFile(indexPath, result, function (err) {
                    if(err){
                        sails.log.info(err);
                    }
                    else{
                        sails.log.info('writing to ' + indexPath);
                    }
                })
            }
        });

        fs.readFile(moveConfigFile, 'utf-8',
            function(err, data) {

                if(!data || err ){
                    fs.copy(srcPath, copyDirPath, function (err) {
                        if (err) return res.negotiate(err);
                        //Success
                        var packageJsonFile = copyDirPath + 'package.json',
                            jsonFile = require(packageJsonFile);
                        IPGDetails.findOne({appId:appId}).exec(function(err,stripe){
                            if(err){
                                sails.log.info(err);
                            }
                            else{
                                if(stripe !== undefined){
                                    if(stripe.stripeEnable == true){
                                        if(stripe.stripeKey){
                                            fs.readFile(packageJsonFile, function (err, data) {
                                                if(err){
                                                    sails.log.info(err);
                                                }
                                                else{
                                                    var json = JSON.parse(data);
                                                    jsonFile.cordovaPlugins[6].variables.API_KEY = stripe.stripeKey;
                                                    fs.writeFile(packageJsonFile, JSON.stringify(jsonFile,null, 2), function (err) {
                                                        if(err){
                                                            sails.log.info(err);
                                                        }
                                                        else{
                                                            sails.log.info(JSON.stringify(jsonFile,null, 2));
                                                            sails.log.info('writing to ' + packageJsonFile);
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    }
                                }
                            }
                        })
                        var removeDirArray = ['www'];
                        for (var i = 0; i < removeDirArray.length; i++) {
                            var removeDirPath = copyDirPath + removeDirArray[i] + '/';
                            fs.remove(removeDirPath, function (err) {
                                if (err) return res.negotiate(err);

                                //Success
                                fs.copy(selectedTemplatePath, wwwPath, function (err) {
                                    if (err) return res.negotiate(err);

                                    var searchApp = {
                                        id: appId
                                    };
                                    Application.findOne(searchApp).exec(function (err, app) {
                                        if (err) return res.negotiate(err);
                                        replaceAppNameNIcon(app.appName, appIconFileRES);
                                    });


                                });
                            })
                        }
                    });

                }
                else{
                    var parser = new xml2js.Parser(),
                        xmlBuilder = new xml2js.Builder();

                    fs.readFile(moveConfigFile, 'utf-8',
                        function(err, data) {
                            if (err) return res.negotiate(err);

                            parser.parseString(data, function (err, result) {

                                var preVersion=result.widget['$'].version;
                                var version=increaseVersion(preVersion);
                                result.widget['$'].version=version;
                                var xml = xmlBuilder.buildObject(result);

                                fs.writeFile(moveConfigFile, xml,'utf-8', function(err) {
                                    if (err) return res.negotiate(err);
                                });

                                var packageJsonFile = copyDirPath + 'package.json',
                                    jsonFile = require(packageJsonFile);
                                IPGDetails.findOne({appId:appId}).exec(function(err,stripe){
                                    if(err){
                                        sails.log.info(err);
                                    }
                                    else{
                                        if(stripe !== undefined){
                                            if(stripe.stripeEnable == true){
                                                if(stripe.stripeKey){
                                                    fs.readFile(packageJsonFile, function (err, data) {
                                                        if(err){
                                                            sails.log.info(err);
                                                        }
                                                        else{
                                                            var json = JSON.parse(data);
                                                            jsonFile.cordovaPlugins[6].variables.API_KEY = stripe.stripeKey;
                                                            fs.writeFile(packageJsonFile, JSON.stringify(jsonFile,null, 2), function (err) {
                                                                if(err){
                                                                    sails.log.info(err);
                                                                }
                                                                else{
                                                                    sails.log.info('writing to ' + packageJsonFile);
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            }
                                        }
                                    }
                                })

                                var searchApp = {
                                    id: appId
                                };
                                Application.findOne(searchApp).exec(function (err, app) {
                                    if (err) return res.negotiate(err);
                                    BuildVersion.create({
                                        appId: appId,
                                        previousVersion: preVersion,
                                        version : version
                                    }).exec(function(err,build){
                                        if (err) return res.negotiate(err);
                                        if(build) {
                                            buildApkFile(copyDirPath,app.appName);
                                        }
                                    });
                                });


                            });
                        });

                    fs.copy(selectedTemplatePath, wwwPath, function (err) {
                        if (err) return res.negotiate(err);

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
                        return res.negotiate(err);
                    }

                    parser.parseString(data, function (err, result) {

                        result.widget.name=appName;
                        var xml = xmlBuilder.buildObject(result);

                        fs.writeFile(configFile, xml,'utf-8', function(err) {

                            if (err) return res.negotiate(err);
                        });

                        fs.writeFile(moveConfigFile, xml,'utf-8', function(err) {

                            if (err) return res.negotiate(err);
                        });

                        fs.unlink(configFile, function (err) {
                            if (err) return res.negotiate(err);
                        });

                        fs.copy(icon, appIconFileDES, 'base64', function(err) {
                            if (err) return res.negotiate(err);
                        });

                        BuildVersion.create({
                            appId: appId,
                            previousVersion:result.widget['$'].version,
                            version : result.widget['$'].version
                        }).exec(function(err,build){
                            if (err) return res.negotiate(err);
                            if(build) {
                                buildApkFile(copyDirPath,appName);
                            }
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


        function buildApkFile(appPath,appName) {
            var shell = require('shelljs');
            var path = require('path');
            var mime = require('mime');

            shell.cd(appPath);
            shell.exec('ionic resources', {async: true}, function (code, stdout, stderr) {

                if (code == 0) {

                    shell.exec('ionic build android', {async: true}, function (code, stdout, stderr) {

                        if (code == 0) {
                            /*shell.exec('cordova plugin rm cordova-plugin-console', {async: true}, function (code1, stdout, stderr) {
                             if (code1==0){*/
                            shell.exec('cordova build --release android', {async: true}, function (code2, stdout, stderr) {

                                if (code2 == 0) {
                                    shell.mv('-n', 'my-release-key.keystore', appPath + '/platforms/android/build/outputs/apk/');
                                    shell.cd(appPath + '/platforms/android/build/outputs/apk/');
                                    shell.exec('jarsigner -verbose -sigalg SHA1withRSA -digestalg ' +
                                        'SHA1 -keystore my-release-key.keystore android-release-unsigned.apk ' +
                                        'alias_name -storepass abcd1234 -keypass abcd1234 ', {async: true}, function (code4, stdout, stderr) {
                                        if (code4 == 0) {

                                            fs.stat(appPath + '/platforms/android/build/outputs/apk/' + appName.replace(/\s/g, '') + '.apk', function (err, fileStat) {
                                                if (err) {
                                                    if (err.code == 'ENOENT') {
                                                        sails.log.info('Does not exist.');
                                                    }
                                                } else {
                                                    if (fileStat.isFile()) {
                                                        fs.unlinkSync(appPath + '/platforms/android/build/outputs/apk/' + appName.replace(/\s/g, '') + '.apk');
                                                    } else if (fileStat.isDirectory()) {
                                                        sails.log.info('Directory found.');
                                                    }
                                                }
                                            });
                                            shell.exec('/opt/android-sdk-linux/build-tools/23.0.1/zipalign -v 4 android-release-unsigned.apk ' + appName.replace(/\s/g, '') + '.apk', {async: true}, function (code5, stdout, stderr) {
                                                if (code5 == 0) {

                                                    var file = appPath + 'platforms/android/build/outputs/apk/' + appName.replace(/\s/g, '') + '.apk';
                                                    var resourcesPath = config.APP_FILE_SERVER + userId + '/templates/' +
                                                        appId + '/img/publish/';
                                                    var publishPath = config.ME_SERVER + userId + '/build/' + appId + '/publish';
                                                    var zipFile = config.ME_SERVER + userId + '/build/' + appId + '/publish_' + appId + '.zip';

                                                    fs.stat(zipFile, function (err, fileStat) {
                                                        if (err) {
                                                            if (err.code == 'ENOENT') {
                                                                sails.log.info('Does not exist.');
                                                            }
                                                        } else {
                                                            if (fileStat.isFile()) {
                                                                fs.unlinkSync(zipFile);
                                                            } else if (fileStat.isDirectory()) {
                                                                sails.log.info('Directory found.');
                                                            }
                                                        }
                                                    });
                                                    fs.copy(resourcesPath, publishPath, function (err) {
                                                        if (err) {
                                                            throw err;
                                                        } else {
                                                            fs.copy(file, publishPath + "/" + appName.replace(/\s/g, '') + '.apk', function (err) {
                                                                if (err) {
                                                                    throw err;
                                                                } else {
                                                                    zipFolder(publishPath, zipFile, function (err) {
                                                                        if (err) {
                                                                            sails.log.info('oh no!', err);
                                                                        } else {

                                                                            var searchAppData = {
                                                                                id: appId
                                                                            }

                                                                            Application.update(searchAppData, {status: "UPLOADING"}).exec(function (err, app) {
                                                                                if (err) res.send(err);
                                                                                else {
                                                                                    var filename = path.basename(zipFile);
                                                                                    var mimetype = mime.lookup(zipFile);

                                                                                    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
                                                                                    res.setHeader('Content-type', mimetype);

                                                                                    var filestream = fs.createReadStream(zipFile);

                                                                                    filestream.pipe(res);
                                                                                    sails.log.info('EXCELLENT');
                                                                                }
                                                                            });


                                                                        }
                                                                    });

                                                                }
                                                            });
                                                        }
                                                    });
                                                    /*res.json('ok');*/
                                                } else {
                                                    if (stderr) return res.negotiate(stderr);
                                                }
                                                shell.code;
                                            });
                                        } else {
                                            if (stderr) return res.negotiate(stderr);
                                        }
                                        shell.code;
                                    });
                                } else {
                                    if (stderr) return res.negotiate(stderr);
                                }
                                shell.code;
                            });
                        } else {
                            if (stderr) return res.negotiate(stderr);
                        }
                        shell.code;
                    });

                } else {
                    if (stderr) return res.negotiate(stderr);
                }
                shell.code;
            });
        }
    },

    /**
     * Build the android source for progressive web app
     * @param req
     * @param res
     */
    buildSourceProg : function(req,res){
        var userId = req.param('userId'),
            appId = req.param('appId'),
            copyDirPath = config.ME_SERVER + userId + '/buildProg/' + appId + '/',
            moveConfigFile = copyDirPath + 'config.xml',
            appIconFileRES = config.APP_FILE_SERVER + userId + '/progressiveTemplates/' + appId + '/assets/images/publish/0.png',
            appSplashFileRES = config.APP_FILE_SERVER + userId + '/progressiveTemplates/' + appId + '/assets/images/publish/6.png',
            appIconFileDES = copyDirPath + 'resources' + '/' + 'icon.png',
            appSplashFileDES = copyDirPath + 'resources' + '/' + 'splash.png',
            replacePointerAppLink = config.ME_SERVER_URL+userId+'/progressiveTemplates/'+appId,
            selectedTemplatePath= config.ME_SERVER + userId + '/progressiveTemplates/' + appId +'/',
            indexPath = selectedTemplatePath + 'src/index.html',
            srcPath = sails.config.appPath + '/api/src/progPointerApp/',
            isNew = req.param('isNew');


        fs.readFile(moveConfigFile, 'utf-8',
            function(err, data) {

                if(!data || err ){
                    fs.copy(srcPath, copyDirPath, function (err) {
                        if (err) return res.negotiate(err);
                        //Success
                        var searchApp = {
                            id: appId
                        };
                        Application.findOne(searchApp).exec(function (err, app) {
                            if (err) return res.negotiate(err);
                            replaceAppNameNIcon(app.appName, appIconFileRES, appSplashFileRES);
                        });
                    });

                }else{
                    var parser = new xml2js.Parser(),
                        xmlBuilder = new xml2js.Builder();



                            parser.parseString(data, function (err, result) {

                                var preVersion=result.widget['$'].version;
                                var version=increaseVersion(preVersion);
                                result.widget['$'].version=version;

                                var xml = xmlBuilder.buildObject(result);

                                fs.writeFile(moveConfigFile, xml,'utf-8', function(err) {
                                    if (err) return res.negotiate(err);
                                });

                                var searchApp = {
                                    id: appId
                                };
                                Application.findOne(searchApp).exec(function (err, app) {
                                    if (err) return res.negotiate(err);
                                    BuildVersion.create({
                                        appId: appId,
                                        previousVersion: preVersion,
                                        version : version
                                    }).exec(function(err,build){
                                        if (err) return res.negotiate(err);
                                        if(build) {
                                            buildApkFile(copyDirPath,app.appName);
                                        }
                                    });
                                });


                            });
                }
            });

            function replaceAppNameNIcon(appName, icon, splash) {
                var parser = new xml2js.Parser(),
                    xmlBuilder = new xml2js.Builder();
                fs.readFile(moveConfigFile, 'utf-8',
                    function(err, data) {
                        if (err) {
                            return res.negotiate(err);
                        }

                        parser.parseString(data, function (err, result) {

                            result.widget.name = appName;
                            result.widget.content[0]['$'].src = replacePointerAppLink+'/src/index.html';
                            result.widget['$'].id='io.ionic.prog'+appId;
                            var xml = xmlBuilder.buildObject(result);

                            fs.writeFile(moveConfigFile, xml,'utf-8', function(err) {

                                if (err) return res.negotiate(err);
                            });

                            fs.copy(icon, appIconFileDES, 'base64', function(err) {
                               if (err) return res.negotiate(err);
                            });
                            fs.copy(splash, appSplashFileDES, 'base64', function(err) {
                               if (err) return res.negotiate(err);
                            });
                            console.log(result.widget.name)
                            BuildVersion.create({
                                appId: appId,
                                previousVersion:result.widget['$'].version,
                                version : result.widget['$'].version
                            }).exec(function(err,build){
                                if (err) return res.negotiate(err);
                                if(build) {
                                   buildApkFile(copyDirPath,appName);
                                }
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


            function buildApkFile(appPath,appName) {
                var shell = require('shelljs');
                var path = require('path');
                var mime = require('mime');

                shell.cd(appPath);

                shell.exec('ionic cordova resources android --force', {async: true}, function (code, stdout, stderr) {

                    if (code == 0) {

                        shell.exec('ionic cordova build android', {async: true}, function (code, stdout, stderr) {

                            if (code == 0) {
                                /*shell.exec('cordova plugin rm cordova-plugin-console', {async: true}, function (code1, stdout, stderr) {
                                 if (code1==0){*/
                                shell.exec('ionic cordova build --release android', {async: true}, function (code2, stdout, stderr) {

                                    if (code2 == 0) {
                                        shell.mv('-n', 'my-release-key.keystore', appPath + '/platforms/android/build/outputs/apk/');
                                        shell.cd(appPath + '/platforms/android/build/outputs/apk/');
                                        shell.exec('jarsigner -verbose -sigalg SHA1withRSA -digestalg ' +
                                            'SHA1 -keystore my-release-key.keystore android-release-unsigned.apk ' +
                                            'alias_name -storepass abcd1234 -keypass abcd1234 ', {async: true}, function (code4, stdout, stderr) {
                                            if (code4 == 0) {

                                                fs.stat(appPath + '/platforms/android/build/outputs/apk/' + appName.replace(/\s/g, '') + '.apk', function (err, fileStat) {
                                                    if (err) {
                                                        if (err.code == 'ENOENT') {
                                                            sails.log.info('Does not exist.');
                                                        }
                                                    } else {
                                                        if (fileStat.isFile()) {
                                                            fs.unlinkSync(appPath + '/platforms/android/build/outputs/apk/' + appName.replace(/\s/g, '') + '.apk');
                                                        } else if (fileStat.isDirectory()) {
                                                            sails.log.info('Directory found.');
                                                        }
                                                    }
                                                });
                                                // shell.exec('"C:/Program Files (x86)/android/Android-sdk/build-tools/26.0.2/zipalign" -v 4 android-release-unsigned.apk ' + appName.replace(/\s/g, '') + '.apk', {async: true}, function (code5, stdout, stderr) {
                                                shell.exec('/opt/android-sdk-linux/build-tools/23.0.1/zipalign -v 4 android-release-unsigned.apk ' + appName.replace(/\s/g, '') + '.apk', {async: true}, function (code5, stdout, stderr) {
                                                    if (code5 == 0) {

                                                        var file = appPath + 'platforms/android/build/outputs/apk/' + appName.replace(/\s/g, '') + '.apk';
                                                        var resourcesPath = config.APP_FILE_SERVER + userId + '/progressiveTemplates/' +
                                                            appId + '/assets/images/publish/';
                                                        var publishPath = config.ME_SERVER + userId + '/buildProg/' + appId + '/publish';
                                                        var zipFile = config.ME_SERVER + userId + '/buildProg/' + appId + '/publish_' + appId + '.zip';

                                                        fs.stat(zipFile, function (err, fileStat) {
                                                            if (err) {
                                                                if (err.code == 'ENOENT') {
                                                                    sails.log.info('Does not exist.');
                                                                }
                                                            } else {
                                                                if (fileStat.isFile()) {
                                                                    fs.unlinkSync(zipFile);
                                                                } else if (fileStat.isDirectory()) {
                                                                    sails.log.info('Directory found.');
                                                                }
                                                            }
                                                        });
                                                        fs.copy(resourcesPath, publishPath, function (err) {
                                                            if (err) {
                                                                throw err;
                                                            } else {
                                                                fs.copy(file, publishPath + "/" + appName.replace(/\s/g, '') + '.apk', function (err) {
                                                                    if (err) {
                                                                        throw err;
                                                                    } else {
                                                                        zipFolder(publishPath, zipFile, function (err) {
                                                                            if (err) {
                                                                                sails.log.info('Zipping error!', err);
                                                                            } else {

                                                                                var searchAppData = {
                                                                                    id: appId
                                                                                }

                                                                                Application.update(searchAppData, {status: "UPLOADING"}).exec(function (err, app) {
                                                                                    if (err) res.send(err);
                                                                                    else {
                                                                                        var filename = path.basename(zipFile);
                                                                                        var mimetype = mime.lookup(zipFile);

                                                                                        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
                                                                                        res.setHeader('Content-type', mimetype);

                                                                                        var filestream = fs.createReadStream(zipFile);

                                                                                        filestream.pipe(res);
                                                                                        sails.log.info('EXCELLENT');
                                                                                    }
                                                                                });


                                                                            }
                                                                        });

                                                                    }
                                                                });
                                                            }
                                                        });
                                                        /*res.json('ok');*/
                                                    } else {
                                                        if (stderr) return res.negotiate(stderr);
                                                    }
                                                    shell.code;
                                                });
                                            } else {
                                                if (stderr) return res.negotiate(stderr);
                                            }
                                            shell.code;
                                        });
                                    } else {
                                        if (stderr) return res.negotiate(stderr);
                                    }
                                    shell.code;
                                });
                            } else {
                                if (stderr) return res.negotiate(stderr);
                            }
                            shell.code;
                        });

                    } else {
                        if (stderr) return res.negotiate(stderr);
                    }
                    shell.code;
                });
            }
    }
};

