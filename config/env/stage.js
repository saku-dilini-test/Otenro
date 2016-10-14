/**
 * Created by amila on 8/11/16.
 */

/**
 * stage environment settings
 *
 * This is custom stage environment setting 
 *
 * */

module.exports = {
    
    models: {
        connection: 'developmentMongodbServer'
    },
    port: 1337,
    log: {
        level: "debug"
    },

    /** ****** Custom Config ****** **/
    // HOST URL
    HOST_URL : 'http://192.168.8.203',
    // ME SERVER Config
    ME_SERVER : '/home/onbitlabs/meServer/temp/',
    ME_SERVER_PORT : 8080,
    // APP FILE SERVER Config
    APP_FILE_SERVER : '/home/onbitlabs/appFileServer/',
    CLIENT_SECRET : 'stage44f4f3be572ec33711a40a5b8b4789'
};