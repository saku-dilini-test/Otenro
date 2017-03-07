(function () {
    'use strict';
    angular.module("appEdit").controller("ipgCtrl", [
        '$scope','$mdDialog','toastr', 'ipgService', '$rootScope',
        ipgCtrl]);

    function ipgCtrl($scope, $mdDialog, toastr, ipgService, $rootScope) {

        // --/-- Configuration Data --/--
        if(typeof $scope.IPGSettings == 'undefined'){
            ipgService.getIPGInfo().
                success(function(data){                 
                    $scope.IPGSettings = data;
                }).error(function(err){
                    alert("IPG Info Loading Error : " + err);
                });    
        }

        // --/-- save IPG collection --/--
        $scope.saveIGPSettings = function (IPGInfo) {
            // Set AppID
            IPGInfo.appId = $rootScope.appId;
            ipgService.updateIPGInfo(IPGInfo)
                .success(function (result) {
                    toastr.success(result.message, 'Saved', {
                        closeButton: true
                    });
                    $scope.cancel();
                }).error(function (error) {
                    toastr.error('Saving Error', 'Message', {
                        closeButton: true
                    });
            })
        };
       
        // --- cancel dialog -----
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }
})();