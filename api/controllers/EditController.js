/**
 * TemplateController
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

    viewImages : function(req,res){
        res.sendfile(config.ME_SERVER + req.param('userId') + '/templates/' + req.param('appId') + '/img/'+ req.param('img'));
    },

    buildSource : function(req,res){

        var userId = req.userId;
        var appId = req.body.appId;
        var copyDirPath = config.ME_SERVER + userId + '/build/' + appId + '/';
        var wwwPath = copyDirPath + 'www/';
        var moveConfigFile = copyDirPath + 'config.xml';
        var selectedTemplatePath = config.ME_SERVER + userId + '/templates/' + appId +'/';
        var configFile = copyDirPath + 'www/config.xml';
        var appIconFile = copyDirPath + 'www/res/android/icon/icon.jpg';
        var srcPath = sails.config.appPath + '/api/src/hybrid/';

        fs.readFile(moveConfigFile, 'utf-8',
            function(err, data) {

                if(!data || err ){
                    fs.copy(srcPath, copyDirPath, function (err) {
                        if (err) return res.negotiate(err);
                        //Success
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
                            if (err) return res.negotiate(err);

                            parser.parseString(data, function (err, result) {

                                var preVersion=result.widget['$'].version;
                                var version=increaseVersion(preVersion);
                                result.widget['$'].version=version;
                                var xml = xmlBuilder.buildObject(result);

                                fs.writeFile(moveConfigFile, xml,'utf-8', function(err) {
                                    if (err) return res.negotiate(err);
                                });

                                BuildVersion.create({
                                    appId: appId,
                                    previousVersion: preVersion,
                                    version : version
                                }).exec(function(err,build){
                                    if (err) return res.negotiate(err);
                                    if(build) res.json('ok');
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

                        //fs.writeFile(appIconFile, icon, 'base64', function(err) {
                        //    if (err) return res.negotiate(err);
                        //});


                        BuildVersion.create({
                            appId: appId,
                            previousVersion:result.widget['$'].version,
                            version : result.widget['$'].version
                        }).exec(function(err,build){
                            if (err) return res.negotiate(err);
                            if(build) res.json('ok');
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

    }
};