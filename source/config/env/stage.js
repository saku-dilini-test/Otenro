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
  hookTimeout: 90000,
  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  models: {
    connection: 'stagingMongodbServer'
  },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  port: 1338,

  ssl: {
    ca: require('fs').readFileSync(__dirname + '/ssl/ca_bundle.crt'),
    key: require('fs').readFileSync(__dirname + '/ssl/private.key'),
    cert: require('fs').readFileSync(__dirname + '/ssl/certificate.crt')
  },

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  log: {
    level: "silent"
  },

  /** ****** Custom Config ****** **/
  // HOST URL
  HOST_URL : 'https://dashboard.otenro.com',
  // ME SERVER Config
  ME_SERVER_URL : 'https://testcdn.otenro.com/temp/',
  ME_SERVER : '/home/admin/web/testcdn.otenro.com/public_html/temp/',
  ME_SERVER_PORT : 8081,
  // APP FILE SERVER Config
  APP_FILE_SERVER : '/home/otenro/OtenroTest/appFileServer/',
  CLIENT_SECRET : 'pro44f4f3be572ec33711a40a5b8b4789',
  TEMPLATES_PATH : '/home/otenro/OtenroTest/Otenro/initData/templates/',
  PROGRESSIVE_TEMPLATES_PATH : '/home/otenro/OtenroTest/Otenro/initData/distribution/',
  REDIRECT_URL : 'https://dashboard.otenro.com'

};
