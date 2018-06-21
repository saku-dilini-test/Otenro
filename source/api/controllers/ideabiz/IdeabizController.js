
var ideaBizAPIHandlerService = require('../../services/IdeaBizAPIHandlerService');
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

            if(appUser){
                isSubscribed = true;
                msisdn = appUser.msisdn;
            }

            res.ok({ 'isSubscribed': true, 'msisdn':msisdn});
        });


    },

    setName: function(req,res){
        // ideaBizAuthenticatorService.createNewtoken(function(responseBody, err){
        //     if(err){
        //         return res.serverError(err);
        //     }
        //     res.ok(responseBody);
        // });
    },

    printName: function(req,res){
        var headers = {
            'content-type': 'application/json',
            'Accept': 'application/json'
        };

        var requestObj = {
            'url': "https://ideabiz.lk/apicall/pin/verify/v1/verify",
            'method': 'POST',
            'data': {
                "method":"ANC",
                "msisdn":"94772070947"
             },
            'headers': headers
        };

        ideaBizAPIHandlerService.sendAPICall(requestObj, function(responseBody, err){
            if(err){
                return res.serverError(err);
            }
            res.ok(responseBody);
        });
    }
};