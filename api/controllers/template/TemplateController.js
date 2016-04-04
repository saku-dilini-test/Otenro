/**
 * Created by thusithz on 2/24/16.
 */
/**
 * TemplateController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

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

    getSubChildById : function(req,res){

        var productId = req.param('productId');
        var searchApp = {
            id: productId
        };

        ThirdNavigation.find(searchApp).exec(function(err, app) {
            if (err) return done(err);
            res.json(app);
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

    getThirdBySecondId : function(req,res){

        var searchApp = {
            childId: req.body.category
        };
        var secondSearch={};

        if(req.body.appId){
            secondSearch.appId =req.body.appId;
        }
        ThirdNavigation.find().where({ $or : [searchApp,secondSearch]}).exec(function(err, app) {
           if (err) return done(err);
             res.json(app);
        });
    },

    /**
     * return all third navigation for given app Id & second navigation Id
     *
     * @param req
     * @param res
     */
    getThirdBySecondIdForGetRequest : function(req,res){
        var appId = req.param('appId');
        var childId = req.param('childId');
        var searchApp = {
            appId: appId,
            childId : childId
        };
        ThirdNavigation.find().where(searchApp).exec(function(err, app) {
            if (err) return done(err);
            res.json(app);
        });


    },

    viewImages : function(req,res){
       res.sendfile(config.ME_SERVER + req.param('userId') + '/templates/' + req.param('appId') + '/img/'+ req.param('img'));
    }
};