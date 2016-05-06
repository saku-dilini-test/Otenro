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

        alert("wel come");

        $scope.viewApp = function(templateId, templateUrl, templateName) {

            var appParams = {
                'appName': 'preview',
                'templateId': templateId,
                'templateName': templateName,
                'templateUrl':templateUrl
            };
            console.log(appParams);
            //if ($auth.isAuthenticated()) {

                welcomeTemplatesResource.createApp(appParams).then(function(data){

                    console.log("111111111111");

                    var url= ME_APP_SERVER+'temp/unknownUser'
                        +'/templates/'+data.data.appId+'/?'+new Date().getTime();

                    mySharedService.prepForBroadcast(url);
                    $state.go('user.livePreview',{userId :'unknownUser',appId: data.data.appId,tempUrl:templateUrl,tempName:templateName});
                });
            //}else{
                //$state.go('anon.login');
           // }
        }
    }

})();
