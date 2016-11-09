(function () {
    'use strict';
    angular.module("appEdit").controller("policiesCtrl", [
        '$scope', '$rootScope', '$mdDialog', 'toastr','ME_APP_SERVER','mySharedService','$auth', 'policiesService','aboutUsService',
        aboutUsCtrl]);

    function aboutUsCtrl($scope, $rootScope, $mdDialog, toastr,ME_APP_SERVER, mySharedService,$auth, policiesService,aboutUsService) {

        $scope.addPolicies= function (policies) {

            policies.appId = $rootScope.appId;
            policiesService.addPolicies(policies)
                .success(function (data, status, headers, config) {
                    toastr.success('Policies successfully updated', {
                        closeButton: true
                    });
                    $scope.appTemplateUrl = ME_APP_SERVER+'temp/'+$auth.getPayload().id
                        +'/templates/'+$rootScope.appId+'' +
                        '#/app/Policies';
                    mySharedService.prepForBroadcast($scope.appTemplateUrl);
                }).error(function (data, status, headers, config) {
                toastr.error('Error updating Policies', 'Warning', {
                    closeButton: true
                });
            })
        };

        $scope.addAboutUs = function (aboutUs) {

            aboutUs.appId = $rootScope.appId;
            aboutUsService.addAboutUs(aboutUs)
                .success(function (data, status, headers, config) {
                    toastr.success('Successfully save About Us Data ..... !', 'Awsome!', {
                        closeButton: true
                    });
                    $scope.appTemplateUrl = ME_APP_SERVER+'temp/'+$auth.getPayload().id
                        +'/templates/'+$rootScope.appId+'' +
                        '#/app/aboutUs';
                    mySharedService.prepForBroadcast($scope.appTemplateUrl);
                }).error(function (data, status, headers, config) {
                toastr.error('Error updating Contact us', 'Warning', {
                    closeButton: true
                });
            })
        };


        $scope.nextStep = function (current) {
            $scope.activeTabIndex = current;
        };

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function () {
            $mdDialog.hide();
        };
    }
})();
