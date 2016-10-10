// --- app services js ---
(function() {
    angular.module('starter.services', [])
        .service('appServices', ['$rootScope','$http','constants',appServices]);

    function appServices($rootScope,$http,constants){
        return {
            getAllMenuByAppId: function (appId) {
                return $http.get(constants.SERVER_URL + '/templates/getSpecificChild?appId='+appId);
            },
            getAllItemByAppId: function (appId) {
                return $http.get(constants.SERVER_URL + '/templates/getProductsByAppId?appId='+appId);
            },
            getAllItemsByMenuId: function (menuId,appId) {
                return $http.get(constants.SERVER_URL + '/templates/getProductsByCatId?appId='+appId+'&childId='+menuId);
            },
            getItemById: function (itemId) {
                return $http.get(constants.SERVER_URL + '/templates/getProductById?productId='+itemId);
            },
            getContactUsByAppId: function (appId) {
                return $http.get(constants.SERVER_URL + '/templates/getContactUs?appId='+appId);
            },
            getCurrencyByAppId: function (appId) {
                return $http.get(constants.SERVER_URL + '/templates/getCurrency?appId='+appId);
            },
            saveDeviceID : function (data) {
                return $http.post(constants.SERVER_URL + '/templates/postDeviceId',data)
            }
        }
    }

})();