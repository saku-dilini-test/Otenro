/**
 * EmailController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var sentMails = require('../../../services/emailService');
var fs = require('fs-extra'),
    config = require('../../../services/config');
var path = require('path');

const nodemailer = require('nodemailer');
var transporter = null;


nodemailer.createTestAccount((err, account) => {

    // create reusable transporter object using the default SMTP transport
    transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'communications@otenro.com', // generated ethereal user
            pass: 'R&3%ee=r1'  // generated ethereal password
        }
    });

});

module.exports = {




    saveEmailDeliInfo : function(req,res){


        sails.log.info(req.body);
        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };
        var saveData = req.body;
        saveData.appId = appId;

        UserEmail.update(searchApp, saveData).exec(function (err, app) {
            if (app.length == 0) {
                UserEmail.create(saveData).exec(function (err, appAboutUs) {
                    if (err) res.send(err);

                    res.send({
                        appId: appAboutUs.appId,


                        message: "Email Settings has been successfully added "
                    });
                });
            } else {
                res.send({
                    appId: req.body.appId,
                    message: "Email Settings has been successfully Updated "
                });
            }
        });
    },
    updateEmailSettings : function(req,res){

        //console.log(req.body);
        var appId = req.body.appId;
        //sails.log.info(appId);
        var saveData = req.body;

        console.log("saveData " + JSON.stringify(saveData));

        UserEmail.update({ appId :appId }, saveData).exec(function(err,r){
            if (err){
                console.log("error "+err);
                return done(err);
            }
            res.send({
                appId: req.body.appId,
                message: "Email Settings has been successfully Updated "
            });
        });
    },


    updateHeaderFooterSettings : function(req,res){

        console.log("updateHeaderFooterSettings " );

        var appRoot = path.resolve();
        //var dePath= appRoot + '/assets/images/';
        var appId = req.body.appId;
        var dePath      = config.APP_FILE_SERVER + req.body.userId + '/templates/' + appId + '/img/email/';

        console.log("dePath " + dePath);

        //var appId = req.param('appId');
        var saveData ="";

        console.log(" req.body.emailType "+ JSON.stringify(req.body) + " appId " + appId);

        console.log("req.body " + JSON.stringify(req.body));


        req.file('file').upload({
            dirname: require('path').resolve(dePath)
        }, function (err, uploadedFiles) {
            if (err) return res.serverError(err);

            //sails.log.info(uploadedFiles);
            if (0 < uploadedFiles.length) {

                var newFileName = Date.now() + uploadedFiles[0].filename;
                fs.rename(uploadedFiles[0].fd, dePath + '/' + newFileName, function (err) {
                    if (err) {
                        console.log("error  " + err);
                        res.send(err);

                    }
                });

                console.log("newFileName " + newFileName);


                if( req.body.emailType=='orderConfirmedEmail'){
                    console.log("1");
                    saveData = {"orderConfirmedEmailImage" : newFileName };
                }else if (req.body.emailType=='orderRefundEmail'){
                    console.log("2");
                    saveData = {"orderRefundedEmailImage" : newFileName };
                }else if (req.body.emailType=='orderFulfilledEmail') {
                    console.log("3");
                    saveData = {"orderFulfilledEmailImage" : newFileName };

                }

                console.log("saveData 2 "+ JSON.stringify(saveData));

                UserEmail.update({ appId :appId }, saveData).exec(function(err,r){
                    if (err) {
                        console.log("error  " + err);
                        res.send(err);

                    }
                    res.send({
                        message: "Email Settings has been successfully added"
                    });
                });


            }else {
                res.send({
                    message: "Email Settings has been successfully added"
                });
            }



        });

    },


    getEmailSettings : function(req,res){

        sails.log.info(req.body);

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };


        UserEmail.find(searchApp).exec(function(err, app) {
            if (err) return done(err);
            res.send(app);
        });
    },

    sendTestEmail : function(req,res){

        //sails.log.info(req.body);
        var type = req.body.type;
        var appId = req.body.appId;
        var userId = req.body.userId;

        var data = {
            appId: appId,
            userId: userId
        }
        var searchApp = {
            appId: data.appId
        };

        UserEmail.findOne(searchApp).exec(function (err, userEmail) {


            console.log("userEmail"+ JSON.stringify(userEmail));

            var serverOrg=config.server.host+':'+config.server.port;
            var emailHeaderImage;

            var imagePath =  serverOrg +"/templates/viewImages?userId="+ userId
                +"&appId="+appId+"&"+new Date().getTime()+"&img=thirdNavi/";

            var  headerImagePath = config.APP_FILE_SERVER + userId + "/templates/"+appId+'/img/email/'+userEmail.orderConfirmedEmailImage;

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
                '								</tr><tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">' +
                '                                   <td '+ userEmail.orderConfirmedEmail.header +  ' </td>'+
                '								</tr><tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block aligncenter" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top">'+
                '										<table class="invoice" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; text-align: left; width: 80%; margin: 40px auto;"><tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">';
            if(userEmail.orderConfirmedEmail.delivery==true ) {
                mBody += '  <td style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 5px 0;" valign="top"><b>Delivered to</b><br style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" />John Doe, 488, Kotte Road, Pitakotte';
            }
            mBody += '<br style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" />'+ new Date().toJSON().slice(0,10)+'</td>';
            if(userEmail.orderConfirmedEmail.delivery==true) {
                mBody += '                                           <td style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 5px 0;" valign="top"><b>Shipping Details</b><br style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" />Express Delivery</td>';
            }
            if (userEmail.orderConfirmedEmail.order==true){
                mBody += '											</tr>'+
                    '											<tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">'+
                    '												<td style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 5px 0;" valign="top">What you ordred:'+
                    '													<br style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" />Order number: 1234567890 <br style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" /></td>'+
                    '											</tr><tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td colspan="2" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 5px 0;" valign="top">'+
                    '													<table class="invoice-items" cellpadding="0" cellspacing="0" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; margin: 0;">';
                /* for (var j = 0; j < data.item.length; j++) {*/


                mBody += '<tr  style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; border-top-width: 1px; border-top-color: #eee; border-top-style: solid; margin: 0; padding: 5px 0;" valign="top">'+
                    '															<div style="display: inline-block;padding: 5px"><img  alt="prodcut" src="" width="60" height="60"></div><div style="display: inline-block;padding: 5px;">Superman T-Shir<br style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" />QTY: 1 <br>Product Code: 1234	</td>'+
                    '															<td class="alignright" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right; border-top-width: 1px; border-top-color: #eee; border-top-style: solid; margin: 0; padding: 5px 0;" align="right" valign="top">'+
                    '															<br><div> $ 25</div></td></tr>';
                /* }*/
                mBody += '														<tr class="total" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">'+
                    '															<td class="alignright" width="80%" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right; border-top-width: 2px; border-top-color: #333; border-top-style: solid; font-weight: 700; margin: 0; padding: 5px 0;" align="right" valign="top"></td>'+
                    '															<td class="alignright" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right; border-top-width: 2px; border-top-color: #333; border-top-style: solid; font-weight: 700; margin: 0; padding: 5px 0;" align="right" valign="top"></td>'+
                    '														</tr>';


                mBody += '															<tr class="total" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">'+
                    '															<td class="alignright" width="80%" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right; font-weight: 700; margin: 0; padding: 5px 0;" align="right" valign="top">Delivery</td>'+
                    '															<td class="alignright" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right;  font-weight: 700; margin: 0; padding: 5px 0;" align="right" valign="top">$ 15</td>'+
                    '														</tr>';


                mBody += '															<tr class="total" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">' +
                    '															<td class="alignright" width="80%" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right;  font-weight: 700; margin: 0; padding: 5px 0;" align="right" valign="top">Tax</td>' +
                    '															<td class="alignright" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right;  font-weight: 700; margin: 0; padding: 5px 0;" align="right" valign="top">$ 10 </td>' +
                    '														</tr>';

                mBody += '													<tr class="total" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">'+
                    '															<td class="alignright" width="80%" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right;  border-bottom-color: #333; border-bottom-width: 2px; border-bottom-style: solid; font-weight: 700; margin: 0; padding: 5px 0;" align="right" valign="top">Total</td>'+
                    '															<td class="alignright" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right; border-bottom-color: #333; border-bottom-width: 2px; border-bottom-style: solid; font-weight: 700; margin: 0; padding: 5px 0;" align="right" valign="top">$ 50</td>'+
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


            console.log("headerImagePath" + headerImagePath);
            fs.readFile(headerImagePath, function(err, imgData) {
                let  mailOptions;

                if (err){

                     mailOptions = {
                        from: 'onbitlabs@gmail.com', // sender address
                        to: userEmail.fromEmail, // list of receivers
                        subject: 'You have ordered', // Subject line
                        html: mBody
                    };

                }else {
                    // setup email data with unicode symbols
                    var base64data = new Buffer(imgData).toString('base64');
                    emailHeaderImage  =base64data;
                    mailOptions = {
                        from: 'onbitlabs@gmail.com', // sender address
                        to: userEmail.fromEmail, // list of receivers
                        subject: 'You have ordered', // Subject line
                        html: mBody ,
                        attachments : [
                            {
                                filename: 'image.png',
                                content: Buffer.from(
                                    emailHeaderImage,
                                    'base64'
                                ),

                                cid: 'note@example.com' // should be as unique as possible
                            }
                        ]// html body,
                    };

                }


                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        //return console.log(error);
                        return  res.send(500);
                    }
                    console.log('Message sent: %s', info.messageId);
                return res.send('ok');
            });
            });





        });

        /*sentMails.sendConfirmEmail(data,function (err,msg) {
            //sails.log.info(err);
            if (err) {
                return  res.send(500);
            }else{
                return res.send('ok');
            }
            //res.send(msg);
        });*/
    },
    sendVerificationLinkEmail : function(req,res){

        var type = req.body.type;
        var email = req.body.email;

        var data = {
            type : type,
            email: email
        }
        var msg = sentMails.sendVerificationEmail(data, function (msg)
        {
            res.send(msg);
        });
    },
    sendRegisterConfirmationEmail : function(req,res){
        var email = req.body.email;

        var data = {
            email: email
        }

        var msg = sentMails.sendRegisterConfirmation(data, function (msg)
        {
            res.send(msg);
        });
    },
    viewImages : function(req,res){

        var appRoot = path.resolve();
        var dePath= appRoot + '/assets/images/';
        res.sendfile(dePath+req.param('image'));
    },

};