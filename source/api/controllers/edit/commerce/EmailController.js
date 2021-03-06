/**
 * EmailController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var sentMails = require('../../../services/emailService');
var fs = require('fs-extra'),
    config = require('../../../services/config');
var path = require('path');
module.exports = {

    saveEmailDeliInfo : function(req,res){


        sails.log.info(req.body);
        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };
        var saveData = req.body;
        saveData.appId = appId;

        UserEmail.update(searchApp, saveData).exec(function (err, app) {
            if (app.length == 0) {
                UserEmail.create(saveData).exec(function (err, appAboutUs) {
                    if (err) res.send(err);

                    res.send({
                        appId: appAboutUs.appId,


                        message: "Email Settings has been successfully added "
                    });
                });
            } else {
                res.send({
                    appId: req.body.appId,
                    message: "Email Settings has been successfully Updated "
                });
            }
        });
    },
    updateEmailSettings : function(req,res){

        sails.log.info(req.body);
        var appId = req.param('appId');
        sails.log.info(appId);
        var saveData = req.body;


        UserEmail.update({ appId :appId }, saveData).exec(function(err,r){
            if (err) return done(err);
            res.send({
                message: "Email Settings has been successfully added "
            });
        });
    },
    updateHeaderFooterSettings : function(req,res){

        var appRoot = path.resolve();
        //var dePath= appRoot + '/assets/images/';
        var appId = req.param('appId');
        var dePath      = config.APP_FILE_SERVER + req.body.userId + '/templates/' + appId + '/img/email/';

        var appId = req.param('appId');
        var saveData = req.body;

        sails.log.info(dePath);
        //sails.log.info(req.file('file'));
        //sails.log.info(req.file('file'));

       // if(saveData.file != "") {

            req.file('file').upload({
                dirname: require('path').resolve(dePath)
            }, function (err, uploadedFiles) {

                //sails.log.info(uploadedFiles);
                if (0 < uploadedFiles.length) {

                    var newFileName = Date.now() + uploadedFiles[0].filename;
                    fs.rename(uploadedFiles[0].fd, dePath + '/' + newFileName, function (err) {
                        if (err) return res.send(err);
                    });
                    var newFileName2 = Date.now() + uploadedFiles[1].filename;
                    fs.rename(uploadedFiles[1].fd, dePath + '/' + newFileName2, function (err) {
                        if (err) return res.send(err);
                    });

                    saveData.imageHeader = newFileName;
                    saveData.imageFooter = newFileName2;
                }



      //  }
            sails.log.info(saveData);

            UserEmail.update({ appId :appId }, saveData).exec(function(err,r){
                if (err) return done(err);
                res.send({
                    message: "Email Settings has been successfully added"
                });
            });

            });

    },
    getEmailSettings : function(req,res){

        sails.log.info(req.body);

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };


        UserEmail.find(searchApp).exec(function(err, app) {
            if (err) return done(err);
            res.send(app);
        });
    },

    sendTestEmail : function(req,res){

        //sails.log.info(req.body);
        var type = req.body.type;
        var appId = req.param('appId');
        var userId = req.body.userId;

        var data = {
            type : type,
            appId: appId,
            userId: userId
        }
        sentMails.sendConfirmEmail(data,function (err,msg) {
            //sails.log.info(err);
            if (err) {
                return  res.send(500);
            }else{
                return res.send('ok');
            }
            //res.send(msg);
        });
    },
    sendVerificationLinkEmail : function(req,res){

        var type = req.body.type;
        var email = req.body.email;

        var data = {
            type : type,
            email: email
        }
        var msg = sentMails.sendVerificationEmail(data, function (msg)
        {
               res.send(msg);
        });
    },
    sendRegisterConfirmationEmail : function(req,res){
        var email = req.body.email;

        var data = {
            email: email
        }

        var msg = sentMails.sendRegisterConfirmation(data, function (msg)
        {
            res.send(msg);
        });
    },
    viewImages : function(req,res){

        var appRoot = path.resolve();
        var dePath= appRoot + '/assets/images/';
        res.sendfile(dePath+req.param('image'));
    },

};