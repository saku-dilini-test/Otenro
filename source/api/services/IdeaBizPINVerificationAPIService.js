
var request = require('request');
var ideaBizAPIHandlerService = require('./IdeaBizAPIHandlerService');
var pinVerificationUrl = "https://ideabiz.lk/apicall/pin/verify/v1/verify";
var submitPinUrl = "https://ideabiz.lk/apicall/pin/verify/v1/submitPin";

module.exports = {

    verificationRequest: function(msisdn,callback){
        var  body = {
            "method":"ANC",
            "msisdn":msisdn
        };

        ideaBizAPIHandlerService.sendAPICall(pinVerificationUrl,
            'POST',
            JSON.stringify(body),
            'application/json',
            'application/json',
            function(responseBody, err){
                return callback(responseBody,err);
            });
    },
    submitPin: function(pin,serverRef,callback){
        var  body = {
            "pin": pin,
            "serverRef": serverRef
        };

        ideaBizAPIHandlerService.sendAPICall(submitPinUrl,
            'POST',
            JSON.stringify(body),
            'application/json',
            'application/json',
            function(responseBody, err){
                return callback(responseBody,err);
            });
    }

};

