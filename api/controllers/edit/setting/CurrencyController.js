/**
 * CurrencyController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

//    setCurrency : function(req,res){
//
//        var data = {
//         appSettings:{
//            appCurrency:{
//                'currency': req.body.currency,
//                'sign': req.body.currencySign
//            }
//         }
//        };
//
//        var query = {id:req.body.appId};
//        Application.update(query,data).exec(function(err, appProduct) {
//            if (err) res.send(err);
//            res.send({
//                appId: appProduct,
//                message: "Successfully added the currency!!!"
//            });
//        });
//    },
//
//    getCurrency : function(req,res){
//        var appId = req.param('appId');
//        var searchApp = {
//            id: appId
//        };
//        Application.find(searchApp, function(err, app) {
//            if (err) return done(err);
//            var currency = app[0].appSettings.appCurrency
//            res.send(currency)
//        });
//    },

    getAllCurrency: function(req,res){
         Currency.find().exec(function(err, app) {
              if (err) res.send(err);
              res.send(app);
         });
    }
};