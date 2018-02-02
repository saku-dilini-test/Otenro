/**
 * Created by Shashan on 01/02/2018.
 */

(function() {
    'use strict';
    angular.module("appEdit").controller("CarouselCtrl", ['$scope','$mdDialog', CarouselCtrl]);


    function CarouselCtrl($scope,$mdDialog) {

        // --- add carousel image --- //
        $scope.addCarouselBanner = function () {
            return $mdDialog.show({
                controller: 'CarouselCtrl',
                templateUrl: 'user/edit/carousel/addCarouselBanner.html',
                clickOutsideToClose: true
            }).then(function(answer) {
                //$scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                //$scope.status = 'You cancelled the dialog.';
            });
        }

        // --- cancel dialog -----
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    };

})();
