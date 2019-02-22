/**
 * This is use to keep track of the user unsubscriptions when the end user try to register without an UUID in the message body.
 * If the user sends an sms to register without UUID i.e. "start horo" then the system will unregister the user.Will keep a log in this collection.
 */

module.exports = {

    schema: true,
    attributes: {
        msisdn: {
            type: 'String'
        },
        message : {
            type: 'string'
        }
    }

};


