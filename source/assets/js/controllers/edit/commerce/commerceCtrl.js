(function () {
    'use strict';
    angular.module("appEdit").controller("CommerceCtrl", [
        '$scope', '$mdDialog', 'toastr', 'commerceService','carouselService', 'currencyService', 'publishService', '$rootScope',
        'SERVER_URL', '$auth', 'ME_APP_SERVER', '$interval', '$q','aboutUsService','mySharedService','comingSoonService',
        '$filter','contactUsService','uiGmapGoogleMapApi','uiGridConstants','$templateCache','uiGridExporterConstants','uiGridExporterService','$log','selectedTab','$timeout',
        CommerceCtrl]);

    function CommerceCtrl($scope, $mdDialog, toastr, commerceService,carouselService, currencyService, publishService, $rootScope,
             SERVER_URL, $auth, ME_APP_SERVER, $interval, $q,aboutUsService,mySharedService,comingSoonService, $filter,
             contactUsService,uiGmapGoogleMapApi,uiGridConstants,$templateCache,uiGridExporterConstants,uiGridExporterService,$log,selectedTab,$timeout) {
        $scope.isNew = $rootScope.tempNew;
        $scope.picFileHeader = [];
        $scope.picFileHeader2 = [];
        $scope.picFileHeader3 = [];
        $scope.refund = [];
        $scope.unfulfilled = [];
        $scope.fulfill = [];

        $scope.selectedTab = selectedTab;

        // Characters length config
        $scope.maxLengthNextOrderNumber = 8; // max characters length of NextOrderNumber in product
        $scope.maxLengthAppName = 20;
        // Policy
        $scope.maxReturnPolicy = 500;
        $scope.maxTermsAndCondition = 500;
        $scope.maxPrivacyPolicy = 500;
        // About us
        $scope.maxAboutUsHeader = 20;
        $scope.maxAboutUsContent = 500;
        $scope.currency = $rootScope.currency;

        $scope.uploadedFiles = null;
        $scope.uploadedFileType = null;
        $scope.aboutUsImageName = null;
        $scope.selectedAboutUsImageName = '';

        $scope.refreshData = function() {
        $scope.gridOptions1.data = $filter('filter')($scope.ordersList, $scope.search, undefined);
        $scope.gridOptions2.data = $filter('filter')($scope.fulfill, $scope.search, undefined);
        $scope.gridOptions3.data = $filter('filter')($scope.unfulfilled, $scope.search, undefined);
        $scope.gridOptions4.data = $filter('filter')($scope.refund, $scope.search, undefined);
        }

        var fakeI18n = function (title) {
            var deferred = $q.defer();
            $interval(function () {
                deferred.resolve('col: ' + title);
            }, 1000, 1);
            return deferred.promise;
        };
        $templateCache.put('ui-grid/selectionRowHeaderButtons',
            "<div class=\"ui-grid-selection-row-header-buttons \" ng-class=\"{'ui-grid-row-selected': row.isSelected}\" ><input style=\"margin: 0; vertical-align: middle\" type=\"checkbox\" ng-model=\"row.isSelected\" ng-click=\"row.isSelected=!row.isSelected;selectButtonClick(row, $event)\">&nbsp;</div>"
        );
        $templateCache.put('ui-grid/selectionSelectAllButtons',
            "<div class=\"ui-grid-selection-row-header-buttons \" ng-class=\"{'ui-grid-all-selected': grid.selection.selectAll}\" ng-if=\"grid.options.enableSelectAll\"><input style=\"margin: 0; vertical-align: middle;\" type=\"checkbox\" ng-model=\"grid.selection.selectAll\" ng-click=\"grid.selection.selectAll=!grid.selection.selectAll;headerButtonClick($event)\"></div>"
        );
        $scope.gridOptions1 = {

            enableRowSelection: true,
            enableSelectAll: true,
            enableRowHeaderSelection: true,
            selectionRowHeaderWidth: 35,
            enableSorting: true,
            rowHeight: 35,
            exporterMenuCsv: true,
            exporterMenuPdf: false,
            enableGridMenu: true,
            gridMenuTitleFilter: fakeI18n,
            rowTemplate: rowTemplate(),
            isRowSelectable: function(row) {
                if(row.entity.paymentStatus === "successful" || row.entity.paymentStatus === "refunded")  {
                    return false;
                }
                else{
                    return true;
                }
            },
            columnDefs: [
                /*{name: 'id'},*/
                // {name: '#', width: '5%', cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}.</div>'  },
                {name: 'createdDate',},
                {name: 'customerName', enableHiding: false},
                {name: 'paymentStatus'},
                {name: 'fulfillmentStatus'}
            ],
            gridMenuCustomItems: [
                {
                    title: 'Rotate Grid',
                    action: function ($event) {
                        this.grid.element.toggleClass('rotated');
                    },
                    order: 210
                }
            ],
            //data : [{"createdDate": "2016/10/16","customerName":"ABC","paymentStatus": "pending","fulfillmentStatus": "Enersol"}],
            onRegisterApi: function (gridApi1) {
                $scope.gridApi1 = gridApi1;

                gridApi1.core.on.columnVisibilityChanged($scope, function (changedColumn) {
                    $scope.columnChanged = {name: changedColumn.colDef.name, visible: changedColumn.colDef.visible};
                });
                gridApi1.selection.on.rowSelectionChanged($scope, function (row) {
                });

                gridApi1.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                });
            }

        };

        $scope.tempUnavailable = function () {
            comingSoonService.showComingSoonDialogWithCallBackFunction('commerceService','showStoreSettingsDialog');
        };

        function rowTemplate() {
            return '<div ng-dblclick="grid.appScope.rowDblClick(row)" >' +
                '  <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" ' +
                'class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
                '</div>';
        }

        $scope.rowDblClick = function (row) {

            $mdDialog.show({
                clickOutsideToClose: true,
                templateUrl: 'user/edit/commerce/OrderDetailsView.html',
                controller: function DialogController($scope, $mdDialog, $auth) {
                    $scope.oderData = row;
                    console.log($scope.oderData)
                    // $log.debug(row);

                    var array = $scope.oderData.entity.item[0].variant;
                        console.log(JSON.stringify(array));
                        console.log("$scope.oderData.entity.item : " + $scope.oderData.entity.item.length)

                           $scope.variantArray1 = [];
                           $scope.variantArray2 = [];
                    for(var j =0;j<$scope.oderData.entity.item.length;j++){
                        $scope.variantArray1.push($scope.oderData.entity.item[j].variant)
                    }

//                   for(var i =0;i<$scope.variantArray1.length;i++){
//                    $scope.variantArray2.push($scope.variantArray1[i][i].name)
//                   }


console.log("$scope.variantArray1 : " + JSON.stringify($scope.variantArray1));
console.log("$scope.variantArray2 : " + JSON.stringify($scope.variantArray1[0][0].name));

                    //$scope.curruntDate = new Date();
                    //var sDate = $scope.oderData.entity.fulfilledDate;
                    //var fDate = $scope.oderData.entity.refundedDate;

                    if($scope.oderData.entity.fulfillmentStatus == "successful"){
                            $scope.orderStatus = [{
                            date1:$scope.oderData.entity.createdAt,
                            name:'pending'},
                            {
                            date1:$scope.oderData.entity.fulfilledDate,
                            name:$scope.oderData.entity.fulfillmentStatus
                            }];
                            }


                     else if($scope.oderData.entity.fulfillmentStatus == "refund"){
                            $scope.orderStatus = [{
                            date1:$scope.oderData.entity.createdAt,
                            name:'pending'},
                            {
                            date1:$scope.oderData.entity.refundedDate,
                            name:$scope.oderData.entity.fulfillmentStatus
                            }];
                     }else{
                            //$scope.orderStatus = [{name: "pending"}];}
                            $scope.orderStatus = [{
                            date1:$scope.oderData.entity.createdAt,
                            name:$scope.oderData.entity.fulfillmentStatus
                            }];
                            }

                    $scope.currency = $rootScope.currency;
                    if($scope.oderData.entity.option == 'pickUp'){
                        $scope.orderType = 'Pick Up';
                    }
                    else{
                        $scope.orderType = 'Delivery';
                    }
                    $scope.closeDialog = function () {
                        return commerceService.showOrderDialog();
                    }

                    if($rootScope.tempNew == 'true'){
                      $scope.imageURL = SERVER_URL
                                        +"templates/viewWebImages?userId="
                                        +$auth.getPayload().id+"&appId="+$scope.oderData.entity.appId+"&"+new Date().getTime()+"&images=thirdNavi";

                    }else{
                     $scope.imageURL = SERVER_URL
                                    +"templates/viewImages?userId="
                                    +$auth.getPayload().id+"&appId="+$scope.oderData.entity.appId+"&"+new Date().getTime()+"&img=thirdNavi";
                    }
                }
            });

        };


        $scope.gridOptions2 = {
            enableRowHeaderSelection: false,
            exporterMenuCsv: true,
            enableGridMenu: true,
            enableSorting: true,
            gridMenuTitleFilter: fakeI18n,
            columnDefs: [
                // {name: 'id', width: '20%', cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}.</div>'  },
                {name: 'createdDate'},
                {name: 'customerName', enableHiding: false},
                {name: 'paymentStatus'},
                {name: 'fulfillmentStatus'}
            ],
            gridMenuCustomItems: [
                {
                    title: 'Rotate Grid',
                    action: function ($event) {
                        this.grid.element.toggleClass('rotated');
                    },
                    order: 210
                }
            ],
            onRegisterApi: function (gridsApi2) {
                $scope.gridsApi2 = gridsApi2;

                // interval of zero just to allow the directive to have initialized
                $interval(function () {
                    gridsApi2.core.addToGridMenu(gridsApi2.grid, [{title: 'Dynamic item', order: 100}]);
                }, 0, 1);

                gridsApi2.core.on.columnVisibilityChanged($scope, function (changedColumn) {
                    $scope.columnChanged = {name: changedColumn.colDef.name, visible: changedColumn.colDef.visible};
                });
            }
        };

        $scope.gridOptions3 = {
            enableRowHeaderSelection: false,
            exporterMenuCsv: true,
            enableGridMenu: true,
            enableSorting: true,
            gridMenuTitleFilter: fakeI18n,
            columnDefs: [
                // {name: 'id', width: '20%', cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}.</div>'  },
                {name: 'createdDate'},
                {name: 'customerName', enableHiding: false},
                {name: 'paymentStatus'},
                {name: 'fulfillmentStatus'}
            ],
            gridMenuCustomItems: [
                {
                    title: 'Rotate Grid',
                    action: function ($event) {
                        this.grid.element.toggleClass('rotated');
                    },
                    order: 210
                }
            ],
            onRegisterApi: function (gridsApi3) {
                $scope.gridsApi3 = gridsApi3;

                // interval of zero just to allow the directive to have initialized
                $interval(function () {
                    gridsApi3.core.addToGridMenu(gridsApi3.grid, [{title: 'Dynamic item', order: 100}]);
                }, 0, 1);

                gridsApi3.core.on.columnVisibilityChanged($scope, function (changedColumn) {
                    $scope.columnChanged = {name: changedColumn.colDef.name, visible: changedColumn.colDef.visible};
                });
            }

        };

        $scope.gridOptions4 = {
            enableRowHeaderSelection: false,
            exporterMenuCsv: true,
            enableGridMenu: true,
            enableSorting: true,
            gridMenuTitleFilter: fakeI18n,
            columnDefs: [
                // {name: 'id', width: '20%', cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}.</div>'  },
                {name: 'createdDate'},
                {name: 'customerName', enableHiding: false},
                {name: 'paymentStatus'},
                {name: 'fulfillmentStatus'}
            ],
            gridMenuCustomItems: [
                {
                    title: 'Rotate Grid',
                    action: function ($event) {
                        this.grid.element.toggleClass('rotated');
                    },
                    order: 210
                }
            ],
            onRegisterApi: function (gridsApi4) {
                $scope.gridsApi4 = gridsApi4;

                // interval of zero just to allow the directive to have initialized
                $interval(function () {
                    gridsApi4.core.addToGridMenu(gridsApi4.grid, [{title: 'Dynamic item', order: 100}]);
                }, 0, 1);

                gridsApi4.core.on.columnVisibilityChanged($scope, function (changedColumn) {
                    $scope.columnChanged = {name: changedColumn.colDef.name, visible: changedColumn.colDef.visible};
                });
            }
        };

        $scope.gridOptions1.multiSelect = true;
        $scope.currentPage = 2;
        $scope.pageSize = 5;
        $scope.statusList = [
            {status: "Closed"}, {status: "Open"}
        ];
        $scope.data = {status: "Closed"};
        $scope.statusPlaceHolder = "Closed";
        $scope.currencyPlaceHolder = "US Doller";
        $scope.measurementStandardsPlaceHolder = "Metric";
        $scope.siteTypesPlaceHolder = "Ecommerce";
        $scope.languagesPlaceHolder = "English (United Kingdom)";
        $scope.timeAndRegionsPlaceHolder = "(UTC-12:00) International Date Line West";
        $scope.openHours = {};
        $scope.miniLightBoxShow = false;

        $scope.userId = $auth.getPayload().id;
        $scope.appId = $rootScope.appId;
        $scope.SERVER_URL = SERVER_URL;
        $scope.imageURL = SERVER_URL +
            "edit/viewImages?userId=" + $scope.userId
            + "&appId=" + $scope.appId + "&"
            + new Date().getTime();

        $scope.thumbPic = ME_APP_SERVER + 'temp/' + $auth.getPayload().id + '/templates/' + $rootScope.appId + '/img/default.jpg';
        $scope.categoryIdList = {};

        if (typeof $scope.mainMenus === 'undefined') {
            commerceService.getMainMenuList()
                .success(function (result) {
                    $scope.mainMenus = result;
                }).error(function (error) {
                //alert("MainMenu Loading Error : " + error);
            })
        }

        if (typeof $scope.categories === 'undefined') {
            commerceService.getCategoryList()
                .success(function (result) {
                    $scope.categories = result;
                }).error(function (error) {
                //alert("Category Loading Error : " + error);
            })
        }

        if (typeof $scope.products === 'undefined') {
            commerceService.getProductList()
                .success(function (result) {
                    $scope.products = result;
                    for (var i = 0; i < $scope.products.length; i++) {
                        $scope.categoryIdList[i] = $scope.products[i].categoryId;
                    }
                }).error(function (error) {
                //alert("Category Loading Error : " + error);
            })

        }
        if (typeof $scope.ordersList === 'undefined') {
            commerceService.getOrderList()
                .success(function (result) {
                    for (var i = 0; i < result.length; i++) {
                        var date = new Date(result[i].createdAt);
                        $scope.displayDate = date.toLocaleString();
                        $scope.year = date.getFullYear();
                        $scope.month = date.getMonth() + 1;
                        $scope.date = date.getDate();
                        result[i].createdDate = $scope.year + "-" + $scope.month + "-" + $scope.date;
                    }
                    $scope.ordersList = result;
                    for (var i = 0; i < $scope.ordersList.length; i++) {
                        if ($scope.ordersList[i].paymentStatus == "Refunded") {
                            $scope.refund.push($scope.ordersList[i]);
                        }
                        else if ($scope.ordersList[i].paymentStatus == "Pending") {
                            $scope.unfulfilled.push($scope.ordersList[i]);
                        }
                        else if ($scope.ordersList[i].paymentStatus == "Successful") {
                            $scope.fulfill.push($scope.ordersList[i]);
                        }
                    }

                    $scope.getArray = function(){
                        /*$scope.exportArrayN = [];
                        angular.forEach($scope.ordersList, function(value, key) {
                            $scope.exportArrayN.push({

                                'Created Date' : value.createdDate,
                                'Customer Name' : value.customerName,
                                'Payment Status' : value.paymentStatus,
                                'Fulfillment Status' : value.fulfillmentStatus,
                            });
                        });
                        return $scope.exportArrayN;*/
                        var grid = $scope.gridApi1.grid;
                        var rowTypes = uiGridExporterConstants.ALL;
                        var colTypes = uiGridExporterConstants.ALL;
                        uiGridExporterService.csvExport(grid, rowTypes, colTypes);
                    }

                    $scope.gridOptions1.data = $scope.ordersList;
                    $scope.gridOptions2.data = $scope.fulfill;
                    $scope.gridOptions3.data = $scope.unfulfilled;
                    $scope.gridOptions4.data = $scope.refund;
                }).error(function (error) {
                //alert("Orders List Loading Error : " + error);
            })
        }

//        $scope.addProducts = function(file,product) {
//            commerceService.addProduct(file,product).
//                success(function(data) {
//                    toastr.success('New Product has been added.', 'Awsome!', {
//                        closeButton: true
//                    });
//                }).error(function(err) {
//                    toastr.error('Unable to Add', 'Warning', {
//                        closeButton: true
//                    });
//                });
//        };


        $scope.deleteCategory = function ($index) {
            var prams = {
                categoryID: $scope.categories[$index].id,
                appId: $rootScope.appId,
                imageUrl: $scope.categories[$index].imageUrl
            };
            commerceService.checkCategory(prams)
                .success(function (data) {
                    if (data.message == 'Yes') {
                        //alert("Product Exist");
                        toastr.error('Product Exist', 'Warning', {
                            closeButton: true
                        });
                    } else {
                        $scope.categories.splice($index, 1);
                        commerceService.deleteCategoryData(prams)
                            .success(function () {
                                toastr.success('Category has been deleted', 'Deleted', {
                                    closeButton: true
                                });
                            }).error(function (err) {
                            toastr.error('Unable to Delete. Please try again.', 'Warning', {
                                closeButton: true
                            });
                        })
                    }
                }).error(function (err) {
                toastr.error('Update Failed', 'Warning', {
                    closeButton: true
                });
            })
        };

        publishService.getAllLanguages().success(function (data) {
            $scope.languageList = data;
        }).error(function (err) {
            //alert("MainMenu Loading Error : " + err);
        });

        currencyService.getAllCurrency().success(function (data) {
            $scope.currencyList = data;

        }).error(function (err) {
            //alert("MainMenu Loading Error : " + err);
        });
        commerceService.getAllSiteType().success(function (data) {
            $scope.siteTypeList = data;
        }).error(function (err) {
            //alert("MainMenu Loading Error : " + err);
        });
        commerceService.getAllMeasurementType().success(function (data) {
            $scope.measurementTypeList = data;
        }).error(function (err) {
            //alert("MainMenu Loading Error : " + err);
        });
        commerceService.getAllTimeAndRegion().success(function (data) {
            $scope.timeAndRegionList = data;
        }).error(function (err) {
            //alert("MainMenu Loading Error : " + err);
        });

        $scope.saveStoreSettings = function (current, storeSettings, openHours) {

            // Validate, Next Order Number characters max length
            var orderNumber = storeSettings.orderNumber;
            if(typeof orderNumber != 'undefined'){
                orderNumber = orderNumber.toString();
                if(orderNumber.length >= $scope.maxLengthNextOrderNumber) {
                    toastr.error('Next Order Number length should be less than '+
                        $scope.maxLengthNextOrderNumber , 'Warning',{closeButton: true});
                    return;
                }
            }

            var appName = storeSettings.appName;
            if(typeof appName != 'undefined'){
                appName = appName.toString();
                if(appName.length >= $scope.maxLengthAppName) {
                    toastr.error('Character Limit  should be less than '+
                        $scope.maxLengthAppName , 'Warning',{closeButton: true});
                    return;
                }
            }
            
            //$log.debug(storeSettings);
            if (!storeSettings){
                toastr.error(' warning', "Please fill all required fields", {closeButton: true});
            }/*else if (!storeSettings.orderNumber) {
                toastr.error(' warning', "Order number required ", {closeButton: true});
            }*/
            else {

                for (var i = 0; i < $scope.currencyList.length; i++) {
                    if ($scope.storeSettings.currency == $scope.currencyList[i].sign) {
                        $scope.options = $scope.currencyList[i];
                    }
                }

                var openHoursData = {};
                if(typeof openHours != 'undefined'){
                    openHoursData = {
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
                }

                storeSettings.currencySign = $scope.options.sign,
                    storeSettings.currency = $scope.options.currency,
                    storeSettings.currencySymbol = $scope.options.symbol,
                    storeSettings.userId = $scope.userId;
                storeSettings.appId = $rootScope.appId;
                storeSettings.OpenHours = openHoursData;

                var reqParams = {
                    currencySign: $scope.options.sign,
                    currency: $scope.options.currency,
                    currencySymbol: $scope.options.symbol,
                    appId: $rootScope.appId
                };
                currencyService.setCurrency(reqParams).success(function (data) {
                }).error(function (err) {
                    toastr.error(' warning', "Unable to get templates", {closeButton: true});
                });

                commerceService.saveStoreSettings(storeSettings).success(function (data) {
                    toastr.success('Store Setting Details has been added successfully','Awesome', {
                        closeButton: true
                    });
                    $scope.selectedTab = current;
                    $rootScope.currency = $scope.options.sign;
                    $scope.currencyPlaceHolder = $scope.options.currency;
                }).error(function (err) {
                    toastr.error(' warning', "Unable to get templates", {closeButton: true});
                })
                $scope.selectedTab = current;
            }
        };

//-----------------------aboutUs image crop ----------------------------------
        $scope.tmpImage = [];
        $scope.imageSelected = true;
        $scope.buttonName = "Browse Image";

        // image crop function
        $scope.cropImage = function () {
            var handleFileSelect = function (evt) {
                var file = evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.myImage = evt.target.result;
                        $scope.picFile = $scope.myImage;
                    });
                };
                reader.readAsDataURL(file);
                $scope.imageSelected = false;
                $scope.buttonName = "Upload";
            };
            angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
        }

        //add image
        $scope.addImage = function (img) {
            if (angular.element('#fileInput').val() == '') {
                toastr.error('Please choose an image to upload', 'Warning', {
                    closeButton: true
                });
            }
            else {
                var im = $scope.tmpImage;
                im[0] = $scope.picFile;
                $scope.tmpImage = im;
                $scope.mainImg = img;
                $scope.myImage = null;
                toastr.success('Image has been uploaded successfully', 'message', {
                    closeButton: true
                });
            }
            $scope.imageSelected = true;
            $scope.buttonName = "Browse Image";
        };

        //--------------------aboutUs image crop ratio from sliders ---------------------

                $scope.setAspectRatio = function () {
                    carouselService.getApplicationData($rootScope.appId)
                        .success(function (data) {
                            if (data.templateId){
                                carouselService.getTemplateData(data.templateId)
                                    .success(function (templateData) {
                                        if(templateData.sliderSize){
                                            $scope.aspectRatio = parseFloat(templateData.sliderSize.aspectRatio);
                                        }
                                        if(templateData.iSizeThird){
                                            $scope.size={w:templateData.sliderSize.w,h:templateData.sliderSize.h};
                                        }
                                    }).error(function (err) {
                                    toastr.error(err.message, 'Warning', {
                                        closeButton: true
                                    });
                                });
                            }
                        }).error(function (err) {
                        toastr.error(err.message, 'Warning', {
                            closeButton: true
                        });
                    });
                };

                $scope.setAspectRatio();

//---------------------------- delete about us image ---------------------------------

         $scope.deleteImg = function(img){
            $scope.tmpImage[img] = null;
            commerceService.deleteAboutUsImage({"appId": $rootScope.appId}).success(function(data){
                toastr.success('AboutUs image deleted!', 'Message', { closeButton: true });
            });
         }


        $scope.addAboutUs = function (current,storeSettings) {
            // Validate, About Us Header maximum characters length
            var header = storeSettings.header;
            var content = storeSettings.content;
            if((typeof header != 'undefined') &&
                (header.length > $scope.maxAboutUsHeader)){

                toastr.error('About Us Header, maximum characters length is exceed. ' +
                    'Maximum characters length is : '+$scope.maxAboutUsHeader, 'Warning',
                    {closeButton: true}
                );
                return;

            }else if (typeof header == 'undefined' ||typeof content == 'undefined'  ){

                toastr.error('Please fill the fields', 'Message', {
                    closeButton: true
                });

            }else if ($scope.tmpImage[0] == null) {
                  toastr.error('Please upload an image', 'Warning', { closeButton: true });
                  return;
            }else {
                if (storeSettings.header && storeSettings.content) {
                    storeSettings.userId = $scope.userId;
                    storeSettings.appId = $rootScope.appId;

                    var file = $scope.tmpImage;
                    var uploadedFileType = $scope.uploadedFileType;

                    if(file){
                        commerceService.uploadFile({"file":$scope.tmpImage,"appId":storeSettings.appId,"userId":storeSettings.userId}).success(function(data) {
                            storeSettings.aboutUsImageName = $scope.aboutUsImageName;

                            commerceService.saveStoreSettings(storeSettings)
                                .success(function (data, status, headers, config) {
                                    toastr.success('About Us has been added successfully', 'Awesome', {
                                        closeButton: true
                                    });
                                    var urlPath;
                                    if($scope.isNew == 'true'){
                                    urlPath = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + $auth.getPayload().id
                                                                                                + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";
                                                                                            $scope.appTemplateUrl = urlPath + '' +
                                                                                                'aboutus';
                                    }else{
                                    urlPath = SERVER_URL + "templates/viewTemplateUrl?userId=" + $auth.getPayload().id
                                                                    + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";
                                                                $scope.appTemplateUrl = urlPath + '' +
                                                                    '#/app/aboutUs';
                                    }

                                    mySharedService.prepForBroadcast($scope.appTemplateUrl);
                                    $scope.selectedTab = current;
                                }).error(function (data, status, headers, config) {
                                    toastr.error('Unable to Add', 'Warning', {
                                        closeButton: true
                                    });
                                });

                        }).error(function(err) {
                            toastr.error(err.message, 'Warning', {
                                closeButton: true
                            });
                        });
                    }else{
                        commerceService.saveStoreSettings(storeSettings)
                            .success(function (data, status, headers, config) {
                                toastr.success('About Us has been added successfully', 'Awesome', {
                                    closeButton: true
                                });
                                var urlPath;
                                console.log('wtf');
                                console.log('$scope isNew ' + $scope.isNew);
                                if($scope.isNew == 'true'){
                                urlPath = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + $auth.getPayload().id
                                                                                            + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";
                                                                                        $scope.appTemplateUrl = urlPath + '' +
                                                                                            'aboutus';
                                }else{
                                urlPath = SERVER_URL + "templates/viewTemplateUrl?userId=" + $auth.getPayload().id
                                                                + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";
                                                            $scope.appTemplateUrl = urlPath + '' +
                                                                '#/app/aboutUs';
                                }

                                mySharedService.prepForBroadcast($scope.appTemplateUrl);
                                $scope.selectedTab = current;
                            }).error(function (data, status, headers, config) {
                                toastr.error('Unable to Add', 'Warning', {
                                    closeButton: true
                                });
                            });
                    }
                } else {

                    $scope.selectedTab = current;
                }
            }

        };
//------------------------ Gettings store settings -----------------------------


        commerceService.showStoreSettings($rootScope.appId).success(function (data) {
            $scope.storeSettings = data[0];
            if( typeof $scope.storeSettings.header != undefined){

                            var imageURL = SERVER_URL + "templates/viewWebImages?" +
                                                "userId=" + $auth.getPayload().id +
                                                "&appId=" + $rootScope.appId + "&" + new Date().getTime() +
                                                "&images=ABOUTUS.png";

                                            $scope.tmpImage[0] = imageURL;
                                            $scope.picFile = imageURL;

            }
            $scope.storeSettings.currency = data[0].currencySign;
            $scope.openHours = data[0].OpenHours;
        }).error(function (err) {
            toastr.error(' warning', "Unable to get Store Settings", {closeButton: true});
        });


       //-----------------------------------------------------------------------


//
//        $scope.uploadFile = function (files) {
//
//            var file=files;
//             var reader = new FileReader();
//            reader.readAsDataURL(file);
//               reader.onload = function () {
//                 console.log(reader.result);
//                 $scope.uploadedFiles = reader.result;
//               };
//               reader.onerror = function (error) {
//                 console.log('Error: ', error);
//               };
//            console.log($scope.uploadedFiles);
//            console.log($scope.uploadedFiles);
//
//        };


        $scope.savePolicies = function (current, storeSettings) {

            var returnPolicy = storeSettings.returnPolicy;
            var termsAndCondition = storeSettings.termsAndCondition;
            var privacyPolicy = storeSettings.privacyPolicy;
            if (typeof returnPolicy == 'undefined') {
                toastr.error('Fill Return Policy ', 'Warning',
                    {closeButton: true}
                );
                return;
            }
            // Validate, Terms And Condition maximum characters length
            else if (typeof termsAndCondition == 'undefined') {
                toastr.error('Fill Terms And Condition ', 'Warning',
                    {closeButton: true}
                );
                return;
            }
            // Validate, Privacy Policy maximum characters length
            else if (typeof privacyPolicy == 'undefined') {
                toastr.error('Fill Privacy Policy', 'Warning',
                    {closeButton: true}
                );
                return;
            }
            else {
                    storeSettings.userId = $scope.userId;
                    storeSettings.appId = $rootScope.appId;
                    commerceService.savePolicies(storeSettings).success(function (data) {
                        toastr.success('Policies and Terms has been added successfully','Awesome', {
                            closeButton: true
                        });
                        $scope.selectedTab = current;
                    }).error(function (err) {
                        toastr.error(' warning', "Unable to get Store Settings", {closeButton: true});
                    })


                    $scope.selectedTab = current;
            }
        };

        /*commerceService.showPolicies($scope.appId).success(function (data) {
            alert("data " + JSON.stringify(data[0]));
            $scope.policies = data[0];
        }).error(function (err) {
            toastr.error(' warning', "Unable to get Store Settings", {closeButton: true});
        })*/


        $scope.editCat = function (imageUrl, $id) {
            return commerceService.showCommerceImageEditDialog(imageUrl, $id);
        };
        $scope.catListChange = function ($index) {
            $scope.products[$index].categoryId = $scope.categoryIdList[$index];
        };


        $scope.nextStep = function (current) {
            $scope.selectedTab = current;
        };

        $scope.openMiniLightBox = function () {
            $scope.miniLightBoxShow = true;
        };

        $scope.closeMiniLightBox = function () {
            $scope.miniLightBoxShow = false;
        };


        $scope.addTaxOption = function () {
            return commerceService.showAddTaxOptionDialog();
        };

        $scope.addNewUser = function () {
            return commerceService.showAddNewUserDialog();
        };


        $scope.hide = function () {
            $mdDialog.hide();
        };
        
        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function () {
            $mdDialog.hide();
        };

        $scope.saveEmailDeliInfo = function (email, type) {
            if(email == undefined || email.fromEmail == undefined || email.replyToEmail == undefined
             || email.alertEmail == undefined || email.alertAt == undefined){
                toastr.error('Please fill the all fields','Warning',{
                    closeButton: true
                });
            }
            else{
            email.appId = $rootScope.appId;
            commerceService.saveEmailDeliInfo(email)
                .success(function (data) {
                    //$log.debug(data);
                    if (type == "next") {
                        var index = ($scope.selectedIndex == $scope.max) ? 0 : $scope.selectedIndex + 1;
                        $scope.selectedIndex = index;
                    }
                    $scope.enableTab = false;
                    toastr.success('Email settings successfully updated ', 'Success', {
                        closeButton: true
                    });

                }).error(function (err) {
                toastr.error('Unable to Create', 'Warning', {
                    closeButton: true
                });
            })
            }
        };
        $scope.nextStep1 = function () {

        };


        $scope.confirmPicImageSelected = true;
        $scope.fulfillPicImageSelected = true;
        $scope.refundPicImageSelected = true;
        $scope.buttonNameHeader = "Browse Image";
        $scope.buttonNameFulfill = "Browse Image";
        $scope.buttonNameRefund = "Browse Image";

// ********************* Email Images ********************************


// ---------------------- confirm email -------------------------------

        // image crop function confirm email
        $scope.cropImageConfirm = function () {
            var handleFileSelect = function (evt) {
                var file = evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.myImageHeaderConfirm = evt.target.result;
                        $scope.confirmPic = $scope.myImageHeaderConfirm;
                    });
                };
                reader.readAsDataURL(file);
                $scope.confirmPicImageSelected = false;
                $scope.buttonNameHeader = "Upload";
            };
            angular.element(document.querySelector('#fileInput1')).on('change', handleFileSelect);
        }

        //add image function confirm email
        $scope.addImageConfirm = function (img) {
            if (angular.element('#fileInput1').val() == '') {
                toastr.error('Please choose an image to upload', 'Warning', {
                    closeButton: true
                });
            }
            else {
                var im = $scope.tmpImage;
                im[0] = $scope.confirmPic;
                $scope.tmpImage = im;
                $scope.mainImg = img;
                $scope.myImageHeaderConfirm = null;
                toastr.success('Image has been uploaded successfully', 'message', {
                    closeButton: true
                });
            }
            $scope.picFileHeader = $scope.tmpImage;
            console.log($scope.tmpImage);
            $scope.confirmPicImageSelected = true;
            $scope.buttonNameHeader = "Browse Image";
        };

//-------------------------fullfill email----------------------------------------

               // image crop function fulfill email
        $scope.cropImageFulfill = function () {
            var handleFileSelect = function (evt) {
                var file = evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.myImageHeaderFulfill = evt.target.result;
                        $scope.fulfillPic = $scope.myImageHeaderFulfill;
                    });
                };
                reader.readAsDataURL(file);
                $scope.fulfillPicImageSelected = false;
                $scope.buttonNameFulfill = "Upload";
            };
            angular.element(document.querySelector('#fileInput2')).on('change', handleFileSelect);
        }

        //add image function fulfill email
        $scope.addImageFulfill = function (img) {
            if (angular.element('#fileInput2').val() == '') {
                toastr.error('Please choose an image to upload', 'Warning', {
                    closeButton: true
                });
            }
            else {
                var im = $scope.tmpImage;
                im[0] = $scope.fulfillPic;
                $scope.tmpImage = im;
                $scope.mainImg = img;
                $scope.myImageHeaderFulfill = null;
                toastr.success('Image has been uploaded successfully', 'message', {
                    closeButton: true
                });
            }
            $scope.picFileHeader2 = $scope.tmpImage;
            console.log($scope.tmpImage);
            $scope.fulfillPicImageSelected = true;
            $scope.buttonNameFulfill = "Browse Image";
        };

//-------------------------refund email----------------------------------------

               // image crop function fulfill email
        $scope.cropImageRefund = function () {
            var handleFileSelect = function (evt) {
                var file = evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.myImageHeaderRefund = evt.target.result;
                        $scope.refundPic = $scope.myImageHeaderRefund;
                    });
                };
                reader.readAsDataURL(file);
                $scope.refundPicImageSelected = false;
                $scope.buttonNameRefund = "Upload";
            };
            angular.element(document.querySelector('#fileInput3')).on('change', handleFileSelect);
        }

        //add image function fulfill email
        $scope.addImageRefund = function (img) {
            if (angular.element('#fileInput3').val() == '') {
                toastr.error('Please choose an image to upload', 'Warning', {
                    closeButton: true
                });
            }
            else {
                var im = $scope.tmpImage;
                im[0] = $scope.refundPic;
                $scope.tmpImage = im;
                $scope.mainImg = img;
                $scope.myImageHeaderRefund = null;
                toastr.success('Image has been uploaded successfully', 'message', {
                    closeButton: true
                });
            }
            $scope.picFileHeader3 = $scope.tmpImage;
            console.log($scope.tmpImage);
            $scope.refundPicImageSelected = true;
            $scope.buttonNameRefund = "Browse Image";
        };





        $scope.updateEmailSettings = function (email, type, emailType) {

            var imageData ;
            var oldImage ;
            var isUpdateHImg = true;

            if(email == undefined){
                toastr.error('Please fill the all fields','Warning',{
                    closeButton: true
                });
            }
            else {
                email.appId = $rootScope.appId;
                commerceService.updateEmailSettings(email)
                    .success(function (data) {
                        var data = {"emailType" : emailType,"appId":$rootScope.appId,"userId":$auth.getPayload().id};
                        if (emailType=="orderConfirmedEmail"){
                            oldImage = $scope.oldImage1
                            imageData = $scope.picFileHeader;
                        }else if (emailType=="orderFulfilledEmail"){
                            oldImage = $scope.oldImage2
                            imageData = $scope.picFileHeader2;
                        }else if (emailType=="orderRefundEmail"){
                            oldImage = $scope.oldImage3
                            imageData = $scope.picFileHeader3;
                        }else {
                            isUpdateHImg = false;

                        }



                        if ((emailType=="orderConfirmedEmail" && $scope.picFileHeader[0].length >500) || (emailType=="orderFulfilledEmail" && $scope.picFileHeader2[0].length > 500) || (emailType=="orderRefundEmail" && $scope.picFileHeader3[0].length > 500)) {

                            commerceService.updateHeaderFooterSettings({"file":imageData,"data":data,"oldImage":oldImage,"isNew":$rootScope.tempNew}).success(function (data) {


                                if (type == "next") {
                                    var index = ($scope.selectedIndex == $scope.max) ? 0 : $scope.selectedIndex + 1;
                                    $scope.selectedIndex = index;
                                }

                                if ($scope.selectedIndex==6){
                                    $mdDialog.hide();
                                }

                                if ($scope.selectedIndex==6||type == "finish"){

                                    $mdDialog.hide();
                                }

                                toastr.success('Email Settings has been changed ', 'Success', {
                                    closeButton: true
                                });

                            }).error(function (err) {
                                toastr.error('Unable to Create', 'Warning', {
                                    closeButton: true
                                });
                            })
                        }else {
                            commerceService.updateEmailSettings(data).success(function (data) {


                                if (type == "next") {
                                    var index = ($scope.selectedIndex == $scope.max) ? 0 : $scope.selectedIndex + 1;
                                    $scope.selectedIndex = index;
                                }

                                if ($scope.selectedIndex==6){
                                    $mdDialog.hide();
                                }

                                toastr.success('Email Settings has been changed ', 'Success', {
                                    closeButton: true
                                });
                                if(emailType=="orderRefundEmail"){
                                    $mdDialog.hide();
                                }

                            }).error(function (err) {
                                toastr.error('Unable to Create', 'Warning', {
                                    closeButton: true
                                });
                                $mdDialog.hide();
                            })
                        }
                }).error(function (err) {
                    toastr.error('Unable to Create', 'Warning', {
                        closeButton: true
                    });
                    $mdDialog.hide();
                })
            }

        };
        /*$scope.updateHeaderFooterSettings = function (picFileHeader, picFileFooter, email, type) {

            //$log.debug(email);
            if(email == undefined || email.footer == undefined || email.header == undefined || email.footer == '' || email.header == ''){
                toastr.error('Please fill the all fields','Warning',{
                    closeButton: true
                });
            }else if(picFileHeader == null || picFileFooter == null){
                toastr.error('Please upload a header and footer image', 'Warning', {
                    closeButton: true
                });
                return;
            } else{
                email.appId = $rootScope.appId;
                email.userId = $auth.getPayload().id;
                commerceService.updateHeaderFooterSettings(picFileHeader, picFileFooter, email)
                    .success(function (data) {
                        //$log.debug(data);
                        if (type == "next") {
                            var index = ($scope.selectedIndex == $scope.max) ? 0 : $scope.selectedIndex + 1;
                            $scope.selectedIndex = index;
                        }
                        toastr.success('Email Settings has been changed ', 'Success', {
                            closeButton: true
                        });

                    }).error(function (err) {
                    toastr.error('Unable to Create', 'Warning', {
                        closeButton: true
                    });
                })
            }

        };*/
        var prams = {
            appId: $rootScope.appId
        };

        $scope.enableTab = true;
        commerceService.getEmailSettings(prams)
            .success(function (result) {

                $scope.email = result[0];
                if (!angular.isUndefined($scope.email)) {
                    $scope.enableTab = false;
                    $scope.emailDel = {
                        fromEmail: $scope.email.fromEmail,
                        replyToEmail: $scope.email.replyToEmail,
                        alertEmail: $scope.email.alertEmail,
                        alertAt: $scope.email.alertAt
                    };
                    $scope.emailHF = {
                        header: $scope.email.header,
                        footer: $scope.email.footer
                    };
                    $scope.emailSettings = {
                        domainName: $scope.email.domainName,
                        emailUsername: $scope.email.emailUsername,
                        emailPassword: $scope.email.emailPassword,
                        sslEnabled: $scope.email.sslEnabled
                    }
                    var imagePath;

                    if($rootScope.tempNew == true || $rootScope.tempNew == "true"){
                    imagePath=  SERVER_URL +"templates/viewWebImages?userId="+ $auth.getPayload().id
                                            +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"&images=email/";

                    }else{
                    imagePath=  SERVER_URL +"templates/viewImages?userId="+ $auth.getPayload().id
                                            +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"&img=email/";

                    }

                    //$scope.picFileFooter =  imagePath + $scope.email.imageFooter;
                    $scope.picFileHeader[0] =  imagePath + $scope.email.orderConfirmedEmailImage;
                    $scope.picFileHeader2[0] =  imagePath + $scope.email.orderFulfilledEmailImage;
                    $scope.picFileHeader3[0] =  imagePath + $scope.email.orderRefundedEmailImage;

                    $scope.oldImage1 = $scope.email.orderConfirmedEmailImage;
                    $scope.oldImage2 = $scope.email.orderFulfilledEmailImage;
                    $scope.oldImage3 = $scope.email.orderRefundedEmailImage;



                    $scope.orderConfirmedEmail = {
                        orderConfirmedEmail: $scope.email.orderConfirmedEmail
                    }
                    $scope.orderFulfilledEmail = {
                        orderFulfilledEmail: $scope.email.orderFulfilledEmail
                    }
                    $scope.orderRefundEmail = {
                        orderRefundEmail: $scope.email.orderRefundEmail
                    }
                }
            }).error(function (error) {
            //alert("MainMenu Loading Error : " + error);
        });
        $scope.testEmail = function (type) {
            //$log.debug('d');
            var sendType = {
                type: type,
                userId: $auth.getPayload().id,
                appId:$rootScope.appId
            }

            var prams = {
                appId: $rootScope.appId
            };
            commerceService.getEmailSettings(prams)
                .success(function (result) {
                    $scope.email = result;

            sendType.appId = $rootScope.appId;
                    //$log.debug($scope.email);
            for (var i = 0; i < $scope.email.length; i++) {
                if ((type == "Order confirm") && (typeof $scope.email[0].orderConfirmedEmail === 'undefined')) {
                    toastr.error('Save before test the Email ', 'Warning', {
                        closeButton: true
                    });

                } else if ((type == "Order Fulfilled") && (typeof $scope.email[0].orderFulfilledEmail === 'undefined')) {
                    toastr.error('Please save your changes and proceed to test email', 'Warning', {
                        closeButton: true
                    });

                } else if ((type == "Order Refund") && (typeof $scope.email[0].orderRefundEmail === 'undefined')) {
                    toastr.error('Save before test the Email ', 'Warning', {
                        closeButton: true
                    });

                } else {
                    commerceService.sendTestEmail(sendType)
                        .success(function (data) {
                            toastr.success('Test email successfully sent ', 'Success', {
                                closeButton: true
                            });

                        }).error(function (err) {
                        toastr.error('smtp username and password not accepted ', 'Warning', {
                            closeButton: true
                        });
                    })
                }
            }
                }).error(function (error) {
                $log.debug("Email Loading Error : " + error);
            });

        };

        $scope.refunded = function () {
            $scope.selectedRow = $scope.gridApi1.selection.getSelectedRows();

            var status = null;
            for (var i = 0; i < $scope.selectedRow.length; i++) {
                status =$scope.selectedRow[i].paymentStatus;

                 }



                    if ($scope.selectedRow.length == 0) {
                        toastr.error('Please select a row', 'Warning', {
                            closeButton: true
                        });
                    }

                    else {

                        if(status == "Pending") {


                        $scope.refundedDate = new Date();
                        var refundedDate = $scope.refundedDate;
                        // $state.go('PassOderDates', {refundedDate: refundedDate});
                        for (var i = 0; i < $scope.selectedRow.length; i++) {
                            $scope.selectedRow[i].paymentStatus = "Refunded";
                            $scope.selectedRow[i].fulfillmentStatus = "Refund";
                            $scope.selectedRow[i].refundedDate = refundedDate;
                            $scope.gridApi1.selection.clearSelectedRows();
                            $scope.refund.push($scope.selectedRow[i]);
                            $scope.unfulfilled.splice($scope.unfulfilled.indexOf($scope.selectedRow[i]), 1);
                        }
                        $scope.gridOptions1.isRowSelectable = function (row) {
                            if (row.entity.paymentStatus === "Refunded") {
                                return false;
                            } else {
                                return true;
                            }
                        };
                        $scope.gridApi1.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
                        $scope.gridApi1.core.notifyDataChange(uiGridConstants.dataChange.EDIT);
                        $scope.gridOptions3.data = $scope.unfulfilled;

                        for(var i =0;i<$scope.selectedRow.length;i++){
                            $scope.selectedRow[i].userId = $auth.getPayload().id;
                        }

                        commerceService.updateOrders($scope.selectedRow)
                            .success(function (data) {
                                toastr.success('Order status changed to refunded  ', 'Success', {
                                    closeButton: true
                                });
                            })
                            .error(function (err) {
                                toastr.error('Order status change failed ', 'Warning', {
                                    closeButton: true
                                });
                            })
                    } else if(status == "Refunded"){
                            toastr.error('This order already refunded ', 'Warning', {
                                closeButton: true
                            });

                        }else{

                            toastr.error('Successful order cannot be changed ', 'Warning', {
                                closeButton: true
                            });
                            }
                }
        };
        $scope.fulfilled = function () {
            $scope.row = $scope.gridApi1.selection.getSelectedRows();

            var status = null;
            for (var i = 0; i < $scope.row.length; i++) {
                status = $scope.row[i].paymentStatus;

            }
            if($scope.row.length == 0){
                toastr.error('Please Select a row', 'Warning', {
                    closeButton: true
                });
            }
            else{
                if(status == "Pending" || status == "Refunded" ) {


                $scope.fulfilledDate = new Date();
                var fulfilledDate = $scope.fulfilledDate;
                //$state.go('PassOderDates', {fulfilledDate: fulfilledDate});
                for (var i = 0; i < $scope.row.length; i++) {
                    $scope.row[i].paymentStatus = "Successful";
                    $scope.row[i].fulfilledDate = fulfilledDate;
                    $scope.row[i].fulfillmentStatus = "Successful";
                    $scope.gridApi1.selection.clearSelectedRows();
                    $scope.fulfill.push($scope.row[i]);
                    $scope.unfulfilled.splice($scope.unfulfilled.indexOf($scope.row[i]), 1);
                }
                $scope.gridOptions1.isRowSelectable = function(row){
                    if(row.entity.paymentStatus === "Successful"){
                        return false;
                    } else {
                        return true;
                    }
                };
                $scope.gridApi1.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
                $scope.gridApi1.core.notifyDataChange(uiGridConstants.dataChange.EDIT);
                $scope.gridOptions3.data = $scope.unfulfilled;

                for(var i =0;i<$scope.row.length;i++){
                    $scope.row[i].userId = $auth.getPayload().id;
                }

                commerceService.updateOrders($scope.row)
                .success(function (data) {
                    toastr.success('Order status changed to fulfilled ', 'Success', {
                        closeButton: true
                    });
                })
                .error(function (err) {
                    toastr.error('Could not change the status', 'Warning', {
                        closeButton: true
                    });
                })
                }else{

                    toastr.error('Already Successfully performed', 'Warning', {
                        closeButton: true
                    });
                }
            }
        };
        /*
            Contact us controller
        */
        // --/-- Characters length config
        $scope.maxBasicInfoAddress = 100;

        // --- Config ----
        contactUsService.getContactUsInfo().success(function(result){
            //  if(result.appId == $rootScope.appId) {
            $scope.basicInfo = result;
            $scope.webInfo = result;
            $scope.googleMap = result;

               // }
        }).error(function (error) {
                //alert("Contact Us information Loading Error : " + error);
        });
        // Save Contact Us Information and move to Web Information
        $scope.addContactUs = function(basicInfo,webInfo,googleMap,type) {

        if(basicInfo.telPhone){
            if(basicInfo.telPhone.charAt(0) == '+'){
                basicInfo.telPhone = basicInfo.telPhone.slice(1, basicInfo.telPhone.length);
            }
        }


            // If defined basic information address , Check length
            // if((typeof basicInfo.address != 'undefined') && (basicInfo.address.length > $scope.maxBasicInfoAddress)){
            //     toastr.error('Address should be less than '+$scope.maxBasicInfoAddress+' letters.',
            //         'Warning',{closeButton: true}
            //     );
            //     return;
            // }

            if(typeof basicInfo.address == 'undefined'){
                // toastr.error('Updating of address failed', { closeButton: true});
                basicInfo.address = null;
            }
            if(typeof basicInfo.telPhone == 'undefined'){
                toastr.error('Updating of Telephone number failed', { closeButton: true});
            }
            else if(typeof webInfo.email == 'undefined'){
                toastr.error('Updating of Email address failed', { closeButton: true});
            }
            else if(typeof webInfo.webSite == 'undefined'){
                toastr.error('Updating of web address failed', { closeButton: true});
            }
            else{
                var basicInfoResponse = {
                    'appId': $rootScope.appId,
                    'address': basicInfo.address,
                    'telPhone': basicInfo.telPhone,
                    'email': webInfo.email,
                    'webSite': webInfo.webSite,
                    'showmap': webInfo.showmap,
                    'twitter': webInfo.twitter,
                    'facebook': webInfo.facebook,
                    'instagram': webInfo.instagram,
                    'linkedin': webInfo.linkedin,
                    'pinterest': webInfo.pinterest,
                    'showOnWebsiteContact' : basicInfo.showOnWebsiteContact || false
                };
                contactUsService.saveBasicInfo(basicInfoResponse)
                    .success(function(data, status, headers, config) {
                        toastr.success('Contact Us successfully updated. ', 'Awesome ', {closeButton: true});
                        if(type == 'next'){
                            $scope.selectedTab = 4;
                        }else if(type == 'finish'){
                            $mdDialog.hide();
                        }
                    }).error(function(data, status, headers, config) {
                    toastr.error('Updating of basic information failed','Warning', { closeButton: true});
                    $mdDialog.hide();
                });
            }

        };


        //Manage locations controller
        $scope.addNewMapLocation = function(branch) {
            commerceService.showAddNewLocationDialog(branch);
        };


        $scope.branches;
        contactUsService.getAppBranchesInfo().success(function(result){
            $scope.branches = result;
        });

        $scope.deleteBranch = function (id) {
            return $mdDialog.show({
                controllerAs: 'dialogCtrl',
                controller: function($mdDialog){
                    this.confirm = function click(){
                        contactUsService.deleteBranch(id)
                            .success(function(data) {
                                toastr.success('Branch Deleted. ', 'Success ', {closeButton: true});
                                return commerceService.showStoreSettingsDialog(4);

                            }).error(function(data) {
                            toastr.error('Deleting branch failed','Warning', { closeButton: true});
                            return commerceService.showStoreSettingsDialog(4);
                        });
                    },
                        this.cancel = function click(){
                            return commerceService.showStoreSettingsDialog(4);
                        }
                },
                template:'<md-dialog aria-label="Deleting variant">'+
                '<md-content >' +
                '<div class="md-dialog-header">' +
                '<h1>Deleting branch location</h1>' +
                '</div>' +
                '<br>'+
                '<div style="text-align:center">' +
                '<lable>Are you sure you want to delete this branch?</lable>' +
                '</div>' +
                '<br><br>' +
                '<div class="md-dialog-buttons">'+
                '<div class="inner-section">'+
                '<md-button class="me-default-button" ng-click="dialogCtrl.cancel()">No</md-button>'+
                '<md-button class="me-default-button" ng-click="dialogCtrl.confirm()">Yes</md-button>'+
                '</div>'+
                '</div>' +
                '</md-content>' +
                '</md-dialog>'
            })
        };


        /**
         * options if pasting text form another source
         **/
        var originatorEv;
        $scope.pastingContent = '';
        $scope.oldTextContent = '';
        $scope.whichEditor = '';

        $scope.pastedText = function (oldTextContent, event, whichEditor) {
            $scope.pastingContent = event.originalEvent.clipboardData.getData('text');
            $scope.oldTextContent = oldTextContent;
            $scope.whichEditor = whichEditor;
            $timeout(function(){
                var ele;
                if(whichEditor == 'returnpolicy'){
                    ele=document.getElementById('addReturnPolicy');

                }else if(whichEditor == 'termsconditions'){
                    ele=document.getElementById('addTermsConditions');

                }else if(whichEditor == 'privacypolicy'){
                    ele=document.getElementById('addPrivacyPolicy');
                }else if(whichEditor == 'addFulfillEmail'){
                    ele=document.getElementById('addFulfillEmail');
                }else if(whichEditor == 'addOrderConfirmationEmail'){
                    ele=document.getElementById('addOrderConfirmationEmail');
                }else if(whichEditor == 'addRefundEmail'){
                    ele=document.getElementById('addRefundEmail');
                }else{
                    ele=document.getElementById('addAboutUs');
                }
                angular.element(ele).triggerHandler('click');
            },0);
        };

        $scope.stripHtml = function () {
            if($scope.oldTextContent){
                if($scope.whichEditor == 'returnpolicy'){
                    $scope.storeSettings.returnPolicy = $scope.oldTextContent +$scope.pastingContent;
                }else if($scope.whichEditor == 'termsconditions'){
                    $scope.storeSettings.termsAndCondition = $scope.oldTextContent +$scope.pastingContent;
                }else if($scope.whichEditor == 'privacypolicy'){
                    $scope.storeSettings.privacyPolicy = $scope.oldTextContent +$scope.pastingContent;
                }else if($scope.whichEditor == 'addFulfillEmail'){
                    $scope.orderFulfilledEmail.orderFulfilledEmail.header = $scope.oldTextContent +$scope.pastingContent;
                }else if($scope.whichEditor == 'addOrderConfirmationEmail'){
                    $scope.orderConfirmedEmail.orderConfirmedEmail.header = $scope.oldTextContent +$scope.pastingContent;
                }else if($scope.whichEditor == 'addRefundEmail'){
                    $scope.orderRefundEmail.orderRefundEmail.header = $scope.oldTextContent +$scope.pastingContent;
                }else{
                    $scope.storeSettings.content = $scope.oldTextContent +$scope.pastingContent;
                }
            }else{
                if($scope.whichEditor == 'returnpolicy'){
                    $scope.storeSettings.returnPolicy =  $scope.pastingContent;
                }else if($scope.whichEditor == 'termsconditions'){
                    $scope.storeSettings.termsAndCondition =  $scope.pastingContent;
                }else if($scope.whichEditor == 'privacypolicy'){
                    $scope.storeSettings.privacyPolicy =  $scope.pastingContent;
                }else if($scope.whichEditor == 'addFulfillEmail'){
                    $scope.orderFulfilledEmail.orderFulfilledEmail.header =  $scope.pastingContent;
                }else if($scope.whichEditor == 'addOrderConfirmationEmail'){
                    $scope.orderConfirmedEmail.orderConfirmedEmail.header =  $scope.pastingContent;
                }else if($scope.whichEditor == 'addRefundEmail'){
                    $scope.orderRefundEmail.orderRefundEmail.header =  $scope.pastingContent;
                }else{
                    $scope.storeSettings.content =  $scope.pastingContent;
                }
            }
        };

    }
})();
