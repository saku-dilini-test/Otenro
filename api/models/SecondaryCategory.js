/**
 * SecondaryCategory.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

 module.exports = {

     schema: true,
     attributes: {
            category:{
                type: 'string'
            }
     },
     seedData: [
             {
                 category : 'Coffees'
             },
             {
                 category : 'Movies'
             },
             {
                 category : 'Food and Drink'
             },
             {
                 category : 'Games'
             },
             {
                category : 'Books'
             }
     ]
 };
