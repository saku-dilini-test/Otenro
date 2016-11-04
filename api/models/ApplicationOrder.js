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
        telNumber : {
            type : 'integer'
        },
        deliveryAddress : {
            type : 'string'
        },
        paymentStatus : {
            type : 'string'
        },
        fulfillmentStatus : {
            type : 'string'
        },
        fulfilledDate : {
            type : 'string'
        },
        refundedDate : {
            type : 'string'
        },
        item:{
            type: 'json'
        },
        amount:{
            type: 'string'
        },
        createAt: {
            type: 'date'
        },
        tax: {
            type:'integer'
        }
    }
};
