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

            if($stateParams.data && $stateParams.data.addname) {
                // user.adagent = $stateParams.data.addname;
                // user.affid = $stateParams.data.affid;
            }
            console.log(user);

            Auth.register(user).success(function () {

                if($stateParams.data && $stateParams.data.addname) {
                    //Auth.sendAgentInfo($stateParams.data);
                }
                toastr.success('Register Successful ', 'Congratulations ! ', {closeButton: true});
                if ($scope.user.email== 'support@otenro.com'){
                    $state.go('user.technicalSupporter');
                }else {
                    commerceService.sendRegisterVerificationLinkEmail(user);
                    goog_report_conversion(O_SERVER_URL + "#templates");
                    $state.go('user.templates');
                }
            }).catch(function onError(err) {
                if (err.data.error){
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


