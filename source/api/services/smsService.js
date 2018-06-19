
var request = require('request'),
    error = { message : 'error' };

module.exports = {

    /**
     * Sending sms to specific mobile number
     *
     * @param data - payload - Json => {
     *                      mobile: mobile number,
     *                      pin: pin that needs to send to mobile
     *              }
     * @param callback - callback function
     **/
    sendSMS: function (data, callback) {

        // Json for callback function
        var info;

        // sms sending api url
        url = 'https://sms.textware.lk:5001/sms/send_sms.php';

        // query string for api url
        queryString = {
            username: 'simato',
            password: 'Si324Mt',
            src: 'Balamu',
            dst: data.mobile,
            msg: 'Your pin is ' + data.pin,
            dr: '1'
        };
        request({url: url, qs: queryString}, function(err, response, body) {
            if (err) {
                sails.log.error('Error occured while sending sms, error: ' + err);
                info = error;
            }
            if (typeof response !== "undefined") {
                if (response.statusCode === 200) {
                   info = { message : 'success'};
                } else {
                    info = error;
                }
            } else {
                info = error;
            }
            callback(info);
        });
    }
};