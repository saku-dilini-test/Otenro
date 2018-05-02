module.exports = {

    ME_SERVER: sails.config.ME_SERVER,
    ME_SERVER_URL: sails.config.ME_SERVER_URL,
    APP_FILE_SERVER: sails.config.APP_FILE_SERVER,

    server: {
        host : sails.config.HOST_URL,
        port : sails.config.port
    },

    ME_PORT : sails.config.ME_SERVER_PORT,
    CLIENT_SECRET:sails.config.CLIENT_SECRET,
    TEMPLATES_PATH :sails.config.TEMPLATES_PATH,
    PROGRESSIVE_TEMPLATES_PATH :sails.config.PROGRESSIVE_TEMPLATES_PATH,

    PUSH_API_URL : 'https://fcm.googleapis.com/fcm/send',
    AUTHORIZATION : 'key=AAAAJ4YjgQI:APA91bH-TmfU_nC3oKelw9ramCmDN5Mx1MllS3NeMvfJxcHvh-rIvPxqBlC782UU9DO8jrU9qV5hzzPDN1isyCVzhmLyhS7hZQZg_ZQHtoDFZHxMQI3GSp1PqeeVdbn4QccdcQh35uk9',

    KEYWORD_LENGTH: sails.config.KEYWORD_LENGTH,

    IDEABIZ_ADMIN_API_ACTIONS: {
        'STATE_CHECK': 'STATE_CHECK',
        'HISTORY': 'HISTORY',
        'STATE_CHANGE': 'STATE_CHANGE'
    },
    IDEABIZ_SUBSCRIPTION_STATUS: {
        'SUBSCRIBED': {
            'code': 'SUBSCRIBED',
            'desc': 'Subscribed'
        },
        'UNSUBSCRIBED': {
            'code': 'UNSUBSCRIBED',
            'desc': 'Unsubscribed'
        }
    },
    APP_USER_STATUS: {
        'ACTIVE': 'A',
        'INACTIVE': 'I'
    }
};
