/**
 * Created by shamilasallay on 24/11/2016.
 */
//This is only to check the uniqueness of the sku
 module.exports = {
    schema: true,
    attributes: {
        userId:{
            type: 'string',
            required: true
        },
        productId:{
            type: 'string',
            required: true
        },
        appId:{
            type: 'string',
            required: true
        },
        sku:{
            type: 'array',
            required: true
        }
    }
 }