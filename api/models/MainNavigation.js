/**
 * MainMenu.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    schema: true,
    attributes: {
        userId:{
            type: 'string'
        },
        appId: {
            type: 'string',
            required: true
        },
        name:{
            type: 'string'
        },
        icon:{
            type: 'string'
        },
        link:{
            type: 'string'
        },
        createdDate:{
            type: 'date'
        }
    }
};

