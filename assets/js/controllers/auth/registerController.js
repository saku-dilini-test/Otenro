(function () {
    'use strict';
    angular.module('app')
        .controller('RegisterController', ['$scope', '$state', 'Auth', 'toastr', RegisterController]);

    function RegisterController($scope, $state, Auth, toastr) {

        $scope.authSignUp = function (user) {
            Auth.register(user).success(function () {
                toastr.success('Successfully registered ', 'Congratulations ! ', {closeButton: true});
                $state.go('anon.welcome');

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


