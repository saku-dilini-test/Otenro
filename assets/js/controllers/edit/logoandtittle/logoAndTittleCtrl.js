(function () {
    'use strict';
    angular.module("appEdit").controller("LogoAndTittleCtrl",
        ['$scope','$mdDialog','$rootScope','$timeout','toastr','$window','logoAndTittleService','ME_APP_SERVER','$auth','mySharedService',LogoAndTittleCtrl]);

    function LogoAndTittleCtrl($scope,$mdDialog,$rootScope,$timeout,toastr,$window,logoAndTittleService,ME_APP_SERVER,$auth,mySharedService) {


        $scope.thumbPic = ME_APP_SERVER+'temp/' +$auth.getPayload().id+'/templates/'+$rootScope.appId+'/img/header.jpg?time='+new Date().getTime();
        console.log($scope.thumbPic);
        $scope.fonts = {
            font : 'Arial',
            fontSize : 11
        };

        $scope.addLogoImage = function(headerImg) {
            logoAndTittleService.addLogoImage(headerImg)
                .progress(function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function(data, status, headers, config) {

                    $scope.appTemplateUrl = ME_APP_SERVER+'temp/'+$auth.getPayload().id
                        +'/templates/'+$rootScope.appId+'/?'+new Date().getTime();
                    mySharedService.prepForBroadcast($scope.appTemplateUrl);

                    toastr.success('Header image changed ', {
                        closeButton: true
                    });
                }).error(function(err) {
                    console.log(err);
                    //alert('warning', "Unable to get templates", err.message);
                    toastr.error('Header image change failed ', 'Error', {
                        closeButton: true
                    });
                })
        };

        $scope.hide = function () {
            $mdDialog.hide();
        };
    }
})();
