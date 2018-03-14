/**
 * OrderController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var sentMails = require('../../../services/emailService');
module.exports = {

    getOrders : function(req,res){
        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };
        ApplicationOrder.find(searchApp).exec(function(err, app) {
            if (err) return done(err);
            res.send(app);
        });
    },
    updateOrders : function(req,res){

    // var ObjectId = require('mongodb').ObjectID;
    console.log("req " + req);
    console.log("--------------");
    console.log(JSON.stringify(req.body));
    var data = req.body;
    var obj = [];

    data.forEach(function(orders){

        console.log("orders " + JSON.stringify(orders));
        ApplicationOrder.update({_id: orders.id},orders).exec(function(err,order){
            if (err) return done(err);
            sentMails.sendOrderEmail(orders,function (err,msg) {
                sails.log.info(err);
                if (err) {
                    console.log('update order email ' + err);
                    return  res.send(500);
                }
            });
            obj.push(order);
        })
    })
    console.log(obj);
        res.send(obj);
    }
};