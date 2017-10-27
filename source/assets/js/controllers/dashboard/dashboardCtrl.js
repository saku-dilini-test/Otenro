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
        .controller('DashboardCtrl', ['$scope','dashboardService','toastr','$state','$auth','ME_APP_SERVER',
            'mySharedService','$rootScope', 'SERVER_URL', DashboardCtrl]);

    function DashboardCtrl($scope, dashboardService,toastr,$state,$auth,ME_APP_SERVER,mySharedService,$rootScope,
            SERVER_URL) {
        dashboardService.getAllApps().success(function (data) {
            $rootScope.widgets=data;
            $scope.path = ME_APP_SERVER+"temp/";
        }).error(function (err) {
            toastr.error(err.error, 'Error', {
                closeButton: true
            });
        });

        $scope.goToEdit = function(item){
        if(item.appName == "preview"){
            console.log('inside preview');
            for(var i =0; i<$rootScope.templates.length; i++){
                if(item.templateId == $rootScope.templates[i].id){
                    $scope.templateName = $rootScope.templates[i].template_name;
                    $scope.tempCategory = $rootScope.templates[i].templateCategory;
                    $scope.tempUrl = $rootScope.templates[i].imageUrl;
                }
            }
            $state.go('anon.livePreview',{
                userId: $auth.getPayload().id,
                appId: item.id,
                tempUrl: $scope.tempUrl,
                tempName: $scope.templateName,
                tempCategory: $scope.tempCategory,
                isNew: item.isNew
            });
        }else{
            console.log('inside create');
            var encParam = btoa(item.id);

            var urlPath;
            if(item.isNew == 'true' || item.isNew == true){

                urlPath  =  "http://localhost:3000/meServer/otenro_server/" + $auth.getPayload().id
                    + "/progressiveTemplates/" + $rootScope.appId + "/src";
                $state.go('user.editApp',{tempName:item.templateName,isNew:item.isNew ,appId: item.id, p:encParam});

            }else{

                urlPath  =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                    +"&appId="+item.id+"&"+new Date().getTime()+"/";
                $state.go('user.editApp',{tempName:item.templateName,isNew:item.isNew ,appId: item.id, p:encParam});

            }

            mySharedService.prepForBroadcast(urlPath);

        }
      };
    }
})();