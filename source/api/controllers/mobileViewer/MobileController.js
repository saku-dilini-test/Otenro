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
             //var  sever = "http://14fa8ccc.ngrok.io";

        var htmlForm = "<form method=\"post\" "+
            "action=\"https://sandbox.payhere.lk/pay/checkout\">  " +
            "<input type=\"hidden\" name=\"custom_1\" value=\""+req.param("appId")+"\">   " +
            "<input type=\"hidden\" name=\"merchant_id\" value=\""+req.param("payHereMerchantId")+"\">   " +
            "<input type=\"hidden\" name=\"return_url\" value=\""+sever+"/mobile/payHereSuccess?orderId="+req.param("orderId")+"\"> " +
            "<input type=\"hidden\" name=\"cancel_url\" value=\""+sever+"/mobile/cancelUrl\">" +
            "<input type=\"hidden\" name=\"notify_url\" value=\""+sever+"/mobile/notifyUrl\">  <br>  first_name:<br>  " +
            "<input type=\"text\" name=\"first_name\" value=\""+req.param("name")+"\"> " +
            "<input type=\"hidden\" name=\"last_name\" value=\"-\">  <br>  email:<br>  " +
            "<input type=\"text\" name=\"email\" value=\""+req.param("email")+"\">  <br>   phone:<br>  " +
            "<input type=\"text\" name=\"phone\" value=\""+req.param("telNumber")+"\">  <br>   address:<br>  " +
            "<input type=\"text\" name=\"address\" value=\""+req.param("address")+"\">  <br>   city:<br>  " +
            "<input type=\"text\" name=\"city\" value=\""+req.param("city")+"\">  <br>   country:<br>  " +
            "<input type=\"text\" name=\"country\" value=\"Sri Lanka\"> " +
            "<input type=\"hidden\" name=\"order_id\" value=\""+req.param("orderId")+"\">  <br>  items:<br> " +
            " <input type=\"text\" name=\"items\" value=\""+req.param("item")+"\">" +
            "<input type=\"hidden\" name=\"currency\" value=\""+currency+"\">  <br>  amount:<br>  " +
            "<input type=\"text\" name=\"amount\" value=\""+req.param("amount")+"\">  <br>   " +
            "<input type=\"submit\" value=\"Submit\"></form> ";

        res.set('Content-Type', 'text/html');
        res.send(new Buffer(htmlForm));
    },



    payHereSuccess : function (req,res) {


        var oderId = req.param("orderId");

        var searchOrder = {id:oderId};

        ApplicationOrder.find(searchOrder, function(err, order) {
            if (err) return done(err);

            var htmlForm = "<!DOCTYPE html>" +
                "<html><body><h1>success</h1>" +
                "<p>Your order is " + order[0].paymentStatus + " </p></body></html>";

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

        var htmlForm = "<!DOCTYPE html>" +
            "<html><body><h1>cancel</h1>" +
            "<p>Your order is cancel</p></body></html>"

        res.set('Content-Type', 'text/html');
        res.send(new Buffer(htmlForm));

    }


};