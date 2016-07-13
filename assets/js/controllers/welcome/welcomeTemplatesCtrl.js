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
        .controller('WelcomeTemplatesCtrl',
      ['$scope', '$mdDialog', 'welcomeTemplatesResource','userProfileService','$state','mySharedService','ME_APP_SERVER',
      '$auth','$rootScope','$timeout','$cookieStore',
            WelcomeTemplatesCtrl
        ]);

    function WelcomeTemplatesCtrl($scope, $mdDialog, welcomeTemplatesResource, userProfileService,$state,mySharedService,
    ME_APP_SERVER,$auth,$rootScope,$timeout,$cookieStore) {
        welcomeTemplatesResource.getTemplates().success(function(data){
            $rootScope.templates = data;
        });
        $scope.viewApp = function(templateId, templateUrl, templateName,templateCategory) {



            if ($auth.isAuthenticated()) {
                var appParams = {
                    'appName': 'preview',
                    'templateId': templateId,
                    'templateName': templateName,
                    'templateUrl':templateUrl,
                    'templateCategory' : templateCategory,
                    'userId':$auth.getPayload().id
                };

                welcomeTemplatesResource.createApp(appParams).then(function(data){

                    var url= ME_APP_SERVER+'temp/'+$auth.getPayload().id
                            +'/templates/'+data.data.appId+'/?'+new Date().getTime();

                    mySharedService.prepForBroadcast(url);
                    $scope.goLivePreview = function() {
                    $cookieStore.put('userId',$auth.getPayload().id);
                    $cookieStore.put('appId',data.data.appId);
                    $cookieStore.put('tempUrl',templateUrl);
                    $cookieStore.put('tempName',templateName);
                    $cookieStore.put('tempCategory',templateCategory);
                        $state.go('anon.livePreview', {
                            userId: $auth.getPayload().id,
                            appId: data.data.appId,
                            tempUrl: templateUrl,
                            tempName: templateName,
                            tempCategory: templateCategory
                        });

                    }

                    $timeout(function () {
                        $scope.goLivePreview();
                    }, 1000);

                });

            }else{
                var appParams = {
                    'appName': 'preview',
                    'templateId': templateId,
                    'templateName': templateName,
                    'templateUrl':templateUrl,
                    'templateCategory' : templateCategory,
                    'userId':'unknownUser'
                };

                welcomeTemplatesResource.createApp(appParams).then(function(data){

                    var url= ME_APP_SERVER+'temp/unknownUser'
                       +'/templates/'+data.data.appId+'/?'+new Date().getTime();

                    mySharedService.prepForBroadcast(url);
                    $scope.goLivePreview = function() {
                        $state.go('anon.livePreview', {
                            userId: 'unknownUser',
                            appId: data.data.appId,
                            tempUrl: templateUrl,
                            tempName: templateName,
                            tempCategory: templateCategory
                        });
                    }
                    $timeout(function () {
                        $scope.goLivePreview();
                    }, 1000);
                });
            }

        }
    }

})();
