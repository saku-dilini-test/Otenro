/**
 * CurrencyController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    setCurrency : function(req,res){

        var data = {
            appSettings:{
                'appCurrency': req.body.currency
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
    }

};