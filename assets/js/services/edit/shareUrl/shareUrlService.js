/**
 * Created by thusithz on 3/11/16.
 */
(function() {
    angular.module('appEdit').factory('mySharedService', function($rootScope) {

        var sharedService = {};

        sharedService.url = '';

        sharedService.prepForBroadcast = function(url,updateInfo) {
            this.url = url;
            this.updateInfo = updateInfo;
            this.broadcastItem();
        };

        sharedService.broadcastItem = function() {
            $rootScope.$broadcast('handleBroadcast');
        };

        return sharedService;
    });
})();

