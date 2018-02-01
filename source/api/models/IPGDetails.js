/**
 * IPGDetails.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    schema: true,

    attributes: {
        appId: {
            type: 'string'
        },
        paypalEnable: {
            type: 'boolean'
        },
        paypalKey: {
            type: 'string'
        },
        stripeEnable: {
            type: 'boolean'
        },
        braintreeEnable : {
            type: 'boolean'
        },
        payHereEnable:{
            type: 'boolean'
        },
        stripeKey: {
            type: 'string'
        },
        cashOnPickupEnable : {
            type : 'boolean'
        },
        cashOnDeliveryEnable : {
            type : 'boolean'
        },
        authorizeNetEnable: {
            type : 'boolean'
        },
        apiLoginId : {
            type : 'string'
        },
        transactionKey : {
            type : 'string'
        },
        payHereMerchantId :{
            type : 'string'
        },
        env : {
            type : 'string'
        }

     }
    };

