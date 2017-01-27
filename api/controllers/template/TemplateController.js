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
var wepay = require('wepay').WEPAY;

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
            if (err) return err;
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
    /**
     * return all third navigation for given app Id & second navigation Id
     *
     * @param req
     * @param res
     */
    createPayment : function(req,res){
        var credit_card_id = req.param('credit_card_id');
        var amount = req.param('amount');
        var currency = req.param('currency');


        var wepay_settings = {
            'client_id'     : '2593',
            'client_secret' : '90996683ee',
            'access_token'  : 'STAGE_a481e0e5a60ff145ff1e1abfd618cdf1cb51fcae29d42b93550798d92e4c06f2', // used for oAuth2
            // 'api_version': 'API_VERSION'
        }

        var wp = new wepay(wepay_settings);
        wp.use_staging(); // use staging environment (payments are not charged)
        wp.call('/checkout/create',
            {
                'account_id': 382331001,
                'amount': amount,
                'currency': currency.toUpperCase(),
                'short_description': 'Selling 42 Pens',
                'type': 'goods'

            },
            function(response) {
                return res.send(response);
            }
        );


    },

    /**
     * Template Category Function Start
     *
     * Given App Id return all article collections
     * @param req
     * @param res
     */

    getArticles : function(req,res) {

        var appId = req.param('appId');
        var categoryId = req.param('categoryId');
        //sails.log.info(appId);
        var searchApp = {
            appId: appId,
            categoryId : categoryId
        };
        Article.find({ select: ['appId','title','imageUrl','categoryId']}).where(searchApp).exec(function (err, result) {
            if (err) return done(err);
            //sails.log.info(result);
            res.json(result);
        });
    },

    getArticleCategoryByAppId : function(req,res) {

    var appId = req.param('appId');
    var searchApp = {
        appId: appId,
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

    /**
     * return images for given userID & appID & img ( Path + Image name )
     * @param req
     * @param res
     */
    viewImages : function(req,res){
        res.sendfile(config.APP_FILE_SERVER + req.param('userId') + '/templates/' + req.param('appId') + '/img/'+ req.param('img'));
    },

    /**
     * return template url for given userID & appID & img ( template path )
     * @param req
     * @param res
     */
    viewTemplateUrl : function(req,res){
        res.redirect(config.ME_SERVER_URL + req.param('userId') + '/templates/' + req.param('appId'));
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
        var data = req.body;
        var deviceId =  req.body.deviceId;
        var searchQuery  = {
            deviceId : deviceId
        };

        sails.log.info("deviceId " + deviceId);
        // check device id already have in db
        DeviceId.find(searchQuery).exec(function(err,result) {
            if (err) return sails.log.info(err);
            // if not device ID in db collections
            if (result.length == 0) {
                // create new Device ID Collection
                DeviceId.create(data).exec(function(err,result) {
                    if(err) return console.error(err);
                    res.send("success");
                });
            }else{
                if(err) return console.error(err);
                res.send("success");
            }
        });
    },
    authorizeNetPay: function(req,res){
        var expDate = req.body.exp_year+'-'+req.body.exp_month,
            cardNumber = req.body.number,
            cvc = req.body.cvc,
            amount = req.body.amount;

        IPGDetails.findOne({appId:req.body.appId}).exec(function(err, authorizeDetails){
            if (err) return sails.log.info(err);
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

            		//pretty print response
            		//sails.log.info(JSON.stringify(response, null, 2));

            		if(response != null){
            			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
            				if(response.getTransactionResponse().getMessages() != null){
            				    sails.log.info('Successfully created transaction with Transaction ID: ' + response.getTransactionResponse().getTransId());
            				    res.send({data:'Successfully created transaction with Transaction ID: ' + response.getTransactionResponse().getTransId(),status:'ok'});
            				}
            				else {
            					sails.log.info('Failed Transaction.');
            					if(response.getTransactionResponse().getErrors() != null){
            					    res.send({data: 'Failed Transaction',status:'error'});
            					}
            				}
            			}
            			else {
            				sails.log.info('Failed Transaction.');
            				if(response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null){
            				    res.send({data:'Failed Transaction',status:'error'});

            				}
            				else {
            					res.send({data:'Invalid Data',status:'error'});
            				}
            			}
            		}
            		else {
            			res.send({data:'Null Response.', status: 'error'});
            		}

            	});
            	if (require.main === module) {
                	authorizeCreditCard(function(){
                		sails.log.info('authorizeCreditCard call complete.');
                	});
                }
        });
    }


};