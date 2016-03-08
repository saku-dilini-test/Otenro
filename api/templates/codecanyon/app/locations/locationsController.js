(function () {
    'use strict';

    angular.module('appeality').controller('locationsController',
                                        ['appealityApi', '$scope','$ionicModal', locationsController]);

    function locationsController(appealityApi, $scope, $ionicModal) {
        var vm = this;

        vm.retrieveLocationCoordinates = function () {
            appealityApi.retrieveData_locations().then(function (data) {
                vm.locations = data;
                console.log('locations', vm.locations);
            });
        }

        vm.retrieveLocationCoordinates();


        vm.showLocationDetail = function (data) {
            console.log(data);

            vm.activeLocation = data;
            vm.activeLocationMap = '';

            var _static = 'https://maps.googleapis.com/maps/api/staticmap?'
                        + 'size=640x640'
                        + '&scale=2'
                        + '&format=PNG'
                        + '&maptype=roadmap'
                        + '&markers=color:yellow%7Clabel:%7C'
                        + data.latitude + ',' + data.longitude
                          
            vm.activeLocationMap = _static
            $scope.openModal();

        };

        /*Location details modal*/
        $ionicModal.fromTemplateUrl('app/locations/locations-map-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function () {
            $scope.modal.show();
        };
        $scope.closeModal = function () {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function () {
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });
        $scope.$on('modal.shown', function () {
        });

    }


})();