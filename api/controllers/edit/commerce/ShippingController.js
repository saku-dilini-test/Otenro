/**
 * Created by madhuranga on 3/28/16.
 */

/**
 * OrderController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    insertFlatRateData : function(req,res){
        var saveData = req.body;
        ShippingDetails.create(saveData).exec(function(err, result) {
            if (err) return res.send(err);
            return res.send(200,{message:'Create Shipping Collection'});
        });
    },

    /**
     * return Shipping Details collections for given app Id
     * @param req
     * @param res
     */
    getShippingInfo : function(req,res){
        var appId = req.param('appId');
        var searchQuery = {
            appId: appId
        };
        ShippingDetails.find(searchQuery).exec(function(err, result) {
            if (err) return res.send(err);
            return res.send(result);
        });
    },


    /**
     * delete Shipping Details collections for given Shipping Details Id
     * @param req
     * @param res
     */
    deleteShippingInfo : function(req,res){
        var deleteQuery = {
            id : req.body.id
        }
        ShippingDetails.destroy(deleteQuery).exec(function(err, result) {
            if (err) return res.send(err);
            return res.send(200,{message:'Deleted Shipping Collection'});
        });
    }

};