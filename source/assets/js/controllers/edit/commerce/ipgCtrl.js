(function () {
    'use strict';
    angular.module("appEdit").controller("ipgCtrl", [
        '$scope','$mdDialog','toastr', 'ipgService', '$rootScope','$auth',
        ipgCtrl]);

    function ipgCtrl($scope, $mdDialog, toastr, ipgService, $rootScope,$auth) {

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
            IPGInfo.userId = $auth.getPayload().id;

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