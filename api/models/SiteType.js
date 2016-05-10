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
                 siteType : 'Ecommerce',
             },
             {
                 siteType : 'Business',
             },
             {
                 siteType : 'NGO',
             },
             {
                 siteType : 'Media',
             },
             {
                siteType : 'Artist',
             }
     ]
 };
