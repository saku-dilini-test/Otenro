(function() {
    'use strict';
    angular.module("appEdit").controller("contactUsCtrl", [
        '$scope','$rootScope','$mdDialog', 'toastr','contactUsService','uiGmapGoogleMapApi','commerceService','$auth',
        'ME_APP_SERVER','mySharedService','SERVER_URL',
        contactUsCtrl]);

    function contactUsCtrl($scope,$rootScope,$mdDialog,toastr, contactUsService,uiGmapGoogleMapApi,commerceService,$auth,
                            ME_APP_SERVER,mySharedService,SERVER_URL) {

        // --/-- Characters length config
        $scope.phoneLength = 15;
        $scope.maxBasicInfoAddress = 50;
        $scope.maxReturnPolicy = 200;
        $scope.maxTermsAndCondition = 200;
        $scope.maxPrivacyPolicy = 200;
        $scope.maxAboutUsHeader = 20;
        $scope.maxAboutUsContent = 200;
        $scope.userId = $auth.getPayload().id;
        $scope.isNew = $rootScope.tempNew;
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
                //alert("Contact Us information Loading Error : " + error);
        });

        //get about Us Information
        commerceService.showStoreSettings($rootScope.appId).success(function (data) {
            $scope.storeSettings = data[0];
            disableTabs(0,false,false,false);
        }).error(function (err) {
            toastr.error(' warning', "Unable to get Store Settings", {closeButton: true});
        });

        // init loading 1st tab active and other disable
        disableTabs(0,false,true,true);

        // --/-- enable & disable tabs --/--
        // --/-- Common function for enable disable tabs
        // --/-- Parameter : (Active-Tab number,1-tab boolean,2-tab boolean,3-tab boolean)
        // --/-- 1 - basic info, 2 - web info, 3 - google map
        function  disableTabs(activeTab,tab1,tab2,tab3) {
            $scope.activeTabIndex = activeTab;
            $scope.contactUsTabs = {
                basicInfo : tab1,
                policiesInfo : tab2,
                aboutUsInfo: tab3

           };
        }

        // Save Contact Us Information and move to About Us
        $scope.addContactUs = function(basicInfo,webInfo,googleMap,tab) {

            // If defined basic information address , Check length

            if (basicInfo.webSite && !$scope.protocolValidator(basicInfo.webSite)) {
                toastr.error('Web site should contain with http/https!', 'Warning', { closeButton: true });
                return false;
            }
            if (basicInfo.twitter && !$scope.protocolValidator(basicInfo.twitter)) {
                toastr.error('Twitter url should contain with http/https!', 'Warning', { closeButton: true });
                return false;
            }
            if (basicInfo.facebook && !$scope.protocolValidator(basicInfo.facebook)) {
                toastr.error('Facebook url should contain with http/https!', 'Warning', { closeButton: true });
                return false;
            }
            if (basicInfo.instagram && !$scope.protocolValidator(basicInfo.instagram)) {
                toastr.error('Instagram url should contain with http/https!', 'Warning', { closeButton: true });
                return false;
            }
            if (basicInfo.linkedin && !$scope.protocolValidator(basicInfo.linkedin)) {
                toastr.error('Linkedin url should contain with http/https!', 'Warning', { closeButton: true });
                return false;
            }
            if (basicInfo.pinterest && !$scope.protocolValidator(basicInfo.pinterest)) {
                toastr.error('Pinterest url site should contain with http/https!', 'Warning', { closeButton: true });
                return false;
            }

            if(typeof webInfo.email != 'undefined'){
                var basicInfoResponse = {
                    'appId': $rootScope.appId,
                    'address': !(basicInfo.address) ? null: basicInfo.address,
                    'telPhone': !(basicInfo.telPhone) ? null: basicInfo.telPhone,
                    'email': webInfo.email,
                    'webSite': !(basicInfo.webSite) ? null: basicInfo.webSite,
                    'twitter': !(basicInfo.twitter) ? null: basicInfo.twitter,
                    'facebook': !(basicInfo.facebook) ? null: basicInfo.facebook,
                    'instagram': !(basicInfo.instagram) ? null: basicInfo.instagram,
                    'linkedin': !(basicInfo.linkedin) ? null: basicInfo.linkedin,
                    'pinterest': !(basicInfo.pinterest) ? null: basicInfo.pinterest,
                    'showMap': webInfo.showMap,
                    'coords': $scope.map.markers[0].coords
                };

                contactUsService.saveBasicInfo(basicInfoResponse)
                    .success(function(data, status, headers, config) {
                        toastr.success('Contact us updated successfully ', 'Success!', {closeButton: true});
                        disableTabs(tab,false,false,true);
                    }).error(function(data, status, headers, config) {
                    toastr.error('Updating of basic information failed', { closeButton: true});
                });
            }else{
                toastr.error('Please enter email address', 'Error', { closeButton: true});
            }
        };

        $scope.savePolicies = function (storeSettings,tab) {

           //  Validate, Return Policy maximum characters length
             var returnPolicy = storeSettings.returnPolicy;
             if((typeof returnPolicy != 'undefined') &&
                 (returnPolicy.length > $scope.maxReturnPolicy)){
                 toastr.error('Return Policy, maximum characters length is exceed. ' +
                     'Maximum characters length is : '+$scope.maxReturnPolicy, 'Warning',
                     {closeButton: true}
                 );
                 return;
             }

             // Validate, Terms And Condition maximum characters length
             var termsAndCondition = storeSettings.termsAndCondition;
            if (typeof termsAndCondition === 'undefined' || termsAndCondition === '' ) {
                toastr.error('Please fill Terms and Conditions','Error', { closeButton: true});
                return;
            }
             // if((typeof termsAndCondition != 'undefined') &&
             //     (termsAndCondition.length > $scope.maxTermsAndCondition)){
             //     toastr.error('Terms And Condition, maximum characters length is exceed. ' +
             //         'Maximum characters length is : '+$scope.maxTermsAndCondition, 'Warning',
             //         {closeButton: true}
             //     );
             //     return;
             // }

             // Validate, Privacy Policy maximum characters length
             // var privacyPolicy = storeSettings.privacyPolicy;
             // if((typeof privacyPolicy != 'undefined') &&
             //     (privacyPolicy.length > $scope.maxPrivacyPolicy)){
             //     toastr.error('Privacy Policy, maximum characters length is exceed. ' +
             //         'Maximum characters length is : '+$scope.maxPrivacyPolicy, 'Warning',
             //         {closeButton: true}
             //     );
             //     return;
             // }
             else {
                 storeSettings.userId = $scope.userId;
                 storeSettings.appId = $rootScope.appId;
                 commerceService.savePolicies(storeSettings).success(function (data) {
                     toastr.success('Policies and Terms successfully updated.', 'Success!', {
                         closeButton: true
                     });
                     disableTabs(tab,false,false,false);
                 }).error(function (err) {
                     toastr.error("Unable to get Store Settings", 'Error!',{closeButton: true});
                 })
             }
         };

        //Save about us information and cloase the dialog box
        $scope.addAboutUs = function (storeSettings,tab) {

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
           // var content = storeSettings.content;
            // if((typeof content != 'undefined') &&
            //     (content.length > $scope.maxAboutUsContent)){
            //     toastr.error('About Us Content, maximum characters length is exceed. ' +
            //         'Maximum characters length is : '+$scope.maxAboutUsContent, 'Warning',
            //         {closeButton: true}
            //     );
            //     return;
            // }

            if (storeSettings!=null){
                if (!storeSettings.header  || !storeSettings.content) {
                    if ($scope.aboutUs.header.$error.pattern){
                        toastr.error("Symbols should not be used in the heading.", 'Error', {closeButton: true});
                    }else{
                        toastr.error("Please fill all fields", 'Warning', {closeButton: true});
                    }
                }else{

                    storeSettings.appId = $rootScope.appId;
                    storeSettings.userId = $scope.userId;
                    commerceService.saveStoreSettings(storeSettings)
                        .success(function (data, status, headers, config) {
                            toastr.success('About us updated', 'Success!', {
                                closeButton: true
                            });

                            var urlPath;
                            if ($scope.isNew){
                                urlPath =  SERVER_URL +"progressiveTemplates/viewProgUrl?userId="+ $auth.getPayload().id
                                    +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"/";
                                $scope.appTemplateUrl = urlPath+'' +
                                    'contact';
                            }else{
                                urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                                    +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"/";
                                $scope.appTemplateUrl = urlPath+'' +
                                    '#/app/aboutUs';
                            }

                            mySharedService.prepForBroadcast($scope.appTemplateUrl);
                            if(tab){
                                disableTabs(tab,false,false,false);
                            }
                            else{
                                $mdDialog.hide();
                            }
                        }).error(function (data, status, headers, config) {
                        toastr.error('Error updating Contact Us', 'Warning', {
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
        /**
         *  HTTP/HTTPS validator for urls
         *  
         *  @param url 
         * 
         *  @return boolean
         * 
        **/
        $scope.protocolValidator = function (url) {

            var firstIndexOfColon = url.indexOf(':');
            var protocol = url.slice(0, firstIndexOfColon);

            if (protocol === 'https' || protocol === 'http')
                return true;
            else
                return false;
        };
    }
})();
