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
             var sever = config.server.host+':'+config.server.port;
             //var  sever = "http://76c8163f.ngrok.io";

        var htmlForm ="<!DOCTYPE html> <html lang=\"en\"> <head> <meta charset=\"utf-8\"> " +
                        "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> " +
                        "<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags --> <title>Pay Here</title> " +
                        "<!-- Latest compiled and minified CSS --> <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" integrity=\"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u\" crossorigin=\"anonymous\"> " +
                        "</head> <body> " +
                        "<form class=\"container\" method=\"post\" "+
                        "action=\"https://sandbox.payhere.lk/pay/checkout\">  " +
                        " <h3 style=\"color: #2957de;\">Item Details</h3>" +
                        " <ul class=\"list-group\" style=\"margin-top: 15px\"> " +
                        "<li class=\"list-group-item\"><input class=\"form-control\" type=\"text\" name=\"items\" value=\""+req.param("item")+"\" style=\"width:48%;display:inline;margin-right:5px\"><input class=\"form-control\" style=\"width:50%;display:inline;\" type=\"text\" name=\"amount\" value=\""+req.param("amount")+"\"></li> " +
                        "</ul> " +
                        "<input type=\"hidden\" name=\"custom_1\" value=\""+req.param("appId")+"\">   " +
                        "<input type=\"hidden\" name=\"merchant_id\" value=\""+req.param("payHereMerchantId")+"\">" +
                        " <input type=\"hidden\" name=\"return_url\"  value=\""+sever+"/mobile/payHereSuccess?orderId="+req.param("orderId")+"\">" +
                        " <input type=\"hidden\" name=\"cancel_url\" value=\""+sever+"/mobile/cancelUrl\">" +
                        " <input type=\"hidden\" name=\"notify_url\" value=\""+sever+"/mobile/notifyUrl\">" +
                        " <input type=\"hidden\" name=\"order_id\" value=\""+req.param("orderId")+"\">" +
                        " <input type=\"hidden\" name=\"currency\" value=\""+currency+"\">" +
                        " <h3 style=\"color: #2957de;\">Personal Details</h3>" +
                        " <div class=\"form-group\"> " +
                        " <label for=\"firstName\">First Name</label> " +
                        "<input type=\"text\" name=\"first_name\" class=\"form-control\"  value=\""+req.param("name")+"\"> " +
                        " </div> " +
                        "<div class=\"form-group\"> <label for=\"lastName\">Last Name</label>" +
                        " <input type=\"text\" name=\"last_name\" class=\"form-control\" id=\"lastName\" placeholder=\"Last Name\"  value=\"-\"> " +
                        "</div> " +
                        "<div class=\"form-group\"> <label for=\"email\">Email</label>" +
                        " <input type=\"text\" name=\"email\" class=\"form-control\"  value=\""+req.param("email")+"\"> " +
                        "</div> " +
                        "<div class=\"form-group\"> <label for=\"phone\">Phone</label> " +
                        "<input  type=\"text\" name=\"phone\" value=\""+req.param("telNumber")+"\" class=\"form-control\" id=\"phone\" placeholder=\"Phone No.\" > " +
                        "</div>" +
                        " <h3 style=\"color: #2957de;\">Address</h3>" +
                        " <div class=\"form-group\"> <label for=\"address\">Address</label> " +
                        "<input type=\"text\" name=\"address\" value=\""+req.param("address")+"\" class=\"form-control\" id=\"address\" placeholder=\"Address\" > " +
                        "</div>" +
                        " <div class=\"form-group\"> <label for=\"city\">City</label> " +
                        "<input type=\"text\" name=\"city\" value=\""+req.param("city")+"\" class=\"form-control\" id=\"city\" placeholder=\"City\" >" +
                        " </div>" +
                        " <div class=\"form-group\"> <label for=\"country\">Country</label>" +
                        " <input id=\"country\"  type=\"text\" name=\"country\" value=\"Sri Lanka\" class=\"form-control\" placeholder=\"Country\" >" +
                        " </div>" +
                        " <hr> <button type=\"submit\" value=\"Submit\" style=\"background: #ffa700; color: #fff; border: 0; margin: 15px 0;\" class=\"btn btn-default btn-block\">Next</button> " +
                        "</form> </body> </html>";
        res.set('Content-Type', 'text/html');
        res.send(new Buffer(htmlForm));
    },



    payHereSuccess : function (req,res) {


        var oderId = req.param("orderId");

        var searchOrder = {id:oderId};

        ApplicationOrder.find(searchOrder, function(err, order) {
            if (err) return done(err);

            var htmlForm = "<!DOCTYPE html> <html lang=\"en\"> <head> <meta charset=\"utf-8\"> " +
                "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> " +
                "<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags --> <title>Pay Here</title> " +
                "</head> <body class=\"container\" style=\"height: 90vh; vertical-align: middle; display: table-cell;width:100vw\"> " +
                "<h1 style=\"color:#00a700;text-align:center\">Thank you!</h1>" +
                "<p style=\"text-align:center\">Your order is " + order[0].paymentStatus + " </p></body></html>";

            res.set('Content-Type', 'text/html');
            res.send(new Buffer(htmlForm));
        });



    },

    notifyUrl : function (req,res) {


        var notification   = req.body;
        var md5sig = notification.md5sig.toUpperCase();
        var paymentStatus;

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
                break
            case "-3":
                paymentStatus = "chargedback";
           ;
        }


            ApplicationOrder.update(
                {id:notification.order_id},{paymentStatus:paymentStatus}).exec(function(err,order){
                if (err) return done(err);
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

    }


};