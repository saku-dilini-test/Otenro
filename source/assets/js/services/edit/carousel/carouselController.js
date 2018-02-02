/**
 * Created by shashan on 01/02/2018.
 **/
(function() {
    angular.module('appEdit').service('carouselService', [
        '$mdDialog', carouselService
    ]);

    function carouselService($mdDialog) {
        return {
            showCarouselBannerDialog: function() {
                return $mdDialog.show({
                    controller: 'CarouselCtrl',
                    templateUrl: 'user/edit/carousel/carouselManagement.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            }
        };
    }
})();



