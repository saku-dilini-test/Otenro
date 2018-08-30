


module.exports = {

    schema: true,

    attributes: {

        appName:{
            type: 'string'
        },
        appId:{
            type: 'string'
        },
        type:{
            type: 'string'
        },
        caaTaxable:{
            type: 'boolean'
        },
        date:{
            type: 'string'
        },
        operator:{
            type: 'string'
        },
        platformEarning:{

            type: 'float'
        },
        spEarning:{
            type: 'float'
        },
        appTotRevenue : {
            type: 'float'
        },
        appTrafficCount:{
            type: 'Integer'
        },
        subscriptionCount:{
            type:'Integer'
        },
        unSubscriptionCount:{
            type:'Integer'
        },
        totSubs :{
            type:'Integer'
        }


    }


};
