/**
 * EmailController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var sentMails = require('../../../services/emailService');
module.exports = {

    saveEmailDeliInfo : function(req,res){


        console.log(req.body);
        var appId = req.param('appId');
        var saveData = req.body;
        saveData.appId = appId;

        UserEmail.create(saveData).exec(function(err, appProduct) {
            if (err) res.send(err);
            res.send({
                message: "Email Settings has been added"
            });
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