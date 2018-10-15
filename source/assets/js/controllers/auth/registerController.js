(function () {
    'use strict';
    angular.module('app')
        .controller('RegisterController', ['$scope', '$state', 'Auth', 'toastr','initialData','$stateParams','commerceService', RegisterController]);

    function RegisterController($scope, $state, Auth, toastr,initialData,$stateParams,commerceService) {

        // -- Config -- 
        // Tell Us About yourself data array
        $scope.yourselfReasonList = initialData.yourselfReasonList.data;

        $scope.authSignUp = function (user) {
            user.cap = angular.element('#recaptcha_response_field').val();
            
            if (!user.cap) {
                toastr.error('Please use reCAPTCHA..!', 'Warning', {
                    closeButton: true
                });
                return;
            }
            Auth.register(user).success(function (data) {

                if($stateParams.data && $stateParams.data.addname) {
                    //Auth.sendAgentInfo($stateParams.data);
                }
                if ($scope.user.email== 'support@otenro.com'){
                    $state.go('user.technicalSupporter');
                }else {
//                    commerceService.sendRegisterVerificationLinkEmail(user);
                    goog_report_conversion(O_SERVER_URL + "#templates");
                    $state.go('user.templates');
                }
                    toastr.success('Register Successful ', 'Congratulations ! ', {closeButton: true});

            }).catch(function onError(err) {
                console.log(err)
                if (err.status === 409){
                    toastr.error('Sorry this email is already registered', 'Error', {
                        closeButton: true
                    });
                }else{
                    toastr.error(err.data.error, 'Error', {
                        closeButton: true
                    });
                }

            });
        };
        $scope.cancel = function () {
            $state.go('anon.login');
        }

        $scope.passwordRegularExpression = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{7,}";
    }
})();


