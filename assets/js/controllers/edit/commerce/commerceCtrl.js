(function () {
    'use strict';
    angular.module("appEdit").controller("CommerceCtrl", [
        '$scope', '$mdDialog', 'toastr', 'commerceService', 'currencyService', 'publishService', '$rootScope', 'SERVER_URL', '$auth', 'ME_APP_SERVER', '$interval', '$q','aboutUsService','mySharedService','comingSoonService',
        CommerceCtrl]);

    function CommerceCtrl($scope, $mdDialog, toastr, commerceService, currencyService, publishService, $rootScope, SERVER_URL, $auth, ME_APP_SERVER, $interval, $q,aboutUsService,mySharedService,comingSoonService) {

        $scope.refund = [];
        $scope.unfulfilled = [];
        $scope.fulfill = [];


        var fakeI18n = function (title) {
            var deferred = $q.defer();
            $interval(function () {
                deferred.resolve('col: ' + title);
            }, 1000, 1);
            return deferred.promise;
        };

        $scope.gridOptions1 = {

            enableRowSelection: true,
            enableSelectAll: true,
            enableRowHeaderSelection: true,
            selectionRowHeaderWidth: 35,
            rowHeight: 35,
            exporterMenuCsv: true,
            enableGridMenu: true,
            gridMenuTitleFilter: fakeI18n,
            rowTemplate: rowTemplate(),
            columnDefs: [
                {name: 'id', visible: false},
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

                // interval of zero just to allow the directive to have initialized
                $interval(function () {
                    gridApi1.core.addToGridMenu(gridApi1.grid, [{title: 'Dynamic item', order: 100}]);
                }, 0, 1);

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
                '  <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
                '</div>';
        }

        $scope.rowDblClick = function (row) {

            $mdDialog.show({
                clickOutsideToClose: true,
                templateUrl: 'user/edit/commerce/OrderDetailsView.html',
                controller: function DialogController($scope, $mdDialog) {
                    $scope.oderData = row;
                    $scope.closeDialog = function () {
                        $mdDialog.hide();
                    }
                }
            });

        };


        $scope.gridOptions2 = {
            enableRowHeaderSelection: false,
            exporterMenuCsv: true,
            enableGridMenu: true,
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

            if (!storeSettings){
                toastr.error(' warning', "Please fill all the fields", {closeButton: true});
            }else if (!storeSettings.orderNumber|| !storeSettings.address ||
                !storeSettings.searchEngineDesc) {
                toastr.error(' warning', "Please fill all the fields", {closeButton: true});
            }else if (!storeSettings.currency){
                toastr.error(' warning', "Please select a currency", {closeButton: true});
            }
            else {

                for (var i = 0; i < $scope.currencyList.length; i++) {
                    if ($scope.storeSettings.currency == $scope.currencyList[i].sign) {
                        $scope.options = $scope.currencyList[i];
                    }
                }

                var openHoursData = {
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
                    toastr.success('Successfully Added', {
                        closeButton: true
                    });
                    $scope.selectedTab = current;
                }).error(function (err) {
                    toastr.error(' warning', "Unable to get templates", {closeButton: true});
                })
                $scope.selectedTab = current;
            }
        };

        $scope.addAboutUs = function (current,storeSettings) {
            if (storeSettings!=null){
                if (!storeSettings.header  || !storeSettings.content) {
                    toastr.error(' warning', "Please fill all the fields", {closeButton: true});
                }else{

                    storeSettings.appId = $rootScope.appId;
                    commerceService.saveStoreSettings(storeSettings)
                        .success(function (data, status, headers, config) {
                            toastr.success('Successfully save About Us Data ..... !', 'Awsome!', {
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

            if (!storeSettings.returnPolicy|| !storeSettings.termsAndCondition|| !storeSettings.privacyPolicy) {
                toastr.error(' warning', "Please fill all the fields", {closeButton: true});
            }
            else {
                storeSettings.userId = $scope.userId;
                storeSettings.appId = $rootScope.appId;
                commerceService.savePolicies(storeSettings).success(function (data) {
                    toastr.success(' Store Settings has been added.!', {
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
            email.appId = $rootScope.appId;
            console.log(email);
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

                }).error(function (err) {
                toastr.error('Unable to Create', 'Warning', {
                    closeButton: true
                });
            })

        };
        $scope.updateHeaderFooterSettings = function (picFileHeader, picFileFooter, email, type) {
            email.appId = $rootScope.appId;
            console.log(email);
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

        };
        var prams = {
            appId: $rootScope.appId
        };

        commerceService.getEmailSettings(prams)
            .success(function (result) {
                $scope.email = result;
                console.log(result);
            }).error(function (error) {
            alert("MainMenu Loading Error : " + error);
        });
        $scope.testEmail = function (type) {
            console.log('d');
            var sendType = {
                type: type
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
                    console.log('ss');
                    toastr.error('Save before test the Email ', 'Warning', {
                        closeButton: true
                    });

                } else if ((type == "Order Fulfilled") && (typeof $scope.email[0].orderFulfilledEmail === 'undefined')) {

                    toastr.error('Save before test the Email', 'Warning', {
                        closeButton: true
                    });

                } else if ((type == "Order Refund") && (typeof $scope.email[0].orderRefundEmail === 'undefined')) {
                    console.log('saas');
                    toastr.error('Save before test the Email ', 'Warning', {
                        closeButton: true
                    });

                } else {
                    commerceService.sendTestEmail(sendType)
                        .success(function (data) {
                            toastr.success('Test Email has been Sent ', 'Success', {
                                closeButton: true
                            });

                        }).error(function (err) {
                        toastr.error('Unable to Send', 'Warning', {
                            closeButton: true
                        });
                    })
                }
            }
                }).error(function (error) {
                alert("MainMenu Loading Error : " + error);
            });

        };

        $scope.refunded = function () {
            $scope.selectedRow = $scope.gridApi1.selection.getSelectedRows();
            for (var i = 0; i < $scope.selectedRow.length; i++) {
                $scope.selectedRow[i].paymentStatus = "refunded";
                $scope.refund.push($scope.selectedRow[i]);
                $scope.unfulfilled.splice($scope.unfulfilled.indexOf($scope.selectedRow[i]), 1);
            }
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
        };
        $scope.fulfilled = function () {
            $scope.row = $scope.gridApi1.selection.getSelectedRows();
            for (var i = 0; i < $scope.row.length; i++) {
                $scope.row[i].paymentStatus = "successful";
                $scope.fulfill.push($scope.row[i]);
                $scope.unfulfilled.splice($scope.unfulfilled.indexOf($scope.row[i]), 1);
            }
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
        };
    }
})();
