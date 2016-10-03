/**
 * Created by prasanna on 9/19/16.
 */

/**
 * TechnicalSupportController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs-extra'),
    xml2js = require('xml2js'),
    config = require('../../services/config');

module.exports = {

    
    /**
     * get All AppsData
     *
     */
    getAllAppsData: function (req, res) {
        Application.find({status:'PENDING'}).exec(function (err, appsData) {
            if (err) res.send(err);
            res.json(appsData);

        });
    },
    
    
    
    /**
     * get Publish Details of the Application
     *
     */
    getPublishDetails : function (req, res) {
        var searchApp = {
            appId :req.body.appId,
        }

        console.log("req.body.appId " + req.body.appId);
        
        PublishDetails.find(searchApp).exec(function (err, publishedData) {
            if (err) res.send(err);
            res.json(publishedData);

        });

    },

    /**
     * get Push Config Details for given appID*
     */
    getPushConfigDetails : function (req, res) {
        var appId = req.param('appId');
        var searchApp = {
            appId : appId
        };
        
        PushConfig.findOne(searchApp).exec(function (err, pushConfigData) {
            if (err) res.send(err);
            res.json(pushConfigData);
        });

    },

    /**
     * save Push Config Details for given appID
     */
    savePushConfigDetails : function (req, res) {
        
        var userData   = req.body;
        var appId      = userData.appId;
        var userId     = userData.userId;
        var ionicAPPID = userData.ionicAPPID;
        var senderID   = userData.senderID;
        var tempAppDirPath = config.ME_SERVER + userId + '/templates/' + appId;
        var searchQuery = {
            appId : appId
        };
        // update push-config-details for given appId
        PushConfig.update(searchQuery,userData).exec(function(err,updateResult) {
            if (err) res.send(err);
            else {
                // if not update
                if (updateResult.length == 0) {
                    // create new pushConfig Collection
                    PushConfig.create(userData).exec(function(err,createResult) {
                        if (err) res.send(err);
                        else {
                            sails.log.info('Successfully Create Push Config Details');
                            res.send(200,createResult);
                        }
                    });
                }
                else{
                    sails.log.info('Successfully Update Push Config Details');
                    res.send(200,updateResult);
                }
                
                // Sender ID update here
                if(ionicAPPID || senderID) {
                    
                    // app.js file path 
                    var appJsFilePath = tempAppDirPath + '/js/app.js';
                    
                    // Update in app.js file
                    fs.readFile(appJsFilePath, 'utf-8',
                        function (err, data) {
                            if (err) return res.negotiate(err);

                            var findIonicAppID = '8307b439'; // TODO : This may be change Later
                            var findSenderID   = '528602483901'; // TODO : This may be change later
                            if(ionicAPPID){
                                data = data.replace(findIonicAppID, ionicAPPID);
                            }
                            if(senderID) {
                                data = data.replace(findSenderID, senderID);
                            }
                            fs.writeFile(appJsFilePath, data , 'utf-8', function (err) {
                                if (err) return res.negotiate(err);
                            });
                        });
                }

                // Sender ID update here
                if(senderID){

                    // Update in config.xml file
                    fs.readFile(tempAppDirPath + '/config.xml', 'utf-8',
                        function(err, data) {
                            if (err){
                                sails.log.info(err);
                            }else{
                                var parser = new xml2js.Parser(),
                                    xmlBuilder = new xml2js.Builder();

                                parser.parseString(data, function (err, result) {

                                    result.widget['plugin'][0].variable[0]['$'].value = senderID;
                                    var xml = xmlBuilder.buildObject(result);

                                    fs.writeFile(tempAppDirPath + '/config.xml', xml,'utf-8',
                                        function(err) {
                                            if (err){
                                                sails.log.info(err);
                                            }else{
                                                sails.log.info('Successfully update config.xml')
                                            }
                                        });
                                });
                            }
                        });
                }
            }
        });

    }

};
