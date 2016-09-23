/**
 * YourselfReason.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema : true,
  attributes : {
    reason : {
      type : 'string'
    }
  },
  seedData: [
    {
      reason : 'Already Selling'
    },
    {
      reason : 'Just Playing Around'
    },
    {
      reason : 'Just Starting To Sell'
    }
  ]
};

