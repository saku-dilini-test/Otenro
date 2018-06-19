(function () {
    'use strict';
    var user, isPinReqSuccess = false;
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

            Auth.register(user).success(function (data) {

                if($stateParams.data && $stateParams.data.addname) {
                    //Auth.sendAgentInfo($stateParams.data);
                }
                if ($scope.user.email== 'support@otenro.com'){
                    $state.go('user.technicalSupporter');
                }else {
                    if (data.message === 'success') {
                        // commerceService.sendRegisterVerificationLinkEmail(user);
                        $scope.isPinReqSuccess = true;
                        $scope.user.id = data.id;
                    } else {
                        toastr.error('Error occurred while registering user!', 'Error', {
                            closeButton: true
                        });
                    }
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
        };
        $scope.submitPin = function (pin) {
            var user = {
                id : $scope.user.id,
                pin : pin
            };
            Auth.verifyMobile(user)
                .success(function (response) {
                    console.log('####');
                    console.log('####', JSON.stringify(response));
                    console.log('####');
                    goog_report_conversion(O_SERVER_URL + "#templates");
                    $state.go('user.templates');
                })
                .error(function(err) {
                toastr.error('Please check your Mobile Number', 'Error', {
                    closeButton: true
                });
            });
        };

        $scope.passwordRegularExpression = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{7,}";
    }
})();


