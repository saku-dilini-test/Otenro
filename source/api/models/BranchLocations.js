/**
 * ApplicationContactUs.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    schema: true,
    attributes: {
        appId:{
            type: 'string',
            required: true
        },
        name :{
            type:'string'
        },
        address :{
            type: 'string'
        },
        branch : {
            type : 'json'
        }
    }
};
