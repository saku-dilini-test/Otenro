/**
 * Created by shamilaSallay on 26/08/2015.
 */


(function() {
    angular.module('appEdit').service('inventoryService', [
         '$http','$rootScope','SERVER_URL',inventoryService
    ]);

    function inventoryService( $http,$rootScope,SERVER_URL) {
        return {

         getInventoryList: function(){
                        return $http.get(SERVER_URL+ 'edit/getInventoryList?appId='+$rootScope.appId);
                    },
        }
    }
})();