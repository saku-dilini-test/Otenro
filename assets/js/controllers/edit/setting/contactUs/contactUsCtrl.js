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
                     console.log('Update AppId : ' + data);
                     alert('Successfully save Contact Us Data ..... !');
                 }).error(function(data, status, headers, config) {
                     //alert('warning', "Unable to get templates", err.message);
                 })
        };

        $scope.addBasicInfo = function(basicInfo) {
            var basicInfoResponse = {
                'appId': $rootScope.appId,
                'address': basicInfo.address,
                'telPhone': basicInfo.telPhone
            };

            contactUsService.saveBasicInfo(basicInfoResponse)
            .success(function(data, status, headers, config) {
                 console.log('Updated AppId : ' + data.appId);
                 alert('Basic info saved successfully');
            }).error(function(data, status, headers, config) {
                 alert('Basic info saving error : ' + err.message);
            });
        };

        $scope.addWebInfo = function(webInfo) {
            var webInfoResponse = {
                'appId': $rootScope.appId,
                'email': webInfo.email,
                'webSite': webInfo.webSite
            };

            contactUsService.saveWebInfo(webInfoResponse)
            .success(function(data, status, headers, config) {
                 console.log('Updated AppId : ' + data.appId);
                 alert('Web info saved successfully');
            }).error(function(data, status, headers, config) {
                 alert('Web info saving error : ' + err.message);
            });
        };

        $scope.addGoogleMap = function(googleMapInfo) {
            console.log($scope.map.markers);
            var googleMapInfoResponse = {
                'appId': $rootScope.appId,
                'coords': $scope.map.markers[0].coords
            };

            contactUsService.saveGoogleMapInfo(googleMapInfoResponse)
                .success(function(data, status, headers, config) {
                    console.log('Updated AppId : ' + data.appId);
                    alert('Google Map Info saved successfully');
                }).error(function(data, status, headers, config) {
                    alert('Google Map Info saving error : ' + err.message);
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
                    console.log(data);
                 console.log('Updated AppId : '+ data.appId);
                 alert('Open hours information saved successfully');
            }).error(function(data, status, headers, config) {
                 alert('Open hours info saving error : ' + err.message);
            });
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
