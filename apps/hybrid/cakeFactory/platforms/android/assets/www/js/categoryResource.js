(function () {

  angular.module('starter.services', [])

    .service('categoryResources', function categoryResources($http, SERVER_URL) {
      return {
        all: function () {
          return $http.get(SERVER_URL + 'categories/getCategories');
        }
      }
    });
})();
