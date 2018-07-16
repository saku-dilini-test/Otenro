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
  HOST_URL : 'http://localhost:1337',
  // ME SERVER Config
  ME_SERVER_URL : 'http://localhost:80/meServer/temp/',
  ME_SERVER : '/var/www/html/meServer/temp/',
  ME_SERVER_PORT : 80,
  // APP FILE SERVER Config
  APP_FILE_SERVER : '/home/dilakshan/Desktop/appFileServer/',
  CLIENT_SECRET : '44f4f3be572ec33711a40a5b8b4',
  TEMPLATES_PATH : '/home/dilakshan/Desktop/Otenro/initData/templates/',
  PROGRESSIVE_TEMPLATES_PATH : '/home/dilakshan/Desktop/Otenro/initData/progressiveTemplates/',
  REDIRECT_URL : 'http://localhost:1337',
  /**
   * change isBeta to 0 after beta period
   **/
  isBeta: 0,
  //IdeaBiz
  IDEABIZ_AUTH_CONSUMER_KEY: 'fmqgPhGyJ6KFvsLe6cpgxPzlXcca',
  IDEABIZ_AUTH_CONSUMER_SECRET: 'NZ7OQjZ2yCqsin7kxjbGpUlBsska',
  IDEABIZ_AUTH_USERNAME: 'Appmaker',
  IDEABIZ_AUTH_PASSWORD: 'SUperman123',
    IDEABIZ_EMAIL: 'support@appmaker.lk',
    IDEABIZ_GROUP_EMAIL: 'support@appmaker.lk' //To email for dialog super user, when sending approval email for the app configured with the serviceID by Admin.
};
