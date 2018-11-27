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

        var imagePath   = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId + '/img/'+ 'default.jpg';
        var fileName    = Date.now()+ '.jpg';
        var dePath      = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/thirdNavi/';

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
     * add or update product
     * @param req
     * @param res
     */
    addOrUpdateProduct: function (req,res) {

        var defImg = req.body.defImg;
        var randomstring = require("randomstring");
        console.log(req.body.bannerImage)
        var  finelImages = [];
        var  tmpImage = req.body.productImages;
        var  bannerImage = req.body.bannerImage;
        var  product =  req.body.product;
        var isNew = req.body.isNew;
            product.defaultImage = defImg;
        if ( typeof product.tempImageArray == 'undefined'){
             product.tempImageArray=[];
        }

       var fs2 = require('fs');
       var dir = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.product.appId + '/assets/images/banner';

       if (!fs2.existsSync(dir)){
           fs2.mkdirSync(dir);
       }


        for (var i=0; i<tmpImage.length; i++) {

            if (!tmpImage[i].img.match("http")){
                var imgeFileName = randomstring.generate()+".png";
                var data = tmpImage[i].img.replace(/^data:image\/\w+;base64,/, "");
                var buf = new Buffer(data, 'base64');
                // product images copy to app file server
                if(isNew == 'true' || isNew == true){
                    fs.writeFile(config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' +
                        req.body.product.appId + '/assets/images/thirdNavi/' + imgeFileName, buf, function (err) {
                        if (err) {
                            return res.send(err);
                        }
                    });
                }else {
                    fs.writeFile(config.APP_FILE_SERVER + req.userId + '/templates/' +
                        req.body.product.appId + '/img/thirdNavi/' + imgeFileName, buf, function (err) {
                        if (err) {
                            return res.send(err);
                        }
                    });
                }
                 var videoUrl;
                 var sku;

                                if(tmpImage[i].videoUrl){
                                    videoUrl = tmpImage[i].videoUrl
                                }else{
                                    videoUrl = null;
                                }

                                if(tmpImage[i].sku){
                                    sku = tmpImage[i].sku
                                }else{
                                    sku = null;
                                }
                product.tempImageArray.push({img:imgeFileName,videoUrl:videoUrl,sku:sku});
                product.imageUrl = imgeFileName;
                finelImages = null;
            }else{

                if(tmpImage[i].sku){
                    product.tempImageArray[i].sku = tmpImage[i].sku;
                }

            }
       }

       if(bannerImage){
           if (!bannerImage.match("http")){

               var imgeFileName = randomstring.generate()+".png";
               var data = bannerImage.replace(/^data:image\/\w+;base64,/, "");
               var buf = new Buffer(data, 'base64');
               const rimraf = require('rimraf');

                if(fs2.existsSync(config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.product.appId + '/assets/images/banner/' + req.body.oldBannerImg    )){
                    fs.unlink(config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.product.appId + '/assets/images/banner/' + req.body.oldBannerImg, function(err) {
                      if (err) throw err;
                      console.log(config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.product.appId + 'assets/images/banner/' + req.body.oldBannerImg + "deleted");
                    });
                }

               // product images copy to app file server
                   fs.writeFile(config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' +
                       req.body.product.appId + '/assets/images/banner/' + imgeFileName, buf, function (err) {
                       if (err) {
                           console.log(err);
                       }
                   });

    //           product.tempImageArray.push({img:imgeFileName,videoUrl:videoUrl,sku:sku});
               product.bannerImage = imgeFileName;
               finelImages = null;
           }
       }else{
           product.bannerImage = req.body.bannerImage;
       }




            product.variants.forEach(function(img, i){
                product.variants[i].imageUrl = null;
            });


           for(var i = 0;i < product.selectedSku.length;i++){
                for(var k = 0;k < product.variants.length;k++){
                    if(product.variants[k].sku == product.selectedSku[i].sku){
                        product.variants[k].imageUrl = product.tempImageArray[product.selectedSku[i].index].img;
                    }
                }
           }

        var searchQuery = {
            id : req.body.product.id
        };
        var skuSearchQuery = {
            productId : req.body.product.id
        };
        var sku =[];
        if(typeof req.body.product.id != 'undefined'){
            delete product["id"];
            console.log("consoel.log at 175 %_%")
            console.log(product)
            ThirdNavigation.update(searchQuery,product,function(err,main) {
                if (err) {
                    return res.send(err);
                }
                var data = {
                    userId: req.userId,
                    appId: product.appId,
                    productId:skuSearchQuery.productId
                }
                for(var i=0; i<product.variants.length; i++){
                    sku.push(product.variants[i].sku);
                }
                data.sku = sku;
                Sku.update(skuSearchQuery,data,function(err,skuData){
                    if (err){
                        return res.send(err);
                    }else{
                        return res.send(200, {message: 'Shipping Collection successfully updated'});
                    }
                });

            });
        }else{
            ThirdNavigation.create(product).exec(function (err, result) {
                if (err) {
                    return res.send(err);
                }
                var data = {
                    userId: req.userId,
                    appId: product.appId,
                    productId:result.id
                }
                for(var i=0; i<product.variants.length; i++){
                    sku.push(product.variants[i].sku);
                }
                data.sku = sku;
                 Sku.create(data,function(err,skuData){
                     if (err) {
                         return res.send(err);
                     }else{
                         return res.send(200,data);
                     }
                 });
            });
        }
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
        var skuQuery = {productId:item.id};
        var thirdNaviPath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/';
        var thirdNaviPath2 = '/assets/images/thirdNavi/';


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
                Sku.findOne(skuQuery).exec(function(err,skuOutput){
                    if(err) res.send(err);
                    if(skuOutput){
                        var skuArray = skuOutput.sku;
                        for(var i=0; i<skuArray.length; i++){
                            if(skuArray[i] == item.sku){
                                var index = skuArray.indexOf(skuArray[i]);
                                skuArray.splice(index, 1);
                            }
                        }
                    }

                    //If Variants has one or more elements
                    if(0 < deleteVariants.length){
                        ThirdNavigation.update(query,product).exec(function(err,item){
                            if(err) sails.log.error(new Error("Error while deleting a Variant from a product : "+
                                JSON.stringify(product)));
                            sails.log.info("Product update Successfully!!");
                            Sku.update(skuQuery,skuOutput).exec(function(err,result){
                                if(err) sails.log.error(new Error("Error while deleting a Variant from sku array : "+
                                    JSON.stringify(skuOutput)));
                                    res.ok({'status':"Success"});
                            })
                        });
                    }else{
                        //Product is deleted if there is no variants in the Variants array
                        ThirdNavigation.destroy(query).exec(function(err,deletedItem){
                            if(err) sails.log.error(new Error("Error while deleting the Product by ID : "+ item.id));
                            sails.log.info("Successfully Delete the Product"+ JSON.stringify(deletedItem));
                            Sku.destroy(skuQuery).exec(function(err,deletedSku){
                               if(err) sails.log.error(new Error("Error while deleting the Sku array by productId : "+ item.id));
                               res.ok({'status':"Success"});
                            })
                        })
                    }
                });
            });
        }else{
            //When User delete the whole product
            ThirdNavigation.destroy(query).exec(function(err,deletedItem){

                if(err) sails.log.error(new Error("Error while deleting the Product by ID : "+ item.id));

                deletedItem.forEach(function(data){
                    fs.unlink(thirdNaviPath + data.appId + thirdNaviPath2 + data.imageUrl, function (err) {
                        if (err) return console.error(err);
                    });
                });

                sails.log.info("Successfully Delete the Product"+ JSON.stringify(deletedItem));
                Sku.destroy(skuQuery).exec(function(err,deletedSku){
                    if(err) sails.log.error(new Error("Error while deleting the Sku array by productId : "+ item.id));
                    res.ok({'status':"Success"});
                })
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
        var dePath = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/thirdNavi/';
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

        var filePath = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/thirdNavi/'+ req.body.imageUrl;
        var desPath  = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/thirdNavi/';

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
    },
    /*
        check uniqueness of the sku
    */
    checkUniqueSku: function(req,res){
    console.log(req.body);
        var searchApp={
            appId: req.body.appId
        }
        Sku.find(searchApp, function(err, app){
            if (err) return res.send(err);
            for(var i=0; i<app.length; i++){
                for(var j=0; j<app[i].sku.length; j++){
                    if(app[i].sku[j].toUpperCase() == req.body.sku.toUpperCase()){
                        return res.send('true');
                        break;
                    }
                }
            }
            return res.send('false');

        })

    },

        getProvinces : function(req,res){
            var path = require('path');
              var path2 = path.resolve();

              fs.readFile(path2 + "/api/services/provinces.json", 'utf8', function (err, data) {
                  if (err){
                    console.log(err)
                  }
                     // error handling
                 res.send(data);
              });

        },

        getMainProdTypes : function(req,res){
            var path = require('path');
              var path2 = path.resolve();

              fs.readFile(path2 + "/api/services/productType.json", 'utf8', function (err, data) {
                  if (err){
                    console.log(err)
                  }
                     // error handling
                 res.json(data);
              });

        },

        getShippingRules : function(req,res){
            var path = require('path');
              var path2 = path.resolve();

              fs.readFile(path2 + "/api/services/smartFitShippingRules.json", 'utf8', function (err, data) {
                  if (err){
                    console.log(err)
                  }
                     // error handling
                 res.send(data);
              });

        }


};