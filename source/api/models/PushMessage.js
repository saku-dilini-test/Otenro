


module.exports = {
schema: true,

        attributes: {
                userId:{
                type: 'string',
                required: true
                },
                appId:{
                    type:'string',
                    required: true
                },
                message:{
                    type: 'string'
                },
                date:{
                    type: 'string'
                },
                type:{
                    type: 'string'
                },
                id:{
                  type:'ObjectId'
                },
                article:{
                  type: 'json'
                },
                status:{
                    type: 'string'
                },
                isScheduled:{
                    type: 'boolean',
                    defaultsTo: false
                }
        }
}