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
        alertEmail:{
            type: 'string'
        },
        alertAt:{
            type: 'string'
        },
        orderConfirmedEmail:{
            type: 'string'
        },
        orderFulfilledEmail:{
            type: 'string'
        },
        orderRefundEmail:{
            type: 'string'
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
            type: 'string'
        }
    }
};

