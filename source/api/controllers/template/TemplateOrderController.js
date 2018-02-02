/**
 * TemplateOrderController
 *
 * @description :: Server-side logic for managing templateorders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var sentMails = require('../../services/emailService');
module.exports = {


    savePendingOrder : function (req,res) {


        var data = req.body;
        data['paymentStatus'] = 'Pending';
        data['fulfillmentStatus'] = 'Pending';

        sails.log.info(data);
        if(data.pickupId == null){
            ApplicationOrder.create(data).exec(function (err, order) {
                sails.log.info(order);

                if (err) res.send(err);
                var searchApp = {
                    appId: order.appId,
                    orderId:order.id
                };
                sails.log.info(searchApp);
                res.send({orderData:searchApp});
            });
        }
        else{
            ShippingDetails.find({id:data.pickupId,appId:data.appId}).exec(function(err,pickUp){
                if(err) res.send(err);
                data.pickUp = pickUp[0];
                data.option = 'pickUp';
                ApplicationOrder.create(data).exec(function (err, order) {
                    if (err) res.send(err);
                    var searchApp = {
                        id: order.appId
                    };
                    sails.log.info(searchApp);
                    res.send('ok');
                });
            });
        }
    },

    saveOrder : function(req,res) {

        var data = req.body;
        data['paymentStatus'] = 'Pending';
        data['fulfillmentStatus'] = 'Pending';

        sails.log.info(data);
        if(data.pickupId == null){
            ApplicationOrder.create(data).exec(function (err, order) {
                sails.log.info(order);

                if (err) res.send(err);
                var searchApp = {
                    id: order.appId
                };
                sails.log.info(searchApp);
                Application.findOne(searchApp).exec(function (err, app) {
                    order['userId'] = app.userId;
                sentMails.sendOrderEmail(order,function (err,msg) {
                    sails.log.info(err);
                    if (err) {
                        return  res.send(500);
                    }
                });
                });

                res.send('ok');
            });
        }
        else{
           ShippingDetails.find({id:data.pickupId,appId:data.appId}).exec(function(err,pickUp){
            if(err) res.send(err);
            data.pickUp = pickUp[0];
            data.option = 'pickUp';
            ApplicationOrder.create(data).exec(function (err, order) {
                if (err) res.send(err);
                var searchApp = {
                    id: order.appId
                };
                sails.log.info(searchApp);
                Application.findOne(searchApp).exec(function (err, app) {
                    order['userId'] = app.userId;
                    sentMails.sendOrderEmail(order,function (err,msg) {
                        sails.log.info(err);
                        if (err) {
                            return  res.send(500);
                        }
                    });
                });
                res.send('ok');
            });
           });
        }
    },
    updateInventory : function(req,res){
    /*Manually updating the relevant quantity in the ThirdNavigation*/
        var obj = [];
        var data = req.body[0];
        ThirdNavigation.find({id: data.id}).exec(function(err, app){
            if(err) res.send(err);
            for(var i =0; i<app[0].variants.length; i++){
                if(app[0].variants[i].sku == data.sku){
                    if(app[0].variants[i].unlimited == true){
                        app[0].variants[i].quantity = null;
                    }
                    else {
                        app[0].variants[i].quantity = app[0].variants[i].quantity - data.qty;
                    }
                    ThirdNavigation.update({id:data.id},app[0]).exec(function(err,thirdNavi){
                        if(err) res.send(err);
                        obj.push(thirdNavi)
                    })
                }

            }
            res.send(obj);

        })
    },
    /**
     * return Tax Details collections for given app Id
     * @param req
     * @param res
     */
    getTaxInfoByCountry : function(req,res){
        var appId = req.body.appId;
        var country = req.body.country;

        var searchQuery = {
            appId:appId,
            countryRestriction:{
                $elemMatch:{
                    countryName:country
                }
            }
        };
        sails.log.info(searchQuery);
        ApplicationTax.find(searchQuery).exec(function(err, result) {
            if (err) return res.send(err);
            return res.send(result);
        });
    }

};

