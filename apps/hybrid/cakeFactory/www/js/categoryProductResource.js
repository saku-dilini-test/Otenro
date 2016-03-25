(function () {

  angular.module('starter.services')

    .service('categoryProductResources', ['$http', 'SERVER_URL', categoryProductResources]);

  function categoryProductResources($http,SERVER_URL) {
    return {
      getProductsByCategory: function (categoryCode) {
        return $http.get(SERVER_URL + 'products/getProductsByCategory',{params:{categoryCode:categoryCode}});
      },
      productsDetails: function (id) {
        return $http.get(SERVER_URL + 'products/getProductsDetails' ,{params:{id:id}});
      }
    }
  }
})();
