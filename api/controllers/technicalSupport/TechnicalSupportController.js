


var fs = require('fs-extra'),
    xml2js = require('xml2js'),
    config = require('../../services/config'),
    email  = require('../../../node_modules/emailjs/email');


var server  = email.server.connect({
    user:    "onbilabsttest@gmail.com",
    password:"0nb1tl@b$",
    host:    "smtp.gmail.com",
    ssl:     true
});

module.exports = {

    
    /**
     * get All AppsData
     *
     */
    getAllAppsData: function (req, res) {
        Application.find().where({ or : [ { status  : 'PENDING' },
                                        { status  : 'PUBLISHED' },
                                        { status   : 'UPLOADING' } ]}).exec(function (err, appsData) {
            if (err) res.send(err);
            res.json(appsData);

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

        console.log("req.body.appId " + req.body.appId);
        
        PublishDetails.find(searchApp).exec(function (err, publishedData) {
            if (err) res.send(err);
            res.json(publishedData);

        });

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
        console.log("req.body.appId  " + req.body.appId);
        var searchAppDataDetails = {
            appId :req.body.appId
        }

        PublishDetails.findOne(searchAppDataDetails).exec(function(err, publishDetails) {
            if (err) res.send(err);
            else {
                console.log("req.publishDetails " + publishDetails.appId);
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

                        console.log("app.email  " + publishDetails.email);
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
    }
};
