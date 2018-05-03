/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var Passwords = require('machinepack-passwords');

module.exports = {

  schema: true,

  attributes: {

    msisdn:{
       type: 'string'
    },
    appID:{
        type: 'string'
    },
    status:{
        type: 'string'
    },
    subscriptionStatus:{
        type: 'string'
    },
    lastAccessTime:{
        type: 'date'
    },
    registeredDate:{

      type:'string'

    },
    deviceUUID:{

      type:'string'

    }

  }


};

