/**
 * ThirdNavigation.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    schema: true,

    attributes: {

        name : {
            type: 'string'
        },
        appId  : {
            type: 'string',
            required: true
        },
        mainId:{
            type : 'string',
        },
        childId: {
            type : 'string',
//            required: true
        },
        briefDesc:{
            type : 'string',
        },
        detailedDesc:{
            type : 'string',
        },
        desc: {
            type: 'string'
        },
        imageUrl: {
            type: 'string'
        },
        discount : {
            type: 'string'
        },
        type : {
            type: 'string'
        },
        createdDate: {
            type: 'string'
        }
    }
};