/*
    This is to Unsubscribe the msisdn via API call
    API Ref: http://docs.ideabiz.lk/APIs/SubscriptionAPI
*/

var request = require('request');
var ideaBizAPIHandlerService = require('./IdeaBizAPIHandlerService');
var unsubscriptionUrl = "https://ideabiz.lk/apicall/subscription/v3/unsubscribe";



module.exports = {

    unsubscribe: function(method,msisdn,serviceId,callback){
        sails.log.debug("IdeaBizSubscriptionAPIService: In unsubscribe: method:%s msisdn:%s serviceId:%s",method,msisdn,serviceId);
        var  body = {
            "method":method,
            "msisdn": msisdn,    
            "serviceID": serviceId  
        };

        ideaBizAPIHandlerService.sendAPICall(unsubscriptionUrl,
            'POST',
            JSON.stringify(body),
            'application/json',
            'application/json',
            function(responseBody, err){
                return callback(responseBody,err);
            });
    }
};

