
(function () {
    "use strict";

angular.module('animateApp')
    .controller('productCtrl',['$scope','$http','$routeParams','SERVER_URL', function($scope, $http,$routeParams,SERVER_URL) {
        $scope.SERVER_URL = SERVER_URL;
        $scope.categoryId = $routeParams.categoryId;

        $http.get(SERVER_URL+"products/getProductsByCategory",{params:{categoryCode:  $scope.categoryId}})
            .then(function (response) {            
                $scope.allProductsReqCategory = response.data.result;                  
            });  
          
    }]);
})();