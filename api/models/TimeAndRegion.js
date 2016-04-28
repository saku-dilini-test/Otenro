/**
 * TimeAndRegion.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

 module.exports = {

     schema: true,
     attributes: {
            timeAndRegion:{
                type: 'string'
            }
     },
     seedData: [
             {
                 timeAndRegion : 'Option1',
             },
             {
                 timeAndRegion : 'Option2',
             }
     ]
 };
