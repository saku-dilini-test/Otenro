
var JWT = require('machinepack-jwt');

module.exports = function(req,res,next){

  if(!req.headers.authorization) return handleError(res);
  var token = req.headers.authorization.split(' ')[1];
  JWT.decode({
    secret: '17ca644f4f3be572ec33711a40a5b8b4',
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
