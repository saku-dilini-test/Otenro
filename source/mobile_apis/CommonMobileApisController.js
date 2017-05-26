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
var express = require('express');
var app = express();


module.exports = function(option) {

    var seneca = this;
    var MongoClient = require('mongodb').MongoClient;

    var url = 'mongodb://localhost:27017/appBuilder';
    var APP_FILE_SERVER = '/home/onbit/Documents/appFileServer/';

    MongoClient.connect(url, function(err, db){

       seneca.add( {cmd:'getContactUs' }, getContactUs );
       seneca.add( {cmd:'getAboutUs' }, getAboutUs );
       seneca.add( {cmd:'getPolicies' }, getPolicies );
       seneca.add( {cmd:'viewImages' }, viewImages );
       seneca.add( {cmd:'getTermsAndConditions' }, getTermsAndConditions );



    function getContactUs (req,Done){
    if(req.appId != null){
        var collection = db.collection('applicationcontactus');
        collection.findOne({appId:req.appId}, function(err, item) {
        console.log(item.email)
            Done( null, { data:item} );
        });
    }

    }

    function getAboutUs (req,Done){
    if(req.appId != null){
        var collection = db.collection('applicationstoresettings');
        collection.findOne({appId:req.appId}, function(err, item) {
            Done( null, { data:item} );
        });
    }
    }

    function getPolicies (req,Done){
    if(req.appId != null){
        var collection = db.collection('applicationstoresettings');
        collection.findOne({appId:req.appId}, function(err, item) {
        console.log('dsadasdadsa'+JSON.stringify(item));
            Done( null, { data:item} );
        });
    }

    }

    function viewImages (req,Done){


                 var data = {
                    'userId':req.userId,
                    'appId':req.appId,
                    'img':req.img
                 }
                 if(data){


                    app.get('/', function view(req, res) {
                    console.log('____________')
                    res.sendFile(APP_FILE_SERVER + data.userId + '/templates/' + data.appId + '/img/'+ data.img);
                    });
                 }





                 //sendfile APP_FILE_SERVER + req.userId + '/templates/' + req.appId + '/img/'+ req.img;

        Done( null, { data: 'fsfds' } );

    }


    function getTermsAndConditions (req,Done){
    if(req.appId != null){
        var collection = db.collection('applicationstoresettings');
        collection.findOne({appId:req.appId}, function(err, item) {
            Done( null, { data:item} );
        });
    }
    }




    })

}


