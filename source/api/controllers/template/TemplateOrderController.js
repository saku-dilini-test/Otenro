/**
 * TemplateOrderController
 *
 * @description :: Server-side logic for managing templateorders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var sentMails = require('../../services/emailService');
var config = require('../../services/config');
var PROMOTION_STATUSES = {
    OK: 'OK',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    EMAIL_EXISTS: 'EMAIL_EXISTS',
    EXPIRED: 'EXPIRED',
    PROMO_CODE_NOT_EXISTS: 'PROMO_CODE_NOT_EXISTS',
    NOT_FOUND: 'NOT_FOUND'
}
module.exports = {


    savePendingOrder : function (req,res) {
        
        var data = req.body;
        var thisController = this;
        thisController.checkOneTimePromoCodeIsUsed(data, function (response) {

            if (response.message === PROMOTION_STATUSES.OK) {
                data['paymentStatus'] = 'Pending';
                data['fulfillmentStatus'] = 'Pending';
        
                if(data.pickupId == null){
                    ApplicationOrder.create(data).exec(function (err, order) {
        
                        if (err)
                            return res.send(err);
                        else
                            return res.send(order);
                    });
                }
                else{
                    ShippingDetails.find({id:data.pickupId,appId:data.appId}).exec(function(err,pickUp){
                        if(err) return res.send(err);
                        data.pickUp = pickUp[0];
                        data.deliveryCountry = pickUp[0].country;
                        data.shippingOpt = pickUp[0].shippingOption;
                        data.option = 'pickUp';
                        ApplicationOrder.create(data).exec(function (err, order) {
        
                            if (err) return res.send(err);
                            var searchApp = { id: order.appId };
            
                            Application.findOne(searchApp).exec(function (err, app) {
            
                                order['userId'] = app.userId;
                                order.isNew = data.isNew;
                                //Find user email settings
                                UserEmail.findOne({ appId: order.appId }).exec((err, userEmail) => {
                                    if (err) {
                                        sails.log.error('Error occurred in finding User email Settings : TemplateOrderController.saveOrder , error : ' + err);
                                        return res.send(order);
                                    }
                            
                                    if (userEmail) {
                                        order.fromEmail = userEmail.fromEmail;
                                    }
                                    sentMails.sendOrderEmail(order, function (err, msg) {
                                        if (err) {
                                            sails.log.error('Error occurred , error : ' + err);
                                            return res.send(order);
                                        }
                                        return res.send(order);
                                    });
                                });
                            });
                        });
                    });
                }
            } else {
                return res.send({ message: response.message, description: response.description });
            }
        });
    },

    saveOrder : function(req,res) {
        var execute = this;
        var data = req.body;
        var save = true;
        var name;
        var count = 0;

        execute.processPromoCode(data, function (promoStatus) {

            if (promoStatus === PROMOTION_STATUSES.OK || promoStatus === PROMOTION_STATUSES.PROMO_CODE_NOT_EXISTS) {
                
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
                                     if(prod[0].variants[j].sku == data.item[count-1].sku){
                                         found ++;
                                         if(prod[0].variants[j].quantity == 0 || prod[0].variants[j].quantity < data.item[count-1].qty &&  data.item[count-1].unlimited == false){
                                             save = false;
                                             name = data.item[count-1].name;
                                         }
                                     }
        
                                     if(newCount == prod[0].variants.length && found == 0){
                                         save = false;
                                         name = data.item[count-1].name;
                                     }
        
                                }
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
                                            ApplicationContactUs.findOne({ appId: order.appId }).exec(function (err, storeDetails) {
                                                if (err) {
                                                    return res.send(500);
                                                }
                                                order['storeDetails'] = storeDetails;
                                                sentMails.sendOrderEmail(order, function (err, msg) {
                                                    sails.log.info(err);
                                                    if (err) {
                                                        return res.send(500);
                                                    }
                                                });
                                            })
        
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
                                console.log('inside pickup');
                                     if(prod[0].variants[j].sku == data.item[count-1].sku){
                                         found ++;
                                         if(prod[0].variants[j].quantity == 0 || prod[0].variants[j].quantity < data.item[count-1].qty &&  data.item[count-1].unlimited == false){
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
            }
            else if (promoStatus === PROMOTION_STATUSES.EMAIL_EXISTS) {

                return res.send({ message: PROMOTION_STATUSES.EMAIL_EXISTS, description: `${data.promotionCode} promotion code is already used by ${data.email}` });
            }
            else if (promoStatus === PROMOTION_STATUSES.INTERNAL_SERVER_ERROR) {

                return res.serverError({ message: PROMOTION_STATUSES.INTERNAL_SERVER_ERROR, description: `Internal server error is occurred while processing ${data.promotionCode} promotion code` });
            }
            else if (promoStatus === PROMOTION_STATUSES.EXPIRED) {

                return res.send({ message: PROMOTION_STATUSES.EXPIRED, description: `${data.promotionCode} promotion code is expired.` });
            }
        });
    },
    updateInventory : function(req,res){
    /*Manually updating the relevant quantity in the ThirdNavigation*/
        var obj = [];
        var data = req.body[0];
        // Remaining quantity of the updating product
        var pQuantity;
        ThirdNavigation.find({id: data.id}).exec(function(err, app){
            if(err) return res.send(err);
            for(var i =0; i<app[0].variants.length; i++){
                if(app[0].variants[i].sku == data.sku){
                    if(app[0].variants[i].unlimited == true){
                        app[0].variants[i].quantity = null;
                    }
                    else {
                        app[0].variants[i].quantity = app[0].variants[i].quantity - data.qty;
                        app[0].variants[i].orderedQuantity = data.qty;
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
    },

    processPromoCode: function (order, cb) {

        if (order.promotionCode !== null) {

            var appId = order.appId;
            var promoCode = order.promotionCode;
            var thisController = this;
            var promotionStatus = null;
            var findQuery = { appId: appId, promoCode: promoCode };
    
            SalesAndPromotion.findOne(findQuery).exec(function (err, salesAndPromotion) {
    
                if (err) {
                    sails.log.error('error occurred while processing promotion , error : ' + err);
                    promotionStatus = PROMOTION_STATUSES.INTERNAL_SERVER_ERROR;
                    return promotionStatus;
                }
    
                if (salesAndPromotion) {
    
                    if (salesAndPromotion.status === config.SALES_AND_PROMOTIONS_STATUS.ACTIVE) {
    
                        salesAndPromotion.used = (salesAndPromotion.used) ? salesAndPromotion.used + 1 : 1;
                    } 
    
                    if (salesAndPromotion.isLimitUsers) {
    
                        thisController.limitOneUsePerCustomer(salesAndPromotion, order.email, function (promotionStatus) {
                            
                            return cb(promotionStatus);
                        });
                    }
    
                    if (salesAndPromotion.isLimitNumberOfTime) {
    
                        thisController.limitNoOfTimesPromo(salesAndPromotion, function (promotionStatus) {

                            return cb(promotionStatus);
                        });
                    }
                }
            });
        } else {

            return cb(PROMOTION_STATUSES.PROMO_CODE_NOT_EXISTS);
        }
    },

    limitNoOfTimesPromo: function (salesAndPromotion, cb) {

        if (!salesAndPromotion.noOfUses) {

            salesAndPromotion.noOfUses = 1;
            salesAndPromotion.save(function (error) {
    
                if (error) {
    
                    sails.log.error('error occurred while processing promotion , error : ' + error);
                    return cb(PROMOTION_STATUSES.INTERNAL_SERVER_ERROR);
                } else {
                    return cb(PROMOTION_STATUSES.OK);
                }
            });
        }
        else if (salesAndPromotion.noOfUses && salesAndPromotion.noOfUses < salesAndPromotion.limitNumberOfTime) {

            salesAndPromotion.noOfUses = salesAndPromotion.noOfUses + 1;
            if (salesAndPromotion.noOfUses === salesAndPromotion.limitNumberOfTime) {

                salesAndPromotion.status = config.SALES_AND_PROMOTIONS_STATUS.EXPIRED;
            }
            salesAndPromotion.save(function (error) {
    
                if (error) {
    
                    sails.log.error('error occurred while processing promotion , error : ' + error);
                    return cb(PROMOTION_STATUSES.INTERNAL_SERVER_ERROR);
                } else {
                    return cb(PROMOTION_STATUSES.OK);
                }
            });
        }
        else if (salesAndPromotion.noOfUses && salesAndPromotion.noOfUses === salesAndPromotion.limitNumberOfTime) {

            return cb(PROMOTION_STATUSES.EXPIRED);
        }
    },

    limitOneUsePerCustomer: function (salesAndPromotion, email, cb) {

        if (!salesAndPromotion.usedUsers) {

            salesAndPromotion.usedUsers = [email];
            salesAndPromotion.usedUserCount = 1;
            salesAndPromotion.save(function (error) {

                if (error) {

                    sails.log.error('error occurred while processing promotion , error : ' + error);
                    return cb(PROMOTION_STATUSES.INTERNAL_SERVER_ERROR);
                } else {

                    return cb(PROMOTION_STATUSES.OK);
                }
            });
        }
        else if (salesAndPromotion.usedUserCount && salesAndPromotion.usedUserCount < salesAndPromotion.limitUsers) {

            var equalEmails = salesAndPromotion.usedUsers.filter(function (usedEmail) {
                return usedEmail === email;
            });

            if (equalEmails.length === 0) {

                salesAndPromotion.usedUsers.push(email);
                salesAndPromotion.usedUserCount = salesAndPromotion.usedUserCount + 1;

                if (salesAndPromotion.usedUserCount === salesAndPromotion.limitUsers) {
                    salesAndPromotion.status = config.SALES_AND_PROMOTIONS_STATUS.EXPIRED;
                }
                salesAndPromotion.save(function (error) {

                    if (error) {

                        sails.log.error('error occurred while processing promotion , error : ' + error);
                        return cb(PROMOTION_STATUSES.INTERNAL_SERVER_ERROR);
                    } else {

                        return cb(PROMOTION_STATUSES.OK);
                    }
                });
            } else {
                return cb(PROMOTION_STATUSES.EMAIL_EXISTS);
            }
        }
        else if (salesAndPromotion.usedUserCount && salesAndPromotion.usedUserCount === salesAndPromotion.limitUsers) {

            return cb(PROMOTION_STATUSES.EXPIRED);
        }
    },

    checkOneTimePromoCodeIsUsed: function (data, cb) {

        var findQuery = { appId: data.appId, promoCode: data.promotionCode };
        SalesAndPromotion.findOne(findQuery).exec(function (err, salesAndPromotion) {

            if (err) {
                sails.log.error('error occurred while finding sales and promotion code. error , ' + err);
                return cb({ message: PROMOTION_STATUSES.INTERNAL_SERVER_ERROR, description: `Internal server error occurred while processing ${data.promotionCode} promotion code.` });
            }
            if (!salesAndPromotion) {

                return cb({ message: PROMOTION_STATUSES.NOT_FOUND, description: `${data.promotionCode} could not be found.` });
            }
            if (salesAndPromotion) {
                if (salesAndPromotion.isLimitUsers && salesAndPromotion.usedUsers) {

                    var usedEmails = salesAndPromotion.usedUsers.filter(function (userEmail) {
                        return userEmail === data.email;
                    });
                    if (usedEmails.length === 0) {
                        return cb({ message: PROMOTION_STATUSES.OK });
                    } else {
                        return cb({ message: PROMOTION_STATUSES.EMAIL_EXISTS, description: `${salesAndPromotion.promoCode} promocode is already used by ${data.email}` });
                    }
                } else {
                    return cb({ message: PROMOTION_STATUSES.OK });
                }
            }
        });
    }
};

