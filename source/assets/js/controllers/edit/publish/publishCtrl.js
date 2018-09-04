(function() {
    'use strict';
    angular.module("appEdit")
    .directive('numbersOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9.]/g, '');
                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    }).controller("PublishCtrl", ['$scope', '$mdDialog','item','carouselService',
        'toastr', '$rootScope', 'publishService', 'contactUsService', '$http', 'SERVER_URL','$auth','$window','technicalSupportService','$filter', PublishCtrl]);

    function PublishCtrl($scope, $mdDialog, item, carouselService, toastr, $rootScope, publishService, contactUsService, $http, SERVER_URL,$auth,$window,technicalSupportService,$filter) {

        // config
        $scope.passwordRegularExpression = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{7,}";
        // max character length defined
        $scope.maxTitle = 30;
        $scope.maxShortDescription = 80;
        $scope.maxFullDescription = 4000;
        $scope.image = [];
        $scope.splash = [];
        $scope.publishSplash = [];
        $scope.allowPlayStore;
        $scope.successPublish = false;
        $scope.isApkAvailable =  false;

        carouselService.getApplicationData($rootScope.appId).success(function(res){
            $scope.appData = res;
            technicalSupportService.getPublishDetails({appId: $rootScope.appId})
                .success(function (appPubishData) {
                    if(appPubishData.length>0 && appPubishData[0].operators) {
                        var approvedOperators = $filter('filter')(appPubishData[0].operators, {'status': 'APPROVED'});
                        $scope.isApkAvailable = approvedOperators && approvedOperators.length>0 && $scope.appData.apkStatus==='SUCCESS';
                    }
                }).error(function (error) {
                  console.log("Error fetching ");
                });
        });

        contactUsService.getContactUsInfo().success(function(res){
            console.log(res);
            $scope.appContactData = res;
        });

        // Mobile App-App Store-Config
        $scope.maxName = 20;
        $scope.maxSpringBoardName = 20;
        $scope.maxDesc = 80;
        $scope.maxKeywords = 80;

        $scope.validateSize = function(image,width,height,idx){
            if(image){
                if(image.type != "image/png"){
                $scope.splash[idx] = null;
                    toastr.error('Please upload PNG format image', 'Warning', {
                          closeButton: true
                    });
                }else if(image.width != width && image.height != height){
                $scope.splash[idx] = null;
                    toastr.error('Image should be in recommended size', 'Warning', {
                          closeButton: true
                    });
                }
            }
        };

         $scope.nextStep = function (current) {
                    $scope.activeTabIndex = current;
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
            //alert("MainMenu Loading Error : " + err);
        });

        publishService.getAllRatings().
        success(function(data){
            $scope.contentRatingList = data;
        }).error(function(err){
            //alert("MainMenu Loading Error : " + err);
        });

        publishService.getAllPrimaryCategories().
           success(function(data){
               $scope.primaryCatList = data;
           }).error(function(err){
               //alert("MainMenu Loading Error :          " + err);
           });

        publishService.getAllSecondaryCategories().
           success(function(data){
               $scope.secondaryCatList = data;
           }).error(function(err){
               //alert("MainMenu Loading Error : " + err);
           });

       publishService.getAllPorts().
           success(function(data){
               $scope.Ports = data.ports;
               $scope.Renewals = data.renewalIntervals;
           }).error(function(err){
               //alert("MainMenu Loading Error : " + err);
       });

//       publishService.getAllPrice().
//           success(function(data){
//               $scope.Price = data.price;
//           }).error(function(err){
//               //alert("MainMenu Loading Error : " + err);
//       });

       publishService.getKeywordLength().
           success(function(data){
           console.log(data);
               $scope.keywordLength = data.length;
           }).error(function(err){
               //alert("MainMenu Loading Error : " + err);
       });

        $scope.commentView = function(operator){

            publishService.showCommentView($scope.comments,operator,$scope.operators);

        }

        technicalSupportService.getAppStatus()
            .success(function (result) {
                $scope.statuses = result.PUBLISH_STATUSES;

            }).error(function (error) {
            toastr.error('Loading Error', 'Warning', {
                closeButton: true
            });
        });

        technicalSupportService.getOperators()
            .success(function (result) {
                var op = [];
                Object.keys(result).map(function(i){
                    op.push(result[i]);
                });
                $scope.operators = op;

                console.log($scope.operators);

            }).error(function (error) {
            toastr.error('Loading Error', 'Warning', {
                closeButton: true
            });
        });

        technicalSupportService.getCommentsApp()
            .success(function(comments){
            $scope.comments = comments;
        }).error(function(error){
              toastr.error('Comments Loading Error', 'Warning', {
                    closeButton: true
              });
        })

        if(item == 'Status'){
            publishService.getExistingData("GooglePlay").success(function(data){
                        $scope.publishData = data;
            }).error(function(err){
               //alert("MainMenu Loading Error : " + err);
            });
        }

        $scope.getOperators = function(operator){
        var op;
            $scope.operators.forEach(function(ele){
                if(operator == ele.code){
                    op = ele.desc;
                }
            });
            return op;
        }

        $scope.getStatus = function(status){
        var stat;
            $scope.statuses.forEach(function(ele){
                if(status == ele.code){
                    stat = ele.description;
                }
            });
            return stat;
        }

        if(item == 'GooglePlay'){

           publishService.getExistingData(item).
                success(function(data){
                     $scope.existingData = data;
                     if($scope.existingData.length == 0){
                            $scope.playStoreData ={language: $scope.defaultLanguage.language};
                            $scope.playStoreData.title = $scope.appData.appName;
                            $scope.playStoreData.email = $scope.appContactData.email

                     }
                     else{
                            console.log($scope.existingData)
                            $scope.successPublish = true;
                            var tempImagePath;
                            if($scope.existingData[0].isNew === true) {

                                tempImagePath = SERVER_URL + "templates/viewWebImages?userId=" + $auth.getPayload().id
                                    + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "&images=publish/";
                            }else {

                                tempImagePath = SERVER_URL + "templates/viewImages?userId=" + $auth.getPayload().id
                                    + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "&img=publish/";
                            }

                                for (var i=0; i< 7; i++) {
                                    var tempImageUrl = tempImagePath + i+'.png';
                                    $scope.splash.push(tempImageUrl);
                                }


                            var notSubmittedOperators = $filter('filter')($scope.existingData[0].operators, {'status': 'NOT_SUBMITTED'});
                            var isAppSubmitted = notSubmittedOperators.length != $scope.existingData[0].operators.length;

                           /* $scope.thumbPic = $scope.existingData[0].file;*/
                            $scope.playStoreData = {
                                language : $scope.existingData[0].language,
                                primaryCat : $scope.existingData[0].primaryCategory,
                                secondaryCat : $scope.existingData[0].secondaryCategory,
                                title: $scope.existingData[0].title,
                                shortDescription: $scope.existingData[0].shortDescription,
                                fullDescription: $scope.existingData[0].fullDescription,
                                email: $scope.existingData[0].email,
                                keyword: $scope.existingData[0].keyword,
//                                serviceID: $scope.existingData[0].serviceID,
                                port: $scope.existingData[0].port,
                                price: $scope.existingData[0].price,
                                operators: $scope.existingData[0].operators,
                                isAppSubmitted: isAppSubmitted
                            /*  keywords: $scope.existingData[0].keywords,*/
                            };
                     }
                }).error(function(err){
                    //alert("MainMenu Loading Error : " + err);
                });
        }

        $scope.chkPlaystore = function(status){

            if(status == false){
                $scope.playStoreData.language = null;
                $scope.playStoreData.primaryCat = null;

            }
        }

        $scope.toggle = function(operator,flag, index){
            console.log(operator);
            console.log(flag);
            console.log(index);

            if(flag == true){
                operator.amount = "";
                operator.interval = "";
            }

        }

        $scope.close = function(){
            $mdDialog.hide();
        }

        $scope.getDescription = function(status){

            if(status){
                var arr = $filter('filter')($scope.statuses,{ "code": status });
                    if(arr){
                        return arr[0].description;
                    }
            }
        }

        $scope.operatorDes = function(status){

            if(status){
                var arr = $filter('filter')($scope.operators,{ "code": status });
                    if(arr){
                        return arr[0].desc;
                    }
            }
        }

        $scope.validate = function(evt){
            console.log(evt);
             var charCode = (evt.which) ? evt.which : event.keyCode
                    if (charCode > 31 && (charCode < 48 || charCode > 57))
                        return false;
                    return true;
        }

        $scope.save = function(data){
            var isRequestUpdate = false;
            var showSavedMsg = true;
            data.forEach(function(ele){

                if(ele.isEnabled == true){
                    if(ele.status == "NOT_SUBMITTED" || ele.status == "REJECTED"){

                        if(!ele.amount && !ele.interval){
                            showSavedMsg = false;
                            toastr.error('Please enter the amount and renewal for ' + ele.operator, 'Warning', {
                                  closeButton: true
                            });
                        }else if(!ele.amount){
                            showSavedMsg = false;
                            toastr.error('Please enter the amount for ' + ele.operator, 'Warning', {
                                  closeButton: true
                            });
                        }else if(!ele.interval) {
                            showSavedMsg = false;
                            toastr.error('Please select the renewal for ' + ele.operator, 'Warning', {
                                closeButton: true
                            });

                        }
                        else if(ele.interval == "Daily") {
                                if (ele.priceRange.daily.min > ele.amount || ele.priceRange.daily.max < ele.amount) {
                                    showSavedMsg = false;
                                    toastr.error('Please enter a price between ' + ele.priceRange.daily.min + ' and ' + ele.priceRange.daily.max + ' for ' + ele.operator, 'Warning', {
                                        closeButton: true
                                    });
                                }
                                else{
                                    ele.status = "SUBMITTED_FOR_CONFIG";
                                    isRequestUpdate = true;
                                }
                        }
                        else if(ele.interval == "Monthly"){
                                if(ele.priceRange.monthly.min > ele.amount || ele.priceRange.monthly.max < ele.amount ){
                                    showSavedMsg = false;
                                    toastr.error('Please enter a price between ' + ele.priceRange.monthly.min +' and ' + ele.priceRange.monthly.max + ' for ' + ele.operator, 'Warning',{
                                        closeButton: true
                                    });
                                }
                                else{
                                    ele.status = "SUBMITTED_FOR_CONFIG";
                                    isRequestUpdate = true;
                                }
                        }
                        else{
                            ele.status = "SUBMITTED_FOR_CONFIG";
                            isRequestUpdate = true;
                            console.log("one");
                        }
                    }
                }else{
                    if(ele.status == "REJECTED"){
                        isRequestUpdate = true;
                    }
                }

            });


            if(isRequestUpdate){
                showSavedMsg = false;
                publishService.updateOperators(data).success(function(res){
                    toastr.success('Operators information has been added successfully', 'Saved', {
                        closeButton: true
                    });
                }).error(function() {

                    toastr.error('Unable to update operators ', 'Warning', {
                        closeButton: true
                    });
                    $mdDialog.hide();

                });
            }

            if(showSavedMsg){
                toastr.success('Operators information has been saved successfully', 'Saved', {
                    closeButton: true
                });
            }
        }

        $scope.getAPKFilePath = function(appName){
            return '/getApkPath?appId=' + $rootScope.appId + '&userId=' + $auth.getPayload().id + "&appName=" + appName;
        }

        $scope.addGooglePlayInfo = function(file, playStoreData, splash, allowPlayStore) {
             $scope.isValidFormData = true;
             $scope.count = 0;

            if(allowPlayStore == true &&(splash[0] == null || splash[1] == null|| splash[6] == null|| playStoreData.title == null || playStoreData.shortDescription == null ||
                playStoreData.language == null ||
                playStoreData.primaryCat == null || playStoreData.fullDescription == null  ||
                playStoreData.email==null || playStoreData.keyword==null || playStoreData.port==null)){

                        toastr.error('Please fill all fields  ', 'Warning', {
                              closeButton: true
                        });
            }else if(!allowPlayStore &&(splash[0] == null || splash[1] == null|| splash[6] == null|| playStoreData.title == null || playStoreData.shortDescription == null ||
                 playStoreData.fullDescription == null  ||
                 playStoreData.email==null || playStoreData.keyword==null || playStoreData.port==null)){

                        toastr.error('Please fill all fields  ', 'Warning', {
                              closeButton: true
                        });
            }
            else {
                         if($scope.existingData.length > 0){
                            playStoreData.operators = $scope.existingData[0].operators;
                         }

                    playStoreData.category = 'GooglePlay';
                    publishService.addGooglePlayInfo(playStoreData,$rootScope.tempNew)
                        .success(function(data, status, headers, config) {

                        console.log(data);
                            $scope.playStoreData.operators = data.details.operators;

                                splash.forEach(function(splash,idx){
                                    if (JSON.stringify(splash).match("blobUrl")){
                                        publishService.uploadPublishFiles(splash,idx,$rootScope.tempNew)
                                            .success(function (data, status, headers, config) {

                                            if( idx == 6 && data.idx == "6"){
                                                $scope.activeTabIndex = 1;
                                            }
                                            }).error(function (data, status, headers, config) {

                                        });
                                    }
                                });

                                $scope.successPublish = true;
                                if($scope.existingData.length > 0){
                                    $scope.activeTabIndex = 1;
                                }

                            toastr.success('General information has been added successfully', 'Saved', {
                                closeButton: true
                            });
//                            $mdDialog.hide();
                        }).error(function(data, status, headers, config) {
                        if(status == "409"){
                            toastr.error('This keyword is already in use.Please enter a unique keyword', 'Warning', {
                                closeButton: true
                            });
                        }else{
                            toastr.error('Unable to save ', 'Warning', {
                                closeButton: true
                            });
                            $mdDialog.hide();
                        }
                    });


            }
        };


        //start of AppStore------------------------------//

        if(item == 'AppStore'){
            publishService.getExistingDataAppStore(item).
                    success(function(data){
                        $scope.existingData = data;
                         if($scope.existingData.length == 0){
                                $scope.appStoreData ={language: $scope.defaultLanguage.language};
                         }
                         else{

                             var tempImagePath =  SERVER_URL +"templates/viewImages?userId="+ $auth.getPayload().id
                                 +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"&img=publish/";

                             for (var i=0; i< 6; i++) {
                                 var tempImageUrl = tempImagePath + i+'ios'+'.png';
                                 $scope.publishSplash.push(tempImageUrl);
                             }

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
                                    name : $scope.existingData[0].name,
                                    language : $scope.existingData[0].language,
                                    primaryCat : $scope.existingData[0].primaryCat,
                                    secondaryCat : $scope.existingData[0].secondaryCat,
                                    title: $scope.existingData[0].title,
                                    desc: $scope.existingData[0].desc,
                                    springBoardName: $scope.existingData[0].springBoardName,
                                    shortDescription: $scope.existingData[0].shortDescription,
                                    fullDescription: $scope.existingData[0].description,
                                    keywords: $scope.existingData[0].keywords,
                                    supportUrl: $scope.existingData[0].supportUrl,
                                    marketingUrl: $scope.existingData[0].marketingUrl,
                                    privacyPolicyUrl: $scope.existingData[0].privacyPolicyUrl,
                                    copyrights: $scope.existingData[0].copyrights

                                };


                         }
                    }).error(function(err){
                        //alert("MainMenu Loading Error : " + err);
                    });
        }
        

     // App Store 
        $scope.addAppStoreInfo = function(appStoreData,publishSplash) {
            $scope.count = 0;
            if (appStoreData.name == null || appStoreData.springBoardName == null || appStoreData.language == null ||
                    appStoreData.primaryCat == null || appStoreData.secondaryCat == null || appStoreData.desc == null ||
                    appStoreData.keywords == null || appStoreData.supportUrl == null || appStoreData.marketingUrl == null ||
                    appStoreData.privacyPolicyUrl == null || appStoreData.copyrights == null) {
                    toastr.error('Fill all the fields', 'Warning', {
                        closeButton: true
                    });

            }else {
                    appStoreData.category = 'AppStore';
                    publishService.addAppStoreInfo(appStoreData, publishSplash)
                        .success(function (data, status, headers, config) {
                            disableTabs(1, true, false, true, true);
                            toastr.success('General information has been added successfully', 'Saved', {
                                closeButton: true
                            });
                        }).error(function (data, status, headers, config) {
                        toastr.error('Error while saving data', 'Warning', {
                            closeButton: true
                        });
                    });


                   publishSplash.forEach(function (publishSplash) {
                        if (JSON.stringify(publishSplash).match("blobUrl")) {
                            publishService.uploadPublishFiles(publishSplash, $scope.count +"ios")
                                .success(function (data, status, headers, config) {
                                }).error(function (data, status, headers, config) {
                            });
                        }
                        $scope.count++;
                    })
                }
        };
            // else {
            //     if ( appStoreData.language == null ||
            //         appStoreData.primaryCat == null || appStoreData.secondaryCat == null ||
            //         appStoreData.keywords == null || appStoreData.supportUrl == null || appStoreData.marketingUrl == null ||
            //         appStoreData.privacyPolicyUrl == null || appStoreData.copyrights == null || publishSplash.splash1 == null ||
            //         publishSplash.splash2 == null || publishSplash.splash3 == null || publishSplash.splash4 == null) {
            //         toastr.error('Please fill all fields ', 'Warning', {
            //             closeButton: true
            //         });
            //     }
            //     else {
            //         appStoreData.category = 'AppStore';
            //         publishService.addGooglePlayInfo(file, appStoreData, publishSplash)
            //             .success(function (data, status, headers, config) {
            //                 disableTabs(1, false, false, false, false);
            //                 toastr.success('General information has been added successfully', 'Saved', {
            //                     closeButton: true
            //                 });
            //             }).error(function (data, status, headers, config) {
            //             toastr.error('Error while saving data', 'Warning', {
            //                 closeButton: true
            //             });
            //         })
            //      }
            //  }
        // };
        
        $scope.contentRatings = function(contentRating){
            contentRating.category = 'AppStore';
            publishService.addContentRating(contentRating)
            .success(function(data){
                disableTabs(2,false,false,false,false);
                toastr.success('Content Rating information has been added successfully', 'Saved', {
                    closeButton: true
                });
                $mdDialog.hide();
            }).error(function(err){
                toastr.error('Error while saving data', 'Warning', {
                      closeButton: true
                });
                $mdDialog.hide();
            })
        }
        $scope.appReviewInfo = function(appReview){
            appReview.category = 'AppStore';
            publishService.addAppReviewInformation(appReview)
            .success(function(data){
                disableTabs(3,false,false,false,false);
                toastr.success('General info has been added', 'Saved', {
                    closeButton: true
                });
            }).error(function(err){
                toastr.error('Error while saving data', 'Warning', {
                      closeButton: true
                });
            })
        }

                $scope.downLoadSampleFile = function () {
                console.log("im in");

                    $window.open('http://localhost:1337/getApk'); // Open the file serving route in a new window/tab so we don't navigate away from this page


//                    $http({
//                        method: 'POST',
//                        url: SERVER_URL+"edit/getApkPath" ,
//                        data: {file:""},
//                        responseType: 'arraybuffer'
//                    }).success(function (data, status, headers) {
//                        headers = headers();
//
//                        var filename = headers['x-filename'];
//                        var contentType = headers['content-type'];
//
//                        var linkElement = document.createElement('a');
//                        try {
//                            var blob = new Blob([data], {type: contentType});
//                            var url = window.URL.createObjectURL(blob);
//
//                            linkElement.setAttribute('href', url);
//                            linkElement.setAttribute("download", filename);
//
//                            var clickEvent = new MouseEvent("click", {
//                                "view": window,
//                                "bubbles": true,
//                                "cancelable": false
//                            });
//                            linkElement.dispatchEvent(clickEvent);
//                        } catch (ex) {
//                            console.log(ex);
//                        }
//                    }).error(function (data) {
//                        console.log(data);
//                    });
                };

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
    // }
}})();
