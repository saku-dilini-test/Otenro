(function () {
    'use strict';
    angular.module("appEdit").controller("LogoAndTittleCtrl",
        ['$scope','$mdDialog','$rootScope','$timeout','toastr','$window','logoAndTittleService','ME_APP_SERVER',
        '$auth','mySharedService','SERVER_URL','$log',LogoAndTittleCtrl]);

    function LogoAndTittleCtrl($scope,$mdDialog,$rootScope,$timeout,toastr,$window,logoAndTittleService,ME_APP_SERVER,
            $auth,mySharedService,SERVER_URL,$log) {


        $scope.thumbPic = ME_APP_SERVER+'temp/' +$auth.getPayload().id+'/templates/'+$rootScope.appId+'/img/header.jpg?time='+new Date().getTime();
        $log.debug($scope.thumbPic);
        $scope.fonts = {
            font : 'Arial',
            fontSize : 11
        };

        $scope.addLogoImage = function(headerImg) {
            logoAndTittleService.addLogoImage(headerImg)
                .progress(function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $log.debug('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function(data, status, headers, config) {

                    $scope.appTemplateUrl =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                                   +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"/";
                    mySharedService.prepForBroadcast($scope.appTemplateUrl);

                    toastr.success('Header image changed  ', 'Awesome!', {
                        closeButton: true
                    });
                }).error(function(err) {
                    $log.debug(err);
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
