/**
 * Created by .Sanira on 12/09/2018.
 */
(function() {
    'use strict';
    angular.module('app')
        .controller('helpCtrl', function ($location, $scope) {
            $scope.scrollTo = function (hash) {
                $location.hash(hash);
            };
        });
})();
