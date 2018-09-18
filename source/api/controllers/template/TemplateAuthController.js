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
    request = require('request'),
    config = require('../../services/config'),
    emailService = require('../../services/emailService'),
    Cryptr = require('cryptr'),
    cryptr = new Cryptr('OtenroEncryptSecretKey');

module.exports = {

    authenticateForApp : function(req, res) {

        AppUser.findOne({
            email: req.body.email,
            appId : req.body.appId
        }, function foundUser(err, user) {

            if (err) {

                return res.negotiate(err);
            }
            if (!user) {

                return res.notFound();
            }
            if (user.isEmailVerified === true) {

                Passwords.checkPassword({
                    passwordAttempt: req.body.password,
                    encryptedPassword: user.password
                }).exec({

                    error: function (err){
                        sails.log.info(err);
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
                                res.status(200).json({user : { appId: user.appId, email : user.email , sub : user.id, streetNumber : user.streetNumber,streetName : user.streetName,city : user.city, country : user.country, phone: user.phone, name: user.firstName,lname:user.lastName, zip: user.zip },token : result });
                            }
                        });
                    }
                });
            } else {
                return res.json({ message : 'email not verified'});
            }
        });
    },

    authenticate : function(req, res) {

        AppUser.findOne({
            email: req.body.email
        }, function foundUser(err, user) {
            if (err) return res.negotiate(err);
            if (!user) return res.notFound();

            Passwords.checkPassword({
                passwordAttempt: req.body.password,
                encryptedPassword: user.password
            }).exec({

                error: function (err){
                    sails.log.info(err);
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
                            res.status(200).json({user : { appId: user.appId, email : user.email , sub : user.id, streetNumber : user.streetNumber,streetName : user.streetName,city : user.city,province : user.province, country : user.country, phone: user.phone, name: user.firstName, lname: user.lastName, zip: user.zip },token : result });
                        }
                    });
                }
            });
        });
    },

    register: function(req, res) {

        AppUser.findOne({email: req.body.email,appId:req.body.appId}, function foundUser(err, user) {

            if (err) {

                return res.negotiate(err);
            }
            if (user) {

                return res.status(409).json({error: 'already exists'});
            }

            AppUser.create(req.body).exec(function(err, user) {

                if (err) {

                    return res.negotiate(err);
                }

                if (user) {

                    // Encrypt the email
                    var encryptedEmail = cryptr.encrypt(user.email);
                    var url = 'http://localhost:4200/#/login/home';
                    var data = {
                        email: user.email,
                        title: 'Click the link below to Verify your email!',
                        link: url+ '?emailID=' + encryptedEmail
                    };

                    emailService.sendAppUserVerificationEmail(data, function (callback) {

                        if (callback.message === 'success') {

                            AppUser.update({ id: user.id}, { regToken: encryptedEmail })
                                .exec(function (err, updatedUser) {

                                if (err) {

                                    return res.send({ message: 'error' });
                                }
                                else if (updatedUser.length === 1)  {

                                    return res.send({ message: 'success' });
                                }
                                else {

                                    return res.send({ message: 'failed' });
                                }
                            });
                        }
                        else if (callback.message === 'error') {

                            return res.send({ message: 'error' });
                        }
                        else if (callback.message === 'failed') {

                            return res.send({ message: 'failed' });
                        }
                    });
                }
            });
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
            clientSecret: 'MNzK1winvmWZTtT8S4QCCpky',
            redirectUrl: req.body.redirectUri,
            code: req.body.code
        }).exec({
            // An unexpected error occurred.
            error: function (err){
                sails.log.info(err);
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
                                sails.log.info(appUser);
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
    editAppUser: function(req,res){

        var updateData;

        //if changed email
        if(req.body.emailRe){
            var checkExistingEmail ={
                appId:req.body.appId,
                email: req.body.emailRe
            }
            AppUser.findOne(checkExistingEmail).exec(function(err,email){
                if (err) res.send(err);
                if(email){
                    res.status(409).send('This email already exists');
                }
                if (email === undefined){
                    updateData = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email:req.body.emailRe,
                        streetNumber: req.body.streetNo,
                        streetName: req.body.streetName,
                        province: (!req.body.province) ? null: req.body.province,
                        city: req.body.city,
                        country: req.body.country,
                        zip: req.body.zip,
                        phone: req.body.phone
                    };

                    var findUser ={
                        appId:req.body.appId,
                        email: req.body.email
                    }

                    AppUser.update(findUser,updateData,{ upsert: true }).exec(function(err,updatedUser){

                        if (err) res.send(err);
                        res.json(updatedUser);

                    });
                }

            });
        }else{
            updateData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                streetNumber: req.body.streetNo,
                streetName: req.body.streetName,
                province: (!req.body.province) ? null: req.body.province,
                city: req.body.city,
                country: req.body.country,
                zip: req.body.zip,
                phone: req.body.phone
            };
            var findUser ={
                appId:req.body.appId,
                email: req.body.email
            }
            AppUser.update(findUser,updateData,{ upsert: true }).exec(function(err,updatedUser){

                if (err) res.send(err);
                res.json(updatedUser);

            });
        }

    },

    editAppUserPassword: function(req,res){

        var newPassword = req.body.passwordNew;
        var searchParam = {
            email: req.body.email,
            appId : req.body.appId
        }
            AppUser.findOne(
                searchParam
            , function foundUser(err, user) {
                if (err) return res.negotiate(err);
                if (!user) return res.notFound();

                console.log(user);
                console.log('--------');

                Passwords.checkPassword({
                    passwordAttempt: req.body.password,
                    encryptedPassword: user.password
                }).exec({

                    error: function (err){
                        sails.log.info(err);
                        return res.negotiate(err);
                    },

                    incorrect: function (){
                    console.log('not found');
                    console.log('************');
                        return res.notFound();
                    },

                    success: function (){
                    console.log('ok');

                        Passwords.encryptPassword({
                          password: newPassword,
                          difficulty: 10
                        }).exec({
                          error: function (err) {
                            return res.negotiate(err);
                          },
                          success: function(hash) {
                            newPassword = hash;

                                AppUser.update(searchParam, {password: newPassword}).exec(function(err,user){
                                    console.log('******');
                                    console.log(user);

                                        if (err) res.send(err);

                                            res.send('ok');

                                });
                            }
                          });

                    }
                });
            });

    },

    /**
     * Responsible for sending password reset email
     * @param req - email,appId,url
     * @param res - json
     **/
    sendPasswordResetEmail: function(req, res) {

        'use strict';
        var email = req.body.email;
        var appId = req.body.appId;
        var url = 'http://localhost:4200/#/passwordReset';
        // AppUser find query
        var criteria = { email: email, appId : appId };
        // Encrypt the email
        var encryptedEmail = cryptr.encrypt(email);

        AppUser.findOne(criteria)
            .exec(function (err, user) {

                if (err) {

                    return res.send({ message: 'error'});
                }

                else if (user) {

                    var data = {
                        email: email,
                        title: 'Click the link below to set the password',
                        link: url + '?email=' + encryptedEmail
                    };

                    // Send email with password reset link
                    emailService.sendForgotPasswordEmail(data, function (callback) {

                        if (callback.message === 'success') {

                            return res.send({ message: 'success'});
                        }

                        if (callback.message === 'error') {

                            return res.send({ message: 'error'});
                        }

                        if (callback.message === 'failed') {

                            return res.send({ message: 'failed'});
                        }
                    });
                } else {

                    return res.send({ message: 'user not found' });
                }
            });
    },

    /**
     * Responsible for resetting password
     * @param req - encryptedEmail, appId, password
     * @param res - json
     **/
    resetPassword: function(req, res) {

        'use strict';
        // Decrypt the email
        var decryptedEmail = cryptr.decrypt(req.body.email);
        // AppUser find and update query
        var criteria = {
                email: decryptedEmail,
                appId : req.body.appId
            };
        var password = req.body.password;

        AppUser.findOne(criteria).exec(function (err, user) {

            if (err) {

                return res.send({ message: 'error'});
            }

            if (!user) {

                return res.send({ message: 'user not found' });
            }

            // Encrypt the password
            Passwords.encryptPassword({
                password: password,
                difficulty: 10
            }).exec({
                error: function (err) {
                    return res.send({ message: 'error'});
                },
                success: function(hash) {
                    password = hash;
                    // Update app user with new password
                    AppUser.update(criteria, { password: password })
                        .exec(function(err,user){

                            if (err) {

                                return res.send({ message: 'error'});
                            }
                            if (user.length > 0) {

                                return res.send({ message: 'success'});
                            }
                            if (user.length === 0) {

                                return res.send({ message: 'failed'});
                            }
                        });
                }
            });
        });
    },

    /**
     * Responsible for verifying app user email
     * @param req
     * @param res
     **/
    verifyAppUserEmail: function (req, res) {
        'use strict';
        var appId = req.body.appId;
        var emailID = req.body.emailID;
        var decryptedEmail = cryptr.decrypt(emailID);
        var criteria = { email: decryptedEmail, appId: appId };

        AppUser.findOne(criteria)
            .exec(function (err, user) {

                if (err) {

                    return res.json({ message: 'error'});
                }
                else if (user) {

                    if ( user.regToken === emailID ) {

                        AppUser.update(criteria, { isEmailVerified: true }).exec(function (err) {
                            if (err) {
                                sails.log.info(err);
                            }
                        });

                        JWT.encode({
                            secret: config.CLIENT_SECRET,
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
                                return res.status(200).json({ message: 'success', user : { email : user.email , sub : user.id  },token : result, data: user });
                            }
                        });
                    } else {

                        return res.json({ message: 'token mismatch'});
                    }
                }
                else {

                    return res.json({ message: 'failed'});
                }
            });
    }
};

