/**
 * Application.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    schema: true,

    attributes: {

        appName:{
            type: 'string',
            required: true
        },
        appTempPath:{
            type: 'string',
            required: true
        },
        userId:{
            type: 'string',
            required: true
        },
        status: {
            type: 'string'

        },
         publishStatus: {
             type: 'string'

         },

        displayImage: {
            type: 'string'
            
        },
        templateId:{
            type: 'string',
            required: true

        },
        isNew:{
            type: 'boolean',
            required: true

        },
        appIcon:{
            type: 'string'

        },
        templateCategory : {
            type: 'string'
        },
        appSettings:{
            type : 'json'
        },
        appUpdateLocationSetting : {
            type : 'json'
        },

        id:{
           type:'ObjectId'
        },

        uniqueAppId: {
            type: 'string'
        },

        isActive: {
            type: 'boolean'
        },
        apkStatus: {
            type: 'string' //To decide whether the apk build is in PENDING,SUCCESS or ERROR, these statuses has defined in the config.APK_BUILD_STATUS
        },
        apkStatusUpdatedAt: {
            type: 'string' //This is to keep the date which the apk try to build
        }
    }
};

