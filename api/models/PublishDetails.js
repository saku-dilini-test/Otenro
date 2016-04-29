


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
        splash1:{
            type:'string'
        },
        splash2:{
            type:'string'
        },
        splash3:{
            type:'string'
        },
        splash4:{
            type:'string'
        },
        createdDate:{
            type: 'date'
        },
    }
};