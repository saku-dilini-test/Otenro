
var request = require('request');
var auth = require('./IdeaBizAuthenticatorService');
var requestObj = null;

module.exports = {

    /*
     * Send Ideabiz apicall through this methode. it will generate token automatically and call the method
     */
    sendAPICall: function(url,method,dataBody,contentType,accept,callback){
        sails.log.debug("Call sendAPICall with params, url: " + url + " method: " + method + " body: " + dataBody + " contentType: " + contentType + " accept: " + accept);
        var thisCtrl = this;

        if(auth.getAccessToken()===null){
            sails.log.debug("Access Token is null, hence renew the Token");
            thisCtrl.renewTokenAndSendAPICall(url,method,dataBody,contentType,accept,callback);
        }else{
            sails.log.debug("Access Token is: " + auth.getAccessToken());

            var requestObj = {
                'url': url,
                'method': method,
                'body': dataBody,
                'headers': {
                    'content-type': contentType,
                    'Accept': accept,
                    'Authorization': 'Bearer ' + auth.getAccessToken(),
                    'Connection' : 'keep-alive'
                }
            };

            thisCtrl.requestObj = requestObj;

            sails.log.debug("requestObj:" + JSON.stringify(requestObj,null,2));

            request(requestObj, function(err, response, body) {
                thisCtrl.requestCallbackContinue(err, response, body, callback);
            });
        }
    },
    /*
        Don't use this method directly, use sendAPICall method instead
     */
    renewTokenAndSendAPICall: function(url,method,dataBody,contentType,accept,callback){
        sails.log.debug("Call renewTokenAndSendAPICall with params, url: " + url + " method: " + method + " body: " + dataBody + " contentType: " + contentType + " accept: " + accept);

        var thisCtrl = this;

        auth.renewToken(function(tokenInfo,err){
            if(err){
                sails.log.error("Error after renew the Token: " + err);
                return callback(null,err);
            }

            var requestObj = {
                'url': url,
                'method': method,
                'body': dataBody,
                'headers': {
                    'content-type': contentType,
                    'Accept': accept,
                    'Authorization': 'Bearer ' + auth.getAccessToken(),
                    'Connection' : 'keep-alive'
                }
            };

            thisCtrl.requestObj = requestObj;

            sails.log.debug("requestObj:" + JSON.stringify(requestObj,null,2));

            request(requestObj, function(err, response, body) {
                thisCtrl.requestCallbackContinue(err, response, body, callback);
            });
        });
    },

    requestCallbackContinue: function(err, response, body, callback) {
        sails.log.debug('In requestCallbackContinue=>');
        sails.log.debug('err:',err);
        sails.log.debug('response:',response);
        if (err) {
            sails.log.error('Error while requesting the IdeaBiz api: ' + this.requestObj.url  + " err: " + err);
            return callback(null,err);
        }

        if (response.statusCode === 401 && (body.indexOf('Expired')>0 || body.indexOf('Access Token Inactive')>0)){
            sails.log.debug("body: " + body);
            if(!this.requestObj){
                sails.log.error('requestObj is null which can not send the request requestObj: ' + JSON.stringify(this.requestObj,null,2));
                return callback(null,{ message: 'Error' });
            }

            sails.log.debug('Expired Token hence renew the Token');
            this.renewTokenAndSendAPICall(this.requestObj.url,
                                              this.requestObj.method,
                                              this.requestObj.body,
                                              this.requestObj.headers['content-type'],
                                              this.requestObj.headers.Accept,
                                              callback);
            return;
        }

        if (response.statusCode !== 200) {
            sails.log.error('api response body is: ' + JSON.stringify(body));
            return callback(response,null);
        }
        callback(response,null);
    }


};

