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
    port: 1337,
    log: {
        level: "debug"
    },

    /** ****** Custom Config ****** **/
    // HOST URL
    KEYWORD_LENGTH : 5,
    HOST_URL : 'http://192.168.8.112:1337',
    // ME SERVER Config
    ME_SERVER_URL : 'http://192.168.8.112:80/meServer/temp/',
    ME_SERVER : '/Library/WebServer/Documents/meServer/temp/',
    ME_SERVER_PORT : 80,
    // APP FILE SERVER Config
    APP_FILE_SERVER : '/Users/chamilthushantha/Desktop/appFileServer/',
    CLIENT_SECRET : '44f4f3be572ec33711a40a5b8b4',
    TEMPLATES_PATH : '/Users/chamilthushantha/Projects/Otenro/initData/templates/',
    PROGRESSIVE_TEMPLATES_PATH : '/Users/chamilthushantha/Projects/Otenro/initData/distribution/',
    REDIRECT_URL : 'http://192.168.8.112:1337',
    ANDROID_APK_BUILD_ZIPALIGN_PATH: '/Users/chamilthushantha/Library/Android/sdk/build-tools/27.0.3/zipalign',//Use to do the zipalign when building android apk.
    ANDROID_VERSION : 25,
    isBeta: 0,//change isBeta to 0 after beta period
    USE_SENDMAIL: false,//This is use to send emails via Sendmail transporter or configured SMTP server.If true, will use the Sendmail.

    //IdeaBiz
    IDEABIZ_AUTH_CONSUMER_KEY: 'fmqgPhGyJ6KFvsLe6cpgxPzlXcca',
    IDEABIZ_AUTH_CONSUMER_SECRET: 'NZ7OQjZ2yCqsin7kxjbGpUlBsska',
    IDEABIZ_AUTH_USERNAME: 'Appmaker',
    IDEABIZ_AUTH_PASSWORD: 'SUperman123',
    IDEABIZ_EMAIL: '123@gmail.com',//'support@appmaker.lk',
    IDEABIZ_GROUP_EMAIL: '123@gmail.com',//'support@appmaker.lk', //To email for dialog super user, when sending approval email for the app configured with the serviceID by Admin.
    IDEABIZ_ADMIN_EMAIL: '123@gmail.com',//'communications@otenro.com' //From email address of Admin to send serviceID approval email to dialog super user.
    SUPPORT_USER_EMAIL: '123@gmail.com',//'support@appmaker.lk' //Simato Support user
    SIMATO_SUPPORT: '123@gmail.com',
    IDEABIZ_SUPER_ADMIN_EMAIL: 'support@appmaker.lk',// should be changed to admin@ideamart.io
    IDEABIZ_SUPPORT_EMAIL: 'ideadroidsupport@simatosolutions.com',// publish app TO email
    IDEABIZ_APP_GENERATOR_EMAIL: 'apkgenerator@simatosolutions.com',// Build success/failed FROM email
    /**
     * The ADMIN api and MO callbacks will call these
     */
    IDEABIZ_ADMIN_MO_CALLBACK_FORWARD_URLS : []
};
