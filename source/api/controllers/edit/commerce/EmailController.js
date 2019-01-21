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

        console.log(req.body);
        var appId = req.body.appId;
        //sails.log.info(appId);
        var saveData = req.body;

        // console.log("saveData " + JSON.stringify(saveData));

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

        console.log(req.body);

        var randomstring = require("randomstring");
        var tmpImage = req.body.file;
        var appId = req.body.data.appId;

        var imgeFileName = randomstring.generate()+".png";
        var data = tmpImage[0].replace(/^data:image\/\w+;base64,/, "");
        var buf = new Buffer(data, 'base64');
        // console.log(buf);
        var appRoot = path.resolve();
        //var dePath= appRoot + '/assets/images/';
        var appId = req.body.data.appId;
        var dePath;

        dePath = config.APP_FILE_SERVER + req.body.data.userId + '/progressiveTemplates/' + appId + '/assets/images/email/';

            if(req.body.oldImage){
                fs.unlink(dePath + req.body.oldImage, function (err) {
                    if (err) return console.error(err);
//                    sails.config.logging.custom.info("file deleted" + req.body.oldImage);

                });
            }

         fs.writeFile(dePath + imgeFileName, buf, function (err) {
            if (err) {
            console.log(err);
                return res.send(err);
            }
//            sails.config.logging.custom.info("file saved" + imgeFileName);
                console.log("dePath " + dePath);

                //var appId = req.param('appId');
                var saveData ="";

                console.log("newFileName " + imgeFileName);


                if( req.body.data.emailType=='orderConfirmedEmail'){
                    console.log("1");
                    saveData = {"orderConfirmedEmailImage" : imgeFileName };
                }else if (req.body.data.emailType=='orderRefundEmail'){
                    console.log("2");
                    saveData = {"orderRefundedEmailImage" : imgeFileName };
                }else if (req.body.data.emailType=='orderFulfilledEmail') {
                    console.log("3");
                    saveData = {"orderFulfilledEmailImage" : imgeFileName };

                }

                console.log("saveData 2 "+ JSON.stringify(saveData));

                UserEmail.update({ appId :appId }, saveData).exec(function(err, data){
                    if (err) {
                        console.log("error  " + err);
                        res.send(err);

                    }
                    res.send({
                        message: "Email Settings has been successfully added",
                        data: data
                    });
                });

        });



//        console.log(" req.body.emailType "+ JSON.stringify(req.body) + " appId " + appId);
//
//        console.log("req.body " + JSON.stringify(req.body));


//        req.file('file').upload({
//            dirname: require('path').resolve(dePath)
//        }, function (err, uploadedFiles) {
//            if (err) return res.serverError(err);
//
//            //sails.log.info(uploadedFiles);
//            if (0 < uploadedFiles.length) {
//
//                var newFileName = Date.now() + uploadedFiles[0].filename;
//                fs.rename(uploadedFiles[0].fd, dePath + '/' + newFileName, function (err) {
//                    if (err) {
//                        console.log("error  " + err);
//                        res.send(err);
//
//                    }
//                });


//            }else {
//                res.send({
//                    message: "Email Settings has been successfully added"
//                });
//            }





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

        console.log(req.body)
        var order = {
            item:
                [ { id: 'Sample Id',
                    name: 'Sample Product',
                    qty: 1,
                    sku: '1003',
                    totWeight: null,
                    price: 250,
                    total: 250,
                    imgDefault: 'sample.jpg',
                    variant: [ { name: 'Size', vType: 'Large' } ],
                    totalQty: 250 } ],
            amount: 300,
            customerName: 'Test User',
            deliverName: 'Test User',
            deliveryNo: '12',
            deliveryStreet: 'Test street',
            deliveryCity: 'Test city',
            deliveryCountry: 'Test country',
            deliveryZip: '12345',
            telNumber: '+123456789',
            tax: 25,
            shippingCost: 25,
            shippingOpt: 'Flat Rate',
            email: 'sample@gmail.com',
            currency: '$',
            promotionCode: null,
            paymentType: 'Cash on delivery',
            discountedTotal: null,
            fromEmail: 'test@gmail.com'
        };
        order['appId'] = req.body.appId;
        order['userId'] = req.body.userId;
        if (req.body.type == 'Order confirm'){

            order['paymentStatus'] = 'Successful';
        }
        else if(req.body.type == 'Order Fulfilled'){
            order['fulfillmentStatus'] = 'Successful';
        }
        else if(req.body.type == 'Order Refund'){
            order['fulfillmentStatus'] = 'Refund';
        }
        // console.log(order)
        ApplicationContactUs.findOne({ appId: req.body.appId }).exec(function (err, storeDetails) {
            if (err) {
                return res.send(500);
            }
            order['storeDetails'] = storeDetails;
            // console.log(order)
            sentMails.sendOrderEmail(order, function (err, msg) {
                sails.log.info(err);
                if (err) {
                    console.log(err)
                    return res.send(500);
                }else{
                    return res.send(200);
                }
            });
        })
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