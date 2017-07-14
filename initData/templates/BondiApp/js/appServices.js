// --- app services js ---
(function() {
    angular.module('starter.services', [])
        .service('appServices', ['$rootScope','$http','constants',appServices]);

    function appServices($rootScope,$http,constants){
        return {
            getAllMenuByAppId: function (appId) {
                return $http.get(constants.server_url + 'cmd=getSpecificChild&appId='+appId);
            },
            getAllItemByAppId: function (appId) {
                return $http.get(constants.server_url + 'cmd=getProductsByAppId&appId='+appId);
            },
            getAllItemsByMenuId: function (menuId,appId) {
                return $http.get(constants.server_url + 'cmd=getThirdBySecondId&appId='+appId+'&childId='+menuId);
            },
            getItemById: function (itemId) {
                return $http.get(constants.server_url + 'cmd=getProductById&productId='+itemId);
            },
            getContactUsByAppId: function (appId) {
                return $http.get(constants.server_url + 'cmd=getContactUs&appId='+appId);
            },
            getCurrencyByAppId: function (appId) {
                return $http.get(constants.server_url + 'cmd=getCurrency&appId='+appId);
            },
            saveDeviceID : function (data) {
                return $http.post(constants.SERVER_URL + '/templates/postDeviceId',data)
            },
            imageLoading: function(userId,appId,name,imageId){
                return $http.get(constants.server_url + "cmd=viewImages&userId="+userId+"&appId="+appId+"&"+new Date().getTime()+"&img="+name+imageId)
            }
        }
    }

})();