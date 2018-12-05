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
        mainId:{
            type : 'string',
        },
        childId: {
            type : 'string',
//            required: true
        },
        selectedCategories: {
            type : 'json',
        },
        name : {
            type: 'string'
        },
        detailedDesc:{
            type : 'string',
        },
        variants:{
            type: 'json'
        },
        desc: {
            type: 'string'
        },
        imageUrl: {
            type: 'string'
        },
        selection: {
            type: 'json'
        },
        tempImageArray : {
            type : 'json'
        },
        discount : {
            type: 'string'
        },
        type : {
            type: 'string'
        },
        mainType:{
            type: 'string'
        },
        published : {
            type: 'string'
        },
        enteredBy : {
            type: 'string'
        },
        createdDate: {
            type: 'string'
        },
        defaultImage:{
            type : 'integer'
        },
        selectedSku:{
            type: 'json'
        },
        bannerImage:{
            type : 'string'
        }
    }
};