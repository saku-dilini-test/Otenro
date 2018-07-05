/**
 * SubscriptionPayment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        msisdn :{
            type: 'string'
        },
        serviceId :{
            type: 'string'
        },
        status :{
            type: 'int'
        },
        date:{
            type: 'string'
        },
        amount:{
            type:'double'
        },
        operator:{
            type:'string'
        },
        appId:{
            type:'string'
        }


    }
};
