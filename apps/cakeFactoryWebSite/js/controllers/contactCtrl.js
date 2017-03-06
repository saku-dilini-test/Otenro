(function () {
    "use strict";
angular.module('animateApp')
    .controller('contactCtrl', function($scope,$http,SERVER_URL,Upload) {


        $scope.submitContactForm = function(file,data) {

            var reqData = data;
            if(file){
                var fileName = file.name;
                reqData['imageUrl'] = fileName;
                Upload.upload({
                    url: SERVER_URL+'contactUs/create',
                    fields: reqData,
                    file: file
                }).then(function (resp) {
                    $scope.contactForm = '';
                    $scope.file = '';
                }, function (resp) {
                }, function (evt) {
                });

            }else if(data){
                reqData['imageUrl'] = null;

                Upload.upload({
                    url: SERVER_URL+'contactUs/create',
                    fields: reqData,
                    file: file
                }).then(function (resp) {
                    $scope.contactForm = '';
                    $scope.file = '';
                }, function (resp) {
                }, function (evt) {
                });


            }
        $scope.contactUsComment.$setPristine();


        }
    })
})();

