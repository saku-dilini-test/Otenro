/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

    /***************************************************************************
     * Set the default database connection for models in the development       *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/

    models: {
        connection: 'stagingMongodbServer'
    },
    port: 1339,
    log: {
        level: "debug"
    },
    /** ****** Custom Config ****** **/
    // HOST URL
    HOST_URL: 'http://appmaker.ddns.net',
    // ME SERVER Config
    ME_SERVER_URL: 'http://appmaker.ddns.net:8082/developer/meServer/temp/',
    ME_SERVER: '/var/www/html/developer/meServer/temp/',
    ME_SERVER_PORT: 80,
    // APP FILE SERVER Config
    APP_FILE_SERVER: '/var/www/html/developer/appFileServer/',
    CLIENT_SECRET: 'pro44f4f3be572ec33711a40a5b8b4789',
    TEMPLATES_PATH: '/home/projects/appmaker/Otenro/initData/templates/',
    PROGRESSIVE_TEMPLATES_PATH: '/home/projects/appmaker/Otenro/initData/distribution/',
    REDIRECT_URL: 'http://appmaker.ddns.net',
    ANDROID_APK_BUILD_ZIPALIGN_PATH: '/opt/android-sdk/build-tools/26.0.2/zipalign',
    ANDROID_VERSION : 26,

    /**
     * change isBeta to 0 after beta period
     **/
    isBeta: 0,
    //IdeaBiz
    IDEABIZ_AUTH_CONSUMER_KEY: 'fmqgPhGyJ6KFvsLe6cpgxPzlXcca',
    IDEABIZ_AUTH_CONSUMER_SECRET: 'NZ7OQjZ2yCqsin7kxjbGpUlBsska',
    IDEABIZ_AUTH_USERNAME: 'Appmaker',
    IDEABIZ_AUTH_PASSWORD: 'SUperman123',
    IDEABIZ_EMAIL: 'appmakeruser@gmail.com',
    IDEABIZ_GROUP_EMAIL: 'appmakeruser@gmail.com', //To email for dialog super user, when sending approval email for the app configured with the serviceID by Admin.
    IDEABIZ_ADMIN_EMAIL: 'appmakeruser@gmail.com', //From email address of Admin to send serviceID approval email to dialog super user.
    SUPPORT_USER_EMAIL: 'appmakeruser@gmail.com',//'support@appmaker.lk' //Simato Support user
    /**
     * The ADMIN api and MO callbacks will call these
     */
    IDEABIZ_ADMIN_MO_CALLBACK_FORWARD_URLS : ['http://192.168.8.112:1337']
};