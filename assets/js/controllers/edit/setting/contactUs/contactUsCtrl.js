(function() {
    'use strict';
    angular.module("appEdit").controller("contactUsCtrl", [
        '$scope','$rootScope','$mdDialog', 'toastr','contactUsService','uiGmapGoogleMapApi','commerceService','$auth',
        'ME_APP_SERVER','mySharedService',
        contactUsCtrl]);

    function contactUsCtrl($scope,$rootScope,$mdDialog,toastr, contactUsService,uiGmapGoogleMapApi,commerceService,$auth,
                            ME_APP_SERVER,mySharedService) {

        // --/-- Characters length config
        $scope.maxBasicInfoAddress = 20;
        $scope.userId = $auth.getPayload().id;
        
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
            uiGmapGoogleMapApi.then(function(maps) {
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
            });
               // }
        }).error(function (error) {
                alert("Contact Us information Loading Error : " + error);
        });

        //get about Us Information
        commerceService.showStoreSettings($rootScope.appId).success(function (data) {
            $scope.storeSettings = data[0];
        }).error(function (err) {
            toastr.error(' warning', "Unable to get Store Settings", {closeButton: true});
        });

        // init loading 1st tab active and other disable
        disableTabs(0,false,true);

        // --/-- enable & disable tabs --/--
        // --/-- Common function for enable disable tabs
        // --/-- Parameter : (Active-Tab number,1-tab boolean,2-tab boolean,3-tab boolean)
        // --/-- 1 - basic info, 2 - web info, 3 - google map
        function  disableTabs(activeTab,tab1,tab2,tab3) {
            $scope.activeTabIndex = activeTab;
            $scope.contactUsTabs = {
                basicInfo : tab1,
                aboutUsInfo: tab2

           };
        }

        // Save Contact Us Information and move to About Us
        $scope.addContactUs = function(basicInfo,webInfo,googleMap) {

            // If defined basic information address , Check length
            if((typeof basicInfo.address != 'undefined') && (basicInfo.address.length > $scope.maxBasicInfoAddress)){
                toastr.error('Address should be less than '+$scope.maxBasicInfoAddress+' letters.',
                    'Warning',{closeButton: true}
                );
                return;
            }

            if(typeof basicInfo.address == 'undefined' && typeof basicInfo.telPhone == 'undefined'){
                toastr.error('Basic Information not update', { closeButton: true});
            }else if(typeof basicInfo.address == 'undefined'){
                toastr.error('Address Not Update', { closeButton: true});
            }
            else if(typeof basicInfo.telPhone == 'undefined'){
                toastr.error('Tel phone Not Update', { closeButton: true});
            }
            else if(typeof webInfo.email == 'undefined' && typeof webInfo.webSite == 'undefined'){
                toastr.error('Web Information not update', { closeButton: true});
            }
            else if(typeof webInfo.email == 'undefined'){
                toastr.error('Email Not Update', { closeButton: true});
            }
            else if(typeof webInfo.webSite == 'undefined'){
                toastr.error('Web Site Not Update', { closeButton: true});
            }
            else{
                var basicInfoResponse = {
                    'appId': $rootScope.appId,
                    'address': basicInfo.address,
                    'telPhone': basicInfo.telPhone,
                    'email': webInfo.email,
                    'webSite': webInfo.webSite,
                    'coords': $scope.map.markers[0].coords
                };
                contactUsService.saveBasicInfo(basicInfoResponse)
                    .success(function(data, status, headers, config) {
                        toastr.success('Basic Info saved successfully', 'Awsome!', {closeButton: true});
                        disableTabs(1,false,false);
                    }).error(function(data, status, headers, config) {
                    toastr.error('Basic info saving error', { closeButton: true});
                });
            }
        };

        //Save about us information and cloase the dialog box
        $scope.addAboutUs = function (storeSettings) {

            // Validate, About Us Header maximum characters length
            var header = storeSettings.header;
            if((typeof header != 'undefined') &&
                (header.length > $scope.maxAboutUsHeader)){
                toastr.error('About Us Header, maximum characters length is exceed. ' +
                    'Maximum characters length is : '+$scope.maxAboutUsHeader, 'Warning',
                    {closeButton: true}
                );
                return;
            }
            // Validate, About Us Content maximum characters length
            var content = storeSettings.content;
            if((typeof content != 'undefined') &&
                (content.length > $scope.maxAboutUsContent)){
                toastr.error('About Us Content, maximum characters length is exceed. ' +
                    'Maximum characters length is : '+$scope.maxAboutUsContent, 'Warning',
                    {closeButton: true}
                );
                return;
            }

            if (storeSettings!=null){
                if (!storeSettings.header  || !storeSettings.content) {
                    toastr.error(' warning', "Please fill all the fields", {closeButton: true});
                }else{

                    storeSettings.appId = $rootScope.appId;
                    storeSettings.userId = $scope.userId;
                    commerceService.saveStoreSettings(storeSettings)
                        .success(function (data, status, headers, config) {
                            toastr.success('Successfully save About Us Data ..... !', 'Awsome!', {
                                closeButton: true
                            });
                            $scope.appTemplateUrl = ME_APP_SERVER+'temp/'+$auth.getPayload().id
                                +'/templates/'+$rootScope.appId+'' +
                                '#/app/aboutUs';
                            mySharedService.prepForBroadcast($scope.appTemplateUrl);
                            $mdDialog.hide();
                        }).error(function (data, status, headers, config) {
                        toastr.error('Unable to Add', 'Warning', {
                            closeButton: true
                        });
                    })
                }
            }else {
                $scope.selectedTab = current;
            }

        };

        // button function
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
//        $scope.answer = function() {
//            $mdDialog.hide();
//        };
    }
})();
