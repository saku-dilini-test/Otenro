/**
 * Template.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    schema: true,
    attributes: {
        operator_code:{
            type: 'array'
        },
        operator: {
            type: 'String'
        }
    },

    seedData: [
        /* 1 */
        {
            "operator_code" : [
                9471,
                9470
            ],
            "operator" : "mobitel"
        },

        /* 2 */
        {
            "operator_code" : [
                9477,
                9476
            ],
            "operator" : "dialog"
        },

        /* 3 */
        {
            "operator_code" : [
                9478
            ],
            "operator" : "hutch"
        },

        /* 4 */
        {
            "operator_code" : [
                9475
            ],
            "operator" : "airtel"
        }

    ]
};

