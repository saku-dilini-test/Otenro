/**
 * IPGController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs-extra'),
    xml2js = require('xml2js'),
    config = require('../../../services/config');
module.exports = {


    /**
     * update IPG Details collections for given IPG Details Id
     * If not create new IPG collections
     * @param req
     * @param res
     */
    updateIPGInfo : function(req,res){

        var searchQuery = {
            id : req.body.id
        };

        var payPalEnv = '';
        var authKey = '';
        if (sails.config.environment === 'production'){
            payPalEnv = "PayPalEnvironmentProduction";
            authKey = 'prod-xxx';
        }else {
            payPalEnv = "PayPalEnvironmentSandbox";
            authKey = 'sandbox-xxx';
        }
        var tempAppDirPath = config.ME_SERVER + req.body.userId + '/templates/' + req.body.appId;
        var updateData = req.body;
        if(typeof req.body.id != 'undefined'){
            IPGDetails.update(searchQuery,updateData,function(err,ipg) {
                if (err) return res.send(err);
                console.log(JSON.stringify(ipg[0].paypalKey));
                if (typeof ipg[0].paypalKey !='undefined'){
                    var appJsFilePath = tempAppDirPath + '/js/app.js';
                    fs.readFile(appJsFilePath, 'utf-8',
                        function (err, data) {
                            if (err) return res.negotiate(err);

                                              
                             data = data.replace(authKey, ipg[0].paypalKey);
                             data = data.replace("paypalEnv",payPalEnv);

                            fs.writeFile(appJsFilePath, data , 'utf-8', function (err) {
                                if (err) return res.negotiate(err);
                            });
                        });
                }
                return res.send(200, {message: 'Payment Settings Successfully Updated'});
            });
        }else{
            IPGDetails.create(updateData).exec(function (err, ipg) {
                if (err) return res.send(err);
                console.log(JSON.stringify(ipg));
                if (typeof ipg.paypalKey !='undefined'){
                    var appJsFilePath = tempAppDirPath + '/js/app.js';
                    fs.readFile(appJsFilePath, 'utf-8',
                        function (err, data) {
                            if (err) return res.negotiate(err);

                            
                            data = data.replace(authKey, ipg.paypalKey);
                            data = data.replace("paypalEnv",payPalEnv);

                            fs.writeFile(appJsFilePath, data , 'utf-8', function (err) {
                                if (err) return res.negotiate(err);
                            });
                        });
                }
                return res.send(200, {message: 'IPG Details successfully created'});
            });
        }
    },

    /**
     * return IPG Details collections for given app Id
     * @param req
     * @param res
     */
    getIPGInfo : function(req,res){
        var appId = req.param('appId');
        sails.log.info(appId);
        var searchQuery = {
            appId: appId
        };
        IPGDetails.findOne(searchQuery).exec(function(err, result) {
            sails.log.info(result);
            if (err) return res.send(err);
            return res.send(result);
        });
    }
    
};