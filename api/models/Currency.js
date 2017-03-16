/**
 * Currency.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

 module.exports = {

     schema: true,
     attributes: {
            currency:{
                type: 'string'
            },
            sign:{
               type: 'string'
            }
     },
     seedData: [
             {
                 currency : 'SLR',
                 sign : 'Rs.'
             },
             {
                 currency : 'USD',
                 sign : '$'
             },
             {
                 currency : 'EUR',
                 sign : '€'
             },
     ]
 };