
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
        .controller('TemplatesCtrl',
            ['$scope', '$mdDialog', 'welcomeTemplatesResource','userProfileService','$state','mySharedService','ME_APP_SERVER',
                '$auth','$rootScope','$timeout','SERVER_URL',
                TemplatesCtrl
            ]);

    function TemplatesCtrl($scope, $mdDialog, welcomeTemplatesResource, userProfileService,$state,mySharedService,
                                  ME_APP_SERVER,$auth,$rootScope,$timeout,SERVER_URL) {
       

        if ($auth.isAuthenticated()) {
            $scope.isAuthenticated = true;
        }


        welcomeTemplatesResource.getTemplates().success(function(data){
            $rootScope.templates = data;
        });


        $scope.viewApp = function(templateId, templateUrl, templateName,templateCategory,previewId) {
            var urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
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
