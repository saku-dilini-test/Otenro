/**
 * Created by madhuranga on 3/28/16.
 */

/**
 * OrderController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * update Shipping Details collections for given Shipping Details Id
     * If not create new shipping collections
     * @param req
     * @param res
     */
    updateShippingInfo : function(req,res){
        var searchQuery = {
            id : req.body.id
        };
        var updateData = req.body;
        if(typeof req.body.id != 'undefined'){
            ShippingDetails.update(searchQuery,updateData,function(err,main) {
                if (err) return res.send(err);
                return res.send(200, {message: 'Update Shipping Collection'});
            });
        }else{
            ShippingDetails.create(updateData).exec(function (err, result) {
                if (err) return res.send(err);
                return res.send(200, {message: 'Create Shipping Collection'});
            });
        }
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


    getShippingPickupInfo  : function(req,res){
        var appId = req.param('appId');
        var searchQuery = {
            appId: appId,
            shippingOption : 'Pick up'
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
        };
        ShippingDetails.destroy(deleteQuery).exec(function(err, result) {
            if (err) return res.send(err);
            return res.send(200,{message:'Deleted Shipping Collection'});
        });
    }

};