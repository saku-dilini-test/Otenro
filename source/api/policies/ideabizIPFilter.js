/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: This policy will restrict these end points to access only the ip addresses in the ip pool
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */

const config = require('../services/config');
const ipPool = ['192.168.8.112','127.0.0.1','202.69.200.34','172.31.30.204'];
const prefixIPv4 = '::ffff:';

module.exports = function(req, res, next) {

  sails.log.debug('ideabizIPFilter:Incoming ip:%s url:%s',req.ip,req.url);

  // User is allowed, proceed to the next policy or controller if IDEABIZ_IP_POOL_ENABLED is false
  if (!config.IDEABIZ_IP_POOL_ENABLED) {
    return next();
  }

  // User is allowed, proceed to the next policy or controller if the ip is in the pool,
  if (isExists(req.ip)) {
    return next();
  }
  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  sails.log.error('You ip: %s is not allowed to access this endpoint.Please put your ip in the ipPool array in the ideabizIPFilter.js file.', req.ip);
  return res.forbidden('You are not permitted to perform this action.');
};

const isExists = (ipString) => {
  let ip = '::1';//localhost

  if(ip===ipString){
    return true;
  }else if(ipString.indexOf(prefixIPv4) > -1){//IPv4
    ip = ipString.substring(ipString.indexOf(prefixIPv4) + prefixIPv4.length)
    sails.log.debug('ideabizIPFilter:ip:%s',ip);
    return ipPool.indexOf(ip) > -1;
  }
  //IPv6
  return ipPool.indexOf(ipString) > -1;
}