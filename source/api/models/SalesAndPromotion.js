/**
 * Created by prasanna on 12/23/16.
 */
/**
 * Sals&promotion.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    schema: true,
    attributes: {

        appId : {
            type: 'string'
        },
        salesAndPromotionType: {
            type: 'string'
        },
        discountType:{
            type: 'string'
        },
        name:{
            type: 'string'
        },
        discount:{
            type: 'float'
        },
        discountPercent:{
            type: 'float'
        },
        dateFrom : {
            type: 'string'
        },
        dateTo : {
            type: 'string'
        },
        isLimitUsers : {
            type: 'boolean'
        },
        limitUsers : {
            type: 'integer'
        },
        isLimitNumberOfTime : {
            type: 'boolean'
        },
        limitNumberOfTime : {
            type: 'integer'
        },
        isTermsAndCondition : {
            type: 'boolean'
        },
        termsAndCondition : {
            type: 'string'
        },
        promoCode : {
            type:'string'
        },
        minimumOderValue : {
            type:'string'
        },
        category : {
            type:'string'
        },
        selectedProduct : {
            type : 'json'
        }
    }
};