var config = require('../../services/config');
var dateFormat = require('dateformat');

/**
 * IdeabizController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    isSubscribed: function(req,res){
        var msisdn = req.param("msisdn");
        var uuId = req.param("uuId");
        var appId = req.param("appId");
        console.log(uuId);
        var query;

        if(uuId){
            query = {
                'deviceUUID': uuId,
                'appId': appId,
                //            'status': config.APP_USER_STATUS.ACTIVE,
                //            'subscriptionStatus': config.IDEABIZ_SUBSCRIPTION_STATUS.SUBSCRIBED
            };
        }else{
            query = {
                'msisdn': msisdn,
                'appId': appId,
                //            'status': config.APP_USER_STATUS.ACTIVE,
                //            'subscriptionStatus': config.IDEABIZ_SUBSCRIPTION_STATUS.SUBSCRIBED
            };
        }

        console.log("query");
        console.log(query);
        AppUser.findOne(query).exec(function(err, appUser){
            if(err){
                sails.log.error("Error while checking App User Status, error: " + err);
                return res.serverError(err);
            }
            console.log("appUser");
            console.log(appUser);
            var msisdn = "";
            var isSubscribed = false;

            if(appUser && appUser.msisdn && appUser.subscriptionStatus===config.IDEABIZ_SUBSCRIPTION_STATUS.SUBSCRIBED.code){
                var paymentQuery = {
                    appId: appId,
                    msisdn: appUser.msisdn,
                    status: 1,
                    date: dateFormat(new Date(), "yyyy-mm-dd")
                };

                console.log("paymentQuery: " + JSON.stringify(paymentQuery,null,2));

                SubscriptionPayment.findOne(paymentQuery).exec(function (err, payment) {
                    if (err){
                        sails.log.error("Error when searching for a payment for the details: " + JSON.stringify(paymentQuery));
                    }

                    if(payment){
                        isSubscribed = true;
                        msisdn = appUser.msisdn;
                    }
                    res.ok({ 'isSubscribed': isSubscribed, 'msisdn':msisdn});
                });
            }else{
                res.ok({ 'isSubscribed': isSubscribed, 'msisdn':msisdn});
            }
        });


    },

    getAppStatus : function (req,res){

        var appId = req.body.appId;
        var query = {id:appId};

        Application.findOne(query).exec(function(err, app){
            if(err) res.send(err);
            else{

                res.send({isActive : app.isActive});
            }
        });
    }
};