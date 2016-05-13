/**
 * Template.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    schema: true,
    attributes: {
        category_name:{
            type: 'string'
        },
        templateCategory: {
            type: 'string'
        }
    },
    seedData: [
        {
            category_name : 'Business',
            templateCategory : '1'
            },{
                category_name : 'Port Folio',
                templateCategory : '2'
            },{
            category_name : 'Media',
            templateCategory : '3'
        }

    ]
};

