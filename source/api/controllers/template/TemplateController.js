/**
 * Created by thusithz on 2/24/16.
 */
/**
 * TemplateController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs-extra');
var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var dateFormat = require('dateformat');
var path = require('path').resolve(sails.config.appPath);
var utilsService = require('../../services/utilsService');

module.exports = {

    getMainMenu : function(req,res){

        var appId = req.body.appId;
        var searchApp = {
            appId:appId
        };

        MainNavigation.find(searchApp).exec(function(err, app){
            if (err) return done(err);
            res.send(app);
        });
    },

    getContactUs : function(req,res){

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };
        sails.log.info(searchApp);
        ApplicationContactUs.findOne(searchApp).exec(function (err, app) {
            if (err) return err;
            res.json(app);
        });
    },
    /**
     * Return Application Store Setting Collection for Given App Id
     * It has About Us
     * @param req
     * @param res
     */
    getAboutUs : function(req,res){
        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };
        sails.log.info(searchApp);
        ApplicationStoreSettings.findOne(searchApp).exec(function (err, app) {
            if (err){ console.log('err : '+ err); return err;}

            res.json(app);
        });
    },

    /**
     * Return Application Store Setting Collection for Given App Id
     * It has policies
     * @param req
     * @param res
     */
    getPolicies : function(req,res){
        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };
        sails.log.info(searchApp);
        ApplicationStoreSettings.findOne(searchApp).exec(function (err, app) {
            if (err) return err;
            res.json(app);
        });
    },

    getTermsAndConditions : function(req,res){

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };
        ApplicationStoreSettings.findOne(searchApp).exec(function (err, app) {
            if (err) return err;
            res.json(app);
        });
    },

    getSpecificChild :function(req,res){

        var appId = req.param('appId');
        var mainId=req.param('mainId');
        /**
         *  If main Id undefined, return all second navigation
         */
        if(typeof mainId == 'undefined'){
            var searchApp = {
                appId: appId
            };
            SecondNavigation.find(searchApp).sort({createdAt: -1}).exec(function(err, results) {
                if (err) return done(err);
                res.send(results);
            });
        }else {
            var searchApp = {
                appId: appId,
                mainId: mainId
            };
            SecondNavigation.find(searchApp).sort({createdAt: -1}).exec(function (err, results) {
                if (err) return done(err);
                res.send(results);
            });
        }
    },

    /**
     * return subChild Collections for given app Id
     * (third Navigation)
     * @param req
     * @param res
     */
    getSubChildsByAppId : function(req,res){
        var appId = req.param('appId');
        var searchApp = {
            appId : appId
        };

        ThirdNavigation.find(searchApp).exec(function(err, app) {
            if (err) return done(err);
            res.json(app);
        });
    },

    getSubChildById : function(req,res){

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
     * Get existing currency for the mobile app.
     *
     * @param req
     * @param res
     */
    getCurrency : function(req,res){
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

    /**
     * return all third navigation for given app Id & second navigation Id
     *
     * @param req
     * @param res
     */
    getThirdBySecondId : function(req,res){
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
        getAllThirdByAppId : function(req,res){
            var appId = req.param('appId');
            var searchApp = {
                appId: appId,
                published : 'YES'
            };
            var thirdNavi = [];
            ThirdNavigation.find().where(searchApp).exec(function(err, app) {
                if (err) return done(err);
                return res.send(app);
            });


        },

    getSecondByThirdId: function(req,res){
            var Id = req.param('id');

            var searchApp = {
                id: Id,
            };

            SecondNavigation.find(searchApp).exec(function (err, app) {

                console.log(app)
              if (err) return done(err);
                res.send(app);
            });
    },
    /**
     * Template Category Function Start
     *
     * Given App Id return all article collections
     * @param req
     * @param res
     */

    getArticles : function(req,res) {
        var dateFormat = require('dateformat');
        var articalData = [];

        var appId = req.param('appId');
        var categoryId = req.param('categoryId');
        //sails.log.info(appId);
        var searchApp = {
            appId: appId,
            categoryId : categoryId
        };

        Article.find({ select: ['appId','title','imageUrl','categoryId','desc','tempImageArray','publishDate','expiryDate'], sort: 'publishDate DESC'}).where(searchApp).exec(function (err, result) {
            if (err) return done(err);
            //sails.log.info(result);

            result.forEach(function(article) {
                if (new Date(new Date(dateFormat(article.publishDate, "yyyy-mm-dd hh:MM:ss TT"))) <= new Date(new Date())) {
                        if (new Date(new Date(dateFormat(article.expiryDate, "yyyy-mm-dd hh:MM:ss TT"))) >= new Date(new Date())) {
                            articalData.push(article);

                        }
                }
//                if(new Date(new Date(dateFormat(article.publishDate, "yyyy-mm-dd hh:mm:ss")).toLocaleString()) <= new Date(new Date().toLocaleString())){
//                    if(new Date(new Date(dateFormat(article.expiryDate, "yyyy-mm-dd hh:mm:ss")).toLocaleString()) >= new Date(new Date().toLocaleString())) {
//                        articalData.push(article);
//                    }
//                }
            });

            res.json(articalData);
        });
    },

    getArticleCategoryByAppId : function(req,res) {

    var appId = req.param('appId');
    var searchApp = {
        appId: appId
    };
        ArticleCategory.find().where(searchApp).exec(function (err, result) {
            if (err) return done(err);
            res.json(result);
    });
},

    getArticleCategoryById : function(req,res) {

        var id = req.param('categoryId');
        var searchApp = {
            id : id
        };
        ArticleCategory.findOne().where(searchApp).exec(function (err, artilce) {
            if (err) return done(err);
            res.json(artilce);
        });
    },

    /**
     * Return Article Collection for given category ID
     * @param req
     * @param res
     */
    getArticleByCategoryId : function(req,res) {

        var categoryId = req.param('categoryId');
        var searchApp = {
            categoryId : categoryId
        };
        Article.find().where(searchApp).exec(function (err, result) {
            if (err) return done(err);
            res.json(result);
        });
    },

    getArticleById : function(req,res) {

        var id = req.param('articleId');
        var searchApp = {
            id : id
        };
        Article.findOne().where(searchApp).exec(function (err, artilce) {
            if (err) return done(err);
            res.json(artilce);
        });
    },
        getSliderData: function (req, res) {
            console.log('req.body.appId : ' + req.param('appId'))

            var appId = req.param('appId');

            var searchApp = {
                appId: appId
            };

            Slider.find(searchApp, function (err, app) {
                if (err) return done(err);
                res.send(app);
            });
        },

        /**
         * return collection of article given appId
         *
         * @param req appId
         * @param res collection articles for given appId
         */
        getCategory: function (req, res) {

            var categoryId = req.param('categoryId');
            var searchQuery = {
                id:categoryId
            };

            ArticleCategory.find(searchQuery).exec(function (err, result) {
                if (err) {
                    sails.log.error("Article Category Collection find Error for given appId : " + appId);
                    return done(err);
                }
                res.send(result);
            });
        },

    /**
     * return images for given userID & appID & img ( Path + Image name )
     * @param req
     * @param res
     */
    viewImages : function(req,res){
        res.sendfile(config.APP_FILE_SERVER + req.param('userId') + '/templates/' + req.param('appId') + '/img/'+ req.param('img'));
    },
    viewWebImages : function(req,res){
        res.sendfile(config.APP_FILE_SERVER + req.param('userId') + '/progressiveTemplates/' + req.param('appId') + '/src/assets/images/'+ req.param('images'));
    },

    /**
     * return template url for given userID & appID & img ( template path )
     * @param req
     * @param res
     */
    viewTemplateUrl : function(req,res){
        res.redirect(config.ME_SERVER_URL + req.param('userId') + '/templates/' + req.param('appId'));
    },
    viewProgUrl : function(req,res){
        var url = config.ME_SERVER_URL + req.param('userId') + '/progressiveTemplates/' + req.param('appId')+'/src/';
        if(req.param('isFromCMSAppView'))
        {
            url += "?isFromCMSAppView=1";//This is to ditect that the app is loading using the iFrame window in cms.
        }
        res.redirect(url);
    },

    /**
     * return two dummy comments json object for every request
     *
     * @param req
     * @param res
     */
    getCommentsDummy : function(req,res) {
        var response = [
            {
                author : {
                    avatar : 'img/comments/M9.png',
                    name : 'M9 Train'
                },
                description : 'The Alstom Prima or the Class M9 '
            },
            {
                author : {
                    avatar : 'img/comments/S12.png',
                    name : 'S12 Train'
                },
                description : 'There will be two S12 (Luxury) sets '
            }
        ];
        res.json(response);
    },

    deletePreviewTemp : function(req,res){
        /*var appId  = req.param('appId');
        var userId = req.param('userId');

        Application.destroy({ id : appId}).exec(function (err) {
            if (err) return callback("Error while deleting " + err.message);

        });

        MainNavigation.destroy({ appId : appId}).exec(function (err) {
            if (err) return callback("Error while deleting " + err.message);

        });

        SecondNavigation.destroy({ appId : appId}).exec(function (err) {
            if (err) return callback("Error while deleting " + err.message);

        });
        ThirdNavigation.destroy({ appId : appId}).exec(function (err) {
            if (err) return callback("Error while deleting " + err.message);

        });

        //sails.log.info("run run");
        fs.remove(config.ME_SERVER+ userId +'/templates/'+appId+'/', function (err) {

            if (err) {
                console.error(err);
            }
        });*/

        res.send(200,{message:'Deleted Application'});


    },
    postDeviceId: function(req,res){
        //var data = req.body
        var deviceId =  req.param('deviceId');
        var appId = req.param('appId');
        var uuid = req.param('uuid');
        var searchQuery  = {
            deviceId : deviceId,
            appId : appId,
            deviceUUID : uuid
        };

        sails.log.info("Exec postDeviceId with params, deviceId: " + deviceId + " uuid: " + uuid + " appId: " + appId);
        // check device id already have in db
        DeviceId.find(searchQuery).exec(function(err,result) {
            if (err) return sails.log.info(err);
            // if not device ID in db collections
            if (result.length == 0) {
                // create new Device ID Collection
                DeviceId.create({appId:appId,deviceId:deviceId,lastAccessTime:new Date().toLocaleString(),deviceUUID: uuid}).exec(function(err,result) {
                    if(err) return console.error(err);
                    res.send("success");
                });

                try {
                    AppUser.findOne().where({deviceUUID:uuid}).exec(function (err, appUser) {
                        if (err) return done(err);
                        if(appUser){

                            utilsService.getOperator(appUser.msisdn, function (operator,err) {
                                if(err){
                                    console.log(err);
                                }
                                console.log(appUser.msisdn);
                                AppVisitDataLog.create({appId:appUser.appId,msisdn:appUser.msisdn,
                                    viewDate:dateFormat(new Date(), "yyyy-mm-dd"),operator: operator}).exec(function(err,appVisiting) {
                                    if(err) {
                                        console.log(err);
                                    }else {
                                        console.log(appVisiting);

                                    }
                                });
                            });
                        }
                    });
                }catch(e){
                    sails.log.error(err) ;
                }
            }else{

                if(err) return console.error(err);

                DeviceId.update(searchQuery,{lastAccessTime:new Date().toLocaleString()}).exec(function(err,data){
                        if(err) return done(err);
                        else {
                            res.send(data);
                        }
                });

                try {
                    AppUser.findOne().where({deviceUUID:uuid}).exec(function (err, appUser) {
                        if (err) return done(err);
                        if(appUser){

                            utilsService.getOperator(appUser.msisdn, function (operator,err) {
                                if(err){
                                    console.log(err);
                                }
                                console.log(appUser.msisdn);
                                AppVisitDataLog.create({appId:appUser.appId,msisdn:appUser.msisdn,
                                    viewDate:dateFormat(new Date(), "yyyy-mm-dd"),operator: operator}).exec(function(err,appVisiting) {
                                    if(err) {
                                        console.log(err);
                                    }else {
                                        console.log(appVisiting);

                                    }

                                });
                            });
                        }

                    });
                }catch(e){
                    sails.log.error(err) ;
                }
            }
        });


    },
    authorizeNetPay: function(req,res){
        var expDate = req.body.exp_year+'-'+req.body.exp_month,
            cardNumber = req.body.number,
            cvc = req.body.cvc,
            amount = req.body.amount;

        IPGDetails.findOne({appId:req.body.appId}).exec(function(err, authorizeDetails){
            if (err){
                TansactionLogger.info("appId " +req.body.appId+ ","+ "error " + err );
                return sails.log.info(err);
            }
            var apiLoginId = authorizeDetails.apiLoginId,
                transactionKey = authorizeDetails.transactionKey;

        var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
            //set api login id
        	merchantAuthenticationType.setName(apiLoginId);
        	//set transaction key
        	merchantAuthenticationType.setTransactionKey(transactionKey);

        var creditCard = new ApiContracts.CreditCardType();
        	creditCard.setCardNumber(cardNumber);
        	creditCard.setExpirationDate(expDate);
        	creditCard.setCardCode(cvc);

        var paymentType = new ApiContracts.PaymentType();
        	paymentType.setCreditCard(creditCard);
        var transactionRequestType = new ApiContracts.TransactionRequestType();
            transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHONLYTRANSACTION);
            transactionRequestType.setPayment(paymentType);
            transactionRequestType.setAmount(amount);
        var createRequest = new ApiContracts.CreateTransactionRequest();
            createRequest.setMerchantAuthentication(merchantAuthenticationType);
            createRequest.setTransactionRequest(transactionRequestType);
        //pretty print request
        	//sails.log.info(JSON.stringify(createRequest.getJSON(), null, 2));

        var ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());
            ctrl.execute(function(){

            		var apiResponse = ctrl.getResponse();
            		var response = new ApiContracts.CreateTransactionResponse(apiResponse);
                    TansactionLogger.info("appId " +req.body.appId+ ","+ "response " + JSON.stringify(response) );
            		//pretty print response
            		//sails.log.info(JSON.stringify(response, null, 2));

            		if(response != null){
            			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
            				if(response.getTransactionResponse().getMessages() != null){
                                TansactionLogger.info("appId " +req.body.appId+ ","+ "success " + response.getTransactionResponse().getTransId() );
            				    res.send({data:'Successfully created transaction with Transaction ID: ' + response.getTransactionResponse().getTransId(),status:'ok'});
            				}
            				else {
                                TansactionLogger.info("appId " +req.body.appId+ ","+ "error " + "not success" );
            					if(response.getTransactionResponse().getErrors() != null){
                                    TansactionLogger.info("appId " +req.body.appId+ ","+ "error " + response.getTransactionResponse().getErrors() );
            					    res.send({data: 'Failed Transaction',status:'error'});

            					}
            				}
            			}
            			else {

                            TansactionLogger.info("appId " +req.body.appId+ ","+ "error " + "Failed Transaction." );
            				if(response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null){
                                TansactionLogger.info("appId " +req.body.appId+ ","+ "error " + response.getTransactionResponse().getErrors() );
            				    res.send({data:'Failed Transaction',status:'error'});

            				}
            				else {
                                TansactionLogger.info("appId " +req.body.appId+ ","+ "Invalid Data ");
            					res.send({data:'Invalid Data',status:'error'});
            				}
            			}
            		}
            		else {
                        TansactionLogger.info("appId " +req.body.appId+ ","+ "Null Response.");
            			res.send({data:'Null Response.', status: 'error'});
            		}

            	});
            	if (require.main === module) {
                	authorizeCreditCard(function(){
                        TansactionLogger.info("appId " +req.body.appId+ ","+ "authorizeCreditCard call complete.");
                	});
                }
        });
    },
    /**
     * Return all orders of a particular user
     * @param req {appId : string, userId' : string }
     * @param res {json}
     */
    getOrdersOfUser : function (req, res) {
        var appId = req.param('appId');
        var registeredUser = req.param('userId');
        var searchApp = {
            appId : appId,
            registeredUser : registeredUser

        };
        ApplicationOrder.find().where(searchApp).exec(function (err, result) {
            if (err) return done(err);
            res.json(result.reverse());
        });
     },

     /**
     * Get template data using previewId and return it as json response
     * */
    getTemplateByPreviewId : function (req, res) {
        var templateId = req.param('templateId');
        Template.findOne({ previewId : templateId })
            .exec(function (err, template) {
            if (err) return done(err);
            res.json(template);

        });
    },



    createArticleViewDataInfo : function(req,res){


        var appId = req.param('appId');
        var msisdn = req.param('msisdn');
        var articleName = req.param('articleName');

        var data = {
            appId:appId,
            msisdn:msisdn,
            articleName:articleName,
            viewDate:dateFormat(new Date().toLocaleString(),"yyyy-mm-dd")
        };


        ArticleViewLogData.create(data).exec(function (err, result) {
            if (err) {
                sails.log.error("ArticleViewDataLog Create Error");
                return done(err);
            }
            res.send(result);
        });

    },


    createAppVisitDataInfo : function(req,res){


        var appId = req.param('appId');
        var msisdn = req.param('msisdn');

        var data = {
            appId:appId,
            msisdn:msisdn
        };


        AppVisitDataLog.create(data).exec(function (err, result) {
            if (err) {
                sails.log.error("ArticleViewDataLog Create Error");
                return done(err);
            }
            res.send(result);
        });
    },

    getDefaultTerms : function(req,res){

        fs.readFile(path + '/assets/templates/user/edit/commerce/defaultTerms/defaultTerms.html', 'utf8', (err, data) => {
          if (err) throw err;
                  res.send(data);
        });

    }



};