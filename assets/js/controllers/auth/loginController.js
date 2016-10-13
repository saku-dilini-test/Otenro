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
          toastr.success('Successfully login ', 'Message', {
            closeButton: true
          });
          if (response.user.userRoles== 'support'){
               $state.go('user.technicalSupporter');
          }else {
               $state.go('user.dashboard');
          }
        }
      }).error(function(err) {
        toastr.error('Invalid email/password combination.', 'Error', {
          closeButton: true
        });
      });
    };
    $scope.cancel = function () {
      $state.go('user.welcome');
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider).then(function(){
          toastr.success('Successfully login ', 'Message', {
            closeButton: true
          });
          $state.go('user.dashboard');
      }).catch(function(error){
      toastr.error('Invalid email/password combination.', 'Error', {
             closeButton: true
      });
      })
    };

  }
})();
