var fs = require('fs-extra');
var http = require('http');
var request = require('request');

var config = require('../../../services/config');
var moment = require('moment');
var dateFormat = require('dateformat');

module.exports = {


    /**
     * Send push message for given appID
     * @param req
     * @param res
     */
    sendPushMessage: function(req, res){

        // Create push collection
     /*  PushMessage.create(req.body).exec(function(err,data){
            if(err) return done(err);*/

            var findDevicedQuery = {
                appId : req.body.appId
            };

            var date_diff_indays = function(date1, date2) {
                console.log("date1 " + date1);
                console.log("date2" + date2);
                var dt1 = new Date(date1);
                var dt2 = new Date(date2);
                return Math.floor((Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) - Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) ) /(1000 * 60 * 60 * 24));
            }

            // Testing dummy data here
            // var pushUrl = "https://api.ionic.io/push/notifications";
            // var profile = "dev_push_sun";
            // var Authorization = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwM2RjZDE0ZS0zNGRhLTQyZDYtYTAyZi0wNWFmZmE3OTBjODAifQ.wB9jy0C3a0bn4eb4wKvr521UwqIB0gTQXn5DYk92_KE";

            // Find device by appID
            PushConfig.findOne(findDevicedQuery).exec(function(err,pushConfigData){


                sails.log.debug( pushConfigData);
                if (pushConfigData == 'undefined'){
                    return res.serverError();
                }else {
                    var Message = req.body.message;
                    var PushUrl = config.PUSH_API_URL;
                    var Profile = pushConfigData.profile;
                    var Authorization = "Bearer "+pushConfigData.authorization;


                    // Find device by appID
                    DeviceId.find(findDevicedQuery).exec(function(err,deviceArray){
                        if (err) return res.send(err);
                        var message = req.body.message;
                        for(var i=0; i<deviceArray.length; i++){

                            // push API request
                            if (req.body.type=="I"){

                                var count = date_diff_indays(dateFormat(new Date(),"m/d/yy"),dateFormat(deviceArray[i].lastAccessTime,"m/d/yy"));
                                console.log("count " + count);

                                if(count>7){

                                    sails.log.info(" deviceArray " + deviceArray[i].deviceId);
                                    request.post(PushUrl,
                                        {json:{"tokens": [deviceArray[i].deviceId],
                                            "profile": Profile,
                                            "notification": {
                                                "message": Message
                                            }},
                                            headers:{
                                                'Content-Type': 'application/json',
                                                'Authorization': Authorization
                                            }} , function(error, response, body){
                                            if (error) sails.log.info(error);
                                            sails.log.info("push response "+JSON.stringify(response));
                                            sails.log.info("push response "+response);
                                        });
                                }



                            }else {

                                sails.log.info(" deviceArray " + deviceArray[i].deviceId);
                                request.post(PushUrl,
                                    {json:{"tokens": [deviceArray[i].deviceId],
                                        "profile": Profile,
                                        "notification": {
                                            "message": Message
                                        }},
                                        headers:{
                                            'Content-Type': 'application/json',
                                            'Authorization': Authorization
                                        }} , function(error, response, body){
                                        if (error) sails.log.info(error);
                                        sails.log.info("push response "+JSON.stringify(response));
                                        sails.log.info("push response "+response);
                                    });

                            }

                        }
                        PushMessage.create(req.body).exec(function(err,data){
                            if(err) return done(err);
                            res.send(data);
                        });
                    });
                }
            });
      /*  });*/
    },



    saveSchedulePushMassage : function (req,res) {

        var findDevicedQuery = {
            appId : req.body.appId
        };
        PushConfig.findOne(findDevicedQuery).exec(function(err,pushConfigData) {
            
            //sails.log.debug(pushConfigData);
            if (!pushConfigData) {
                return res.serverError();
            }else {
                var criteria = {id:req.body.id,appId:req.body.appId};
                // Create push collection
                PushMessage.find(criteria).exec(function(err, result) {
                    if (err) return res.send(err);
                    if(result[0]){

                        PushMessage.update(criteria,req.body).exec(function(err,data){
                            if(err) return done(err);
                            return res.send(data);
                        });

                    }else {
                        PushMessage.create(req.body).exec(function(err,data){
                            if(err) return done(err);
                            return res.send(data);
                        });
                    }
                });


            }

        });
        
    },

    // get registered user Details

    getAppUserData : function(req,res){
        var appId = req.param('appId');
        var searchQuery = {
            appId: appId
        };
        AppUser.find(searchQuery).exec(function(err, result) {
            if (err) return res.send(err);
            return res.send(result);
        });
    },


    getMessageDetails: function(req, res){
    var appId = req.param('appId');
    var userId = req.param('userId');
        var searchApp ={
            appId: appId,
            userId:userId
        }
        PushMessage.find(searchApp).exec(function(err, app) {
            if (err) return done(err);
            res.send(app);
        });

    },

    getUserOrders: function (req, res) {
        var registeredUser = req.param('registeredUser');
        sails.log.info(registeredUser);
        sails.log.info(req.param('registeredUser'));
        var searchApp = {
            registeredUser: registeredUser
        }
        ApplicationOrder.find(searchApp).exec(function (err, app) {
            if (err) return done(err);
            res.send(app);
        })
    }
,


    saveSchedulePushMassageFile : function (req,res) {

        var dePath = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId;
        console.log("dePath " + dePath);

        console.log(req.file);

        req.file('file').upload({
            dirname: require('path').resolve(dePath)
        }, function (err, uploadedFiles) {
            if (err) {
                console.log("error --- >>> " + err);
                return res.send(500, err);
            }
            //res.send({status : "ok"});

            var newFileName = req.body.appId+'.csv';
            fs.rename(uploadedFiles[0].fd, dePath+'/'+newFileName, function (err) {
                if (err) return res.send(err);
                else {

                const csvFilePath=dePath+"/"+newFileName;
                const csv=require('csvtojson')
                csv().fromFile(csvFilePath)
                        .on('json',(jsonObj)=>{

                        console.log(jsonObj.dateTime + "" + jsonObj.message);
                    var data = {date:jsonObj.dateTime,message:jsonObj.message,appId:req.body.appId,userId:req.userId,type:jsonObj.type};

                    PushMessage.create(data).exec(function(err,resultdata){
                        console.log("resultdata " + JSON.stringify(resultdata));
                        if(err) {
                            return res.send((500,{message:"Invalid csv file. Please use sample csv template"}));
                        }

                    });
                }).on('done',()=>{
                        var searchApp ={
                            appId: req.body.appId,
                            userId:req.userId
                        }
                        PushMessage.find(searchApp).exec(function(err, app) {
                        if (err) return done(err);
                        res.send(app);
                    });
                }).on('error',(err)=>{
                        console.log(err)
                    return res.send((500,{message:"Invalid csv file. Please use sample csv template"}));
                })
                }
            });
        });

    },

    sendSampleFile : function (req,res) {

                var path = require('path');
                var mime = require('mime');
                var fs = require('fs');

                var file = config.ME_SERVER +"sample.csv";

                var filename = path.basename(file);
                var mimetype = mime.lookup(file);
                res.setHeader('x-filename', filename);
                res.setHeader('Content-disposition', 'attachment; filename=' + filename);
                res.setHeader('Content-type', mimetype);
                var filestream = fs.createReadStream(file);
                filestream.pipe(res);
                console.log("The file was saved!");
    },


    deletePushMessage :function (req,res) {

        //PushMessage.destroy({id:req.body.id,appId:req.body.appId});

        PushMessage.destroy({id:req.body.id,appId:req.body.appId}, function (err) {
            if (err) return err;
            console.log("deleted");
            return res.ok();

        });


    }



}



