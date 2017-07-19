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
var router = express.Router();
var base64Img = require('base64-img');

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
                console.log(req.appId)
                var collection = db.collection('applicationcontactus');
                collection.findOne({appId:req.appId}, function(err, item) {
                console.log(item.email)
                    Done( null, item);
                });
            }
        }

        function getAboutUs (req,Done){
            if(req.appId != null){
                var collection = db.collection('applicationstoresettings');
                collection.findOne({appId:req.appId}, function(err, item) {
                console.log("getAboutUs::"+JSON.stringify(item))
                    Done( null, item);
                });
            }
        }

        function getPolicies (req,Done){
            if(req.appId != null){
                var collection = db.collection('applicationstoresettings');
                collection.findOne({appId:req.appId}, function(err, item) {
                    console.log('dsadasdadsa'+JSON.stringify(item));
                    Done( null, item );
                });
            }

        }

        function viewImages (req,respond){

            var http = require('http'),fs = require('fs'),image;
            var filepath = APP_FILE_SERVER + req.userId + '/templates/' + req.appId + '/img/'+ req.img;

            if(req.img){

                // function to encode file data to base64 encoded string
                function base64_encode(file) {

                    var bitmap = fs.readFileSync(file);
                    return new Buffer(bitmap).toString('base64');

                }
                var base64str = base64_encode(filepath);

                respond(null,{imageSrc:'data:image/jpeg;base64,'+base64str})

             }

        }

        function getTermsAndConditions (req,Done){
            if(req.appId != null){
                var collection = db.collection('applicationstoresettings');
                collection.findOne({appId:req.appId}, function(err, item) {
                    Done( null,item );
                });
            }
        }

    })

}


