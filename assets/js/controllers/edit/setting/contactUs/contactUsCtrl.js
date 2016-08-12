(function() {
    'use strict';
    angular.module("appEdit").controller("contactUsCtrl", [
        '$scope','$rootScope','$mdDialog', 'toastr','contactUsService',
        contactUsCtrl]);

    function contactUsCtrl($scope,$rootScope,$mdDialog,toastr, contactUsService) {

        // --- Config ----
        $scope.coords ="";
        contactUsService.getContactUsInfo().success(function(result){
            //  if(result.appId == $rootScope.appId) {
            $scope.basicInfo = result;
            $scope.webInfo = result;
            $scope.googleMap = result;
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
        // init loading 1st tab active and other disable
        disableTabs(1,false,true,true);

        // --/-- enable & disable tabs --/--
        // --/-- Common function for enable disable tabs
        // --/-- Parameter : (Active-Tab number,1-tab boolean,2-tab boolean,3-tab boolean)
        // --/-- 1 - basic info, 2 - web info, 3 - google map
        function  disableTabs(activeTab,tab1,tab2,tab3) {
            $scope.activeTabIndex = activeTab;
            $scope.contactUsTabs = {
                basicInfo : tab1,
                webInfo: tab2,
                googleMap: tab3
            };
        }


        // Save Basic Information and move to Web Information
        $scope.addBasicInfo = function(basicInfo) {
            if(typeof basicInfo.address == 'undefined' && typeof basicInfo.telPhone == 'undefined'){
                toastr.error('Basic Information not update', { closeButton: true});
                // go next tab
                disableTabs(2,true,false,true);
            }else{
                if(typeof basicInfo.address == 'undefined'){
                    toastr.error('Address Not Update', { closeButton: true});
                }
                if(typeof basicInfo.telPhone == 'undefined'){
                    toastr.error('Tel phone Not Update', { closeButton: true});
                }
                var basicInfoResponse = {
                    'appId': $rootScope.appId,
                    'address': basicInfo.address,
                    'telPhone': basicInfo.telPhone
                };
                contactUsService.saveBasicInfo(basicInfoResponse)
                    .success(function(data, status, headers, config) {
                        toastr.success('Basic Info saved successfully', 'Awsome!', {closeButton: true});
                        // go next tab
                        disableTabs(2,true,false,true);
                    }).error(function(data, status, headers, config) {
                    toastr.error('Basic info saving error', { closeButton: true});
                });
            }
        };

        // Save Web Information and move to Google Map
        $scope.addWebInfo = function(webInfo) {
            if(typeof webInfo.email == 'undefined' && typeof webInfo.webSite == 'undefined'){
                toastr.error('Web Information not update', { closeButton: true});
                // go next tab
                disableTabs(3,true,true,false);
            }else{
                if(typeof webInfo.email == 'undefined'){
                    toastr.error('Email Not Update', { closeButton: true});
                }
                if(typeof webInfo.webSite == 'undefined'){
                    toastr.error('Web Site Not Update', { closeButton: true});
                }
                var webInfoResponse = {
                    'appId': $rootScope.appId,
                    'email': webInfo.email,
                    'webSite': webInfo.webSite
                };
                contactUsService.saveWebInfo(webInfoResponse)
                    .success(function(data, status, headers, config) {
                        toastr.success('Web info saved successfully', 'Awsome!', {closeButton: true});
                        // to next tab
                        disableTabs(3,true,true,false);
                    }).error(function(data, status, headers, config) {
                        toastr.error('Web info saving error', {closeButton: true});
                });
            }
        };

        // Save Google Map information
        $scope.addGoogleMap = function(current,googleMapInfo) {
            var googleMapInfoResponse = {
                'appId': $rootScope.appId,
                'coords': $scope.map.markers[0].coords
            };
            contactUsService.saveGoogleMapInfo(googleMapInfoResponse)
                .success(function(data, status, headers, config) {
                    toastr.success('Google Map Info saved successfully', 'Awsome!', {closeButton: true});
                    // finished and back to 1st tab
                    disableTabs(1,false,true,true);
                }).error(function(data, status, headers, config) {
                    toastr.error('Google Map Info saving error', {closeButton: true});
                });
        };

        // button function
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
