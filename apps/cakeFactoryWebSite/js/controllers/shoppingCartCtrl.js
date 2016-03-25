(function () {
    "use strict";

angular.module('animateApp')
    .controller('shoppingCartCtrl', function($scope, $http,$routeParams,SERVER_URL,DataService) { 		
        $scope.SERVER_URL = SERVER_URL;
        $scope.cart = DataService.cart;
     
        $http.get(SERVER_URL+"products/oneUSD")
            .then(function (response) {
                $scope.oneDoller = response.data.result;  
                $scope.cart.saveOneDoller($scope.oneDoller);                
        });       
       
    });
})();

