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

    PUSH_API_URL : "https://api.ionic.io/push/notifications",

    APP_HEADER_INITIAL_DATA : {
        MAX_CHARACTER_COUNT : {
            POWER_HOUSE : 58,
            STYLE_TO_SHOP: 68
        },
        POLICIES_CHARACTER_COUNT: 8,
        ABOUT_US_CHARACTER_COUNT: 8,
        CONTACT_US_CHARACTER_COUNT: 10,
        NON_FEATURED_DROPDOWN_LABEL: {
            POWER_HOUSE: 'Other',
            STYLE_TO_SHOP: 'Other'
        }
    },
    SALES_AND_PROMOTIONS_STATUS: {
        ACTIVE: 'ACTIVE',
        EXPIRED: 'EXPIRED', 
        SCHEDULED: 'SCHEDULED'
    },
    USE_SEND_MAIL:false
};
