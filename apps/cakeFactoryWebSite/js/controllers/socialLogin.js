/**
 * Created by amila on 3/28/16.
 */

(function () {
    "use strict";
    angular.module('animateApp')
        .controller('socialLoginCtrl', function($scope) {

            $scope.fb_button = true;
            $scope.google_button = true;
            $scope.logout_button = false;

            $scope.authenticate = function(provider) {
                console.log(provider);
                $scope.fb_button = false;
                $scope.google_button = false;
                $scope.logout_button = true;

            }

            $scope.logOut = function(){
                $scope.fb_button = true;
                $scope.google_button = true;
                $scope.logout_button = false;
            }

        })
})();

