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
  hookTimeout: 220000,
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
  HOST_URL : 'https://developer.appmaker.lk',
  // ME SERVER Config
  ME_SERVER_URL : 'https://cdn.appmaker.lk/developer/meServer/temp/',
  ME_SERVER : '/home/admin/web/cdn.appmaker.lk/public_html/developer/meServer/temp/',
  ME_SERVER_PORT : 80,
  // APP FILE SERVER Config
  APP_FILE_SERVER : '/home/admin/web/cdn.appmaker.lk/public_html/developer/appFileServer/',
  CLIENT_SECRET : 'pro44f4f3be572ec33711a40a5b8b4789',
  TEMPLATES_PATH : '/home/projects/appmaker/Otenro/initData/templates/',
  PROGRESSIVE_TEMPLATES_PATH : '/home/projects/appmaker/Otenro/initData/progressiveTemplates/',
  REDIRECT_URL : 'https://developer.appmaker.lk',
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
