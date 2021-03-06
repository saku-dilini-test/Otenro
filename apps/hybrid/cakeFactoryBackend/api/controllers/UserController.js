/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var JWT = require('machinepack-jwt'),
  GoogleAPIsOAuth2v2 = require('machinepack-googleapisoauth2v2'),
  Facebook = require('machinepack-facebook'),
  request = require('request'),
  config = require('../services/config');

module.exports = {

  create: function (req, res) {

    var userId = req.body.user_id;
    return res.json(200,{err: 'failed'});
    //User.findOne({user_id:userId}).exec(function find(err, result) {
    //  if (err) {
    //    return res.status(err.status).json({err: err.message});
    //  }else {
    //    if (typeof result == 'undefined') {
    //      User.create(req.body).exec(function (err, user) {
    //        if (err) {
    //          return res.status(err.status).json({err: err.message});
    //        }
    //        return res.json(200, {result: user});
    //      });
    //    } else {
    //      return res.json(200, {result: result});
    //    }
    //  }
    //});
  },

  facebookAuth : function(req,res){

    Facebook.getAccessToken({
      appId: req.body.clientId,
      appSecret: 'a8ac09ea90c0bd49b0ac150ef88473ae',
      code: req.body.code,
      callbackUrl: req.body.redirectUri
    }).exec({
      // An unexpected error occurred.
      error: function (err){
        return res.negotiate(err);
      },
      // OK.
      success: function ( result){
        // get facebook Id & email
        request.get('https://graph.facebook.com/v2.6/me?fields=id,email,name&access_token='+result.token, function (error, response, body) {
          if (error) return res.negotiate(error);

          var data = JSON.parse(body);
          if(data.id){
            User.findOne({facebookId: data.id}, function foundUser(err, appUser) {
              if (err) return res.negotiate(err);
              if(!appUser){
                User.create({email: data.email, name : data.name, facebookId : data.id}).exec(function(err, newAppUser) {
                  if (err) return res.negotiate(err);
                  JWT.encode({
                    secret: config.CLIENT_SECRET,
                    payload: {
                      id :  newAppUser.id,
                      email:  newAppUser.email
                    },
                    algorithm: 'HS256'
                  }).exec({
                    error: function (err){
                      return res.negotiate(err);
                    },
                    success: function (result){
                      res.status(200).json({user : {email: newAppUser.email, sub: newAppUser.id},token : result });
                    }
                  });
                });
              } else {
                JWT.encode({
                  secret: config.CLIENT_SECRET,
                  payload: {
                    id :  appUser.id,
                    email:  appUser.email
                  },
                  algorithm: 'HS256'
                }).exec({
                  error: function (err){
                    return res.negotiate(err);
                  },
                  success: function (result){
                    res.status(200).json({user : {email: appUser.email, sub: appUser.id},token : result });
                  }
                });
              }
            });
          }else{
            return res.negotiate('error');
          }
        });
      }
    });
  },
  googleAuth : function(req,res){
    // Get OAuth2 client
    GoogleAPIsOAuth2v2.getAccessToken({
      clientId: req.body.clientId,
      clientSecret: '31hmUuzjCeCwYJs3w0B2srSg',
      redirectUrl: req.body.redirectUri,
      code: req.body.code
    }).exec({
      // An unexpected error occurred.
      error: function (err){
        console.log(err);
      },
      // OK.
      success: function ( result){
        var googleToken = result.access_token;
        request.get('https://www.googleapis.com/plus/v1/people/me?access_token='+googleToken, function (error, response, body) {
          if (error) return res.negotiate(error);

          var data = JSON.parse(body);
          if(data.id){
            User.findOne({googleId: data.id}, function foundUser(err, appUser) {
              if (err) return res.negotiate(err);
              if(!appUser){
                var googleEmail = data.emails[0].value;
                var googleName = data.displayName;
                User.create({email: googleEmail, name : googleName , googleId : data.id}).exec(function(err, newAppUser) {
                  if (err) return res.negotiate(err);
                  JWT.encode({
                    secret: config.CLIENT_SECRET,
                    payload: {
                      id :  newAppUser.id,
                      email:  newAppUser.email
                    },
                    algorithm: 'HS256'
                  }).exec({
                    error: function (err){
                      return res.negotiate(err);
                    },
                    success: function (result){
                      res.status(200).json({user : {email: newAppUser.email, sub: newAppUser.id},token : result });
                    }
                  });
                });
              } else {
                console.log(appUser);
                JWT.encode({
                  secret: config.CLIENT_SECRET,
                  payload: {
                    id :  appUser.id,
                    email:  appUser.email
                  },
                  algorithm: 'HS256'
                }).exec({
                  error: function (err){
                    return res.negotiate(err);
                  },
                  success: function (result){
                    res.status(200).json({user : {email: appUser.email, sub: appUser.id},token : result });
                  }
                });
              }
            });
          }else{
            return res.negotiate('error');
          }
        });
      }
    });
  }
};

