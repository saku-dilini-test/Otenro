/**
 * Languages.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

 module.exports = {

     schema: true,
     attributes: {
            language:{
                type: 'string'
            }
     },
     seedData: [
             {
                 language : 'English',
             },
             {
                 language : 'French',
             },
             {
                 language : 'Italian',
             },
     ]
 };
