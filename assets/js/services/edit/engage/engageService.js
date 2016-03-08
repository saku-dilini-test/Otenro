/**
 * Created by udeshikaperera on 26/08/2015.
 **/
(function() {
    angular.module('appEdit').service('engageService', [
        '$mdDialog', '$http', 'SERVER_URL','$q', engageService
    ]);

    function engageService($mdDialog, $http, SERVER_URL, $q) {
        return {
            showPushMessageDialog: function() {
                return $mdDialog.show({
                    controller: 'EngageCtrl',
                    templateUrl: 'user/edit/engage/pushMessageView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            showPushMessageSendDialog: function() {
                return $mdDialog.show({
                    controller: 'EngageCtrl',
                    templateUrl: 'user/edit/engage/pushMessageSendView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            }
        };
    }
})();



