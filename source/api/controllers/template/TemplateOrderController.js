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

                if (err) res.send(err);
                var searchApp = { id: order.appId };

                Application.findOne(searchApp).exec(function (err, app) {

                    order['userId'] = app.userId;
                    order.isNew = data.isNew;
                    //Find user email settings
                    UserEmail.findOne({ appId: order.appId }).exec(function(err, userEmail) {
                
                        if (err) {
                            sails.log.error('Error occurred in finding User email Settings : TemplateOrderController.saveOrder , error : ' + err);
                        }
                
                        if (userEmail) {
                            order.fromEmail = userEmail.fromEmail;
                        }
                        sentMails.sendOrderEmail(order, function (err, msg) {
                            sails.log.info(err);
                            if (err) {
                                return res.send(500);
                            }
                        });
                    });
                });
                res.send(order);
            });
        }
        else{
            ShippingDetails.find({id:data.pickupId,appId:data.appId}).exec(function(err,pickUp){
                if(err) res.send(err);
                data.pickUp = pickUp[0];
                data.deliveryCountry = pickUp[0].country;
                data.shippingOpt = pickUp[0].shippingOption;
                data.option = 'pickUp';
                ApplicationOrder.create(data).exec(function (err, order) {

                    if (err) res.send(err);
                    var searchApp = { id: order.appId };
    
                    Application.findOne(searchApp).exec(function (err, app) {
    
                        order['userId'] = app.userId;
                        order.isNew = data.isNew;
                        //Find user email settings
                        UserEmail.findOne({ appId: order.appId }).exec((err, userEmail) => {
                    
                            if (err) {
                                sails.log.error('Error occurred in finding User email Settings : TemplateOrderController.saveOrder , error : ' + err);
                            }
                    
                            if (userEmail) {
                                order.fromEmail = userEmail.fromEmail;
                            }
                            sentMails.sendOrderEmail(order, function (err, msg) {
                                sails.log.info(err);
                                if (err) {
                                    return res.send(500);
                                }
                            });
                        });
                    });
                    res.send(order);
                });
            });
        }
    },

    saveOrder : function(req,res) {
        var execute = this;
        var data = req.body;
        var save = true;
        var name;
        var count = 0;

        if(data.paymentType == 'Cash on delivery' || data.paymentType == 'Cash on pickup'){
            data['paymentStatus'] = 'Successful';
        }else{
            data['paymentStatus'] = 'Pending';
        }


        data['fulfillmentStatus'] = 'Pending';
        if(data.pickupId == null){
            for(var i = 0;i < data.item.length;i++){

                        var found = 0;
                ThirdNavigation.find({id:data.item[i].id}).exec(function(err,prod){
                    console.log(i);
                    count ++;
                    if(!prod[0]){
                        save = false;
                        name = data.item[count-1].name;
                    }else{
                    var newCount = 0;
                        for(var j = 0; j < prod[0].variants.length; j++){
                            newCount ++;
                        console.log(prod[0].variants[j].sku);
                        console.log(data.item[count-1].sku);
                             if(prod[0].variants[j].sku == data.item[count-1].sku){
                                 found ++;
                                 if(prod[0].variants[j].quantity == 0 || prod[0].variants[j].quantity < data.item[count-1].qty){
                                     save = false;
                                     name = data.item[count-1].name;
                                 }
                             }

                             if(newCount == prod[0].variants.length && found == 0){
                                 save = false;
                                 name = data.item[count-1].name;
                             }

                        };

                    }
                    if(count == data.item.length && save == true){
                        ApplicationOrder.create(data).exec(function (err, order) {
                            sails.log.info(order);

                            if (err) res.send(err);
                            var searchApp = {
                                id: order.appId
                            };
                            sails.log.info(searchApp);
                            Application.findOne(searchApp).exec(function (err, app) {

                                order['userId'] = app.userId;
                                order.isNew = data.isNew;
                                //Find user email settings
                                UserEmail.findOne({ appId: order.appId }).exec(function(err, userEmail) {

                                    if (err) {
                                        sails.log.error('Error occurred in finding User email Settings : TemplateOrderController.saveOrder , error : ' + err);
                                    }

                                    if (userEmail) {
                                        order.fromEmail = userEmail.fromEmail;
                                    }
                                    sentMails.sendOrderEmail(order, function (err, msg) {
                                        sails.log.info(err);
                                        if (err) {
                                            return res.send(500);
                                        }
                                    });
                                });
                            });

                            return res.send({status:200});
                        });
                    }
                     if(count == data.item.length && save == false){
                        return res.send({status:404,name:name});
                    }
                });

            };

        }
        else{
           ShippingDetails.find({id:data.pickupId,appId:data.appId}).exec(function(err,pickUp){
            if(err) res.send(err);
            data.pickUp = pickUp[0];
            data.deliveryCountry = pickUp[0].country;
            data.shippingOpt = pickUp[0].shippingOption;
            data.option = 'pickUp';
            for(var i = 0;i < data.item.length;i++){

                        var found = 0;
                ThirdNavigation.find({id:data.item[i].id}).exec(function(err,prod){
                    console.log(i);
                    count ++;
                    if(!prod[0]){
                        save = false;
                        name = data.item[count-1].name;
                    }else{
                    var newCount = 0;
                        for(var j = 0; j < prod[0].variants.length; j++){
                            newCount ++;
                        console.log(prod[0].variants[j].sku);
                        console.log(data.item[count-1].sku);
                             if(prod[0].variants[j].sku == data.item[count-1].sku){
                                 found ++;
                                 if(prod[0].variants[j].quantity == 0 || prod[0].variants[j].quantity < data.item[count-1].qty){
                                     save = false;
                                     name = data.item[count-1].name;
                                 }
                             }

                             if(newCount == prod[0].variants.length && found == 0){
                                 save = false;
                                 name = data.item[count-1].name;
                             }

                        };

                    }
                    if(count == data.item.length && save == true){
                        ApplicationOrder.create(data).exec(function (err, order) {
                            sails.log.info(order);

                            if (err) res.send(err);
                            var searchApp = {
                                id: order.appId
                            };
                            sails.log.info(searchApp);
                            Application.findOne(searchApp).exec(function (err, app) {
                                order['userId'] = app.userId;
                                order.isNew = data.isNew;
                                //Find user email settings
                                UserEmail.findOne({ appId: order.appId }).exec(function(err, userEmail) {

                                    if (err) {
                                        sails.log.error('Error occurred in finding User email Settings : TemplateOrderController.saveOrder , error : ' + err);
                                    }

                                    if (userEmail) {
                                        order.fromEmail = userEmail.fromEmail;
                                    }
                                    sentMails.sendOrderEmail(order, function (err, msg) {
                                        sails.log.info(err);
                                        if (err) {
                                            return res.send(500);
                                        }
                                    });
                                });
                            });

                            return res.send({status:200});
                        });
                    }
                     if(count == data.item.length && save == false){
                        return res.send({status:404,name:name});
                    }
                });

            };
           });
        }
    },
    updateInventory : function(req,res){
    /*Manually updating the relevant quantity in the ThirdNavigation*/
        var obj = [];
        var data = req.body[0];
        // Remaining quantity of the updating product
        var pQuantity;
        ThirdNavigation.find({id: data.id}).exec(function(err, app){
            if(err) res.send(err);
            for(var i =0; i<app[0].variants.length; i++){
                if(app[0].variants[i].sku == data.sku){
                    if(app[0].variants[i].unlimited == true){
                        app[0].variants[i].quantity = null;
                    }
                    else {
                        app[0].variants[i].quantity = app[0].variants[i].quantity - data.qty;
                        pQuantity = app[0].variants[i].quantity;
                        UserEmail.find({appId: app[0].appId}).exec(function (err, email) {
                            if (err) {
                                // TODO: handle user email find error
                                sails.log.info(err);
                            }
                            if (email.length > 0) {
                                // If remaining product Quantity is less than minimum stock level
                                if (email[0].alertAt >= pQuantity) {
                                    var emailData = {
                                        fromEmail: email[0].fromEmail,
                                        alertEmail: email[0].alertEmail,
                                        pName: app[0].name,
                                        pDescription: app[0].detailedDesc,
                                        sku: data.sku,
                                        price: data.price,
                                        weight: data.weight
                                    };
                                    // Send the low stock notification email
                                    sentMails.sendLowStockEmail(emailData, function (callback) {
                                        if (callback.message === 'success') {
                                            // TODO: handle success callback
                                            sails.log.info(callback.message);
                                        } else if (callback.message === 'error') {
                                            // TODO: handle error callback
                                            sails.log.info(callback.message);
                                        } else if (callback.message === 'failed') {
                                            // TODO: handle failed callback
                                            sails.log.info(callback.message);
                                        }
                                    });
                                }
                            }
                        });
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

