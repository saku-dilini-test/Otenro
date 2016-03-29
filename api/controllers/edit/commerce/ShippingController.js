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
        var appId = req.param('appId');
        var saveData = {
            appId: appId,
            shippingOption:'FlatRate',
            feePerItem: req.param('feePerItem'),
            optionName: req.param('optionName'),
            preOrderFee: req.param('preOrderFee')
        };

        console.log(saveData);
        ShippingDetails.create(saveData).exec(function(err, appProduct) {
            if (err) res.send(err);
            res.send({
                appId: appProduct,
                message: "New Navigation is created!!"
            });
        });
    }

};