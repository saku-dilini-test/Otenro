/**
 * Created by amila on 2/5/16.
 */

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
      }
    }
  }

})();

