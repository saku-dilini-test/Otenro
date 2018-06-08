
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
            template:  '<md-dialog aria-label="sample images" style="width:initial">' +
                       '<img src="images/templates/'+path+image+'" class="img-thumbnail">'+
                       '</md-dialog>',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
          })
        };

                $scope.comingSoonMessage = function (scope) {
                    return $mdDialog.show({
                        controllerAs: 'dialogCtrl',
                        controller: function($mdDialog){

                            this.confirm = function click(){
                                $mdDialog.hide();
                            }
                        },
                        template:'<md-dialog aria-label="Edit Child Menu">'+
                        '<md-content >' +
                        '<div class="md-dialog-header">' +
                        '<h1>Coming soon !!!!!</h1>' +
                        '                </div> <br>'+
                        ' <div style="text-align:center"><lable> This Template will be coming soon! </lable></div>' +
                        '<br><br><div class="md-dialog-buttons">'+
                        '<div class="inner-section">'+
                        '<md-button class="me-default-button" ng-click="dialogCtrl.confirm()">Ok</md-button>'+
                        '</div>'+
                        '</div>' +
                        '</md-content>' +
                        '</md-dialog>'
                    })

                };

        $scope.viewApp = function(templateId, templateUrl, templateName,templateCategory,previewId,isNew,comingSoon) {

            if(comingSoon){

                $scope.comingSoonMessage();

            }else{

            $rootScope.checkId = previewId;
           console.log("templateId  :" + templateId);
            console.log("templateName : " + templateName);
            console.log("previewId  :" + previewId );
            console.log("isNew  :" + isNew );


            var urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                + "&appId="+previewId+"&"+new Date().getTime()+"/";

            var url= urlPath+'/?'+new Date().getTime();

            mySharedService.prepForBroadcast(url);

            var encUserId = 'unknownUser' + "/";
            var encAppId = previewId + "/";
            var encTempUrl = templateUrl + "/";
            var encTempName = templateName + "/";
            var encTempCategory = templateCategory + "/";
            var encIsNew = isNew + "/";


            var encryptedURL = btoa(encUserId + encAppId + encTempUrl + encTempName + encTempCategory + encIsNew);


            var encParam = btoa(previewId);
            $state.go('anon.livePreview', {
                userId: 'unknownUser',
                appId: previewId,
                isNew: isNew,
                tempUrl: templateUrl,
                tempName: templateName,
                tempCategory: templateCategory,
                p:encryptedURL
            });
    }
    }
    }
})();
