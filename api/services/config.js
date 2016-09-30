module.exports = {

    ME_SERVER: sails.config.ME_SERVER,
    APP_FILE_SERVER: sails.config.APP_FILE_SERVER,

    server: {
        host : sails.config.HOST_URL,
        port : sails.config.port
    },

    ME_PORT : sails.config.ME_SERVER_PORT,

    PUSH_API_URL : "https://api.ionic.io/push/notifications"
};
