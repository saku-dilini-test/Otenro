(function () {
    'use strict';

    angular.module('appeality').controller('mixedMenuController',
                                        ['appealityApi', '$state', '$scope', mixedMenuController]);

    function mixedMenuController(appealityApi, $state, $scope) {
        var vm = this;

        /*vm.loadList handles the pull to refresh. See also set-one-page-one.html*/
        vm.loadList = function (forceRefresh) {
            appealityApi.getMixedMenu(forceRefresh).then(function (data) {
                vm.menuItems = data
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        vm.loadList(false);

    }

})();