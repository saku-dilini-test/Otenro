/**
 * Created by prasanna on 12/23/16.
 */
(function() {
    'use strict';
    angular.module("appEdit").controller("SalesAndPromotionCtrl", ['$scope', '$mdDialog', '$rootScope',
                            '$auth', 'toastr', 'salesAndPromotionService', '$http', 'SERVER_URL',
        'commerceService','item','$filter', SalesAndPromotionCtrl]);

    function SalesAndPromotionCtrl($scope, $mdDialog, $rootScope, $auth, toastr,
           salesAndPromotionService, $http, SERVER_URL,commerceService,item,$filter) {

       $scope.item = item;
       $scope.selectedProduct = {};
       $scope.allVariants = [];
       $scope.allProds = [];
   $scope.availableProducts = [];

        $scope.addNewSalesAndPromotions=function(){
            return salesAndPromotionService.showPromotionsAndSalesAddNewDialog();
        };

        if (typeof $scope.salesAndPromotionList === 'undefined') {
            salesAndPromotionService.getListOfSalesAndPromotions($rootScope.appId)
                .success(function (data) {
                    $scope.salesAndPromotionList = data;
                    $scope.salesAndPromotionList.forEach(function(data){
                        data.selectedProduct.forEach(function(ele){
                            $scope.allVariants.push(ele);
                        });
                    });
                    console.log(data);
                }).error(function (error) {
                toastr.error('Sales And Promotion Adding Error', 'Message', {
                    closeButton: true
                });
            })

        }

        if (typeof $scope.categories === 'undefined') {
            commerceService.getCategoryList()
                .success(function (result) {
                    $scope.categories = result;
                }).error(function (error) {
                toastr.error('Loading Error', 'Warning', {
                    closeButton: true
                });
            })
        }

        $scope.array = [];

        if (typeof $scope.productsList === 'undefined'){
            commerceService.getProductList()
                .success(function (result) {
                    $scope.productsList = result;

                    $scope.productsList.forEach(function(prod){
                        prod.variants.forEach(function(variant){
                           $scope.allProds.push(variant);
                        });
                    });

                        if($scope.item){
                        console.log("inside Item main");
                        console.log($scope.item);
                        console.log("selected prods");
                        console.log($scope.item.selectedProduct);
                          $scope.array = [];
                            $scope.availableProducts = $scope.item.selectedProduct;

                            $scope.singleProduct.name = item.name;
                            $scope.singleProduct.discount = item.discount;
                            $scope.singleProduct.discountPercent = item.discountPercent;
                            $scope.singleProduct.discountType = item.discountType;
                            $scope.singleProduct.promoCode = item.promoCode;
                            $scope.singleProduct.dateFrom = new Date (item.dateFrom);
                            $scope.singleProduct.dateTo = new Date (item.dateTo);

                            if(item.id){
                                $scope.singleProduct.id = item.id;
                                $scope.singleProduct.appId = item.appId;

                            }
                            if(item.isLimitNumberOfTime){
                                $scope.singleProduct.isLimitNumberOfTime = item.isLimitNumberOfTime;
                                $scope.singleProduct.limitNumberOfTime = item.limitNumberOfTime;
                            }
                            if(item.isTermsAndCondition){
                                $scope.singleProduct.isTermsAndCondition = item.isTermsAndCondition;
                                $scope.singleProduct.termsAndCondition = item.termsAndCondition;
                            }
                            if(item.limitUsers){
                                $scope.singleProduct.isLimitUsers = item.isLimitUsers;
                                $scope.singleProduct.limitUsers = item.limitUsers;
                            }

                        }else{
                            $scope.array = [];
                        }

                        if($scope.productsList){



                                    if(item){

                                    if(item.salesAndPromotionType == "singleProduct"){
                                        $scope.selectedTab = 5;
                                    }

                                 $scope.item.selectedProduct.forEach(function(ele){
                                    $scope.array.push(ele);
                                 });

                                    $scope.allProds.forEach(function(prod){
                                     var found = false;
                                        $scope.allVariants.forEach(function(vari){
                                            if(prod.sku == vari.sku){
                                                found = true;
                                            }
                                        });
                                        if(found == false){
                                            $scope.array.push(prod);
                                        }
                                    });

                                    }else{

                                        $scope.productsList.forEach(function(prod){
                                            prod.variants.forEach(function(variant){

                                                if($scope.salesAndPromotionList){

                                                $scope.salesAndPromotionList.forEach(function(data){
                                                    data.selectedProduct.forEach(function(ele){
                                                        $scope.availableProducts.push(ele);
                                                    });
                                                });

                                                    $scope.found = false;
                                                    $scope.availableProducts.forEach(function(selectedProduct){
                                                        if(selectedProduct.sku == variant.sku){
                                                            $scope.found = true;
                                                        }
                                                    });

                                                    if($scope.found == false){
                                                        $scope.array.push(variant);
                                                    }
                                                }else{
                                                    $scope.array.push(variant);
                                                }
                                            });
                                        });

                                    }

                        }

                        $scope.selected = [];
                          $scope.IsSingleSelection = false;


                          $scope.toggle = function (item, list) {
                              var idx = list.indexOf(item);
                              if (idx > -1) {
                                list.splice(idx, 1);
                              }
                              else {
                                list.push(item);
                                $scope.IsSingleSelection = true;
                              }
                           };

                          $scope.exists = function (item, list) {
                              for(var i=0; i< list.length; i++)
                              {
                                  if(list[i].sku == item.sku)
                                  {
                                      return true;
                                  }
                              }
                              return false;
                          };


                          //select all country
                           $scope.isIndeterminate = function() {
                              return ($scope.selected.length !== 0 &&
                                  $scope.selected.length !== $scope.array.length);
                            };

                            $scope.isChecked = function() {
                              return $scope.selected.length === $scope.array.length;
                            };

                            $scope.toggleAll = function() {
                                $scope.IsSingleSelection = false;
                              if ($scope.selected.length === $scope.array.length) {
                                $scope.selected = [];
                              } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
                                $scope.selected = $scope.array.slice(0);
                              }
                            };

                    if (item){
                    console.log("available prods");
                    console.log(item.selectedProduct);
                        item.selectedProduct.forEach(function(element) {
                            $scope.exists(element , $scope.selected);
                            $scope.toggle(element , $scope.selected);

                        });
                    }

                }).error(function (error) {
                toastr.error('Loading Error', 'Warning', {
                    closeButton: true
                });
            })
        }

     

        $scope.saveSalesAndPromotion =function(salesAndPromotion,type,selected){

            if (type =='storeWide'){
                salesAndPromotion.salesAndPromotionType = 'storeWide';
            }else if (type == 'minimumOrderValue'){
                salesAndPromotion.salesAndPromotionType = 'minimumOrderValue';
            }else if(type == 'categoryWide'){
                salesAndPromotion.salesAndPromotionType = 'categoryWide';
            }else {
                salesAndPromotion.salesAndPromotionType = 'singleProduct';
                salesAndPromotion.selectedProduct = selected;
            }


        if(salesAndPromotion.selectedProduct.length === undefined || salesAndPromotion.selectedProduct.length == 0){
            toastr.error('Please select a product ', 'Warning', {
                closeButton: true
            });
        }else{
            salesAndPromotion.appId = $rootScope.appId;
            console.log("sales promo");
            console.log(salesAndPromotion);
            salesAndPromotionService.saveSalesAndPromotion(salesAndPromotion)
                .success(function (data) {
                    toastr.success('Sales And Promotion Data successfully Added ', 'Message', {
                        closeButton: true
                    });

                    $mdDialog.hide();

                    salesAndPromotionService.showPromotionsAndSalesDialog();

                }).error(function (error) {
                toastr.error('Sales And Promotion Adding Error', 'Message', {
                    closeButton: true
                });
            })
        }

        }

        $scope.editShippingInfo = function(item){

            salesAndPromotionService.showPromotionsAndSalesUpdateDialog(item);

        }

        $scope.deleteShippingInfo = function(idx,item){
            salesAndPromotionService.deleteSalesAndPromotions(item);
        }

        $scope.cancel = function(){
            $mdDialog.hide();
        }

    }
})();