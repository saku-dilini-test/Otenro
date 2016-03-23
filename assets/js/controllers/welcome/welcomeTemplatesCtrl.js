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
      ['$scope', '$mdDialog', 'welcomeTemplatesResource', 'userProfileService',
            WelcomeTemplatesCtrl
        ]);

    function WelcomeTemplatesCtrl($scope, $mdDialog, welcomeTemplatesResource, userProfileService) {
        welcomeTemplatesResource.getTemplates().success(function(data){
            $scope.templates = data;
            });

        $scope.open = function(templateId, templateUrl, templateName) {

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'user/welcome/startAppWindowView.html',
                parent: angular.element(document.body),
                //targetEvent: ev,
                resolve: {
                    initialData:["$q",function($q){
                        return $q.all({
                            selectedTemplateUrl: templateUrl,
                            selectedTemplateId : templateId,
                            selectedTemplateName:  templateName
                        })
                    }]
                },
                clickOutsideToClose:true
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        $scope.profileView = function() {
            return userProfileService.showUserProfileDialog();
        }
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
        $scope.answer = function(answer) {
            var appParams = {
                        'appName': $scope.appName,
                        'templateId': initialData.selectedTemplateId,
                        'templateName': initialData.selectedTemplateName,
                        'templateUrl':initialData.selectedTemplateUrl
                    };
            console.log(appParams);
            if ($auth.isAuthenticated()) {

                welcomeTemplatesResource.createApp(appParams).then(function(data){

                    var url= ME_APP_SERVER+'temp/'+$auth.getPayload().id
                        +'/templates/'+data.data.appId+'/?'+new Date().getTime();

                    mySharedService.prepForBroadcast(url);
                    $state.go('user.editApp',{appId:data.data.appId});
                });
            }else{
                $state.go('anon.login');
            }
            $mdDialog.hide(answer);
        };
    }
})();
