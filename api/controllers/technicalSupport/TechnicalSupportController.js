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

    }

};
