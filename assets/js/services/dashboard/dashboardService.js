/**
 * Created by udeshikaperera on 24/08/2015.
 */
(function(){
    angular.module('app').factory('dashboardService',[
        '$http','SERVER_URL',dashboardService]);

    function dashboardService($http,SERVER_URL){
        return{
            getAllApps:function(){
                return $http.post(SERVER_URL+ 'app/dashboard/allApps');
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
            }
        }
    }
})();