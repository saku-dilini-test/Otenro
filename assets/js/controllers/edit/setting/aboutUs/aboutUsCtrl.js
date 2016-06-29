(function () {
    'use strict';
    angular.module("appEdit").controller("aboutUsCtrl", [
        '$scope', '$rootScope', '$mdDialog', 'toastr','ME_APP_SERVER','mySharedService','$auth', 'aboutUsService',
        aboutUsCtrl]);

    function aboutUsCtrl($scope, $rootScope, $mdDialog, toastr,ME_APP_SERVER, mySharedService,$auth, aboutUsService) {

        $scope.coords = "";

        aboutUsService.getContactUsInfo().success(function (result) {
            //  if(result.appId == $rootScope.appId) {
            $scope.basicInfo = result;
            $scope.webInfo = result;
            $scope.googleMap = result;
            $scope.openHours = result;
            $scope.coords = result.coords;

            if (!result.coords) {
                $scope.coords = {
                    latitude: 6.9320204155752050,
                    longitude: 79.8890950584107031
                };
            }

            $scope.map = {
                center: $scope.coords,
                zoom: 11,
                markers: [{
                    id: Date.now(),
                    coords: $scope.coords
                }],
                events: {
                    click: function (map, eventName, originalEventArgs) {
                        var e = originalEventArgs[0];
                        var lat = e.latLng.lat(),
                            lon = e.latLng.lng();
                        var marker = {
                            id: Date.now(),
                            coords: {
                                latitude: lat,
                                longitude: lon
                            }
                        };
                        $scope.map.markers = [];
                        $scope.map.markers.push(marker);
                        $scope.$apply();
                    }
                }
            };
            // }
        }).error(function (error) {
            alert("Contact Us information Loading Error : " + error);
        });

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
                toastr.error('Unable to Add', 'Warning', {
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
