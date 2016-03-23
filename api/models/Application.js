/**
 * Application.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    schema: true,

    attributes: {

        appName:{
            type: 'string',
            required: true
        },
        appTempPath:{
            type: 'string',
            required: true
        },
        userId:{
            type: 'string',
            required: true
        },
        status: {
            type: 'string'

        },
        displayImage: {
            type: 'string'
            
        },
        templateId:{
            type: 'string',
            required: true

        },
        appIcon:{
            type: 'string'

        },
        appSettings:{
            type : 'json'
            //header:{
            //    type: 'string'
            //},
            //backgroundColor:{
            //    type: 'string'
            //},
            //navigationBarColor:{
            //    type: 'string'
            //},
            //footerColor:{
            //    type: 'string'
            //},
            //buttonColor:{
            //    type: 'string'
            //},
            //headerFontFamily:{
            //    type: 'string'
            //},
            //contentFontFamily:{
            //    type: 'string'
            //},
            //footerFontFamily:{
            //    type: 'string'
            //},
            //buttonFontFamily:{
            //    type: 'string'
            //},
            //headerFontSize:{
            //    type: 'string'
            //},
            //contentFontSize:{
            //    type: 'string'
            //},
            //footerFontSize:{
            //    type: 'string'
            //},
            //headerFontWeight:{
            //    type: 'string'
            //},
            //contentFontWeight:{
            //    type: 'string'
            //},
            //footerFontWeight:{
            //    type: 'string'
            //},
            //buttonBorderWith :{
            //    type: 'string'
            //},
            //buttonBorderRadius :{
            //    type: 'string'
            //},
            //font:{
            //    type: 'string'
            //},
            //fontSize:{
            //    type: 'number'
            //
            //},
            //backImg:{
            //    type: 'string'
            //},
            //appCurrency:{
            //    type: 'string'
            //},
            //appCurrencyName:{
                        //    type: 'string'
                        //}
        }
    }
};

