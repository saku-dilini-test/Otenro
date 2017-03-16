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
            type : 'integer'
        },
        quantity : {
            type : 'integer'
        },
        sale : {
            type : 'integer'
        },
        sku : {
            type : 'string'
        },
        product : {
            model : 'thirdnavigation'
        },
        discount : {
            type : 'integer'
        },
        createAt: {
            type: 'date'
        }
    },
    seedData : [
        {
            name : 'perfume',
            price: 1500,
            quantity: '100',
            sale: 1000,
            sku: '#1536',
            discount: 10
        }
    ]
};

