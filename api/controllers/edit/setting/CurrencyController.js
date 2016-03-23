/**
 * CurrencyController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    setCurrency : function(req,res){

        var data = {
            appSettings:{
                'appCurrency': req.body.currencySign,
                'appCurrencyName': req.body.currency
            }
        };

        var query = {id:req.body.appId};
        Application.update(query,data).exec(function(err, appProduct) {
            if (err) res.send(err);
            res.send({
                appId: appProduct,
                message: "Successfully added the currency!!!"
            });
        });
    },
     getCurrency : function(req,res){
 var appId = req.param('appId');
 console.log(appId);
        var searchApp = {
            id: appId
        };
             Application.find(searchApp, function(err, app) {
                        if (err) return done(err);
                        res.send(app);
                        console.log("app "+ app);
                    });
        }

};