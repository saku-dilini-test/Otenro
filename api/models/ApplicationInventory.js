/**
 * ApplicationInventory.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    schema: true,

    attributes: {

        appId : {
            type: 'string'
        },
        name  : {
            type: 'string'
        },
        price : {
            type : 'string'
        },
        quantity : {
            type : 'string'
        },
        sale : {
            type : 'string'
        },
        sku : {
            type : 'string'
        },
        discount : {
            type : 'string'
        },
        createAt: {
            type: 'date'
        }
    },
    seedData : [
        {
            name : 'perfume',
            price: 'Rs 1500',
            quantity: '100',
            sale: 'YES',
            sku: '#1536',
            discount: 'Rs 1000'
        }
    ]
};


