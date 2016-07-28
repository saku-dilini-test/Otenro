/**
 * TemplateOrderController
 *
 * @description :: Server-side logic for managing templateorders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


    saveOrder : function(req,res) {

        var data = req.body;
        data['paymentStatus'] = 'Pending';
        data['fulfillmentStatus'] = 'Pending';

        ApplicationOrder.create(data).exec(function (err, order) {
            if (err) res.send(err);
            res.send('ok');
        });
    },
    updateInventory : function(req,res){

    var obj = [];
        var data = req.body;
        console.log(data);
    data.forEach(function(details){
        PriceAndVariants.find({id:details.id}).exec(function(err, app) {
                        if (err) return done(err);
                        console.log(app);
                        var quantity = {
                            quantity:app[0].quantity - details.qty
                        }
                        PriceAndVariants.update({id:details.id},quantity).exec(function(err,r){
                            if (err) return done(err);
                            ApplicationInventory.update({id:details.id},quantity).exec(function(err,inventory){
                                if (err) return done(err);
                                obj.push(inventory);
                            })
                        });
                    });
    })
        res.send(obj);
    }

};

