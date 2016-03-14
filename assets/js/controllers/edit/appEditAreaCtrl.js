/**
 * Created by udeshikaperera on 26/08/2015.
 */
(function(){
    angular.module('appEdit').controller('AppEditAreaCtrl',[
        '$scope', '$stateParams', '$rootScope', '$auth', 'appEditResource', 'userProfileService', 'ME_APP_SERVER','toastr','mySharedService','$interval',
        AppEditAreaCtrl]);

    function AppEditAreaCtrl($scope,$stateParams,$rootScope,$auth,appEditResource,userProfileService,ME_APP_SERVER,toastr,mySharedService,$interval){

        $rootScope.bodyClass = 'appEdit';

        $scope.appId = $stateParams.appId;
        $rootScope.appId = $stateParams.appId;
        $scope.appTemplateUrl=mySharedService.url;
        //$scope.appTemplateUrl = ME_APP_SERVER+'temp/'+$auth.getPayload().id
        //                        +'/templates/'+$stateParams.appId;

        $scope.$on('handleBroadcast', function() {
            console.log("appEditArea");
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.appTemplateUrl=mySharedService.url;
                    $scope.tmpUrl=mySharedService.url;
                });
            }, 2000);
        });

        console.log($scope.appTemplateUrl);
        $scope.buildSource = function () {
            appEditResource.buildApp({appId: $stateParams.appId})
                .success(function(data) {
                    toastr.success('Successfully Build ', 'Congratulation!', {
                        closeButton: true
                    });
                }).error(function(err) {
                    toastr.error('Cant Build', 'Error', {
                        closeButton: true
                    });
             });
        };
        $scope.expand = false;
        $scope.clicked = function(){
               $scope.expand = !($scope.expand);
        };

        $scope.profileView = function() {
           return userProfileService.showUserProfileDialog();
        };

        $scope.thumbPic = ME_APP_SERVER+'temp/' +$auth.getPayload().id+'/templates/'+$rootScope.appId+'/img/header.jpg?time='+new Date().getTime();

        $scope.fonts = {
            font : 'Arial',
            fontSize : 11
        };

    }
})();