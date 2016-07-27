/**
 * Created by udeshikaperera on 26/08/2015.
 */
(function(){
    angular.module('appEdit').controller('AppEditAreaCtrl',[
        '$scope', '$stateParams', '$rootScope', '$auth', 'appEditResource', 'userProfileService', 'ME_APP_SERVER',
        'toastr','mySharedService','$interval','dashboardService','$mdDialog','$cookies','$cookieStore',
        AppEditAreaCtrl]);

    function AppEditAreaCtrl($scope,$stateParams,$rootScope,$auth,appEditResource,userProfileService,ME_APP_SERVER,
    toastr,mySharedService,$interval,dashboardService,$mdDialog,$cookies,$cookieStore){

        $rootScope.bodyClass = 'appEdit';

        $scope.appId = $stateParams.appId;
        $rootScope.appId = $stateParams.appId;

        var tempUrl = $cookieStore.get('url');

        $scope.appTemplateUrl=tempUrl;
        //$scope.appTemplateUrl = ME_APP_SERVER+'temp/'+$auth.getPayload().id
        //                        +'/templates/'+$stateParams.appId;


//        $scope.id = $cookieStore.get('AppId');

        appEditResource.getSelectedApp({appId: $scope.appId})
            .success(function(data) {
                /**
                 * TODO : This should change later according type of template category
                 * @type {boolean}
                 */

                dashboardService.getTemplateMetaData(data.templateCategory)
                    .success(function(data) {
                        $scope.buttonArray = data.btnArray;
                        $scope.firstMenuLabel = data.firstMenuLabel;
                        if(data.firstMenuLabel){
                            $scope.menuButtonView =
                                '<obl-menu-group label="{{firstMenuLabel}}" icon="fa-pencil-square-o">'+
                                    '<div ng-repeat="btn in buttonArray" >' +
                                        '<obl-menu-button ng-if="btn.menuTitle !=\'Site Settings\' " label="{{btn.menuTitle}}" icon="fa fa-file-image-o"  menu-function="{{btn.menuFunction}}">' +
                                        '</obl-menu-button>'+
                                        '<obl-menu-group ng-if="btn.menuTitle ==\'Site Settings\' " label="{{btn.menuTitle}}" icon="fa-pencil-square-o"  class="md-sub-menu">' +
                                         '<obl-menu-button label="Contact Us" icon="fa fa-file-image-o" click-title="contactUs"></obl-menu-button>'+
                                         '</obl-menu-button>'+
                                        '</obl-menu-group>'+
                                         '</div>'+
                                '</obl-menu-group>';
                        }
                    }).error(function(err) {

                    });
            }).error(function(err) {

            });

        $scope.buildSource = function () {
            appEditResource.buildApp({appId: $stateParams.appId})
                .success(function(data) {
                    toastr.success('Successfully Build ', 'Congratulations!', {
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

        $scope.temporaryMessage = function (scope) {
            return $mdDialog.show({
                controllerAs: 'dialogCtrl',
                controller: function($mdDialog){

                    this.confirm = function click(){
                        $mdDialog.hide();
                    }
                },
                template:'<md-dialog aria-label="Edit Child Menu">'+
                '<md-content >' +
                '<div class="md-dialog-header">' +
                '<h1>Coming soon !!!!!</h1>' +
                '                </div> <br>'+
                ' <div style="text-align:center"><lable> This Feature will be coming soon! </lable></div>' +
                '<br><br><div class="md-dialog-buttons">'+
                '<div class="inner-section">'+
                '<md-button class="me-default-button" ng-click="dialogCtrl.confirm()">Ok</md-button>'+
                '</div>'+
                '</div>' +
                '</md-content>' +
                '</md-dialog>'
            })

        };

    }
})();