(function () {
    'use strict';
    angular.module("appEdit").controller("LogoAndTittleCtrl",
        ['$scope','$mdDialog','$rootScope','$timeout','toastr','$window','logoAndTittleService','ME_APP_SERVER','$auth',LogoAndTittleCtrl]);

    function LogoAndTittleCtrl($scope,$mdDialog,$rootScope,$timeout,toastr,$window,logoAndTittleService,ME_APP_SERVER,$auth) {


        $scope.thumbPic = ME_APP_SERVER+'temp/' +$auth.getPayload().id+'/templates/'+$rootScope.appId+'/img/header.jpg?time='+new Date().getTime();
        console.log($scope.thumbPic);
        $scope.fonts = {
            font : 'Arial',
            fontSize : 11
        };

        $scope.addLogoImage = function(headerImg) {
            console.log('eee');
            logoAndTittleService.addLogoImage(headerImg)
                .progress(function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function(data, status, headers, config) {
                    //alert("success", 'Awsome! ', 'Genaral info has been added');
                    toastr.success('Change Header Image', 'Awsome!', {
                        closeButton: true
                    });
                }).error(function(err) {
                    console.log(err);
                    //alert('warning', "Unable to get templates", err.message);
                    toastr.error('Unable to change ', 'Error', {
                        closeButton: true
                    });
                })
        };

        $scope.hide = function () {
            $mdDialog.hide();
        };
    }
})();
