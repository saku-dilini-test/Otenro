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

    function viewImages (req,Done){

        // hard won knowledge from http://stackoverflow.com/questions/20035615/using-raw-image-data-from-ajax-request-for-data-uri
        /*var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xhr = new XMLHttpRequest();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function(e) {
          var arr = new Uint8Array(this.response);
          var raw = String.fromCharCode.apply(null,arr);
          var b64 = base64.encode(raw);
          var dataURL=app;"base64," + b64;
        };*/



         var app = ('/var/www/html/meServer/temp/'+ req.userId + '/templates/' + req.appId + '/img/'+ req.img);
         //sendfile APP_FILE_SERVER + req.userId + '/templates/' + req.appId + '/img/'+ req.img;

         Done( null, app);
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


