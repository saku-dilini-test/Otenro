
(function() {
  'use strict';
  angular.module('starter.services').

    service('dashBoardService', ['$http','SERVER_URL',dashBoardService]);

  function dashBoardService($http,SERVER_URL) {
    return {
      getAllApps: function () {
        return $http.get(SERVER_URL+'mobile/allApps');
      },
      getMeServerUrl: function () {
        return $http.get(SERVER_URL+'mobile/meServerUrl');
      },
      getFileServerUrl: function () {
        return $http.get(SERVER_URL+'mobile/fileServerUrl');
      }
    }
  }

})();

