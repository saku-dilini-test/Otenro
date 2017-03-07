/**
 * Created by prasanna on 7/12/16.
 */

module.exports = {
schema: true,
    attributes: {
    appId: {
        type: 'string',
            required: true
    },
    header: {
        type: 'string'
    },
    content: {
        type: 'string'
    },
    createAt: {
        type: 'date',
    default: Date.now
    },
    updateAt: {
        type: 'date',
    default: Date.now
    }
 }
};