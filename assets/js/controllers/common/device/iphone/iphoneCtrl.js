/**
 * Created by udeshikaperera on 26/06/2015.
 */
(function(){
    "use strict";
    angular.module('meDevices').controller("IphoneCtrl",
    ['$scope', '$sce', IphoneCtrl]);

    function IphoneCtrl($scope, $sce){
        $scope.editTemplateUrl =  $sce.trustAsResourceUrl($scope.tmpUrl);
    }
})();