(function() {
    'use strict';
    angular.module("appEdit").controller("EngageCtrl", ['$scope', '$mdDialog', '$rootScope', 'engageService', '$http', 'SERVER_URL', EngageCtrl]);

    function EngageCtrl($scope, $mdDialog, $rootScope, engageService, $http, SERVER_URL) {

        $scope.sendPushMessage=function(){
            return engageService.showPushMessageSendDialog();
        };

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    }
})();
