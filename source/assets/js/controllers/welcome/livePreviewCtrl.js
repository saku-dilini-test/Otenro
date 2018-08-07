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
        '$auth','toastr','$cookieStore','$cookies','$interval','$q','$log','commerceService',
            livePreviewCtrl
        ]);


    function livePreviewCtrl($scope,welcomeTemplatesResource, userProfileService,$stateParams,$mdDialog,mySharedService,
    $http,$state,ME_APP_SERVER,$auth,toastr,$cookieStore,$cookies,$interval,$q,$log,commerceService) {
        $scope.encParam = $stateParams.p;
        var decParams = atob($scope.encParam);
        console.log("decParams  : " + decParams);
        var splitParams = decParams.split("/");

        welcomeTemplatesResource.getTemplates().success(function (data) {
            $cookies.temp = data;
            $scope.templates = $cookies.temp;
            for (var i = 0; i < $scope.templates.length; i++) {
                if ($scope.templates[i].template_name == splitParams[4]) {
                    $scope.templateViewName = $scope.templates[i].templateViewName;
                    $scope.templateViewDesc = $scope.templates[i].templateViewDesc;
                }
            }
        });

        var loginFunction = function (agentInfo) {
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

        $scope.temporaryMessage = function (scope) {
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
                ' <div style="text-align:center"><lable> This Feature will be coming soon! </lable></div>' +
                '<br><br><div class="md-dialog-buttons">'+
                '<div class="inner-section">'+
                '<md-button class="me-default-button" ng-click="dialogCtrl.confirm()">Ok</md-button>'+
                '</div>'+
                '</div>' +
                '</md-content>' +
                '</md-dialog>'
            })

        };

        $scope.deviceView = "mobile";
        $scope.changeDevice = function(deviceType){



            if(deviceType == "mobile"){
                $scope.deviceView = "mobile";
            }else if(deviceType == "tablet"){
                $scope.deviceView = "tabletView";

            }else if(deviceType == "web"){

                if($scope.isNew == 'true'){
                    $scope.deviceView = "web";
                }else{
                    $scope.temporaryMessage();
                    $scope.deviceView = "web";
            }


            }


        };


        $scope.userId = splitParams[0]; //$stateParams.userId;
        $scope.appId = splitParams[1]; //$stateParams.appId;
        $scope.tempUrl = splitParams[2];
        $scope.tempName = splitParams[4];
        $scope.tempCategory = splitParams[5];
        $scope.isNew = splitParams[6];
        $scope.contentUrl = true;
        console.log("$scope.isNew  : " + $scope.isNew);
        var userID = splitParams[0];
        var appID = splitParams[1];

        console.log("ME_APP_SERVER  : " + ME_APP_SERVER);
        // App URL create $statePrams

        /*
         *Live preview Area display
         */
        if ($scope.isNew == 'true' || $scope.isNew == true) {
            $scope.appTemplateUrl = ME_APP_SERVER + 'temp' + '/' + $scope.userId + '/progressiveTemplates' + '/' + $scope.appId + '/src';
            $scope.urlPath1 = ME_APP_SERVER + 'temp' + '/' + $scope.userId + '/progressiveTemplates' + '/' + $scope.appId + '/src';

        }else{
        $scope.appTemplateUrl = ME_APP_SERVER + 'temp' + '/' + $scope.userId + '/templates' + '/' + $scope.appId + '/';
        // $scope.urlPath1 = ME_APP_SERVER+'/temp'+'/'+$scope.userId+'/webTemplates'+'/'+$scope.appId+'/';
    }


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

        $scope.answer = function(answer,templateId, templateUrl, templateName,templateCategory,isNew) {
            console.log("templateName  : " + templateName);
            console.log("isNew  : " + isNew);

            var agentInfo = {
                clickid : $stateParams.clickid,
                affid:$stateParams.affid

            }

        if($scope.appName){
         if($scope.appName.length > 25){
            toastr.error('Please enter a 25 or less character name for the application', 'Warning', {
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
//                    console.log('live preview is new :  ' + isNew);

//                    if(isNew == 'true' || isNew == true){
//                        console.log('inside web');

                        welcomeTemplatesResource.createProgApp(tempAppParams).then(function(data){
                                            if(data.data.appId == -1)
                                            {
                                                toastr.error(data.data.message, 'Warning', {
                                                    closeButton: true
                                                });
                                            }else{
                                                var url= ME_APP_SERVER+'temp/'+$auth.getPayload().id
                                                    +'/progressiveTemplates/'+data.data.appId+'/?'+new Date().toISOString();

                                                mySharedService.prepForBroadcast(url);

                                                var encParam = btoa(data.data.appId);
                                                $state.go('user.editApp',{isNew:isNew, appId:data.data.appId, p:encParam });
                                                commerceService.showRemoveDefaultDataDialog("remove");
                                            }

                                        });
//
//                    }else {
//
//                        console.log('inside mobile');
//                        welcomeTemplatesResource.createApp(tempAppParams).then(function (data) {
//                            if (data.data.appId == -1) {
//                                toastr.error(data.data.message, 'Warning', {
//                                    closeButton: true
//                                });
//                            } else {
//                                var url = ME_APP_SERVER + 'temp/' + $auth.getPayload().id
//                                    + '/templates/' + data.data.appId + '/?' + new Date().toISOString();
//
//                                mySharedService.prepForBroadcast(url);
//
//                                var encParam = btoa(data.data.appId);
//                                $state.go('user.editApp', {isNew:isNew, appId: data.data.appId, p: encParam});
//                                commerceService.showRemoveDefaultDataDialog("remove");
//
//                            }
//
//                        });
//                    }
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

//                        if(isNew == 'true' || isNew == true){

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
                                                var encIsNew = isNew + "/";

                                                var encryptedURL = btoa(encUserId + encAppId + encTempUrl + encTempName + encTempCategory + encIsNew);

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
                                                    +'/progressiveTemplates/'+data.data.appId+'/?'+new Date().toISOString();

                                                mySharedService.prepForBroadcast(url);

                                                var encParam = btoa(data.data.appId);
                                                $state.go('user.editApp', {isNew:isNew, appId: data.data.appId, p: encParam});
                                                commerceService.showRemoveDefaultDataDialog("remove");

                                            }
                                        });

//                        }else {
//
//                            welcomeTemplatesResource.createApp(tempAppParams).then(function (data) {
//                                if (data.data.appId == -1) {
//                                    toastr.error(data.data.message, 'Warning', {
//                                        closeButton: true
//                                    });
//
//                                    var encUserId = 'unknownUser' + "/";
//                                    var encAppId = templateId + "/";
//                                    var encTempUrl = templateUrl + "//";
//                                    var encTempName = templateName + "/";
//                                    var encTempCategory = templateCategory + "/";
//                                    var encIsNew = isNew + "/";
//
//                                    var encryptedURL = btoa(encUserId + encAppId + encTempUrl + encTempName + encTempCategory + encIsNew);
//
//                                    $state.go('anon.livePreview', {
//                                        userId: 'unknownUser',
//                                        appId: templateId,
//                                        isNew: isNew,
//                                        tempUrl: templateUrl,
//                                        tempName: templateName,
//                                        tempCategory: templateCategory,
//                                        p: encryptedURL
//                                    });
//
//                                } else {
//                                    var url = ME_APP_SERVER + 'temp/' + $auth.getPayload().id
//                                        + '/templates/' + data.data.appId + '/?' + new Date().toISOString();
//
//                                    mySharedService.prepForBroadcast(url);
//
//                                    var encParam = btoa(data.data.appId);
//                                    $state.go('user.editApp', {isNew:isNew, appId: data.data.appId, p: encParam});
//                                    commerceService.showRemoveDefaultDataDialog("remove");
//                                }
//                            });
//                        }
                        $mdDialog.hide(answer);
                    });

                }
                }
                }else{
                             toastr.error('Please enter a name for the application', 'Warning', {
                                   closeButton: true
                             });
                         }
                $scope.profileView = function () {
                    return userProfileService.showUserProfileDialog();
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
