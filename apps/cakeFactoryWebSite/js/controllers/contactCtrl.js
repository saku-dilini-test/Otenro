
(function () {
    "use strict";
angular.module('animateApp')
    .controller('contactCtrl', function($scope,$http) {
        $scope.submitContactForm=function(contactForm) {
            $http.post('http://localhost:1339/contactUs/create', contactForm)
                .then(function(response){
            });
        }
    })
})();

