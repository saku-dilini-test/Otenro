var fs = require('fs-extra');
var http = require('http');
var request = require('request');

var config = require('../../../services/config');
var pushService = require('../../../services/pushNotificationsService');
var moment = require('moment');
var dateFormat = require('dateformat');

var PushUrl = config.PUSH_API_URL;
var Authorization = config.AUTHORIZATION;
var schedule = require('node-schedule');

var CSV_DATE_TIME_FORMAT = "DD/MM/YY HH:mm";

module.exports = {



    /**
     * Send push message for given appID
     * @param req
     * @param res
     */
    sendPushMessage: function(req, res){
            var thisCtrl = this;
            var findDevicedQuery = {
                appId : req.body.appId
            };

            var date_diff_indays = function(date1, date2) {
                console.log("date1 " + date1);
                console.log("date2" + date2);
                var dt1 = new Date(date1);
                var dt2 = new Date(date2);
                return Math.floor((Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) - Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) ) /(1000 * 60 * 60 * 24));
            };


                    var Message = req.body.message;

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
                                    sails.log.info("my deviceArray " + deviceArray[i].deviceId);
                                    thisCtrl.sendPushNotification(deviceArray[i].deviceId,null,req.body.message);
                                }
                            }else {
                                sails.log.info("my deviceArray " + deviceArray[i].deviceId);
                                thisCtrl.sendPushNotification(deviceArray[i].deviceId,null,req.body.message);
                            }
                        }
                        PushMessage.create(req.body).exec(function(err,data){
                            if(err) return res.send(err);
                            res.send(data);
                        });
                    });

    },



    saveSchedulePushMassage : function (req,res) {
                var thisCtrl = this;
                var criteria = {id:req.body.id,appId:req.body.appId};
                // Create push collection
                PushMessage.find(criteria).exec(function(err, result) {
                    if (err) return res.send(err);
                    if(result[0]){

                        PushMessage.update(criteria,req.body).exec(function(err,data){
                            if(err) return res.send(err);
                            console.log("date 1 " + data[0].date);
                            var shedDate = new Date(data[0].date);
                            var date = new Date(shedDate.getUTCFullYear(), shedDate.getMonth(), shedDate.getDate(),
                                shedDate.getHours(), shedDate.getMinutes(),0).toLocaleString();
                                console.log("date " + date);
                            schedule.scheduleJob(date, function(){


                                PushMessage.find({id:data[0].id}).exec(function(err, pushMessage) {
                                    if (err) return res.send(err);

                                    if (pushMessage[0]) {

                                    console.log("date--->>>" + pushMessage[0].date);
                                    var Ndate = new Date(pushMessage[0].date);
                                    var newDate = new Date(Ndate.getUTCFullYear(), Ndate.getMonth(), Ndate.getDate(),
                                        Ndate.getHours(), Ndate.getMinutes(), 0).toLocaleString();

                                    if (newDate.toString() == date.toString()) {

                                        console.log("newDate.toString()==date.toString()");

                                        // Find device by appID
                                        DeviceId.find({appId: data[0].appId}).exec(function (err, deviceArray) {
                                            if (err) {

                                                console.log("Error on find DeviceId");
                                            }
                                            var message = data[0].message;
                                            var article = (data[0].article)? { 'articleId': data[0].article.id , 'categoryId': data[0].article.categoryId , 'title' : data[0].article.title } : null;
                                            for (var i = 0; i < deviceArray.length; i++) {

                                                sails.log.info(" deviceArray " + deviceArray[i].deviceId);

                                                thisCtrl.sendPushNotification(deviceArray[i].deviceId,article,message);
                                            }
                                        });
                                        console.log('The world is going to end today.');
                                    }
                                }
                                });


                            });


                            return res.send(data);
                        });

                    }else {


                        PushMessage.create(req.body).exec(function(err,data){
                            if(err) return res.send(err);

                                var shedDate = new Date(data.date);
                                var date = new Date(shedDate.getUTCFullYear(), shedDate.getMonth(), shedDate.getDate(),
                                    shedDate.getHours(), shedDate.getMinutes(),0).toLocaleString();

                                console.log("date " + date);

                                schedule.scheduleJob(date, function(){

                                    PushMessage.find({id:data.id}).exec(function(err, pushMessage) {
                                        if (err) return res.send(err);
                                        if(pushMessage[0]){
                                        console.log("date--->>>" + pushMessage[0].date);
                                        var Ndate = new Date(pushMessage[0].date);
                                        var newDate = new Date(Ndate.getUTCFullYear(), Ndate.getMonth(), Ndate.getDate(),
                                            Ndate.getHours(), Ndate.getMinutes(),0).toLocaleString();

                                        if(newDate.toString()==date.toString()){

                                            console.log("newDate.toString()==date.toString()");

                                            // Find device by appID
                                            DeviceId.find({appId:data.appId}).exec(function(err,deviceArray) {
                                                if (err) {

                                                    console.log("Error on find DeviceId");
                                                }
                                                var message = data.message;
                                                var article = (data.article)? { 'articleId': data.article.id , 'categoryId': data.article.categoryId , 'title' : data.article.title } : null;
                                                for(var i=0; i<deviceArray.length; i++) {

                                                    sails.log.info(" deviceArray " + deviceArray[i].deviceId);
                                                    thisCtrl.sendPushNotification(deviceArray[i].deviceId,article,message);
                                                }
                                            });
                                            console.log('The world is going to end today.');
                                        }
                                    }
                                    });
                                    console.log('The world is going to end today.');
                                });

                            return res.send(data);
                        });
                    }
                });
        
    },

    getAllArticles : function(req,res){
        var appId = req.param('appId');

        var searchQuery = {
            appId: appId
        };

        Article.find(searchQuery).exec(function(err,data){
            if(err) return res.send(err);
            // console.log(data);
            return res.send(data);
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
            userId:userId,
            sort: 'createdAt DESC'
        };
        PushMessage.find(searchApp).exec(function(err, app) {
            if (err) return res.send(err);
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
            if (err) return res.send(err);
            res.send(app);
        })
    }
,


    saveSchedulePushMassageFile : function (req,res) {
        var engageCtrl = this;
        var dePath = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId;

        console.log("dePath " + dePath);


        req.file('file').upload({
            dirname: require('path').resolve(dePath)
        }, function (err, uploadedFiles) {
            if (err) {
                console.log("error --- >>> " + err);
                return res.send(500, err);
            }

            var errorsInCsv = null;
            var csvRows = [];
            //res.send({status : "ok"});

            var newFileName = req.body.appId+'.csv';
            fs.rename(uploadedFiles[0].fd, dePath+'/'+newFileName, function (err) {
                if (err) {
                    return res.send(err);
                } else {
                    var rowNumber = 1;
                    const csvFilePath=dePath+"/"+newFileName;
                    const csv=require('csvtojson');
                    csv().fromFile(csvFilePath).on('json',(jsonObj)=>{

                    if(errorsInCsv == null){

//                        var date = engageCtrl.formatDate(new Date(jsonObj.dateTime));

                        if (!moment(jsonObj.dateTime, CSV_DATE_TIME_FORMAT, true).isValid()){
                            sails.log.debug("Invalid date format in row "  + rowNumber + " , correct date/time format is " + CSV_DATE_TIME_FORMAT);
                            errorsInCsv = "Invalid date format in row "  + rowNumber + " ,  correct date/time format is " + CSV_DATE_TIME_FORMAT;
                        }

                        if (jsonObj.message.length == 0){
                            sails.log.debug("Message is empty in row " + rowNumber);
                            errorsInCsv = "Message is empty in row " + rowNumber;
                        }
                        csvRows.push(jsonObj);
                    }

                    rowNumber++;
                }).on('done',()=>{
                    console.log("Looping done");

                        if(errorsInCsv!=null){
                            res.badRequest(errorsInCsv);
                            return;
                        }

                        if(csvRows.length == 0){
                            res.badRequest("No push messages uploaded!");
                            return;
                        }

                        //Insert the Push Messages read from csv
                        csvRows.forEach(function(rowObj){
                            engageCtrl.persistCSVPushMessages(req,res,rowObj);
                        });

                        var searchApp ={
                            appId: req.body.appId,
                            userId:req.userId
                        }

                        PushMessage.find(searchApp).exec(function(err, app) {
                        if (err) return res.send(err);

                        sails.log.debug("Success upload");
                        res.send(app);
                    });
                }).on('error',(err)=>{
                    console.log("Error when uploading push messages Error: " + err);
                    res.serverError("Error when uploading push messages");
                })
                }
            });
        });

        // function formatDate (date){
        //     var year, month, day, hours, minutes;
        //     year = date.getFullYear();
        //     month = date.getMonth()+1;
        //     day = date.getDate();
        //     hours = date.getHours();
        //     minutes = date.getMinutes();
        //     if (month < 10) {
        //         month = "0" + month;
        //     }
        //     if (day < 10) {
        //         day = "0" + day
        //     }
        //     if (hours < 10) {
        //         hours = "0" + hours
        //     }
        //     if (minutes < 10) {
        //         minutes = "0" + minutes
        //     }
        //     return day + '/'+ month + '/' + year + " " + hours + ":" + minutes;
        //
        // }
    },

    formatDate : function(date){
        var year, month, day, hours, minutes;
        year = date.getFullYear();
        month = date.getMonth()+1;
        day = date.getDate();
        hours = date.getHours();
        minutes = date.getMinutes();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day
        }
        if (hours < 10) {
            hours = "0" + hours
        }
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        return day + '/'+ month + '/' + year + " " + hours + ":" + minutes;
    },

    persistCSVPushMessages : function(req,res,jsonObj){
        var thisCtrl = this;
        var type = req.body.type;

        var date_diff_indays = function(date1, date2) {
            console.log("date1 " + date1);
            console.log("date2" + date2);
            var dt1 = new Date(date1);
            var dt2 = new Date(date2);
            return Math.floor((Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) - Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) ) /(1000 * 60 * 60 * 24));
        };

        if (moment(jsonObj.dateTime, CSV_DATE_TIME_FORMAT, true).isValid()&&jsonObj.message.length > 0){

            console.log(jsonObj.dateTime + "" + jsonObj.message);
            var data = {date:jsonObj.dateTime,message:jsonObj.message,appId:req.body.appId,userId:req.userId,type:type};

            PushMessage.create(data).exec(function(err,data){
                if(err) return res.send((500,{message:"Invalid csv file. Please use sample csv template"}));
                var shedDate = new Date(data.date);
                var date = new Date(shedDate.getUTCFullYear(), shedDate.getMonth(), shedDate.getDate(),
                    shedDate.getHours(), shedDate.getMinutes(),0).toLocaleString();

                console.log("date " + date);

                schedule.scheduleJob(date, function(){

                    PushMessage.find({id:data.id}).exec(function(err, pushMessage) {
                        if (err) return res.send(err);
                        if(pushMessage[0]){
                            console.log("date--->>>" + pushMessage[0].date);
                            var Ndate = new Date(pushMessage[0].date);
                            var newDate = new Date(Ndate.getUTCFullYear(), Ndate.getMonth(), Ndate.getDate(),
                                Ndate.getHours(), Ndate.getMinutes(),0).toLocaleString();

                            if(newDate.toString()==date.toString()){

                                console.log("newDate.toString()==date.toString()");

                                // Find device by appID
                                DeviceId.find({appId:data.appId}).exec(function(err,deviceArray) {
                                    if (err) {

                                        console.log("Error on find DeviceId");
                                    }
                                    var message = data.message;
                                    var article = (data.article)? { 'articleId': data.article.id } : null;

                                    for(var i=0; i<deviceArray.length; i++) {

                                        sails.log.info(" deviceArray " + deviceArray[i].deviceId);
                                        if (type === "I"){
                                            var count = date_diff_indays(dateFormat(new Date(),"m/d/yy"),dateFormat(deviceArray[i].lastAccessTime,"m/d/yy"));
                                            if (count > 7) {
                                                thisCtrl.sendPushNotification(deviceArray[i].deviceId,article,message);
                                            }
                                        } else {
                                            thisCtrl.sendPushNotification(deviceArray[i].deviceId,article,message);
                                        }
                                    }
                                });
                                console.log('The world is going to end today.');
                            }
                        }
                    });
                    console.log('The world is going to end today.');
                });
            });

        }else{
            sails.log.error("Invalid date format");
        }
    },

    sendSampleFile : function (req,res) {

                var path = require('path');
                var mime = require('mime');
                var fs = require('fs');

                var file = sails.config.appPath+'/api/services/push_sample.csv';
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


    },

    sendPushNotification: function(deviceId,data,message){
        var msg = {
            "to": deviceId,
            "notification" : {
                "body" : message
            }
        };

        if(data){
            msg.data = data;
        }

        pushService.sendPushNotification(msg);
    },

    startSchedulingJob : function () {
        var thisCtrl = this;
        console.log("scheduling started ..............");

        PushMessage.find().exec(function(err, pushMessage) {
            if (err) return res.send(err);

            pushMessage.forEach(function(data) {

                var shedDate = new Date(data.date);

                if (shedDate.getHours()&&shedDate.getMinutes()){

                    var date = new Date(shedDate.getUTCFullYear(), shedDate.getMonth(), shedDate.getDate(),
                        shedDate.getHours(), shedDate.getMinutes(),0).toLocaleString();

                    console.log("date " + date);

                     schedule.scheduleJob(date, function(){


                         // Find device by appID
                         DeviceId.find({appId:data.appId}).exec(function(err,deviceArray) {
                             if (err) {

                                 console.log("Error on find DeviceId");
                             }
                             var message = data.message;
                             var article = (data.article)? { 'articleId': data.article.id } : null;

                             for(var i=0; i<deviceArray.length; i++) {

                                 sails.log.info(" deviceArray " + deviceArray[i].deviceId);

                                 thisCtrl.sendPushNotification(deviceArray[i].deviceId,article,data.message);
                             }
                         });
                        console.log('The world is going to end today.');
                    });
                }
            })
        });
    }
}



