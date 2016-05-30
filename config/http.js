/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://links.sailsjs.org/docs/config/http
 */

var multipart = require('connect-multiparty');

module.exports.http = {

  middleware: {

    superBodyParser: function (req, res, next) {
      if(req.path.indexOf('addStyleImage') != -1){
        return require('body-parser')({ limit: 8248242 })(req, res, next);
      }
      else {
        require('skipper');
        return next();
      }
    },

    order: [
      'startRequestTimer',
      'cookieParser',
      'session',
      'myRequestLogger',
      'superBodyParser',
      'bodyParser',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      'poweredBy',
      '$custom',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ],

    // The body parser that will handle incoming multipart HTTP requests.
    // By default as of v0.10, Sails uses [skipper](http://github.com/balderdashy/skipper).
    // See http://www.senchalabs.org/connect/multipart.html for other options.
    // bodyParser: require('skipper')

    myRequestLogger: function (req, res, next) {
      //console.log("Requested :::::: ", req.method, req.url);
      return next();
    }
  },

  // The number of seconds to cache flat files on disk being served by
  // Express static middleware (by default, these files are in `.tmp/public`)
  //
  // The HTTP static cache is only active in a 'production' environment,
  // since that's the only time Express will cache flat-files.
  cache: 31557600000
};
