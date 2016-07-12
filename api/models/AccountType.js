/**
 * Template.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    schema: true,
    attributes: {
        accountType:{
            type: 'string'
        },
        accountTypeId: {
            type: 'integer'
        }
    },
    seedData: [
        {
            accountType: 'Free Beta',
            accountTypeId: 1
        }, {
            accountType: 'Standard',
            accountTypeId: 2
        }, {
            accountType: 'Corporate',
            accountTypeId: 3
        },

    ]
};

