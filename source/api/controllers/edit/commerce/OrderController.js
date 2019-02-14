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
    updateOrders: function (req, res) {

        var orders = req.body;
        var obj = [];
        var orderController = this;

        orders.forEach(function (order) {

            ApplicationOrder.findOne({ id: order.id }).exec(function (err, orderBeforeUpdate) {

                if (err) {
                    sails.log.error('Error occurred at OrderController.updateOrders , error : ' + err);
                }
                if (orderBeforeUpdate) {

                    // Add to products to inventory again
                    var isQuantityDeduction = false
                    // If app creator fulfill an refunded order
                    if (orderBeforeUpdate.paymentStatus === 'Refunded' && order.paymentStatus === 'Successful') {
                        isQuantityDeduction = true;
                        orderController.updateInventory(order, isQuantityDeduction);
                    }
                    // If app creator refunded an payment success order
                    if (orderBeforeUpdate.paymentStatus === 'Successful' && order.paymentStatus === 'Refunded') {
                        orderController.updateInventory(order, isQuantityDeduction);
                    }
                }
            });

            ApplicationOrder.update({ _id: order.id }, order).exec(function (err, appOrder) {

                if (err) {
                    sails.log.error('Error occurred at OrderController.updateOrders , error : ' + err);
                    return done(err);
                }
                ApplicationContactUs.findOne({ appId: order.appId }).exec(function (err, storeDetails) {

                    if (err) {
                        sails.log.error('Error occurred at OrderController.updateOrders , error : ' + err);
                        return res.send(500);
                    }
                    order['storeDetails'] = storeDetails;
                    sentMails.sendOrderEmail(order, function (err, msg) {

                        if (err) {
                            sails.log.error('Error occurred at OrderController.updateOrders , error : ' + err);
                            return res.send(500);
                        }
                    });
                });
                obj.push(appOrder);
            });
        });
        res.send(obj);
    },

    /**
     * Update inventory according to update of application order
     * @param order {object} :: application order
     * @param isQuantityDeduction {boolean} :: deduction or addition of total quantity of thirdnavigation model variants 
     */
    updateInventory: function (order, isQuantityDeduction) {

        order.item.forEach(function (item) {

            ThirdNavigation.findOne({ id: item.id }).exec(function (err, thirdNavigation) {

                if (err) {
                    sails.log.error('Error occurred : OrderController.updateInventory , error : ' + err);
                }
                if (thirdNavigation) {

                    for (var i = 0; i < thirdNavigation.variants.length; i++) {

                        if (thirdNavigation.variants[i].sku === item.sku) {

                            if (isQuantityDeduction) {
                                thirdNavigation.variants[i].quantity = thirdNavigation.variants[i].quantity - thirdNavigation.variants[i].orderedQuantity;
                            }
                            if (!isQuantityDeduction) {
                                thirdNavigation.variants[i].quantity = thirdNavigation.variants[i].quantity + thirdNavigation.variants[i].orderedQuantity;
                            }
                        }
                    }
                    ThirdNavigation.update({ id: item.id }, thirdNavigation).exec(function (err) {

                        if (err) {
                            sails.log.error('Error occurred : OrderController.updateInventory , error : ' + err);
                        }
                    });
                }
            });
        });
    }
};