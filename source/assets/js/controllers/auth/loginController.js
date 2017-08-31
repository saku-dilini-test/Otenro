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
      .controller('LoginController',['$scope','$state','Auth','toastr','$auth','$stateParams','$location', LoginController]);


  function LoginController( $scope, $state, Auth ,toastr ,$auth,$stateParams,$location) {


    var params = $location.search();

      var adAgentInfo = {};


     if(params.adn){
        var adnetworkname = params.adn;
         var agentDetails = Auth.getAgentInfo(adnetworkname).success(function (data) {
             if(data){
                 var paramObj = angular.fromJson(data.reqparams)
                 adAgentInfo.addname =  adnetworkname;
                 adAgentInfo.clickid = params[paramObj.clickid];
                 adAgentInfo.affid = params[paramObj.affid];
                 adAgentInfo.clickidparam = paramObj.clickid;
                 adAgentInfo.affidparam = paramObj.affid;
                 adAgentInfo.returnUrl = data.returnurl;
             }
         });
     }

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

      $scope.register = function() {

          $state.go('anon.register', {
              data: adAgentInfo
          });

      }

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


      angular.element(document).ready(function(){
          setTimeout(function(){
              $('#loading').remove(); // Just an example dont modify the dom outside of a directive in a real app!
          },1000);
      });

      var videoControl = document.getElementById("video-background");

      $scope.play = function(){
          videoControl.play();
      }
      setTimeout(function(){
          videoControl.play();
      },4000);

      $scope.pause = function(){
          videoControl.pause();
      }
      $scope.expand = false;

  }
})();
