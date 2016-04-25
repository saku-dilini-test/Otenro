(function() {
    'use strict';
    angular.module("appEdit").controller("contactUsCtrl", [
        '$scope','$rootScope','$mdDialog', 'toastr','contactUsService',
        contactUsCtrl]);

    function contactUsCtrl($scope,$rootScope,$mdDialog,toastr, contactUsService) {

        $scope.coords ="";

        contactUsService.getContactUsInfo().success(function(result){
            //  if(result.appId == $rootScope.appId) {
            $scope.basicInfo = result;
            $scope.webInfo = result;
            $scope.googleMap = result;
            $scope.openHours = result;
            $scope.coords =result.coords;

            if(!result.coords){
                $scope.coords={
                    latitude : 6.9320204155752050,
                    longitude: 79.8890950584107031
                };
            }

            $scope.map= {
                center: $scope.coords,
                zoom: 11,
                markers: [{
                    id: Date.now(),
                    coords:$scope.coords
                }],
                events: {
                    click: function(map, eventName, originalEventArgs) {
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
                        $scope.map.markers=[];
                        $scope.map.markers.push(marker);
                        $scope.$apply();
                            }
                        }
                    };
               // }
        }).error(function (error) {
                alert("Contact Us information Loading Error : " + error);
        });

        $scope.addContactUs = function(contactUs) {
             var contactInfo = {
                 'appId': $rootScope.appId,
                 'address': contactUs.address,
                 'telPhone': contactUs.telPhone,
                 'email': contactUs.email,
                 'webSite': contactUs.webSite,
                 'weekDaysOpenHour': contactUs.weekDaysOpenHour,
                 'weekDaysOpenMinute': contactUs.weekDaysOpenMinute,
                 'weekDaysCloseHour': contactUs.weekDaysCloseHour,
                 'weekDaysCloseMinute': contactUs.weekDaysCloseMinute,
                 'saturdayOpenHour': contactUs.saturdayOpenHour,
                 'saturdayOpenMinute': contactUs.saturdayOpenMinute,
                 'saturdayCloseHour': contactUs.saturdayCloseHour,
                 'saturdayCloseMinute': contactUs.saturdayCloseMinute,
                 'sundayOpenHour': contactUs.sundayOpenHour,
                 'sundayOpenMinute': contactUs.sundayOpenMinute,
                 'sundayCloseHour': contactUs.sundayCloseHour,
                 'sundayCloseMinute': contactUs.sundayCloseMinute
             };

             contactUsService.addContactUs(contactInfo)
                .success(function(data, status, headers, config) {
                toastr.success('Successfully save Contact Us Data ..... !', 'Awsome!', {
                                        closeButton: true
                                    });
                 }).error(function(data, status, headers, config) {
                      toastr.error('Unable to Add', 'Warning', {
                                             closeButton: true
                      });
                 })
        };

        $scope.addBasicInfo = function(current,basicInfo) {
            var basicInfoResponse = {
                'appId': $rootScope.appId,
                'address': basicInfo.address,
                'telPhone': basicInfo.telPhone
            };
            $scope.activeTabIndex = current;

            contactUsService.saveBasicInfo(basicInfoResponse)
            .success(function(data, status, headers, config) {
            toastr.success('Basic info saved successfully', 'Awsome!', {
                closeButton: true
            });
            }).error(function(data, status, headers, config) {
                toastr.error('Basic info saving error', {
                                   closeButton: true
                });
            });
        };

        $scope.addWebInfo = function(current,webInfo) {
            var webInfoResponse = {
                'appId': $rootScope.appId,
                'email': webInfo.email,
                'webSite': webInfo.webSite
            };
            $scope.activeTabIndex = current;

            contactUsService.saveWebInfo(webInfoResponse)
            .success(function(data, status, headers, config) {
            toastr.success('Web info saved successfully', 'Awsome!', {
                closeButton: true
            });
            }).error(function(data, status, headers, config) {
                toastr.error('Web info saving error', {
                                   closeButton: true
                });
            });
        };

        $scope.addGoogleMap = function(current,googleMapInfo) {
            var googleMapInfoResponse = {
                'appId': $rootScope.appId,
                'coords': $scope.map.markers[0].coords
            };

            $scope.activeTabIndex = current;

            contactUsService.saveGoogleMapInfo(googleMapInfoResponse)
                .success(function(data, status, headers, config) {
                toastr.success('Google Map Info saved successfully', 'Awsome!', {
                    closeButton: true
                });
                }).error(function(data, status, headers, config) {
                    toastr.error('Google Map Info saving error', {
                             closeButton: true
                    });
                });
        };

        $scope.addOpenHoursInfo = function(openHours) {
            var openHoursResponse = {
                'appId': $rootScope.appId,
                'weekDaysOpenHour': openHours.weekDaysOpenHour,
                'weekDaysOpenMinute': openHours.weekDaysOpenMinute,
                'weekDaysCloseHour': openHours.weekDaysCloseHour,
                'weekDaysCloseMinute': openHours.weekDaysCloseMinute,
                'saturdayOpenHour': openHours.saturdayOpenHour,
                'saturdayOpenMinute': openHours.saturdayOpenMinute,
                'saturdayCloseHour': openHours.saturdayCloseHour,
                'saturdayCloseMinute': openHours.saturdayCloseMinute,
                'sundayOpenHour': openHours.sundayOpenHour,
                'sundayOpenMinute': openHours.sundayOpenMinute,
                'sundayCloseHour': openHours.sundayCloseHour,
                'sundayCloseMinute': openHours.sundayCloseMinute
            };

            contactUsService.saveOpenHoursInfo(openHoursResponse)
            .success(function(data, status, headers, config) {
            toastr.success('Open hours information saved successfully', 'Awsome!', {
                closeButton: true
            });
                 $mdDialog.hide();
            }).error(function(data, status, headers, config) {
                 toastr.error('Open hours info saving error', {
                          closeButton: true
                 });
            });
        };

        $scope.nextStep = function(current) {
            $scope.activeTabIndex = current;
        };

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function() {
            $mdDialog.hide();
        };
    }
})();
