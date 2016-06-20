/**
 * InventoryController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs-extra'),
    config = require('../../../services/config');

module.exports = {


    getInventoryList:function(req, res) {


            var inventory=[];
            var appId = req.param('appId');
            var searchApp = {
                appId: appId
            };

            ThirdNavigation.find(searchApp).exec(function(err, app) {
                if (err) return done(err);
                var setFunction=function(x,length, data ,obj){
                    if(x<length){
                        data[x].product=data[x];

                        ApplicationInventory.findOrCreate({id :data[x].id},data[x]).exec(function(e,update){
                            if(e){

                                console.log(e);
                                x++;
                                setFunction(x,length,data ,obj);
                            }
                            var query = {
                                productId: data[x].id
                            }
                            PriceAndVariants.find(query).exec(function(err,variants){
                                if(err){
                                    console.log(err);
                                }
                                if(variants != ""){
                                    update.variant = variants[0];
                                    obj.push(update);
                                    x++;
                                    setFunction(x,length,data ,obj);
                                }
                                else{
                                    obj.push(update);
                                    x++;
                                    setFunction(x,length,data ,obj);
                                }
                            })
                        });

                    }else{
                        return res.send(obj);
                    }
                };

                setFunction(0,app.length,app,inventory);
            });

    },

    updateInventory : function(req,res){
        var body=req.body;
        var lng=body.length;
        for(var i=0 ; i < lng ; i++){
            var inventory;
            if(body[i].variant == undefined){
                inventory = {
                   appId: body[i].appId,
                   id : body[i].id,
                   childId: body[i].childId,
                   name : body[i].name,
                   sale: body[i].sale,
                   sku: body[i].sku,
                   discount: body[i].discount,
                   product : body[i]
                }
            }
            else{
                 inventory={
                    appId: body[i].appId,
                    id : body[i].id,
                    childId: body[i].childId,
                    name : body[i].name,
                    price: body[i].variant.price,
                    quantity: body[i].variant.quantity,
                    sale: body[i].sale,
                    sku: body[i].sku,
                    discount: body[i].discount,
                    product : body[i]
                 };
                 var variant = {
                    price : inventory.price,
                    quantity : inventory.quantity,
                 }
            }
            ApplicationInventory.update({ id :inventory.id },inventory).exec(function(err,r){
                if (err) return done(err);
                PriceAndVariants.update({ productId : r[0].id}, variant).exec(function(err,variants){
                    if (err) return done(err);
                })

            });

        }

        res.send({message : 'ok'});
    },

    updateInventoryProducts : function(req,res){

        var body=req.body;
        console.log(body.cart);
        var lng=body.length;
        for(var i=0 ; i < lng ; i++){

            var inventory={
                id : body[i].id,
                name : body[i].name,
                price: body[i].price,
                quantity: body[i].quantity,
                sale: body[i].sale,
                sku: body[i].sku,
                discount: body[i].discount,
                product : body[i]
            };

            ApplicationInventory.update({ id :inventory.id },inventory).exec(function(err,r){
                if (err) return done(err);

            });

        }

        res.send({message : 'ok'});
    },
    deleteThirdNavigation : function(req,res){
            var appId = req.body.appId;
            var deleteQuery = {
                 id : req.body.id
            }
            var searchApp = {
                id : req.body.id
            };
            ThirdNavigation.find(searchApp).exec(function(err, app) {
                if(err) return done(err);
                var imageUrl = app[0].imageUrl;
                ThirdNavigation.destroy(deleteQuery).exec(function (err) {
                    if (err) return done(err);
                    var filePath = config.ME_SERVER + req.body.userId + '/templates/' + appId+ '/img/thirdNavi/'+ imageUrl;
                    fs.unlink(filePath, function (err) {
                        if (err) return done(err);
                        res.send(200,{message:'Deleted Article'});
                    });
                });

            });
        }
};