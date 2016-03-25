/**
 * Created by udeshikaperera on 10/11/2015.
 */
var requestify = require('requestify'),
    moment =require('moment');


module.exports.schedule = {
  sailsInContext : true, //If sails is not as global and you want to have it in your task
  tasks : {
    firstTask : {
      cron : "0 0 10 * * *",
      task : function (context, sails)
      {
        requestify.get('https://openexchangerates.org/api/latest.json?app_id=2803e21ef55841999f956ee6df7740a5&base=USD')          .then(function(response) {
            var data = JSON.parse(response.body);
            var currencyUS = { "USDLKR" : data.rates.LKR };
            currencyUS['type'] = 'USD';
            Currency.findOne({type: 'USD'}).exec(function(err,currency){
              if (err) sails.log.error(err);

              if(currency){
                currency.USDLKR = data.rates.LKR;
                Currency.update({type: 'USD'},currency).exec(function(err,updatedCurrency){
                  sails.log.info("Currency successfully updated! ");
                })
              } else {
                Currency.create(currencyUS).exec(function(err,currency){
                  if (err) sails.log.error(err);
                })
              }
            });
            //Currency.create(currency).exec(function (err, currency) {
            //  sails.log.info(currency);
            //});
          });
      },
      context : {}
    }
  }
};
