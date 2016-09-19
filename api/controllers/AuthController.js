/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var JWT = require('machinepack-jwt'),
    Passwords = require('machinepack-passwords'),
    GoogleAPIsOAuth2v2 = require('machinepack-googleapisoauth2v2'),
    Facebook = require('machinepack-facebook'),
    request = require('request');

module.exports = {

	authenticate : function(req, res) {

      User.findOne({
        email: req.body.email
      }, function foundUser(err, user) {
        if (err) return res.negotiate(err);
        if (!user) return res.notFound();

        Passwords.checkPassword({
          passwordAttempt: req.body.password,
          encryptedPassword: user.password
        }).exec({

          error: function (err){
            console.log(err);
            return res.negotiate(err);
          },

          incorrect: function (){
            return res.notFound();
          },

          success: function (){

            JWT.encode({
              secret: '17ca644f4f3be572ec33711a40a5b8b4',
              payload: {
                id :  user.id,
                email:  user.email
              },
              algorithm: 'HS256'
            }).exec({
              // An unexpected error occurred.
              error: function (err){
                return err;
              },
              // OK.
              success: function (result){
                res.status(200).json({user : { email : user.email , sub : user.id },token : result });
              }
            });
          }
        });
      });

  },
  forgotPassword : function(req, res) {

      User.findOne({
        id: req.body.userId
      }, function foundUser(err, user) {
        if (err) return res.negotiate(err);
        if (!user) return res.notFound();

            JWT.encode({
              secret: '17ca644f4f3be572ec33711a40a5b8b4',
              payload: {
                id :  user.id,
                email:  user.email
              },
              algorithm: 'HS256'
            }).exec({
              // An unexpected error occurred.
              error: function (err){
                return err;
              },
              // OK.
              success: function (result){
                res.status(200).json({user : { email : user.email , sub : user.id },token : result });
              }
            });
        });
  },

  register: function(req, res) {

    User.findOne({email: req.body.email}, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (user) return res.status(409).json({error: 'already exists'});
          User.create({firstName:req.body.fname,lastName:req.body.lname, email: req.body.email, password: req.body.password}).exec(function(err, user) {
            if (err) {
              return res.negotiate(err);
            }
            if (user) {
              JWT.encode({
                secret: '17ca644f4f3be572ec33711a40a5b8b4',
                payload: {
                  id :  user.id,
                  email:  user.email
                },
                algorithm: 'HS256'
              }).exec({
                error: function (err){
                  return err;
                },
                success: function (result){
                  console.log(result);
                  res.status(200).json({user : { email : user.email , sub : user.id  },token : result });
                }
              });
            }
          });
    });
  },

  facebookAuth : function(req,res){

    Facebook.getAccessToken({
      appId: req.body.clientId,
      appSecret: '7e805de281e9ec8c3a842a5b964f181b',
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
          var facebookId = data.id;
          var facebookEmail = data.email;
          var facebookName = data.name;
          var nameArray = facebookName.split(" ");
          var firstName = nameArray[0];
          var lastName = nameArray[1];
          if(facebookId){
            User.findOne({facebookId: facebookId}, function foundUser(err, foundUser) {
              if (err) return res.negotiate(err);
              if(!foundUser){
                User.create({
                  firstName: firstName,
                  lastName: lastName,
                  email: facebookEmail,
                  facebookId : facebookId
                }).exec(function(err, newUser) {
                  if (err) return res.negotiate(err);
                  JWT.encode({
                    secret: '17ca644f4f3be572ec33711a40a5b8b4',
                    payload: {
                      id :  newUser.id,
                      email:  newUser.email
                    },
                    algorithm: 'HS256'
                  }).exec({
                    error: function (err){
                      return res.negotiate(err);
                    },
                    success: function (result){
                      res.status(200).json({user : {email: newUser.email, sub: newUser.id},token : result });
                    }
                  });
                });
              } else {
                JWT.encode({
                  secret: '17ca644f4f3be572ec33711a40a5b8b4',
                  payload: {
                    id :  foundUser.id,
                    email:  foundUser.email
                  },
                  algorithm: 'HS256'
                }).exec({
                  error: function (err){
                    return res.negotiate(err);
                  },
                  success: function (result){
                    res.status(200).json({user : {email: foundUser.email, sub: foundUser.id},token : result });
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
      clientSecret: '7yjf7X5bH9lOQtBWD4M8I7Nc',
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
          var googleId = data.id;
          var googleEmail = data.emails[0].value;
          var googleName = data.displayName;
          var nameArray = googleName.split(" ");
          var firstName = nameArray[0];
          var lastName = nameArray[1];
          if(googleId){
            User.findOne({googleId: googleId}, function foundUser(err, foundUser) {
              if (err) return res.negotiate(err);

              if(!foundUser){
                User.create({
                  firstName: firstName,
                  lastName: lastName,
                  email: googleEmail,
                  googleId : googleId
                }).exec(function(err, newUser) {

                  if (err) return res.negotiate(err);
                  JWT.encode({
                    secret: '17ca644f4f3be572ec33711a40a5b8b4',
                    payload: {
                      id :  newUser.id,
                      email:  newUser.email
                    },
                    algorithm: 'HS256'
                  }).exec({
                    error: function (err){
                      return res.negotiate(err);
                    },
                    success: function (result){
                      res.status(200).json({user : {email: newUser.email, sub: newUser.id},token : result });
                    }
                  });
                });
              } else {
                JWT.encode({
                  secret: '17ca644f4f3be572ec33711a40a5b8b4',
                  payload: {
                    id :  foundUser.id,
                    email:  foundUser.email
                  },
                  algorithm: 'HS256'
                }).exec({
                  error: function (err){
                    return res.negotiate(err);
                  },
                  success: function (result){
                    res.status(200).json({user : {email: foundUser.email, sub: foundUser.id},token : result });
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