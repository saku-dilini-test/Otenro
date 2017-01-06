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
                $rootScope.templates = data
        });
  
        $scope.viewApp = function(templateId, templateUrl, templateName,templateCategory,previewId) {
                    var userId = '';
                    var urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId=unknownUser"
                                    +"&appId="+previewId+"&"+new Date().getTime()+"/";

                    var url= urlPath+'/?'+new Date().getTime();
                    mySharedService.prepForBroadcast(url);

                        $state.go('anon.livePreview', {
                            userId: 'unknownUser',
                            appId: previewId,
                            tempUrl: templateUrl,
                            tempName: templateName,
                            tempCategory: templateCategory
                        });

        }

    }

})();
