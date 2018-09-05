/**
 * RenewalAppUser.js
 */

module.exports = {
    schema: true,

    attributes: {

        msisdn:{
            type: 'string'
        },
        appId:{
            type: 'string'
        },
        nextPaymentDate:{
            type:'string'
        },
        nextPromptDate:{
            type:'string'
        }
    }
};