
var request = require('request');
var config = require('./config');

var IDEABIZ_AUTH_CONSUMER_KEY = config.IDEABIZ_AUTH_CONSUMER_KEY;
var IDEABIZ_AUTH_CONSUMER_SECRET =  config.IDEABIZ_AUTH_CONSUMER_SECRET;
var IDEABIZ_AUTH_USERNAME = config.IDEABIZ_AUTH_USERNAME;
var IDEABIZ_AUTH_PASSWORD = config.IDEABIZ_AUTH_PASSWORD;
var AUTH_SCOPE = 'PRODUCTION';
var authUrl = "https://ideabiz.lk/apicall/";

var expiresIn = null;
var accessToken = null;
var refreshToken = null;
var basic = null;

var name = "chamil";

module.exports = {

    createNewtoken: function(callback){
        sails.log.debug("Call createNewtoken");
        var thisCtrl = this;
        var headers = this.getHeaders();

        var url = authUrl + "token?grant_type=password&username="  + encodeURI(IDEABIZ_AUTH_USERNAME) + "&password=" + encodeURI(IDEABIZ_AUTH_PASSWORD) + "&scope=" + AUTH_SCOPE;

        var requestObj = {
            'url': url,
            'method': 'POST',
            'headers': headers
        };

        console.log("requestObj: " + JSON.stringify(requestObj,null,2));

        request(requestObj, function(err, response, body) {
            if (err) {
                sails.log.error('Error while requesting the IdeaBiz token status: ' + err.status + " body: " + err.body);
                callback(null,err);
                return;
            }

            if (response.statusCode !== 200) {
                sails.log.error('Unsuccessfull token response body: ' + body);
                callback(null,{ 'err': 'Unsuccessfull token response body: ' + body });
                return;
            }

            body = JSON.parse(body);
            thisCtrl.setTokenInfo(body);
            callback(body,null);
        });
    },

    //These info will retain in the sails global session
    setTokenInfo: function(body){
        expiresIn = body.expires_in;
        accessToken = body.access_token;
        refreshToken = body.refresh_token;
    },

    renewToken: function(callback){
        sails.log.debug("Call renewToken");

        if(this.getAccessToken()===null){
            sails.log.debug("Create new Token since there is no Access Token");
            this.createNewtoken(function(data,err){
                callback(data,err);
            });
            return;
        }

        var thisCtrl = this;
        var headers = this.getHeaders();

        var url = authUrl + "token?grant_type=refresh_token&refresh_token="  + this.getRefreshToken() + "&scope=" + AUTH_SCOPE;

        var requestObj = {
            'url': url,
            'method': 'POST',
            'headers': headers
        };

        console.log("requestObj: " + JSON.stringify(requestObj,null,2));

        request(requestObj, function(err, response, body) {
            if (err) {
                sails.log.error('Error while requesting the IdeaBiz token status: ' + err.status + " body: " + err.body);
                callback(null,err);
                return;
            }

            if (response.statusCode === 400 && body.indexOf('invalid_grant') > 0) {
                sails.log.debug("Create new Token since there is a 400 status code and it is a invalid grant request");
                thisCtrl.createNewtoken(function(data,err){
                    callback(data,err);
                });
                return;
            }else if(response.statusCode !== 200){
                sails.log.error('Unsuccessfull token response body: ' + body);
                callback(null,{ 'err': 'Unsuccessfull token response body: ' + body });
                return;
            }

            body = JSON.parse(body);
            thisCtrl.setTokenInfo(body);
            callback(body,null);
        });
    },

    getAccessToken: function(){
        if(accessToken){
            return accessToken;
        }
        return null;
    },

    getRefreshToken: function(){
        if(refreshToken){
            return refreshToken;
        }
        return null;
    },

    getHeaders: function(){
        var authHeaderVal = this.getBasicAuthHeaderValue();
        var headers = {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + authHeaderVal
        };
        return headers;
    },

    getBasicAuthHeaderValue: function(){
        if(basic){
            return basic;
        }

        basic = Buffer.from(IDEABIZ_AUTH_CONSUMER_KEY + ":" + IDEABIZ_AUTH_CONSUMER_SECRET).toString('base64');

        return basic;
    },

    setName: function(name){
        console.log("setName: " + name);
        this.name = name;
    },

    getName: function(){
        console.log("getName: " + this.name);
    }
};

