/**
 * EmailController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    manageEmailSettings : function(req,res){

        //console.log(req);

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
    }

};