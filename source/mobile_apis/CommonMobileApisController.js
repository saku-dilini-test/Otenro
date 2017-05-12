/**
 * Created by kalani on 4/28/17.
 */
/**
 * CommonMobileApisController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 * @help        :: See http://senecajs.org/getting-started/
 */
var fs = require('fs-extra');
var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;


module.exports = function(option) {

    var seneca = this;
    var MongoClient = require('mongodb').MongoClient;

    var url = 'mongodb://localhost:27017/appBuilder';

    MongoClient.connect(url, function(err, db){

       seneca.add( {cmd:'getContactUs' }, getContactUs );
       seneca.add( {cmd:'getAboutUs' }, getAboutUs );
       seneca.add( {cmd:'getPolicies' }, getPolicies );
       seneca.add( {cmd:'viewImages' }, viewImages );
       seneca.add( {cmd:'getTermsAndConditions' }, getTermsAndConditions );



    function getContactUs (req,Done){
    if(req.appID != null){
        var collection = db.collection('applicationcontactus');
        collection.findOne({appId:req.appID}, function(err, item) {
        console.log(item.email)
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


