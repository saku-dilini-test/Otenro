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
const nodemailer = require('nodemailer');

gracefulFs.gracefulify(fs);
var rimraf = require('rimraf');
var shell = require('shelljs');

var transporter = nodemailer.createTransport({
    host: 'appmaker.lk',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'support@appmaker.lk', // generated ethereal user
        pass: 'Jza12BTL36' // generated ethereal password
    },
    tls:{
        rejectUnauthorized: false
    }
});

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
        var operators;
        var searchApp = {
            id: appId
        };
        Application.update(searchApp,{isActive: false}).exec(function (err, app) {
            if (err) return res.negotiate(err);
            else {
                console.log(app);
                PublishDetails.findOne({appId: app[0].id}).exec(function (err, publishApp){
                    if(err) return res.negotiate(err);
                    else{
                    console.log(publishApp);
                    if(publishApp){
                        console.log("inside if");
                        console.log("app id");
                        console.log(app[0].id);
                           operators = publishApp.operators;
                           operators.forEach(function(op){
                                op.status = "TERMINATED";
                           });

                        PublishDetails.update({appId: app[0].id},publishApp).exec(function(err, updatedPbApp){
                            if(err) return res.negotiate(err);
                            else{
                                User.find({id:app[0].userId}).exec(function(err,userData){
                                    console.log("user");
                                    console.log(userData);
                                    if (err) res.send(err);
                                    var email = req.body.email;
                                    var emailBody =
                                    "<html>" + app[0].appName + " has been deleted by " + userData[0].firstName + " " + userData[0].lastName +
                                    "<br><br>This email is to notify that the app creator with the user name " +
                                    userData[0].firstName + " " + userData[0].lastName + " has deleted the app " + app[0].appName + " with the App ID" + app[0].id + "." +
                                    "<br><br>"+
                                    "Regards,<br>Appmaker Team</html>";

                                     mailOptions = {
                                        from: app[0].email, // sender address
                                        to: config.IDEABIZ_EMAIL, // list of receivers
                                        subject: 'App has been Deleted!', // Subject line
                                        html:emailBody


                                    };
                                console.log(emailBody);
                                        // send mail with defined transport object
                                        transporter.sendMail(mailOptions, (error, info) => {
                                            if (error) {
                                                //return console.log(error);
                                                console.log(error);
                                                return  res.send(500,error);

                                            }
                                            console.log('Message sent: %s', info.messageId);
//                                                    return res.send("ok");
                                    });
                                });
                                res.send("app deleted");

                            }

                        });
                    }else{
                    console.log("else");
                        res.send("app deleted");
                    }

                    }

                });
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
        SecondNavigation.destroy(searchApp).exec(function (err, app) {

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
        sails.log.debug("buildSourceProg user:" + req.param('userId') + " appId:" + req.param('appId'));

        var userId = req.param('userId'),
            appId = req.param('appId'),
            copyDirPath = config.ME_SERVER + userId + '/buildProg/' + appId + '/',
            moveConfigFile = copyDirPath + 'config.xml',
            homets_File = copyDirPath + 'src/pages/home/home.ts',
            appIconFileRES = config.APP_FILE_SERVER + userId + '/progressiveTemplates/' + appId + '/src/assets/images/publish/0.png',
            appSplashFileRES = config.APP_FILE_SERVER + userId + '/progressiveTemplates/' + appId + '/src/assets/images/publish/6.png',
            appIconFileDES = copyDirPath + 'resources' + '/' + 'icon.png',
            appSplashFileDES = copyDirPath + 'resources' + '/' + 'splash.png',
            replacePointerAppLink = config.ME_SERVER_URL+userId+'/progressiveTemplates/'+appId+'/src/',
            selectedTemplatePath= config.ME_SERVER + userId + '/progressiveTemplates/' + appId +'/',
            indexPath = selectedTemplatePath + 'src/index.html',
            srcPath = sails.config.appPath + '/api/src/progPointerApp/',
            isNew = req.param('isNew'),
            thisCtrl = this;


        fs.readFile(moveConfigFile, 'utf-8',
            function(err, data) {

                if(!data || err ){
                    fs.copy(srcPath, copyDirPath, function (err) {
                        if(err){
                            sails.log.info("1.Error while building apk: " + err);
                            return;
                        }
                        //Success
                        var searchApp = {
                            id: appId
                        };
                        Application.findOne(searchApp).exec(function (err, app) {
                            if(err){
                                sails.log.info("2.Error while building apk: " + err);
                                return;
                            }
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
                                    if(err){
                                        sails.log.info("3.Error while building apk: " + err);
                                        return;
                                    }
                                });

                                var searchApp = {
                                    id: appId
                                };
                                Application.findOne(searchApp).exec(function (err, app) {
                                    if(err){
                                        sails.log.info("4.Error while building apk: " + err);
                                        return;
                                    }
                                    BuildVersion.create({
                                        appId: appId,
                                        previousVersion: preVersion,
                                        version : version
                                    }).exec(function(err,build){
                                        if(err){
                                            sails.log.info("5.Error while building apk: " + err);
                                            return;
                                        }
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
                        if(err){
                            sails.log.info("6.Error while building apk: " + err);
                            return;
                        }

                        parser.parseString(data, function (err, result) {
                            result.widget.name = appName;
                            result.widget['$'].id='io.ionic.prog'+appId;
                            var xml = xmlBuilder.buildObject(result);

                            fs.writeFile(moveConfigFile, xml,'utf-8', function(err) {

                                if(err){
                                    sails.log.info("7.Error while building apk: " + err);
                                    return;
                                }
                            });

                            fs.copy(icon, appIconFileDES, 'base64', function(err) {
                                if(err){
                                    sails.log.info("8.Error while building apk: " + err);
                                    return;
                                }
                            });
                            fs.copy(splash, appSplashFileDES, 'base64', function(err) {
                                if(err){
                                    sails.log.info("9.Error while building apk: " + err);
                                    return;
                                }
                            });
                            BuildVersion.create({
                                appId: appId,
                                previousVersion:result.widget['$'].version,
                                version : result.widget['$'].version
                            }).exec(function(err,build){
                                if(err){
                                    sails.log.info("10.Error while building apk: " + err);
                                    return;
                                }

                                //Replacing app url in home.ts file for the appid and user id
                                fs.readFile(homets_File,'utf8', function (err, data) {
                                    if(err){
                                        sails.log.info(err);
                                    }
                                    else{
                                        var result = data.replace(/PointerAppLink/g, replacePointerAppLink);

                                        fs.writeFile(homets_File, result, function (err) {
                                            if(err){
                                                sails.log.info(err);
                                            }
                                            else{
                                                buildApkFile(copyDirPath,appName);
                                            }
                                        })
                                    }
                                });
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
                console.log('+++++++++++++++++++++++++++++++++++++++++');
                console.log('Building apk file for the app: ' + appName);
                console.log('+++++++++++++++++++++++++++++++++++++++++');

                var path = require('path');
                var mime = require('mime');
                var apkName = appName.replace(/\s/g, '') + '.apk';

                shell.cd(appPath);

                console.log('Start to generate resources...');
                shell.exec('ionic cordova resources android --force', {async: true}, function (code, stdout, stderr) {
                    console.log('Completed generating resources');
                    if(code == 0) {
                        console.log('Start the android debug build');
                        shell.exec('ionic cordova build android', {async: true}, function (code2, stdout2, stderr2) {
                            console.log('Completed android debug build');
                            if (code2 == 0) {
                                /*shell.exec('cordova plugin rm cordova-plugin-console', {async: true}, function (code3, stdout3, stderr3) {
                                 if (code1==0){*/
                                console.log('Start the Android release build');
                                shell.exec('ionic cordova build android  --release', {async: true}, function (code3, stdout3, stderr3) {
                                    console.log('Completed the Android release build')
                                    if (code3 == 0) {
                                        console.log('Running jarsigner');

                                        // shell.mv('-n', 'my-release-key.keystore', appPath + 'platforms/android/build/outputs/apk/');
                                        // shell.cd(appPath + 'platforms/android/build/outputs/apk/');
                                        shell.mv('-n', 'my-release-key.keystore', appPath + 'platforms/android/app/build/outputs/apk/release/');
                                        shell.cd(appPath + 'platforms/android/app/build/outputs/apk/release/');

                                        console.log('Start jar signing process');
                                        shell.exec('jarsigner -verbose -sigalg SHA1withRSA -digestalg ' +
                                            'SHA1 -keystore my-release-key.keystore app-release-unsigned.apk ' +
                                            // 'SHA1 -keystore my-release-key.keystore android-release-unsigned.apk ' +
                                            'alias_name -storepass abcd1234 -keypass abcd1234 ', {async: true}, function (code4, stdout4, stderr4) {
                                            console.log('Completed jar signing process');
                                            if (code4 == 0) {
                                                // var apkReleasePath = appPath + '/platforms/android/build/outputs/apk/';
                                                var apkReleasePath = appPath + '/platforms/android/app/build/outputs/apk/release/';
                                                console.log('Checking whether the file:' + apkName + " exists in the path:" + apkReleasePath);

                                                fs.stat(apkReleasePath + apkName, function (err, fileStat) {
                                                    if (err) {
                                                        if (err.code == 'ENOENT') {
                                                            console.log('File:' + apkName + " does not exists, hence will proceed with the zipalign process");
                                                        }
                                                    } else {
                                                        if (fileStat.isFile()) {
                                                            console.log('File:' + apkName + " Exists and will remove before proceed the zipalign");

                                                            // fs.unlinkSync(appPath + '/platforms/android/build/outputs/apk/' + apkName);
                                                            fs.unlinkSync(appPath + '/platforms/android/app/build/outputs/apk/release/' + apkName);
                                                        } else if (fileStat.isDirectory()) {
                                                            console.log('File:' + apkName + " not found.Found a directory instead.Will not proceed the zipalign/");
                                                            // shell.exit(1);
                                                            return;
                                                        }
                                                    }
                                                    //Start Zipalign process
                                                    thisCtrl.doZipalign(appPath,userId,appId,apkName);
                                                });
                                            } else {
                                                thisCtrl.printShellError('Error while Executing: jarsigner process',code4, stdout4, stderr4, userId, appId);
                                                if (stderr){
                                                    // shell.exit(1);
                                                    return;
                                                }
                                            }
                                        });
                                    } else {
                                        thisCtrl.printShellError('Error while Executing: ionic cordova build android  --release',code3, stdout3, stderr3, userId, appId);
                                        if (stderr){
                                            // shell.exit(1);
                                            return;
                                        }
                                    }
                                });
                            } else {
                                thisCtrl.printShellError('Error while Executing: ionic cordova build android',code2, stdout2, stderr2, userId, appId);
                                if (stderr){
                                    // shell.exit(1);
                                    return;
                                }
                            }
                        });
                    }else {
                        thisCtrl.printShellError('Error while Executing: ionic cordova resources android --force',code, stdout, stderr, userId, appId);
                        if (stderr){
                            // shell.exit(1);
                            return;
                        }
                    }
                });
            }
        sails.log.debug("apk generation in progress....");
    },

    doZipalign: function(appPath,userId,appId,apkName){
        var thisCtrl = this;
        console.log('Start zipalign process');
        // shell.exec('"C:/Program Files (x86)/android/Android-sdk/build-tools/26.0.2/zipalign" -v 4 android-release-unsigned.apk ' + apkName, {async: true}, function (code5, stdout5, stderr5) {
        // shell.exec('/Users/chamilthushantha/Library/Android/sdk/build-tools/27.0.3/zipalign -v 4 android-release-unsigned.apk ' + apkName, {async: true}, function (code5, stdout5, stderr5) {
            shell.exec('/opt/android-sdk/build-tools/26.0.2/zipalign -v 4 app-release-unsigned.apk ' + apkName, {async: true}, function (code5, stdout5, stderr5) {
            console.log('Completed zipalign process');
            if (code5 == 0) {
                thisCtrl.copyAPKToPublishPath(appPath,userId,appId,apkName);
            } else {
                thisCtrl.printShellError('Error while Executing: jarsigner process',code5, stdout5, stderr5, userId, appId);
                if (stderr){
                    // shell.exit(1);
                    return;
                }
            }
        });
    },

    copyAPKToPublishPath: function(appPath,userId,appId,apkName){
        // var apkFile = appPath + 'platforms/android/build/outputs/apk/' + apkName;
        var apkFile = appPath + 'platforms/android/app/build/outputs/apk/release/' + apkName;
        var apkPublishPath = config.ME_SERVER + userId + '/buildProg/' + appId + '/publish';

        var searchAppData = {
            id: appId
        }

        Application.update(searchAppData, {status: "UPLOADING"}).exec(function (err, app) {
            if (err){
                console.log("Error while updating the Application for the appId:" + appId + " Error: " + err);
                // shell.exit(1);
            }
            else {
                console.log("Update Application status as UPLOADING " + appId );
            }
        });

        // console.log("Executing copyAPKToPublishPath file:" + apkFile + " publishPath:" + apkPublishPath + " appId:" + appId);
        // fs.copy(apkFile, apkPublishPath + "/" + apkName, function (err) {
        //     if (err) {
        //         console.log("Error while copying file to publish path " + err);
        //         // shell.exit(1);
        //     } else {
        //         var searchAppData = {
        //             id: appId
        //         }
        //
        //         Application.update(searchAppData, {status: "UPLOADING"}).exec(function (err, app) {
        //             if (err){
        //                 console.log("Error while updating the Application for the appId:" + appId + " Error: " + err);
        //                 // shell.exit(1);
        //             }
        //             else {
        //                 console.log("Update Application status as UPLOADING " + appId );
        //             }
        //         });
        //     }
        // });
    },

    printShellError: function(message,code,stdout,stderr,userid,appid){
        console.log("**************Start - Error Generating APK*************");
        console.log("UserId:" + userid + " appId:" + appid);
        console.log("Message:" + message);

        if(code){
            console.log("shell.exec=>code:" + message);
        }

        if(stdout){
            console.log("shell.exec=>stdout:" + stdout);
        }

        if(stderr){
            console.log("shell.exec=>stderr:" + stderr);
        }

        console.log("**************End - Error Generating APK*************");
    }
};

