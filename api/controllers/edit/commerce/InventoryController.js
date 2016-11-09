/**
 * InventoryController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs-extra'),
    config = require('../../../services/config');

module.exports = {

    /**
     * Retrieve Inventory for give appId
     * @param req
     * @param res
     */
    getInventoryList:function(req, res) {
        var appId = req.param('appId');

        ThirdNavigation.find({select: ['name','selection','variants'],where:{appId:appId}}).exec(function(err,inventoryList){
            if(err)sails.log.debug("Error has occurred while retrieving Inventory for the AppID :"+ appId);
           res.send(inventoryList);
        });
    },

    getInventoryListByProductId : function (req,res) {
        var pId = req.param('pId');
        ApplicationInventory.find({productId: pId}).exec(function(e,invntry){
            if(e) console.log(e);
            res.send(invntry);
        })
    },

    createInventoryLis : function (req,res) {


        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };

        ThirdNavigation.find(searchApp).exec(function(err, app) {
            if (err) return done(err);

            app.forEach(function(appData){
                var query = {
                    productId: appData.id,
                    appId: appData.appId,
                    childId: appData.childId,
                    name: appData.name,
                    price: appData.price,
                    quantity: appData.quantity
                }
                var id = appData.id;
                appData.product = appData;
                appData.productId = appData.id;
                var appInvn = appData;
                ApplicationInventory.find({productId: appData.id}).exec(function(e,fff){
                    if(e) console.log(e);
                    if(fff == ''){
                        ApplicationInventory.create(appInvn).exec(function(e,aaa){
                            if(e) console.log(e);
                            query.id = aaa.id;
                            PriceAndVariants.create(query).exec(function(er,bbb){
                                if(er) console.log(er);
                            })
                        })
                    }
                })
            })
            res.send("ok");
        });
    },

    updateInventory : function(req,res){
        var body=req.body;
        var lng=body.length;
        for(var i=0 ; i < lng ; i++){
            var inventory;
//            if(body[i].variant == undefined){
//                inventory = {
//                   appId: body[i].appId,
//                   id : body[i].id,
//                   childId: body[i].childId,
//                   name : body[i].name,
//                   sale: body[i].sale,
//                   sku: body[i].sku,
//                   discount: body[i].discount,
//                   product : body[i]
//                }
//            }
//            else{
                 inventory={
                    appId: body[i].appId,
                    id : body[i].id,
                    childId: body[i].childId,
                    name : body[i].name,
                    price: body[i].price,
                    quantity: body[i].quantity,
                    sale: body[i].sale,
                    sku: body[i].sku,
                    discount: body[i].discount,
                    product : body[i]
                 };
                 var variant = {
                    price : inventory.price,
                    quantity : inventory.quantity,
                 }
//            }
            ApplicationInventory.update({ id :inventory.id },inventory).exec(function(err,r){
                if (err) return send(err);
                PriceAndVariants.update({ productId : r[0].id}, variant).exec(function(err,variants){
                    if (err) return send(err);
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
                 id : req.body.variant.productId
            }
            var searchApp = {
                id : req.body.variant.productId
            };
            ApplicationInventory.find({productId: req.body.variant.productId}).exec(function(err, appInventory) {
                if(err) return done(err);
                if(appInventory.length == 1){
                    ApplicationInventory.find({id: req.body.id}).exec(function(err, inventory){
                        if(err) return done(err);
                        ApplicationInventory.destroy({id: req.body.id}).exec(function(err, dlte){
                            if(err) return done(err);

                        PriceAndVariants.find({id: req.body.id}).exec(function(err, variants){
                            if(err) return done(err);
                          PriceAndVariants.destroy({id: req.body.id}).exec(function(err, dlteV){
                            if(err) return done(err);

                            ThirdNavigation.find(searchApp).exec(function(err, app){
                                if(err) return done(err);
                                var imageUrl = app[0].imageUrl;
                            ThirdNavigation.destroy(deleteQuery).exec(function (err) {
                                if (err) return done(err);
                                var filePath = config.ME_SERVER + req.body.userId + '/templates/' + appId+ '/img/thirdNavi/'+ imageUrl;
                                fs.unlink(filePath, function (err) {
                                    if (err) return done(err);
                                    res.send(200,{message:'Article successfully Deleted'});
                                });
                            });
                            })
                          })
                    })
                    })

                    });

                }
                else{
                    ApplicationInventory.find({id: req.body.id}).exec(function(err, inventory){
                        if(err) return done(err);
                        ApplicationInventory.destroy({id: req.body.id}).exec(function(err, dlte){
                            if(err) return done(err);

                    PriceAndVariants.find({id: req.body.id}).exec(function(err, variants){
                        if(err) return done(err);
                          PriceAndVariants.destroy({id: req.body.id}).exec(function(err, dlteV){
                            if(err) return done(err);
                            res.send(200,{message:'Article successfully Deleted'})
                          })
                    })
                    })

                    });

                }
            })
        }
};