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
                    $scope.tmpUrl = mySharedService.url + mySharedService.updateLocationOfApp + mySharedService.updateInfo;
                    $scope.editTemplateUrl =  $sce.trustAsResourceUrl($scope.tmpUrl);
                });
            },1000);
        });
        $scope.editTemplateUrl =  $sce.trustAsResourceUrl($scope.tmpUrl);
        $scope.device = $scope.devicePath;
        $scope.$watch('devicePath', function (val) {
            if (val == 'mobile'){
                $scope.phone = true;
                $scope.tablet = false;
                $scope.deviceClass = "iphone";
                $scope.deviceScreenClass = "screen";
                $scope.appViewClass = "appViewClass";
            }else if(val == 'tabletView'){
                $scope.tablet = true;
                $scope.phone = false;
                $scope.deviceClass = "tablet";
                $scope.deviceScreenClass = "tabScreen";
                $scope.appViewClass = "tabappViewClass";
            }else {
                $scope.deviceClass = "webApp";
                $scope.deviceScreenClass = "webScreen";
                $scope.appViewClass = "webAppViewClass";


            }
        });
    }
})();