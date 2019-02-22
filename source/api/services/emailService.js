var config = require('./config');

/**
 * Created by root on 2/2/16.
 */

var request = require('request'),
    JWT = require('machinepack-jwt'),
    email = require("../../node_modules/emailjs/email"),
    fs = require('fs-extra'),
    config = require('../services/config');
var path = require('path');
const nodemailer = require('nodemailer');
var transporter = null;
var ERROR = { message: 'ERROR'};


var transporter = null;

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

var server  = email.server.connect({
    user:    "no_reply_ideadroid@appmaker.lk",
    password:"FoRH7DAyKG",
    host:    "appmaker.lk",
    tls:false,
    port: 25
});

module.exports = {


    sendRegisterConfirmation: function(data, callback){

        var imgPath = sails.config.appPath + '/assets/images/emailtemplates/';

        var emailBody = '<!DOCTYPE>' +
                        '<html>' +
                           '<head>' +
                              '<title>Appmaker - Responsive Email Template</title>' +
                            '<style type="text/css">' +
                               '/* ----- Custom Font Import ----- */' +
                               '/* ----- Text Styles ----- */' +
                               'table{' +
                                  'font-family: "Lato", Arial, sans-serif;' +
                                  '-webkit-font-smoothing: antialiased;' +
                                  '-moz-font-smoothing: antialiased;' +
                                  'font-smoothing: antialiased;' +
                               '}' +
                               '@media only screen and (max-width: 700px){' +
                                  '/* ----- Base styles ----- */' +
                                  '.full-width-container{padding: 0 !important;}' +
                                  '.container{width: 100% !important;}' +
                                  '/* ----- Header ----- */' +
                                  '.header td{padding: 30px 15px 30px 15px !important;}' +
                                  '/* ----- Projects list ----- */' +
                                  '.projects-list{display: block !important;}' +
                                  '.projects-list tr{display: block !important;}' +
                                  '.projects-list td{display: block !important;}' +
                                  '.projects-list tbody{display: block !important;}' +
                                  '.projects-list img{margin: 0 auto 25px auto;}' +
                                  '/* ----- Half block ----- */' +
                                  '.half-block{display: block !important;}' +
                                  '.half-block tr{display: block !important;}' +
                                  '.half-block td{display: block !important;}' +
                                  '.half-block__image{width: 100% !important;background-size: cover;}' +
                                  '.half-block__content{' +
                                   'width: 100% !important;box-sizing: border-box;padding: 25px 15px 25px 15px !important;}' +
                                  '/* ----- Hero subheader ----- */' +
                                  '.hero-subheader__title{' +
                                  '  padding: 80px 15px 15px 15px !important;font-size: 35px !important;}' +
                                  '.hero-subheader__content{padding: 0 15px 90px 15px !important;}' +
                                  '/* ----- Title block ----- */' +
                                  '.title-block{padding: 0 15px 0 15px;}' +
                                  '/* ----- Paragraph block ----- */' +
                                  '.paragraph-block__content{padding: 25px 15px 18px 15px !important;}' +

                                  '.info-bullets tr{display: block !important;}' +
                                  '.info-bullets td{display: block !important;}' +
                                  '.info-bullets tbody{display: block;}' +
                                  '.info-bullets__icon{text-align: center;padding: 0 0 15px 0 !important;}' +
                                  '.info-bullets__content{text-align: center;}' +
                                  '.info-bullets__block{padding: 25px !important;}' +
                                  '/* ----- CTA block ----- */' +
                                  '.cta-block__title{padding: 35px 15px 0 15px !important;}' +
                                  '.cta-block__content{padding: 20px 15px 27px 15px !important;}' +
                                  '.cta-block__button{padding: 0 15px 0 15px !important;}' +
                               '}' +
                            '</style>' +
                           '</head>' +
                           '<body style="padding: 0; margin: 0;" bgcolor="#eeeeee">' +
                           '  <span style="color:transparent !important; overflow:hidden !important; display:none !important; line-height:0px !important; height:0 !important; opacity:0 !important; visibility:hidden !important; width:0 !important; mso-hide:all;">This is your preheader text for this email (Read more about email preheaders here - https://goo.gl/e60hyK)</span>' +
                           '  <!-- / Full width container -->' +
                           '  <table class="full-width-container" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" bgcolor="#eeeeee" style="width: 100%; height: 100%; padding: 30px 0 30px 0;">' +
                           '     <tr>' +
                           '        <td align="center" valign="top">' +
                           '           <!-- / 700px container -->' +
                           '           <table class="container" border="0" cellpadding="0" cellspacing="0" width="700" bgcolor="#ffffff" style="width: 700px;">' +
                           '              <tr>' +
                           '                 <td align="center" valign="top">' +
                           '                    <!-- / Header -->' +
                           '                    <table class="container header" border="0" cellpadding="0" cellspacing="0" width="620" style="width: 620px;">' +
                           '                       <tr>' +
                           '                          <td style="padding: 30px 0 30px 0; border-bottom: solid 1px #eeeeee;" align="left">' +
                           '                             <a href="#" style="font-size: 30px; text-decoration: none; color: #000000;"><img src="cid:appmaker" width="120px"></a>' +
                           '                          </td>' +
                           '                       </tr>' +
                           '                    </table>' +
                           '                    <!-- /// Header -->' +
                           '                    <!-- / Hero subheader -->' +
                           '                    <table class="container hero-subheader" border="0" cellpadding="0" cellspacing="0" width="620" style="width: 620px;">' +
                           '                       <tr>' +
                           '                          <td class="hero-subheader__title" style="font-size: 43px; font-weight: bold; padding: 40px 0 15px 0;" align="left">Welcome Aboard!</td>' +
                           '                       </tr>' +
                           '                       <tr>' +
                             '                               <td class="hero-subheader__content" style="font-size: 16px; line-height: 27px; color: #969696; padding: 0 0 50px 0;" align="justify">' +
                                                              '<p>Hi '+ data.fName + " " + data.lName + ' Welcome Aboard!</p>'+
                              '                                      <p>Thank you for registering for Appmaker, the platform that enables you to create mobile applications without any coding. The service is currently in beta, and some features of the platform are currently not enabled.</p>' +
                                '                                    <p>Good luck on your app creation journey!</p>' +
                                 '                                   <p style="padding: 15px 0 0 0; font-weight:700; ">The AppMaker Team<br/>' +
                                  '                                      </p>' +
                                   '                     </td>' +
                                 '                 </tr>' +
                                 '              </table>' +
                                 '              <!-- /// Hero subheader -->' +
                                 '              <!-- / CTA Block -->' +
                                 '                          </tr>' +
                                 '                       </table>' +
                                 '                    </td>' +
                                 '                 </tr>' +
                                 '              </table>' +
                                 '              <!-- /// CTA Block -->' +
                                     '                   <!-- / Footer -->' +
                                 '              <table class="container" border="0" cellpadding="0" cellspacing="0" width="100%" align="center">' +
                                 '<tr>' +
                                 '<td align="center">' +
                                 '<table class="container" border="0" cellpadding="0" cellspacing="0" width="620" align="center" style="border-top: 1px solid #eeeeee; width: 620px;">' +
                                 '<tr>' +
                                 '<td style="text-align: center; padding: 10px 0 10px 0;">' +
                                 '<a href="#" style="font-size: 28px; text-decoration: none; color: #d5d5d5;">appmaker.lk</a>' +
                                 '</td>' +
                                 '</tr>' +
                                 '<tr>' +
                                 '<td align="middle">' +
                                 '<table width="60" height="2" border="0" cellpadding="0" cellspacing="0" style="width: 60px; height: 2px;">' +
                                 '<tr>' +
                                 '<td align="middle" width="60" height="2" style="background-color: #eeeeee; width: 60px; height: 2px; font-size: 1px;"><img src="cid:img16"></td>' +
                                 '</tr>' +
                                 '</table>' +
                                 '</td>' +
                                 '</tr>' +
                                 '<tr>' +
                                 '<td style="color: #d5d5d5; text-align: center; font-size: 15px; padding: 10px 0 60px 0; line-height: 22px;">Copyright &copy; 2018 <a href="https://ideamart.io/" target="_blank" style="text-decoration: none; border-bottom: 1px solid #d5d5d5; color: #d5d5d5;">appmaker.lk</a>. <br />All rights reserved.</td>' +
                                 '</tr>' +
                                 '</table>' +
                                 '</td>' +
                                 '</tr>' +
                                 '</table>' +
                                 '<!-- /// Footer -->' +
                                 '</td>' +
                                 '</tr>' +
                                 '</table>' +
                                 '</td>' +
                                 '</tr>' +
                              '</table>' +
                           '</body>' +
                        '</html>';



        var mailOptions = {
            from: config.IDEABIZ_SUPER_ADMIN_EMAIL,
            to: data.email,
            subject: "Welcome to Appmaker",
            html: emailBody,
            attachments: [
                {
                    filename: 'appmaker.png',
                    path: imgPath + 'appmaker.png',
                    cid: 'appmaker'
                },
                {
                    filename: 'img16.jpg',
                    path: imgPath + 'img16.jpg',
                    cid: 'img16'
                }
            ]
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                sails.log.error('sendRegisterConfirmation - emailService.js , error => ' + JSON.stringify(error));
                callback(ERROR, null);
            }else {
                sails.log.debug('Register confirmation email sent successfully');
                callback(null, info);
            }

    });
    },
    /**
        Method is use to send and email with the provided parameters

        Attachments must be send as an array of objects as in the below format
         [
             {
                 filename: 'appmaker.png',
                 path: imgPath + 'appmaker.png',
                 cid: 'appmakerLogo'
             }
         ]
     */
    sendWithAttachments: function(from,to,subject,htmlBody,attachments,callback){

        if(!from){
            sails.log.error("No from email address to send the email!");
        }

        if(!to){
            sails.log.error("No to email address to send the email!");
        }

        var mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: htmlBody,
            attachments: attachments
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                sails.log.error('sendWithAttachments - emailService.js , error => ' + JSON.stringify(error));
                callback(error, null);
            }else {
                sails.log.debug('Sent email to ' + to);
                callback(null, info);
            }

        });
    },
    /**
         Method is use to send and email without attachments
     */
    send: function(from,to,subject,htmlBody,callback){
        this.sendWithAttachments(from,to,subject,htmlBody,[],callback);
    },

    sendGetAssistance: function(data, callback){
        console.log(data.appName)
        var emailBody = "";
        var approot = path.resolve();
        //var file = path.join(__dirname,  'output', index.html');
        var serverOrg=config.server.host;
        var imgPath = serverOrg + '/images/emailtemplates';
        fs.readFile(approot + '/assets/templates/user/common/emailtemplates/needAssistance.html','utf8',function (err, mailbody) {
            var mapObj = {
                imgUrl:imgPath,
                appType:data.appType,
                appName:data.appName,
                userName:data.userName,
                userEmail:data.userEmail,
                userNumber:data.userNumber
            };
            var replaceMailBody = mailbody.replace(/imgUrl|appType|appName|userName|userEmail|userNumber/g, function(matched){
                return mapObj[matched];
            });

            var emailDetails = {
                text: "",
                from: "Otenro<communications@otenro.com>",
                to: 'support@otenro.com',
                subject: "Need Assistance",
                attachment: [
                    {
                        data: replaceMailBody,
                        alternative: true
                    }
                ]
            };

            server.send(emailDetails, function (err, message) {
                if (err) {
                    return callback(err);
                }
                callback(null, 'ok');
            });
        });
    },


//    sendReminderEmail: function(data, callback){
//        User.find().exec(function(err, users){
//            if(users){
//                var approot = path.resolve();
//                var emailContent = "";
//                var replaceMailBody = "";
//                var serverOrg=config.server.host;
//                var imgPath = serverOrg + '/images/emailtemplates';
//                var userEmail = ""
//                for(var i=0;i<users.length;i++){
//
//                    if(users[i].lastLoginTime){
//                        var timeDiff = new Date() - users[i].lastLoginTime;
//                        var daysDifference = Math.floor(timeDiff/1000/60/60/24);
//
//                        if(daysDifference > 7)
//                        {
//                            if(!users[i].isReminderSent){
//                                if(emailContent == "")
//                                {
//                                    emailContent = fs.readFileSync(approot + '/assets/templates/user/common/emailtemplates/index.html').toString();
//                                    var replaceMailBody = emailContent.replace(/#img#/g,imgPath);
//                                }
//
//
//                                userEmail = userEmail + "," + users[i].email;
//                                User.update({email : users[i].email},{isReminderSent : true}, function(err1, msg1){
//                                });
//                            }
//                        }
//                    }
//
//                }
//
//                if(userEmail != "") {
//                    var emailDetails = {
//                        text: "",
//                        from: "Otenro<communications@otenro.com>",
//                        bcc: userEmail,
//                        subject: "Dont Forget to explore Otenro",
//                        attachment: [
//                            {
//                                data: replaceMailBody,
//                                alternative: true
//                            }
//                        ]
//                    };
//                    server.send(emailDetails, function (err, message) {
//                        //sails.log.info(err || message);
//                        console.log(err);
//                        /*if (err) {
//                         return callback(err);
//                         }*/
//                        //callback(null, 'ok');
//                        sails.log.debug("Updating :" + userEmail)
//
//                    });
//                }
//                //here
//
//            }
//        })
//    },
    sendConfirmEmail: function (data, callback) {

        //var data = this.getUserEmailData(emailsParms,res);
        //console.log(data);
        var searchApp = {
            appId: data.appId
        };
        //console.log(searchApp);
        var appRoot = path.resolve();

        var serverOrg=config.server.host+':'+config.server.port;

        var imagePath =  serverOrg +"/templates/viewImages?userId="+ data.userId
            +"&appId="+data.appId+"&"+new Date().getTime()+"&img=email/";

        UserEmail.find(searchApp).exec(function (err, app) {
            if (err) return done(err);

            // var apps = JSON.stringify(app);
            //console.log(app);
            for (var i = 0; i < app.length; i++) {


                if ((data.type == "Order confirm") && (typeof app[0].orderConfirmedEmail !== 'undefined')) {

                    var body = app[0].orderConfirmedEmail;

                } else if ((data.type == "Order Fulfilled") && (typeof app[0].orderFulfilledEmail !== 'undefined')) {
                    var body = app[0].orderFulfilledEmail;

                } else if ((data.type == "Order Refund") && (typeof app[0].orderRefundEmail !== 'undefined')) {
                    var body = app[0].orderRefundEmail;

                } else {
                    console.log("Save Data Before Test Mail.");
                    return "ddd";
                    //return res.status("Save Data Before Test The Mail.");
                }


                var mBody = '<!DOCTYPE html>' +
                    '<html>' +
                    '<head>' +
                    '<title></title>' +
                    '<meta charset="utf-8">' +
                    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
                    '<meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
                    '<style type="text/css">' +
                    '    /* CLIENT-SPECIFIC STYLES */' +
                    '    body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;} /* Prevent WebKit and Windows mobile changing default text sizes */' +
                    '    table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;} /* Remove spacing between tables in Outlook 2007 and up */' +
                    '    img{-ms-interpolation-mode: bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */' +
                    '' +
                    '    /* RESET STYLES */' +
                    '    img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;}' +
                    '    table{border-collapse: collapse !important;}' +
                    '    body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}' +
                    '' +
                    '    /* iOS BLUE LINKS */' +
                    '    a[x-apple-data-detectors] {' +
                    '        color: inherit !important;' +
                    '        text-decoration: none !important;' +
                    '        font-size: inherit !important;' +
                    '        font-family: inherit !important;' +
                    '        font-weight: inherit !important;' +
                    '        line-height: inherit !important;' +
                    '    }' +
                    '' +
                    '    /* MOBILE STYLES */' +
                    '    @media screen and (max-width: 525px) {' +
                    '' +
                    '        /* ALLOWS FOR FLUID TABLES */' +
                    '        .wrapper {' +
                    '          width: 100% !important;' +
                    '            max-width: 100% !important;' +
                    '        }' +
                    '' +
                    '        /* ADJUSTS LAYOUT OF LOGO IMAGE */' +
                    '        .logo img {' +
                    '          margin: 0 auto !important;' +
                    '        }' +
                    '' +
                    '        /* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */' +
                    '        .mobile-hide {' +
                    '          display: none !important;' +
                    '        }' +
                    '' +
                    '        .img-max {' +
                    '          max-width: 100% !important;' +
                    '          width: 100% !important;' +
                    '          height: auto !important;' +
                    '        }' +
                    '' +
                    '        /* FULL-WIDTH TABLES */' +
                    '        .responsive-table {' +
                    '          width: 100% !important;' +
                    '        }' +
                    '' +
                    '        /* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */' +
                    '        .padding {' +
                    '          padding: 10px 5% 15px 5% !important;' +
                    '        }' +
                    '' +
                    '        .padding-meta {' +
                    '          padding: 30px 5% 0px 5% !important;' +
                    '          text-align: center;' +
                    '        }' +
                    '' +
                    '        .padding-copy {' +
                    '             padding: 10px 5% 10px 5% !important;' +
                    '          text-align: center;' +
                    '        }' +
                    '' +
                    '        .no-padding {' +
                    '          padding: 0 !important;' +
                    '        }' +
                    '' +
                    '        .section-padding {' +
                    '          padding: 50px 15px 50px 15px !important;' +
                    '        }' +
                    '' +
                    '        /* ADJUST BUTTONS ON MOBILE */' +
                    '        .mobile-button-container {' +
                    '            margin: 0 auto;' +
                    '            width: 100% !important;' +
                    '        }' +
                    '' +
                    '        .mobile-button {' +
                    '            padding: 15px !important;' +
                    '            border: 0 !important;' +
                    '            font-size: 16px !important;' +
                    '            display: block !important;' +
                    '        }' +
                    '' +
                    '    }' +
                    '' +
                    '    /* ANDROID CENTER FIX */' +
                    '    div[style*="margin: 16px 0;"] { margin: 0 !important; }' +
                    '</style>' +
                    '</head><body style="margin: 0 !important; padding: 0 !important;">' +
                    '<!-- HEADER -->' +
                    '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
                    '    <tr>' +
                    '        <td bgcolor="#ffffff" align="center">' +
                    '            <!--[if (gte mso 9)|(IE)]>' +
                    '            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">' +
                    '            <tr>' +
                    '            <td align="center" valign="top" width="500">' +
                    '            <![endif]-->' +
                    '            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">' +
                    '                <tr>' +
                    '                    <td align="center" valign="top" style="padding: 15px 0;" class="logo">' +
                    '                        <a href="" target="_blank">' +
                    '                            <img alt="Logo" src="' + imagePath + app[0].imageHeader + '" width="60" height="60" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 16px;" border="0">' +
                    '                        </a>' +
                    '                    </td>' +
                    '                </tr>' +
                    '<tr>' +
                    '                                            <td align="center"  class="padding">' + app[0].header + '</td>' +
                    '                                        </tr>' +
                    '            </table>' +
                    '            <!--[if (gte mso 9)|(IE)]>' +
                    '            </td>' +
                    '            </tr>' +
                    '            </table>' +
                    '            <![endif]-->' +
                    '        </td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td bgcolor="#D8F1FF" align="center" style="padding: 70px 15px 70px 15px;" class="section-padding">' +
                    '            <!--[if (gte mso 9)|(IE)]>' +
                    '            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">' +
                    '            <tr>' +
                    '            <td align="center" valign="top" width="500">' +
                    '            <![endif]-->' +
                    '            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="responsive-table">' +
                    '                <tr>' +
                    '                    <td>' +
                    '                        <!-- HERO IMAGE -->' +
                    '                        <table width="100%" border="0" cellspacing="0" cellpadding="0">' +
                    '                            <tr>' +
                    '                                <td>' +
                    '                                    <!-- COPY -->' +
                    '                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">' +
                    '                                        <tr>' +
                    '                                            <td align="center" style="font-size: 25px; font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 30px;" class="padding">' + data.type + '</td>' +
                    '                                        </tr>' +
                    '                                        <tr>' +
                    '                                            <td align="center" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding">' + body + '</td>' +
                    '                                        </tr>' +
                    '                                    </table>' +
                    '                                </td>' +
                    '                            </tr>' +
                    '                            <tr>' +
                    '                                <td align="center">' +
                    '                                    <!-- BULLETPROOF BUTTON -->' +
                    '                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">' +
                    '                <tr>' +
                    '                    <td align="center" valign="top" style="padding: 15px 0;" class="logo">' +
                    '                        <a href="http://litmus.com" target="_blank">' +
                    '                            <img alt="Logo" src="' + imagePath + app[0].imageFooter + '" width="60" height="60" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 16px;" border="0">' +
                    '                        </a>' +
                    '                    </td>' +
                    '                </tr>' +
                    '            </table>' +
                    '                                </td>' +
                    '                            </tr>' +
                    '                        </table>' +
                    '                    </td>' +
                    '                </tr>' +
                    '            </table>' +
                    '            <!--[if (gte mso 9)|(IE)]>' +
                    '            </td>' +
                    '            </tr>' +
                    '            </table>' +
                    '            <![endif]-->' +
                    '        </td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td bgcolor="#ffffff" align="center" style="padding: 20px 0px;">' +
                    '            <!--[if (gte mso 9)|(IE)]>' +
                    '            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">' +
                    '            <tr>' +
                    '            <td align="center" valign="top" width="500">' +
                    '            <![endif]-->' +
                    '            <!-- UNSUBSCRIBE COPY -->' +
                    '            <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="max-width: 500px;" class="responsive-table">' +
                    '                <tr>' +
                    '                    <td align="center" style="font-size: 12px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color:#666666;">' +
                    '                        ' + app[0].footer +
                    '                        <br>' +
                    '                        <a href="http://litmus.com" target="_blank" style="color: #666666; text-decoration: none;">Unsubscribe</a>' +
                    '                        <span style="font-family: Arial, sans-serif; font-size: 12px; color: #444444;">  |  </span>' +
                    '                        <a href="http://litmus.com" target="_blank" style="color: #666666; text-decoration: none;">View this email in your browser</a>' +
                    '                    </td>' +
                    '                </tr>' +
                    '            </table>' +
                    '            <!--[if (gte mso 9)|(IE)]>' +
                    '            </td>' +
                    '            </tr>' +
                    '            </table>' +
                    '            <![endif]-->' +
                    '        </td>' +
                    '    </tr>' +
                    '</table>' +
                    '' +
                    '</body>' +
                    '</html>';


                //console.log(app[0]);
                //console.log(mBody);
                var emailDetails = {
                    text: "",
                    from: app[0].fromEmail,
                    to: app[0].fromEmail,
                    cc: "",
                    subject: data.type,
                    attachment: [
                        {
                            data: mBody,
                            alternative: true
                        }
                    ]
                };
                if (mBody != null) {
                    var server = email.server.connect({
                        user: app[0].emailUsername,
                        password: app[0].emailPassword,
                        host: app[0].domainName,
                        ssl: app[0].sslEnabled
                    });
                    server.send(emailDetails, function (err, message) {
                        //sails.log.info(err || message);
                        console.log(err);
                        if (err) {
                            return callback(err);
                        }
                        callback(null, 'ok');
                    });

                }
            }

        });
    },
    sendEmail: function (emailDetails, app) {

        var server = email.server.connect({
            user: app.emailUsername,
            password: app.emailPassword,
            host: app.domainName,
            ssl: app.sslEnabled
        });
        server.send(emailDetails, function (err, message) {
            sails.log.info(err || message);
            if (err) {
                return res.status(err.status).json({err: err.message});
            }
        });
    },

    sendVerificationEmail: function (data, res) {
        var searchApp = {
            email: data.email
        };
        //Find if the email exist(user exist)
        User.find(searchApp).exec(function (err, app) {
            if (err) return done(err);
            if(app.length !== 0){
                var token = '';
                //if user exist generate the token
                JWT.encode({
                    secret: config.CLIENT_SECRET,
                    payload: {
                        id :  app[0].id,
                        email:  app[0].email
                    },
                    algorithm: 'HS256'
                }).exec({
                    error: function (err){
                        return err;
                    },
                    success: function (result){
                        token = result;
                        var expires = new Date();
                        //set the expire time of the token to one hour from the token generated time
                        expires.setHours(expires.getHours() + 1);

                        resetToken = [{
                            token: token,
                            expires: expires
                        }];
                        //update the resetToken in the database
                        User.update(searchApp,{resetToken:resetToken}).exec(function(err,created){
                            if(err) console.log(err);

                            var serverOrg=config.server.host;

                            var emailBody = "<html>Hello "+app[0].firstName+",<br />"+
                                "<p>You have requested to reset your password. Please click the verify your email address to proceed.</p> <br/>"+
                                "<a href='"+serverOrg+"/#/resetPassword/"+token+"'>Click to here for  verify your email address</a><br/>" +
                                '<p style="padding: 15px 0 0 0; font-weight:700; ">The Appmaker Team<br/></p></html>'

                            var mailOptions = {
                                from: config.IDEABIZ_SUPER_ADMIN_EMAIL, // sender address
                                to: data.email, // list of receivers
                                subject: data.type, // Subject line
                                html: emailBody
                            }


                            // send mail with defined transport object
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {

                                    sails.log.error('Error : Failed to send verification link for forgot password. error => ' + error);
                                    return  res({type:'Error',msg:'Failed to send verification link'});
                                }
                                console.log('Message sent: %s', info.messageId);
                                return res({type:'Success',msg:'Check your email for get the verification link'});
                            });

                        });
                    }
                });
            }
            else{
                return res({type:'Error',msg:'Email does not exist'})
            }
        });
    },






    sendOrderEmail:function (data,res) {

        console.log("-------------------------------");
        console.log(data);
        console.log(data.paymentStatus);
        var searchApp = {
            appId: data.appId
        };



        UserEmail.findOne(searchApp).exec(function (err, userEmail) {




            //console.log(config.APP_FILE_SERVER + data.userId + "/templates/"+data.appId+'/img/email/'+userEmail.orderConfirmedEmailImage);


            if( typeof userEmail==='undefined'){
                console.log("Please Update Email Setting ");

            }else {

                var headerImagePath;
                var headerFileName;
                var subject;

//                        var imagePath =  serverOrg +"/templates/viewWebImages?userId="+ data.userId

                if(data.paymentStatus == 'Pending'){
                    headerImagePath = config.APP_FILE_SERVER + data.userId + "/progressiveTemplates/"+data.appId+'/src/assets/images/email/'+userEmail.orderConfirmedEmailImage;
                    headerFileName = userEmail.orderConfirmedEmailImage;
                    subject = 'You have orderd';
                }
                if(data.paymentStatus == 'Successful'){
                    headerImagePath = config.APP_FILE_SERVER + data.userId + "/progressiveTemplates/"+data.appId+'/src/assets/images/email/'+userEmail.orderFulfilledEmailImage;
                    headerFileName = userEmail.orderFulfilledEmailImage;
                    subject = 'Order fulfilled';
                }
                if(data.paymentStatus == 'Refunded'){
                    headerImagePath = config.APP_FILE_SERVER + data.userId + "/progressiveTemplates/"+data.appId+'/src/assets/images/email/'+userEmail.orderRefundedEmailImage;
                    headerFileName = userEmail.orderRefundedEmailImage;
                    subject = 'Order Refunded';
                }


                var  testPath = config.APP_FILE_SERVER + data.userId + "/progressiveTemplates/"+data.appId+'/src/assets/images/thirdNavi/';

                var test = [];
                test.push({
                        filename: headerFileName,
                        path: headerImagePath,
                        cid: 'note@example.com' // should be as unique as possible
                    }
                );

                for(var i =0;i<data.item.length;i++){
                    test.push({
                        filename: data.item[i].imgURL[0].img,
                        path: testPath + data.item[i].imgURL[0].img,
                        cid: 'prod'+i
                    })
                }

                console.log("--------------------");
                console.log("test=>" + JSON.stringify(test, null, 2));
                console.log("-----------------------");

//                        var serverOrg=config.server.host+':'+config.server.port;
//                        var emailHeaderImage;
//
//                        var imagePath
//                        if(data.isNew == true || data.isNew == 'true'){
//
//                            imagePath =  serverOrg +"/templates/viewWebImages?userId="+ data.userId
//                                                    +"&appId="+data.appId+"&"+new Date().getTime()+"&images=thirdNavi/";
//
//                        }else{
//                            imagePath =  serverOrg +"/templates/viewImages?userId="+ data.userId
//                                            +"&appId="+data.appId+"&"+new Date().getTime()+"&img=thirdNavi/";
//                        }

                console.log("typeof userEmail.orderConfirmedEmailImage "  + typeof userEmail.orderConfirmedEmailImage);
                if(typeof userEmail.orderConfirmedEmailImage !=='undefined'){
                    var  headerImagePath = config.APP_FILE_SERVER + data.userId + "/progressiveTemplates/"+data.appId+'/src/assets/images/email/'+userEmail.orderConfirmedEmailImage;

                    var mBody = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'+
                        '<html xmlns="http://www.w3.org/1999/xhtml" style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">'+
                        '<head>'+
                        '<meta name="viewport" content="width=device-width" />'+
                        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
                        '<title>Billing e.g. invoices and receipts</title>'+
                        ''+
                        ''+
                        '<style type="text/css">'+
                        'img {'+
                        'max-width: 100%;'+
                        '}'+
                        'body {'+
                        '-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em;'+
                        '}'+
                        'body {'+
                        'background-color: #f6f6f6;'+
                        '}'+
                        '@media only screen and (max-width: 640px) {'+
                        '  body {'+
                        '    padding: 0 !important;'+
                        '  }'+
                        '  h1 {'+
                        '    font-weight: 800 !important; margin: 20px 0 5px !important;'+
                        '  }'+
                        '  h2 {'+
                        '    font-weight: 800 !important; margin: 20px 0 5px !important;'+
                        '  }'+
                        '  h3 {'+
                        '    font-weight: 800 !important; margin: 20px 0 5px !important;'+
                        '  }'+
                        '  h4 {'+
                        '    font-weight: 800 !important; margin: 20px 0 5px !important;'+
                        '  }'+
                        '  h1 {'+
                        '    font-size: 22px !important;'+
                        '  }'+
                        '  h2 {'+
                        '    font-size: 18px !important;'+
                        '  }'+
                        '  h3 {'+
                        '    font-size: 16px !important;'+
                        '  }'+
                        '  .container {'+
                        '    padding: 0 !important; width: 100% !important;'+
                        '  }'+
                        '  .content {'+
                        '    padding: 0 !important;'+
                        '  }'+
                        '  .content-wrap {'+
                        '    padding: 10px !important;'+
                        '  }'+
                        '  .invoice {'+
                        '    width: 100% !important;'+
                        '  }'+
                        '}'+
                        '</style>'+
                        '</head>'+
                        ''+
                        '<body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">'+
                        ''+
                        '<table class="body-wrap" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6"><tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>'+
                        '		<td class="container" width="600" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">'+
                        '			<div class="content" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">'+
                        '				<table class="main" width="100%" cellpadding="0" cellspacing="0" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff"><tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-wrap aligncenter" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: center; margin: 0; padding: 20px;" align="center" valign="top">'+
                        '							<table width="100%" cellpadding="0" cellspacing="0" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">' +
                        '                              <tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">' +
                        '                                  <td class="content-block" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">'+
                        '								<img src="cid:note@example.com"/></td>'+
                        '								</tr><tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">';
                    if(data.paymentStatus == 'Pending' && userEmail.orderConfirmedEmail.header){
                        mBody += '<td '+ userEmail.orderConfirmedEmail.header +  ' </td>';

                    }
                    if(data.paymentStatus == 'Successful' && userEmail.orderFulfilledEmail.header){
                        mBody += '<td '+ userEmail.orderFulfilledEmail.header +  ' </td>';

                    }
                    if(data.paymentStatus == 'Refunded' && userEmail.orderRefundEmail.header){
                        mBody += '<td '+ userEmail.orderRefundEmail.header +  ' </td>';

                    }

                    mBody +='								</tr><tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block aligncenter" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top">'+
                        '										<table class="invoice" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; text-align: left; width: 80%; margin: 40px auto;"><tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">';
                    if(typeof data.deliveryCountry != 'undefined' && data.pickUp == 'undefined' && userEmail.orderConfirmedEmail.delivery == true ) {
                        mBody += '  <td style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 5px 0;" valign="top"><b>Delivered to</b><br style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" />' + data.deliveryNo + '<br>' + data.deliveryStreet + '<br>' + data.deliveryCity + ' <br>' + data.deliveryCountry;
                    }else{
                        mBody += '  <td style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 5px 0;" valign="top"><b>Delivered to</b><br style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" />'+data.pickUp.locationName + '<br>' + data.pickUp.number + '<br>' + data.pickUp.streetAddress + '<br>' + data.pickUp.city+ '<br>' + data.pickUp.country+ '<br>' + data.pickUp.postalCode ;
                    }
                    mBody += '<br style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" />'+ new Date().toJSON().slice(0,10)+'</td>';
                    if(typeof data.shippingOpt != 'undefined'&&userEmail.orderConfirmedEmail.delivery==true) {
                        mBody += '                                           <td style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 5px 0;" valign="top"><b>Shipping Details</b><br style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" />' + data.shippingOpt + '</td>';
                    }else {
                        mBody += '                                           <td style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 5px 0;" valign="top"><b>Shipping Details</b><br style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" />' + data.option + '</td>';
                    }
                    if (userEmail.orderConfirmedEmail.order==true){
                        mBody += '											</tr>'+
                            '											<tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">'+
                            '												<td style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 5px 0;" valign="top">What you ordred:'+
                            '													<br style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" />Order number: '+data.id+'<br style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" /></td>'+
                            '											</tr><tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td colspan="2" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 5px 0;" valign="top">'+
                            '													<table class="invoice-items" cellpadding="0" cellspacing="0" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; margin: 0;">';
                        for (var j = 0; j < data.item.length; j++) {


                            mBody += '<tr  style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; border-top-width: 1px; border-top-color: #eee; border-top-style: solid; margin: 0; padding: 5px 0;" valign="top">'+
                                '															<div style="display: inline-block;padding: 5px"><img src="cid:'+test[j+1].cid+'" width="60" height="60"></div><div style="display: inline-block;padding: 5px;">'+data.item[j].name+'<br style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" />QTY: '+data.item[j].qty+' <br>Product Code: '+data.item[j].id+'	</td>'+
                                '															<td class="alignright" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right; border-top-width: 1px; border-top-color: #eee; border-top-style: solid; margin: 0; padding: 5px 0;" align="right" valign="top">'+
                                '															<br><div> '+data.currency + parseFloat(data.item[j].total).toFixed(2)+'</div></td></tr>';
                        }
                        mBody += '														<tr class="total" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">'+
                            '															<td class="alignright" width="80%" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right; border-top-width: 2px; border-top-color: #333; border-top-style: solid; font-weight: 700; margin: 0; padding: 5px 0;" align="right" valign="top"></td>'+
                            '															<td class="alignright" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right; border-top-width: 2px; border-top-color: #333; border-top-style: solid; font-weight: 700; margin: 0; padding: 5px 0;" align="right" valign="top"></td>'+
                            '														</tr>';
                        if(typeof data.shippingCost != 'undefined'){

                            mBody += '															<tr class="total" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">'+
                                '															<td class="alignright" width="80%" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right; font-weight: 700; margin: 0; padding: 5px 0;" align="right" valign="top">Delivery</td>'+
                                '															<td class="alignright" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right;  font-weight: 700; margin: 0; padding: 5px 0;" align="right" valign="top">'+data.currency + parseFloat(data.shippingCost).toFixed(2)+'</td>'+
                                '														</tr>';
                        }
                        if(typeof data.tax != 'undefined') {
                            mBody += '															<tr class="total" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">' +
                                '															<td class="alignright" width="80%" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right;  font-weight: 700; margin: 0; padding: 5px 0;" align="right" valign="top">Tax</td>' +
                                '															<td class="alignright" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right;  font-weight: 700; margin: 0; padding: 5px 0;" align="right" valign="top">' +data.currency + parseFloat(data.tax).toFixed(2) + '</td>' +
                                '														</tr>';
                        }
                        mBody += '													<tr class="total" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">'+
                            '															<td class="alignright" width="80%" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right;  border-bottom-color: #333; border-bottom-width: 2px; border-bottom-style: solid; font-weight: 700; margin: 0; padding: 5px 0;" align="right" valign="top">Total</td>'+
                            '															<td class="alignright" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right; border-bottom-color: #333; border-bottom-width: 2px; border-bottom-style: solid; font-weight: 700; margin: 0; padding: 5px 0;" align="right" valign="top">'+data.currency +parseFloat(data.amount).toFixed(2)+'</td>'+
                            '														</tr>'+
                            ''+
                            '													</table></td>'+
                            '											</tr></table></td>'+
                            '								</tr><tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block aligncenter" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top">'+
                            '										'+
                            '									<img src="https://s3-ap-southeast-1.amazonaws.com/mymagic-startupdb/uploads/Startup/original/ilogos.62522.png" alt="" class="CToWUd"  width="70" height="50" > <br>Powered by otenro.com</td>'+
                            '								</tr><tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block aligncenter" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top">'+
                            '								'+
                            '									</td>'+
                            '								</tr></table></td>';
                    }
                    mBody +='					</tr></table><div class="footer" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;"> '+
                        '					<table width="100%" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="aligncenter content-block" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; color: #999; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top">Powered by otenro.com</td>'+
                        '						</tr></table></div></div>'+
                        '		</td>'+
                        '		<td style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>'+
                        '	</tr></table></body>'+
                        '</html>';






                    let  mailOptions;

//                if (err){
//                       console.log('*****************');
//                       console.log(err);
//                    mailOptions = {
//                        from: 'onbitlabs@gmail.com', // sender address
//                        to: 'onbitlabs@gmail.com', // list of receivers
//                        subject: 'You have ordered', // Subject line
//                        html: mBody
//                    };
//
//                }else {
                    console.log('------------------');

                    // setup email data with unicode symbols

                    mailOptions = {
                        from: userEmail.domainName + '<'+userEmail.replyToEmail + '>', // sender address
                        to: data.email, // list of receivers
                        subject: subject, // Subject line
                        html: mBody ,
                        attachments : test

                    };

//                }


                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log("email send failed \n id: " + data.email +"\n order: " + data.paymentStatus + "\n error: " + error);
                            alert("email send failed \n id: " + data.email +"\n order: " + data.paymentStatus + "\n error: " + error);
                            return  res.send(500);
                        }
                        console.log('Message sent: %s', info.messageId);
                    return res.send('ok');
                });

                }
            }

        });



    },

    //Make an Array of Operators
    getIdeabizUserNetwrokClientsAsArray: function(){
        var operatorObject = config.IDEABIZ_USER_NETWORK_CLIENTS;
        return Object.keys(operatorObject).map(function(key) {
            return operatorObject[key];
        });

    },

    sendApkEmail : function(data,callback){

        var status = data.operator.status;
        var subject,emailBody,operator;
        var toEmail = data.email;
        var fromEmail = config.IDEABIZ_SUPER_ADMIN_EMAIL;
        var op = this.getIdeabizUserNetwrokClientsAsArray();

         op.forEach(function(ele){
            if(ele.code == data.operator.operator){
                operator = ele.desc;
            }
         });

        var apkFile = config.server.host + '/getApkPath' +'/?userId=' + data.uid + '&appId=' + data.id + '&appName='+ data.appName.replace(/\s/g, '');
            var emailBody,subject;

            var email = data.email;

                           if(data.operator.status == "APPROVED"){

                               emailBody = "<html><br>Hi " +  data.fName + " " + data.lName + ",<br><br>"+

                                           "Good news! <B>" + data.appName + "</B> App has been approved by <B>" + operator + "</B> for launch!<br>" +

                                           "Users can access the web app using the following URL: <a href=" + data.appView + "> App view</a><br><br>" +

                                           "You can download the apk file of the application from " + "<a href=" + apkFile + "> download APK </a><br><br><br>" +

                                           "If you need any technical support in uploading the app to an app store, please <br> contact the Ideamart team.<br><br><br>" +
                                           "Regards,<br><br>"+

                                           "Ideamart Team</html>";

                                subject = data.appName + " has been approved";

                           }else if(data.operator.status == "SUSPENDED"){

                                emailBody = "<html><br>Hi " +  data.fName + " " + data.lName + ",<br><br>"+

                                           "This email is to inform you that <B>" + data.appName + "</B> has been suspended by <B>" + operator + "</B>.<br><br>" +

                                           "You can re-submit the app for approval after addressing the concerns<br>" +

                                           "Regards,<br>"+

                                           "Ideamart Team</html>";

                                subject = data.appName + " has been suspended";

                           }else if(data.operator.status == "REJECTED"){

                                emailBody = "<html><br>Hi " +  data.fName + " " + data.lName + ",<br><br>"+

                                           "This email is to inform you that <B>" + data.appName + "</B> has been rejected by <B>" + operator + "</B>. <br><br>" +

                                           "You can re-submit the app for approval after addressing the concerns<br>" +

                                           "Regards,<br>"+

                                           "Ideamart Team</html>";

                                subject = data.appName + " has been rejected";

                           }else if(data.operator.status == "TERMINATED"){

                                           emailBody = "<html><br>Hi " +  data.fName + " " + data.lName + ",<br><br>"+

                                                  "This email is to inform you that <B>" + data.appName + "</B> has been terminated by <B>" + operator + "</B>. <br><br>" +

                                                  "Regards,<br>"+

                                                  "Ideamart Team</html>";

                                subject = data.appName + " has been terminated";

                           }

                     mailOptions = {
                        from: fromEmail, // sender address
                        to: toEmail, // list of receivers
                        subject: subject, // Subject line
                        html:emailBody


                     };

                        // send mail with defined transport object
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                //return console.log(error);
                                console.log(error);
                                return  callback(null,error);

                            }
                            console.log('Message sent: %s', info.messageId);
                    });

                        callback(null,"ok");

        },

    sendNotifyAppCreatorsAboutUpdate : function(data,callback){
        var fromEmail = config.IDEABIZ_SUPPORT_EMAIL;
        data.forEach(function (user) {
            var count = 0;

            var emailBody = `
            Hi ` + user.firstName + ' ' + user.lastName + `,
            <br><br>
            We have updated Appmaker bringing new features and improvements. As part of this update, we have also updated the several app templates which will bring about performance improvements and new features.
            <br><br>
            To update your apps, please login to Appmaker and select the update app option. This will upgrade your app to the new version.
            <br><br>
            The Appmaker Team`;

            var mailOptions = {
                from: fromEmail, // sender address
                to: user.email, // list of receivers
                subject: 'Update existing app to the latest version', // Subject line
                html: emailBody
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    sails.log.error('email sent to:', user.email);
                    sails.log.error('error:',error);
                } else if (data.length - 1 == count) {
                    sails.log.debug('email sent to:', user.email);
                    return callback(null, 'ok');
                } else {
                    sails.log.debug('email sent to:', user.email);
                    count++;
                }
            });
        });
    }

};


