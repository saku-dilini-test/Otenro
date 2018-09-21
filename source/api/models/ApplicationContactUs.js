/**
 * ApplicationContactUs.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    schema: true,
    attributes: {
        appId:{
            type: 'string',
            required: true
        },
        address:{
            type: 'string'
        },
        telPhone:{
            type: 'string'
        },
        email:{
            type: 'string'
        },
        webSite: {
            type: 'string'
        },
        showmap: {
            type: 'boolean'
        },
        twitter: {
            type: 'string'
        },
        facebook: {
            type: 'string'
        },
        instagram: {
            type: 'string'
        },
        linkedin: {
            type: 'string'
        },
        pinterest: {
            type: 'string'
        },
        coords : {
            type : 'json'
        },
        weekDaysOpenHour: {
            type: 'integer'
        },
        weekDaysOpenMinute: {
            type: 'integer'
        },
        weekDaysCloseHour: {
            type: 'integer'
        },
        weekDaysCloseMinute: {
            type: 'integer'
        },
        saturdayOpenHour: {
            type: 'integer'
        },
        saturdayOpenMinute: {
            type: 'integer'
        },
        saturdayCloseHour: {
            type: 'integer'
        },
        saturdayCloseMinute: {
            type: 'integer'
        },
        sundayOpenHour: {
            type: 'integer'
        },
        sundayOpenMinute: {
            type: 'integer'
        },
        sundayCloseHour: {
            type: 'integer'
        },
        sundayCloseMinute: {
            type: 'integer'
        },
        createAt: {
            type: 'date',
            default: Date.now},
        updateAt: {
            type: 'date',
            default: Date.now
        },
        showOnWebsiteContact:{
            type: 'boolean'
        }
    }
};
