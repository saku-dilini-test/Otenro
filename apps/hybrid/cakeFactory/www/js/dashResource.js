(function () {

  angular.module('starter.services', [])

    .service('dashService', ['$http','SERVER_URL',dashService]);

  function dashService($http,SERVER_URL) {
    return {
      dashResponse: function (test) {
        return $http.post(SERVER_URL+'dash/dashTest', test);
      }
    }
  };
})();
