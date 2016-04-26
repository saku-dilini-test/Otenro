/**
 * ApplicationStoreSettings.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

 module.exports = {

     schema: true,
     attributes: {
            userId:{
                type: 'string',
                required: true
            },
            appId:{
                type: 'string',
                required: true
            },
            currency:{
                type: 'string'
            },
            currencySign:{
               type: 'string'
            },
            measurementStandards:{
                type: 'string'
            },
            orderNumber:{
                type: 'string'
            },
            expressCheckout:{
                 type: 'boolean'
            },
            siteType:{
                 type: 'string'
            },
            allowPromote:{
                 type: 'boolean'
            },
            address:{
                 type: 'string'
            },
            language:{
                 type: 'string'
            },
            timeAndRegion:{
                 type: 'string'
            },
            connectDomain:{
                 type: 'string'
            },
            searchEngineDesc:{
                 type: 'string'
            },
            returnPolicy:{
                 type: 'string'
            },
            termsAndCondition:{
                 type: 'string'
            },
            privacyPolicy:{
                 type: 'string'
            }

            }
     };
//     seedData: [
//             {
//                 currency : 'SLR',
//                 sign : 'Rs.'
//             },
//             {
//                 currency : 'USD',
//                 sign : '$'
//             },
//             {
//                 currency : 'EUR',
//                 sign : '€'
//             },
//     ]