/**
 * Created by thusithz on 3/11/16.
 */
(function() {
    angular.module('appEdit').factory('mySharedService', function($rootScope,$cookieStore) {
        var sharedService = {};

        sharedService.url = '';

        sharedService.prepForBroadcast = function(url,updateLocationOfApp,updateInfo) {
            this.url = url;
            $cookieStore.put('url', url);
            this.updateLocationOfApp = updateLocationOfApp;
            this.updateInfo = updateInfo;
            this.broadcastItem();
        };

        sharedService.broadcastItem = function() {
            $rootScope.$broadcast('handleBroadcast');
        };
        return sharedService;
    });
})();

