/**
 * @ngdoc function
 * @name appBuilderApp.controller:WelcometemplatesCtrl
 * @description
 * # WelcometemplatesCtrl
 * Controller of the appBuilderApp
 */
(function() {
    'use strict';
    angular.module('app')
        .controller('livePreviewCtrl',
        ['$scope', 'welcomeTemplatesResource', 'userProfileService','$stateParams','$mdDialog','mySharedService','$http','$state','ME_APP_SERVER',
        '$auth','toastr','$cookieStore','$cookies',
            livePreviewCtrl
        ]);


    function livePreviewCtrl($scope,welcomeTemplatesResource, userProfileService,$stateParams,$mdDialog,mySharedService,
    $http,$state,ME_APP_SERVER,$auth,toastr,$cookieStore,$cookies) {
        welcomeTemplatesResource.getTemplates().success(function(data){
            $cookies.temp = data;
            $scope.templates = $cookies.temp;

            for(var i = 0; i < $scope.templates.length ; i++){
                if($scope.templates[i].template_name == $stateParams.tempName){
                    $scope.templateViewName = $scope.templates[i].templateViewName;
                    $scope.templateViewDesc = $scope.templates[i].templateViewDesc;
                }
            }
        });

        $scope.userId = $stateParams.userId;
        $scope.appId = $stateParams.appId;
        $scope.tempUrl = $stateParams.tempUrl;
        $scope.tempName = $stateParams.tempName;
        $scope.tempCategory = $stateParams.tempCategory;
        $scope.appTemplateUrl = $cookieStore.get('url');

        $scope.deleteFile = function(userId,appId) {

            var appParams = {
                'userId': userId,
                'appId': appId
            };

            welcomeTemplatesResource.deletePreviewTemp(appParams).then(function(data) {
                $state.go('anon.welcome');
            });
        };

        $scope.answer = function(answer,templateId, templateUrl, templateName,templateCategory) {
        if($scope.appName== null){
            toastr.error('Please enter the app name', 'Warning', {
                  closeButton: true
            });
        }
        else{
                if ($auth.isAuthenticated()) {
                       $scope.deleteFile($scope.userId, $scope.appId);
                    var tempAppParams = {
                        'appName': $scope.appName,
                        'templateId': templateId,
                        'templateName': templateName,
                        'templateUrl':templateUrl,
                        'templateCategory' : templateCategory,
                        'userId':$auth.getPayload().id

                    };
                        welcomeTemplatesResource.createApp(tempAppParams).then(function(data){

                            var url= ME_APP_SERVER+'temp/'+$auth.getPayload().id
                                +'/templates/'+data.data.appId+'/?'+new Date().getTime();

                            mySharedService.prepForBroadcast(url);
                            $state.go('user.editApp',{appId:data.data.appId});
                        });
                    $mdDialog.hide(answer);
                }else{
                    $state.go('anon.login');
                }
                }
                $scope.profileView = function () {
                    return userProfileService.showUserProfileDialog();
                }
        };

    }

    function DialogController($scope, $mdDialog,$auth,$state,initialData,welcomeTemplatesResource,mySharedService,ME_APP_SERVER) {
        $scope.selectedTemplate = initialData.selectedTemplateUrl;

        $scope.getFile = function () {
            fileReader.readAsDataUrl($scope.image1, $scope)
                .then(function (result) {
                    $scope.image1.compressed.dataURL = result;
                });
        };
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };

    };
})();
