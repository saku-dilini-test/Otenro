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
Passwords = require('machinepack-passwords');
var sentMails = require('../mobile_apis/Services/emailService.js');
var config = require('../mobile_apis/Services/config.js');

module.exports = function(option) {

    var seneca = this;
    var MongoClient = require('mongodb').MongoClient;
    var url = config.DB_URL;
    var ObjectID = require('mongodb').ObjectID;
    var send = require('send');
    MongoClient.connect(url, function(err, db){

        seneca.add( {cmd:'getThirdBySecondId' }, getThirdBySecondId );
        seneca.add( {cmd:'getCurrency' }, getCurrency );
        seneca.add( {cmd:'getListOfSalesAndPromotions' }, getListOfSalesAndPromotions );
        seneca.add( {cmd:'getTaxInfo' }, getTaxInfo );
        seneca.add( {cmd:'getAllCountry' }, getAllCountry );
        seneca.add( {cmd:'getShippingInfo' }, getShippingInfo );
        seneca.add( {cmd:'getIPGInfo' }, getIPGInfo );
        seneca.add( {cmd:'getSpecificChild' }, getSpecificChild );
        seneca.add( {cmd:'getIconAllowance' }, getIconAllowance );
        seneca.add( {cmd:'getSubChildById' }, getSubChildById );
        seneca.add( {cmd:'getShippingPickupInfo' }, getShippingPickupInfo );
        seneca.add( {cmd:'getClientToken' }, getClientToken );
        seneca.add( {cmd:'getTaxInfoByCountry' }, getTaxInfoByCountry );
        seneca.add( {cmd:'getShippingInfoByCountry' }, getShippingInfoByCountry );
        seneca.add( {cmd:'updateInventory' }, updateInventory );
        seneca.add( {cmd:'register' }, register );
        seneca.add( {cmd:'authenticateForApp' }, authenticateForApp );
        seneca.add( {cmd:'authenticate' }, authenticate );
        seneca.add( {cmd:'saveOrder' }, saveOrder );
        seneca.add( {cmd:'getProductById' }, getProductById );

    /**
         * return all third navigation for given app Id & second navigation Id
         *
         * @param req
         * @param res
         */



        function getThirdBySecondId (req,Done){
            if(req.appId != null){
                var collection = db.collection('thirdnavigation');
                var thirdNavi = [];
                collection.find({appId:req.appId,childId:req.childId,published:'YES'}).toArray(function(err, app){
                //collection.findOne({appId:req.appId,childId:req.childId,published:'YES'}, function(err, app) {
                    console.log('app'+JSON.stringify(app));
                    Done( null, app );
                });
            }
        }
        function getProductById (req,Done){
            if(req.productId != null){
                var collection = db.collection('thirdnavigation');
                var thirdNavi = [];
                var obj_id = new ObjectID(req.productId);
                collection.findOne({_id:obj_id} ,function(err, app){
                //collection.findOne({appId:req.appId,childId:req.childId,published:'YES'}, function(err, app) {
                    console.log('app'+JSON.stringify(app));
                    Done( null, app );
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
            if(req.appId != null){
                var obj_id = new ObjectID(req.appId);

                var collection = db.collection('application');
                collection.findOne({_id:obj_id}, function(err, app) {
                    console.log('getCurrency'+JSON.stringify(app))
                    var currency = app.appSettings.appCurrency;
                    //console.log('currencyy'+JSON.stringify(currency))
                    Done( null, currency );
                });
            }
        }
        function getListOfSalesAndPromotions (req,Done){
            if(req.appId != null){
                var collection = db.collection('SalesAndPromotion');
                collection.findOne({appId:req.appId}, function(err, app) {
                    Done( null, app );
                });
            }
        }
        /**
              * return Tax Details collections for given app Id
              * @param req
              * @param res
              */
        function getTaxInfo (req,Done){
            if(req.appId != null){
                var collection = db.collection('applicationtax');
                collection.findOne({appId:req.appId}, function(err, app) {
                //console.log('taxIfo='+JSON.stringify(app))
                    Done( null, [app] );
                });
            }
        }
        function getAllCountry (req,Done){
            var collection = db.collection('country');
            collection.find().toArray(function(err, app){
                // console.log('appdata'+app);
                Done( null, {data:app} );
            });
        }

        /**
             * return Shipping Details collections for given app Id
             * @param req
             * @param res
             */

        function getShippingInfo (req,Done){
            var collection = db.collection('shippingdetails');
            collection.findOne({appId:req.appId}, function(err, app) {
                console.log('getShippingInfo'+app);
                Done( null, app );
            });
        }

        /**
             * return IPG Details collections for given app Id
             * @param req
             * @param res
             */
        function getIPGInfo (req,Done){
            if(req.appId != null){
                var collection = db.collection('ipgdetails');
                collection.findOne({appId:req.appId}, function(err, app) {
                    console.log('dadada'+app);
                    Done( null, app );
                });
            }
        }
       function saveOrder (req,Done){
           var data = req;
           var collection = db.collection('applicationorder');
           data['paymentStatus'] = 'Pending';
           data['fulfillmentStatus'] = 'Pending';
           if(data.pickupId == null){
                 var output = JSON.parse(data.item);
                      var Data = {
                          'appId' : data.appId,
                          'registeredUser': data.registeredUser,
                          'item':output,
                          'amount' : data.amount,
                          'customerName' :data.customerName,
                          'deliveryNo' : data.deliveryNo,
                          'deliveryStreet' :data.deliveryStreet,
                          'deliveryCity' : data.deliveryCity,
                          'deliveryCountry' : data.deliveryCountry,
                          'deliveryZip': data.deliveryZip,
                          'tax' :   data.tax,
                          'shippingCost' :data.shippingCost,
                          'shippingOpt' :data.shippingOpt,
                          'email': data.email,
                          'currency': data.currency,
                          'paymentStatus':data.paymentStatus,
                          'fulfillmentStatus':data.fulfillmentStatus,
                          'createdAt':new Date(),
                          'updatedAt':new Date()
                      }
                      collection.insert(Data,function(err, order){
                           if(err){
                               console.log('err:::'+err)
                           }
                           var obj_id = new ObjectID(Data.appId);
                           var collection = db.collection('application');
                           collection.findOne({_id:obj_id},function(err,app){
                               Data['userId'] = app.userId;
                               sentMails.sendOrderEmail(Data,function (err,msg) {
                                    if (err) {
                                        console.log('err'+err);
                                        return  err;
                                    }
                               })
                               Done( null, order );
                           })

                      })
            }
            else{
                var output = JSON.parse(data.item);
                var collection = db.collection('shippingdetails');
                var obj_id = new ObjectID(data.pickupId);
                collection.findOne({_id:obj_id,appId:data.appId},function(err,pickUp){

                    if (err){
                        console.log(err);
                        return err;
                    }

                   var array = JSON.stringify([pickUp])
                   var pickUpArray = JSON.parse(array);

                   data.pickUp = pickUpArray[0];
                   data.option = 'pickUp';

                   var output = JSON.parse(data.item);
                   var Data = {
                        'appId' : data.appId,
                        'registeredUser' : data.registeredUser,
                        'item' : output,
                        'amount' : data.amount,
                        'customerName' : data.customerName,
                        'telNumber' : data.telNumber,
                        'tax' : data.tax,
                        'email' : data.email,
                        'currency' : data.currency,
                        'paymentStatus' : data.paymentStatus,
                        'fulfillmentStatus' : data.fulfillmentStatus,
                        'pickUp' : data.pickUp,
                        'option': data.option,
                        'createdAt':new Date(),
                        'updatedAt':new Date()

                   }
                    var collection = db.collection('applicationorder');
                    collection.insert(Data,function(err, order){
                        if(err){
                            console.log('err:::'+err)
                        }
                        var obj_id = new ObjectID(Data.appId);
                        var collection = db.collection('application');
                        collection.findOne({_id:obj_id},function(err,app){
                            Data['userId'] = app.userId;
                            sentMails.sendOrderEmail(Data,function (err,msg) {
                                    if (err) {
                                          console.log('err'+err);
                                          return  err;
                                    }
                            })
                            Done( null, order );
                        })
                    })
                })
            }
       }
        function updateInventory (req,Done){
         /*Manually updating the relevant quantity in the ThirdNavigation*/

                var obj = [];
                //var data = req.cart[0];
                var obj_id = new ObjectID(req.id);
                var collection = db.collection('thirdnavigation');
                collection.find({_id:obj_id}).toArray(function(err, app) {

                if( app[0] != null){
                    console.log("variants="+ JSON.stringify(app[0].variants));
                    for(var i=0;i<app[0].variants.length;i++){
                        if(app[0].variants[i].sku == req.sku){
                        console.log('fdsfdsfs'+app[0].variants[i].quantity)
                        console.log('fdsfdsfs'+ req.qty)
                            app[0].variants[i].quantity = app[0].variants[i].quantity - req.qty;
                            console.log('fdsfdsfs'+app[0].variants[i].quantity)
                            collection.update({_id:obj_id},app[0],function(err,thirdNavi){
                                     obj.push(thirdNavi);
                                     console.log(JSON.stringify(obj))
                            })
                        }
                    }
                }
             });
              Done( null, obj );
        }

        function getSpecificChild (req,Done){
         /**
                  *  If main Id undefined, return all second navigation
                  */
                 var collection = db.collection('secondnavigation');
                 if(typeof req.mainId == 'undefined'){


                        collection.find({appId:req.appId}).toArray(function(err, app){
                            var Data = JSON.stringify(app).replace(/_id/g,'id');
                            var Adata = JSON.parse(Data);
                            console.log('getSpecificChild'+JSON.stringify(Adata))

                            Done( null, Adata );
                       });
                 }
                 else{

                       collection.find({appId:req.appId,mainId:mainId}, function(err, app) {
                             console.log('dadada'+app);
                             Done( null, app );
                       });
                 }
        }
        function getIconAllowance (req,Done){

                var collection = db.collection('applicationstoresettings');
                collection.findOne({appId:req.appId}, function(err, data) {
                    //console.log(data)
                    Done( null, data );
                });
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
              console.log('getShippingInfoByCountry'+searchQuery);
              var collection = db.collection('shippingdetails');
              collection.find(searchQuery).toArray (function(err, data) {
                   Done( null, data );
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

                                console.log('DDDDDDDdd'+JSON.stringify(result))

                             Done( null, result  );
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
                if (err) return err;
                if (!user) return err;

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
                                    success: function (res){
                                          console.log('result='+res);
                                          var result = {
                                            'user':{ 'appId': user.appId, 'email' : user.email , 'sub' : user.id, 'streetNumber' : user.streetNumber,'streetName' : user.streetName,'city' : user.city, 'country' : user.country, 'phone': user.phone, 'name': user.firstName, 'zip': user.zip },
                                            'token' : res

                                          }
                                          Done( null, result );
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
                                          var Result = {
                                          'user':{ 'appId': user.appId, 'email' : user.email , 'sub' : user.id, 'streetNumber' : user.streetNumber,'streetName' : user.streetName,'city' : user.city, 'country' : user.country, 'phone': user.phone, 'name': user.firstName, 'zip': user.zip },
                                          'token' : result
                                          }
                                               Done( null,Result  );
                                    }
                            });
                        }
                    });

                }
            })
        }

        function getSubChildById (req,Done){
                var obj_id = new ObjectID(req.productId);
                var productId = req.productId
                var searchApp = {
                    _id: obj_id
                };
                var thirdNavi = [];
                var collection = db.collection('thirdnavigation');
                collection.findOne(searchApp, function(err, data) {
                    Done( null, data );
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
                    Done( null, [data] );
               });
         }

       function getShippingPickupInfo (req,Done){
            if(req.appId != null){
                var collection = db.collection('shippingdetails');
                collection.find({appId:req.appId,shippingOption:'Pick up'}).toArray (function(err, data) {
                var Data = JSON.stringify(data).replace(/_id/g,'id');
                var Adata = JSON.parse(Data);
                //collection.findOne({appId:req.appId,shippingOption:'Pick up'}, function(err, data) {
                    //console.log(JSON.stringify(Adata))
                    Done( null, Adata );
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
                console.log("response " + response.clientToken);
                Done( null, response.clientToken );
           });

        }
    })

}



