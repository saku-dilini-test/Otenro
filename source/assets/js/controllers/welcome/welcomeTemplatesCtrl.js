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
      '$auth','$rootScope','$timeout','SERVER_URL','$location',
            WelcomeTemplatesCtrl
        ]);

    function WelcomeTemplatesCtrl($scope, $mdDialog, welcomeTemplatesResource, userProfileService,$state,mySharedService,
    ME_APP_SERVER,$auth,$rootScope,$timeout,SERVER_URL,$location) {


        //console.log($location.search());
        if ($auth.isAuthenticated()) {
            $scope.isAuthenticated = true;
            $state.go('user.dashboard');
        }else {
            $scope.nonAuthenticated = true;
        }


        $scope.profileView = function () {
            return userProfileService.showUserProfileDialog();
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
  
        $scope.viewApp = function(templateId, templateUrl, templateName,progTemplateName,templateCategory,previewId,isNew) {
                    var userId = '';
                    var urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId=unknownUser"
                                    +"&appId="+previewId+"&"+new Date().getTime()+"/";

                    var affid = $location.search().affid;
                    var clickid = $location.search().clickid;

            console.log("templateId  :" + templateId);
            console.log("templateName : " + templateName);
            console.log("previewId  :" + previewId );
            console.log("isNew  :" + isNew );

                    var encUserId = 'unknownUser' + "/";
                    var encAppId = previewId + "/";
                    var encTempUrl = templateUrl + "/";
                    var encTempName = templateName + "/";
                    var encTempCategory = templateCategory + "/";

                    var encryptedURL = btoa(encUserId + encAppId + encTempUrl + encTempName + encTempCategory + isNew);

                    var url= urlPath+'/?'+new Date().getTime();
                    mySharedService.prepForBroadcast(url);

                        $state.go('anon.livePreview', {
                            userId: 'unknownUser',
                            appId: previewId,
                            isNew: isNew,
                            tempUrl: templateUrl,
                            tempName: templateName,
                            tempCategory: templateCategory,
                            affid: affid,
                            clickid: clickid,
                            p: encryptedURL
                        });

        }

    }

})();
