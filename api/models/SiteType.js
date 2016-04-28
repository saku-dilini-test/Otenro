/**
 * SiteType.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

 module.exports = {

     schema: true,
     attributes: {
            siteType:{
                type: 'string'
            }
     },
     seedData: [
             {
                 siteType : 'Option1',
             },
             {
                 siteType : 'Option2',
             }
     ]
 };
