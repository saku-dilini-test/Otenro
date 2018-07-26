/**
 * Created by udeshikaperera on 26/08/2015.
 */
(function() {
    angular.module('appEdit').service('contactUsService', [
        '$mdDialog', '$http', '$rootScope', 'Upload', 'SERVER_URL', contactUsService
    ]);

    function contactUsService($mdDialog, $http, $rootScope, Upload, SERVER_URL) {
        return {
            showSiteSettingsDialog: function() {
                return $mdDialog.show({
                    controller: 'contactUsCtrl',
                    templateUrl: 'user/edit/setting/contactUs/manageContactUsView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },

            addContactUs: function(contactInfo){
                return $http.post(SERVER_URL + 'edit/addContactUs', contactInfo);
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
            },
            saveBranchInfo: function(branchInfoResponse){
                return $http.post(SERVER_URL + 'edit/addNewBranchLocation',branchInfoResponse);
            },
            getAppBranchesInfo: function(){
                return $http.get(SERVER_URL+ 'edit/getAppBranches?appId='+ $rootScope.appId);
            },
            deleteBranch: function(id){
                return $http.post(SERVER_URL + 'edit/deleteBranch',{id:id} );
            },
        };
    }
})();
