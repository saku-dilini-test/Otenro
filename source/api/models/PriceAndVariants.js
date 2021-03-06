/**
 * ThirdNavigation.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    schema: true,

    attributes: {
       appId  : {
       type: 'string',
       required: true
       },
       productId: {
       type: 'string'
       },
       childId: {
       type : 'string',
       required: true
       },

       proType:{
       type : 'string',
       },

       name: {
       type : 'string',
       },

       weight:{
       type : 'string',
       },

       size:{
       type : 'string',
       },

       price: {
       type : 'integer',
       },

       quantity: {
       type : 'integer',
       },
       fileUrl: {
          type : 'string',
       },

    }
}