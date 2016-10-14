
var JWT = require('machinepack-jwt'),
    config = require('../services/config');

module.exports = function(req,res,next){

  if(!req.headers.authorization) return handleError(res);
  var token = req.headers.authorization.split(' ')[1];
  JWT.decode({
    secret: config.CLIENT_SECRET,
    token: token
  }).exec({
    error: function (err){
      return handleError(res);
    },
    success: function (result){
      req.userId=result.id;
      next();
    }
  });
 };

function handleError (res){
  return res.status(401).send({  error : "You are not Authorized" })
}
