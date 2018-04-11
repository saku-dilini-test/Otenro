/**
 * Created by thusithz on 3/11/16.
 */
(function() {
    angular.module('appEdit').factory('mySharedService', function($rootScope,$cookies,SERVER_URL) {
        var sharedService = {};

        sharedService.url =  '';


        sharedService.prepForBroadcast = function(url,updateLocationOfApp,updateInfo ,userId, appId) {
            if (typeof userId!='undefined'&& typeof appId!='undefined'){
                this.url = SERVER_URL+'templates/viewTemplateUrl?' +
                    "userId="+userId +"&appId="+appId+
                    "&1489142330441//?1489142330441";
                $cookies.put('url', this.url);
                this.updateLocationOfApp = updateLocationOfApp;
                this.updateInfo = updateInfo;
                this.broadcastItem();
            }else {
                console.log(url)
                this.url = url;
                $cookies.put('url', url);
                sharedService.url = url;
                this.updateLocationOfApp = updateLocationOfApp;
                this.updateInfo = updateInfo;
                this.broadcastItem();
            }

        };

        sharedService.broadcastItem = function() {
            $rootScope.$broadcast('handleBroadcast',sharedService.url);
        };
        return sharedService;
    });
})();

