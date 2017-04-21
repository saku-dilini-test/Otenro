/**
 * Created by kalani on 03/31/17.
 */
/**
 * EcommerceAppMobileApisController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */



module.exports = {

    /**
     * return all third navigation for given app Id & second navigation Id
     *
     * @param req
     * @param res
     */
    getThirdBySecondId : function(req,res){

        sails.log.debug("getThirdBySecondId loading..");
        var appId = req.param('appId');
        var childId = req.param('childId');
        var searchApp = {
            appId: appId,
            childId : childId,
            published : 'YES'
        };
        var thirdNavi = [];
        ThirdNavigation.find().where(searchApp).exec(function(err, app) {
            if (err) return done(err);
            return res.send(app);
        });


    },
     /**
         * Get existing currency for the mobile app.
         *
         * @param req
         * @param res
         */
        getCurrency : function(req,res){
            sails.log.debug("getCurrency loading..");
            var appId = req.param('appId');
            var searchApp = {
                id: appId
            };
            Application.findOne(searchApp).exec(function(err, app) {
                if (err) return done(err);
                 var currency = app.appSettings.appCurrency;
                 res.send(currency)
         });

    },

    getListOfSalesAndPromotions : function(req,res){
    sails.log.debug("getListOfSalesAndPromotions loading..");
        var appId = req.param('appId');
        var searchQuery = {
            appId: appId
        };
        SalesAndPromotion.find(searchQuery).exec(function (err, salesAndPromotion) {
            if (err) res.send(err);
            res.send(salesAndPromotion);
        });
    },

     /**
      * return Tax Details collections for given app Id
      * @param req
      * @param res
      */
     getTaxInfo : function(req,res){
      sails.log.debug("getTaxInfo loading..");
         var appId = req.param('appId');
         var searchQuery = {
             appId: appId
         };
        ApplicationTax.find(searchQuery).exec(function(err, result) {
             if (err) return res.send(err);
             return res.send(result);
         });
     },

    getAllCountry : function(req,res){
    sails.log.debug("getAllCountry loading..");
        Country.find().exec(function(err, result) {
            if (err) return res.send(err);
            return res.send(result);
        });

    },

    /**
     * return Shipping Details collections for given app Id
     * @param req
     * @param res
     */
    getShippingInfo : function(req,res){
    sails.log.debug("getShippingInfo loading..");
        var appId = req.param('appId');
        var searchQuery = {
            appId: appId
        };
        ShippingDetails.find(searchQuery).exec(function(err, result) {
            if (err) return res.send(err);
            return res.send(result);
        });
    },
    /**
     * return IPG Details collections for given app Id
     * @param req
     * @param res
     */
    getIPGInfo : function(req,res){
     sails.log.debug("getIPGInfo loading..");
        var appId = req.param('appId');
        sails.log.info(appId);
        var searchQuery = {
            appId: appId
        };
        IPGDetails.findOne(searchQuery).exec(function(err, result) {
            sails.log.info(result);
            if (err) return res.send(err);
            return res.send(result);
        });
    },


    saveOrder : function(req,res) {

        var data = req.body;
        data['paymentStatus'] = 'Pending';
        data['fulfillmentStatus'] = 'Pending';

        sails.log.info(data);
        if(data.pickupId == null){
            ApplicationOrder.create(data).exec(function (err, order) {
                sails.log.info(order);

                if (err) res.send(err);
                var searchApp = {
                    id: order.appId
                };
                sails.log.info(searchApp);
                Application.findOne(searchApp).exec(function (err, app) {
                    order['userId'] = app.userId;
                sentMails.sendOrderEmail(order,function (err,msg) {
                    sails.log.info(err);
                    if (err) {
                        return  res.send(500);
                    }
                });
                });

                res.send('ok');
            });
        }
        else{
           ShippingDetails.find({id:data.pickupId,appId:data.appId}).exec(function(err,pickUp){
            if(err) res.send(err);
            data.pickUp = pickUp[0];
            data.option = 'pickUp';
            ApplicationOrder.create(data).exec(function (err, order) {
                if (err) res.send(err);
                var searchApp = {
                    id: order.appId
                };
                sails.log.info(searchApp);
                Application.findOne(searchApp).exec(function (err, app) {
                    order['userId'] = app.userId;
                    sentMails.sendOrderEmail(order,function (err,msg) {
                        sails.log.info(err);
                        if (err) {
                            return  res.send(500);
                        }
                    });
                });
                res.send('ok');
            });
           });
        }
        sails.log.debug("saveOrder post..");
    },

    updateInventory : function(req,res){
     sails.log.debug("updateInventory post..");
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

    },

    getSpecificChild :function(req,res){

        sails.log.debug("getSpecificChild Loading..");
        var appId = req.param('appId');
        var mainId=req.param('mainId');
        /**
         *  If main Id undefined, return all second navigation
         */
        if(typeof mainId == 'undefined'){
            var searchApp = {
                appId: appId
            };
            SecondNavigation.find(searchApp).exec(function(err, app) {
                if (err) return done(err);
                res.send(app);
            });
        }else {
            var searchApp = {
                appId: appId,
                mainId: mainId
            };
            SecondNavigation.find(searchApp).exec(function (err, app) {
                if (err) return done(err);
                res.send(app);
            });
        }
    },

    iconAllowance : function(req,res){
    sails.log.debug("iconAllowance");
        ApplicationStoreSettings.findOne({appId: req.param('appId')}).exec(function(err,data){
            if(err) res.send(err);
                res.send(data);
        })
    },

    /**
     * return Shipping Details collections for given app Id
     * @param req
     * @param res
     */
    getShippingInfoByCountry : function(req,res){
     sails.log.debug("getShippingInfoByCountry");
        var appId = req.body.appId;
        var country = req.body.country;
        var searchQuery = {
            appId:appId,
            countryRestriction:{
                $elemMatch:{
                    countryName:country
                }
            }
        };
        ShippingDetails.find(searchQuery).exec(function(err, result) {
            if (err) return res.send(err);
            return res.send(result);
        });
    },

    register: function(req, res) {
    sails.log.debug("register post");
        sails.log.info(req.body);
        /*AppUser.create(req.body).exec(function(err, user) {
            if (err) {
                return res.negotiate(err);
            }
            if (user) {
                JWT.encode({
                    secret: config.CLIENT_SECRET,
                    payload: {
                        id :  user.id,
                        email:  user.email
                    },
                    algorithm: 'HS256'
                }).exec({
                    error: function (err){
                        return err;
                    },
                    success: function (result){
                        sails.log.info(result);
                        res.status(200).json({user : { email : user.email , sub : user.id  },token : result });
                    }
                });
            }
        });*/

        AppUser.findOne({email: req.body.email,appId:req.body.appId}, function foundUser(err, user) {
            if (err) return res.negotiate(err);
            if (user) return res.status(409).json({error: 'already exists'});
            AppUser.create(req.body).exec(function(err, user) {
                if (err) {
                    return res.negotiate(err);
                }
                if (user) {
                    JWT.encode({
                        secret: config.CLIENT_SECRET,
                        payload: {
                            id :  user.id,
                            email:  user.email
                        },
                        algorithm: 'HS256'
                    }).exec({
                        error: function (err){
                            return err;
                        },
                        success: function (result){
                            sails.log.info(result);
                            res.status(200).json({user : { email : user.email , sub : user.id  },token : result });
                        }
                    });
                }
            });
        });
    },

    authenticateForApp : function(req, res) {

         sails.log.debug("authenticateForApp post");
        AppUser.findOne({
            email: req.body.email,
            appId : req.body.appId
        }, function foundUser(err, user) {
            if (err) return res.negotiate(err);
            if (!user) return res.notFound();

            Passwords.checkPassword({
                passwordAttempt: req.body.password,
                encryptedPassword: user.password
            }).exec({

                error: function (err){
                    sails.log.info(err);
                    return res.negotiate(err);
                },

                incorrect: function (){
                    return res.notFound();
                },

                success: function (){

                    JWT.encode({
                        secret: config.CLIENT_SECRET,
                        payload: {
                            id :  user.id,
                            email:  user.email
                        },
                        algorithm: 'HS256'
                    }).exec({
                        // An unexpected error occurred.
                        error: function (err){
                            return err;
                        },
                        // OK.
                        success: function (result){
                            res.status(200).json({user : { appId: user.appId, email : user.email , sub : user.id, streetNumber : user.streetNumber,streetName : user.streetName,city : user.city, country : user.country, phone: user.phone, name: user.firstName, zip: user.zip },token : result });
                        }
                    });
                }
            });
        });
    },

    authenticate : function(req, res) {

        sails.log.debug("authenticate post");
        AppUser.findOne({
            email: req.body.email
        }, function foundUser(err, user) {
            if (err) return res.negotiate(err);
            if (!user) return res.notFound();

            Passwords.checkPassword({
                passwordAttempt: req.body.password,
                encryptedPassword: user.password
            }).exec({

                error: function (err){
                    sails.log.info(err);
                    return res.negotiate(err);
                },

                incorrect: function (){
                    return res.notFound();
                },

                success: function (){

                    JWT.encode({
                        secret: config.CLIENT_SECRET,
                        payload: {
                            id :  user.id,
                            email:  user.email
                        },
                        algorithm: 'HS256'
                    }).exec({
                        // An unexpected error occurred.
                        error: function (err){
                            return err;
                        },
                        // OK.
                        success: function (result){
                            res.status(200).json({user : { appId: user.appId, email : user.email , sub : user.id, streetNumber : user.streetNumber,streetName : user.streetName,city : user.city, country : user.country, phone: user.phone, name: user.firstName, zip: user.zip },token : result });
                        }
                    });
                }
            });
        });
    },


    getSubChildById : function(req,res){
         sails.log.debug("getSubChildById Loading");
        var productId = req.param('productId');
        var searchApp = {
            id: productId
        };
        var thirdNavi = [];
        ThirdNavigation.findOne(searchApp).exec(function(err, app) {
            if (err) return done(err);
            //var query =  PriceAndVariants.find({productId: app.id});
           // query.sort('id ASC');
           // query.exec(function(err, variants){
             //if (err) sails.log.info(err);
            // if(variants != undefined){
                /*app.price = variants.price;
                app.quantity = variants.quantity;
                app.size = variants.size;*/
              //   app.variants = variants;
              //   sails.log.info( "variants " + JSON.stringify(variants));
           //  }
             res.json(app);
           // })
        });
    },

    /**
     * return Tax Details collections for given app Id
     * @param req
     * @param res
     */
    getTaxInfoByCountry : function(req,res){
        sails.log.debug("getTaxInfoByCountry Loading");
        var appId = req.body.appId;
        var country = req.body.country;

        var searchQuery = {
            appId:appId,
            countryRestriction:{
                $elemMatch:{
                    countryName:country
                }
            }
        };
        sails.log.info(searchQuery);
        ApplicationTax.find(searchQuery).exec(function(err, result) {
            if (err) return res.send(err);
            return res.send(result);
        });
    },


    getShippingPickupInfo  : function(req,res){
        sails.log.debug("getShippingPickupInfo Loading");
        var appId = req.param('appId');
        var searchQuery = {
            appId: appId,
            shippingOption : 'Pick up'
        };
        ShippingDetails.find(searchQuery).exec(function(err, result) {
            if (err) return res.send(err);
            return res.send(result);
        });
    },


    getClientToken: function(req,res){
        sails.log.debug("getClientToken Loading");
        braintree.connect({
            environment: braintree.Environment.Sandbox,
            merchantId: "vk2y7mb8s5vbhctg",
            publicKey: "9bqjdssmgrrg7j8w",
            privateKey: "b5f83bb6a33b0c3be424c45eddc5ad49"
        }).clientToken.generate({}, function (err, response) {
            sails.log.info("error " + err);
            if (err) return res.send(err);
            sails.log.info("response " + response);
            res.send(response.clientToken);
        });

    },



}