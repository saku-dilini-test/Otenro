
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
                '$auth','$rootScope','$timeout','SERVER_URL','$stateParams',
                TemplatesCtrl
            ]);

    function TemplatesCtrl($scope, $mdDialog, welcomeTemplatesResource, userProfileService,$state,mySharedService,
                                  ME_APP_SERVER,$auth,$rootScope,$timeout,SERVER_URL,$stateParams) {






        if ($auth.isAuthenticated()) {
            $scope.isAuthenticated = true;
        }

        $scope.types=[];
        welcomeTemplatesResource.getTemplates().success(function(data){
            $rootScope.templates = data;

            for (var i=0; i< data.length ; i++){
                if($scope.types.indexOf(data[i].templateType) === -1){
                   $scope.types.push(data[i].templateType);
                }
            };
        });


        $scope.showSampleImage = function(ev,path, image) {
          $mdDialog.show({
            template:  '<md-dialog aria-label="sample images" class="dashboard-dialog">' +
                       '<img src="images/templates/'+path+image+'" class="img-thumbnail">'+
                       '</md-dialog>',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
          })
        };

        $scope.viewApp = function(templateId, templateUrl, templateName,templateCategory,previewId) {
            var urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                +"&appId="+previewId+"&"+new Date().getTime()+"/";

            var url= urlPath+'/?'+new Date().getTime();

            mySharedService.prepForBroadcast(url);

            var encUserId = 'unknownUser' + "/";
            var encAppId = previewId + "/";
            var encTempUrl = templateUrl + "/";
            var encTempName = templateName + "/";
            var encTempCategory = templateCategory + "/";

            var encryptedURL = btoa(encUserId + encAppId + encTempUrl + encTempName + encTempCategory);


            var encParam = btoa(previewId);
            $state.go('anon.livePreview', {
                userId: 'unknownUser',
                appId: previewId,
                tempUrl: templateUrl,
                tempName: templateName,
                tempCategory: templateCategory,
                p:encryptedURL
            });
    }
    }
})();
