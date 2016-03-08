/**
 * ApplicationOrder.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    schema: true,

    attributes: {

        appId : {
            type: 'string',
            required: true
        },
        orderId  : {
            type: 'string'
        },
        customerName : {
            type : 'string'
        },
        paymentStatus : {
            type : 'string'
        },
        fulfillmentStatus : {
            type : 'string'
        },
        createAt: {
            type: 'date'
        }
    }
};
