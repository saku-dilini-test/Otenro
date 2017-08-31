/**
 * Template.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    schema: true,
    attributes: {
        adagentname:{
          type: 'string'
        },
        reqparams:{
            type: 'string'
        },
        returnurl:{
            type: 'string'
        },
        clickid:{
            type: 'string'
        },
        affid: {
            type: 'string'
        }
    }
};

