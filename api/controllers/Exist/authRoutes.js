/**
 * Created by udeshikaperera on 16/07/2015.
 */
var express  = require('express');
var authRouter = express.Router();
var passport = require('passport');
var LocalStrategy = require("../services/localStrategy");
var createSendToken = require('../services/jwt');
var facebookAuth = require('../services/facebookAuth');
var googleAuth = require('../services/googleAuth');

passport.use('local-register', LocalStrategy.register);
passport.use('local-login', LocalStrategy.login);

authRouter.post('/google',  googleAuth);

authRouter.get('/facebook', facebookAuth);

authRouter.post('/login', passport.authenticate('local-login'), function(req, res) {
    createSendToken(req.user, res);
});
authRouter.post('/signup', function(req, res, next) {
  passport.authenticate('local-register', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
        res.status(401);
        res.end(info.message);
        return;
    }

    createSendToken(user, res);
  })(req, res, next);
});


module.exports = authRouter;
