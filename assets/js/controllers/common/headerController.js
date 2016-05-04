
(function() {
  'use strict';
  angular.module('app')
    .controller('HeaderController', ['$scope', 'Auth', 'CurrentUser',
        'userProfileService','$location','dashboardService','toastr',HeaderController]);

    function HeaderController($scope, Auth, CurrentUser,userProfileService,$location,dashboardService,toastr) {

      $scope.welcome=false;
      $scope.livePreview=false;

      var location=$location.url();
      if(location == "/") {
        console.log("welcome");
      }

      $scope.auth = Auth;
      $scope.user = CurrentUser.user;

      $scope.profileView = function () {
        return userProfileService.showUserProfileDialog();
      }


      dashboardService.getAllCategory().success(function (data) {
        $scope.category=data;
      }).error(function (err) {
        toastr.error(err.error, 'Error', {
          closeButton: true
        });
      });
      $scope.getCategoryData = function(){

      }

    }
})();

