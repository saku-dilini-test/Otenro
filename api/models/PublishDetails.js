


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
        category :{
            type: 'string'
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
        copyrights:{
            type: 'string'
        },
        marketingUrl:{
            type: 'string'
        },
        privacyPolicyUrl:{
            type: 'string'
        },
        supportUrl:{
            type: 'string'
        },
        createdDate:{
            type: 'date'
        },
    }
};