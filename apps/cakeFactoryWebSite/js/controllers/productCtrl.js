
(function () {
    "use strict";

angular.module('animateApp')
    .controller('productCtrl', function($scope, $http,$routeParams,SERVER_URL) {
        $scope.SERVER_URL = SERVER_URL;
        var categoryId = $routeParams.categoryId;          

        $http.get(SERVER_URL+"products/getProductsByCategory",{params:{categoryCode:categoryId}})
            .then(function (response) {            
                $scope.allProductsReqCategory = response.data.result;                  
            });  
          
    });
})();