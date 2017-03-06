

(function(){
    "use strict";
    angular.module('meDevices').controller("TabletCtrl",
    ['$scope', '$sce','mySharedService', TabletCtrl]);

    function TabletCtrl($scope, $sce,mySharedService){

        $scope.$on('handleBroadcast', function() {
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.tmpUrl=mySharedService.url;
                    $scope.editTemplateUrl=$sce.trustAsResourceUrl($scope.tmpUrl);
                });
            },1000);
        });
        $scope.editTemplateUrl =  $sce.trustAsResourceUrl($scope.tmpUrl);
    }
})();