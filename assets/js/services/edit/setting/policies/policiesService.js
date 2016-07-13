/**
 * Created by udeshikaperera on 26/08/2015.
 */
(function() {
    angular.module('appEdit').service('policiesService', [
        '$mdDialog', '$http', '$rootScope', 'Upload', 'SERVER_URL', policiesService
    ]);

    function policiesService($mdDialog, $http, $rootScope, Upload, SERVER_URL) {
        return {
            showPoliciesDialog: function() {
                return $mdDialog.show({
                    controller: 'policiesCtrl',
                    templateUrl: 'user/edit/setting/policies/managePoliciesView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },

            addPolicies: function(policiesInfo){
                return $http.post(SERVER_URL + 'edit/addPolicies', policiesInfo);
            },

            getPoliciesInfo: function(){
                 return $http.get(SERVER_URL+ 'edit/getPolicies?appId='+ $rootScope.appId);
            },

            /*saveBasicInfo: function(basicInfoResponse){
                return $http.post(SERVER_URL + 'edit/addBasicInfo',basicInfoResponse);
            },

            saveWebInfo: function(webInfoResponse){
                return $http.post(SERVER_URL + 'edit/addWebInfo',webInfoResponse);
            },

            saveGoogleMapInfo: function(googleMapInfoResponse){
                return $http.post(SERVER_URL + 'edit/addGoogleMapInfo',googleMapInfoResponse);
            },

            saveOpenHoursInfo: function(openHoursResponse){
                return $http.post(SERVER_URL + 'edit/addOpenHoursInfo',openHoursResponse);
            }*/
        };
    }
})();
