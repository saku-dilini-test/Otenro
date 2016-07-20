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


        console.log(req.body);
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


                        message: "Email Settings has been added !"
                    });
                });
            } else {
                res.send({
                    appId: req.body.appId,
                    message: "Email Settings has been Updated !"
                });
            }
        });
    },
    updateEmailSettings : function(req,res){

        console.log(req.body);
        var appId = req.param('appId');
        console.log(appId);
        var saveData = req.body;


        UserEmail.update({ appId :appId }, saveData).exec(function(err,r){
            if (err) return done(err);
            res.send({
                message: "Email Settings has been added"
            });
        });
    },
    updateHeaderFooterSettings : function(req,res){

        var appRoot = path.resolve();
        var dePath= appRoot + '/assets/images/';

        console.log(dePath);

        req.file('file').upload({
            dirname: require('path').resolve(dePath)
        },function (err, uploadedFiles) {

            var newFileName=Date.now()+'.png';
            fs.rename(uploadedFiles[0].fd, dePath+'/'+newFileName, function (err) {
                if (err) return res.send(err);
            });
            // var newFileName2=Date.now()+'.png';
            // fs.rename(uploadedFiles[1].fd, dePath+'/'+newFileName2, function (err) {
            //     if (err) return res.send(err);
            // });


            console.log(req.body);
            var appId = req.param('appId');
            console.log(appId);
            var saveData = req.body;
            saveData.imageHeader = newFileName;
            saveData.imageFooter = newFileName;
console.log(saveData);

            UserEmail.update({ appId :appId }, saveData).exec(function(err,r){
                if (err) return done(err);
                res.send({
                    message: "Email Settings has been added"
                });
            });
        });
    },
    getEmailSettings : function(req,res){

        console.log(req.body);

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

        console.log(req.body);
        var type = req.body.type;
        var appId = req.param('appId');

        var data = {
            type : type,
            appId: appId
        }
        var msg = sentMails.sendConfirmEmail(data, function (msg) {
            res.send(msg);
        });
        console.log(msg);
        res.send("asd");
    }

};