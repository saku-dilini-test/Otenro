(function () {
    'use strict';

    angular.module('appeality').controller('menuDetailController',
                                        ['appealityApi', '$stateParams', menuDetailController]);

    function menuDetailController(appealityApi, $stateParams) {
        var vm = this;

        appealityApi.setDataId($stateParams);
        appealityApi.getScalarData($stateParams).then(function (data) {
            vm.data = data;
            console.log('Scalar data object is ready', vm.data);
        });

    }

})();