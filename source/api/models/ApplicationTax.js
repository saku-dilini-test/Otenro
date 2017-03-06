/**
 * ApplicationTax.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    appId: {
      type: 'string',
      required: true
    },
    country:{
      type: 'string'
    },
    taxAmount:{
      type: 'float'
    },
    isApplyShippingCharge:{
      type: 'boolean',
      defaultsTo: false
    },
    isApplyServicesCharge:{
      type: 'boolean',
      defaultsTo : false
    },
    countryRestriction: {
      type : 'json'
    },
    taxName: {
      type : 'string'
    }
  }
};

