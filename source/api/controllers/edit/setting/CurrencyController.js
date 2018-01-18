    /**
 * CurrencyController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    setCurrency : function(req,res){

        var appId = req.body.appId;

        var appSettings = null;
        var searchApp = {
            id: appId
        };
        Application.find(searchApp, function(err, app) {
            appSettings = app[0].appSettings;
            appSettings.appCurrency.currency = req.body.currency;
            appSettings.appCurrency.sign = req.body.currencySign;
            appSettings.appCurrency.symbol = req.body.currencySymbol;

            Application.update(searchApp,app[0]).exec(function(err, appProduct) {
                if (err) res.send(err);
                res.send({
                    app: appProduct,
                    message: "Currency Successfully added"
                });
            });
        });

    },

   getCurrency : function(req,res){
       var appId = req.param('appId');
       var searchApp = {
           id: appId
       };
       Application.find(searchApp, function(err, app) {
           if (err) return done(err);
           var currency = app[0].appSettings.appCurrency.sign;
           res.send(currency)
       });
   },

    getAllCurrency: function(req,res){

    var sort = { currency: 1 };
         Currency.find().sort(sort).exec(function(err, app) {
              if (err) res.send(err);
              res.send(app);
         });
    }
};