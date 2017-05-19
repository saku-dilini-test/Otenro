(function () {
    'use strict';
    angular.module('app')
        .controller('RegisterController', ['$scope', '$state', 'Auth', 'toastr','initialData','$stateParams', RegisterController]);

    function RegisterController($scope, $state, Auth, toastr,initialData,$stateParams) {

        // -- Config -- 
        // Tell Us About yourself data array
        $scope.yourselfReasonList = initialData.yourselfReasonList.data;
        
        $scope.authSignUp = function (user) {
            var agentInfo = {
                clickid : $stateParams.clickid,
                affid:$stateParams.affid
            }
            Auth.register(user).success(function () {
                Auth.sendAgentInfo(agentInfo);
                toastr.success('Register Successful ', 'Congratulations ! ', {closeButton: true});
                if ($scope.user.email== 'support@otenro.com'){
                    $state.go('user.technicalSupporter');
                }else {
                    $state.go('user.dashboard');
                }
            }).catch(function onError() {
                toastr.error('Email already exists ' + $scope.user.email, 'Error', {
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


