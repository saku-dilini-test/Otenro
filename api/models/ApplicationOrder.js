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
        registeredName : {
            type : 'string'
        },
        telNumber : {
            type : 'integer'
        },
        deliveryLocation : {
            type : 'string'
        },
        deliveryNo : {
            type : 'string'
        },
        deliveryStreet : {
            type : 'string'
        },
        deliveryCity : {
            type : 'string'
        },
        deliveryCountry : {
            type : 'string'
        },
        deliveryZip : {
            type : 'string'
        },
        paymentStatus : {
            type : 'string'
        },
        fulfillmentStatus : {
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
            type:'string'
        },
        shippingOpt: {
            type:'string'
        },
        pickUp :{
            type: 'json'
        },
        option:{
            type: 'string'
        }
    }
};
