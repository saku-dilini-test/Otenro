/**
 * UserController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Passwords = require('machinepack-passwords');
var smsService = require('./../services/smsService');
module.exports = {

    /**
     * Update user profile details
     * @param req
     * @param res
     **/
    editUserProfile : function(req,res){

        var data = req.body;
        var searchQuery = { id : data.id };
        var error = { message : 'ERROR' };
        var notFound = { message: 'NOT_FOUND' };

        User.findOne(searchQuery).exec(function (err, user) {
            if (err) return res.send(error);
            if (!user) return res.send(notFound);

            /**
             * If mobile number is not changed
             **/
            if (user.mobile === data.mobile) {
                if ( data.method === 'WITH_PASSWORD' ) {
                    
                    Passwords.checkPassword({
                        passwordAttempt: data.currentPassword,
                        encryptedPassword: user.password
                    }).exec({

                        error: function (err){
                            sails.log.error('Error with checkPassword. , error : ' + err);
                            return res.send(error);
                        },
                        incorrect: function (){
                            sails.log.warn('CurrentPassword is wrong.');
                            return res.send(notFound);
                        },
                        success: function (){
                            sails.log.debug('CurrentPassword is correct');
                            User.update(searchQuery, data).exec(function (err, updatedUser) {
                                if (err) {
                                    sails.log.error('Error occurred while updating user. , error : ' + err);
                                    return res.send(error);
                                }
                                sails.log.debug('User updated with password successfully , userEmail : ' + updatedUser[0].email + ' , mobile: ' + updatedUser[0].mobile);
                                return res.send({ message: 'success', user: updatedUser });
                            });
                        }
                    });

                } else {
                    var valuesToUpdate = {
                        firstName : data.firstName,
                        lastName: data.lastName,
                        beneficiaryName: data.beneficiaryName,
                        bankCode: data.bankCode,
                        branchCode: data.branchCode,
                        branchName: data.branchName,
                        accountNumber: data.accountNumber,
                        accountType: data.accountType
                    };
                    User.update(searchQuery, valuesToUpdate).exec(function (err, updatedUser) {
                        if (err) {
                            sails.log.error('Error occurred while updating user. , error : ' + err);
                            return res.send(error);
                        }
                        sails.log.debug('User updated without password successfully , userEmail : ' + updatedUser[0].email + ' , mobile: ' + updatedUser[0].mobile);
                        return res.send({ message: 'success', user: updatedUser });
                    });
                }

            } else {
                /**
                 * If mobile number is changed
                 * Need to verify mobile number via a pin
                 **/
                sails.log.debug('Send mobile verification pin before user update.');
                var smsPayload;
                function pinGenerator() {
                    this.length = 6;
                    this.timestamp = +new Date;
                    var _getRandomInt = function( min, max ) {
                        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
                    };
                    this.generate = function() {
                        var ts = this.timestamp.toString();
                        var parts = ts.split( "" ).reverse();
                        var pin = "";
                        for( var i = 0; i < this.length; ++i ) {
                            var index = _getRandomInt( 0, parts.length - 1 );
                            pin += parts[index];
                        }
                        return pin;
                    }
                }
                var pGenerator = new pinGenerator();
                var mobileVerificationPin = pGenerator.generate();
                smsPayload = {
                    mobile: data.mobile,
                    pin: mobileVerificationPin
                };
                smsService.sendSMS(smsPayload, function (info) {
                    if (info.message === 'success') {
                        User.update(searchQuery, {mobileVerificationPin : mobileVerificationPin})
                            .exec(function (err) {
                            if (err) {
                                sails.log.error('Error updating mobileVerificationPin');
                                return res.send(error);
                            }
                            return res.send({ message: 'verify_mobile' });
                        });
                    }
                });
            }

        });
    },
    getUserProfile : function(req,res){

        var query = {id:req.userId};
        User.findOne(query, function(err, user) {
            if (err) return done(err);
            res.send(user);
        });
    },
    editBillingDetails : function(req,res){
        var data = req.body;
        var query = {userId:req.body.userId};
        BillingDetails.update(query,data).exec(function(err,user) {
               if (err) res.send(err);
               if (user.length == 0) {
                   BillingDetails.create(data).exec(function (err, app) {
                       if (err) res.send(err);

                       res.send({
                           app: app,
                           message: "New Contact Us Record Successfully created"
                       });
                   });
               } else {
                   res.send({
                       app: user,
                       message: "Contact Us Record Successfully updated"

                   });
               }
        });
    },
    getBillingDetails : function(req,res){
        var query = {userId:req.param('userId')};
          BillingDetails.findOne(query, function(err, user) {
            if (err) return done(err);
            res.send(user);
        });
    },
    //reset password for forgot password users
    forgotPasswordReset : function(req,res){
        var data = req.body;
        User.update({'resetToken.token':req.body.token},data).exec(function(err,user) {
            if (err) res.send(err);
            res.send('ok');
        });
    },
    updateUserProfileWithMobile: function (req, res) {
        var data = req.body;
        var searchQuery = { id : data.id };
        var error = { message : 'ERROR' };
        var notFound = { message: 'NOT_FOUND' };

        User.findOne(searchQuery).exec(function (err, user) {
            if (err) return res.send(error);
            if (!user) return res.send(notFound);

            if (user.mobileVerificationPin === data.mobileVerificationPin) {
                if ( data.method === 'WITH_PASSWORD' ) {

                    Passwords.checkPassword({
                        passwordAttempt: data.currentPassword,
                        encryptedPassword: user.password
                    }).exec({

                        error: function (err){
                            sails.log.error('Error with checkPassword. , error : ' + err);
                            return res.send(error);
                        },
                        incorrect: function (){
                            sails.log.warn('CurrentPassword is wrong.');
                            return res.send(notFound);
                        },
                        success: function (){
                            sails.log.debug('CurrentPassword is correct');
                            User.update(searchQuery, data).exec(function (err, updatedUser) {
                                if (err) {
                                    sails.log.error('Error occurred while updating user. , error : ' + err);
                                    return res.send(error);
                                }
                                sails.log.debug('User updated with password successfully , userEmail : ' + updatedUser[0].email + ' , mobile: ' + updatedUser[0].mobile);
                                return res.send({ message: 'success', user: updatedUser });
                            });
                        }
                    });

                } else {
                    var valuesToUpdate = {
                        firstName : data.firstName,
                        lastName: data.lastName,
                        beneficiaryName: data.beneficiaryName,
                        bankCode: data.bankCode,
                        branchCode: data.branchCode,
                        branchName: data.branchName,
                        accountNumber: data.accountNumber,
                        accountType: data.accountType,
                        mobile: data.mobile
                    };
                    User.update(searchQuery, valuesToUpdate).exec(function (err, updatedUser) {
                        if (err) {
                            sails.log.error('Error occurred while updating user. , error : ' + err);
                            return res.send(error);
                        }
                        sails.log.debug('User updated without password successfully , userEmail : ' + updatedUser[0].email + ' , mobile: ' + updatedUser[0].mobile);
                        return res.send({ message: 'success', user: updatedUser });
                    });
                }
            } else {
                return res.send({ message: 'wrong pin' });
            }
        });
    }
};