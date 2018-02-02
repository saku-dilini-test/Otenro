/**
 * Created by Shashan on 06/11/2017.
 */

(function() {
    'use strict';
    angular.module("appEdit").controller("CarouselCtrl", ['$scope','$mdDialog', CarouselCtrl]);


    function CarouselCtrl($scope,$mdDialog) {


        // --- cancel dialog -----
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    };

})();
