/**
 * This is use to create JWT for mobile users to access some of the secured api(s).
 * This toke set to never expire.
 */
var JWT = require('jsonwebtoken'),
    moment = require('moment'),
    config = require('./config');

module.exports = function(user,callback){
    var payload =  {
        id :  user.appId,
        msisdn:  user.msisdn,
        exp: moment().add(1,'day').unix()
    };

    JWT.sign(
        payload,
        config.CLIENT_SECRET,
        { algorithm: 'HS256' },
        function(err, token) {
            if(err){
                sails.log.error('jwt.mobile: Error while generating the token for payload %s err:',user.msisdn,err);
                return callback(null);
            }
            sails.log.debug('jwt.mobile: new token is:',token);
            return callback({token: token});
        }
    );
};
