// --- app services js ---
(function() {
    angular.module('starter.services', [])
        .service('appServices', ['$rootScope','$http','constants',appServices]);

    function appServices($rootScope,$http,constants){
        return {
            getAllMenuByAppId: function () {
                return $http.get(constants.SERVER_URL + '/templates/getSpecificChild?appId='+$rootScope.appId);
            },
            getAllItemByAppId: function () {
                return $http.get(constants.SERVER_URL + '/templates/getProductsByAppId?appId='+$rootScope.appId);
            },
            getAllItemsByMenuId: function (menuId) {
                return $http.get(constants.SERVER_URL + '/templates/getProductsByCatId?appId='+$rootScope.appId+'&childId='+menuId);
            },
            getItemById: function (itemId) {
                return $http.get(constants.SERVER_URL + '/templates/getProductById?productId='+itemId);
            },
            getContactUsByAppId: function () {
                return $http.get(constants.SERVER_URL + '/templates/getContactUs?appId='+$rootScope.appId);
            }
        }
    }

})();