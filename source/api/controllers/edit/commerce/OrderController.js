/**
 * OrderController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

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
    var data = req.body;
    var obj = [];

    data.forEach(function(orders){

        console.log("orders " + JSON.stringify(orders));
        ApplicationOrder.update({_id: orders.id},orders).exec(function(err,order){
            if (err) return done(err);
            obj.push(order);
        })
    })
        res.send(obj);
    }
};