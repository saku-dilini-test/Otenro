(function() {
    'use strict';
    angular.module("appEdit").controller("PublishCtrl", ['$scope', '$mdDialog','item','toastr', '$rootScope', 'publishService', '$http', 'SERVER_URL', PublishCtrl]);

    function PublishCtrl($scope, $mdDialog, item, toastr, $rootScope, publishService, $http, SERVER_URL) {

        // config
        $scope.passwordRegularExpression = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{7,}";
        // max character length defined
        $scope.maxTitle = 30;
        $scope.maxShortDescription = 80;
        $scope.maxFullDescription = 4000;
        $scope.image = [];





        $scope.setImage = function (img) {

            if (img == undefined) {
                toastr.error('Upload Image', 'Warning', {
                    closeButton: true
                });
            } else {
                $scope.picFile = $scope.tmpImage[img];
            }
        };


        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.defaultLanguage={
            language: "English"
        };
        disableTabs(0,false,false,false,true);
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
               alert("MainMenu Loading Error :          " + err);
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
                            title: $scope.existingData[0].title,
                            shortDescription: $scope.existingData[0].shortDescription,
                            fullDescription: $scope.existingData[0].fullDescription,
                            email: $scope.existingData[0].email,
                          /*  keywords: $scope.existingData[0].keywords,*/
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

            alert ("splash.splash2 " + splash.splash2.getProperties);
            
        if(file == null || playStoreData.title == null || playStoreData.shortDescription == null || playStoreData.language == null ||
        playStoreData.primaryCat == null || playStoreData.fullDescription == null  ||
        splash.splash1 == null || splash.splash2 == null || splash.splash3 == null || splash.splash4 == null ||playStoreData.email==null){
                    toastr.error('Fill all the fields', 'Warning', {
                          closeButton: true
                    });
        }
        else{
          /*  playStoreData.category = 'GooglePlay';*/
            publishService.addGooglePlayInfo(file,playStoreData,splash)
            .success(function(data, status, headers, config) {
            $mdDialog.hide();
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








        //start of AppStore------------------------------//



        if(item == 'AppStore'){

        publishService.getExistingDataAppStore(item).
                    success(function(data){
                        $scope.existingData = data;
                         if($scope.existingData.length == 0){
                                $scope.playStoreData ={language: $scope.defaultLanguage.language};
                         }
                         else{
                         $scope.thumbPic = $scope.existingData[0].file;
                         $scope.serverImage = $scope.existingData[0].file;
                                $scope.appReview = {
                                    firstName : $scope.existingData[0].firstName,
                                    lastName : $scope.existingData[0].lastName,
                                    email : $scope.existingData[0].email,
                                    phoneNumber : $scope.existingData[0].phoneNumber,
                                    demoAccountUser : $scope.existingData[0].demoAccountUser,
                                    demoAccountPassword : $scope.existingData[0].password,
                                }
                                $scope.contentRating = {
                                    cartoonViolence : $scope.existingData[0].cartoonViolence,
                                    realisticViolence : $scope.existingData[0].realisticViolence,
                                    nudityViolence : $scope.existingData[0].nudityViolence,
                                    alcoholViolence : $scope.existingData[0].alcoholViolence,
                                    matureViolence : $scope.existingData[0].matureViolence,
                                    gamblingViolence : $scope.existingData[0].gamblingViolence,
                                    profanityViolence : $scope.existingData[0].profanityViolence,
                                    horrorViolence : $scope.existingData[0].horrorViolence
                                }

                                $scope.appStoreData = {
                                    language : $scope.existingData[0].language,
                                    primaryCat : $scope.existingData[0].primaryCategory,
                                    secondaryCat : $scope.existingData[0].secondaryCategory,
                                    title: $scope.existingData[0].title,
                                    shortDescription: $scope.existingData[0].shortDescription,
                                    fullDescription: $scope.existingData[0].description,
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
            if(file == null && $scope.serverImage == $scope.thumbPic){
            if(appStoreData.title == null || appStoreData.shortDescription == null || appStoreData.language == null ||
                    appStoreData.primaryCat == null || appStoreData.secondaryCat == null || appStoreData.fullDescription == null  ||
                    appStoreData.keywords == null || appStoreData.supportUrl == null || appStoreData.marketingUrl == null ||
                    appStoreData.privacyPolicyUrl == null || appStoreData.copyrights == null){
                                toastr.error('Fill all the fields', 'Warning', {
                                      closeButton: true
                                });
                    }
                    else{
                        appStoreData.category = 'AppStore';
                        file = $scope.thumbPic;
                        publishService.addGooglePlayInfo(file,appStoreData,publishSplash)
                        .success(function(data, status, headers, config) {
                        disableTabs(1,true,false,true,true);
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
            else{
            if(file == null || appStoreData.title == null || appStoreData.shortDescription == null || appStoreData.language == null ||
              appStoreData.primaryCat == null || appStoreData.secondaryCat == null || appStoreData.fullDescription == null  ||
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
        }
        $scope.contentRatings = function(contentRating){
            contentRating.category = 'AppStore';
            publishService.addContentRating(contentRating)
            .success(function(data){
                disableTabs(2,false,false,false,false);
                toastr.success('Genaral info has been added', 'Saved', {
                    closeButton: true
                });
            }).error(function(err){
                toastr.error('Error while saving data', 'Warning', {
                      closeButton: true
                });
            })
        }
        $scope.appReviewInfo = function(appReview){
            appReview.category = 'AppStore';
            publishService.addAppReviewInformation(appReview)
            .success(function(data){
                disableTabs(3,false,false,false,false);
                toastr.success('Genaral info has been added', 'Saved', {
                    closeButton: true
                });
            }).error(function(err){
                toastr.error('Error while saving data', 'Warning', {
                      closeButton: true
                });
            })
        }

        //end of AppStore------------------------------//

        /*$scope.addAppReviewInformation = function(appReviewInformation){
            if(!appReviewInformation||!appReviewInformation.firstName||
                     !appReviewInformation.lastName||!appReviewInformation.email||!appReviewInformation.phoneNumber||
                     !appReviewInformation.demoUserFirstName||!appReviewInformation.demoUserPassword){

                toastr.error('Please Fill all the fields with valid  data', 'Warning', {
                    closeButton: true
                });
            }else {
                disableTabs(3,true,true,true,false);
            }
        }*/
    }
})();
