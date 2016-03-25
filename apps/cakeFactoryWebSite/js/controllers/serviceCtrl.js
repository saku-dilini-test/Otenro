/**
 * Created by amila on 3/25/16.
 */

(function () {
    "use strict";

    angular.module('animateApp')
        .controller('serviceCtrl', function($scope, $http,SERVER_URL) {
            $scope.SERVER_URL = SERVER_URL;
        });
})();

