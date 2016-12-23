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
      '$auth','$rootScope','$timeout',
            WelcomeTemplatesCtrl
        ]);

    function WelcomeTemplatesCtrl($scope, $mdDialog, welcomeTemplatesResource, userProfileService,$state,mySharedService,
    ME_APP_SERVER,$auth,$rootScope,$timeout) {

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
            alert("$rootScope.templates " + JSON.stringify($rootScope.templates))
        });
  
        $scope.viewApp = function(templateId, templateUrl, templateName,templateCategory,previewId) {
            alert ("aaaaaaaaaaaaaaaa");

                    var userId = '';

                    var url= ME_APP_SERVER+'temp/unknownUser'
                            +'/templates/'+previewId+'/?'+new Date().getTime();

                    alert ("url " + url);

                    if ($auth.isAuthenticated()) {
                        userId = $auth.getPayload().id;
                    }else {
                        userId = 'unknownUser';
                    }
                    alert("userId " + userId);
                    mySharedService.prepForBroadcast(url);

                        $state.go('anon.livePreview', {
                            userId: userId,
                            appId: previewId,
                            tempUrl: templateUrl,
                            tempName: templateName,
                            tempCategory: templateCategory
                        });

        }
    }
})();
