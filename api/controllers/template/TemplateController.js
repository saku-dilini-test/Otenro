/**
 * Created by thusithz on 2/24/16.
 */
/**
 * TemplateController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs-extra');


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
        console.log(searchApp);
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
        console.log(searchApp);
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
        console.log(searchApp);
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
             //if (err) console.log(err);
            // if(variants != undefined){
                /*app.price = variants.price;
                app.quantity = variants.quantity;
                app.size = variants.size;*/
              //   app.variants = variants;
              //   console.log( "variants " + JSON.stringify(variants));
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
            childId : childId
        };
        var thirdNavi = [];
        ThirdNavigation.find().where(searchApp).exec(function(err, app) {
            if (err) return done(err);
            return res.send(app);
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

        var appId = req.param('appId');
        var categoryId = req.param('categoryId');
        //console.log(appId);
        var searchApp = {
            appId: appId,
            categoryId : categoryId
        };
        Article.find({ select: ['appId','title','imageUrl','categoryId']}).where(searchApp).exec(function (err, result) {
            if (err) return done(err);
            //console.log(result);
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
        var appId  = req.param('appId');
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

        //console.log("run run");
        fs.remove(config.ME_SERVER+ userId +'/templates/'+appId+'/', function (err) {

            if (err) {
                console.error(err);
            }
        });

        res.send(200,{message:'Deleted Application'});


    }


};