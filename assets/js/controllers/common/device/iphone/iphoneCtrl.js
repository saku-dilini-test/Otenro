/**
 * Created by udeshikaperera on 26/06/2015.
 */
(function(){
    "use strict";
    angular.module('meDevices').controller("IphoneCtrl",
    ['$scope', '$sce','mySharedService', IphoneCtrl]);

    function IphoneCtrl($scope, $sce,mySharedService){
        $scope.$on('handleBroadcast', function() {
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.tmpUrl=mySharedService.url;
                    $scope.editTemplateUrl =  $sce.trustAsResourceUrl($scope.tmpUrl);
                });
            },1000);
        });
        $scope.editTemplateUrl =  $sce.trustAsResourceUrl($scope.tmpUrl);
    }
})();