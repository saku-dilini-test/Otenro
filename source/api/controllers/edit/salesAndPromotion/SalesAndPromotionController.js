/**
 * Created by prasanna on 12/23/16.
 */
/**
 * SalesAndPromotionController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    saveSalesAndPromotion : function(req,res){
        var salesAndPromotionData   = req.body;
        sails.log.info("salesAndPromotionData.appId "+salesAndPromotionData.appId);

        var searchQuery = {
            appId : salesAndPromotionData.appId,
            salesAndPromotionType : salesAndPromotionData.salesAndPromotionType
        };
        // update Sales And  Promotion for given appId and salesAndPromotionType
        SalesAndPromotion.update(searchQuery,salesAndPromotionData).exec(function(err,updateResult) {
            if (err) res.send(err);
            else {
                // if not update
                if (updateResult.length == 0) {
                    // create new Sales And  Promotion Collection
                    SalesAndPromotion.create(salesAndPromotionData).exec(function (err, createResult) {
                        if (err) res.send(err);
                        else {
                            sails.log.info('Successfully Create Sales And Promotion');
                            res.send(200, createResult);
                        }
                    });
                }
                else {
                    sails.log.info('Successfully Update Sales And Promotion');
                    res.send(200, updateResult);
                }
            }
        });
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
    }
};