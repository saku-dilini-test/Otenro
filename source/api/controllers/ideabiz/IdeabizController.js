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

            res.ok({ 'isSubscribed': isSubscribed, 'msisdn':msisdn});
        });


    }
};