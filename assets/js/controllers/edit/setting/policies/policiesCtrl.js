(function () {
    'use strict';
    angular.module("appEdit").controller("policiesCtrl", [
        '$scope', '$rootScope', '$mdDialog', 'toastr','ME_APP_SERVER','mySharedService','$auth', 'policiesService',
        'aboutUsService','SERVER_URL',
        aboutUsCtrl]);

    function aboutUsCtrl($scope, $rootScope, $mdDialog, toastr,ME_APP_SERVER, mySharedService,$auth, policiesService,
            aboutUsService,SERVER_URL) {

        $scope.addPolicies= function (policies) {

            policies.appId = $rootScope.appId;
            policiesService.addPolicies(policies)
                .success(function (data, status, headers, config) {
                    toastr.success('Policies successfully updated', 'Awesome!', {
                        closeButton: true
                    });
                    var urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                                   +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"/";
                    $scope.appTemplateUrl = urlPath+'' +
                        '#/app/Policies';
                    mySharedService.prepForBroadcast($scope.appTemplateUrl);
                }).error(function (data, status, headers, config) {
                toastr.error('Error updating policies', 'Warning', {
                    closeButton: true
                });
            })
        };

        $scope.addAboutUs = function (aboutUs) {

            aboutUs.appId = $rootScope.appId;
            aboutUsService.addAboutUs(aboutUs)
                .success(function (data, status, headers, config) {
                    toastr.success('About us updated', 'Awesome!', {
                        closeButton: true
                    });
                    var urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                                   +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"/";
                    $scope.appTemplateUrl = urlPath+'' +
                        '#/app/aboutUs';
                    mySharedService.prepForBroadcast($scope.appTemplateUrl);
                }).error(function (data, status, headers, config) {
                toastr.error('Error updating About Us', 'Warning', {
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
