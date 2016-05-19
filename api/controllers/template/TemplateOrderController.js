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
        var data = req.body;
        var searchApp = {
            id : data.id
        }
        ApplicationInventory.find(searchApp).exec(function(err, app) {
            if (err) return done(err);
            var quantity = {
            id: searchApp.id,
            quantity:app[0].quantity - data.quantity

            }
        ApplicationInventory.update({id:searchApp.id},quantity).exec(function(err,r){
            if (err) res.send(err);
            res.send(r);

        });

        });
    }

};

