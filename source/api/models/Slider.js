module.exports = {

    schema: true,

    attributes: {

        appId : {
            type: 'string',
            required: true
        },
        _id : {
            type : 'objectid'
        },
        name : {
            type: 'string',
            required: true
        },
        imageUrl : {
            type : 'string',
            required: true
        },
        optionals : {
            type : 'json'
        }

    }
};
