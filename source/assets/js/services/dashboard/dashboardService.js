/**
 * Created by udeshikaperera on 24/08/2015.
 */
(function(){
    angular.module('app').factory('dashboardService',[
        '$http','SERVER_URL','$log',dashboardService]);

    function dashboardService($http,SERVER_URL,$log){
        return{
            getAllApps:function(){
                return $http.post(SERVER_URL+ 'app/dashboard/allApps');
            },
            getAllAppsForDashboard:function(){
                return $http.post(SERVER_URL+ 'app/dashboard/allAppsForDashboard');
            },
            getTemplatesData:function(appParams){
                return $http.post(SERVER_URL + 'api/dashboard/getTemplatesData', appParams);
            },
            getAllCategory:function(appParams){
                return $http.post(SERVER_URL +'api/dashboard/getAllCategory', appParams);
            },
            getSelectedCategory:function(appParams){
                return $http.post(SERVER_URL +'api/dashboard/getSelectedCategory', appParams);
            },
            getSelectedCategoryDashboard:function(appParams){
                return $http.post(SERVER_URL +'api/dashboard/getSelectedCategoryDashboard', appParams);
            },
            getTemplateMetaData:function(templateCategoryId){
                return $http.get(SERVER_URL +'api/getTemplateMetaData?templateCategoryId='+templateCategoryId);
            },
            getApplicationData : function(appId){
                $log.debug("appId appId appId " + appId)
            return  $http.get(SERVER_URL + 'edit/getApplicationData?appId='+appId);
        }
        }
    }
})();