(function() {
    'use strict';
    angular.module("appEdit").controller("PublishCtrl", ['$scope', '$mdDialog','item','toastr', '$rootScope', 'publishService', '$http', 'SERVER_URL', PublishCtrl]);

    function PublishCtrl($scope, $mdDialog, item, toastr, $rootScope, publishService, $http, SERVER_URL) {

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.defaultLanguage={
            language: "English"
        };
        disableTabs(0,false,false,false,false);
        function  disableTabs(activeTab,tab1,tab2,tab3,tab4) {
            $scope.activeTabIndex = activeTab;
            $scope.publishToAppStore = {
                general : tab1,
                contentRating: tab2,
                information: tab3,
                promotions: tab4
            };
        }
        publishService.getAllLanguages().
        success(function(data){
            $scope.languageList = data;
        }).error(function(err){
            alert("MainMenu Loading Error : " + err);
        });

        publishService.getAllRatings().
        success(function(data){
            $scope.contentRatingList = data;
        }).error(function(err){
            alert("MainMenu Loading Error : " + err);
        });

        publishService.getAllPrimaryCategories().
           success(function(data){
               $scope.primaryCatList = data;
           }).error(function(err){
               alert("MainMenu Loading Error : " + err);
           });

        publishService.getAllSecondaryCategories().
           success(function(data){
               $scope.secondaryCatList = data;
           }).error(function(err){
               alert("MainMenu Loading Error : " + err);
           });

    if(item == 'GooglePlay'){

       publishService.getExistingData(item).
            success(function(data){
                $scope.existingData = data;
                 if($scope.existingData.length == 0){
                        $scope.playStoreData ={language: $scope.defaultLanguage.language};
                 }
                 else{
                 $scope.thumbPic = $scope.existingData[0].file;

                        $scope.playStoreData = {
                            language : $scope.existingData[0].language,
                            primaryCat : $scope.existingData[0].primaryCategory,
                            secondaryCat : $scope.existingData[0].secondaryCategory,
                            name: $scope.existingData[0].name,
                            springBoardName: $scope.existingData[0].springBoardName,
                            desc: $scope.existingData[0].description,
                            keywords: $scope.existingData[0].keywords,
                        };
                        $scope.splash={
                            splash1 : $scope.existingData[0].splash1,
                            splash2 : $scope.existingData[0].splash2,
                            splash3 : $scope.existingData[0].splash3,
                            splash4 : $scope.existingData[0].splash4
                        };

                 }
            }).error(function(err){
                alert("MainMenu Loading Error : " + err);
            });
    }



        $scope.addGooglePlayInfo = function(file, playStoreData, splash) {

        if(file == null || playStoreData.name == null || playStoreData.springBoardName == null || playStoreData.language == null ||
        playStoreData.primaryCat == null || playStoreData.desc == null  ||
        playStoreData.keywords == null || splash.splash1 == null || splash.splash2 == null || splash.splash3 == null || splash.splash4 == null){
                    toastr.error('Fill all the fields', 'Warning', {
                          closeButton: true
                    });
        }
        else{
            playStoreData.category = 'GooglePlay';
            publishService.addGooglePlayInfo(file,playStoreData,splash)
            .success(function(data, status, headers, config) {
            toastr.success('Genaral info has been added', 'Saved', {
                                    closeButton: true
                                });
            }).error(function(data, status, headers, config) {
                toastr.error('Error while saving data', 'Warning', {
                      closeButton: true
                });
            })
        }
        };
        if(item == 'AppStore'){

        publishService.getExistingDataAppStore(item).
                    success(function(data){
                        $scope.existingData = data;
                         if($scope.existingData.length == 0){
                                $scope.playStoreData ={language: $scope.defaultLanguage.language};
                         }
                         else{
                         $scope.thumbPic = $scope.existingData[0].file;

                                $scope.appStoreData = {
                                    language : $scope.existingData[0].language,
                                    primaryCat : $scope.existingData[0].primaryCategory,
                                    secondaryCat : $scope.existingData[0].secondaryCategory,
                                    name: $scope.existingData[0].name,
                                    springBoardName: $scope.existingData[0].springBoardName,
                                    desc: $scope.existingData[0].description,
                                    keywords: $scope.existingData[0].keywords,
                                    supportUrl: $scope.existingData[0].supportUrl,
                                    marketingUrl: $scope.existingData[0].marketingUrl,
                                    privacyPolicyUrl: $scope.existingData[0].privacyPolicyUrl,
                                    copyrights: $scope.existingData[0].copyrights

                                };
                                $scope.publishSplash={
                                    splash1 : $scope.existingData[0].splash1,
                                    splash2 : $scope.existingData[0].splash2,
                                    splash3 : $scope.existingData[0].splash3,
                                    splash4 : $scope.existingData[0].splash4
                                };

                         }
                    }).error(function(err){
                        alert("MainMenu Loading Error : " + err);
                    });
        }
        $scope.addAppStoreInfo = function(file,appStoreData,publishSplash) {

            if(file == null || appStoreData.name == null || appStoreData.springBoardName == null || appStoreData.language == null ||
                    appStoreData.primaryCat == null || appStoreData.secondaryCat == null || appStoreData.desc == null  ||
                    appStoreData.keywords == null || appStoreData.supportUrl == null || appStoreData.marketingUrl == null ||
                    appStoreData.privacyPolicyUrl == null || appStoreData.copyrights == null || publishSplash.splash1 == null ||
                    publishSplash.splash2 == null || publishSplash.splash3 == null || publishSplash.splash4 == null){
                                toastr.error('Fill all the fields', 'Warning', {
                                      closeButton: true
                                });
                    }
            else{
                appStoreData.category = 'AppStore';
                publishService.addGooglePlayInfo(file,appStoreData,publishSplash)
                .success(function(data, status, headers, config) {
                disableTabs(1,false,false,false,false);
                toastr.success('Genaral info has been added', 'Saved', {
                    closeButton: true
                });
                }).error(function(data, status, headers, config) {
                    toastr.error('Error while saving data', 'Warning', {
                          closeButton: true
                    });
                })
            }
        }
        $scope.contentRating = function(){
            disableTabs(2,false,false,false,false);
        }
    }
})();
