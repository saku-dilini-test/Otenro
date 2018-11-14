


var fs = require('fs-extra'),
    xml2js = require('xml2js'),
    config = require('../../services/config'),
    email  = require('../../../node_modules/emailjs/email');

    const nodemailer = require('nodemailer');
var sentMails = require('../../services/emailService');
var pushNotificationService = require('../../services/pushNotificationsService');

var server  = email.server.connect({
    user:    "onbilabsttest@gmail.com",
    password:"0nb1tl@b$",
    host:    "smtp.gmail.com",
    ssl:     true
});

if(config.USE_SENDMAIL){
    transporter = nodemailer.createTransport({
        sendmail: true,
        newline: 'unix',
        path: '/usr/sbin/sendmail'
    });
}else{
    transporter = nodemailer.createTransport({
        host: 'appmaker.lk',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'no_reply_ideadroid@appmaker.lk', // generated ethereal user
            pass: 'FoRH7DAyKG' // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        }
    });
}

 // Response messages
 var ERROR = { message: 'ERROR'},
     NOT_FOUND = { message: 'NOT_FOUND'},
     SUCCESS = { message: 'SUCCESS'};

module.exports = {

    /**
     * get All AppsData
     *
     */
    getAllAppsData: function (req, res) {
        Application.find().exec(function (err, appsData) {
            if (err) res.send(err);
            res.json(appsData);

        });
    },


    getUserApps : function (req, res) {
        console.log("req.body.userId " + req.body.userId);
        var userApps = {
            userId : req.body.userId
        }
        Application.find(userApps).exec(function (err, appsData) {
            if (err) res.send(err);
            res.json(appsData);

        });

    },

    /**
         * get All userData
         *
         */

     getAlluserData : function (req, res) {

            User.find().exec(function (err, publishedData) {
                if (err) res.send(err);
                res.send(publishedData);

            });

        },

    getAllAduserData : function (req, res) {
        var searchAd = {
            adagent : {$ne : null}
        }
        User.find(searchAd).exec(function (err, publishedData) {
            if (err) res.send(err);
            res.send(publishedData);

        });

    },


    getAllAddNetworks : function (req, res) {

        AdAgentInfo.find().exec(function (err, publishedData) {
            if (err) res.send(err);
            res.send(publishedData);

        });

    },

    getAddNetwork : function (req, res) {
        var appId = req.param('addname');
        var searchAd = {
            adagentname :appId
        }
        AdAgentInfo.findOne(searchAd).exec(function (err, publishedData) {
            if (err) res.send(err);
            res.send(publishedData);

        });

    },


    /**
     * get Publish Details of the Application
     *
     */
    getPublishDetails : function (req, res) {
        var searchApp = {
            appId :req.body.appId,
        }

        sails.log.info("req.body.appId " + req.body.appId);
        
        PublishDetails.find(searchApp).exec(function (err, publishedData) {
            if (err) res.send(err);
            res.json(publishedData);

        });

    },

    getAllPublishDetails : function (req, res) {
        var techCtrl = this;

        PublishDetails.find().exec(function (err, publishedData) {
            if (err) res.send(err);

            techCtrl.populateOverallAppStatus(publishedData);

            res.send(publishedData);
        });

    },

    populateOverallAppStatus: function(publishDetailList) {
        var techCtrl = this;

        publishDetailList.forEach(function(app){
            app.publishedStatus = '';
            if(app.operators) {
                var statusCode = techCtrl.getOverallStatus(app.operators);
                if(statusCode!==null) {
                    app.publishedStatus = statusCode;
                }
            }
        });
    },

    getOverallStatus: function(operators){
        var appStatus = null;

        for(var i=0;i<operators.length;i++){
            var op = operators[i];

            if(op.status==='APPROVED'){
                return 'APPROVED';
            }

            if(appStatus===null){
                appStatus = op.status;
            }else if(appStatus!==op.status){
                return null;
            }
        }
        return appStatus;
    },

    /**
     * get Push Config Details for given appID*
     */
    getPushConfigDetails : function (req, res) {
        var appId = req.param('appId');
        var searchApp = {
            appId : appId
        };
        
        PushConfig.findOne(searchApp).exec(function (err, pushConfigData) {
            if (err) res.send(err);
            res.json(pushConfigData);
        });

    },

    /**
     * Save add network
     * @param req
     * @param res
     */
    saveAdNetwork : function (req, res){
        var adNetwork = req.body;

        if(adNetwork.id){
            var searchAd = {
                id :adNetwork.id
            }
            AdAgentInfo.update(searchAd, adNetwork).exec(function (err, result) {
                if (err) return res.send(err);
                return res.send(200, {message: 'Ad network has been  successfully updated'});
            });
        }else{
            AdAgentInfo.create(adNetwork).exec(function (err, result) {
                if (err) return res.send(err);
                return res.send(200, {message: 'Ad network has been  successfully added'});
            });
        }

    },

    /**
     * Delete add network
     * @param req
     * @param res
     */
    deleteAdNetwork : function (req, res){
        var adNetwork = req.body;

        var searchAd = {
            id :adNetwork.id
        }
        AdAgentInfo.destroy(searchAd).exec(function (err, result) {
            if (err) return res.send(err);
            return res.send(200, {message: 'Ad network has been  successfully deleted'});
        });


    },

    /**
     * save Push Config Details for given appID
     */
    savePushConfigDetails : function (req, res) {
        
        var userData   = req.body;
        var appId      = userData.appId;
        var userId     = userData.userId;
        var ionicAPPID = userData.ionicAPPID;
        var senderID   = userData.senderID;
        var tempAppDirPath = config.ME_SERVER + userId + '/templates/' + appId;
        var searchQuery = {
            appId : appId
        };
        // update push-config-details for given appId
        PushConfig.update(searchQuery,userData).exec(function(err,updateResult) {
            if (err) res.send(err);
            else {
                // if not update
                if (updateResult.length == 0) {
                    // create new pushConfig Collection
                    PushConfig.create(userData).exec(function(err,createResult) {
                        if (err) res.send(err);
                        else {
                            sails.log.info('Successfully Create Push Config Details');
                            res.send(200,createResult);
                        }
                    });
                }
                else{
                    sails.log.info('Successfully Update Push Config Details');
                    res.send(200,updateResult);
                }
                
                // Sender ID update here
                if(ionicAPPID || senderID) {
                    
                    // app.js file path 
                    var appJsFilePath = tempAppDirPath + '/js/app.js';
                    
                    // Update in app.js file
                    fs.readFile(appJsFilePath, 'utf-8',
                        function (err, data) {
                            if (err) return res.negotiate(err);

                            var findIonicAppID = '8307b439'; // TODO : This may be change Later
                            var findSenderID   = '528602483901'; // TODO : This may be change later
                            if(ionicAPPID){
                                data = data.replace(findIonicAppID, ionicAPPID);
                            }
                            if(senderID) {
                                data = data.replace(findSenderID, senderID);
                            }
                            fs.writeFile(appJsFilePath, data , 'utf-8', function (err) {
                                if (err) return res.negotiate(err);
                            });
                        });
                }

                // Sender ID update here
                if(senderID){

                    // Update in config.xml file
                    fs.readFile(tempAppDirPath + '/config.xml', 'utf-8',
                        function(err, data) {
                            if (err){
                                sails.log.info(err);
                            }else{
                                var parser = new xml2js.Parser(),
                                    xmlBuilder = new xml2js.Builder();

                                parser.parseString(data, function (err, result) {

                                    result.widget['plugin'][0].variable[0]['$'].value = senderID;
                                    var xml = xmlBuilder.buildObject(result);

                                    fs.writeFile(tempAppDirPath + '/config.xml', xml,'utf-8',
                                        function(err) {
                                            if (err){
                                                sails.log.info(err);
                                            }else{
                                                sails.log.info('Successfully update config.xml')
                                            }
                                        });
                                });
                            }
                        });
                }
            }
        });

    },



    /**
     * final step of the publishing. after
     * publishing  the app send mail to customer.
     */
    changePublishStatus : function (req,res) {
        sails.log.info("req.body.appId  " + req.body.appId);
        var searchAppDataDetails = {
            appId :req.body.appId
        }

        PublishDetails.findOne(searchAppDataDetails).exec(function(err, publishDetails) {
            if (err) res.send(err);
            else {
                sails.log.info("req.publishDetails " + publishDetails.appId);
                var searchAppDataApp = {
                    id :publishDetails.appId
                }

                Application.update(searchAppDataApp, {status :"PUBLISHED"}).exec(function(err,app) {
                    if (err) res.send(err);
                    else {

                        // Email Subject
                        var emailSubject = 'Congratulation ! Your ' +
                            publishDetails.title +' application have been published . ';
                        // Email Body
                        var emailBody    =  "<html>" +
                            "<p>  Congratulation ! " + '<br>' + 'Your '  + publishDetails.title +
                                 ' application have been published on google play. You can view it on ' +
                                 'https://play.google.com/store/apps/category/BUSINESS?hl=en By searching with '+
                                '<B>' + publishDetails.title +  "</B></p>"

                            "</html>";

                        sails.log.info("app.email  " + publishDetails.email);
                        // Email Content
                        var emailDetails = {
                            from    : "onbilabsttest@gmail.com",
                            to      : publishDetails.email,
                            cc      : '',
                            subject : emailSubject,
                            attachment  :
                                [
                                    { data : emailBody, alternative : true }
                                ]
                        };
                        // PublishDetails Update or Create Email Notification Function
                        server.send(emailDetails, function (err, message) {
                            if (err) res.send(err);
                            else {
                                res.send({
                                    appId: app.appId,
                                    message: "Send Mail Successfully"
                                });
                            }
                        });
                    }
                });
            }
        });
    },

    setAppstatus : function(req,res){
        var thisCtrl = this;
        var idPD = {appId:req.body.id}
        console.log(req.body.operators);

        PublishDetails.findOne(idPD).exec(function(err,data){

            console.log(data.operators);

            data.operators.forEach(function(ele){
                req.body.operators.forEach(function(op){
                     if(ele.operator == op.operator){
                           ele.status = op.status;
                           console.log("ele :" + ele);
                     }
                });

            });

        var statusPD = { operators: data.operators };

            PublishDetails.update(idPD,statusPD).exec(function(err,details){

                if (err){res.send(err);}
                res.send('ok');
            });
        });

    },

    isApproved : function(operators){
        var isApproved = false;
        if(operators){
            operators.forEach(function(op){
                if(op.status==="APPROVED"){
                    isApproved = true;
                }
            });
        }
        return isApproved;
    },

    sendApkEmail : function(req,res){

        sentMails.sendApkEmail(req.body, function(err,result){
            if(err){
                res.send(500);
            }else{
            console.log("res. send");
                res.send("success");
            }
        });

    },

    getApk : function(req,res){
        res.sendfile(config.ME_SERVER + "test.apk");
    },

    getOperators : function(req,res){
        res.send(config.IDEABIZ_USER_NETWORK_CLIENTS);
    },
    getAppStatus : function(req,res){
        res.send(config.IDEABIZ_ADMIN_APP_STATUS);
    },
    setOperators : function(req,res){

        var id = {appId:req.body.id}

        PublishDetails.update(id,{operators:req.body.operators}).exec(function(err,result){
            res.send('ok');
        })

    },
    setComments : function(req,res){

        var operator = null;
        var userCode="";
        var commentData;

            User.findOne({id:req.userId}).exec(function(err, user){
                if(err) res.send(err);
                else{
                    console.log(config.USER_ROLES.OPERATOR.code);
                    if(user.userRole.includes(config.USER_ROLES.OPERATOR.code)){
                        operator = user.operator;
                        userCode = user.operator;
                    }else if(user.userRole.includes(config.USER_ROLES.SUPER_ADMIN.code)){
                        userCode = "Admin";
                    }

                    commentData = {
                            appId:req.body.id,
                            comment:req.body.comment,
                            userId:req.userId,
                            operator: operator
                    };

                    Comments.create(commentData).exec(function(err,result){
                        if (err) res.send(err);
                        else{
                        Application.findOne({id:result.appId}).exec(function (err, application) {
                            if(err){
                                res.send(err);
                            }
                                User.findOne({id:application.userId}).exec(function (err, userData) {
                                    if (err) {
                                        res.send(err);
                                    }
                                    var checkName = "";
                                    if(user.firstName && user.lastName){
                                        checkName = user.firstName + " " + user.lastName;
                                    }
                                    else{
                                        if(user.firstName){
                                            checkName = user.firstName;
                                        }
                                        else if(user.lastName){
                                            checkName = user.lastName;
                                        }
                                    }
                                    var emailSubject = "Comment from: " + userCode;
                                    var emailBody = "<html>Content : " + checkName + " has posted the following comment on " + application.appName + ":<br>" + 
                                                    result.comment + "<html>"

                                    mailOptions = {
                                            from :  config.IDEABIZ_SUPER_ADMIN_EMAIL,
                                            to   :  userData.email,
                                            subject : emailSubject,
                                            html : emailBody
                                    }
                                    transporter.sendMail(mailOptions, (error, info) => {
                                        if (error) {
                                            console.log(error);
                                        }
                                        console.log('Message sent: %s',  userData.email);
                                 });
                            });

                        })
                            res.send("ok");
                        }
                    });
                }
            });

    },

    getCommentsApp : function(req, res){

    console.log(req.body);

        Comments.find({appId:req.body.appId}).exec(function(err, result){
            if(err) res.send(err);
            else{
                console.log(result);
                res.send(result);
            }
        });

    },


    getComments : function(req, res){

        var operator;

        User.find({id:req.userId}).exec(function(err, user){
            if(err) res.send(err);
            else{
                if(user[0].userRole[0] == config.USER_ROLES.SUPER_ADMIN.code){
                    operator = null;

                    Comments.find({operator: operator}).exec(function(err, result){
                        if(err) res.send(err);
                        else{
                            res.send(result);
                        }
                    });
                }else if(user[0].userRole[0] == config.USER_ROLES.OPERATOR.code){
                    operator = user[0].operator;

                    Comments.find({operator: operator}).exec(function(err, result){
                        if(err) res.send(err);
                        else{
                            res.send(result);
                        }
                    });
                }

            }
        });

    },

    setServiceId : function(req, res){
        var Query = {appId: req.body.id};
        var operators;
        var toEmail = config.IDEABIZ_SUPER_ADMIN_EMAIL;
        var fromEmail = config.IDEABIZ_SUPPORT_EMAIL;

        PublishDetails.findOne(Query).exec(function(err, findApp){
            if(err){ res.send(err);}
            else{
                operators = findApp.operators;
                operators.forEach(function(ele){

                    if(ele.status == "SUBMITTED_FOR_CONFIG"){
                        ele.status = "SUBMITTED_FOR_APPROVAL";
                    }

                });

                //Check the serviceId already exists in the other apps
                var findServiceIdQuery = {
                    appId: {
                        '!': [req.body.id]
                    },
                    serviceID: req.body.serviceId
                }

                PublishDetails.find(findServiceIdQuery).exec(function(err, apps){
                    if(err){ res.send(err);}

                    if(apps && apps.length>0){
                        return res.status(409).send({ isError: true, message: 'Service ID ' + req.body.serviceId + ' already exists' });
                    }else{
                        PublishDetails.update(Query,{serviceID:req.body.serviceId, operators:operators}).exec(function(err, data){
                            if(err){ res.send(err);}
                            else{
                                var emailBody = "<html>" + req.body.appName + " is pending approval.<br><br>" +
                                    req.body.appName +  " with App ID " + req.body.id + " has been configured, and is pending approval.<br><br>" +
                                    "The Appmaker Team" +
                                    "</html>";

                                mailOptions = {
                                    from: fromEmail, // sender address
                                    to: toEmail, // list of receivers
                                    subject: 'Pending Approval', // Subject line
                                    html:emailBody
                                };

                                // send mail with defined transport object
                                transporter.sendMail(mailOptions, (error, info) => {
                                    if (error) {
                                        //return console.log(error);
                                        console.log(error);
                                        return  res.send(500,error);

                                    }
                                    console.log('Message sent: %s', info.messageId);
                                return res.send("ok");
                            });

                                res.send("serviceId added");
                            }
                        });
                    }
                });
            }
        });
    },

    /**
     * Sending push messages to end users by notifying app status when app is suspended or terminated
     **/
    notifyAppUsers: function (req, res) {

        // Find criteria for operator_code in Operator collection
        var oCriteria = { select: ['operator_code'], where: { operator : req.body.operator.toLowerCase() }};
        // Appuser find criteria
        var aCriteria;
        // Push device tokens array
        var deviceTokenArray = [];
        // payload for sendPushNotifications function in pushNotificationService
        var pushMessagesArray = [];
        // Statuses of app
        var SUSPENDED = 'SUSPENDED';
        var TERMINATED = 'TERMINATED';

        Operator.find(oCriteria).exec(function (err, codes) {
            sails.log.debug('operator codes : ' + JSON.stringify(codes[0].operator_code, null,2));

            if (err) {
                sails.log.error('error :' + err);
                return res.send(ERROR);
            }

            if (codes && codes.length > 0) {

                aCriteria = createAppUserCriteria(req.body.appId, codes[0].operator_code);

                AppUser.find(aCriteria).exec(function (err, deviceUUIDs) {

                    sails.log.debug('deviceUUIDs : ' + JSON.stringify(deviceUUIDs, null,2));

                    if (err) {
                        sails.log.error('error :' + err);
                        return res.send(ERROR);
                    }

                    if (deviceUUIDs && deviceUUIDs.length > 0) {

                        generateDeviceTokenArray(deviceUUIDs).then(function (data) {
                            if (data === 'ok') {
                               pushMessagesArray = createPushMessageArray(deviceTokenArray, req.body.status);
                               pushNotificationService.sendPushNotifications(pushMessagesArray);
                            }
                        });
                    }
                });
            }
        });

        return res.send(SUCCESS);

        /**
         * Responsible for creating AppUser find criteria
         *
         * @param appId {String} :: selected appId
         * @param oCodes {Array} :: operator_code as an array for selected operator
         *
         * @return criteria :: find criteria for AppUser
         **/
        function createAppUserCriteria(appId, oCodes) {

            var criteria;
            var orArray = [];

            oCodes.forEach(function (code) {
               orArray.push({ msisdn: { 'startsWith': code.toString() }})
            });
            // AppUser find criteria
            criteria = { select: ['deviceUUID'], where: { or: orArray, appId: appId }};
            sails.log.debug('AppUser find query : ' + JSON.stringify(criteria, null,2));
            return criteria;
           }

        /**
         * Generate push device tokens array using deviceUUIDs
         *
         * @param deviceUUIDs {Array} :: deviceUUIDs from AppUser collection
         *
         * @return Promise
         **/
        function generateDeviceTokenArray(deviceUUIDs) {

            return new Promise(function (resolve, reject) {

                // Number of executed findOne query count on DeviceId collection
                var dbQueryCount = 0;

                deviceUUIDs.forEach(function (deviceUUID) {

                    DeviceId.findOne({ deviceUUID: deviceUUID.deviceUUID })
                        .exec(function (err, deviceId) {

                            if (err) {
                                sails.log.error('error :' + err);
                                reject('error');
                            }

                            if (deviceId) {
                                dbQueryCount = dbQueryCount + 1;
                                deviceTokenArray.push(deviceId.deviceId);

                                // return promise if dbQueryCount is equals to deviceUUIDs count
                                if (dbQueryCount === deviceUUIDs.length) {
                                    resolve('ok');
                                }
                            }
                        });
                });
            });
        }

        /**
         * Responsible for creating payload for sendPushNotifications function in pushNotificationService
         *
         * @param deviceTokens {Array} :: push device tokens array
         * @param status {String} :: status of the app - values => SUSPENDED or TERMINATED
         *
         * @return massagesArray {Array}
         **/
        function createPushMessageArray(deviceTokens, status) {
            // message for end users
            var message;
            var massagesArray = [];

            if (status === SUSPENDED) {
                message = 'App has been temporarily suspended!';
            } else if (status === TERMINATED) {
                message = 'App is no longer available!';
            }
            sails.log.debug('Push message : ' + message);

            deviceTokens.forEach(function (deviceToken) {
                var mArrayElement = {
                    "to": deviceToken,
                    "notification": {
                        "body" : message
                    }
                };
                massagesArray.push(mArrayElement);
            });
            return massagesArray;
        }

    }
};
