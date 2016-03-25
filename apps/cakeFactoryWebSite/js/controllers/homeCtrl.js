
(function () {
    "use strict";
angular.module('animateApp')
    .controller('homeCtrl', function($scope, $http,SERVER_URL) {
        $scope.SERVER_URL = SERVER_URL;

        $http.get(SERVER_URL+"categories/getCategories")
            .then(function (response) {            
                $scope.allCategories = response.data.result;            
            });
    });
})();
