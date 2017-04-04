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
        registeredUser : {
            type: 'string'
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

        no : {
            type : 'integer'
        },

        id : {
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
            type:'string'
        },
        shippingOpt: {
            type:'string'
        },
        shippingCost: {
            type:'string'
        },
        pickUp :{
            type: 'json'
        },
        email :{
            type: 'string'
        },
        currency :{
            type: 'string'
        },
        option:{
            type: 'string'
        },
        promotionCode:{
            type: 'string'
        }
    }
};
