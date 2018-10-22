/**
 * This servicce is use to keep track of the Charging Calls made by the system for AppIds and MSISDNs.
 * This will basically check whether there is an Charging request being processing for a partucular AppId and msisdn,
 * then this will prevent multiple charging requests for the Same AppID and msisdn.
 * So basically no multiple Charging calls will occure at the same time.
 * So single charging request should always process and The current charging request must finish before request a another Charging API call.
 *
 * So the format to add the values to the map is <appId>_<msisdn>
 * The map IDEABIZ_PAYMENT_CALLS_MAP will be in the memory and the map will get reset in each sails restart(would be fine).
 *
 * IdeabizChargingAPICallLogService
 *
 * @type {Object}
 */

var IDEABIZ_PAYMENT_CALLS_MAP = new Object();//This array contains the appID and msisdn which is currently being processing (<appId>_<msisdn>)

module.exports = {
    /**
     * Will add the <appId>_<msisdn> to the map
     * @param appid
     * @param msisdn
     */
    addToChargingMap: function(appId,msisdn){
        var requestObj = {
          'key' : appId + '_' + msisdn,
          'isInProgress' : true
        };
        sails.log.debug('IdeabizChargingAPICallLogService: addToChargingMap requestObj:', JSON.stringify(requestObj));
        IDEABIZ_PAYMENT_CALLS_MAP[appId + '_' + msisdn] = requestObj;
    },

    /**
     * Will check whether an <appId>_<msisdn> already exists in the map, will ensure whether there is a Charging request
     * being processing or not.
     * @param appid
     * @param msisdn
     * @returns {boolean}
     */
    isAppIdMSISDNExistsInChargingMap: function(appId,msisdn){
        return IDEABIZ_PAYMENT_CALLS_MAP.hasOwnProperty(appId + '_' + msisdn);
    },

    /**
     * Will set isInProgress flag for a specific <appId>_<msisdn>
     * @param appId
     * @param msisdn
     * @param isInProgress
     */
    setInProgress: function(appId,msisdn,isInProgress){
        var req = this.getChargingRequestByAppIdMSISDN(appId,msisdn);
        if(req){
            req.isInProgress = isInProgress;
        }else{
            sails.log.debug('IdeabizChargingAPICallLogService: no Charging Request Object for appId: %s msisdn: %s to set isInProgress as :',appId,msisdn,isInProgress);
        }
    },

    /**
     * Check whether the Charging request made is currently in progress for a specific <appId>_<msisdn>
     * @param appId
     * @param msisdn
     */
    isInProgress: function(appId,msisdn){
        var req = this.getChargingRequestByAppIdMSISDN(appId,msisdn);
        if(req){
            return req.isInProgress;
        }
        return false;
    },

    /**
     * Will return the request obj for specific <appId>_<msisdn>
     * @param appId
     * @param msisdn
     */
    getChargingRequestByAppIdMSISDN: function(appId,msisdn){
        if(IDEABIZ_PAYMENT_CALLS_MAP.hasOwnProperty(appId + '_' + msisdn)){
            return IDEABIZ_PAYMENT_CALLS_MAP[appId + '_' + msisdn];
        }
        return null;
    },

    /**
     * Remove <appId>_<msisdn>
     * Will remove from the map if the Charging request Success/Failed
     * @param appid
     * @param msisdn
     */
    removeFromChargingMap: function(appId,msisdn){
        if(IDEABIZ_PAYMENT_CALLS_MAP[appId + '_' + msisdn]) {
            delete IDEABIZ_PAYMENT_CALLS_MAP[appId + '_' + msisdn];
            sails.log.debug('IdeabizChargingAPICallLogService: removeFromChargingMap appId_msisdn:', appId + '_' + msisdn);
        }
    },

    /**
     * Reset Charging Map
     * Will remove from the map if the Charging request Success/Failed
     * @param appid
     * @param msisdn
     */
    resetChargingMap: function(){
        sails.log.debug('IdeabizChargingAPICallLogService: resetChargingMap');
        IDEABIZ_PAYMENT_CALLS_MAP = [];
    },

    /**
     * Will Print the current map to the console log
     */
    getCurrentChargingMap: function(){
        return IDEABIZ_PAYMENT_CALLS_MAP;
    }

};
