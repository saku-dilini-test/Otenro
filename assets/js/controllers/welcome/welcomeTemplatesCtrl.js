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
      ['$scope', '$mdDialog', 'welcomeTemplatesResource','userProfileService','$state','mySharedService','ME_APP_SERVER','$auth',
            WelcomeTemplatesCtrl
        ]);

    function WelcomeTemplatesCtrl($scope, $mdDialog, welcomeTemplatesResource, userProfileService,$state,mySharedService,ME_APP_SERVER,$auth) {
        welcomeTemplatesResource.getTemplates().success(function(data){
           $scope.templates = data;
        });

        $scope.viewApp = function(templateId, templateUrl, templateName,templateCategory) {

            var appParams = {
                'appName': 'preview',
                'templateId': templateId,
                'templateName': templateName,
                'templateUrl':templateUrl,
                'templateCategory' : templateCategory
            };
            console.log(appParams);
            if ($auth.isAuthenticated()) {

                welcomeTemplatesResource.createApp(appParams).then(function(data){

                    var url= ME_APP_SERVER+'temp/'+$auth.getPayload().id
                        +'/templates/'+data.data.appId+'/?'+new Date().getTime();

                    mySharedService.prepForBroadcast(url);
                    $state.go('user.livePreview',{userId :$auth.getPayload().id,appId: data.data.appId,tempUrl:templateUrl,tempName:templateName,tempCategory:templateCategory});
                });
            }else{
                $state.go('anon.login');
            }
        }
    }

})();
