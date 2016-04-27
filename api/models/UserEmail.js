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
        replayToEmail:{
            type: 'string'
        },
        alertEmail:{
            type: 'string'
        },
        alertAt:{
            type: 'string'
        },
        orderConfirmEmail:{
            type: 'string'
        },
        orderFulFilled:{
            type: 'string'
        },
        orderRefundEmail:{
            type: 'string'
        },
        header:{
            type: 'string'
        },
        footer:{
            type: 'string'
        }
    }
};

