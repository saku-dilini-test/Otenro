/**
 * TemplateAuthController
 *
 * @description :: Server-side logic for managing templateauths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
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

    facebookAuth : function(req,res){

        Facebook.getAccessToken({
            appId: req.body.clientId,
            appSecret: '50f38010361357de390b5cfcdf06dbb0',
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
                        AppUser.findOne({facebookId: data.id}, function foundUser(err, appUser) {
                            if (err) return res.negotiate(err);
                            if(!appUser){
                                AppUser.create({email: data.email, name : data.name, facebookId : data.id}).exec(function(err, newAppUser) {
                                    if (err) return res.negotiate(err);
                                    JWT.encode({
                                        secret: '17ca644f4f3be572ec33711a40a5b8b4',
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
                                    secret: '17ca644f4f3be572ec33711a40a5b8b4',
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
            clientSecret: 'MNzK1winvmWZTtT8S4QCCpky',
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
                        AppUser.findOne({googleId: data.id}, function foundUser(err, appUser) {
                            if (err) return res.negotiate(err);
                            if(!appUser){
                                var googleEmail = data.emails[0].value;
                                var googleName = data.displayName;
                                AppUser.create({email: googleEmail, name : googleName , googleId : data.id}).exec(function(err, newAppUser) {
                                    if (err) return res.negotiate(err);
                                    JWT.encode({
                                        secret: '17ca644f4f3be572ec33711a40a5b8b4',
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
                                    secret: '17ca644f4f3be572ec33711a40a5b8b4',
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
};

