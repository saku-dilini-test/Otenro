
var request = require('request'),
    error = { message : 'error' };

module.exports = {

    /**
     * Sending sms to specific mobile number
     *
     * @param data - payload {Json} => {
     *                      url: sms gateway api url
     *                      queryString : query string for api
     *              }
     * @param callback - callback function
     **/
    sendSMS: function (data, callback) {

        // Json for callback function
        var info;

        // sms sending api url
        var url = data.url;

        // query string for the sms gateway api
        var queryString = data.queryString;

        request({url: url, qs: queryString}, function(err, response, body) {
            if (err) {
                sails.log.error('Error occurred while sending sms, error: ' + err);
                info = error;
            }
            if (typeof response !== "undefined") {
                if (response.statusCode === 200) {
                    sails.log.debug('Sms is sent successfully.');
                   info = { message : 'success'};
                } else {
                    sails.log.warn('Response from sms gateway is undefined.');
                    info = error;
                }
            } else {
                info = error;
            }
            callback(info);
        });
    }
};