(function () {
    "use strict";

angular.module('animateApp')
    .controller('detailCtrl', function($scope, $http,$routeParams,SERVER_URL,DataService) { 		
        $scope.SERVER_URL = SERVER_URL;
        $scope.cart = DataService.cart;
         $scope.cakeType = 'full'
        $scope.cakeFullQuantity = 1;
        $scope.cakeSliceQuantity = 1;
        var productId = $routeParams.productId;    
        
        $http.get(SERVER_URL+"products/getProductsDetails",{params:{id:productId}})
            .then(function (response) {            
                $scope.product = response.data.result;   
                console.log($scope.product);
            });    

        $http.get(SERVER_URL+"products/oneUSD")
            .then(function (response) {
                $scope.oneDoller = response.data.result;  
                $scope.cart.saveOneDoller($scope.oneDoller);                
        });       
       
    });
})();

