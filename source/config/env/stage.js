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
    HOST_URL : 'http://192.168.8.56:1337',
    // ME SERVER Config
    ME_SERVER_URL : 'http://192.168.8.56:80/temp/',
    ME_SERVER : '/home/admin/web/otenro.meserver.local.com/public_html/temp/',
    ME_SERVER_PORT : 80,
    // APP FILE SERVER Config
    APP_FILE_SERVER : '/home/otenro/appFileServer/',
    CLIENT_SECRET : 'stage44f4f3be572ec33711a40a5b8b4789',
    TEMPLATES_PATH : '/home/prasanna/project/Otenro/initData/templates/'
};