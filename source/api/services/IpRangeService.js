/**
 * Created by madhuranga on 2/11/19.
 */

var  ipRangeCheck = require("ip-range-check"),
     error = { message : 'error' };
module.exports = {

    /**
     * check if an IP matches one or more IP's or Classless Inter-Domain Routing ranges
     *
     * @param data - payload {Json} => {
     *                      req.ip: client ip
     *              }
     * @param callback - callback function
     **/
    getOperatorByIpRange: function (req, callback) {

        var responseData = {};

        IpRange.find().exec(function (err, ipRange) {
            if (err) {
                sails.log.error('Error occurred while checking ip range , error: ' + err);
                responseData = error;
                return callback(responseData);

            }else {
                for(var j = 0; j < ipRange.length; j++) {
                   if (cb(req.ip,ipRange[j])){
                       responseData = ipRange[j];
                       responseData.message = "success";
                       return callback(responseData);
                      break;
                   }
                }
                responseData.message = "Unable to find the ip range";
                return callback(responseData);
            }
        });
    }
};

var cb = function(ip ,ipRangeData) {
    console.log(ipRangeData.ipRange + " " + ip);
    if (ipRangeCheck(ip, ipRangeData.ipRange)){
        return true;
    }else {
        return false;
    }
}