(function () {
    'use strict';
    angular.module("appEdit").controller("LogoAndTittleCtrl",
        ['$scope','$mdDialog','$rootScope','$timeout','toastr','$window','logoAndTittleService','ME_APP_SERVER','$auth',LogoAndTittleCtrl]);

    function LogoAndTittleCtrl($scope,$mdDialog,$rootScope,$timeout,toastr,$window,logoAndTittleService,ME_APP_SERVER,$auth) {


        //$scope.headerImg = ME_APP_SERVER+'temp/' +$auth.getPayload().sub+'/templates/'+$rootScope.appId+'/img/header.jpg?time='+new Date().getTime();
        //$scope.fonts = {
        //    font : 'Arial',
        //    fontSize : 11
        //};

        $scope.addLogoImage = function(headerImg) {
            console.log('eee');
            logoAndTittleService.addLogoImage(headerImg)
                .progress(function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function(data, status, headers, config) {
                    alert("success", 'Awsome! ', 'Genaral info has been added');
                }).error(function(data, status, headers, config) {
                    //alert('warning', "Unable to get templates", err.message);
                })
        };

        $scope.hide = function () {
            $mdDialog.hide();
        };
    }
})();
