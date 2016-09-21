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
            getPublishDetails : function(data){
                return $http.post(SERVER_URL + 'edit/getPublishDetails',data);
            },
        };
    }
})();



