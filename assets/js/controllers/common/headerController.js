
(function() {
  'use strict';
  angular.module('app')
    .controller('HeaderController', ['$scope', 'Auth', 'CurrentUser',
        'userProfileService','$location','dashboardService','toastr','$rootScope',HeaderController]);

    function HeaderController($scope, Auth, CurrentUser,userProfileService,$location,dashboardService,toastr,$rootScope) {



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
      $scope.getCategoryData = function(id){
        console.log($location.path());
        if($location.path().toLowerCase().indexOf("dashboard") >= 0){
          var sendData = {
            id : id
          }
          dashboardService.getSelectedCategoryDashboard(sendData).success(function (data) {
            console.log(data);
            $rootScope.widgets = data;
          }).error(function (err) {
            toastr.error(err.error, 'Error', {
              closeButton: true
            });
          });
        }else{
          var sendData = {
            id : id
          }
          dashboardService.getSelectedCategory(sendData).success(function (data) {
            $rootScope.templates = data;
          }).error(function (err) {
            toastr.error(err.error, 'Error', {
              closeButton: true
            });
          });
        }

      }

    }
})();

