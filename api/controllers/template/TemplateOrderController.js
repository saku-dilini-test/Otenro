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

    data.forEach(function(details){
        ApplicationInventory.find({id:details.id}).exec(function(err, app) {
                        if (err) return done(err);
                        var quantity = {
                            quantity:app[0].quantity - details.qty
                        }
                        ApplicationInventory.update({id:details.id},quantity).exec(function(err,r){
                            if (err) res.send(err);
                            obj.push(r);

                        });
                    });
    })
        res.send(obj);
    }

};

