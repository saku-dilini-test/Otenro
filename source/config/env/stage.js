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
        connection: 'developmentMongodbServer'
    },
    port: 1338,
    log: {
        level: "debug"
    },
    KEYWORD_LENGTH: 5,
    /** ****** Custom Config ****** **/
    // HOST URL
    HOST_URL: 'http://173.82.153.215:1338',
    // ME SERVER Config
    ME_SERVER_URL: 'http://173.82.153.215:80/meServer/temp/',
    ME_SERVER: '/var/www/html/meServer/temp/',
    ME_SERVER_PORT: 80,
    // APP FILE SERVER Config
    APP_FILE_SERVER: '/var/www/html/meServer/temp/',
    CLIENT_SECRET: '44f4f3be572ec33711a40a5b8b4',
    TEMPLATES_PATH: '/home/Otenro/initData/templates/',
    PROGRESSIVE_TEMPLATES_PATH: '/home/Otenro/initData/distribution/',
    REDIRECT_URL: 'http://173.82.153.215:1338',
    ANDROID_APK_BUILD_ZIPALIGN_PATH: '/opt/android-sdk/build-tools/26.0.2/zipalign',//Use to do the zipalign when building android apk.
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
    IDEABIZ_EMAIL: 'heshan@simatosolutions.com',
    IDEABIZ_GROUP_EMAIL: 'heshan@simatosolutions.com', //To email for dialog super user, when sending approval email for the app configured with the serviceID by Admin.
    IDEABIZ_ADMIN_EMAIL: 'heshan@simatosolutions.com', //From email address of Admin to send serviceID approval email to dialog super user.
    SUPPORT_USER_EMAIL: 'chamilster@gmail.com',//'support@appmaker.lk' //Simato Support user
    /**
     * The ADMIN api and MO callbacks will call these
     */
    IDEABIZ_ADMIN_MO_CALLBACK_FORWARD_URLS : []
};