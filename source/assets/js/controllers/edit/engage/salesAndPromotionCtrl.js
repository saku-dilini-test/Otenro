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
        $scope.selectedProduct = null;
        $scope.allVariants = [];
        $scope.allProds = [];
        $scope.availableProducts = [];
        $scope.backupArray = [];
        $scope.imageURL = SERVER_URL +
            "templates/viewWebImages?userId=" + $auth.getPayload().id
            + "&appId=" + $rootScope.appId + '&'
            + new Date().getTime()+"&images=thirdNavi";
        $scope.addNewSalesAndPromotions=function(){
            return salesAndPromotionService.showPromotionsAndSalesAddNewDialog();
        };

        if (typeof $scope.salesAndPromotionList === 'undefined') {
            salesAndPromotionService.getListOfSalesAndPromotions($rootScope.appId)
                .success(function (data) {
                    $scope.salesAndPromotionList = data;
                    // console.log(data);
                        if(data){
                            $scope.salesAndPromotionList.forEach(function(data){
                                if(data.salesAndPromotionType !=  'storeWide'){
                                    data.selectedProduct.forEach(function(ele){
                                        $scope.allVariants.push(ele);
                                    });
                                }
                            });
                        }

                }).error(function (error) {
                    toastr.error('Sales And Promotion Adding Error', 'Message', {
                        closeButton: true
                    });
                });
        }

        $scope.navigatePromoType = function(tab){
            $scope.selectedTab = tab;
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

                    // console.log($scope.productsList)

                    $scope.productsList.forEach(function(prod){
                        prod.variants.forEach(function(variant){
                            if(!variant.imageUrl){
                                variant['imageUrl'] = prod.imageUrl;

                            }
                            variant['id'] = prod.id;
                           $scope.allProds.push(variant);
                        });
                    });
                    // console.log($scope.allProds)
                    // console.log("inside Item main");
                    // console.log($scope.item);
                        if($scope.item && $scope.item.salesAndPromotionType == 'singleProduct' ){
                        // console.log("selected prods");
                        // console.log($scope.item.selectedProduct);
                          $scope.array = [];
                            $scope.availableProducts = $scope.item.selectedProduct;

                            // $scope.singleProduct.name = item.name;
                            $scope.singleProduct.discount = item.discount;
                            $scope.singleProduct.discountPercent = item.discountPercent;
                            $scope.singleProduct.discountType = item.discountType;
                            $scope.singleProduct.promoCode = item.promoCode;
                            $scope.singleProduct.dateFrom = new Date (item.dateFrom);
                            $scope.singleProduct.dateTo = new Date (item.dateTo);
                            $scope.singleProduct.isRedeemableAtCheckout =item.isRedeemableAtCheckout;

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

                        }else if($scope.item && $scope.item.salesAndPromotionType == 'storeWide'){
                            $scope.storeWide = item;
                        }else{
                            $scope.array = [];
                        }

                        if($scope.productsList){



                                    if(item){

                                    if(item.salesAndPromotionType == "singleProduct"){
                                        $scope.selectedTab = 4;
                                    }else if(item.salesAndPromotionType == "storeWide"){
                                        $scope.selectedTab = 1;
                                    }

                                 if( $scope.item.salesAndPromotionType != 'storeWide'){
                                      $scope.item.selectedProduct.forEach(function(ele){
                                         $scope.array.push(ele);
                                     });
                                      // console.log($scope.array)
                                 }

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
                                 // console.log('selected prods')
                                 // console.log($scope.array)

                                    }else{

                                        $scope.productsList.forEach(function(prod){
                                            prod.variants.forEach(function(variant){

                                                if($scope.salesAndPromotionList){

                                                    $scope.salesAndPromotionList.forEach(function(data){
                                                        if(data.salesAndPromotionType !=  'storeWide') {
                                                            data.selectedProduct.forEach(function (ele) {
                                                                $scope.availableProducts.push(ele);
                                                            });
                                                        }
                                                    });

                                                    $scope.found = false;
                                                    $scope.availableProducts.forEach(function(selectedProduct){
                                                        if(selectedProduct.sku == variant.sku){
                                                            $scope.found = true;
                                                        }
                                                    });

                                                    if($scope.found == false){
                                                        $scope.array.push(variant);
                                                        $scope.backupArray.push(variant);

                                                    }

                                                }else{
                                                    $scope.array.push(variant);
                                                    $scope.backupArray.push(variant);
                                                }
                                            });
                                        });
                                        // console.log($scope.array)

                                    }

                        }

                        $scope.selected = [];
                          $scope.IsSingleSelection = false;


                          $scope.toggle = function (item, list) {
                              $scope.selectedProduct = item;
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
                    // console.log("available prods");
                    // console.log(item.selectedProduct);
                        if(item.salesAndPromotionType !=  'storeWide') {
                            item.selectedProduct.forEach(function (element) {
                                $scope.exists(element, $scope.selected);
                                $scope.toggle(element, $scope.selected);

                            });
                        }
                    }

                }).error(function (error) {
                toastr.error('Loading Error', 'Warning', {
                    closeButton: true
                });
            })
        }

     

        $scope.saveSalesAndPromotion =function(salesAndPromotion,type,selected){
            var price,index;
            var currentDate = new Date();
            var variantSelection = "\n";
            var fromDate = new Date(salesAndPromotion.dateFrom);
            var toDate = new Date(salesAndPromotion.dateTo);

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
//            salesAndPromotion.dateTo = new Date(salesAndPromotion.dateTo);
//            salesAndPromotion.dateFrom = new Date(salesAndPromotion.dateFrom);
            if(salesAndPromotion.salesAndPromotionType == 'singleProduct'){
                if(salesAndPromotion.selectedProduct && salesAndPromotion.selectedProduct.length > 0){

                    price = salesAndPromotion.selectedProduct[0].price;

                    salesAndPromotion.selectedProduct.forEach(function(ele,idx){

                        if(ele.price <= price){
                            price = parseFloat(ele.price);
                            index = idx;
                        }

                    });

                    salesAndPromotion.selectedProduct[index].selection.forEach(function(ele){
                        variantSelection += ele.name + "-" + ele.vType + "\n";
                    });

                }

                if(salesAndPromotion.selectedProduct.length === undefined || salesAndPromotion.selectedProduct.length == 0){
                    return toastr.warning('Please select a product ', 'Warning', {
                        closeButton: true
                    });

                }
                if(toDate < fromDate){

                    toastr.warning('Invalid date range', 'Warning', {
                        closeButton: true
                    });
                    return ;
                }
                if (fromDate < currentDate) {

                    toastr.warning('Past date and time are not allowed. Please select valid date and time.', 'Warning', {
                        closeButton: true
                    });
                    return ;
                }
                if(salesAndPromotion.discountType == "discountValue" && salesAndPromotion.discount > price){
                    
                    toastr.warning('Invalid discount value for \n\n' + salesAndPromotion.selectedProduct[index].name + variantSelection, 'Warning', {
                        closeButton: true
                    });

                }else{
                    createSalesAndPromo();
                }
            }else if(salesAndPromotion.salesAndPromotionType == 'storeWide'){

                if(!$scope.storeWide.discountType){
                    return toastr.warning('Please select a discount type ', 'Warning', {
                        closeButton: true
                    });
                }else if(!$scope.storeWide.dateFrom || !$scope.storeWide.dateTo){
                    return toastr.warning('Please select a date range', 'Warning', {
                        closeButton: true
                    });
                }else if($scope.storeWide.dateFrom >= $scope.storeWide.dateTo){
                    return toastr.warning('Please select valid date range', 'Warning', {
                        closeButton: true
                    });
                } else if (fromDate < currentDate) {

                    toastr.warning('Past date and time are not allowed. Please select valid date and time.', 'Warning', {
                        closeButton: true
                    });
                    return ;
                } else{
                    createSalesAndPromo();
                }
            }



             function createSalesAndPromo(){
                salesAndPromotion.appId = $rootScope.appId;
                // console.log("sales promo");
                // console.log(salesAndPromotion);
                salesAndPromotionService.saveSalesAndPromotion(salesAndPromotion)
                    .success(function (data) {
                        toastr.success('Sales And Promotion Data successfully Added ', 'Message', {
                            closeButton: true
                        });

                        $mdDialog.hide();

                        salesAndPromotionService.showPromotionsAndSalesDialog();

                    }).error(function (error) {
                        if(error == 'Conflict'){
                            toastr.error('Entered promo code already exists. Please try again with a different promo code', 'Error', {
                                closeButton: true
                            });
                        }else{
                            toastr.error('Sales And Promotion Adding Error', 'Message', {
                                closeButton: true
                            });
                        }

                    });
            }

        }

        $scope.editShippingInfo = function(item){

            salesAndPromotionService.showPromotionsAndSalesUpdateDialog(item);

        }

        $scope.deleteShippingInfo = function(idx,item){
            salesAndPromotionService.deleteSalesAndPromotions(item);
        }

        $scope.cancel = function(from){
            if(from === 'manage view'){
                $mdDialog.hide();
            }else{
                salesAndPromotionService.showPromotionsAndSalesDialog();
            }
        }

        $scope.genaratePromoCode = function (promoType) {

            var randomString = Math.random().toString(36).substr(2, 8);

            if(promoType == 'storewide'){
                $scope.storeWide.promoCode = randomString;
            }else if(promoType == 'singleproduct'){
                $scope.singleProduct.promoCode = randomString;
            }
        };
        
        $scope.toggleReedeem = function (redeemable) {
            console.log($scope.allProds);
            console.log(redeemable);
            if(redeemable == true){
                $scope.array = $scope.allProds;
                console.log( $scope.array )
            }else{
                $scope.array =  $scope.backupArray;
                console.log( $scope.array )

            }
        };
        


    }
})();