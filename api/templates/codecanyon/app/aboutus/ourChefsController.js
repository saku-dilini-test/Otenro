(function () {
    'use strict';

    angular.module('appeality').controller('ourChefsController',
                                        ['appealityApi', ourChefsController]);

    function ourChefsController(appealityApi) {
        var vm = this;

        vm.getChefs = function () {
            appealityApi.retrieveData_chefs().then(function (data) {
                vm.chefs = data;
                console.log('Chefs',vm.chefs)
            });
        }

        vm.getChefs();

    }

})();