


module.exports = {

    schema: true,
    attributes: {
        userId:{
            type: 'string'
        },
        appId: {
            type: 'string',
            required: true
        },
        name:{
            type: 'string'
        },
        springBoardName:{
            type: 'string'
        },
        createdDate:{
            type: 'date'
        }
    }
};