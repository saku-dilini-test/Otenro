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
        '$auth','toastr','$cookieStore','$cookies','$interval','$q',
            livePreviewCtrl
        ]);


    function livePreviewCtrl($scope,welcomeTemplatesResource, userProfileService,$stateParams,$mdDialog,mySharedService,
    $http,$state,ME_APP_SERVER,$auth,toastr,$cookieStore,$cookies,$interval,$q) {
        
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

        var loginFunction = function(){
            var deferred = $q.defer();
            $state.go('anon.login');
            $interval(function () {
                if ($auth.isAuthenticated()) {
                    var id = $auth.getPayload().id;
                    deferred.resolve(id);
                }
                })
            return deferred.promise;
        }

        $scope.userId = $stateParams.userId;
        $scope.appId = $stateParams.appId;
        $scope.tempUrl = $stateParams.tempUrl;
        $scope.tempName = $stateParams.tempName;
        $scope.tempCategory = $stateParams.tempCategory;

        // $stateParams console.log only testing
        console.log('User ID : '+$stateParams.userId);
        console.log('App ID : '+$stateParams.appId);
        console.log('TempUrl : '+$stateParams.tempUrl);
        console.log('Temp Name : '+$stateParams.tempName);
        console.log('TempCategory : '+$stateParams.tempCategory);

        var userID = $stateParams.userId;
        var appID  = $stateParams.appId;

        // App URL create $statePrams
        $scope.appTemplateUrl = ME_APP_SERVER+'/temp'+'/'+userID+'/templates'+'/'+appID+'/';

        // App URL get from cookiesStore
        // $scope.appTemplateUrl = $cookieStore.get('url');


        $scope.deleteFile = function(userId,appId) {

            var appParams = {
                'userId': userId,
                'appId': appId
            };

            welcomeTemplatesResource.deletePreviewTemp(appParams).then(function(data) {
                $state.go('anon.welcome');
            });
        };
        $scope.successDeleteFile = function(userId,appId) {

            var appParams = {
                'userId': userId,
                'appId': appId
            };

            welcomeTemplatesResource.deletePreviewTemp(appParams).then(function(data) {

            });
        };

        $scope.answer = function(answer,templateId, templateUrl, templateName,templateCategory) {
        if($scope.appName== null){
            toastr.error('Please enter a name for the application', 'Warning', {
                  closeButton: true
            });
        }
        else{
                if ($auth.isAuthenticated()) {
                       $scope.successDeleteFile($scope.userId, $scope.appId);
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
                    loginFunction().then(function(id){
                        $scope.successDeleteFile($scope.userId, $scope.appId);
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
                    });

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
