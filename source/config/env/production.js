/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {
    hookTimeout: 420000,
    /***************************************************************************
     * Set the default database connection for models in the production        *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/

    models: {
        connection: 'productionMongodbServer'
    },

    /***************************************************************************
     * Set the port in the production environment to 80                        *
     ***************************************************************************/

    port: 1339,

    ssl: {
        ca: require('fs').readFileSync(__dirname + '/ssl/ca_bundle.crt'),
        key: require('fs').readFileSync(__dirname + '/ssl/private.key'),
        cert: require('fs').readFileSync(__dirname + '/ssl/certificate.crt')
    },

    /***************************************************************************
     * Set the log level in production environment to "silent"                 *
     ***************************************************************************/

    log: {
        level: "debug"
    },

    /** ****** Custom Config ****** **/
    // HOST URL
    HOST_URL: 'https://ideadroid.ideamart.io',
    // ME SERVER Config
    ME_SERVER_URL: 'https://ideadroidcdn.ideamart.io/developer/meServer/temp/',
    ME_SERVER: '/home/admin/web/ideadroidcdn.ideamart.io/public_html/developer/meServer/temp/',
    ME_SERVER_PORT: 80,
    // APP FILE SERVER Config
    APP_FILE_SERVER: '/home/admin/web/ideadroidcdn.ideamart.io/public_html/developer/appFileServer/',
    CLIENT_SECRET: 'pro44f4f3be572ec33711a40a5b8b4789',
    TEMPLATES_PATH: '/home/projects/ideadroid/Otenro/initData/templates/',
    PROGRESSIVE_TEMPLATES_PATH: '/home/projects/ideadroid/Otenro/initData/distribution/',
    REDIRECT_URL: 'https://ideadroid.ideamart.io',
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
    IDEABIZ_EMAIL: 'no_reply_ideadroid@appmaker.lk',
    IDEABIZ_GROUP_EMAIL: 'supermakeruser@gmail.com', //To email for dialog super user, when sending approval email for the app configured with the serviceID by Admin.
    IDEABIZ_ADMIN_EMAIL: 'appmakeruser@gmail.com', //From email address of Admin to send serviceID approval email to dialog super user.
    SUPPORT_USER_EMAIL: 'appmakeruser@gmail.com',//'support@appmaker.lk' //Simato Support user
      SIMATO_SUPPORT: 'appmakeruser@gmail.com',
/**
     * The ADMIN api and MO callbacks will call these
     */
    IDEABIZ_ADMIN_MO_CALLBACK_FORWARD_URLS : ['']
};