/**
 * UpdateAllApps
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


var shell = require('shelljs'),
    config = require('../services/config');
var sentMails = require('../services/emailService');

module.exports = {

    updateAllApps: function (req, res) {
        var apps = req.body.apps;
        // var userIdArray = user.map(function (obj) {
        //     var array = []
        //     return obj;
        // });

        var appIds = apps.map(function (obj) {
                return obj.id;
            });
        var userIds = apps.map(function (obj) {
            return obj.userId;
        });
        var checkActiveStatus = apps.map(function (obj) {
            if(obj.isActive){
                return obj.isActive;
            }else{
                return "undefined";
            }
        });
        var checkCustomStatus = apps.map(function (obj) {
            if(obj.isCustomApp){
                return obj.isCustomApp;
            }else{
                return "undefined";
            }
        });

        // console.log(26,userIds);
        var command = "bash systemUpdateAllApps.sh "+ appIds +" "+ userIds +" "+ config.ME_SERVER +" "+ config.PROGRESSIVE_TEMPLATES_PATH +" "+ config.server.host +" "+ checkActiveStatus +" "+ checkCustomStatus;
        shell.cd(config.PROGRESSIVE_TEMPLATES_PATH);

        // Run external tool synchronously
        shell.exec(command, {async: true}, function (code, stdout, stderr) {

            if(code !== 0) {
                res.send(stderr);
            }
            res.send("ok");
            // shell.exit(1);
        });


    },

    notifyAppCreators: function (req, res) {

        User.find().exec(function (err, users) {
            if(err){
                return res.send(err);
            }else{
                users = users.filter(function (user) {
                   return user.userRole == 'APP_CREATOR';
                });

                sentMails.sendNotifyAppCreatorsAboutUpdate(users, function (err, msg) {
                    sails.log.info(err);
                    if (err) {
                        console.log(err)
                        return res.send(500);
                    }else{
                        return res.send(200);
                    }
                });
            }
        });

    }


}