/**
 * Created by prasanna on 9/19/16.
 */

/**
 * TechnicalSupportController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var EasyZip = require('easy-zip').EasyZip;
var fs = require('fs-extra');
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
        var userData = req.body;
        var appId    = req.body.appId;
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
            }
        });

    }

};
