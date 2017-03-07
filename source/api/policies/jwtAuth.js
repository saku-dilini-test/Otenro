
var JWT = require('jsonwebtoken'),
    config = require('../services/config');

module.exports = function(req,res,next){

  if(!req.headers.authorization) return handleError(res);
  var token = req.headers.authorization.split(' ')[1];
  JWT.verify(token, config.CLIENT_SECRET, function(err, decoded) {
    if(err){
      err = {
        name: 'TokenExpiredError',
        message: 'Session is expired',
      };
      return handleError(res,err);
    }
    req.userId = decoded.id;
    next();
  });
 };

function handleError (res,err){
  return res.status(401).send(err)
}
