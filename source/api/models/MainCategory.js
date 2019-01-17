/**
 * MainCategory.js
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
        templateName:{
            type: 'string'
        },
        appId  : {
            type: 'string',
            //required: true
        },
        mainId: {
            type : 'string',
            //required: true
        },
        desc: {
            type: 'string'
        },
        imageUrl: {
            type: 'string'
        },
        enteredBy: {
            type: 'string'
        },
        createdDate: {
            type: 'date'
        },
        parentId:{
            type: 'string'
        },
        nodes:{
            type:'json'
        },
        index: {
            type: 'integer'
        },
        treeLevel: {
            type: 'integer'
        },
        isMainCategory: {
            type: 'boolean',
            defaultsTo: false
        },
        isFeaturedCategory: {
            type: 'boolean',
            defaultsTo: false 
        }
    }
};
