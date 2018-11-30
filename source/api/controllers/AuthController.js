/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Passwords = require('machinepack-passwords'),
    GoogleAPIsOAuth2v2 = require('machinepack-googleapisoauth2v2'),
    Facebook = require('machinepack-facebook'),
    request = require('request'),
    config = require('../services/config'),
    moment = require('moment'),
    ideabizCtrl = require('./ideabiz/IdeabizController'),
    createToken = require('../services/jwt');
    createMobileToken = require('../services/jwt.mobile');
var sentMails = require('./../services/emailService');
var ideaBizPinVerificationAPI = require('./../services/IdeaBizPINVerificationAPIService');
fs = require('fs-extra');

module.exports = {

	authenticate : function(req, res) {

	    if (req.body.method === 'email') {

            User.findOne({
                email: req.body.email
            }, function foundUser(err, user) {
                if (err) return res.negotiate(err);
                if (!user) return res.notFound();

                if (user && user.registrationStatus && user.registrationStatus === config.USER_REGISTRATION_STATUS.PENDING.code) {
                    sails.log.error('AuthController: User status is Pending for email:%s', req.body.email);
                    return res.notFound();
                }

                Passwords.checkPassword({
                    passwordAttempt: req.body.password,
                    encryptedPassword: user.password
                }).exec({

                    error: function (err){
                        sails.config.logging.custom.error(err);
                        logger.error();
                        return res.negotiate(err);
                    },

                    incorrect: function (){
                        sails.config.logging.custom.warn({message:'Invalid User credentials! emailId:' + req.body.email});
                        return res.notFound();
                    },

                    success: function (){
                        var loginCount = 0;
                        if(user.loginCount){
                            loginCount = user.loginCount + 1;
                        }
                        User.update({email : req.body.email},{lastLoginTime : new Date(), loginCount : loginCount}, function(err1){
                        });
//              logger.info({
//                      message: 'User Logged in!'
//              });
                        sails.config.logging.custom.info({message:'User Logged in! emailId:' + req.body.email});

                        createToken(user,res);
                    }
                });
            });
        } else if (req.body.method === 'mobile') {
            var msisdn = "94" + req.body.mobile.slice(-9);
            var criteria = {mobile: { 'contains' : req.body.mobile.slice(-9) }};

            sails.log.debug("call authenticate with mobilie #: " + msisdn);

            User.findOne(criteria).exec(function (err, user) {
                if (err) return res.serverError({ message: 'error' });

                if (user && user.registrationStatus && user.registrationStatus === config.USER_REGISTRATION_STATUS.PENDING.code) {
                    sails.log.error('AuthController: User status is Pending for email:%s', req.body.email);
                    return res.badRequest({ message: 'User not found' });
                }

                if (user) {
                    ideaBizPinVerificationAPI.verificationRequest(msisdn,function(response,err){
                        if(err){
                            sails.log.debug("register failed while requesting the Pin for the mobile: " + req.body.mobile + " err:" + JSON.stringify(err));
                            return res.serverError({ error: 'error' });
                        }

                        sails.log.debug("Response after requesting the pin: " + JSON.stringify(response));

                        if(!(response && response.body)){
                            sails.log.debug("Response received in pin request seems not valid response: " + JSON.stringify(response));
                            return res.serverError({ error: 'error' });
                        }

                        var responseBody = JSON.parse(response.body);

                        if(responseBody && responseBody.statusCode === "ERROR"){
                            sails.log.debug("Error while requesting the pin, err:  " + responseBody.message);
                            return res.serverError({ error: responseBody.message });
                        }

                        User.update(criteria, { ideaBizPinServerRef: responseBody.data.serverRef })
                            .exec(function (err, user) {
                                if (err) return res.send({ message: 'error' });
                                return res.send({ message: 'success' });
                            });
                    });
                } else {
                    return res.badRequest({ message: 'User not found' });
                }
            });
        }
  },
    updateUserAdNetwork: function(req, res) {

        User.findOne({email: req.body.email}, function foundUser(err, user) {
            if (err) return res.negotiate(err);
            if (user){
                User.update({email : req.body.email},{adagent : req.body.adagentname,affid: req.body.affid }, function(err1){
                    res.send({response:'OK'});
                });
            }

        });
    },
  /*
    Authentication for the forgot password users
  */
  forgotPassword : function(req, res) {
        //find if the user with the token exist
        User.findOne({'resetToken.token':req.body.token}, function foundUser(err, user) {
            if (err) return res.negotiate(err);
            if (!user) return res.notFound();
            var diff = user.resetToken[0].expires- new Date(req.body.expires);
            //if the resetToken is not expired generate the token
            if(diff<=3.6e+6){
              createToken(user,res);
            }
            else{
                res.status(404).send({error:'Expired'});
            }
        });
  },

    register: function (req, res) {
        var findCriteria = { or: [{ email: req.body.email }, { mobile: { 'contains': req.body.mobile.slice(-9) } }] };
        var countryCode;
        User.findOne(findCriteria, function foundUser(err, user) {
            if (err) return res.negotiate(err);
            if (user && (!user.registrationStatus || (user.registrationStatus && user.registrationStatus === config.USER_REGISTRATION_STATUS.VERIFIED.code))) {
                return res.status(409).json({ error: 'already exists' })
            };

            countryCode = req.body.countryCode.substring(1, req.body.countryCode.length);
            var msisdn = countryCode + req.body.mobile;

            ideaBizPinVerificationAPI.verificationRequest(msisdn, function (response, err) {
                if (err) {
                    sails.log.debug("register failed while requesting the Pin for the mobile: " + req.body.mobile + " err:" + JSON.stringify(err));
                    return res.serverError({ error: 'error' });
                }

                if (!(response && response.body)) {
                    sails.log.debug("Response received in pin request seems not valid response: " + JSON.stringify(response));
                    return res.serverError({ error: 'error' });
                }

                var responseBody = JSON.parse(response.body);

                if (responseBody && responseBody.statusCode === "ERROR") {
                    sails.log.debug("Error while requesting the pin, err:  " + responseBody.message);
                    return res.serverError({ error: responseBody.message });
                }

                var newUserDetails = {
                    firstName: req.body.fname,
                    lastName: req.body.lname,
                    email: req.body.email,
                    password: req.body.password,
                    yourselfReason: req.body.yourselfReason,
                    lastLoginTime: new Date(),
                    mobile: req.body.countryCode + req.body.mobile,
                    country: req.body.country,
                    beneficiaryName: req.body.beneficiaryName,
                    bankCode: req.body.bankCode,
                    swiftCode: req.body.swiftCode,
                    branchCode: req.body.branchCode,
                    branchName: req.body.branchName,
                    accountNumber: req.body.accountNumber,
                    isMobileVerified: false,
                    registrationStatus: config.USER_REGISTRATION_STATUS.PENDING.code,
                    ideaBizPinServerRef: responseBody.data.serverRef
                };

                if (req.body.adagent) {
                    newUserDetails.adagent = req.body.adagent;
                    newUserDetails.affid = req.body.affid;
                }

                if(user) {
                    User.update({ id: user.id }, newUserDetails).exec(function (err) {
                        if (err) {
                            sails.log.error('Update Failed => for the user: email:%s mobile:%s error:', user.email, user.mobile, err);
                            return res.serverError({ error: 'error ehrn update the user' });
                        }
                        return res.send({ message: 'success', id: user.id });
                    });                     
                } else {
                    User.create(newUserDetails).exec(function (err, user) {
                        if (err) {
                            return res.negotiate(err);
                        }
                        if (user) {
                            return res.send({ message: 'success', id: user.id });
                        }
                    });
                }
            });

        });
    },
    /**
     * Verify mobile number
     * @param req - userId and mobileVerificationPin in req.body
     * @param res
     **/
    verifyMobileNumber: function (req, res) {
        var id = req.body.id;
        var pin = req.body.pin;
        User.findOne({ id: id }).exec(function (err, user) {
            if (err) return res.send({ message : 'error' });
            if (!user) return res.send({ message: 'user not found' });
            if (user) {
                if(user.ideaBizPinServerRef && user.ideaBizPinServerRef !== ''){
                    var ideaBizPinServerRef = user.ideaBizPinServerRef;

                    ideaBizPinVerificationAPI.submitPin(pin,ideaBizPinServerRef,function(response,err){
                        if(err){
                            sails.log.debug("verifyMobileNumber failed while submitting the Pin for the pin: " + pin + " ref: " + ideaBizPinServerRef);
                            return res.serverError({ error: 'error' });
                        }

                        if(!(response && response.body)){
                            sails.log.debug("Error received in pin request for the pin: " + pin + " ref: " + ideaBizPinServerRef);
                            return res.badRequest({ error: "Error" });
                        }

                        var responseBody = JSON.parse(response.body);

                        if(responseBody && responseBody.statusCode === "ERROR"){
                            sails.log.debug("Error received in pin request for the pin: " + pin + " ref: " + ideaBizPinServerRef + " err: " + responseBody.message);
                            return res.badRequest({ error: responseBody.message });
                        }

                        User.update({ id: id }, { isMobileVerified: true, registrationStatus: config.USER_REGISTRATION_STATUS.VERIFIED.code }).exec(function (err) {
                            if (err) sails.log.error('Update Failed => mobilePinVerificationPin is Correct => In verifyMobileNumber => AuthController.js');
                            console.log("call createToken");

                            if (user) {
                                var data = {
                                    email: user.email,
                                    fName: user.firstName,
                                    lName: user.lastName
                                };
    
                                var msg = sentMails.sendRegisterConfirmation(data, function (err, info) {
                                    if (err) {
                                        sails.config.logging.custom.error({ message: 'Failed sending register confirmation email to ' + req.body.email });
                                    }
    
                                    if (info) {
                                        sails.config.logging.custom.info({ message: 'Register confirmation email successfully sent to ' + req.body.email });
                                    }
                                });
                            }                            
                            createToken(user,res);
                        });
                    });
                }else{
                    sails.log.error("Error in verifyMobileNumber, user.ideaBizPinServerRef does not exists");
                    return res.serverError({ error: 'Error' });
                }
            }
        });
    },
    sendAgentInfo: function(req, res) {
        var retUrl = req.body.returnUrl;
        var paramseperator = "?";
        if(retUrl.indexOf("?" > -1)){
            paramseperator = "&"
        }
        var url = req.body.returnUrl + paramseperator +req.body.clickidparam + "=" +  req.body.clickid;
        // var url = "http://www.securebill.mobi/bg.php?clickID="+req.body.clickid+"&idcallback=bda90516cfadcac19221685973261a75";
        //
        request.get({
            url: url,
        }, function (error, response, data) {
            console.log("data"+ data);
            if (error) {
                sails.log.debug('Some error occurred ' + error);
                return res.status(500).send({error: 'Some error occurred'});

            }

            var agentInfo = req.body;
            agentInfo.createdTime = Date.now();
            console.log(agentInfo);
            // AdAgentInfo.create(agentInfo).exec(function(err, user) {
            //     if (err) {
            //         return res.negotiate(err);
            //     }
            // });
            res.send("ok");



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
            User.findOne({email: facebookEmail}, function foundUser(err, foundUser) {
              if (err) return res.negotiate(err);
              if(!foundUser){
                User.create({
                  firstName: firstName,
                  lastName: lastName,
                  email: facebookEmail,
                  facebookId : facebookId,
                    lastLoginTime : new Date()
                }).exec(function(err, newUser) {
                  if (err) return res.negotiate(err);
                    newUser.isNew = true;
                  createToken(newUser,res);
                });
              } else {
                  foundUser.isNew = false;
                  User.update({email : foundUser.email},{lastLoginTime : new Date()}, function(err1){
                  });
                createToken(foundUser,res)
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
        sails.log.info(err);
        sails.config.logging.custom.error({message:'Google registration Error'});
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
            User.findOne({email: googleEmail}, function foundUser(err, foundUser) {
              if (err) return res.negotiate(err);

              if(!foundUser){
                User.create({
                  firstName: firstName,
                  lastName: lastName,
                  email: googleEmail,
                  googleId : googleId,
                    lastLoginTime : new Date()
                }).exec(function(err, newUser) {

                var data = {
                            email: googleEmail
                        }

                var msg = sentMails.sendRegisterConfirmation(data, function (msg)
                        {
//                            res.send(msg);
                        });

                  if (err) return res.negotiate(err);
                    newUser.isNew = true;
                  sails.config.logging.custom.info({message:'Google Plus Registration successful! emailId:' + googleEmail});
                  createToken(newUser,res)
                });
              } else {
                  foundUser.isNew = false;
                  User.update({email : foundUser.email},{lastLoginTime : new Date()}, function(err1){
                  });
                sails.config.logging.custom.info({message:'Google Plus Login successful! emailId:' + googleEmail});
                createToken(foundUser,res)
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
  },

  /**
   * Redirect to addNetwork page
   **/
  fromAddNetwork : function (req, res) {
      var baseUrl = sails.config.REDIRECT_URL;
      var urlParamString = "";
      var requestParameters = req.allParams();
      var length = Object.keys(requestParameters).length;
      for(var key in requestParameters){
          if(length == 1){
              urlParamString += key + '=' + requestParameters[key];
          }
          if(length > 1){
              urlParamString += key + '=' + requestParameters[key] + '&';
              length = length - 1;
          }

      }
      return res.redirect( baseUrl + '/#/fromAddNetwork?' + urlParamString );
  },

    /**
     * Redirect to addNetwork2 page
     **/
    fromAddNetwork2 : function (req, res) {
        var baseUrl = sails.config.REDIRECT_URL;
        var urlParamString = "";
        var requestParameters = req.allParams();
        var length = Object.keys(requestParameters).length;
        for(var key in requestParameters){
            if(length == 1){
                urlParamString += key + '=' + requestParameters[key];
            }
            if(length > 1){
                urlParamString += key + '=' + requestParameters[key] + '&';
                length = length - 1;
            }

        }
        return res.redirect( baseUrl + '/#/fromAddNetwork2?' + urlParamString );
    },

    /**
     * Redirect to addNetwork3 page
     **/
    fromAddNetwork3 : function (req, res) {
        var baseUrl = sails.config.REDIRECT_URL;
        var urlParamString = "";
        var requestParameters = req.allParams();
        var length = Object.keys(requestParameters).length;
        for(var key in requestParameters){
            if(length == 1){
                urlParamString += key + '=' + requestParameters[key];
            }
            if(length > 1){
                urlParamString += key + '=' + requestParameters[key] + '&';
                length = length - 1;
            }

        }
        return res.redirect( baseUrl + '/#/fromAddNetwork3?' + urlParamString );
    },

    /**
     * Do user login through mobile pin
     * @param req
     * @param res
     **/
    verifyMobilePin: function (req, res) {
        var criteria = {mobile: { 'contains' : req.body.mobile.slice(-9) }},
            pin = req.body.pin;
        User.findOne(criteria)
            .exec(function (err, user) {
                if (err) return res.send({ message: 'error'});

                if (user) {
                    if(user.ideaBizPinServerRef && user.ideaBizPinServerRef !== ''){
                        var ideaBizPinServerRef = user.ideaBizPinServerRef;

                        ideaBizPinVerificationAPI.submitPin(pin,ideaBizPinServerRef,function(response,err){
                            if(err){
                                sails.log.debug("verifyMobileNumber failed while submitting the Pin for the pin: " + pin + " ref: " + ideaBizPinServerRef);
                                return res.serverError({ error: 'error' });
                            }


                            if(!(response && response.body)){
                                sails.log.debug("Error received in pin request for the pin: " + pin + " ref: " + ideaBizPinServerRef);
                                return res.badRequest({ error: "Error" });
                            }

                            var responseBody = JSON.parse(response.body);

                            if(responseBody && responseBody.statusCode === "ERROR"){
                                sails.log.debug("Error received in pin request for the pin: " + pin + " ref: " + ideaBizPinServerRef + " err: " + responseBody.message);
                                return res.badRequest({ error: responseBody.message });
                            }

                            var loginCount = 0;
                            if(user.loginCount){
                                loginCount = user.loginCount + 1;
                            }
                            User.update({mobile : user.mobile},{lastLoginTime : new Date(), loginCount : loginCount}, function(err1){});
                            createToken(user,res);
                        });
                    }else{
                        sails.log.error("Error in verifyMobileNumber, user.ideaBizPinServerRef does not exists");
                        return res.serverError({ error: 'Error' });
                    }
                }else{
                    sails.log.debug("Can not find a User in the System for the Mobile #: " + req.body.mobile.slice(-9));
                    return res.serverError({ error: 'Error' });
                }
            });
    },
    getCountries: function(req,res){
       fs.readFile(sails.config.appPath+'/api/services/country.json', function(err, data) {
           if (err)  res.send(err);
            var ports = JSON.parse(data);
           res.send(ports);
       });
    },
    getTokenForMobileUser: function(req,res){
        var user = {
            msisdn: req.body.msisdn,
            appId: req.body.appId,
            uuId: req.body.uuId
        };

        ideabizCtrl.isCurrentlySubscribed(user.msisdn,user.uuId,user.appId,function(isSubscribed){
            if(isSubscribed){
                createMobileToken(user,function(token){
                    if(token){
                        return res.send(token);
                    }else{
                        return res.forbidden('Access denied.');
                    }  
                });              
            }else{
                return res.forbidden('Access denied.');
            }
        });
    }

};