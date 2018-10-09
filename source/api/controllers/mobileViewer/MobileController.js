/**
 * Created by thusithz on 3/16/16.
 */
/**
 * MobileController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var config = require('../../services/config');
var md5 = require('md5');
var emailService = require('../../services/emailService');

module.exports = {

    /**
     * retrieve all apps request userId
     */

    allApps: function(req, res) {

        var userId = req.userId;
        var searchApp = {
            userId: userId
        };
        Application.find(searchApp, function(err, apps) {
            if (err) return done(err);
            res.send(apps);
        });
    },

    /**
     * retrieve meServerUrl
     */

    meServerUrl :function(req,res){
        res.send({meServerUrl:config.server.host+':'+config.ME_PORT})
    },
    fileServerUrl :function(req,res){
        res.send({fileServerUrl:config.server.host+':'+config.server.port})
    }
    ,
    clearAllAppData : function(req,res){
        console.log();
        var searchApp = {
            userId: req.param("data"),
            status:'DRAFT'
        };
        Application.destroy(searchApp, function(err, apps) {
            if (err) return done(err);
            res.ok();
        });
    },
    sendPayHereForm :function (req,res) {

             //var currency = req.param("currency");
             var currency = "LKR";
             var sever = config.server.host;
             console.log("realHost"+req.param("realHostUrl"));
             //var  sever = "http://76c8163f.ngrok.io";
            var appRealHost = decodeURIComponent(req.param("realHostUrl"));

         var htmlForm =  " <h3 class=\"main-header-font\">Item Details</h3>" +
                        " <ul class=\"list-group\" style=\"margin-top: 15px\"> " +
                        "<li class=\"list-group-item\">" +
                        "<input class=\"form-control\" type=\"text\" name=\"items\" value=\""+req.param("item")+"\"  [(ngModel)]=\"items\" style=\"width:48%;display:inline;margin-right:5px\">" +
                        "<input readonly class=\"form-control\" style=\"width:50%;display:inline;\" type=\"text\" name=\"amount\" value=\""+req.param("amount")+"\" [(ngModel)]=\""+req.param("amount")+"\"></li> " +
                        "</ul> " +
                        "<input type=\"hidden\" name=\"custom_1\" value=\""+req.param("appId")+"\" [(ngModel)]=\""+req.param("appId")+"\">   " +
                        "<input type=\"hidden\" name=\"merchant_id\" value=\""+req.param("payHereMerchantId")+"\" [(ngModel)]=\""+req.param("payHereMerchantId")+"\">" +
                        " <input type=\"hidden\" name=\"return_url\"  value=\""+appRealHost+"payhereSuccess?orderId="+req.param("orderId")+"&appId="+req.param("appId")+"\"   [(ngModel)]=\""+appRealHost+"payhereSuccess?orderId="+req.param("orderId")+"&appId="+req.param("appId")+"\">" +
                        " <input type=\"hidden\" name=\"cancel_url\" value=\""+appRealHost+"payhereCancel?orderId="+req.param("orderId")+"\" [(ngModel)]=\""+appRealHost+"payhereCancel?orderId="+req.param("orderId")+"\">" +
                        " <input type=\"hidden\" name=\"notify_url\" value=\""+sever+"/mobile/notifyUrl\" [(ngModel)]=\""+sever+"/mobile/notifyUrl\">" +
                        " <input type=\"hidden\" name=\"order_id\" value=\""+req.param("orderId")+"\" [(ngModel)]=\""+req.param("orderId")+"\">" +
                        " <input type=\"hidden\" name=\"currency\" value=\""+currency+"\" [(ngModel)]=\""+currency+"\">" +
                        " <h3 class=\"main-header-font\">Personal Details</h3>" +
                        " <div class=\"form-group\"> " +
                        " <label for=\"firstName\">First Name</label> " +
                        "<input type=\"text\" name=\"first_name\" class=\"form-control\"  value=\""+req.param("name")+"\"  [(ngModel)]=\""+req.param("name")+"\"> " +
                        " </div> " +
                        "<div class=\"form-group\"> <label for=\"lastName\">Last Name</label>" +
                        " <input type=\"text\" name=\"last_name\" class=\"form-control\" id=\"lastName\" placeholder=\"Last Name\"  value=\"-\"  [(ngModel)]=\"-\"> " +
                        "</div> " +
                        "<div class=\"form-group\"> <label for=\"email\">Email</label>" +
                        " <input type=\"text\" name=\"email\" class=\"form-control\"  value=\""+req.param("email")+"\"  [(ngModel)]=\""+req.param("email")+"\"> " +
                        "</div> " +
                        "<div class=\"form-group\"> <label for=\"phone\">Phone</label> " +
                        "<input  type=\"text\" name=\"phone\" value=\""+req.param("telNumber")+"\" [(ngModel)]=\""+req.param("telNumber")+"\" class=\"form-control\" id=\"phone\" placeholder=\"Phone No.\" > " +
                        "</div>" +
                        " <h3 class=\"main-header-font\">Address</h3>" +
                        " <div class=\"form-group\"> <label for=\"address\">Address</label> " +
                        "<input type=\"text\" name=\"address\" value=\""+req.param("address")+"\" [(ngModel)]=\""+req.param("address")+"\" class=\"form-control\" id=\"address\" placeholder=\"Address\" > " +
                        "</div>" +
                        " <div class=\"form-group\"> <label for=\"city\">City</label> " +
                        "<input type=\"text\" name=\"city\" value=\""+req.param("city")+"\" [(ngModel)]=\""+req.param("city")+"\" class=\"form-control\" id=\"city\" placeholder=\"City\" >" +
                        " </div>" +
                        " <div class=\"form-group\"> <label for=\"country\">Country</label>" +
                        " <input id=\"country\"  type=\"text\" name=\"country\" value=\"Sri Lanka\" [(ngModel)]=\"Sri Lanka\" class=\"form-control\" placeholder=\"Country\" >" +
                        " </div>" +
                        " <hr>";
        res.set('Content-Type', 'text/html');
        res.send(new Buffer(htmlForm));
    },



    payHereSuccess : function (req,res) {

        console.log("payhere success");
        var oderId = req.param("orderId");
        var appId = req.param("appId");
        var userId = req.param("userId");
        var mobileCtrl = this;

        var searchOrder = {id:oderId};

        ApplicationOrder.find(searchOrder, function(err, order) {
            if (err) return done(err);

            var searchQry ={'id': appId}
            Application.find(searchQry, function(err, app){

                mobileCtrl.sendOrderConfirmationEmail(app[0], order[0]);    

                // res.set('Content-Type', 'text/html');
                res.send('ok');

            });

        });



    },

    notifyUrl : function (req,res) {


        var notification   = req.body;
        var md5sig = notification.md5sig.toUpperCase();
        var paymentStatus;
        var mobileCtrl = this;

        console.log("notification.merchant_id " + notification.merchant_id);

        console.log("md5sig " + md5sig);

        var localmd5sig =  md5((notification.merchant_id +
            notification.order_id + notification.payhere_amount +
            notification.payhere_currency + notification.status_code).toUpperCase());

        console.log("md5sig local " + localmd5sig);

        switch (notification.status_code) {
            case "0":
                paymentStatus = "pending";
                break;
            case "-1":
                paymentStatus = "canceled";
                break;
            case "2":
                paymentStatus = "successful";
                break;
            case "-2":
                paymentStatus = "failed";
                break;
            case "-3":
                paymentStatus = "chargedback";
                break;
        }


            ApplicationOrder.update(
                {id:notification.order_id},{paymentStatus:paymentStatus}).exec(function(err,order){
                if (err) return done(err);
                mobileCtrl.updateInventory(paymentStatus, order[0]);
                res.ok(order);

            })

    },

    cancelUrl : function (req,res) {

        console.log("cancel....");

        var htmlForm = "<!DOCTYPE html> <html lang=\"en\"> <head> <meta charset=\"utf-8\"> " +
            "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> " +
            "<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags --> <title>Pay Here</title> " +
            "</head> <body class=\"container\" style=\"height: 90vh; vertical-align: middle; display: table-cell;\"> " +
            "<h1 style=\"color:red;text-align:center;\">Your order was cancelled.</h1>" +
            "<p style=\"text-align:center\">Please contact seller for more information.</p></body></html>"

        res.set('Content-Type', 'text/html');
        res.send(new Buffer(htmlForm));

    },

    sendOrderConfirmationEmail: function (app, order) {

        order['userId'] = app.userId;
        UserEmail.findOne({ appId: order.appId }).exec(function (err, userEmail) {

            if (err) {
                sails.log.error('Error occurred in finding User email Settings : TemplateOrderController.saveOrder , error : ' + err);
            }

            if (userEmail) {

                order.fromEmail = userEmail.fromEmail;
                order.userId = app.userId;
                emailService.sendOrderEmail(order, function (err, msg) {

                    if (err) {
                        sails.log.error('Error occurred in finding User email Settings : TemplateOrderController.saveOrder , error : ' + err);
                    }
                });
            }
        });
    },

    updateInventory: function (status, applicationOrder) {

        if (status === "canceled" || status === "failed") {

            applicationOrder.item.forEach(function (item) {

                ThirdNavigation.findOne({ id: item.id }).exec(function (err, thirdNavigation) {

                    if (err) {

                        sails.log.error('Error occurred : MobileController.updateInventory , error : ' + err);
                    }

                    if (thirdNavigation) {

                        for (var i = 0; i < thirdNavigation.variants.length; i++) {

                            if (thirdNavigation.variants[i].sku === item.sku) {

                                thirdNavigation.variants[i].quantity = thirdNavigation.variants[i].quantity + thirdNavigation.variants[i].orderedQuantity;
                            }
                        }

                        ThirdNavigation.update({ id: item.id }, thirdNavigation).exec(function (err, updatedThirdNav) {

                            if (err) {

                                sails.log.error('Error occurred : MobileController.updateInventory , error : ' + err);
                            }

                            if (updatedThirdNav.length > 0) {

                                sails.log.debug('Invetory Updated Successfully');
                            }
                        });
                    }
                });
            });
        }
    }
};