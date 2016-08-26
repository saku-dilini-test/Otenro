/**
 * MainNavigationController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs-extra'),
    config = require('../../../services/config');
var path = require('path');
module.exports = {

    getThirdNavigation : function(req,res){

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };

        ThirdNavigation.find(searchApp, function(err, app) {
            if (err) return done(err);
            res.send(app);
        });

    },

    addNewNavi : function(req,res){

        var imagePath = config.ME_SERVER + req.userId + '/templates/' + req.body.appId + '/img/'+ 'default.jpg';
        var fileName = Date.now()+ '.jpg';
        var dePath=config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/thirdNavi/';

        fs.readFile(imagePath, function (err, data) {
            if (err) throw err;
            fs.writeFile(dePath+fileName, data, function (err) {
                if (err) throw err;

                var subChild = req.body;
                subChild.imageUrl=fileName;
                ThirdNavigation.create(subChild).exec(function(err, menu) {
                    res.json(menu);
                });

            });
        });
    },

    /**
     * Create new ThirNavigation(Product) Object
     * @param req
     * @param res
     */
    addProduct: function (req,res) {

        var randomstring = require("randomstring");

        var  finelImages = [];
        var  tmpImage = req.body.productImages;
        var  product =  req.body.product;

        if ( typeof product.tempImageArray == 'undefined'){
             product.tempImageArray=[];
        }


        for (var i=0; i<tmpImage.length; i++) {
            console.log("tmpImage[i] " + i + " " + tmpImage[i]);

            if (!tmpImage[i].match("8080")){
                var imgeFileName = randomstring.generate()+".png";

                var data = tmpImage[i].replace(/^data:image\/\w+;base64,/, "");
                var buf = new Buffer(data, 'base64');
                fs.writeFile(config.ME_SERVER + req.userId + '/templates/' +
                    req.body.product.appId +'/img/thirdNavi/'+imgeFileName, buf, function(err) {
                    if(err) {
                        if (err) res.send(err);
                    }
                });
                product.tempImageArray.push({img:imgeFileName});
                product.imageUrl = imgeFileName;
                finelImages = null;
            }
       }


        var searchQuery = {
            id : req.body.product.id
        };

        if(typeof req.body.product.id != 'undefined'){
            delete product["id"];
            ThirdNavigation.update(searchQuery,product,function(err,main) {
                if (err) return res.send(err);
                return res.send(200, {message: 'Update Shipping Collection'});
            });
        }else{
            ThirdNavigation.create(product).exec(function (err, result) {
                if (err) return res.send(err);
                return res.send(200, {message: 'Create Shipping Collection'});
            });
        }
    },

    //viewImages of the product
    viewProductImages : function(req,res){
        console.log("req.body.path+req.body.imageName " + req.body.path+req.body.imageName);
        res.sendfile(req.body.path+req.body.imageName);
        ThirdNavigation.create(product).exec(function(error,thirdNav){
            if(error)sails.log.error(new Error("Error while creating a new Third Navigation :"+ error));
            res.json(thirdNav);
        });
    },

    /**
     * Get ThridNaviagation(Product) Object by Id
     * @param req
     * @param res
     */
    getProductById : function (req,res) {
        var query = {'id': req.param('productId')};
        ThirdNavigation.findOne(query).exec(function(err,product){
            if(err) sails.log.error(new Error("Error while retrieving Product by ID : "+ req.param('productId')));
            res.send(product);
        })
    },

    /**
     * Update inventory
     * @param req
     * @param res
     */
    updateInventory: function(req,res){
        var inventoryList = req.body.inventoryList;
        for(var i = 0; i < inventoryList.length; i++ ){
            var product = inventoryList[i];
            var query = {'id': product.id};
            ThirdNavigation.update(query,{"variants":product.variants}).exec(function(err,updatedProduct){
                if(err) sails.log.error(new Error("Error while Updating Inventory of ID : "+ product.id));
                sails.log.debug("Successfully updated Product ID :" + JSON.stringify(updatedProduct));
            });
        }
        res.ok({'status':"Success"});
    },

    /**
     * Delete Product or variant.
     * @param req
     * @param res
     */
    deleteProductOrVariant: function(req,res){
        var item = req.body.item;
        var query = {'id':item.id};
        //Variant of a Product
        if(item.sku){
            ThirdNavigation.findOne(query).exec(function(err,product){
                if(err) sails.log.error(new Error("Error while retrieving Product by ID : "+ item.id));
                var deleteVariants = product.variants;

                for(var i=0; i < deleteVariants.length;i++){
                    //Check variants sku against the deleting item
                    if(deleteVariants[i].sku==item.sku){
                        var index = deleteVariants.indexOf(deleteVariants[i]);
                        deleteVariants.splice(index, 1);
                    }
                }
                //If Variants has one or more elements
                if(0 < deleteVariants.length){
                    ThirdNavigation.update(query,product).exec(function(err,item){
                        if(err) sails.log.error(new Error("Error while deleting a Variant from a product : "+
                            JSON.stringify(product)));
                        sails.log.info("Product update Successfully!!");
                        res.ok({'status':"Success"});
                    });
                }else{
                    //Product is deleted if there is no variants in the Variants array
                    ThirdNavigation.destroy(query).exec(function(err,deletedItem){
                        if(err) sails.log.error(new Error("Error while deleting the Product by ID : "+ item.id));
                        sails.log.info("Successfully Delete the Product"+ JSON.stringify(deletedItem));
                        res.ok({'status':"Success"});
                    })
                }
            });
        }else{
            //When User delete the whole product
            ThirdNavigation.destroy(query).exec(function(err,deletedItem){
                if(err) sails.log.error(new Error("Error while deleting the Product by ID : "+ item.id));
                sails.log.info("Successfully Delete the Product"+ JSON.stringify(deletedItem));
                res.ok({'status':"Success"});
            });
        }
    },

    /**
     * ThirdNavigation uploaded images are copy to img/thirdNavi folder
     * Return : image name
     * @param req
     * @param res
     */
    addThirdNaviImages : function(req,res){
        var dePath = config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/thirdNavi/';
        req.file('file').upload({
            dirname: require('path').resolve(dePath)
        }, function (err, uploadedFiles) {
            if (err) return res.send(500, err);

            var newFileName = Date.now()+'.png';
            fs.rename(uploadedFiles[0].fd, dePath+'/'+newFileName, function (err) {
                if (err) return res.send(err);
                res.send({fileName : newFileName});
            });
        });
    },
    updateThirdNaviImage : function(req,res){

        var filePath =config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/thirdNavi/'+ req.body.imageUrl;
        var desPath=config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/thirdNavi/';

        req.file('file').upload({
            dirname: require('path').resolve(desPath)
        },function (err, uploadedFiles) {
            if (err) return res.send(500, err);

            fs.unlink(filePath, function (err) {
                if (err) return console.error(err);
            });
            if (typeof req.body.imageUrl != "undefined") {
                fs.rename(uploadedFiles[0].fd, desPath + req.body.imageUrl, function (err) {
                    if (err) return res.send(err);
                    res.json({ok: true});
                });
            }else {
                res.json({ok: true});
            }
        });

    },

    updateThirdNavi :function(req,res){

        if(req.body.subChildList){
            var sChildList=req.body.subChildList;
            for (var i = 0; i < sChildList.length; i++) {
                ThirdNavigation.update({id :sChildList[i].id},sChildList[i]).exec(function(err) {
                    if (err) res.send(err);
                });
            }
            res.send('ok');

        }else{
            ThirdNavigation.update({id :req.body.id},req.body).exec(function(err) {
                if (err) res.send(err);
                res.send('ok');
            });
        }
    },

//    getVariants: function(req,res){
//    var appId = req.param('appId');
//    var childId = req.param('childId');
//            var searchApp = {
//                appId: appId,
//                childId: childId
//            };
//            console.log(searchApp);
//        PriceAndVariants.find(searchApp, function(err, app) {
//        if (err) return done(err);
//           res.send(app);
//        });
//    },

    updateVariants: function(req,res){
                var searchApp = {
                    appId: req.body.appId
                };
        PriceAndVariants.find(searchApp, function(err, app){

             if (err) {return done(err);}
             else if(app == ""){
                 PriceAndVariants.create(req.body).exec(function (err, thirdN) {
                     if (err) return err;
                 });
             }
             else{
             PriceAndVariants.update({childId: req.body.childId},req.body).exec(function(err){
                             if (err) res.send(err);
                             res.send('ok');
             });
            }

        })
    },
    
    addVariants : function (req,res){
        var dePath=config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/thirdNavi/';
           if (typeof req.body.quantity !== 'undefined'){
               var priceAndVariantsAttribute =req.body;
               PriceAndVariants.find({id: priceAndVariantsAttribute.id}).exec(function(err,found){
                    if(err) res.send(err);
                    var query = {
                        name: priceAndVariantsAttribute.name,
                        childId: priceAndVariantsAttribute.childId
                    };
                    if(found != ''){
                        PriceAndVariants.update({productId: priceAndVariantsAttribute.productId},query).exec(function(e,updt){
                            if(e) res.send(e);
                        })
                        PriceAndVariants.update({id: priceAndVariantsAttribute.id},priceAndVariantsAttribute).exec(function(err,variants){
                            if(err) res.send(err);
                            res.send(variants);
                        })
                    }
                    else{
                        PriceAndVariants.create(priceAndVariantsAttribute).exec(function(err, priceAndVariants) {
                            if (err){
                                res.send(err);
                            }else{
                                res.send(priceAndVariants);
                            }
                        });
                    }
               })

           }else {
               req.file('file').upload({
                   dirname: require('path').resolve(dePath)
               },function (err, uploadedFiles) {
                   if (err) return res.send(500, err);
                   var priceAndVariantsAttribute =req.body;
                       priceAndVariantsAttribute.fileUrl = uploadedFiles[0].fd.split("/").pop();
                       PriceAndVariants.create(priceAndVariantsAttribute).exec(function(err, priceAndVariants) {
                           if (err){
                               res.send(err);
                           }else{
                               res.send(priceAndVariants);
                           }
                       });
               });
           }
    },

    addToInventory: function(req,res){
    var inventoryData = req.body;
        console.log(inventoryData);
    ApplicationInventory.find({id: inventoryData.id}).exec(function(e,found){
        if(e) res.send(e);
        var query = {
            name: inventoryData.name,
            childId: inventoryData.childId,
        };
        if(found  != ''){

            ApplicationInventory.update({productId: inventoryData.productId},query).exec(function(e,updt){
                 if(e) res.send(e);
            });
            ApplicationInventory.update({id: inventoryData.id},inventoryData).exec(function(err,inventry){
                if(err) res.send(err);
                res.send(inventry[0]);
            });
        }
        else{
            ApplicationInventory.create(inventoryData).exec(function(err,invntry){
                if(err) console.log(err);
                res.send(invntry);
            })
        }
    })

    },

    getUpdates: function(req,res){
        var id = req.param('ObjectId');
        ThirdNavigation.find(id, function(err, app) {
           if (err) return done(err);
           res.send(app);
        });
    },
    getChild: function(req,res){
     var id = req.param("childId");
      SecondNavigation.find(id, function(err, app){
       if (err) return done(err);
         res.send(app);
     })
    }


};