(function () {
    'use strict';
    angular.module("appEdit").controller("TemplateCtrl", [
        '$scope','$mdDialog','toastr', 'templateService', '$rootScope','$auth','ME_APP_SERVER','mySharedService','$log',
        TemplateCtrl]);

    function TemplateCtrl($scope, $mdDialog, toastr, templateService, $rootScope,$auth,ME_APP_SERVER,mySharedService,$log) {


        templateService.getTemplates().success(function(data){
            $scope.templates = data;
            $log.debug(data);
        });

        $scope.changeTemplate = function (templateId, templateUrl, templateName,templateCategory) {

            var appParams = {
                'appName': 'preview',
                'templateId': templateId,
                'templateName': templateName,
                'templateUrl':templateUrl,
                'templateCategory' : templateCategory,
                'userId':$auth.getPayload().id,
                'appId' : $rootScope.appId
            };

            templateService.createTempTemplates(appParams).success(function(data){
                $scope.templates = data;
                $log.debug(data);
            });

            var url= ME_APP_SERVER+'temp/'+$auth.getPayload().id
                +'/templates/changePreview/?'+new Date().getTime();

            mySharedService.prepForBroadcast(url);
            $mdDialog.cancel();
            $rootScope.changeTemplate = true;
            var requestParams = {
                showConfirm : true
            }
            localStorage.setItem('changeTemplate', JSON.stringify(requestParams));
            $log.debug(localStorage.getItem('changeTemplate'));
            $log.debug($rootScope.changeTemplate);
        };
       
        // --- cancel dialog -----
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }
})();