/**
 * Created by kalani on 03/31/17.
 */
/**
 * EcommerceAppMobileApisController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */



var braintree = require("braintree");
var JWT = require('machinepack-jwt');
Passwords = require('machinepack-passwords'),




module.exports = function(option) {

    var seneca = this;
    var MongoClient = require('mongodb').MongoClient;

    var url = 'mongodb://localhost:27017/appBuilder';

    MongoClient.connect(url, function(err, db){

       seneca.add( {cmd:'getThirdBySecondId' }, getThirdBySecondId );
       seneca.add( {cmd:'getCurrency' }, getCurrency );
       seneca.add( {cmd:'getListOfSalesAndPromotions' }, getListOfSalesAndPromotions );
       seneca.add( {cmd:'getTaxInfo' }, getTaxInfo );
       seneca.add( {cmd:'getAllCountry' }, getAllCountry );
       seneca.add( {cmd:'getShippingInfo' }, getShippingInfo );
       seneca.add( {cmd:'getIPGInfo' }, getIPGInfo );
       seneca.add( {cmd:'getSpecificChild' }, getSpecificChild );
       seneca.add( {cmd:'iconAllowance' }, iconAllowance );
       seneca.add( {cmd:'getSubChildById' }, getSubChildById );
       seneca.add( {cmd:'getShippingPickupInfo' }, getShippingPickupInfo );
       seneca.add( {cmd:'getClientToken' }, getClientToken );
       seneca.add( {cmd:'getTaxInfoByCountry' }, getTaxInfoByCountry );
       seneca.add( {cmd:'getShippingInfoByCountry' }, getShippingInfoByCountry );
       seneca.add( {cmd:'updateInventory' }, updateInventory );
       seneca.add( {cmd:'register' }, register );
       seneca.add( {cmd:'authenticateForApp' }, authenticateForApp );
       seneca.add( {cmd:'authenticate' }, authenticate );
       //seneca.add( {cmd:'saveOrder' }, saveOrder );



/**
     * return all third navigation for given app Id & second navigation Id
     *
     * @param req
     * @param res
     */


    function getThirdBySecondId (req,Done){
        if(req.appID != null){
            var collection = db.collection('thirdnavigation');
            var thirdNavi = [];
            collection.findOne({appId:req.appID,childId:req.childId,published:'YES'}, function(err, app) {
                console.log('dadada'+app);
                Done( null, { result:app} );
            });
        }

    }

    /**
             * Get existing currency for the mobile app.
             *
             * @param req
             * @param res
             */

    function getCurrency (req,Done){
        if(req.appID != null){
            var collection = db.collection('application');
            collection.findOne({templateId:req.appID}, function(err, app) {


                Done( null, { result:app} );
            });
        }

    }

    function getListOfSalesAndPromotions (req,Done){
        if(req.appID != null){
            var collection = db.collection('SalesAndPromotion');
            collection.findOne({appId:req.appID}, function(err, app) {

                Done( null, { result:app} );
            });
        }

    }


    /**
          * return Tax Details collections for given app Id
          * @param req
          * @param res
          */

    function getTaxInfo (req,Done){
        if(req.appID != null){
            var collection = db.collection('applicationtax');
            collection.findOne({appId:req.appID}, function(err, app) {
                Done( null, { result:app} );
            });
        }

    }

    function getAllCountry (req,Done){
        if(req.appID != null){
            var collection = db.collection('country');
            collection.find().toArray(function(err, app){
                console.log('dadada'+app);
                Done( null, { result:app} );
            });
        }
    }

    /**
         * return Shipping Details collections for given app Id
         * @param req
         * @param res
         */

    function getShippingInfo (req,Done){

            var collection = db.collection('shippingdetails');
            collection.findOne({appId:req.appID}, function(err, app) {
                console.log('dadada'+app);

                Done( null, { result:app} );
            });

    }

    /**
         * return IPG Details collections for given app Id
         * @param req
         * @param res
         */



    function getIPGInfo (req,Done){
        if(req.appID != null){
            var collection = db.collection('ipgdetails');
            collection.findOne({appId:req.appID}, function(err, app) {
                console.log('dadada'+app);

                Done( null, { result:app} );
            });
        }
    }


/*
//post


   function saveOrder (req,Done){

            var a = req.data;
            console.log('sssssssssss'+a);
            var collection = db.collection('applicationorder');
            data['paymentStatus'] = 'Pending';
            data['fulfillmentStatus'] = 'Pending';
            console.log(data['paymentStatus']);

            if(data.pickupId == null){
               collection.insert(req.data, function(err, data){
                     console.log('data'+JSON.stringify(data));

            })

            }
            }
*/



/*
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
        },*/



     function updateInventory (req,Done){
     /*Manually updating the relevant quantity in the ThirdNavigation*/

            var obj = [];
            var data = req.cart[0];
            console.log("req[0]"+req.cart[0]);
            var collection = db.collection('thirdnavigation');
            collection.findOne({id:req.id}, function(err, app) {
                for(var i =0;i<app[0].variants.length;i++){
                    if(app[0].variants[i].sku == data.sku){
                        app[0].variants[i].quantity = app[0].variants[i].quantity - data.qty;
                        collection.update({id:data.id},app[0],function(err,thirdNavi){
                                 obj.push(thirdNavi);
                        })
                    }

                }

         });
          Done( null, { result:obj} );
     }

    function getSpecificChild (req,Done){
     /**
              *  If main Id undefined, return all second navigation
              */
             var collection = db.collection('secondnavigation');
             if(typeof mainId == 'undefined'){

                   collection.findOne({appId:req.appID}, function(err, app) {
                        Done( null, { result:app} );
                   });
             }
             else{

                   collection.findOne({appId:req.appID,mainId:mainId}, function(err, app) {
                         console.log('dadada'+app);
                         Done( null, { result:app} );
                   });

             }

    }


    function iconAllowance (req,Done){
        if(req.appID != null){
            var collection = db.collection('applicationstoresettings');
            collection.findOne({appId:req.appID}, function(err, data) {

                Done( null, { result:data} );
            });
        }
    }


    /**
         * return Shipping Details collections for given app Id
         * @param req
         * @param res
         */

        function getShippingInfoByCountry (req,Done){

                var data = req;
                console.log(req.appId)
                //console.log(req.country)
                var appId = req.appId;
                var country = req.country;
                var searchQuery = {
                            appId:appId,
                            countryRestriction:{
                                $elemMatch:{
                                    countryName:country
                                }
                            }
                        };

                //console.log('sdsdsa'+searchQuery);
                var collection = db.collection('shippingdetails');

                collection.findOne(searchQuery, function(err, data) {

                    if(data){
                        collection.insert(data, function(err, data){
                             console.log('data'+JSON.stringify(data));
                        })

                    }
                    Done( null, { data:data} );


                });

        }


    function register (req,Done){
        var user = req;

        var collection = db.collection('appuser');
        Passwords.encryptPassword({
        password: user.password,
        }).exec({
        // An unexpected error occurred.
        error: function (err) {

        },
        // OK.
        success: function (Password) {

               if (user) {

                    JWT.encode({
                        secret: '44f4f3be572ec33711a40a5b8b4',
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
                            //Done.status(200).json({user : { email : user.email , sub : user.id  },token : result });
                            var Params = {
                                 'firstName': req.firstName,
                                 'lastName': req.lastName,
                                 'email' : req.email,
                                 'password' : Password,
                                 'streetNumber': req.streetNumber,
                                 'streetName':req.streetName,
                                 'city':req.city,
                                 'zip': req.zip,
                                 'country': req.country,
                                 'phone': req.phone,
                                 'appId': req.appId,
                                 'createdAt':new Date(),
                                 'updatedAt':new Date()
                            };
                            collection.insert(Params,function(err,Params){

                            })
                            var result = {
                                'user' : { 'email' : user.email ,
                                         'sub' : user.id  },
                                'token' : result
                            }

                         Done( null, {token : result } );
                        }
                    });

               }
        },
        });


    }

     function authenticateForApp (req,Done){
     console.log(req.password);
        var collection = db.collection('appuser');
        collection.findOne({
            email: req.email,
            appId : req.appId
        },function foundUser(err, user){

        console.log('name'+JSON.stringify(req));
            Passwords.checkPassword({
                            passwordAttempt: req.password,
                            encryptedPassword: user.password
            }).exec({
                error: function(err){
                    return err;

                },
                incorrect: function(){
                    return err;

                },
                   success: function (){
                   console.log('success');
                            JWT.encode({
                                 secret: '44f4f3be572ec33711a40a5b8b4',
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
                                      console.log('result='+result);
                                      var r = {
                                      'user':{ 'appId': user.appId, 'email' : user.email , 'sub' : user.id, 'streetNumber' : user.streetNumber,'streetName' : user.streetName,'city' : user.city, 'country' : user.country, 'phone': user.phone, 'name': user.firstName, 'zip': user.zip },
                                      'token' : result


                                      }
                                           Done( null, {user : r } );
                                          //res.status(200).json({user : { appId: user.appId, email : user.email , sub : user.id, streetNumber : user.streetNumber,streetName : user.streetName,city : user.city, country : user.country, phone: user.phone, name: user.firstName, zip: user.zip },token : result });
                                      }
                                  });
                              }
            });



        })


     }


        function authenticate (req,Done){

        var collection = db.collection('appuser');
        collection.findOne({email:req.email},function foundUser(err, user){
            if (err) return err;
            if (!user) return err;
            else{
                Passwords.checkPassword({
                    passwordAttempt: req.password,
                    encryptedPassword: user.password
                }).exec({

                    error: function (err){

                        return err;
                    },

                    incorrect: function (){
                        return err;
                    },

                    success: function (){

                        JWT.encode({
                            secret: '44f4f3be572ec33711a40a5b8b4',
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
                                      var r = {
                                      'user':{ 'appId': user.appId, 'email' : user.email , 'sub' : user.id, 'streetNumber' : user.streetNumber,'streetName' : user.streetName,'city' : user.city, 'country' : user.country, 'phone': user.phone, 'name': user.firstName, 'zip': user.zip },
                                      'token' : result


                                      }
                                           Done( null, {user : r } );

                                }
                        });
                    }
                });





            }

        })



        }



    function getSubChildById (req,Done){
            var productId = req.productId
            var searchApp = {
                id: productId
            };
            var thirdNavi = [];
            var collection = db.collection('thirdnavigation');
            collection.findOne(searchApp, function(err, data) {


                Done( null, { result:data} );
            });

    }

    /**
         * return Tax Details collections for given app Id
         * @param req
         * @param res
         */

        function getTaxInfoByCountry (req,Done){
                 var appId = req.appId;
                 var country = req.country;
                 var searchQuery = {
                             appId:appId,
                             countryRestriction:{
                                 $elemMatch:{
                                     countryName:country
                                 }
                             }
                         };

                 var collection = db.collection('applicationtax');

                 collection.findOne(searchQuery, function(err, data) {
                    Done( null, { data:data} );
                     if(data){
                         collection.insert(data, function(err, data){
                              console.log('data'+JSON.stringify(data));
                         })
                     }

                 });

         }


    function getShippingPickupInfo (req,Done){
        if(req.appID != null){
            var collection = db.collection('shippingdetails');
            collection.findOne({appId:req.appID,shippingOption:'Pick up'}, function(err, data) {

                Done( null, { result:data} );
            });
        }
    }

  function getClientToken (req,Done){
       braintree.connect({
            environment: braintree.Environment.Sandbox,
            merchantId: "vk2y7mb8s5vbhctg",
            publicKey: "9bqjdssmgrrg7j8w",
            privateKey: "b5f83bb6a33b0c3be424c45eddc5ad49"

       }).clientToken.generate({}, function (err, response) {
            if (err) return err
            console.log("response " + response);
            Done( null, { result:response.clientToken} );
       });

    }


})


}



