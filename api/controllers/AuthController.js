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
    request = require('request'),
    config = require('../services/config');
    

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
              secret: config.CLIENT_SECRET,
              payload: {
                id :  user.id,
                email:  user.email,
                userRoles : user.userRole
              },
              algorithm: 'HS256'
            }).exec({
              // An unexpected error occurred.
              error: function (err){
                return err;
              },
              // OK.
              success: function (result){
                res.status(200).json({user : { email : user.email , sub : user.id,userRoles : user.userRole  },token : result });
              }
            });
          }
        });
      });

  },
  /*
    Authentication for the forgot password users
  */
  forgotPassword : function(req, res) {
        var resetToken=[{
        token : req.body.token
        }]
        //find if the user with the token exist
        User.findOne({'resetToken.token':req.body.token}, function foundUser(err, user) {
            if (err) return res.negotiate(err);
            if (!user) return res.notFound();
            var diff = user.resetToken[0].expires- new Date(req.body.expires);


            //if the resetToken is not expired generate the token
            if(diff<=3.6e+6){
                JWT.encode({
                    secret: config.CLIENT_SECRET,
                    payload: {
                        id :  user.id,
                        email:  user.email,
                        userRoles : user.userRole

                    },
                    algorithm: 'HS256'
                }).exec({
                // An unexpected error occurred.
                error: function (err){
                    return err;
                },
                // OK.
                success: function (result){

                    res.status(200).json({user : { email : user.email , sub : user.id,userRoles : user.userRole  },token : result });
                }
                });
            }
            else{
                res.status(404).send({error:'Expired'});
            }
        });
  },

  register: function(req, res) {

    User.findOne({email: req.body.email}, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (user) return res.status(409).json({error: 'already exists'});
          var newUserDetails = {
            firstName : req.body.fname,
            lastName  : req.body.lname,
            email     : req.body.email,
            password  : req.body.password,
            yourselfReason : req.body.yourselfReason
          };
          User.create(newUserDetails).exec(function(err, user) {
            if (err) {
              return res.negotiate(err);
            }
            if (user) {
              JWT.encode({
                secret: config.CLIENT_SECRET,
                payload: {
                  id :  user.id,
                  email:  user.email,
                  userRoles : user.userRole
                },
                algorithm: 'HS256'
              }).exec({
                error: function (err){
                  return err;
                },
                success: function (result){
                  res.status(200).json({user : { email : user.email , sub : user.id ,userRoles : user.userRole  },token : result });
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
                    secret: config.CLIENT_SECRET,
                    payload: {
                      id :  newUser.id,
                      email:  newUser.email,
                      userRoles : newUser.userRoles
                    },
                    algorithm: 'HS256'
                  }).exec({
                    error: function (err){
                      return res.negotiate(err);
                    },
                    success: function (result){
                      res.status(200).json({user : {email: newUser.email, sub: newUser.id,userRoles : newUser.userRole },token : result });
                    }
                  });
                });
              } else {
                JWT.encode({
                  secret: config.CLIENT_SECRET,
                  payload: {
                    id :  foundUser.id,
                    email:  foundUser.email,
                    userRoles : foundUser.userRoles

                  },
                  algorithm: 'HS256'
                }).exec({
                  error: function (err){
                    return res.negotiate(err);
                  },
                  success: function (result){
                    res.status(200).json({user : {email: foundUser.email, sub: foundUser.id,userRoles : foundUser.userRole },token : result });
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
                    secret: config.CLIENT_SECRET,
                    payload: {
                      id :  newUser.id,
                      email:  newUser.email,
                      userRoles : newUser.userRoles
                    },
                    algorithm: 'HS256'
                  }).exec({
                    error: function (err){
                      return res.negotiate(err);
                    },
                    success: function (result){
                      res.status(200).json({user : {email: newUser.email, sub: newUser.id,userRoles : newUser.userRole},token : result });
                    }
                  });
                });
              } else {
                JWT.encode({
                  secret: config.CLIENT_SECRET,
                  payload: {
                    id :  foundUser.id,
                    email:  foundUser.email,
                    userRoles : foundUser.userRoles
                  },
                  algorithm: 'HS256'
                }).exec({
                  error: function (err){
                    return res.negotiate(err);
                  },
                  success: function (result){
                    res.status(200).json({user : {email: foundUser.email, sub: foundUser.id,userRoles : foundUser.userRole},token : result });
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

  /**
   * Return Tell Us yourself Reason Collections for any GET request
   */
  getYourselfReason : function (req,res) {
    // find Query
    YourselfReason.find().exec(function(err, result) {
      if (err) return done(err);
      res.send(result);
    });
  }
};