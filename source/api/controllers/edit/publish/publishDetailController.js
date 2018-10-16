var fs1 = require('fs');

var fs = require('fs-extra'),
    config = require('../../../services/config'),
    email = require("../../../../node_modules/emailjs/email"),
    editController = require('../../EditController');

var server  = email.server.connect({
    user:    "onbilabsttest@gmail.com",
    password:"0nb1tl@b$",
    host:    "smtp.gmail.com",
    ssl:     true
});

var path = require('path');
const nodemailer = require('nodemailer');


var notifyEmailAddressTO = 'udeshika@onbitlabs.com';
var notifyEmailAddressCSS = '';


    // create reusable transporter object using the default SMTP transport
 var transporter = nodemailer.createTransport({
        host: 'appmaker.lk',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'support@appmaker.lk', // generated ethereal user
            pass: 'Jza12BTL36'  // generated ethereal password
        },
        tls:{
                rejectUnauthorized: false
            }
    });

module.exports = {

    setPublishDetails: function(req,res){
            var details = req.body;
            var searchApp = {
                appId :req.body.appId,
                appType: req.body.appType
            }

            var searchAppData = {
                id :req.body.appId
            }

    PublishDetails.find({appId:details.appId}).exec(function(err,publishData){
        if (err) res.send(err);
            if(publishData.length == 0){

                PublishDetails.find({keyword:details.keyword}).exec(function(err,data){

                    if (err) res.send(err);
                    else{
                            if (data.length==0) {

                                var operators = config.IDEABIZ_USER_NETWORK_CLIENTS;

                                details.operators = [];

                                for (var key in operators) {
                                    if (operators.hasOwnProperty(key)) {
                                        details.operators.push({
                                            operator:operators[key].code,
                                            amount:"",
                                            interval:"",
                                            isEnabled:false,
                                            status:"NOT_SUBMITTED"
                                        });
                                    }
                                }

                                PublishDetails.create(details).exec(function(err,appDetails) {
                                    if (err) res.send(err);
                                    var status = {
                                                    status :"NOT_SUBMITTED",
                                                    publishStatus :"NOT_SUBMITTED"
                                                }
                                        Application.update({id:appDetails.appId}, status).exec(function(err,appData){
                                            if (err) res.send(err);
                                                    ApplicationContactUs.update({appId:appData[0].id},{email:details.email}).exec(function(err,contact){
                                                        if (err) res.send(err);

                                                        for(var keyOne in operators){
                                                            if (operators.hasOwnProperty(keyOne)) {
                                                                appDetails.operators.forEach(function (playApps) {
                                                                    if (!playApps.priceRange) {
                                                                        playApps.priceRange = operators[keyOne].priceRange;
                                                                    } else {
                                                                        return;
                                                                    }
                                                                });
                                                            }
                                                        };
                                                        res.send({
                                                               details: appDetails,
                                                               message: "New Publish Details has been created"
                                                           });

                                                     });

                                        });



                                });
                        }else{
                            res.status(409).send({error:'Keyword exists'});
                        }
                    }

                });
            }else{

                PublishDetails.find({keyword:details.keyword}).exec(function(err,data){
                        if (err) res.send(err);
                        else{
                        if(data.length > 0){
                            if(data[0].appId == details.appId){
                                PublishDetails.update(searchApp,details).exec(function(err,playApp) {
                                        if (err) res.send(err);
                                        else {
                                            if (playApp.length==0) {
                                                sails.log.debug('no playApps');
                                                return res.send([]);
                                            }else{

                                                    Application.findOne(searchAppData).exec(function(err,app) {
                                                        if (err) res.send(err);
                                                        else {
                                                            ApplicationContactUs.update({appId:app.id},{email:details.email}).exec(function(err,contact){

                                                                var operators = config.IDEABIZ_USER_NETWORK_CLIENTS;
                                                                for(var keyOne in operators){
                                                                    if (operators.hasOwnProperty(keyOne)) {
                                                                        playApp[0].operators.forEach(function (playApps) {
                                                                            if (!playApps.priceRange) {
                                                                                playApps.priceRange = operators[keyOne].priceRange;
                                                                            } else {
                                                                                return;
                                                                            }
                                                                        });
                                                                    }
                                                                };
                                                                if (err){ res.send(err);}

                                                                else{
                                                                    res.send({
                                                                               details: playApp[0],
                                                                               message: "New Publish Details has been created"
                                                                           });
                                                                }
                                                            });
                                                        }
                                                    });
                                            }


                                        }
                                });
                            }else{
                                res.status(409).send({error:'Keyword exists'});
                            }
                        }else{
                            PublishDetails.update(searchApp,details).exec(function(err,app) {

                                     if (err) res.send(err);
                                     else {
                                                 Application.findOne({id:app[0].appId}).exec(function(err,searchApp) {
                                                     if (err) res.send(err);
                                                     else {
                                                         ApplicationContactUs.update({appId:searchApp.id},{email:details.email}).exec(function(err,contact){
                                                             if (err){ res.send(err);}

                                                             else{
                                                                 var operators = config.IDEABIZ_USER_NETWORK_CLIENTS;
                                                                 for(var keyOne in operators){
                                                                     if (operators.hasOwnProperty(keyOne)) {
                                                                         app[0].operators.forEach(function (playApps) {
                                                                             if (!playApps.priceRange) {
                                                                                 playApps.priceRange = operators[keyOne].priceRange;
                                                                             } else {
                                                                                 return;
                                                                             }
                                                                         });
                                                                     }
                                                                 };
                                                                 res.send({
                                                                            details: app[0],
                                                                            message: "New Publish Details has been created"
                                                                        });
                                                             }
                                                         });
                                                     }
                                                 });



                                     }
                             });
                        }

                    }
                });
        }
    });



//            // Email Subject
//            var emailSubject = 'Ready to Publish : '+details.title;
//            // Email Body
//            var emailBody    =  "<html>" +
//                "<p> appID  :  "+details.appId+  "</p>"+
//                "<p> Title  :  "+details.title+  "</p>"+
//                "<p> AppType:  "+details.appType+"</p>"+
//                "</html>";
//            // Email Content
//            var emailDetails = {
//                from    : "onbilabsttest@gmail.com",
//                to      : notifyEmailAddressTO,
//                cc      : notifyEmailAddressCSS,
//                subject : emailSubject,
//                attachment  :
//                    [
//                        { data : emailBody, alternative : true }
//                    ]
//            };
//            // PublishDetails Update or Create Email Notification Function
//            server.send(emailDetails, function (err, message) {
//                sails.log(err || message);
//            });
    },

    //Make an Array of Operators
    getIdeabizUserNetwrokClientsAsArray: function(){
        var operatorObject = config.IDEABIZ_USER_NETWORK_CLIENTS;
        return Object.keys(operatorObject).map(function(key) {
            return operatorObject[key];
        });

    },

    updateOperators: function (req,res){
        req.body.operators.forEach(function(operators){
            delete operators.priceRange;
        });
        var body = req.body;
        var operatorObject = config.IDEABIZ_USER_NETWORK_CLIENTS;
        var allowedOperators = [];
        var configOperators = this.getIdeabizUserNetwrokClientsAsArray();

        console.log(configOperators);
        req.body.operators.forEach(function(ele){

            if(ele.isEnabled == true || ele.isEnabled == 'true'){
                configOperators.forEach(function(op){
                    if(op.code == ele.operator){
                        allowedOperators.push({operator:ele.operator,share:op.shareSplit,amount:ele.amount,interval:ele.interval})
                    }
                });
            }

        });


        PublishDetails.update({appId:body.appId},{operators:body.operators}).exec(function(err,result){
            if(err) res.send(err);
            else{
                console.log(result);
            Application.findOne({id:result[0].appId}).exec(function(err,appData){
                if (err) res.send(err);

                // if(!appData.apkStatus){
                //     sails.log.debug("apk generation started for the appId:" + body.appId);
                //     req.body.userId = appData.userId;
                //     editController.buildSourceProg(req,res);
                // }

                console.log(appData);
                    User.find({id:appData.userId}).exec(function(err,userData){
                        if (err) res.send(err);
                        else{
                        console.log(userData);
                            var email = req.body.email;
                            var emailBody = "<html><br>Hi,<br><br>" +

                                           "Please create and revert with the service ID for the below service created through <br> Ideadroid. Details are as follows:" +

                                            "<br><br><br>Service Name: " +  result[0].title +
                                            "<br>Company Name: " +  userData[0].firstName + " " + userData[0].lastName +
                                            "<br><br><table border='1px'>" +
                                            "<thead>" +
                                                "<th align='center' width='25%'> Operator </th>" +
                                                "<th align='center' width='35%'> Revenue share split </th>" +
                                                "<th align='center' width='15%'> Amount </th>" +
                                                "<th align='center' width='30%'> Renewal Interval </th>" +
                                            "</thead>" +
                                            "<tbody align='center'>";

                                             allowedOperators.forEach(function(operators){

                                                 emailBody += "<tr><td>" + operators.operator + "</td>" +
                                                              "<td>" + operators.share + "</td>" +
                                                              "<td>" + operators.amount + "</td>" +
                                                              "<td>" + operators.interval + "</td></tr>";

                                             });

                                                  emailBody += "</tbody></table>";



                                     emailBody = emailBody +
                                            "<br>Subscription Keyword: START " + result[0].keyword +
                                            "<br>Un-subscription Keyword: STOP " + result[0].keyword +
                                            "<br>Subscription SMS: You have subscribed to the " + result[0].title + " service. Type STOP " + result[0].keyword  + " and send to 87757 to unsubscribe." +
                                            "<br>Un-subscription SMS: You have been unsubscribed from the " + result[0].title + " service." +
                                            "<br>SMS Mask : Ideadroid" +
                                            "<br>Admin notify URL: " + config.server.host + "/adminapi/index" +
                                            "<br>SMS Notify URL: " + config.server.host + "/sms/report" +
                                            "<br><br>Regards," +

                                            "<br><br>Ideadroid Support" +

                                            "<br><br>Email : " + config.SIMATO_SUPPORT +

                                            "<br>Contact : " + userData[0].mobile + "</html>";

                                     mailOptions = {
                                        from: userData[0].email, // sender address
                                        to: config.IDEABIZ_GROUP_EMAIL, // list of receivers
                                        subject: 'App Publish', // Subject line
                                        html:emailBody


                                     };

                                        // send mail with defined transport object
                                        transporter.sendMail(mailOptions, (error, info) => {
                                            if (error) {
                                                console.log(error);
                                            }
                                            console.log('Message sent: %s', userData[0].email);
                                        });
                        res.send("ok");

                        }

                    });
            });
            }
        });
    },

    /* image uploading with validation*/
    uploadPublishFiles :function (req,res) {
        var imagePath;
        if(req.body.isNew == true || req.body.isNew == 'true'){
            imagePath = config.APP_FILE_SERVER+req.userId + '/progressiveTemplates/' + req.body.appId +'/assets/images/publish/';
        } else{
            imagePath = config.APP_FILE_SERVER+req.userId + '/templates/' + req.body.appId +'/img/publish/';
        }
         req.file('file').upload({
            dirname: require('path').resolve(imagePath)
         },function (err, uploadedFiles) {
             if (err) return res.negotiate(err);
             else {
                 fs.rename(uploadedFiles[0].fd, imagePath+req.body.imgId+'.png', function (err) {

                     if (err) return res.send(err);
                     else {
                         return res.json({
                             message: true,
                             idx:req.body.imgId
                         });
                     }
                 });
             }
         });
    },



    setContentRating: function(req,res){
            var details = req.body;
            var searchApp = {
                appId :req.body.appId,
                category: req.body.category
            }
         PublishDetails.update(searchApp,details).exec(function(err,app) {
             if (err) res.send(err);
             if (app.length == 0) {
                 PublishDetails.create(details).exec(function(err,appDetails) {
                     if (err) res.send(err);
                     res.send('ok');
                 });
             }
             else{
                 res.send({
                 appId: details.appId,
                 message: "New Publish Details has been created"
                 });
             }


         });
    },


    setAppStoreDetails: function(req,res){
        var details = req.body;
        var searchApp = {
            appId :req.body.appId,
            category: req.body.category
        }
        PublishDetails.update(searchApp,details).exec(function(err,app) {
            if (err) res.send(err);
            if (app.length == 0) {
                PublishDetails.create(details).exec(function(err,appDetails) {
                    if (err) res.send(err);
                    res.send('ok');
                });
            }
            else{
                res.send({
                    appId: details.appId,
                    message: "New Publish Details has been created"
                });
            }


        });
    },

    setAppReviewInformation: function(req,res){
            var details = req.body;
            var searchApp = {
                appId :req.body.appId,
                category: req.body.category
            }
         PublishDetails.update(searchApp,details).exec(function(err,app) {
             if (err) res.send(err);
             if (app.length == 0) {
                 PublishDetails.create(details).exec(function(err,appDetails) {
                     if (err) res.send(err);
                     res.send('ok');
                 });
             }
             else{
                 res.send({
                 appId: details.appId,
                 message: "New Publish Details has been created"
                 });
             }


         });
    },

    getAllLanguages: function(req,res){
    console.log(path.resolve);
          Languages.find().exec(function(err, app) {
               if (err) res.send(err);
               res.send(app);
          });
    },

    getAllPrimaryCategories:function(req,res){
        PrimaryCategory.find().exec(function(err, app) {
               if (err) res.send(err);
               res.send(app);
        });
    },
    getAllSecondaryCategories:function(req,res){
        SecondaryCategory.find().exec(function(err, app) {
                if (err) res.send(err);
                res.send(app);
        });
    },

    getLanguage : function(req,res){
        var appId = req.param('appId');
        var appType = req.param('appType');
        var searchApp = {
            appId: appId,
            appType: appType
        };
        PublishDetails.find(searchApp, function(err, app) {
            if (err) return done(err);
            if(app.length == 0){
                sails.log.debug('No apps to load');
                res.send([]);
            }
            else{
                var operators = config.IDEABIZ_USER_NETWORK_CLIENTS;
                for(var keyOne in operators){
                    if (operators.hasOwnProperty(keyOne)) {
                        app[0].operators.forEach(function (playApps) {
                            if (!playApps.priceRange) {
                                playApps.priceRange = operators[keyOne].priceRange;
                            } else {
                                return;
                            }
                        });
                    }
                };
              res.send(app);
            }
        });
    },

    getContentRatings : function(req,res){
        ContentRating.find().exec(function(err, app) {
                if (err) res.send(err);
                res.send(app);
        });
    },

    getAllPorts : function(req,res){
       fs.readFile(sails.config.appPath+'/api/services/port.json', function(err, data) {
           if (err)  res.send(err);
            var ports = JSON.parse(data);
           res.send(ports);
       });
    },

    getRenewals : function(req,res){
        RenewalIntervals.find().exec(function(err, result){
            if(err){
                sails.log.error("Error when getting the Renewals.Err: ", err);
                return res.send([]);
            }
            res.send(result);
        });
    },

    getAllPrice : function(req,res){
       fs.readFile(sails.config.appPath+'/api/services/price.json', function(err, data) {
           if (err)  res.send(err);
            var price = JSON.parse(data);
           res.send(price);
       });
    },

    getKeywordLength : function(req,res){
        res.json({length:config.KEYWORD_LENGTH});
    },

    getPublishDetails : function(req,res){
        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };

        PublishDetails.findOne(searchApp, function(err, app) {
            if (err) {
                sails.log.error('Error when searching for PublishDetails for appId: %s Error: $s ', appId, err );
                return res.serverError(err);
            }
            res.send(app)
        });
    },

    getApkPath : function(req,res){
        var path = require('path');
        var mime = require('mime');

        var apk = config.ME_SERVER + req.param("userId") + '/buildProg/' + req.param("appId") + '/' + req.param("appName").replace(/\s/g, '') + ".apk";

        console.log("inside apk send: " + apk);

        fs.stat(apk, function (err, fileStat) {
            if (err) {
                if (err.code == 'ENOENT') {
                    console.log('File:' + req.param("appName") + ".apk does not exists");
                }
            } else {
                if (fileStat.isFile()) {
                    var filename = path.basename(apk);
                    var mimetype = mime.lookup(apk);

                    console.log("filename: " + filename + " mimetype: " + mimetype);

                    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
                    res.setHeader('Content-type', mimetype);

                    var filestream = fs.createReadStream(apk);

                    filestream.pipe(res);
                    sails.log.info('EXCELLENT');
                }
            }
        });
    }

}
