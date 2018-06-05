/**
 * IdeabizController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    isSubscribed: function(req,res){
        var msisdn = req.param("msisdn");
        var appID = req.param("appId");

        var query = {
            'msisdn': msisdn,
            'appID': appID,
//            'status': config.APP_USER_STATUS.ACTIVE,
//            'subscriptionStatus': config.IDEABIZ_SUBSCRIPTION_STATUS.SUBSCRIBED
        };

        AppUser.findOne(query).exec(function(err, appUser){
            if(err){
                sails.log.error("Error while checking App User Status, error: " + err);
                return res.serverError(err);
            }

            var isSubscribed = false;

            if(appUser){
                isSubscribed = false;
            }

            res.ok({ 'isSubscribed': isSubscribed, 'msisdn':msisdn});
        });


    }
};