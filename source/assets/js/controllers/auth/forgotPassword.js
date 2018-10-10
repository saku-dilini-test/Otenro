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
            //send email address to send verification email to the user's email address
            commerceService.sendVerificationLinkEmail(data).success(function (data) {
                if(data.type === 'Success'){
                    toastr.success(data.msg, data.type,
                        {closeButton: true}
                    );
                }
                else{
                    toastr.error(data.msg, data.type,
                        {closeButton: true}
                    );
                }

                //To check email page
               //$state.go('anon.checkEmail');
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


