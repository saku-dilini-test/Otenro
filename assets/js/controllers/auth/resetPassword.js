(function () {
    'use strict';
    angular.module('app')
        .controller('ResetPasswordController', ['$scope', '$state', 'Auth', '$auth', '$stateParams', 'commerceService',
        'userProfileResource', 'toastr', ResetPasswordController]);

    function ResetPasswordController($scope, $state, Auth, $auth, $stateParams, commerceService, userProfileResource, toastr) {

        $scope.submitVerification = function (password) {
            var verify = {
                token: $stateParams.token,
                expires: new Date()
            }
            var reset = {
                token: $stateParams.token,
                password: password
            }
            Auth.forgotPassword(verify).success(function(data){
            userProfileResource.resetPassword(reset).success(function () {
                toastr.success('Successfully reset the password ', 'Congratulations ! ', {closeButton: true});
                  $state.go('anon.welcome');

            }).catch(function onError() {
                toastr.error('Reset password failed', 'Error', {
                    closeButton: true
                });
            });
            }).error(function(err) {
                console.log(err);
            })
        };
        $scope.cancel = function () {
            $state.go('anon.login');
        }

        $scope.passwordRegularExpression = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{7,}";
    }
})();


