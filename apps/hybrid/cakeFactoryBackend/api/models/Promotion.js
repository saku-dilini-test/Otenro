/**
 * Promotion.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    promotionId : String,
    name : String,
    desc : String,
    logoUrl : String
  },
  seedData: [
    {
      promotionId : '2016P001',
      name : 'Get extra cake',
      desc : 'If you buy two large cake, get extra min cake'
    }
  ]
};

