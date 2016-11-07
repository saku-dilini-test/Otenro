(function () {
    'use strict';
    angular.module("appEdit").controller("CommerceCtrl", [
        '$scope', '$mdDialog', 'toastr', 'commerceService', 'currencyService', 'publishService', '$rootScope',
        'SERVER_URL', '$auth', 'ME_APP_SERVER', '$interval', '$q','aboutUsService','mySharedService','comingSoonService',
        '$filter','contactUsService','uiGmapGoogleMapApi','uiGridConstants','$templateCache','uiGridExporterConstants','uiGridExporterService',
        CommerceCtrl]);

    function CommerceCtrl($scope, $mdDialog, toastr, commerceService, currencyService, publishService, $rootScope,
             SERVER_URL, $auth, ME_APP_SERVER, $interval, $q,aboutUsService,mySharedService,comingSoonService, $filter,
             contactUsService,uiGmapGoogleMapApi,uiGridConstants,$templateCache,uiGridExporterConstants,uiGridExporterService,sendDate) {

        $scope.refund = [];
        $scope.unfulfilled = [];
        $scope.fulfill = [];

        // Characters length config
        $scope.maxLengthNextOrderNumber = 8; // max characters length of NextOrderNumber in product
        // Policy
        $scope.maxReturnPolicy = 100;
        $scope.maxTermsAndCondition = 100;
        $scope.maxPrivacyPolicy = 100;
        // About us
        $scope.maxAboutUsHeader = 20;
        $scope.maxAboutUsContent = 100;
        $scope.currency = $rootScope.currency;


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
                    console.log(row);

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
                        $mdDialog.hide();
                    }

                     $scope.imageURL = SERVER_URL
                                    +"templates/viewImages?userId="
                                    +$auth.getPayload().id+"&appId="+$scope.oderData.entity.appId+"&"+new Date().getTime()+"&img=thirdNavi";

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

        $scope.selectedTab = 0;
        $scope.currentPage = 2;
        $scope.pageSize = 5;
        $scope.statusList = [
            {status: "Closed"}, {status: "Open"}
        ];
        $scope.data = {status: "Closed"};
        $scope.statusPlaceHolder = "Closed";
        $scope.currencyPlaceHolder = "USD";
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
                alert("MainMenu Loading Error : " + error);
            })
        }

        if (typeof $scope.categories === 'undefined') {
            commerceService.getCategoryList()
                .success(function (result) {
                    $scope.categories = result;
                }).error(function (error) {
                alert("Category Loading Error : " + error);
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
                alert("Category Loading Error : " + error);
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
                        if ($scope.ordersList[i].paymentStatus == "refunded") {
                            $scope.refund.push($scope.ordersList[i]);
                        }
                        else if ($scope.ordersList[i].paymentStatus == "Pending") {
                            $scope.unfulfilled.push($scope.ordersList[i]);
                        }
                        else if ($scope.ordersList[i].paymentStatus == "successful") {
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
                alert("Orders List Loading Error : " + error);
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
                                toastr.success('Second Navigation has been Deleted ', 'Deleted', {
                                    closeButton: true
                                });
                            }).error(function (err) {
                            toastr.error('Unable to Delete', 'Warning', {
                                closeButton: true
                            });
                        })
                    }
                }).error(function (err) {
                toastr.error('Unable to Updated', 'Warning', {
                    closeButton: true
                });
            })
        };

        publishService.getAllLanguages().success(function (data) {
            $scope.languageList = data;
        }).error(function (err) {
            alert("MainMenu Loading Error : " + err);
        });

        currencyService.getAllCurrency().success(function (data) {
            $scope.currencyList = data;

        }).error(function (err) {
            alert("MainMenu Loading Error : " + err);
        });
        commerceService.getAllSiteType().success(function (data) {
            $scope.siteTypeList = data;
        }).error(function (err) {
            alert("MainMenu Loading Error : " + err);
        });
        commerceService.getAllMeasurementType().success(function (data) {
            $scope.measurementTypeList = data;
        }).error(function (err) {
            alert("MainMenu Loading Error : " + err);
        });
        commerceService.getAllTimeAndRegion().success(function (data) {
            $scope.timeAndRegionList = data;
        }).error(function (err) {
            alert("MainMenu Loading Error : " + err);
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
            console.log(storeSettings);
            if (!storeSettings){
                toastr.error(' warning', "Please fill all required fields", {closeButton: true});
            }/*else if (!storeSettings.orderNumber) {
                toastr.error(' warning', "Please fill order number field", {closeButton: true});
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
                    storeSettings.userId = $scope.userId;
                storeSettings.appId = $rootScope.appId;
                storeSettings.OpenHours = openHoursData;

                var reqParams = {
                    currencySign: $scope.options.sign,
                    currency: $scope.options.currency,
                    appId: $rootScope.appId
                };
                currencyService.setCurrency(reqParams).success(function (data) {
                }).error(function (err) {
                    toastr.error(' warning', "Unable to get templates", {closeButton: true});
                });

                commerceService.saveStoreSettings(storeSettings).success(function (data) {
                    toastr.success('Store Setting Details has been added successfully', {
                        closeButton: true
                    });
                    $scope.selectedTab = current;
                    $rootScope.currency = $scope.options.sign;
                }).error(function (err) {
                    toastr.error(' warning', "Unable to get templates", {closeButton: true});
                })
                $scope.selectedTab = current;
            }
        };

        $scope.addAboutUs = function (current,storeSettings) {

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
                    commerceService.saveStoreSettings(storeSettings)
                        .success(function (data, status, headers, config) {
                            toastr.success('Store Setting Details has been added successfully', 'Awsome!', {
                                closeButton: true
                            });
                            $scope.appTemplateUrl = ME_APP_SERVER+'temp/'+$auth.getPayload().id
                                +'/templates/'+$rootScope.appId+'' +
                                '#/app/aboutUs';
                            mySharedService.prepForBroadcast($scope.appTemplateUrl);
                            $scope.selectedTab = current;
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

        commerceService.showStoreSettings($rootScope.appId).success(function (data) {
            $scope.storeSettings = data[0];
            $scope.storeSettings.currency = data[0].currencySign;
            $scope.openHours = data[0].OpenHours;
        }).error(function (err) {
            toastr.error(' warning', "Unable to get Store Settings", {closeButton: true});
        });

        $scope.savePolicies = function (current, storeSettings) {

            // Validate, Return Policy maximum characters length
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
            if((typeof termsAndCondition != 'undefined') &&
                (termsAndCondition.length > $scope.maxTermsAndCondition)){
                toastr.error('Terms And Condition, maximum characters length is exceed. ' +
                    'Maximum characters length is : '+$scope.maxTermsAndCondition, 'Warning',
                    {closeButton: true}
                );
                return;
            }

            // Validate, Privacy Policy maximum characters length
            var privacyPolicy = storeSettings.privacyPolicy;
            if((typeof privacyPolicy != 'undefined') &&
                (privacyPolicy.length > $scope.maxPrivacyPolicy)){
                toastr.error('Privacy Policy, maximum characters length is exceed. ' +
                    'Maximum characters length is : '+$scope.maxPrivacyPolicy, 'Warning',
                    {closeButton: true}
                );
                return;
            }

            if (!storeSettings.returnPolicy|| !storeSettings.termsAndCondition|| !storeSettings.privacyPolicy) {
                toastr.error(' warning', "Please fill all the fields", {closeButton: true});
            }
            else {
                storeSettings.userId = $scope.userId;
                storeSettings.appId = $rootScope.appId;
                commerceService.savePolicies(storeSettings).success(function (data) {
                    toastr.success('Store Setting Details has been added successfully', {
                        closeButton: true
                    });
                    $scope.selectedTab = current;
                }).error(function (err) {
                    toastr.error(' warning', "Unable to get Store Settings", {closeButton: true});
                })
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
                toastr.error('Fill the all fields','Warning',{
                    closeButton: true
                });
            }
            else{
            email.appId = $rootScope.appId;
            commerceService.saveEmailDeliInfo(email)
                .success(function (data) {
                    console.log(data);
                    if (type == "next") {
                        var index = ($scope.selectedIndex == $scope.max) ? 0 : $scope.selectedIndex + 1;
                        $scope.selectedIndex = index;
                    }
                    $scope.enableTab = false;
                    toastr.success('Email Settings has been changed ', 'Success', {
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
        $scope.updateEmailSettings = function (email, type) {

            console.log(email);
            if(email == undefined){
                toastr.error('Fill the all fields','Warning',{
                    closeButton: true
                });
            }
            else {
                email.appId = $rootScope.appId;
                commerceService.updateEmailSettings(email)
                    .success(function (data) {
                        console.log(data);
                        if (type == "next") {
                            var index = ($scope.selectedIndex == $scope.max) ? 0 : $scope.selectedIndex + 1;
                            $scope.selectedIndex = index;
                        }
                        toastr.success('Email Settings has been changed ', 'Success', {
                            closeButton: true
                        });
                        if ($scope.selectedIndex==6){
                            $mdDialog.hide();
                        }


                    }).error(function (err) {
                        toastr.error('Unable to Create', 'Warning', {
                            closeButton: true
                        });
                        $mdDialog.hide();
                    })
            }

        };
        $scope.updateHeaderFooterSettings = function (picFileHeader, picFileFooter, email, type) {

            console.log(email);
            if(email == undefined || email.footer == undefined || email.header == undefined || email.footer == '' || email.header == ''){
                toastr.error('Fill the all fields','Warning',{
                    closeButton: true
                });
            }else if(picFileHeader == null || picFileFooter == null){
                toastr.error('select header and footer image', 'Warning', {
                    closeButton: true
                });
                return;
            } else{
                email.appId = $rootScope.appId;
                email.userId = $auth.getPayload().id;
                commerceService.updateHeaderFooterSettings(picFileHeader, picFileFooter, email)
                    .success(function (data) {
                        console.log(data);
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

        };
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
                    var imagePath =  SERVER_URL +"templates/viewImages?userId="+ $auth.getPayload().id
                        +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"&img=email/";

                    $scope.picFileFooter =  imagePath + $scope.email.imageFooter;
                    $scope.picFileHeader =  imagePath + $scope.email.imageHeader;
                    $scope.OConfirm = {
                        orderConfirmedEmail: $scope.email.orderConfirmedEmail
                    }
                    $scope.Ofulfilled = {
                        orderFulfilledEmail: $scope.email.orderFulfilledEmail
                    }
                    $scope.ORefund = {
                        orderRefundEmail: $scope.email.orderRefundEmail
                    }
                }
            }).error(function (error) {
            alert("MainMenu Loading Error : " + error);
        });
        $scope.testEmail = function (type) {
            console.log('d');
            var sendType = {
                type: type,
                userId: $auth.getPayload().id
            }

            var prams = {
                appId: $rootScope.appId
            };
            commerceService.getEmailSettings(prams)
                .success(function (result) {
                    $scope.email = result;

            sendType.appId = $rootScope.appId;
            console.log($scope.email);
            for (var i = 0; i < $scope.email.length; i++) {
                if ((type == "Order confirm") && (typeof $scope.email[0].orderConfirmedEmail === 'undefined')) {
                    toastr.error('Save before test the Email ', 'Warning', {
                        closeButton: true
                    });

                } else if ((type == "Order Fulfilled") && (typeof $scope.email[0].orderFulfilledEmail === 'undefined')) {
                    toastr.error('Save before test the Email', 'Warning', {
                        closeButton: true
                    });

                } else if ((type == "Order Refund") && (typeof $scope.email[0].orderRefundEmail === 'undefined')) {
                    toastr.error('Save before test the Email ', 'Warning', {
                        closeButton: true
                    });

                } else {
                    commerceService.sendTestEmail(sendType)
                        .success(function (data) {
                            toastr.success('Test Email has been send ', 'Success', {
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
                console.log("Email Loading Error : " + error);
            });

        };

        $scope.refunded = function () {
            $scope.selectedRow = $scope.gridApi1.selection.getSelectedRows();
            if($scope.selectedRow.length == 0){
                toastr.error('Select a row', 'Warning', {
                    closeButton: true
                });
            }
            else{
                $scope.refundedDate = new Date();
                var refundedDate = $scope.refundedDate;
               // $state.go('PassOderDates', {refundedDate: refundedDate});
            for (var i = 0; i < $scope.selectedRow.length; i++) {
                $scope.selectedRow[i].paymentStatus = "refunded";
                $scope.selectedRow[i].fulfillmentStatus = "refund";
                $scope.selectedRow[i].refundedDate = refundedDate;
                $scope.gridApi1.selection.clearSelectedRows();
                $scope.refund.push($scope.selectedRow[i]);
                $scope.unfulfilled.splice($scope.unfulfilled.indexOf($scope.selectedRow[i]), 1);
            }
            $scope.gridOptions1.isRowSelectable = function(row){
                if(row.entity.paymentStatus === "refunded"){
                    return false;
                } else {
                    return true;
                }
            };
            $scope.gridApi1.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
            $scope.gridApi1.core.notifyDataChange(uiGridConstants.dataChange.EDIT);
            $scope.gridOptions3.data = $scope.unfulfilled;
            commerceService.updateOrders($scope.selectedRow)
                .success(function (data) {
                    toastr.success('Status changed to refunded ', 'Success', {
                        closeButton: true
                    });
                })
                .error(function (err) {
                    toastr.error('could not change the status', 'Warning', {
                        closeButton: true
                    });
                })
            }
        };
        $scope.fulfilled = function () {
            $scope.row = $scope.gridApi1.selection.getSelectedRows();
            if($scope.row.length == 0){
                toastr.error('Select a row', 'Warning', {
                    closeButton: true
                });
            }
            else{
                $scope.fulfilledDate = new Date();
                var fulfilledDate = $scope.fulfilledDate;
                //$state.go('PassOderDates', {fulfilledDate: fulfilledDate});
                for (var i = 0; i < $scope.row.length; i++) {
                    $scope.row[i].paymentStatus = "successful";
                    $scope.row[i].fulfilledDate = fulfilledDate;
                    $scope.row[i].fulfillmentStatus = "successful";
                    $scope.gridApi1.selection.clearSelectedRows();
                    $scope.fulfill.push($scope.row[i]);
                    $scope.unfulfilled.splice($scope.unfulfilled.indexOf($scope.row[i]), 1);
                }
                $scope.gridOptions1.isRowSelectable = function(row){
                    if(row.entity.paymentStatus === "successful"){
                        return false;
                    } else {
                        return true;
                    }
                };
                $scope.gridApi1.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
                $scope.gridApi1.core.notifyDataChange(uiGridConstants.dataChange.EDIT);
                $scope.gridOptions3.data = $scope.unfulfilled;
                commerceService.updateOrders($scope.row)
                .success(function (data) {
                    toastr.success('Status changed to fulfilled ', 'Success', {
                        closeButton: true
                    });
                })
                .error(function (err) {
                    toastr.error('could not change the status', 'Warning', {
                        closeButton: true
                    });
                })
            }
        };
        /*
            Contact us controller
        */
        // --/-- Characters length config
        $scope.maxBasicInfoAddress = 50;

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
        // Save Contact Us Information and move to Web Information
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
                        toastr.success('Store Setting Details has been added successfully', 'Awsome!', {closeButton: true});
                          $mdDialog.hide();
                    }).error(function(data, status, headers, config) {
                    toastr.error('Basic info saving error', { closeButton: true});
                });
            }
        };
    }
})();
