


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
        language:{
            type: 'string'
        },
        primaryCategory:{
            type: 'string'
        },
        secondaryCategory:{
            type: 'string'
        },
        description:{
            type: 'string'
        },
        keywords:{
            type: 'string'
        },
        file:{
            type:'string'
        },
        createdDate:{
            type: 'date'
        },
    }
};