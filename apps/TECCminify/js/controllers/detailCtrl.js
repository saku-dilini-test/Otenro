(function () {
    "use strict";

angular.module('animateApp')
    .controller('detailCtrl',['$scope','$http','$routeParams','SERVER_URL','DataService', function($scope, $http,$routeParams,SERVER_URL,DataService) {
        $scope.SERVER_URL = SERVER_URL;
        $scope.cart = DataService.cart;
         $scope.cakeType = 'full'
        $scope.cakeFullQuantity = 1;
        $scope.cakeSliceQuantity = 1;
        var productId = $routeParams.productId;    
        
        $http.get(SERVER_URL+"products/getProductsDetails",{params:{id:productId}})
            .then(function (response) {            
                $scope.product = response.data.result;                   
                var categoryCode = $scope.product.categoryCode;
                $http.get(SERVER_URL+"products/getProductsByCategory",{params:{categoryCode:categoryCode}})
                    .then(function (response2) {            
                        var allProductsReqCategory = response2.data.result;
                        var index;
                        for(var i=0;i < allProductsReqCategory.length ;i++) {
                            if(allProductsReqCategory[i]['id'] == productId){                             
                                index = i;
                                break;
                            }                            
                        }
                        allProductsReqCategory.splice(index, 1);                         
                        $scope.allProductsReqCategory = allProductsReqCategory;
                    });  
            });    

        $http.get(SERVER_URL+"products/oneUSD")
            .then(function (response) {
                $scope.oneDoller = response.data.result;  
                $scope.cart.saveOneDoller($scope.oneDoller);                
        });

        $scope.saveItems = function(item){
            if(item.quantity == 0){
                $scope.cart.addItem(item.sku, item.name, item.price, -1000);
            }
            $scope.cart.saveItems();
        };
       
    }]);
})();

