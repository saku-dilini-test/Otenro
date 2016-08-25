/**
 * MainNavigationController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs-extra'),
    config = require('../../../services/config');
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
    addThirdNavigation : function(req,res){
        ThirdNavigation.create(req.body.product).exec(function(error,thirdNav){
            if(error)sails.log.error(new Error("Error while creating a new Third Navigation :"+ error));
            res.json(thirdNav);
        });
        //var dePath = config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/thirdNavi/';
        //req.file('file').upload({
        //    dirname: require('path').resolve(dePath)
        //}, function (err, uploadedFiles) {
        //    if (err) return res.send(500, err);
        //
        //    var newFileName=Date.now()+'.png';
        //    fs.rename(uploadedFiles[0].fd, dePath+'/'+newFileName, function (err) {
        //        if (err) return res.send(err);
        //    });
        //
        //
        //    var thirdN =req.body;
        //    //console.log(thirdN);
        //    thirdN.imageUrl = newFileName;
        //    if(typeof thirdN.id != 'undefined'){
        //    var query = {
        //        productId: thirdN.id,
        //        appId: thirdN.appId,
        //        childId: thirdN.childId,
        //        name: thirdN.name,
        //        variants:thirdN.variants
        //    }
        //        ThirdNavigation.update({id:thirdN.productId},thirdN).exec(function(err, appProduct) {
        //            if (err) res.send(err);
        //            res.send({
        //                appId: appProduct[0],
        //                message: "New Navigation is created!!"
        //            });
        //        });
        //    }
        //    else{
        //        ThirdNavigation.create(thirdN).exec(function(err, appProduct) {
        //        if (err) res.send(err);
        //        res.send({
        //            appId: appProduct,
        //            message: "New Navigation is created!!"
        //        });
        //        });
        //    }
        //});
    },


    addProductImages: function (req,res) {

        var  finelImages = [];
        var  tmpImage = req.body.productImages;
        var  product =  req.body.product;
             product.tempImageArray = [];

        for (var i=0; i<tmpImage.length; i++) {

            var imgeFileName = i+new Date()+".png"

            var data = tmpImage[i].replace(/^data:image\/\w+;base64,/, "");
            var buf = new Buffer(data, 'base64');

            fs.writeFile(config.ME_SERVER + req.userId + '/templates/' +
                req.body.product.appId +'/img/thirdNavi/'+imgeFileName, buf, function(err) {
                if(err) {
                    if (err) res.send(err);
                }
            });
            product.tempImageArray.push({img:imgeFileName});
            finelImages = null;
       }

        ThirdNavigation.create(product).exec(function(error,thirdNav){
            if(error)sails.log.error(new Error("Error while creating a new Third Navigation :"+ error));

            console.log("&*&*&*&*&*&")
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
        for(var i = 0; inventoryList.length; i++ ){
            var product = inventoryList[i]
            var query = {'id': product.id};
            ThirdNavigation.update(query,{"variants":product.variants}).exec(function(err,updatedProduct){
                if(err) sails.log.error(new Error("Error while Updating Inventory of ID : "+ product.id));
                sails.log.debug("Successfully updated Product ID :" + JSON.stringify(updatedProduct));
            });
        }
        res.ok({'status':"Success"});
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