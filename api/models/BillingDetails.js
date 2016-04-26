/**
 * BillingDetails.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */


module.exports = {

schema: true,
attributes: {
       userId:{
        type: 'string',
        required: true
       },
       fname:{
           type: 'string'
       },
       lname:{
          type: 'string'
       },
       address:{
          type: 'string'
       },
       creditCardNumber:{
          type: 'string'
       },
       cardType:{
          type: 'string'
       },
       cvs:{
          type: 'string'
       }
       }
};