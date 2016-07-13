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
            type: 'string'
        },
        feePerItem:{
            type: 'string'
        },
        weightRanges : {
            type : 'json'
        },
        createdDate:{
            type: 'date'
        }
    }
};