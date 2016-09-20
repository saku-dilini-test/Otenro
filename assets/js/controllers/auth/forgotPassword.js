(function () {
    'use strict';
    angular.module('app')
        .controller('ForgotPasswordController', ['$scope', '$state', '$auth', 'commerceService', 'toastr', ForgotPasswordController]);

    function ForgotPasswordController($scope, $state, $auth, commerceService, toastr) {

        $scope.submitVerification = function (email) {
            var data = {
                email: email,
                type: 'Email Verification to reset password'
            }
            commerceService.sendVerificationLinkEmail(data).success(function (data) {
                toastr.info(data.msg, {closeButton: true});
//                $state.go('anon.welcome');

            }).error(function(err) {
                toastr.error('Error ' , 'Error', {
                    closeButton: true
                });
            });
        };
        $scope.cancel = function () {
            $state.go('anon.login');
        }

        $scope.passwordRegularExpression = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{7,}";
    }
})();


