(function() {
    'use strict';
    angular.module("appEdit").controller("CommerceCtrl", [
        '$scope', '$mdDialog', 'toastr','commerceService','currencyService','publishService','$rootScope','SERVER_URL','$auth','ME_APP_SERVER', '$interval', '$q',
        CommerceCtrl]);

    function CommerceCtrl($scope, $mdDialog,toastr, commerceService,currencyService,publishService,$rootScope,SERVER_URL,$auth,ME_APP_SERVER,$interval,$q) {

        $scope.refund =[];
        $scope.unfulfilled =[];
        $scope.fulfill =[];

        var fakeI18n = function( title ){
            var deferred = $q.defer();
            $interval( function() {
                deferred.resolve( 'col: ' + title );
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
            columnDefs: [
                { name: 'createdDate' },
                { name: 'customerName', enableHiding: false },
                { name: 'paymentStatus' },
                { name: 'fulfillmentStatus' }
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
            onRegisterApi: function( gridApi1 ){
                $scope.gridApi1 = gridApi1;

                // interval of zero just to allow the directive to have initialized
                $interval( function() {
                    gridApi1.core.addToGridMenu( gridApi1.grid, [{ title: 'Dynamic item', order: 100}]);
                }, 0, 1);

                gridApi1.core.on.columnVisibilityChanged( $scope, function( changedColumn ){
                    $scope.columnChanged = { name: changedColumn.colDef.name, visible: changedColumn.colDef.visible };
                });
                 gridApi1.selection.on.rowSelectionChanged($scope,function(row){
                 });

                 gridApi1.selection.on.rowSelectionChangedBatch($scope,function(rows){
                 });
            }
        };
         $scope.gridOptions2 = {
             enableRowHeaderSelection: false,
             exporterMenuCsv: true,
             enableGridMenu: true,
             gridMenuTitleFilter: fakeI18n,
             columnDefs: [
                 { name: 'createdDate' },
                 { name: 'customerName', enableHiding: false },
                 { name: 'paymentStatus' },
                 { name: 'fulfillmentStatus' }
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
             onRegisterApi: function( gridsApi2 ){
                 $scope.gridsApi2 = gridsApi2;

                 // interval of zero just to allow the directive to have initialized
                 $interval( function() {
                     gridsApi2.core.addToGridMenu( gridsApi2.grid, [{ title: 'Dynamic item', order: 100}]);
                 }, 0, 1);

                 gridsApi2.core.on.columnVisibilityChanged( $scope, function( changedColumn ){
                     $scope.columnChanged = { name: changedColumn.colDef.name, visible: changedColumn.colDef.visible };
                 });
             }
         };

         $scope.gridOptions3 = {
             enableRowHeaderSelection: false,
             exporterMenuCsv: true,
             enableGridMenu: true,
             gridMenuTitleFilter: fakeI18n,
             columnDefs: [
                 { name: 'createdDate' },
                 { name: 'customerName', enableHiding: false },
                 { name: 'paymentStatus' },
                 { name: 'fulfillmentStatus' }
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
             onRegisterApi: function( gridsApi3 ){
                 $scope.gridsApi3 = gridsApi3;

                 // interval of zero just to allow the directive to have initialized
                 $interval( function() {
                     gridsApi3.core.addToGridMenu( gridsApi3.grid, [{ title: 'Dynamic item', order: 100}]);
                 }, 0, 1);

                 gridsApi3.core.on.columnVisibilityChanged( $scope, function( changedColumn ){
                     $scope.columnChanged = { name: changedColumn.colDef.name, visible: changedColumn.colDef.visible };
                 });
             }
         };

         $scope.gridOptions4 = {
             enableRowHeaderSelection: false,
             exporterMenuCsv: true,
             enableGridMenu: true,
             gridMenuTitleFilter: fakeI18n,
             columnDefs: [
                 { name: 'createdDate' },
                 { name: 'customerName', enableHiding: false },
                 { name: 'paymentStatus' },
                 { name: 'fulfillmentStatus' }
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
             onRegisterApi: function( gridsApi4 ){
                 $scope.gridsApi4 = gridsApi4;

                 // interval of zero just to allow the directive to have initialized
                 $interval( function() {
                     gridsApi4.core.addToGridMenu( gridsApi4.grid, [{ title: 'Dynamic item', order: 100}]);
                 }, 0, 1);

                 gridsApi4.core.on.columnVisibilityChanged( $scope, function( changedColumn ){
                     $scope.columnChanged = { name: changedColumn.colDef.name, visible: changedColumn.colDef.visible };
                 });
             }
         };

         $scope.gridOptions1.multiSelect = true;

        $scope.myData = [
            {date: new Date(), customer: "Riki",payment_status :"pending",fulfillment_status:"close"},
            {date: new Date(), customer: "jon",payment_status :"pending",fulfillment_status:"close"},
            {date: new Date(), customer: "kal",payment_status :"pending",fulfillment_status:"close"}

        ];

        $scope.selectedTab = 0;
        $scope.currentPage = 2;
        $scope.pageSize = 5;
        $scope.statusList =[
        {status : "Closed"},{status : "Open"}
        ];
        $scope.data ={ status : "Closed"};
        $scope.statusPlaceHolder = "Closed";
        $scope.currencyPlaceHolder = "USD";
        $scope.measurementStandardsPlaceHolder = "Metric";
        $scope.siteTypesPlaceHolder = "Ecommerce";
        $scope.languagesPlaceHolder = "English (United Kingdom)";
        $scope.timeAndRegionsPlaceHolder = "(UTC-12:00) International Date Line West";
        $scope.openHours = [
        {day:'Sunday'},
        {day:'Monday'},
        {day:'Tuesday'},
        {day:'Wednesday'},
        {day:'Thursday'},
        {day:'Friday'},
        {day:'Saturday'}];
        $scope.miniLightBoxShow = false;
        $scope.shippingOptionParams = {
              secondLocked:  true,
              thirdLocked:  true,
              countrySelectionLocked: true
        };
        $scope.userId=$auth.getPayload().id;
        $scope.appId=$rootScope.appId;
        $scope.SERVER_URL = SERVER_URL;
        $scope.imageURL = SERVER_URL+
            "edit/viewImages?userId="+$scope.userId
            +"&appId="+$scope.appId+"&"
            +new Date().getTime();

        $scope.thumbPic = ME_APP_SERVER+'temp/' +$auth.getPayload().id+'/templates/'+$rootScope.appId+'/img/default.jpg';
        $scope.categoryIdList={};

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
                    for(var i=0 ;i<$scope.products.length ;i++){
                        $scope.categoryIdList[i]=$scope.products[i].categoryId ;
                    }
                }).error(function (error) {
                    alert("Category Loading Error : " + error);
                })

        }
         if (typeof $scope.ordersList === 'undefined') {
                    commerceService.getOrderList()
                        .success(function (result) {
                            for(var i=0; i<result.length; i++){
                                var date = new Date(result[i].createdAt);
                                $scope.displayDate = date.toLocaleString();
                                $scope.year = date.getFullYear();
                                $scope.month = date.getMonth()+1;
                                $scope.date = date.getDate();
                                result[i].createdDate = $scope.year+"-"+$scope.month+"-"+$scope.date;
                            }
                            $scope.ordersList = result;
                            for(var i=0; i<$scope.ordersList.length; i++){
                                if($scope.ordersList[i].paymentStatus == "refunded"){
                                $scope.refund.push($scope.ordersList[i]);
                                }
                                else if($scope.ordersList[i].paymentStatus == "Pending"){
                                $scope.unfulfilled.push($scope.ordersList[i]);
                                }
                                else if($scope.ordersList[i].paymentStatus == "successful"){
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

        $scope.insertFlatRates = function (flatRates) {

            flatRates.appId = $rootScope.appId;
            console.log(flatRates);
            commerceService.insertFlatRateData(flatRates)
                .success(function (result) {
                    toastr.success('Successfully Saved ', 'Saved', {
                        closeButton: true
                    });
                }).error(function (error) {
                toastr.error('Loading Error', 'Warning', {
                    closeButton: true
                });
            })


        };

        $scope.deleteCategory=function($index){
            var prams={
                categoryID : $scope.categories[$index].id,
                appId : $rootScope.appId,
                imageUrl : $scope.categories[$index].imageUrl
            };
            commerceService.checkCategory(prams)
                .success(function(data) {
                    if(data.message == 'Yes'){
                        //alert("Product Exist");
                        toastr.error('Product Exist', 'Warning', {
                            closeButton: true
                        });
                    }else{
                        $scope.categories.splice($index, 1);
                        commerceService.deleteCategoryData( prams)
                            .success(function() {
                                toastr.success('Second Navigation has been Deleted ', 'Deleted', {
                                    closeButton: true
                                });
                            }).error(function(err) {
                                toastr.error('Unable to Delete', 'Warning', {
                                    closeButton: true
                                });
                            })
                    }
                }).error(function(err) {
                    toastr.error('Unable to Updated', 'Warning', {
                        closeButton: true
                    });
                })
        };

         publishService.getAllLanguages().
                   success(function(data){
                       $scope.languageList = data;
                   }).error(function(err){
                       alert("MainMenu Loading Error : " + err);
                   });

         currencyService.getAllCurrency().
                   success(function(data){
                       $scope.currencyList = data;
                   }).error(function(err){
                       alert("MainMenu Loading Error : " + err);
                   });
         commerceService.getAllSiteType().
            success(function(data){
                $scope.siteTypeList = data;
            }).error(function(err){
                alert("MainMenu Loading Error : " + err);
         });
         commerceService.getAllMeasurementType().
                   success(function(data){
                       $scope.measurementTypeList = data;
                   }).error(function(err){
                       alert("MainMenu Loading Error : " + err);
         });
         commerceService.getAllTimeAndRegion().
                   success(function(data){
                       $scope.timeAndRegionList = data;
                   }).error(function(err){
                       alert("MainMenu Loading Error : " + err);
         });

         $scope.saveStoreSettings = function(current,storeSettings,openHours){
         if(storeSettings.orderNumber == null || storeSettings.address == null ||
         storeSettings.searchEngineDesc == null){
            toastr.error(' warning',"Please fill all the fields", {closeButton: true});
         }
         else{

         for(var i=0; i<$scope.currencyList.length; i++){
             if($scope.storeSettings.currency == $scope.currencyList[i].sign){
                 $scope.options = $scope.currencyList[i];
             }
         }
         for(var i=0; i<openHours.length; i++){
            openHours[i].status = openHours[i].status;
         }
         storeSettings.currencySign=$scope.options.sign,
         storeSettings.currency=$scope.options.currency,
         storeSettings.userId = $scope.userId;
         storeSettings.appId = $rootScope.appId;
         storeSettings.OpenHours = openHours;

          var reqParams={
              currencySign:$scope.options.sign,
              currency:$scope.options.currency,
              appId: $rootScope.appId
          };
          currencyService.setCurrency(reqParams).
          success(function(data) {
          }).error(function(err) {
                  toastr.error(' warning',"Unable to get templates", {closeButton: true});
          });

         commerceService.saveStoreSettings(storeSettings).
            success(function(data){
             toastr.success(' Store Settings has been added.!', {
                    closeButton: true
                });
                $scope.selectedTab = current;
            }).error(function(err){
                toastr.error(' warning',"Unable to get templates", {closeButton: true});
            })
            $scope.selectedTab = current;
            }
         };

            commerceService.showStoreSettings($rootScope.appId).
            success(function(data){
                $scope.storeSettings = data[0];
                $scope.storeSettings.currency = data[0].currencySign;
                for(var i=0; i<data[0].OpenHours.length; i++){
                    var open = new Date(data[0].OpenHours[i].open);
                    var close = new Date(data[0].OpenHours[i].close);
                    data[0].OpenHours[i].open = open;
                    data[0].OpenHours[i].close = close;
                }
                $scope.openHours = data[0].OpenHours;
            }).error(function(err){
                toastr.error(' warning',"Unable to get Store Settings", {closeButton: true});
            });

        $scope.savePolicies = function(current,policies){
                 if(policies.returnPolicy == null || policies.termsAndCondition == null || policies.privacyPolicy == null){
                    toastr.error(' warning',"Please fill all the fields", {closeButton: true});
                 }
                 else{
                    policies.userId = $scope.userId;
                    policies.appId = $rootScope.appId;
                    commerceService.savePolicies(policies).
                    success(function(data){
                    toastr.success(' Store Settings has been added.!', {
                        closeButton: true
                    });
                     $scope.selectedTab = current;
                    }).error(function(err){
                        toastr.error(' warning',"Unable to get Store Settings", {closeButton: true});
                    })
                 }
        };

        commerceService.showPolicies($scope.appId).
            success(function(data){
                $scope.policies = data[0];
            }).error(function(err){
                toastr.error(' warning',"Unable to get Store Settings", {closeButton: true});
            })


        $scope.editCat=function(imageUrl,$id){
           return commerceService.showCommerceImageEditDialog(imageUrl,$id);
        };
        $scope.catListChange=function($index){
           $scope.products[$index].categoryId=$scope.categoryIdList[$index];
        };

        $scope.moveToFlatRateOption=function(){
            $scope.shippingOptionParams = {
                  secondLocked:  false,
                  thirdLocked:  true,
                  countrySelectionLocked: false
            };
            $scope.selectedTab = 1;
        };

        $scope.moveToWeightBasedOption=function(){
            $scope.shippingOptionParams = {
                  secondLocked:  true,
                  thirdLocked:  false,
                  countrySelectionLocked: false
            };
            $scope.selectedTab = 2;
        };

        $scope.nextStep = function(current) {
            $scope.selectedTab = current;
        };

        $scope.openMiniLightBox = function(){
            $scope.miniLightBoxShow = true;
        };

        $scope.closeMiniLightBox = function(){
            $scope.miniLightBoxShow = false;
        };

        $scope.addShippingOption=function(){
            return commerceService.showAddShippingOptionDialog();
        };

        $scope.addTaxOption=function(){
            return commerceService.showAddTaxOptionDialog();
        };

        $scope.addNewUser=function(){
            return commerceService.showAddNewUserDialog();
        };


        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function() {
            $mdDialog.hide();
        };

        $scope.saveEmailDeliInfo = function (email,type) {

            email.appId = $rootScope.appId;
            console.log(email);
            commerceService.saveEmailDeliInfo( email)
                .success(function(data) {
                    console.log(data);
                    if(type == "next"){
                        var index = ($scope.selectedIndex == $scope.max) ? 0 : $scope.selectedIndex + 1;
                        $scope.selectedIndex = index;
                    }
                    toastr.success('Email Settings has been changed ', 'Success', {
                        closeButton: true
                    });

                }).error(function(err) {
                toastr.error('Unable to Create', 'Warning', {
                    closeButton: true
                });
            })

        };
        $scope.nextStep1 = function() {

        };
        $scope.updateEmailSettings = function (email,type) {
            email.appId = $rootScope.appId;
            console.log(email);
            commerceService.updateEmailSettings(email)
                .success(function (data) {
                    console.log(data);
                    if(type == "next"){
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
        $scope.testEmail = function(type){
            var sendType = {
                type:type
            }
            sendType.appId = $rootScope.appId;
            commerceService.sendTestEmail(sendType)
                .success(function (data) {
                    console.log(data + 'asds');
                    toastr.success('Test Email has been Sent ', 'Success', {
                        closeButton: true
                    });

                }).error(function (err) {
                toastr.error('Unable to Send', 'Warning', {
                    closeButton: true
                });
            })

        };

        $scope.refunded = function(){
            $scope.selectedRow = $scope.gridApi1.selection.getSelectedRows();
            for(var i=0; i<$scope.selectedRow.length; i++){
                $scope.selectedRow[i].paymentStatus = "refunded";
                $scope.refund.push($scope.selectedRow[i]);
                $scope.unfulfilled.splice($scope.unfulfilled.indexOf($scope.selectedRow[i]),1);
            }
            $scope.gridOptions3.data = $scope.unfulfilled;
            commerceService.updateOrders($scope.selectedRow)
                .success(function(data){
                    toastr.success('Status changed to refunded ', 'Success', {
                        closeButton: true
                    });
                })
                .error(function(err){
                    toastr.error('could not change the status', 'Warning', {
                        closeButton: true
                    });
                })
        };
        $scope.fulfilled = function(){
            $scope.row = $scope.gridApi1.selection.getSelectedRows();
            for(var i=0; i<$scope.row.length; i++){
                $scope.row[i].paymentStatus = "successful";
                $scope.fulfill.push($scope.row[i]);
                $scope.unfulfilled.splice($scope.unfulfilled.indexOf($scope.row[i]),1);
            }
            $scope.gridOptions3.data = $scope.unfulfilled;
            commerceService.updateOrders($scope.row)
                .success(function(data){
                   toastr.success('Status changed to fulfilled ', 'Success', {
                       closeButton: true
                   });
                })
                .error(function(err){
                    toastr.error('could not change the status', 'Warning', {
                        closeButton: true
                    });
                })
        }

        //commerceService.getEmailSettings()
        //    .success(function (result) {
        //        $scope.email = result;
        //    }).error(function (error) {
        //    alert("MainMenu Loading Error : " + error);
        //});


    }
})();
