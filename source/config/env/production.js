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

  port: 1338,

  // ssl: {
  //   ca: require('fs').readFileSync(__dirname + '/ssl/ca_bundle.crt'),
  //   key: require('fs').readFileSync(__dirname + '/ssl/private.key'),
  //   cert: require('fs').readFileSync(__dirname + '/ssl/certificate.crt')
  // },

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  log: {
    level: "debug"
  },
  
  /** ****** Custom Config ****** **/
  // HOST URL 
  HOST_URL : 'http://173.82.243.121:1338',
  // ME SERVER Config
  ME_SERVER_URL : 'http://developer.appmaker.lk:8181/meServer/temp/',
  ME_SERVER : '/home/milhan/public_html/developer/meServer/temp/',
  ME_SERVER_PORT : 80,
  // APP FILE SERVER Config
  APP_FILE_SERVER : '/home/milhan/public_html/developer/appFileServer/',
  CLIENT_SECRET : 'pro44f4f3be572ec33711a40a5b8b4789',
  TEMPLATES_PATH : '/home/Ideadroid/Otenro/initData/templates/',
  PROGRESSIVE_TEMPLATES_PATH : '/home/Ideadroid/Otenro/initData/progressiveTemplates/',
  REDIRECT_URL : 'http://173.82.243.121:1338',
  /**
   * change isBeta to 0 after beta period
   **/
  isBeta: 1

};
