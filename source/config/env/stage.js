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
  KEYWORD_LENGTH : 5,
  /** ****** Custom Config ****** **/
  // HOST URL
  HOST_URL : 'http://173.82.153.215:1338',
  // ME SERVER Config
  ME_SERVER_URL : 'http://173.82.153.215:80/meServer/temp/',
  ME_SERVER : '/var/www/html/meServer/temp/',
  ME_SERVER_PORT : 80,
  // APP FILE SERVER Config
  APP_FILE_SERVER : '/var/www/html/meServer/temp/',
  CLIENT_SECRET : '44f4f3be572ec33711a40a5b8b4',
  TEMPLATES_PATH : '/home/Otenro/initData/templates/',
  PROGRESSIVE_TEMPLATES_PATH : '/home/Otenro/initData/progressiveTemplates/',
  REDIRECT_URL : 'http://173.82.153.215:1338',
};
