(function() {
  'use strict';
  angular.module('app')
      .controller('LoginController',['$scope','$state','Auth','toastr','$auth', LoginController]);


  function LoginController( $scope, $state, Auth ,toastr ,$auth) {

    $scope.submit = function() {
      Auth.login($scope.user).success(function() {
        toastr.success('Successfully login ', 'Message', {
          closeButton: true
        });
        $state.go('user.dashboard');
      }).error(function(err) {
        toastr.error('Invalid email/password combination.', 'Error', {
          closeButton: true
        });
      });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };

  }
})();
