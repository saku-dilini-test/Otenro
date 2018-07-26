/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {

  schema: true,

  attributes: {

    msisdn:{

       type: 'string'
    },
    appId:{
        type: 'string'
    },

    serviceId:{
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

    },
    unsubscribeDate:{

          type:'string'

    }

  }


};

