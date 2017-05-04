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
        .controller('livePreviewCtrl',
        ['$scope', 'welcomeTemplatesResource', 'userProfileService','$stateParams','$mdDialog','mySharedService','$http','$state','ME_APP_SERVER',
        '$auth','toastr','$cookieStore','$cookies','$interval','$q','$log',
            livePreviewCtrl
        ]);


    function livePreviewCtrl($scope,welcomeTemplatesResource, userProfileService,$stateParams,$mdDialog,mySharedService,
    $http,$state,ME_APP_SERVER,$auth,toastr,$cookieStore,$cookies,$interval,$q,$log) {
        $scope.encParam = $stateParams.p;
        var decParams = atob($scope.encParam);

        var splitParams = decParams.split("/");

        welcomeTemplatesResource.getTemplates().success(function(data){
            $cookies.temp = data;
            $scope.templates = $cookies.temp;
            for(var i = 0; i < $scope.templates.length ; i++){
                if($scope.templates[i].template_name == splitParams[4]){
                    $scope.templateViewName = $scope.templates[i].templateViewName;
                    $scope.templateViewDesc = $scope.templates[i].templateViewDesc;
                }
            }
        });

        var loginFunction = function(agentInfo){
            var deferred = $q.defer();
            $state.go('anon.login', {
                    affid: agentInfo.affid,
                    clickid: agentInfo.clickid
            });
            $interval(function () {
                if ($auth.isAuthenticated()) {
                    var id = $auth.getPayload().id;
                    deferred.resolve(id);
                }
                })
            return deferred.promise;
        }

        $scope.userId = splitParams[0]; //$stateParams.userId;
        $scope.appId = splitParams[1]; //$stateParams.appId;
        $scope.tempUrl = splitParams[2];
        $scope.tempName = splitParams[4];
        $scope.tempCategory = splitParams[5];
        $scope.contentUrl = true;

        var userID = splitParams[0];
        var appID  = splitParams[1];

        // App URL create $statePrams
        $scope.appTemplateUrl = ME_APP_SERVER+'/temp'+'/'+$scope.userId+'/templates'+'/'+$scope.appId+'/';

        // App URL get from cookiesStore
        // $scope.appTemplateUrl = $cookieStore.get('url');


        $scope.deleteFile = function(userId,appId) {

            var appParams = {
                'userId': userId,
                'appId': appId
            };

            welcomeTemplatesResource.deletePreviewTemp(appParams).then(function(data) {
                $state.go('user.templates');
            });
        };
        $scope.successDeleteFile = function(userId,appId) {

            var appParams = {
                'userId': userId,
                'appId': appId
            };

            welcomeTemplatesResource.deletePreviewTemp(appParams).then(function(data) {

            });
        };

        $scope.answer = function(answer,templateId, templateUrl, templateName,templateCategory) {
            var agentInfo = {
                clickid : $stateParams.clickid,
                affid:$stateParams.affid

            }

        if($scope.appName== null){
            toastr.error('Please enter a name for the application', 'Warning', {
                  closeButton: true
            });
        }
        else{
                if ($auth.isAuthenticated()) {
                       $scope.successDeleteFile($scope.userId, $scope.appId);
                    var tempAppParams = {
                        'appName': $scope.appName,
                        'templateId': templateId,
                        'templateName': templateName,
                        'templateUrl':templateUrl,
                        'templateCategory' : templateCategory,
                        'userId':$auth.getPayload().id

                    };

                        welcomeTemplatesResource.createApp(tempAppParams).then(function(data){
                            if(data.data.appId == -1)
                            {
                                toastr.error(data.data.message, 'Warning', {
                                    closeButton: true
                                });
                            }else{
                                var url= ME_APP_SERVER+'temp/'+$auth.getPayload().id
                                    +'/templates/'+data.data.appId+'/?'+new Date().getTime();

                                mySharedService.prepForBroadcast(url);

                                var encParam = btoa(data.data.appId);
                                $state.go('user.editApp',{appId:data.data.appId, p:encParam });
                            }

                        });
                    $mdDialog.hide(answer);
                }else{
                    loginFunction(agentInfo).then(function(id){
                        $scope.successDeleteFile($scope.userId, $scope.appId);
                        var tempAppParams = {
                            'appName': $scope.appName,
                            'templateId': templateId,
                            'templateName': templateName,
                            'templateUrl':templateUrl,
                            'templateCategory' : templateCategory,
                            'userId':$auth.getPayload().id
                        };

                        welcomeTemplatesResource.createApp(tempAppParams).then(function(data){
                            if(data.data.appId == -1)
                            {
                                toastr.error(data.data.message, 'Warning', {
                                    closeButton: true
                                });

                                var encUserId = 'unknownUser' + "/";
                                var encAppId = templateId + "/";
                                var encTempUrl = templateUrl + "//";
                                var encTempName = templateName + "/";
                                var encTempCategory = templateCategory + "/";

                                var encryptedURL = btoa(encUserId + encAppId + encTempUrl + encTempName + encTempCategory);

                                $state.go('anon.livePreview', {
                                    userId: 'unknownUser',
                                    appId: templateId,
                                    tempUrl: templateUrl,
                                    tempName: templateName,
                                    tempCategory: templateCategory,
                                    p: encryptedURL
                                });



                            }else {
                                var url= ME_APP_SERVER+'temp/'+$auth.getPayload().id
                                    +'/templates/'+data.data.appId+'/?'+new Date().getTime();

                                mySharedService.prepForBroadcast(url);

                                var encParam = btoa(data.data.appId);
                                $state.go('user.editApp', {appId: data.data.appId, p: encParam});
                            }
                        });
                        $mdDialog.hide(answer);
                    });

                }
                }
                $scope.profileView = function () {
                    return userProfileService.showUserProfileDialog();
                }
        };


        $scope.answerProgressive = function(answer,templateId, templateUrl, templateName,templateCategory) {
            var agentInfo = {
                clickid : $stateParams.clickid,
                affid:$stateParams.affid

            }

            if($scope.appName== null){
                toastr.error('Please enter a name for the application', 'Warning', {
                      closeButton: true
                });
            }
            else{
                if ($auth.isAuthenticated()) {
                       $scope.successDeleteFile($scope.userId, $scope.appId);
                    var tempAppParams = {
                        'appName': $scope.appName,
                        'templateId': templateId,
                        'templateName': "test-app",
                        'templateUrl':templateUrl,
                        'templateCategory' : templateCategory,
                        'userId':$auth.getPayload().id

                    };

                        welcomeTemplatesResource.createProgApp(tempAppParams).then(function(data){
                            if(data.data.appId == -1)
                            {
                                toastr.error(data.data.message, 'Warning', {
                                    closeButton: true
                                });
                            }else{
                                var url= ME_APP_SERVER+'temp/'+$auth.getPayload().id
                                    +'/progressiveTemplates/'+data.data.appId+'/?'+new Date().getTime();

                                mySharedService.prepForBroadcast(url);

                                var encParam = btoa(data.data.appId);
                                $state.go('user.editApp',{appId:data.data.appId, p:encParam });
                            }

                        });
                    $mdDialog.hide(answer);
                }else{
                    loginFunction(agentInfo).then(function(id){
                        $scope.successDeleteFile($scope.userId, $scope.appId);
                        var tempAppParams = {
                            'appName': $scope.appName,
                            'templateId': templateId,
                            'templateName': "test-app",
                            'templateUrl':templateUrl,
                            'templateCategory' : templateCategory,
                            'userId':$auth.getPayload().id
                        };

                        welcomeTemplatesResource.createProgApp(tempAppParams).then(function(data){
                            if(data.data.appId == -1)
                            {
                                toastr.error(data.data.message, 'Warning', {
                                    closeButton: true
                                });

                                var encUserId = 'unknownUser' + "/";
                                var encAppId = templateId + "/";
                                var encTempUrl = templateUrl + "//";
                                var encTempName = templateName + "/";
                                var encTempCategory = templateCategory + "/";

                                var encryptedURL = btoa(encUserId + encAppId + encTempUrl + encTempName + encTempCategory);

                                $state.go('anon.livePreview', {
                                    userId: 'unknownUser',
                                    appId: templateId,
                                    tempUrl: templateUrl,
                                    tempName: templateName,
                                    tempCategory: templateCategory,
                                    p: encryptedURL
                                });



                            }else {
                                var url= ME_APP_SERVER+'temp/'+$auth.getPayload().id
                                    +'/progressiveTemplates/'+data.data.appId+'/?'+new Date().getTime();

                                mySharedService.prepForBroadcast(url);

                                var encParam = btoa(data.data.appId);
                                $state.go('user.editApp', {appId: data.data.appId, p: encParam});
                            }
                        });
                        $mdDialog.hide(answer);
                    });

                }
            }
                $scope.profileView = function () {
                    return userProfileService.showUserProfileDialog();
                }
        };

        $scope.deviceView = "mobile";
        $scope.changeDevice = function(deviceType){



            if(deviceType == "mobile"){
                $scope.deviceView = "mobile";
            }else if(deviceType == "tablet"){
                $scope.deviceView = "tabletView";

            }else if(deviceType == "web"){
                $scope.deviceView = "web";

            }


        };

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

    };

})();
