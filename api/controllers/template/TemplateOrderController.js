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
    /*Manually updating the relevant quantity in the ThirdNavigation*/
        var obj = [];
        var data = req.body[0];
        ThirdNavigation.find({id: data.id}).exec(function(err, app){
            if(err) res.send(err);
            for(var i =0; i<app[0].variants.length; i++){
                if(app[0].variants[i].sku == data.sku){
                    app[0].variants[i].quantity = app[0].variants[i].quantity - data.qty;
                    ThirdNavigation.update({id:data.id},app[0]).exec(function(err,thirdNavi){
                        if(err) res.send(err);
                        obj.push(thirdNavi)
                    })
                }

            }
            res.send(obj);

        })
    }

};

