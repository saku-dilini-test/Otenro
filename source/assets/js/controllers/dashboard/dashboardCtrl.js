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
                tempCategory: $scope.tempCategory
            })
        }else{

            var urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                           +"&appId="+item.id+"&"+new Date().getTime()+"/";

            mySharedService.prepForBroadcast(urlPath);
            $state.go('user.editApp',{appId: item.id});
        }
      }
    }
})();