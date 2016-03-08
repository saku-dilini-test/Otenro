/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var JWT = require('machinepack-jwt'),
    Passwords = require('machinepack-passwords'),
    GoogleAPIsOAuth2v2 = require('machinepack-googleapisoauth2v2'),
    Facebook = require('machinepack-facebook');

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

  register: function(req, res) {

    User.create({email: req.body.email, password: req.body.password}).exec(function(err, user) {
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
  },

  googleAuth : function(req,res){
    // Get OAuth2 client
    GoogleAPIsOAuth2v2.getAccessToken({
      clientId: req.body.clientId,
      clientSecret: 'eFUwrxuPW-VixgMnAuf4oNyf',
      redirectUrl: req.body.redirectUri,
      code: req.body.code
    }).exec({
      // An unexpected error occurred.
      error: function (err){
        console.log(err);
      },
      // OK.
      success: function ( result){
        console.log(result);
        console.log("In");
        req.token = result.id_token;
        res.status(200).json({user : { email : "user.email" , sub : "user.id" },token :'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU2Y2JmYzIxOTZiMmVlY2EyNzdkNjViMSIsImVtYWlsIjoidGh1c2l0aHphcHBzQGdtYWlsLmNvbSIsImlhdCI6MTQ1NjQ4NDU3NH0.h10893CkxOcB3frk22FdT3ixfRTfgjfAiNNAUO5DhWo'});
      }
    });
  },

  facebookAuth : function(req,res){
    console.log(req.body);
    Facebook.getAccessToken({
      appId: req.body.clientId,
      appSecret: 'a6446363712ca1f3b4991f5ea00d8103',
      code: req.body.code,
      callbackUrl: req.body.redirectUri
    }).exec({
      // An unexpected error occurred.
      error: function (err){
        console.log(err);
      },
      // OK.
      success: function ( result){
        console.log(result);
        req.token = result.token;
        //res.status(200).json({token : result.token });
        res.status(200).json({user : { email : "user.email" , sub : "user.id" },token :'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU2Y2JmYzIxOTZiMmVlY2EyNzdkNjViMSIsImVtYWlsIjoidGh1c2l0aHphcHBzQGdtYWlsLmNvbSIsImlhdCI6MTQ1NjQ4NDU3NH0.h10893CkxOcB3frk22FdT3ixfRTfgjfAiNNAUO5DhWo'});

      }
    });
  }
};