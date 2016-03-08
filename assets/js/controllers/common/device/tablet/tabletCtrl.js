

(function(){
    "use strict";
    angular.module('meDevices').controller("TabletCtrl",
    ['$scope', '$sce', TabletCtrl]);

    function TabletCtrl($scope, $sce){
        $scope.editTemplateUrl =  $sce.trustAsResourceUrl($scope.tmpUrl);
    }
})();