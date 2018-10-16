(function () {
    'use strict';
    angular.module('app')
        .controller('ResetPasswordController', ['$scope', '$state', 'Auth', '$auth', '$stateParams', 'commerceService',
        'userProfileResource', 'toastr', '$log',ResetPasswordController]);

    function ResetPasswordController($scope, $state, Auth, $auth, $stateParams, commerceService, userProfileResource, toastr,$log) {

        $scope.submitVerification = function (password) {
            var verify = {
                token: $stateParams.token,
                expires: new Date()
            }
            var reset = {
                token: $stateParams.token,
                password: password
            }
            //Authenticate the user with the token
            Auth.forgotPassword(verify).success(function(data){
            //reset the password with the new password
            userProfileResource.resetPassword(reset).success(function () {
                toastr.success('Password successfully changed ', 'Success', {closeButton: true});
                  $state.go('anon.welcome');

            }).catch(function onError() {
                toastr.error('Reset password failed', 'Error', {
                    closeButton: true
                });
            });
            }).error(function(err) {
                $log.debug(err);
            })
        };
        $scope.cancel = function () {
            $state.go('anon.login');
        }

        $scope.passwordRegularExpression = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{7,}";
    }
})();


