/**
 * PushConfig.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    schema: true,
    attributes: {
        appId: {
            type: 'string',
            required: true
        },
        ionicAPPID : {
            type : 'string'
        },
        senderID:{
            type: 'string'
        },
        profile:{
            type: 'string'
        },
        authorization:{
            type: 'string'
        }
    }
};