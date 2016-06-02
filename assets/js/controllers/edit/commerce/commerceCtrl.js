(function() {
    'use strict';
    angular.module("appEdit").controller("CommerceCtrl", [
        '$scope', '$mdDialog', 'toastr','commerceService','currencyService','publishService','$rootScope','SERVER_URL','$auth','ME_APP_SERVER',
        CommerceCtrl]);

    function CommerceCtrl($scope, $mdDialog,toastr, commerceService,currencyService,publishService,$rootScope,SERVER_URL,$auth,ME_APP_SERVER) {
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

        //commerceService.getEmailSettings()
        //    .success(function (result) {
        //        $scope.email = result;
        //    }).error(function (error) {
        //    alert("MainMenu Loading Error : " + error);
        //});


    }
})();
