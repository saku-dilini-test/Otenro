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

/*

module.exports =  {


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
            console.log(app);
        });
    },
*/
/**
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

*/
/**
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


*/
/**
      * return images for given userID & appID & img ( Path + Image name )
      * @param req
      * @param res
      *//*


     viewImages : function(req,res){
         sails.log.debug("viewImages loading..");
         res.sendfile(config.APP_FILE_SERVER + req.param('userId') + '/templates/' + req.param('appId') + '/img/'+ req.param('img'));
     }

}



*/


/* seneca */



module.exports = function(option) {

    var seneca = this;
    var MongoClient = require('mongodb').MongoClient;

    var url = 'mongodb://localhost:27017/appBuilder';
    var appID,results,item;


    MongoClient.connect(url, function(err, db){

       seneca.add( { role:'process', cmd:'getContactUs' }, getContactUs );
       seneca.add( { role:'process', cmd:'getAboutUs' }, getAboutUs );
       seneca.add( { role:'process', cmd:'getPolicies' }, getPolicies );
       seneca.add( { role:'process', cmd:'viewImages' }, viewImages );
       seneca.add( { role:'process', cmd:'getTermsAndConditions' }, getTermsAndConditions );


    function getContactUs (req,Done){
    if(req.appID != null){
        var collection = db.collection('applicationcontactus');
        collection.findOne({appId:req.appID}, function(err, item) {
            Done( null, { result:item} );
        });
    }

    }

    function getAboutUs (req,Done){
    if(req.appID != null){
        var collection = db.collection('applicationstoresettings');
        collection.findOne({appId:req.appID}, function(err, item) {
            Done( null, { result:item} );
        });
    }
    }

    function getPolicies (req,done){
    if(req.appID != null){
        var collection = db.collection('applicationstoresettings');
        collection.findOne({appId:req.appID}, function(err, item) {
            Done( null, { result:item} );
        });
    }

    }

    function viewImages (req,done){
                 console.log("viewImages loading..");
                 res.sendfile(config.APP_FILE_SERVER + req.param('userId') + '/templates/' + req.param('appId') + '/img/'+ req.param('img'));

        done( null, { result: 'fsfds' } );
    }


    function getTermsAndConditions (req,Done){
    if(req.appID != null){
        var collection = db.collection('applicationstoresettings');
        collection.findOne({appId:req.appID}, function(err, item) {
            Done( null, { result:item} );
        });
    }
    }

    })

}


