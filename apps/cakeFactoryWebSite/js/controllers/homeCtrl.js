
(function () {
    "use strict";
angular.module('animateApp')
    .controller('homeCtrl', function($scope, $http,SERVER_URL) {
        $scope.SERVER_URL = SERVER_URL;

        $http.get(SERVER_URL+"categories/getCategories")
            .then(function (response) {            
                $scope.allCategories = response.data.result;            
            });
    })
    .controller('navigationController', function($scope, $location, DataService) {
        //Set selected state of navigation
        $scope.isActive = function(route) {
            return route === $location.path();
        }
        $scope.cart = DataService.cart;
    });
})();


