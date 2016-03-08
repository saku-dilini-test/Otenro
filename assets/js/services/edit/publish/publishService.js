/**
 * Created by udeshikaperera on 26/08/2015.
 **/
(function() {
    angular.module('appEdit').service('publishService', [
        '$mdDialog', '$http', 'SERVER_URL','$q','Upload','$rootScope', publishService
    ]);

    function publishService($mdDialog, $http, SERVER_URL, $q, Upload,$rootScope) {
        return {
            showPublishToAppStoreDialog: function() {
                return $mdDialog.show({
                    controller: 'PublishCtrl',
                    templateUrl: 'user/edit/publish/publishToAppStoreView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            showPublishToGooglePlayDialog: function() {
                return $mdDialog.show({
                    controller: 'PublishCtrl',
                    templateUrl: 'user/edit/publish/publishToGooglePlayView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            addGooglePlayInfo: function(file,playStoreData){
                return Upload.upload({
                    url: SERVER_URL + 'api/edit/addGooglePlayInfo',
                    fields: {
                        'appId':$rootScope.appId
                    },
                    file: file
                });
            },
        };
    }
})();



