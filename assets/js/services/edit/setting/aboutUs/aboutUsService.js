/**
 * Created by madhuranga 28-06-2016.
 */
(function() {
    angular.module('appEdit').service('aboutUsService', [
        '$mdDialog', '$http', '$rootScope', 'Upload', 'SERVER_URL', aboutUsService
    ]);

    function aboutUsService($mdDialog, $http, $rootScope, Upload, SERVER_URL) {
        return {
            showAboutUsDialog: function() {
                return $mdDialog.show({
                    controller: 'aboutUsCtrl',
                    templateUrl: 'user/edit/setting/aboutUs/manageAboutUsView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },

            addAboutUs: function(aboutUsInfo){
                return $http.post(SERVER_URL + 'edit/addAboutUs', aboutUsInfo);
            },

            getContactUsInfo: function(){
                 return $http.get(SERVER_URL+ 'edit/getContactUs?appId='+ $rootScope.appId);
            },

            saveBasicInfo: function(basicInfoResponse){
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
            }
        };
    }
})();
