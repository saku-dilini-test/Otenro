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
            type : 'string'
        },
        no : {
            type : 'integer'
        },
        _id : {
            type : 'objectid'
        },
        deliveryLocation : {
            type : 'string'
        },
        deliveryNo : {
            type : 'string'
        },
        deliverName : {
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
        paymentType : {
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
            type: 'float'
        },
        createAt: {
            type: 'date'
        },
        tax: {
            type:'float'
        },
        shippingOpt: {
            type:'string'
        },
        shippingCost: {
            type:'float'
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
        },
        pickupCost:{
            type: 'float'
        },
        note:{
            type: 'string'
        }
    }
};
