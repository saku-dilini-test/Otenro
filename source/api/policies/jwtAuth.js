
var JWT = require('jsonwebtoken'),
    config = require('../services/config');

module.exports = function(req,res,next){

  if(!req.headers.authorization) return handleError(res);
  var token = req.headers.authorization.split(' ')[1];
  JWT.verify(token, config.CLIENT_SECRET, function(err, decoded) {
    if(err){
      console.log('jwtAuth: Error: name=%s message=%s', err.name, err.message);
      var response = {
        name: err.name,
        message: err.message,
      };

      return handleError(res,response);
    }
    req.userId = decoded.id;
    next();
  });
 };

function handleError (res,err){
  return res.status(401).send(err)
}
