/**
 * UserSettingsController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    saveStoreSettings : function(req,res){
        var data = req.body;
        var query = {appId:req.body.appId};
        ApplicationStoreSettings.update(query,data).exec(function(err,user) {
               if (err) res.send(err);
               if (user.length == 0) {
                   ApplicationStoreSettings.create(data).exec(function (err, app) {
                       if (err) res.send(err);

                       res.send({
                           app: app,
                           message: "New Store Settings Record Create Success !"
                       });
                   });
               } else {
                   res.send({
                       app: user,
                       message: "New Store Settings Record Update Success !"
                   });
               }
        });
    },
    showStoreSettings: function(req,res){
     var appId = req.param('appId');
            var searchApp = {
                appId: appId
            };
        ApplicationStoreSettings.find(searchApp, function(err, app) {
            if (err) return done(err);
            res.send(app);
        });
    },
    savePolicies: function(req,res){
        var data = req.body;
        var query = {appId:req.body.appId};
        ApplicationStoreSettings.update(query,data).exec(function(err,user) {
               if (err) res.send(err);
               if (user.length == 0) {
                   ApplicationStoreSettings.create(data).exec(function (err, app) {
                       if (err) res.send(err);

                       res.send({
                           app: app,
                           message: "New Store Settings Record Create Success !"
                       });
                   });
               } else {
                   res.send({
                       app: user,
                       message: "New Store Settings Record Update Success !"
                   });
               }
        });
    },
    showPolicies:function(req,res){
        var appId = req.param('appId');
            var searchApp = {
                appId: appId
            };
        ApplicationStoreSettings.find(searchApp, function(err, app) {
            if (err) return done(err);
            res.send(app);
        });
    }

};