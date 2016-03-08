(function () {
    'use strict';
    angular.module("appEdit").controller("StylesCtrl",
        ['$scope','$mdDialog','$rootScope','$timeout','toastr','$window','stylesService','ME_APP_SERVER','$auth',StylesCtrl]);

    function StylesCtrl($scope,$mdDialog,$rootScope,$timeout,toastr,$window,stylesService,ME_APP_SERVER,$auth) {

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
        $scope.backgroundColor = "#F9F9F9";
        $scope.navigationBarColor = "#F9F9F9";
        $scope.FooterColor = "#F9F9F9";
        $scope.fonts = {
            font : 'Arial',
            fontSize : 11
        };

        // Starting Typography Changes ------------------------
        $scope.fontFamilyList = ["Arial","Tahoma","Dingbats","Ubuntu Light","URW Chancery L","UnPilgi"];
        // Header Font Family
        $scope.selectedHeaderFontFamily = "Arial";
        $scope.headerFontFamilyProp = {
            "value": $scope.selectedHeaderFontFamily,
            "values": $scope.fontFamilyList
        };
        // Content Font Family
        $scope.selectedContentFontFamily = "Arial";
        $scope.contentFontFamilyProp = {
            "value": $scope.selectedContentFontFamily,
            "values": $scope.fontFamilyList
        };
        // Footer Font Family
        $scope.selectedFooterFontFamily = "Arial";
        $scope.footerFontFamilyProp = {
            "value": $scope.selectedFooterFontFamily,
            "values": $scope.fontFamilyList
        };
        // Button Font Family
        $scope.selectedButtonFontFamily = "Arial";
        $scope.buttonFontFamilyProp = {
            "value": $scope.selectedButtonFontFamily,
            "values": $scope.fontFamilyList
        };
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

                }).error(function(err) {
                    toastr.error( type ,'Unable to update', {
                        closeButton: true
                    });
                });
        };

        // Font Size
        $scope.fontSizeList = [8,9,10,12,14,18];
        // Header Font Size
        $scope.selectedHeaderFontSize = 10;
        $scope.headerFontSizeProp = {
            "value": $scope.selectedHeaderFontSize,
            "values": $scope.fontSizeList
        };
        // Content Font Family
        $scope.selectedContentFontSize = 10;
        $scope.contentFontSizeProp = {
            "value": $scope.selectedContentFontSize,
            "values": $scope.fontSizeList
        };
        // Footer Font Size
        $scope.selectedFooterFontSize = 10;
        $scope.footerFontSizeProp = {
            "value": $scope.selectedFooterFontSize,
            "values": $scope.fontSizeList
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
                }).error(function(err) {
                    toastr.error( type , 'Unable to update ', {
                        closeButton: true
                    });

                });
        };

        // Font weight
        $scope.fontWeightList = ["normal","bold","bolder","lighter"];
        // Header Font Weight
        $scope.selectedHeaderFontWeight = "normal";
        $scope.headerFontWeightProp = {
            "value": $scope.selectedHeaderFontWeight,
            "values": $scope.fontWeightList
        };
        // Content Font Weight
        $scope.selectedContentFontWeight = "normal";
        $scope.contentFontWeightProp = {
            "value": $scope.selectedContentFontWeight,
            "values": $scope.fontWeightList
        };
        // Footer Font Weight
        $scope.selectedFooterFontWeight = "normal";
        $scope.footerFontWeightProp = {
            "value": $scope.selectedFooterFontWeight,
            "values": $scope.fontWeightList
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
                }).error(function(err) {
                    toastr.error( type , 'Unable to update  ', {
                        closeButton: true
                    });
                });
        };

        // Button Border width List
        $scope.buttonBorderWidthList = ['0px','1px','2px','3px','4px','5px'];
        // Button Border width
        $scope.selectedButtoBorderWidth = '0px';
        $scope.buttonBorderWidthProp = {
            "value": $scope.selectedButtoBorderWidth,
            "values": $scope.buttonBorderWidthList
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
                }).error(function(err) {
                    toastr.error('Unable to update Button Border Width', {
                        closeButton: true
                    });
                });
        };

        // Button Border Radius List
        $scope.buttonBorderRadiusList = ['0px','1px','2px','3px','4px','5px'];
        // Button Border Radius
        $scope.selectedButtoBorderRadius = '0px';
        $scope.buttonBorderRadiusProp = {
            "value": $scope.selectedButtoBorderRadius,
            "values": $scope.buttonBorderRadiusList
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
                    toastr.success({title: "Successfully Update Header Image"});
                });
        };

        $scope.addBackgroundImage = function(backgroundImg) {
            $scope.backgroundImgData = {
                appId: $rootScope.appId,
                backgroundImg: backgroundImg
            };
            stylesService.addBackgroundImage($scope.backgroundImgData)
                .success(function (res) {
                    toastr.success({title: "Successfully Update Background Image"});
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
                    }).error(function(err) {
                        toastr.error( type , 'Unable to update ', {
                            closeButton: true
                        });
                    });
        });

        $scope.addBackgroundColor = function(bgcolor){
            $scope.backgroundColorData = {
                appId: $rootScope.appId,
                backgroundColor: bgcolor
            };
            stylesService.addBackgroundColor($scope.backgroundColorData)
                .success(function(res){
                    toastr.success({title: "Successfully Update Background Color"});
                })
        };

        $scope.addFonts = function(fonts){
            $scope.fontsData = {
                appId: $rootScope.appId,
                font: fonts.font,
                fontSize: fonts.fontSize
            };
            stylesService.addFonts($scope.fontsData)
                .success(function(res){
                    toastr.success({title: "Successfully Update Fonts"});
                })
        };

        $scope.hide = function () {
            $mdDialog.hide();
        };
    }
})();
