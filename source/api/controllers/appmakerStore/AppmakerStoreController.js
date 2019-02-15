/**
 * Created by Sudarshana on 1/09/19.
 */
/**
 * AppmakerStoreController
 *
 * @description :: Server-side logic for managing appmaker stores
 *
 */
var PATH = require('path');
var MIME = require('mime');
var FS = require('fs');
var ERROR = { status: 'ERROR' };
var NOT_FOUND = { status: 'NOT_FOUND' };
var CONFIG = require('../../services/config');

module.exports = {

    getAllApps: function (req, res) {

        var appData = [];
        var appmakerStoreController = this;

        PublishDetails.find({ operators: { $elemMatch: { status: "APPROVED" }}}).exec(function (pDetailsError, pDetailsData) {

            if (pDetailsError) {
                
                sails.log.error("Error occurred in find PublishDetails at AppmakerStoreController.getAllApps : error => " + pDetailsError);
                return res.serverError(ERROR);
            }

            if (pDetailsData.length === 0) {
                return res.send({ status: 'SUCCESS', data:  appData });
            }

            if (pDetailsData.length > 0) {

                appmakerStoreController.addPublishDetailsToAppData(appData, pDetailsData, function (appDataWithPubDetails) {

                    appmakerStoreController.addApplicationDataToAppData(appDataWithPubDetails, function (appDataWithApplicationDetails) {

                        if (appDataWithApplicationDetails.status === "ERROR") {
                            return res.serverError(ERROR);
                        }

                        if (appDataWithApplicationDetails.status === "OK") {

                            appmakerStoreController.addAppCreatorDetailsToAppData(appDataWithApplicationDetails.data, function (appDataWithUserDetails) {

                                if (appDataWithApplicationDetails.status === "ERROR") {
                                    return res.serverError(ERROR);
                                }
                                if (appDataWithApplicationDetails.status === "OK") {

                                    appDataWithUserDetails.data.sort(function (current, next) {

                                        if (current.createdAt < next.createdAt) {
                                            return 1;
                                        } 
                                        if (current.createdAt > next.createdAt) {
                                            return -1;
                                        }
                                        return 0;
                                    });
                                    return res.send({ status: 'SUCCESS', data:  appDataWithUserDetails.data });
                                }
                            });
                        }
                    });
                });
            }
        });
    },

    /**
     * Responsible for adding publishDetails to the appData
     * @param appData {Array}
     * @param pDetailsData {pDetailsData}
     * @param cb :: callback
     */
    addPublishDetailsToAppData: function (appData, pDetailsData, cb) {

        var count = 0;

        pDetailsData.forEach(function (data) {

            var tempAppDataObject = {};

            count++;
            tempAppDataObject.appId = data.appId;
            tempAppDataObject.shortDescription = data.shortDescription;
            tempAppDataObject.fullDescription = data.fullDescription;
            tempAppDataObject.playstoreLink = data.playstoreLink;
            tempAppDataObject.operators = data.operators;
            appData.push(tempAppDataObject);

            if (count === pDetailsData.length) {
                cb(appData);
            }
        });
    },

    /**
     * Responsible to adding application data to all apps data
     * @param appData {Array} :: appData with publish details
     * @param cb :: callback
     */
    addApplicationDataToAppData: function (appData, cb) {

        var count = 0;
        var tempAppData = []
        var hasErrorOccurred = false;

        appData.forEach(function (data) {

            Application.findOne({ id: data.appId, apkStatus: 'SUCCESS' }).exec(function (err, app) {

                count++;

                if (err) {
                    hasErrorOccurred = true;
                    sails.log.error("Error occurred while finding application at AppmakerStoreController.addApplicationDataToAppData : error => " + err);
                }
                if (app) {
                    data.appName = app.appName;
                    data.userId = app.userId;
                    data.publishStatus = app.publishStatus;
                    data.apkStatus = app.apkStatus;
                    data.createdAt = app.createdAt;
                    data.updatedAt = app.updatedAt;
                    tempAppData.push(data);
                }
                if (hasErrorOccurred && count === appData.length) {
                    cb({ status: "ERROR", data: null });
                }
                else if (!hasErrorOccurred && count === appData.length) {
                    cb({ status: "OK", data: tempAppData });
                }
            });
        });
    },

    /**
     * Responsible to adding application data to all apps data
     * @param appData {Array} :: appData with publish details
     * @param cb :: callback
     */
    addAppCreatorDetailsToAppData: function (appData, cb) {

        var count = 0;
        var tempAppData = []
        var hasErrorOccurred = false;

        appData.forEach(function (data) {

            User.findOne({ id: data.userId }).exec(function (err, user) {

                count++;

                if (err) {
                    hasErrorOccurred = true;
                    sails.log.error("Error occurred while finding application at AppmakerStoreController.addApplicationDataToAppData : error => " + err);
                }
                if (user) {
                    data.firstName = user.firstName;
                    data.lastName = user.lastName;
                    data.email = user.email;
                    tempAppData.push(data);
                }
                if (hasErrorOccurred && count === appData.length) {
                    cb({ status: "ERROR", data: null });
                }
                else if (!hasErrorOccurred && count === appData.length) {
                    cb({ status: "OK", data: tempAppData });
                }
            });
        });
    },

    /**
     * Responsible for sending apk file
     **/
    sendAPKFile: function (req, res) {

        var userId = req.body.userId;
        var appId = req.body.appId;
        var appName = req.body.appName;
        var file = CONFIG.ME_SERVER + userId + '/buildProg/' + appId
            + '/' + appName.replace(/\s/g, '') + '.apk';
        var filename = PATH.basename(file);
        var mimetype = MIME.lookup(file);

        res.setHeader('x-filename', filename);
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);
        var filestream = FS.createReadStream(file);
        filestream.pipe(res);
    },

    /**
     * Responsible for checking apk file is exists for downloading
     **/
    checkApkFileExists: function (req, res) {
        var userId = req.body.userId;
        var appId = req.body.appId;
        var appName = req.body.appName;
        var file = CONFIG.ME_SERVER + userId + '/buildProg/' + appId
            + '/' + appName.replace(/\s/g, '') + '.apk';

        if (FS.existsSync(file)) {
            return res.send({ status: 'SUCCESS' });
        } else {
            return res.send(NOT_FOUND)
        }
    }
}