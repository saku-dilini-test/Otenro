(function() {
  'use strict';
  angular.module('app').directive('preventDefault', function() {
    return function(scope, element, attrs) {
      angular.element(element).bind('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();
      });
    }
  });

  angular.module('app')
      .controller('LoginController',['$scope','$state','Auth','toastr','$auth', LoginController]);


  function LoginController( $scope, $state, Auth ,toastr ,$auth) {

    $scope.submit = function($event) {
      Auth.login($scope.user).success(function(response) {
        if (response.user.email){
          toastr.success('Login Successful ', 'Message', {
            closeButton: true
          });
          if (response.user.userRoles== 'support'){
               $state.go('user.technicalSupporter');
          }else {
               $state.go('user.dashboard');
          }
        }
      }).error(function(err) {
        toastr.error('Please check your Email/Password', 'Error', {
          closeButton: true
        });
      });
    };
    $scope.cancel = function () {
      $state.go('anon.welcome');
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider).then(function(){
          toastr.success('Login Successful ', 'Message', {
            closeButton: true
          });
          $state.go('user.dashboard');
      }).catch(function(error){
      toastr.error('Please check your Email/Password', 'Error', {
             closeButton: true
      });
      })
    };

  }
})();
