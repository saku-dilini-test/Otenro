/**
 * Created by prasanna on 12/23/16.
 */
/**
 * SalesAndPromotionController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var config = require('../../../services/config');
module.exports = {

    saveSalesAndPromotion : function(req,res){
        var salesAndPromotionData   = req.body;
        var thisController = this;
    
        salesAndPromotionData.status = thisController.setSalesAndPromotionStatus(salesAndPromotionData);

        if(salesAndPromotionData.id){

            var searchQuery = {
                id : salesAndPromotionData.id,
            };

            SalesAndPromotion.update(searchQuery,salesAndPromotionData).exec(function(err,updateResult) {
                if (err) res.send(err);
                else {

                        sails.log.info('Successfully Update Sales And Promotion');
                        res.send(200, updateResult);
                }
            });
        }else{
                // if not update
                    // create new Sales And  Promotion Collection
                    SalesAndPromotion.create(salesAndPromotionData).exec(function (err, createResult) {
                        if (err) res.send(err);
                        else {
                            sails.log.info('Successfully Create Sales And Promotion');
                            res.send(200, createResult);
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
            if (err) res.send(err);
            res.send(salesAndPromotion);
        });
    },

    deleteSalesAndPromotions: function(req, res){
        var id = req.body.id;

        SalesAndPromotion.destroy({id:id}).exec(function(err, data){
            if(err) res.send(err);

            res.send("success");
        })

    },

    setSalesAndPromotionStatus: function (promo) {

        var currentDate = new Date();
        var dateFrom = new Date(promo.dateFrom);
        var dateTo = new Date(promo.dateTo);

        if (currentDate >= dateFrom && currentDate <= dateTo) {
            return config.SALES_AND_PROMOTIONS_STATUS.ACTIVE;
        }
        if (currentDate < dateFrom) {
            return config.SALES_AND_PROMOTIONS_STATUS.SCHEDULED;
        }
        if (currentDate > dateTo) {
            return config.SALES_AND_PROMOTIONS_STATUS.EXPIRED;
        }
    }
};