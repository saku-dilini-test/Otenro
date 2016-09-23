/**
 * Created by root on 2/2/16.
 */

var request = require('request'),
    JWT = require('machinepack-jwt'),
    email = require("../../node_modules/emailjs/email"),
    config = require('../services/config');
var path = require('path');

var server = email.server.connect({
    user: "onbilabsttest@gmail.com",
    password: "0nb1tl@b$",
    host: "smtp.gmail.com",
    ssl: true
});

module.exports = {


    sendConfirmEmail: function (data, res) {

        //var data = this.getUserEmailData(emailsParms,res);
        //console.log(data);
        var searchApp = {
            appId: data.appId
        };
        console.log(searchApp);
        var appRoot = path.resolve();
        var dePath = appRoot + '/assets/images/';

        UserEmail.find(searchApp).exec(function (err, app) {
            if (err) return done(err);

            // var apps = JSON.stringify(app);
            console.log(app);
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
                //mBody = app[0].header + app[0].footer + "<img src='"+dePath + app[0].imageHeader+"' >";

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
                    '                            <img alt="Logo" src="http://www.simatosolutions.com:1340/edit/viewImages?image=' + app[0].imageHeader + '" width="60" height="60" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 16px;" border="0">' +
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
                    '                            <img alt="Logo" src="http://www.simatosolutions.com:1340/edit/viewImages?image=' + app[0].imageFooter + '" width="60" height="60" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 16px;" border="0">' +
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


                console.log(app[0]);
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
                    server.send(emailDetails, function (err, message) {
                        sails.log.info(err || message);
                        if (err) {
                            return res.status(err.status).json({err: err.message});
                        }
                    });
                }
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
                   secret: '17ca644f4f3be572ec33711a40a5b8b4',
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
                        var serverOrg=config.server.host+':'+config.server.port;
                        var emailDetails = {
                            text: "Email verification",
                            from: 'sallayshamila93@gmail.com',
                            to: data.email,
                            cc: "",
                            subject: data.type,
                            attachment: [
                                {
                                    data: "<html>Hello "+app[0].firstName+",<br />"+
                                          "<a href='"+serverOrg+"/#/resetPassword/"+token+"'>Click here to verify your email address</a></html>",
                                    alternative: true
                                }
                            ]
                        };
                        //send the email
                        server.send(emailDetails, function(err, message) {
                            if (err) {
                            console.log(err);
                            }
                            return res({msg:'Check your email to get the verification link'})
                        });
                    });
                   }
                });
             }
             else{
                return res({msg:'Email does not exist'})
             }
        });
    }
};

