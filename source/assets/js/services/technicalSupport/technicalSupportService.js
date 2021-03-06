/**
 * Created by prasanna on 2016/09/19.
 **/
(function() {
    angular.module('appEdit').service('technicalSupportService', [
        '$mdDialog', '$http', '$rootScope', 'SERVER_URL','$q', technicalSupportService
    ]);

    function technicalSupportService($mdDialog, $http, $rootScope, SERVER_URL, $q) {
        return {

            getAllAppData: function(){
                return $http.get(SERVER_URL + 'edit/getAllAppsData');
            },

            getUserApps : function (data) {

                return $http.post(SERVER_URL + 'edit/getUserApps',data);
            },

            getPublishDetails : function(data){
                return $http.post(SERVER_URL + 'edit/getPublishDetails',data);
            },
            getPushConfigDetails : function(appId){
                return $http.get(SERVER_URL + 'edit/getPushConfigDetails?appId='+appId);
            },
            getAlluserData: function(){
                            return $http.get(SERVER_URL + 'edit/getAlluserData');
            },
            getAllAduserData: function(){
                return $http.get(SERVER_URL + 'edit/getAllAduserData');
            },
            getAllAddNetworks: function(){
                return $http.get(SERVER_URL + 'edit/getAllAddNetworksData');
            },
            savePushConfigDetails : function(data){
                return $http.post(SERVER_URL + 'edit/savePushConfigDetails',data);
            },
            changePublishStatus : function(data){
                return $http.post(SERVER_URL + 'edit/changePublishStatus',data);
            },
            saveAdNetwork : function(data){
                return $http.post(SERVER_URL + 'edit/saveAdNetwork',data);
            },
            deleteAdNetwork : function(data){
                return $http.post(SERVER_URL + 'edit/deleteAdNetwork',data);
            },
            getAdNetworkData : function(adname){
                return $http.get(SERVER_URL + 'edit/getAdNetwork?addname='+adname);
            },
        };
    }
})();



