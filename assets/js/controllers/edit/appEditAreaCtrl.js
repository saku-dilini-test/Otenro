/**
 * Created by udeshikaperera on 26/08/2015.
 */
(function(){
    angular.module('appEdit').controller('AppEditAreaCtrl',[
        '$scope', '$stateParams', '$rootScope', '$auth', 'appEditResource', 'userProfileService', 'ME_APP_SERVER','toastr','mySharedService','$interval','dashboardService',
        AppEditAreaCtrl]);

    function AppEditAreaCtrl($scope,$stateParams,$rootScope,$auth,appEditResource,userProfileService,ME_APP_SERVER,toastr,mySharedService,$interval,dashboardService){

        $rootScope.bodyClass = 'appEdit';

        $scope.appId = $stateParams.appId;
        $rootScope.appId = $stateParams.appId;
        $scope.appTemplateUrl=mySharedService.url;
        //$scope.appTemplateUrl = ME_APP_SERVER+'temp/'+$auth.getPayload().id
        //                        +'/templates/'+$stateParams.appId;

        appEditResource.getSelectedApp({appId: $stateParams.appId})
            .success(function(data) {
                /**
                 * TODO : This should change later according type of template category
                 * @type {boolean}
                 */
                if(data.templateCategory == "3") {
                    $scope.isAppMediaCategory = true;

                    dashboardService.getTemplateMetaData(data.templateCategory)
                        .success(function(data) {
                            $scope.buttonArray = data;
                            $scope.menuButtonView =
                                '<div data-ng-repeat="btn in buttonArray" >' +
                                    '<obl-menu-button label="{{btn.menuTitle}}" icon="fa fa-file-image-o"  menu-function="{{btn.menuFunction}}">' +
                                    '</obl-menu-button>'+
                                '</div>';
                        }).error(function(err) {

                        });
                }
            }).error(function(err) {

            });

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