/**
 * Created by amila on 3/28/16.
 */

(function () {
    "use strict";
    angular.module('animateApp')
        .controller('socialLoginCtrl', function($scope,$auth) {

            $scope.fb_button = true;
            $scope.google_button = true;
            $scope.logout_button = false;

            $scope.authenticate = function(provider) {
                $auth.authenticate(provider).then(function(data){
                    if(typeof data.data.token != 'undefined'){
                        $scope.fb_button = false;
                        $scope.google_button = false;
                        $scope.logout_button = true;
                    }else{
                        alert('Facebook Login error');
                    }
                },function(err){
                    alert('Facebook Login error');
                });


            }

            $scope.logOut = function(){
                $auth.logout();
                $scope.fb_button = true;
                $scope.google_button = true;
                $scope.logout_button = false;
            }

        })
})();

