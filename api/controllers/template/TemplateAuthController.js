/**
 * TemplateAuthController
 *
 * @description :: Server-side logic for managing templateauths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var JWT = require('machinepack-jwt'),
    Passwords = require('machinepack-passwords');

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
    }
};

