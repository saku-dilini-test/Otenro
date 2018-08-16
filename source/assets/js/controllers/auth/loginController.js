(function() {
  'use strict';
  const EMAIL = 'email';
  const MOBILE = 'mobile';
  var loginMethod;
  var email = '';
  var password = '';
  var mobile = '';
  var loginPin = '';
  var user, isPinReqSuccess = false;
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
                 //var paramObj = angular.fromJson(data.reqparams)
                 adAgentInfo.addname =  adnetworkname;
                 adAgentInfo.clickid = params[data.clickid];
                 adAgentInfo.affid = params[data.affid];
                 adAgentInfo.clickidparam = data.clickid;
                 adAgentInfo.affidparam = data.affid;
                 adAgentInfo.returnUrl = data.returnurl;
             }
         });
     }

    $scope.submit = function($event) {
        if ($scope.isValidationOk()) {
            if ($scope.loginMethod === EMAIL) {
                Auth.login($scope.user).success(function(response) {
                  if (response.user.email){
                    toastr.success('Login Successful ', 'Message', {
                      closeButton: true
                    });
                    if (response.user.userRoles== 'SUPER_ADMIN' || response.user.userRoles== 'OPERATOR' || response.user.userRoles == 'ADMIN'){
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
            } else if ($scope.loginMethod === MOBILE) {
                if (!$scope.loginPin) {
                    Auth.login($scope.user)
                        .success(function(response) {
                            if (response.message === 'success') {
                                $scope.isPinReqSuccess = true;
                                toastr.success('Check your mobile and enter authentication pin', 'Message', {
                                    closeButton: true
                                });
                            } else if (response.message === 'user not found') {
                                toastr.error('Mobile number is not registered!', 'Error', {
                                    closeButton: true
                                });
                            } else {
                                toastr.error('Server Error', 'Error', {
                                    closeButton: true
                                });
                            }
                        }).error(function(err) {
                            var errMsg =  'Please check your Mobile Number';

                            if (err.error){
                                errMsg = err.error;
                            }
                            toastr.error(errMsg, 'Error', {
                                closeButton: true
                            });
                    });
                } else {
                    var user = { mobile: $scope.mobile, pin: $scope.loginPin };
                    Auth.mobileLogin(user)
                        .success(function(response) {
                            if (response.message === 'wrong pin') {
                                toastr.error('Please Enter Correct Pin', 'Error', {
                                    closeButton: true
                                });
                            }
                            if (response.user.email){
                                toastr.success('Login Successful ', 'Message', {
                                    closeButton: true
                                });
                                if (response.user.userRoles== 'SUPER_ADMIN' || response.user.userRoles== 'OPERATOR' || response.user.userRoles[0]== 'ADMIN'){
                                    $state.go('user.technicalSupporter');
                                }else {
                                    $state.go('user.dashboard');
                                }
                            }
                        })
                        .error(function(err) {
                            var errMsg =  'Error';

                            if (err.error){
                                errMsg = err.error;
                            }
                            toastr.error(errMsg, 'Error', {
                                closeButton: true
                            });
                        });

                }
            }
        }
    };
    $scope.cancel = function () {
        if($scope.isPinReqSuccess == true){
            $state.go($state.current, {}, {reload: true});
        }
        else{
            if($auth.getToken()=='undefined') {
                $auth.removeToken();
            }
            $state.go('anon.welcome');
        }
    };

      $scope.register = function() {

          $state.go('anon.register', {
              data: adAgentInfo
          });

      };

    $scope.isValidationOk = function () {
      if ($scope.email !== undefined && $scope.password !== undefined) {
          $scope.user = {
              email: $scope.email,
              password: $scope.password,
              method: EMAIL
          };
          $scope.loginMethod = EMAIL;
          return true;
      } else if ($scope.mobile !== undefined && !$scope.isPinReqSuccess) {
          $scope.user = {
              mobile: $scope.mobile,
              method: MOBILE
          };
          $scope.loginMethod = MOBILE;
          return true;
      } else if ($scope.mobile !== undefined && !$scope.loginPin && $scope.isPinReqSuccess) {
          toastr.error('Please enter your authentication pin', 'Error', {
              closeButton: true
          });
          return false;
      } else if ($scope.mobile !== undefined && $scope.loginPin && $scope.isPinReqSuccess) {
          return true;

      } else {
            toastr.error('Please enter Email/Password or Mobile number', 'Error', {
              closeButton: true
            });
            return false;
      }
    };

    $scope.submitPin = function (pin) {
        var user = { mobile: $scope.mobile, pin: pin };
        Auth.mobileLogin(user)
            .success(function(response) {
                if (response.message === 'wrong pin') {
                    toastr.error('Please Enter Correct Pin', 'Error', {
                        closeButton: true
                    });
                }
                if (response.user.email){
                    toastr.success('Login Successful ', 'Message', {
                        closeButton: true
                    });
                    if (response.user.userRoles== 'SUPER_ADMIN' || response.user.userRoles== 'OPERATOR' || response.user.userRoles == 'ADMIN'){
                        $state.go('user.technicalSupporter');
                    }else {
                        $state.go('user.dashboard');
                    }
                }
            })
            .error(function(err) {
            toastr.error('Please check your Email/Password', 'Error', {
                closeButton: true
            });
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider).then(function(data){
          if(adAgentInfo.clickid) {
              if(data.data.user.isNewUser){
                  var updateInfo = {
                      email : data.data.user.email,
                      adagentname : params.adn,
                      affid : adAgentInfo.affid
                  }
                  Auth.sendAgentInfo(adAgentInfo);
                  Auth.updateUserAdInfo(updateInfo);
              }
          }
          toastr.success('Login Successful ', 'Message', {
            closeButton: true
          });
          if(data.data.user.isNewUser === true){
              $state.go('user.templates');
          }else{
              $state.go('user.dashboard');
          }

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
          if(videoControl){
              videoControl.play();
          }
      },4000);

      $scope.pause = function(){
          videoControl.pause();
      }
      $scope.expand = false;

  }
})();
