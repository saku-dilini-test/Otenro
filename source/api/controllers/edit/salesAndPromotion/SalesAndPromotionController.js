/**
 * Created by prasanna on 12/23/16.
 */
/**
 * SalesAndPromotionController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var config = require('../../../services/config');
var nodeSchedule = require('node-schedule');

module.exports = {

    saveSalesAndPromotion : function(req,res){
        // console.log(req.body)
        var salesAndPromotionData   = req.body;
        var thisController = this;
    
        salesAndPromotionData.status = thisController.setSalesAndPromotionStatus(salesAndPromotionData);

        if(salesAndPromotionData.id){

            var searchQuery = {
                id : salesAndPromotionData.id,
            };
            SalesAndPromotion.find({appId:salesAndPromotionData.appId,id:{'!' : salesAndPromotionData.id},promoCode: salesAndPromotionData.promoCode}).exec(function (err, found) {
                if(err){
                    return res.serverError(err);
                }else if(found.length > 0){
                    // console.log("found")
                    // console.log(found)
                    return res.send(409);
                }else {
                    SalesAndPromotion.update(searchQuery, salesAndPromotionData).exec(function (err, updateResult) {
                        if (err) {

                            sails.log.error('Error occurred while updating sales and promotions : ' + err);
                            return res.serverError(err);
                        }
                        else {

                            sails.log.info('Successfully Update Sales And Promotion');
                            thisController.chageSalesAndPromotionsStatus(updateResult[0]);
                            return res.send(200, updateResult);
                        }
                    });
                }
            });

        } else {
                // if not update
                    // create new Sales And  Promotion Collection
            SalesAndPromotion.find({appId:salesAndPromotionData.appId,promoCode: salesAndPromotionData.promoCode}).exec(function (err, found) {
                if(err){
                    return res.serverError(err);
                }else if(found.length > 0){
                    // console.log("found when create")
                    // console.log(found)
                    return res.send(409);
                }else{
                    SalesAndPromotion.create(salesAndPromotionData).exec(function (err, createResult) {
                        if (err) {

                            sails.log.error('Error occurred while creating sales and promotions : ' + err);
                            return res.serverError(err);
                        }
                        else {
                            sails.log.info('Successfully Create Sales And Promotion');
                            thisController.chageSalesAndPromotionsStatus(createResult);
                            return res.send(200, createResult);
                        }
                    });
                }

            });


        }
        // update Sales And  Promotion for given appId and salesAndPromotionType
//        SalesAndPromotion.update(searchQuery,salesAndPromotionData).exec(function(err,updateResult) {
//            if (err) res.send(err);
//            else {
//                // if not update
//                if (updateResult.length == 0) {
//                    // create new Sales And  Promotion Collection
//                    SalesAndPromotion.create(salesAndPromotionData).exec(function (err, createResult) {
//                        if (err) res.send(err);
//                        else {
//                            sails.log.info('Successfully Create Sales And Promotion');
//                            res.send(200, createResult);
//                        }
//                    });
//                }
//                else {
//                    sails.log.info('Successfully Update Sales And Promotion');
//                    res.send(200, updateResult);
//                }
//            }
//        });
    },


    getListOfSalesAndPromotions : function(req,res){
        var appId = req.param('appId');
        var searchQuery = {
            appId: appId
        };
        SalesAndPromotion.find(searchQuery).exec(function (err, salesAndPromotion) {
            if (err) {

                sails.log.error('Error occurred while getting sales and promotions : ' + err);
                return res.serverError(err);
            } else {

                return res.send(salesAndPromotion);
            }
        });
    },

    deleteSalesAndPromotions: function (req, res) {
        var id = req.body.id;

        SalesAndPromotion.destroy({ id: id }).exec(function (err, data) {
            if (err) {

                sails.log.error('Error occurred while deleting sales and promotions : ' + err);
                return res.serverError(err);
            } else {

                return res.send("success");
            }
        });
    },

    setSalesAndPromotionStatus: function (promo) {

        var currentDate = new Date();
        var dateFrom = new Date(promo.dateFrom);

        if (currentDate === dateFrom) {
            return config.SALES_AND_PROMOTIONS_STATUS.ACTIVE;
        }
        if (currentDate < dateFrom) {
            return config.SALES_AND_PROMOTIONS_STATUS.SCHEDULED;
        }
    },

    /**
     * Change sales and promotion status according promotion starting and ending dates
     * @param salesAndPromotion 
     */
    chageSalesAndPromotionsStatus: function (salesAndPromotion) {

        var thisCtrl = this;
        // Schedule job for promotion staring date
        thisCtrl.scheduleSalesAndPromotionsJob(salesAndPromotion.id, config.SALES_AND_PROMOTIONS_STATUS.ACTIVE, salesAndPromotion.dateFrom);
        // Schedule job for promotion ending date
        thisCtrl.scheduleSalesAndPromotionsJob(salesAndPromotion.id, config.SALES_AND_PROMOTIONS_STATUS.EXPIRED, salesAndPromotion.dateTo);
    },

    /**
     * Schedule a job to update sales and promotion status
     * @param id :: id of the SalesAndPromotion
     * @param status :: status of the SalesAndPromotion
     * @param date :: date to be scheduled
     */
    scheduleSalesAndPromotionsJob: function (id, status, date) {

        var searchQuery = { id: id };
        var updateQuery = { status: status };

        nodeSchedule.scheduleJob(date, function () {

            SalesAndPromotion.update(searchQuery, updateQuery).exec(function (err, promotion) {

                if (err) {
                    sails.log.error(`Error occourred updating promotion with id ${promotion.id} using node schedule!`);
                }
                //Notify connected socket clients about model update
                SalesAndPromotion.publishUpdate(promotion[0].id, promotion[0]);
            });;
        });
    },
    /**
     * Responsible to subscribe real time model events of 
     * SalesAndPromotion to connected socket client
     **/
    subscribe: function (req, res) {

        if (!req.isSocket) {

            sails.log.error('Not a socket request' + ' SailsAndPromotionController => subscribe');
            return res.badRequest({ status: 'NOT_SOCKET_REQUEST' });
        }
        SalesAndPromotion.find().exec(function (err, salesAndPromotion) {

            if (err) {

                return res.serverError({ status: 'SERVER_ERROR' });
            }
            SalesAndPromotion.subscribe(req, _.pluck(salesAndPromotion, 'id'));

            return res.ok({ status: 'SUBSCRIBED' });
        });
    }
};