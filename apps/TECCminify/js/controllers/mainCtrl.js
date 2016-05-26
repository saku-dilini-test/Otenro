/**
 * Created by amila on 5/25/16.
 */


(function () {
    "use strict";
    angular.module('animateApp')
        .controller('mainCtrl',['$scope','$location',function($scope,$location) {

            $scope.isVisible = true;
            var urlPath = $location.path();
            if(urlPath == '/mobileOrderConform'){
                $scope.isVisible = false;
            }else if(urlPath == '/mobilePaymentInfo'){
                $scope.isVisible = false;
            }
        }])
})();

