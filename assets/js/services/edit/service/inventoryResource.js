/**
 * Created by shamilaSallay on 26/08/2015.
 */

/**
 * Handle the backend Inventory services.
 */
(function() {
    angular.module('appEdit').service('inventoryService', ['SERVER_URL','$resource',inventoryService]);
    function inventoryService(SERVER_URL,$resource) {
        return $resource(SERVER_URL+'edit/getInventoryList',{appId:"@appId"})
    }
})();