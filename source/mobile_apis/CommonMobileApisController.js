/**
 * Created by udeshika on 3/24/17.
 */
/**
 * CommonMobileApisController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs-extra');
var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;



/*module.exports =  {


    getContactUs : function(req,res){
        sails.log.debug("debug");
        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };
        sails.log.info(searchApp);
        ApplicationContactUs.findOne(searchApp).exec(function (err, app) {
            if (err) return err;
            res.json(app);
        });
    },
    *//**
     * Return Application Store Setting Collection for Given App Id
     * It has About Us
     * @param req
     * @param res
     *//*
    getAboutUs : function(req,res){
        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };
        sails.log.info(searchApp);
        ApplicationStoreSettings.findOne(searchApp).exec(function (err, app) {
            if (err) return err;
            res.json(app);
        });
    },
    *//**
     * Return Application Store Setting Collection for Given App Id
     * It has policies
     * @param req
     * @param res
     *//*
    getPolicies : function(req,res){
        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };
        sails.log.info(searchApp);
        ApplicationStoreSettings.findOne(searchApp).exec(function (err, app) {
            if (err) return err;
            res.json(app);
        });
    },

    getTermsAndConditions : function(req,res){

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };
        ApplicationStoreSettings.findOne(searchApp).exec(function (err, app) {
            if (err) return err;
            res.json(app);
        });
    },

     *//**
      * return images for given userID & appID & img ( Path + Image name )
      * @param req
      * @param res
      *//*
     viewImages : function(req,res){
         sails.log.debug("viewImages loading..");
         res.sendfile(config.APP_FILE_SERVER + req.param('userId') + '/templates/' + req.param('appId') + '/img/'+ req.param('img'));
     }
}*/

module.exports = function(option) {

/* seneca */

    var seneca = this;

       seneca.add( { role:'process', cmd:'getContactUs' }, getContactUs );
       seneca.add( { role:'process', cmd:'getAboutUs' }, getAboutUs );
       seneca.add( { role:'process', cmd:'getPolicies' }, getPolicies );
       seneca.add( { role:'process', cmd:'viewImages' }, viewImages );
       seneca.add( { role:'process', cmd:'getTermsAndConditions' }, getTermsAndConditions );

    function getContactUs (req,res,Done){
        sails.log.debug("getContactUs loading.." + req.param('appId'));
        var appId = req.param('appId');
            var searchApp = {
                appId: appId
            };
            sails.log.info(searchApp);
            ApplicationContactUs.findOne(searchApp).exec(function (err, app) {
                if (err) return err;
                res.json(app);
                sails.log.debug("gfdsafdsgfdsfdsf..");
            });
        done( null, { result: res } );
    }
    //,


    function getAboutUs (req,res,done){
        sails.log.debug("getAboutUs loading..");
        var appId = req.param('appId');
                var searchApp = {
                    appId: appId
                };
                sails.log.info(searchApp);
                ApplicationStoreSettings.findOne(searchApp).exec(function (err, app) {
                    if (err) return err;
                    res.json(app);
                });
        done( null, { result: res } );
    }

    function getPolicies (req,res,done){
        sails.log.debug("getPolicies loading..");
         var appId = req.param('appId');
                var searchApp = {
                    appId: appId
                };
                ApplicationStoreSettings.findOne(searchApp).exec(function (err, app) {
                    if (err) return err;
                    res.json(app);
                });
        done( null, { result: res } );
    }


    function viewImages (req,res,done){
                 sails.log.debug("viewImages loading..");
                 res.sendfile(config.APP_FILE_SERVER + req.param('userId') + '/templates/' + req.param('appId') + '/img/'+ req.param('img'));

        done( null, { result: res } );
    }


    function getTermsAndConditions (req,res,done){
        sails.log.debug("getTermsAndConditions loading..");
        var appId = req.param('appId');
                var searchApp = {
                    appId: appId
                };
                ApplicationStoreSettings.findOne(searchApp).exec(function (err, app) {
                    if (err) return err;
                    res.json(app);
                });
        done( null, { result: res } );
    }

  }
