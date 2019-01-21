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
var ERROR = { status: 'ERROR' };
var SUCCESS = { status: 'SUCCESS' };

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
    showTwoDecimals: function(num){
       return parseFloat(Math.round(num * 100) / 100).toFixed(2);
    },
    sendPayHereForm :function (req,res) {
             //var currency = req.param("currency");
             var currency = "LKR";
             var sever = config.server.host;
            var appRealHost = decodeURIComponent(req.body.realHostUrl);

        var items = req.body.item;

        var itemsHtml = '';
        for (var i=0; i < items.length; i++) {
            var j= i+1;
            itemsHtml +=  '<li class="list-group-item"><label>Item_'+j+'</label>' +
                            '<input readonly class="form-control" type="text" name="item_name_'+j+'"  value="'+items[i].name+'"  [(ngModel)]="'+items[i].name+'" style="width:44%;display:inline;margin:0 5px">' +
                            '<label>Amount_'+j+' (LKR)</label>' +
                            '<input readonly class="form-control" style="width:31%;display:inline;margin:0 5px;" type="text" name="amount_'+j+'" value="'+this.showTwoDecimals(items[i].price)+'" [(ngModel)]="'+this.showTwoDecimals(items[i].price)+'"\>'+
                            '<input readonly class="form-control" style="width:37%;display:inline;margin:0 5px;" type="hidden" name="quantity_'+j+'" value="'+items[i].qty+'" [(ngModel)]="'+items[i].qty+'"\>'+
                            '<input readonly class="form-control" style="width:37%;display:inline;margin:0 5px;" type="hidden" name="item_number_'+j+'" value="'+items[i].id+'" [(ngModel)]="'+items[i].id+'"\>'+
                          '</li><br>';
        }


         var htmlForm =  " <h3 class=\"main-header-font\">Item Details</h3>" +
                        " <ul class=\"list-group\" style=\"margin-top: 15px\"> " + itemsHtml+
                        "<li class=\"list-group-item\">" +
                        "<input class=\"form-control\" type=\"hidden\" name=\"items\" value=\""+"Order with tax"+"\"  [(ngModel)]=\""+items[0].name+"\" style=\"width:44%;display:inline;margin:0 5px\">" +
                        "<label>Total Amount (LKR)</label>" +
                        "<input readonly class=\"form-control\" style=\"width:79%;display:inline;margin:0 5px;\" type=\"text\" name=\"amount\" value=\""+this.showTwoDecimals(req.body.amount)+"\" [(ngModel)]=\""+this.showTwoDecimals(req.body.amount)+"\"></li> " +
                        "</ul> " +
                        "<input type=\"hidden\" name=\"custom_1\" value=\""+req.body.appId+"\" [(ngModel)]=\""+req.body.appId+"\">   " +
                        "<input type=\"hidden\" name=\"merchant_id\" value=\""+req.body.payHereMerchantId+"\" [(ngModel)]=\""+req.body.payHereMerchantId+"\">" +
                        " <input type=\"hidden\" name=\"return_url\"  value=\""+appRealHost+"payhereSuccess?orderId="+req.body.orderId+"&appId="+req.body.appId+"\"   [(ngModel)]=\""+appRealHost+"payhereSuccess?orderId="+req.body.orderId+"&appId="+req.body.appId+"\">" +
                        " <input type=\"hidden\" name=\"cancel_url\" value=\""+appRealHost+"payhereCancel?orderId="+req.body.orderId+"\" [(ngModel)]=\""+appRealHost+"payhereCancel?orderId="+req.body.orderId+"\">" +
                        " <input type=\"hidden\" name=\"notify_url\" value=\""+sever+"/mobile/notifyUrl\" [(ngModel)]=\""+sever+"/mobile/notifyUrl\">" +
                        " <input type=\"hidden\" name=\"order_id\" value=\""+req.body.orderId+"\" [(ngModel)]=\""+req.body.orderId+"\">" +
                        " <input type=\"hidden\" name=\"currency\" value=\""+currency+"\" [(ngModel)]=\""+currency+"\">" +
                        " <h3 class=\"main-header-font\">Personal Details</h3>" +
                        " <div class=\"form-group\"> " +
                        " <label for=\"firstName\">First Name</label> " +
                        "<input readonly type=\"text\" name=\"first_name\" class=\"form-control\"  value=\""+req.body.customerName+"\"  [(ngModel)]=\""+req.body.customerName+"\"> " +
                        " </div> " +
                        "<div class=\"form-group\"> <label for=\"lastName\">Last Name</label>" +
                        " <input readonly type=\"text\" name=\"last_name\" class=\"form-control\" id=\"lastName\" placeholder=\"Last Name\"  value=\""+req.body.lastName+"\"  [(ngModel)]=\"-\"> " +
                        "</div> " +
                        "<div class=\"form-group\"> <label for=\"email\">Email</label>" +
                        " <input readonly type=\"text\" name=\"email\" class=\"form-control\"  value=\""+req.body.email+"\"  [(ngModel)]=\""+req.body.email+"\"> " +
                        "</div> " +
                        "<div class=\"form-group\"> <label for=\"phone\">Phone</label> " +
                        "<input readonly  type=\"text\" name=\"phone\" value=\""+req.body.telNumber+"\" [(ngModel)]=\""+req.body.telNumber+"\" class=\"form-control\" id=\"phone\" placeholder=\"Phone No.\" > " +
                        "</div>" +
                        " <h3 class=\"main-header-font\">Address</h3>" +
                        " <div class=\"form-group\"> <label for=\"address\">Address</label> " +
                        "<input readonly type=\"text\" name=\"address\" value=\""+req.body.deliveryNo+" "+req.body.deliveryStreet+"\" [(ngModel)]=\""+req.body.deliveryNo+" "+req.body.deliveryStreet+"\" class=\"form-control\" id=\"address\" placeholder=\"Address\" > " +
                        "</div>" +
                        " <div class=\"form-group\"> <label for=\"city\">City</label> " +
                        "<input readonly type=\"text\" name=\"city\" value=\""+req.body.deliveryCity+"\" [(ngModel)]=\""+req.body.deliveryCity+"\" class=\"form-control\" id=\"city\" placeholder=\"City\" >" +
                        " </div>" +
                        " <div class=\"form-group\"> <label for=\"country\">Country</label>" +
                        " <input readonly id=\"country\"  type=\"text\" name=\"country\" value=\"Sri Lanka\" [(ngModel)]=\"Sri Lanka\" class=\"form-control\" placeholder=\"Country\" >" +
                        " </div>" +
                        " <hr>";
        res.set('Content-Type', 'text/html');
        res.send(new Buffer(htmlForm));
    },



    payHereSuccess : function (req,res) {

        var oderId = req.param("orderId");
        var appId = req.param("appId");
        var userId = req.param("userId");
        var mobileCtrl = this;

        var searchOrder = {id:oderId};

        if (oderId !== 'undefined') {
            ApplicationOrder.find(searchOrder, function(err, order) {
                if (err) return done(err);
    
                var searchQry ={'id': appId}
                Application.find(searchQry, function(err, app){
    
                    mobileCtrl.sendOrderConfirmationEmail(app[0], order[0]);  
                    if (order[0].promotionCode !== null) {
                        mobileCtrl.processPromoCode(order[0]);
                    }  
                    // res.set('Content-Type', 'text/html');
                    res.send('ok');
    
                });
    
            });
        }else{
            res.send('ok');
        }
    },

    /**
     * Responsible managing payment canceled payhere application orders
     */
    payHereCancel: function (req, res) {

        var oderId = req.param("orderId");
        var mobileCtrl = this;
        var paymentStatus = "Canceled";

        ApplicationOrder.update({ id: oderId }, { paymentStatus: paymentStatus })
            .exec(function (err, order) {

                if (err) {
                    sails.log.error("error occurred while updating ApplicationOrder at MobileController.payHereCancel => " + err);
                    return res.serverError(ERROR);
                }
                if (order && order.length > 0) {
                    mobileCtrl.updateInventory(paymentStatus, order[0]);
                    return res.send(SUCCESS);
                }
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
                paymentStatus = "Pending";
                break;
            case "-1":
                paymentStatus = "Canceled";
                break;
            case "2":
                paymentStatus = "Successful";
                break;
            case "-2":
                paymentStatus = "Failed";
                break;
            case "-3":
                paymentStatus = "Chargedback";
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
        if(app){
            order['userId'] = app.userId;
            UserEmail.findOne({appId: order.appId}).exec(function (err, userEmail) {

                if (err) {
                    sails.log.error('Error occurred in finding User email Settings : TemplateOrderController.saveOrder , error : ' + err);
                }

                if (userEmail) {

                    order.fromEmail = userEmail.fromEmail;
                    order.userId = app.userId;
                    // console.log("-----------------------------------------------------")
                    // console.log(order)
                    emailService.sendOrderEmail(order, function (err, msg) {

                        if (err) {
                            if (err == 'error processing order, no email sent') {
                                sails.log.error('Error processing order, no email sent');
                            } else {
                                sails.log.error('Error occurred in finding User email Settings : TemplateOrderController.saveOrder , error : ' + err);
                            }
                        }
                    });
                }
            });
        }else {
            sails.log.error('Not from payhere, no email sent with regarding payhere');
        }
    },

    updateInventory: function (status, applicationOrder) {

        if (status === "Canceled" || status === "Failed") {

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
    },

    processPromoCode: function(applicationOrder) {

        var mobileCtrl = this;
        var appId = applicationOrder.appId;
        var promoCode = applicationOrder.promotionCode;
        var orderEmail = applicationOrder.email;
        var findQuery = { appId: appId, promoCode: promoCode };

        SalesAndPromotion.findOne(findQuery).exec(function (err, salesAndPromotion) {

            if (err) {
                sails.log.error('error occurred while processing promotion , error : ' + err);
            }
            if (salesAndPromotion) {
    
                if (salesAndPromotion.status === config.SALES_AND_PROMOTIONS_STATUS.ACTIVE) {

                    salesAndPromotion.used = (salesAndPromotion.used) ? salesAndPromotion.used + 1 : 1;
                } 

                if (salesAndPromotion.isLimitUsers) {
                    mobileCtrl.limitOneUsePerCustomer(salesAndPromotion, orderEmail);
                }

                if (salesAndPromotion.isLimitNumberOfTime) {
                    mobileCtrl.limitNoOfTimesPromo(salesAndPromotion);
                }
            }
        });
    },
    limitOneUsePerCustomer: function (salesAndPromotion, email) {

        if (!salesAndPromotion.usedUsers) {

            salesAndPromotion.usedUsers = [email];
            salesAndPromotion.usedUserCount = 1;
            salesAndPromotion.save(function (error) {

                if (error) {
                    sails.log.error('error occurred while processing promotion , error : ' + error);
                }
            });
        }
        else if (salesAndPromotion.usedUserCount && salesAndPromotion.usedUserCount < salesAndPromotion.limitUsers) {

            salesAndPromotion.usedUsers.push(email);
            salesAndPromotion.usedUserCount = salesAndPromotion.usedUserCount + 1;

            if (salesAndPromotion.usedUserCount === salesAndPromotion.limitUsers) {
                salesAndPromotion.status = config.SALES_AND_PROMOTIONS_STATUS.EXPIRED;
            }
            salesAndPromotion.save(function (error) {

                if (error) {
                    sails.log.error('error occurred while processing promotion , error : ' + error);
                }
            });
        }
    },

    limitNoOfTimesPromo: function (salesAndPromotion) {

        if (!salesAndPromotion.noOfUses) {

            salesAndPromotion.noOfUses = 1;
            salesAndPromotion.save(function (error) {

                if (error) {
                    sails.log.error('error occurred while processing promotion , error : ' + error);
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
                }
            });
        }
    }
};