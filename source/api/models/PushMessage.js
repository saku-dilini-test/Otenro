


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

        }
}