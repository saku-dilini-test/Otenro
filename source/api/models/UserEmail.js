/**
 * Template.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    schema: true,
    attributes: {
        appId:{
            type: 'string'
        },
        fromEmail: {
            type: 'string'
        },
        replyToEmail:{
            type: 'string'
        },
        bccEmail:{
            type: 'string'
        },
        alertEmail:{
            type: 'string'
        },
        alertAt:{
            type: 'string'
        },
        orderConfirmedEmail:{
            type: 'json'
        },
        orderFulfilledEmail:{
            type: 'json'
        },
        orderRefundEmail:{
            type: 'json'
        },
        header:{
            type: 'string'
        },
        imageHeader:{
            type: 'string'
        },
        imageFooter:{
            type: 'string'
        },
        footer:{
            type: 'string'
        },
        domainName:{
            type: 'string'
        },
        emailUsername:{
            type: 'string'
        },
        emailPassword:{
            type: 'string'
        },
        sslEnabled:{
            type: 'boolean'
        },
        orderConfirmedEmailImage :{
            type: 'string'
        },
        orderFulfilledEmailImage:{
            type: 'string'
        },
        orderRefundedEmailImage:{
            type: 'string'
        }
    }
};

