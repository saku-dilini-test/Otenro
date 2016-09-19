(function () {
    'use strict';
    angular.module('app')
        .controller('ResetPasswordController', ['$scope', '$state', 'Auth', '$auth', '$stateParams', 'commerceService',
        'userProfileResource', 'toastr', ResetPasswordController]);

    function ResetPasswordController($scope, $state, Auth, $auth, $stateParams, commerceService, userProfileResource, toastr) {

        $scope.submitVerification = function (password) {
            var verify = {
                userId: $stateParams.userId
            }
            var data = {
                userId: $stateParams.userId,
                password: password
            }
            Auth.forgotPassword(verify).success(function(){
            userProfileResource.resetPassword(data).success(function () {
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


