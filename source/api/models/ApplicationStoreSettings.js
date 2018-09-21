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
            currencySymbol:{
               type: 'string'
            },
            measurementStandard:{
                type: 'string'
            },
            orderNumber:{
                type: 'integer'
            },
            appName:{
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
            },
            OpenHours:{
                type: 'json'
            },
            header:{
                 type: 'string'
            },
            content:{
             type: 'string'
            },
            aboutUsImageName:{
             type: 'string'
            },
            showOnWebsiteAbout:{
             type: 'boolean'
            },
             showOnWebsitePolicies:{
              type: 'boolean'
             }

    }
};
