
(function() {
  'use strict';
  angular.module('app')
    .controller('HeaderController', ['$scope', 'Auth', 'CurrentUser',
        'userProfileService','$location',HeaderController]);

    function HeaderController($scope, Auth, CurrentUser,userProfileService,$location) {

      $scope.welcome=false;
      var location=$location.url();
      if(location == "/"){
        console.log("welcome");
        $scope.welcome=true;
      }

      $scope.auth = Auth;
      $scope.user = CurrentUser.user;

      $scope.profileView = function () {
        return userProfileService.showUserProfileDialog();
      }
    }
})();

