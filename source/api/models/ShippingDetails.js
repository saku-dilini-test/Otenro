/**
 * ShippingDetails.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    schema: true,

    attributes: {
        userId:{
            type: 'string'
        },
        appId: {
            type: 'string',
            required: true
        },
        shippingOption:{
            type: 'string'
        },
        optionName:{
            type: 'string'
        },
        preOrderFee:{
            type: 'integer'
        },
        feePerItem:{
            type: 'integer'
        },
        weightRanges : {
            type : 'json'
        },
        locationName : {
            type: 'string'
        },
        number : {
            type :'integer'
        },
        streetAddress : {
            type : 'string'
        },
        city : {
            type: 'string'
        },
        country : {
            type: 'string'
        },
        postalCode : {
            type: 'string'
        },
        cost : {
            type :'integer'
        },
        countryRestriction: {
            type : 'json'
        },
        selection : {
            type : 'string'
        },
        createdDate:{
            type: 'date'
        }

    }
};