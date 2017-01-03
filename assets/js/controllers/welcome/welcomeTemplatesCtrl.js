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
      '$auth','$rootScope','$timeout','SERVER_URL',
            WelcomeTemplatesCtrl
        ]);

    function WelcomeTemplatesCtrl($scope, $mdDialog, welcomeTemplatesResource, userProfileService,$state,mySharedService,
    ME_APP_SERVER,$auth,$rootScope,$timeout,SERVER_URL) {

        if ($auth.isAuthenticated()) {
            $scope.isAuthenticated = true;
            $state.go('user.dashboard');
        }else {
            $scope.nonAuthenticated = true;
        }


        $scope.profileView = function () {
            return userProfileService.showUserProfileDialog();
        }

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
                    var urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                                   +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"/";
                    var url= urlPath+'/?'+new Date().getTime();

                    mySharedService.prepForBroadcast(url);
                    $scope.goLivePreview = function() {
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
                    var urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                                   +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"/";
                    var url= urlPath+'/?'+new Date().getTime();

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
