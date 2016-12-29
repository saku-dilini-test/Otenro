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
  HOST_URL : 'http://localhost',
  // ME SERVER Config 
  ME_SERVER : '/var/www/html/meServer/temp/',
  ME_SERVER_PORT : 80,
  // APP FILE SERVER Config
  APP_FILE_SERVER :'/home/prasanna/Desktop/appFileServer/',
  CLIENT_SECRET : '44f4f3be572ec33711a40a5b8b4'
};
