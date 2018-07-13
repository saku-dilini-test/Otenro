
var request = require('request');
var ideaBizAPIHandlerService = require('./IdeaBizAPIHandlerService');
var pinVerificationUrl = "https://ideabiz.lk/apicall/pin/verify/v1/verify";
var submitPinUrl = "https://ideabiz.lk/apicall/pin/verify/v1/submitPin";
var getBalanceUrl = "https://ideabiz.lk/apicall/balancecheck/v3.1/msisdn/transactions/amount/balance";
var getPaymentUrl = "https://ideabiz.lk/apicall/payment/v4/msisdn/transactions/amount";

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
    },


    getBalance: function(msisdn,callback){
        var  body = {};
        getBalanceUrl = getBalanceUrl.replace("msisdn",msisdn)
        ideaBizAPIHandlerService.sendAPICall(getBalanceUrl,
            'GET',
            JSON.stringify(body),
            'application/json',
            'application/json',
            function(responseBody, err){
                return callback(responseBody,err);
            });
    },
    chargeUser: function(msisdn,serviceID,amount,callback){

        var  body = {
            "amountTransaction": {
                "clientCorrelator": "54321",
                "endUserId": "tel:+"+msisdn,
                "paymentAmount": {
                    "chargingInformation": {
                        "amount": amount,
                        "currency": "LKR",
                        "description": "appMaker registration charge"
                    },
                    "chargingMetaData": {
                        "onBehalfOf": "appMaker",
                        "purchaseCategoryCode": "Service",
                        "channel": "WAP",
                        "taxAmount": "0",
                        "serviceID": serviceID
                    }
                },
                "referenceCode": "REF-12345",
                "transactionOperationStatus": "Charged"
            }
        };
        getPaymentUrl = getPaymentUrl.replace("msisdn",msisdn);
        ideaBizAPIHandlerService.sendAPICall(getPaymentUrl,
            'POST',
            JSON.stringify(body),
            'application/json',
            'application/json',
            function(responseBody, err){
                return callback(responseBody,err);
            });
    }




};

