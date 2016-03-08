(function () {
    'use strict';

    angular.module('appeality').controller('aboutusController',
                                          ['appealityApi','$scope',
                                          '$ionicGesture','$ionicModal',aboutusController]);

    function aboutusController(appealityApi, $scope, $ionicGesture, $ionicModal) {
        var vm = this;

        /*vm.loadList handles the pull to refresh. See also set-one-page-one.html*/
        vm.retrieveAboutUs = function () {
            appealityApi.retrieveData_aboutUS().then(function (data) {
                vm.basicData = data[0].content
                console.log('About us', vm.basicData);
            })
        };

        vm.retrieveAboutUs(false);

        /*Food Images*/
        vm.smallFoodGrid = function () {
            appealityApi.getMixedMenu().then(function (data) {
                vm.smallFoodGridItems = data
            })
        }

        vm.smallFoodGrid();

        /*collection-repeat image tap*/
        $scope.onGesture = function (gesture) {
            //$scope.gesture.used = gesture;
            /*Tapped image index is zero-based, whereas item ids start with 1. In any event
            the order(index) of items in the repeated collectiond not correspond with the 
            data list. These values will need to be reconciled if the id schema of the data varies
            significantly from the simple 0 */
            try {
                console.log(gesture, this);

                vm.tapped = this;

                appealityApi.getMixedMenu().then(function (workingData) {
                    vm.workingList = workingData
                    var _item = vm.workingList.filter(function (f) {
                        return f.id == vm.tapped.$index + 1;
                    });

                    /*Note _item is returned as an array from the sugarjs filter function*/
                    if (_item) {
                        vm._activeItem = _item[0];
                        console.log('Active item', vm._activeItem);
                        $scope.openModal();
                    } else {
                        console.log('No matching item in menuItems...');
                    }

                })
            } catch (e) {
                console.log(e);
            }

        }

        $ionicModal.fromTemplateUrl('app/aboutus/about-image-modal.html', {
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