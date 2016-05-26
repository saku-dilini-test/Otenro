(function () {
    'use strict';
    angular.module("appEdit").controller("StylesCtrl",
        ['$scope','$mdDialog','$rootScope','$timeout','toastr','$window','stylesService','ME_APP_SERVER','$auth','mySharedService',StylesCtrl]);

    function StylesCtrl($scope,$mdDialog,$rootScope,$timeout,toastr,$window,stylesService,ME_APP_SERVER,$auth,mySharedService) {

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

        $scope.headerImg = ME_APP_SERVER +'temp/' +$auth.getPayload().id+'/templates/'+$rootScope.appId+'/img/header.jpg?time='+new Date().getTime();
        $scope.backgroundImg = ME_APP_SERVER+'temp/' +$auth.getPayload().id+'/templates/'+$rootScope.appId+'/img/background.jpg?time='+new Date().getTime();
        $scope.fonts = {
            font : 'Arial',
            fontSize : 11
        };

        $scope.fontFamilyList = ["Arial","Tahoma","Dingbats","Ubuntu Light","URW Chancery L"];
        $scope.fontSizeList = [8,9,10,12,14,18];
        $scope.fontWeightList = ["normal","bold","bolder","lighter"];
        $scope.buttonBorderWidthList = ['0px','1px','2px','3px','4px','5px'];
        $scope.buttonBorderRadiusList = ['0px','1px','2px','3px','4px','5px'];

        stylesService.getAppSettings({'appId':$rootScope.appId}).success(function (data) {
            var appSettings = data.appSettings;

            $scope.appUpdateLocation = data.appUpdateLocationSetting;

            $scope.backgroundColor = appSettings.backgroundColor;
            $scope.navigationBarColor = appSettings.navigationBarColor;
            $scope.footerColor = appSettings.footerColor;
            $scope.headerFontColor = appSettings.headerFontColor;
            $scope.contentFontColor = appSettings.contentFontColor;
            $scope.footerFontColor = appSettings.footerFontColor;
            $scope.buttonColor = appSettings.buttonColor;
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
                appId : $rootScope.appId,
                styleFontFamily : styleFontFamily,
                type : type
            };
            stylesService.addStyleFontFamily(styleFontFamilyData)
                .success(function(data) {
                    toastr.success( type , 'Family Successfully Update', {
                        closeButton: true
                    });

                    var tempUrl = mySharedService.url;
                    mySharedService.prepForBroadcast(tempUrl,$scope.appUpdateLocation.loginUrl,'#updateCss='+new Date().getTime());

                }).error(function(err) {
                    toastr.error( type ,'Unable to update', {
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
                appId : $rootScope.appId,
                styleFontSize : styleFontSize,
                type : type
            };
            stylesService.addStyleFontSize(styleFontSizeData)
                .success(function(data) {
                    toastr.success( type , 'Size Successfully Update ',{
                        closeButton: true
                    });

                    var tempUrl = mySharedService.url;
                    mySharedService.prepForBroadcast(tempUrl,$scope.appUpdateLocation.loginUrl,'#updateCss='+new Date().getTime());
                }).error(function(err) {
                    toastr.error( type , 'Unable to update ', {
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
                appId : $rootScope.appId,
                styleFontWeight : styleFontWeight,
                type : type
            };
            stylesService.addStyleFontWeight(styleFontWeightData)
                .success(function(data) {
                    toastr.success( type , 'Weight Successfully Update ',{
                        closeButton: true
                    });

                    var tempUrl = mySharedService.url;
                    mySharedService.prepForBroadcast(tempUrl,$scope.appUpdateLocation.loginUrl,'#updateCss='+new Date().getTime());

                }).error(function(err) {
                    toastr.error( type , 'Unable to update  ', {
                        closeButton: true
                    });
                });
        };

        $scope.styleButtonBorderWidthChange = function (data) {
            var styleButtonBorderWidth = data;
            var styleButtonBorderWidthData = {
                appId : $rootScope.appId,
                styleButtonBorderWidth : styleButtonBorderWidth
            };
            stylesService.addStyleButtonBorderWidth(styleButtonBorderWidthData)
                .success(function(data) {
                    toastr.success('Button Border Width Successfully Update', {
                        closeButton: true
                    });

                    var tempUrl = mySharedService.url;
                    mySharedService.prepForBroadcast(tempUrl,$scope.appUpdateLocation.loginUrl,'#updateCss='+new Date().getTime());

                }).error(function(err) {
                    toastr.error('Unable to update Button Border Width', {
                        closeButton: true
                    });
                });
        };

        $scope.styleButtonBorderRadiusChange = function (data) {
            var styleButtonBorderRadius = data;
            var styleButtonBorderRadiusData = {
                appId : $rootScope.appId,
                styleButtonBorderRadius : styleButtonBorderRadius
            };
            stylesService.addStyleButtonBorderRadius(styleButtonBorderRadiusData)
                .success(function(data) {
                    toastr.success('Button Border Radius Successfully Update', {
                        closeButton: true
                    });

                    var tempUrl = mySharedService.url;
                    mySharedService.prepForBroadcast(tempUrl,$scope.appUpdateLocation.loginUrl,'#updateCss='+new Date().getTime());

                }).error(function(err) {
                    toastr.error('Unable to update Button Border Radius', {
                        closeButton: true
                    });
                });
        };

        $scope.addHeaderImage = function(headerImg) {
            $scope.headerImgData = {
                appId: $rootScope.appId,
                headerImg: headerImg
            };
            stylesService.addHeaderImage($scope.headerImgData)
                .success(function (res) {
                   toastr.success('Successfully change HeaderImage', 'Message', {
                        closeButton: true
                    })
                    .error(function (res) {
                           console.log(res);
                       toastr.error('Cant Change Image', 'Waring', {
                           closeButton: true
                    });
                   });
                });
        };

        $scope.addBackgroundImage = function(backgroundImg) {
            $scope.backgroundImgData = {
                appId: $rootScope.appId,
                backgroundImg: backgroundImg
            };
            stylesService.addBackgroundImage($scope.backgroundImgData)
                .success(function (res) {

                    console.log("success");
                    $scope.appTemplateUrl = ME_APP_SERVER+'temp/'+$auth.getPayload().id
                        +'/templates/'+$rootScope.appId+'/?'+new Date().getTime();
                    mySharedService.prepForBroadcast($scope.appTemplateUrl);

                    toastr.success('Successfully change backgroundImage', 'Message', {
                        closeButton: true
                    });
                })
                .error
            (function (res) {
                    console.log(res);
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
                    appId : $rootScope.appId,
                    styleColor : colorValue,
                    type : type
                };

                stylesService.addStyleColor(styleColorData)
                    .success(function(data) {
                        toastr.success( type ,'Color Successfully Update ', {
                            closeButton: true
                        });
                        var tempUrl = mySharedService.url;
                        mySharedService.prepForBroadcast(tempUrl,$scope.appUpdateLocation.loginUrl,'#updateCss='+new Date().getTime());

                    }).error(function(err) {
                        toastr.error( type , 'Unable to update ', {
                            closeButton: true
                        });
                    });
        });

        $scope.addFonts = function(fonts){
            $scope.fontsData = {
                appId: $rootScope.appId,
                font: fonts.font,
                fontSize: fonts.fontSize
            };
            stylesService.addFonts($scope.fontsData)
                .success(function(res){
                    toastr.success({title: "Successfully Update Fonts"});

                    var tempUrl = mySharedService.url;
                    mySharedService.prepForBroadcast(tempUrl,$scope.appUpdateLocation.loginUrl,'#updateCss='+new Date().getTime());

                })
        };

        $scope.hide = function () {
            $mdDialog.hide();
        };
    }
})();
