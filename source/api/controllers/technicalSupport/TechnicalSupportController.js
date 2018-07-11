


var fs = require('fs-extra'),
    xml2js = require('xml2js'),
    config = require('../../services/config'),
    email  = require('../../../node_modules/emailjs/email');

    const nodemailer = require('nodemailer');
var sentMails = require('../../services/emailService');



var server  = email.server.connect({
    user:    "onbilabsttest@gmail.com",
    password:"0nb1tl@b$",
    host:    "smtp.gmail.com",
    ssl:     true
});

    // create reusable transporter object using the default SMTP transport
 var transporter = nodemailer.createTransport({
        host: 'appmaker.lk',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'support@appmaker.lk', // generated ethereal user
            pass: '7hJvsYiU'  // generated ethereal password
        },
        tls:{
                rejectUnauthorized: false
            }
    });


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
            console.log(JSON.stringify(appsData));
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

    sendApkEmail : function(req,res){

    console.log("inside send apk email " + req.body.email);
    console.log(config.server.host);
    var apkFile = config.server.host +'/getApk';
        var email = req.body.email;
        var emailBody = "<html><br>Hi " +  req.body.fName + " " + req.body.lName + ",<br><br>"+

                       "Good news! " + req.body.appName + " App has been approved for launch! Users can access the web app<br> using the following URL: <a href=" + req.body.appView + "> App view</a><br><br>" +

                       "You can download the apk file of the application from " + "<a href=" + apkFile + "> download APK </a><br><br>" +

                       "<br>If you need any technical support in uploading the app to an app store, please contact<br> us at support@appmaker.lk. To upload the app on Google Play Store you can follow the<br> instructions we have given on publishing page " + "<a href='http://developer.appmaker.lk'>developer.appmaker.lk</a>" +

                       "<br><br>For any assistance required in marketing the application please contact<br> marketing@appmaker.lk<br><br>" +

                       "Regards,<br><br>"+

                       "Appmaker Team</html>";

                 mailOptions = {
                    from: 'support@appmaker.lk', // sender address
                    to: email, // list of receivers
                    subject: 'App Approve', // Subject line
                    html:emailBody

//                    <h1>Test email</h1><br><a href=" + apkFile + ">Download APK</a>"

                };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            //return console.log(error);
                            console.log(error);
                            return  res.send(500,error);

                        }
                        console.log('Message sent: %s', info.messageId);
                    return res.send('ok');
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
        var commentData;

            User.find({id:req.userId}).exec(function(err, user){
                if(err) res.send(err);
                else{
                    console.log(config.USER_ROLES.OPERATOR.code);
                    if(user[0].userRole[0] == config.USER_ROLES.OPERATOR.code){
                        operator = user[0].operator;
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

    setAppstatus : function(req,res){
    console.log(req.body);

        var idPD = {appId:req.body.id}
        var statusPD = { operators: req.body.operators };

        PublishDetails.update(idPD,statusPD).exec(function(err,result){

            if (err){res.send(err);}

               //  sentMails.sendApkEmail(req.body,function (err,msg) {
               //     sails.log.info(err);
               //     if (err) {
               //         return  res.send(500);
               //     }
               //
               //     res.send('ok');
               // });
               res.send('ok');
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
};
