/**
 * Template.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    schema: true,
    attributes: {
        category_name: {
            type: 'string'
        },
        imageUrl: {
            type: 'string'
        }
    }
    /*,seedData: [
        {
            category_name: 'Business',
            imageUrl: 'resturant/codecanyon.png'
        }, {
            category_name: 'Port Folio',
            imageUrl: 'resturant/codecanyon.png'
        }, {
            category_name: 'Media',
            imageUrl: 'resturant/codecanyon.png'
        }

    ]*/
};