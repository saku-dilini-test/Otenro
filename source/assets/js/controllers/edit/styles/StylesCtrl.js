(function () {
    'use strict';
    angular.module("appEdit").controller("StylesCtrl",
        ['$scope','$mdDialog','$rootScope','$timeout','toastr','$window','stylesService','ME_APP_SERVER','$auth','SERVER_URL',
        'mySharedService','$log',StylesCtrl]);

    function StylesCtrl($scope,$mdDialog,$rootScope,$timeout,toastr,$window,stylesService,ME_APP_SERVER,$auth,SERVER_URL,
            mySharedService) {

        var appId = $rootScope.appId;

        $scope.myImage='';
        $scope.myCroppedImage='';
        $scope.picFile='';
        $scope.buttonName = "Browse Image";
        $scope.tmpImage = [];
        $scope.tmpLogo= [];
        $scope.path = ME_APP_SERVER+"temp/";


        $scope.cropImage = function () {
            var handleFileSelect=function(evt) {
                var file=evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function($scope){
                        $scope.myImage=evt.target.result;
                        $scope.picFile =  $scope.myImage
                    });
                };
                reader.readAsDataURL(file);
                $scope.buttonName = "Crop Image";
            };
            angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        }

        $scope.addImage = function(img){
            if(angular.element('#fileInput').val() == ''){
                toastr.error('Please choose an image to upload', 'Warning', {
                    closeButton: true
                });
            }
            else{
                $scope.tmpImage[0] = img;
                $scope.myImage = null;
                toastr.success('Image has been uploaded successfully', 'message', {
                    closeButton: true
                });
            }

            $scope.buttonName = "Browse Image";
        };


        $scope.loadFonts = function() {
            // Use timeout to simulate a 650ms request.
            return $timeout(function () {
                $scope.reqFonts = [
                        "Arial",
                        "Tahoma",
                        "Dingbats",
                        "Ubuntu Light",
                        "URW Chancery L",
                        "UnPilgi"
                    ];
            }, 650);
        };

        $scope.headerImg = ME_APP_SERVER +'temp/' +$auth.getPayload().id+'/templates/'+appId+'/img/header.jpg?time='+new Date();
        $scope.backgroundImg = ME_APP_SERVER+'temp/' +$auth.getPayload().id+'/templates/'+appId+'/img/background.jpg?time='+new Date();
        $scope.fonts = {
            font : 'Arial',
            fontSize : 11
        };

        $scope.fontFamilyList = ["Arial","Tahoma","Dingbats","Ubuntu Light","URW Chancery L"];
        $scope.fontSizeList = [2,3,4,5,6];
        $scope.fontWeightList = ["normal","bold","bolder","lighter"];
        $scope.buttonBorderWidthList = ['0px','1px','2px','3px','4px','5px'];
        $scope.buttonBorderRadiusList = ['0px','1px','2px','3px','4px','5px','10px','15px','20px'];


        stylesService.getAppSettings({'appId':appId}).success(function (data) {

            var appSettings = data.appSettings;

            $scope.appUpdateLocation = data.appUpdateLocationSetting;

            $scope.editBackgroundImage = appSettings.isApplyBGImage;
            $scope.isApplyBGImage = appSettings.isApplyBGImage;
            $scope.isApplyStyle = appSettings.isApplyStyle;
            $scope.backgroundColor = appSettings.backgroundColor;
            $scope.navigationBarColor = appSettings.navigationBarColor;
            $scope.footerColor = appSettings.footerColor;
            $scope.navigationBarFontColor = appSettings.navigationBarFontColor;
            $scope.headerFontColor = appSettings.headerFontColor;
            $scope.contentFontColor = appSettings.contentFontColor;
            $scope.footerFontColor = appSettings.footerFontColor;
            $scope.buttonColor = appSettings.buttonColor;
            $scope.buttonFontColor = appSettings.buttonFontColor;
            $scope.buttonBorderColor = appSettings.buttonBorderColor;
            $scope.headerFontFamilyProp = {
                "value": appSettings.headerFontFamily,
                "values": $scope.fontFamilyList
            };
            $scope.contentFontFamilyProp = {
                "value": appSettings.contentFontFamily,
                "values": $scope.fontFamilyList
            };
            $scope.footerFontFamilyProp = {
                "value": appSettings.footerFontFamily,
                "values": $scope.fontFamilyList
            };
            $scope.buttonFontFamilyProp = {
                "value": appSettings.buttonFontFamily,
                "values": $scope.fontFamilyList
            };
            $scope.headerFontSizeProp = {
                "value": appSettings.headerFontSize,
                "values": $scope.fontSizeList
            };
            $scope.contentFontSizeProp = {
                "value": appSettings.contentFontSize,
                "values": $scope.fontSizeList
            };
            $scope.footerFontSizeProp = {
                "value": appSettings.footerFontSize,
                "values": $scope.fontSizeList
            };
            $scope.headerFontWeightProp = {
                "value": appSettings.headerFontWeight,
                "values": $scope.fontWeightList
            };
            $scope.contentFontWeightProp = {
                "value": appSettings.contentFontWeight,
                "values": $scope.fontWeightList
            };
            $scope.footerFontWeightProp = {
                "value": appSettings.footerFontWeight,
                "values": $scope.fontWeightList
            };
            $scope.buttonBorderWidthProp = {
                "value": appSettings.buttonBorderWidth,
                "values": $scope.buttonBorderWidthList
            };
            $scope.buttonBorderRadiusProp = {
                "value": appSettings.buttonBorderRadius,
                "values": $scope.buttonBorderRadiusList
            };

            $scope.tmpImage[0] = $scope.path+data.userId+"/templates/"+data.id+"/img/background.jpg";
            if($rootScope.tempNew === 'true' || $rootScope.tempNew === true){

                $scope.tmpLogo[0] = SERVER_URL + "templates/viewWebImages?" + "userId=" + $auth.getPayload().id + "&appId=" + $rootScope.appId + "&" + new Date().getTime() +"&images="+"logo.png&dummy="+new Date().toISOString();
            }else {
                $scope.tmpLogo[0] = $scope.path+data.userId+"/templates/"+data.id+"/img/logo.png";
            }
        }).error(function (err) {
            toastr.error(err.error, 'Error', {
                closeButton: true
            });
        });

        $scope.styleFontFamilyChange = function (data,type) {
            var styleFontFamily = data;
            if(type == 'headerFont') {
                $scope.selectedHeaderFontFamily = data;
            }else if(type == 'contentFont') {
                $scope.selectedContentFontFamily = data;
            }else if(type == 'footerFont') {
                $scope.selectedFooterFontFamily = data;
            }else if(type == 'buttonFont') {
                $scope.selectedButtonFontFamily = data;
            }
            var styleFontFamilyData = {
                appId : appId,
                styleFontFamily : styleFontFamily,
                type : type
            };
            stylesService.addStyleFontFamily(styleFontFamilyData)
                .success(function(data) {
                    if(type == 'headerFont'){
                    toastr.success('Header Font Successfully Updated', {
                        closeButton: true
                    });}
                    else if(type == 'contentFont'){
                        toastr.success('Content Font Successfully Updated', {
                            closeButton: true
                        });

                    }

                    var tempUrl = mySharedService.url;
                    mySharedService.prepForBroadcast(tempUrl,$scope.appUpdateLocation.loginUrl,'#updateCss='+new Date());

                }).error(function(err) {
                    toastr.error( type ,'Update Failed ', {
                        closeButton: true
                    });
                });
        };

        $scope.styleFontSizeChange = function (data,type) {
            var styleFontSize = data;
            if(type == 'headerFont') {
                $scope.selectedHeaderFontSize = data;
            }else if(type == 'contentFont') {
                $scope.selectedContentFontSize = data;
            }else if(type == 'footerFont') {
                $scope.selectedFooterFontSize = data;
            }
            var styleFontSizeData = {
                appId : appId,
                styleFontSize : styleFontSize,
                type : type
            };
            stylesService.addStyleFontSize(styleFontSizeData)
                .success(function(data) {
                    if(type == 'headerFont'){
                    toastr.success( ' Header Font Size Successfully Updated',{
                        closeButton: true
                    });}
                    else if(type == 'contentFont'){
                        toastr.success( 'Content Font Size Successfully Updated',{
                            closeButton: true
                        });
                    }

                    var tempUrl = mySharedService.url;
                    mySharedService.prepForBroadcast(tempUrl,$scope.appUpdateLocation.loginUrl,'#updateCss='+new Date());
                }).error(function(err) {
                    toastr.error( type , 'Update Failed ', {
                        closeButton: true
                    });

                });
        };

        $scope.styleFontWeightChange = function (data,type) {
            var styleFontWeight = data;
            if(type == 'headerFont') {
                $scope.selectedHeaderFontWeight = data;
            }else if(type == 'contentFont') {
                $scope.selectedContentFontWeight = data;
            }else if(type == 'footerFont') {
                $scope.selectedFooterFontWeight = data;
            }
            var styleFontWeightData = {
                appId : appId,
                styleFontWeight : styleFontWeight,
                type : type
            };
            stylesService.addStyleFontWeight(styleFontWeightData)
                .success(function(data) {
                    if(type == 'headerFont'){
                    toastr.success(' Header Font Weight Successfully Updated',{
                        closeButton: true
                    });}
                    else if(type == 'contentFont'){
                        toastr.success('Content Font Weight Successfully Updated',{
                            closeButton: true
                        });
                    }

                    var tempUrl = mySharedService.url;
                    mySharedService.prepForBroadcast(tempUrl,$scope.appUpdateLocation.loginUrl,'#updateCss='+new Date());

                }).error(function(err) {
                    toastr.error( type , 'Update failed ', {
                        closeButton: true
                    });
                });
        };

        $scope.styleButtonBorderWidthChange = function (data) {
            var styleButtonBorderWidth = data;
            var styleButtonBorderWidthData = {
                appId : appId,
                styleButtonBorderWidth : styleButtonBorderWidth
            };
            stylesService.addStyleButtonBorderWidth(styleButtonBorderWidthData)
                .success(function(data) {
                    toastr.success('Button Border Width Successfully Updated', {
                        closeButton: true
                    });

                    var tempUrl = mySharedService.url;
                    mySharedService.prepForBroadcast(tempUrl,$scope.appUpdateLocation.loginUrl,'#updateCss='+new Date());

                }).error(function(err) {
                    toastr.error('Unable to update Button Border Width', {
                        closeButton: true
                    });
                });
        };

        $scope.styleButtonBorderRadiusChange = function (data) {
            var styleButtonBorderRadius = data;
            var styleButtonBorderRadiusData = {
                appId : appId,
                styleButtonBorderRadius : styleButtonBorderRadius
            };
            stylesService.addStyleButtonBorderRadius(styleButtonBorderRadiusData)
                .success(function(data) {
                    toastr.success('Button Border Radius Successfully Updated', {
                        closeButton: true
                    });

                    var tempUrl = mySharedService.url;
                    mySharedService.prepForBroadcast(tempUrl,$scope.appUpdateLocation.loginUrl,'#updateCss='+new Date());

                }).error(function(err) {
                    toastr.error('Unable to update Button Border Radius', {
                        closeButton: true
                    });
                });
        };

        $scope.addHeaderImage = function(headerImg) {
            $scope.headerImgData = {
                appId: appId,
                headerImg: headerImg
            };
            stylesService.addHeaderImage($scope.headerImgData)
                .success(function (res) {
                   toastr.success('Header image changed', 'Message', {
                        closeButton: true
                    })
                    .error(function (res) {
                          /* $log.debug(res);*/
                       toastr.error('Error changing image', 'Waring', {
                           closeButton: true
                    });
                   });
                });
        };

        // --/-- When user click check box, apply existing background.jpg as background image
        $scope.applyBackgroundImage = function(isApply){
            /*alert("$scope.isApplyBGImage " + $scope.isApplyBGImage);
            alert("isApply " + isApply);*/
            var isApplyUpdate = isApply;
            if($scope.isApplyBGImage == null){
                isApplyUpdate = true;
            }
            var requestData = {
                appId: appId,
                isApplyBGImage : isApplyUpdate
            };
            stylesService.applyBackgroundImage(requestData)
                .success(function (res) {
                    var tempUrl = mySharedService.url;

                    mySharedService.prepForBroadcast(tempUrl,$scope.appUpdateLocation.loginUrl,'#updateCss='+new Date(),$auth.getPayload().id,$rootScope.appId);
                    toastr.success('Background image changed ', 'Message', {
                        closeButton: true
                    });
                }).error(function (res) {
                    toastr.error('Cant Apply Image', 'Waring', {
                        closeButton: true
                    });
                });
        };

        $scope.addBackgroundImage = function(backgroundImg) {
            $scope.backgroundImgData = {
                appId: appId,
                backgroundImg: backgroundImg
            };
            stylesService.addBackgroundImage($scope.backgroundImgData)
                .success(function (res) {
                    var urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                                   +"&appId="+$rootScope.appId+"&"+new Date()+"/";
                    $scope.appTemplateUrl = urlPath;
                    mySharedService.prepForBroadcast($scope.appTemplateUrl);
                    $mdDialog.hide();
                    toastr.success('Background Image Updated Saved', 'Message', {
                        closeButton: true
                    });
                })
                .error
            (function (res) {
                    toastr.error('Cant Change Image', 'Waring', {
                        closeButton: true
                    });
                });
        };

        // Background , Navigation Bar , Footer and Button color changing common ctrl function
        $scope.$on('colorpicker-closed', function(event, colorObject){

            var colorValue = colorObject.value;
            var type = colorObject.name;

               var styleColorData = {
                    appId : appId,
                    styleColor : colorValue,
                    type : type
                };

                stylesService.addStyleColor(styleColorData)
                    .success(function(data) {
                        if(type == 'backgroundColor'){
                            toastr.success('Background Color Successfully Updated', {
                                closeButton: true

                        });}
                        else if(type == 'navigationBarFontColor') {
                            toastr.success('Navigation Font Color Successfully Updated', {
                                closeButton: true
                        });}
                        else if(type == 'buttonFontColor') {
                            toastr.success('Button Font Color Updated Successfully', {
                                closeButton: true
                        });}
                        else if(type == 'buttonBorderColor') {
                            toastr.success('Button Border Color Updated Successfully', {
                                closeButton: true
                        });}
                        else if(type == 'headerFontColor') {
                            toastr.success('Header Font Color Successfully Updated', {
                                closeButton: true
                        });}

                        else if(type == 'contentFontColor') {
                            toastr.success('Content Font Color Successfully Updated', {
                                closeButton: true
                            });}
                        var urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                                       +"&appId="+$rootScope.appId+"&"+new Date()+"/";
                        $scope.appTemplateUrl = urlPath;
                        mySharedService.prepForBroadcast($scope.appTemplateUrl);
                      /*  $log.debug($scope.appTemplateUrl);*/

                        // var tempUrl = mySharedService.url;
                        // mySharedService.prepForBroadcast(tempUrl,$scope.appUpdateLocation.loginUrl,'#updateCss='+new Date().getTime());


                    }).error(function(err) {
                        toastr.error( type , 'Update failed ', {
                            closeButton: true
                        });
                    });
        });

        $scope.addFonts = function(fonts){
            $scope.fontsData = {
                appId: appId,
                font: fonts.font,
                fontSize: fonts.fontSize
            };
            stylesService.addFonts($scope.fontsData)
                .success(function(res){
                    toastr.success({title: "Fonts Successfully Updated"});

                    var tempUrl = mySharedService.url;
                    mySharedService.prepForBroadcast(tempUrl,$scope.appUpdateLocation.loginUrl,'#updateCss='+new Date());

                });
        };

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.validateSize = function(image,width,height){
            if(image === null){
                return;
            }
            else if(image.width > width || image.height > height) {
                toastr.error('Image should be less than 250x150 px', 'Warning', {
                    closeButton: true
                });
            }else {
                var file = image.blobUrl;
                    $scope.$apply(function ($scope) {
                        $scope.myImage = file;
                    });
                $scope.buttonName = "Upload Logo";

            }

        };

        $scope.uploadLogoToArea = function() {

            var handleFileSelect = function (evt) {
                    var file = evt.currentTarget.files[0];
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        $scope.$apply(function ($scope) {
                            $scope.picFile = evt.target.result;
                        });
                    };
                    reader.readAsDataURL(file);
            };
            angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);

        }

        $scope.deleteImg = function (index) {
            $scope.tmpLogo[0] = null;
        };

        $scope.uploadLogo = function(logo){
            if(angular.element('#fileInput').val() == ''){
                toastr.error('Please choose an logo to upload', 'Warning', {
                    closeButton: true
                });
            }
            else{
                $scope.myImage = null;
                $scope.logoImgData = {
                    appId: appId,
                    logo: logo,
                    tempNew: $rootScope.tempNew
                };
                stylesService.addLogoImage($scope.logoImgData)
                    .success(function (res) {
                        var urlPath;
                        if($rootScope.tempNew === 'true' || $rootScope.tempNew === true){
                            urlPath = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + $auth.getPayload().id
                                + "&appId=" + $rootScope.appId + "&" + new Date().toISOString()+ "/";

                        }else {

                            urlPath = SERVER_URL + "templates/viewTemplateUrl?userId=" + $auth.getPayload().id
                                + "&appId=" + $rootScope.appId + "&" + new Date().toISOString() + "/";

                        }
                        $scope.appTemplateUrl = urlPath;
                        console.log($scope.appTemplateUrl)
                        mySharedService.prepForBroadcast($scope.appTemplateUrl);
                        $scope.picFile = null;
                        $scope.myImage = null;
                        $scope.tmpLogo[0] = logo;
                        toastr.success('Logo has been uploaded successfully', 'message', {
                            closeButton: true
                        });

                        $scope.buttonName = "Browse Image";
                     })
                    .error(function (res) {
                        toastr.error('Cant Change logo', 'Waring', {
                            closeButton: true
                        });
                    });
            }

        };

    }
})();
