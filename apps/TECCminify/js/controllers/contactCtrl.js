(function () {
    "use strict";
angular.module('animateApp')
    .controller('contactCtrl',['$scope','$http','SERVER_URL', function($scope,$http,SERVER_URL) {

        $scope.submitContactForm = function(data) {
            console.log(data)
            $http.post(SERVER_URL+'contactUs/create', data)
                .then(function(res){
                    console.log(res);
            });
        }
    }])
})();

