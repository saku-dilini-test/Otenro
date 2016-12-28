/**
 * Created by prasanna on 12/23/16.
 */
(function() {
    'use strict';
    angular.module("appEdit").controller("SalesAndPromotionCtrl", ['$scope', '$mdDialog', '$rootScope',
                            '$auth', 'toastr', 'salesAndPromotionService', '$http', 'SERVER_URL',
        'commerceService', SalesAndPromotionCtrl]);

    function SalesAndPromotionCtrl($scope, $mdDialog, $rootScope, $auth, toastr,
                                   salesAndPromotionService, $http, SERVER_URL,commerceService) {
       $scope.selectedProduct = {};
   

        $scope.addNewSalesAndPromotions=function(){
            return salesAndPromotionService.showPromotionsAndSalesAddNewDialog();
        };

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
        
        if (typeof $scope.productsList === 'undefined'){
            commerceService.getProductList()
                .success(function (result) {
                    $scope.productsList = result;

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
                        $scope.selectedProduct = list;
                    };

                    $scope.exists = function (item, list) {
                        return list.indexOf(item) > -1;
                    };


                    //select all products
                    $scope.isIndeterminate = function() {
                        return ($scope.selected.length !== 0 &&
                        $scope.selected.length !== $scope.productsList.length);
                    };

                    $scope.isChecked = function() {
                        return $scope.selected.length === $scope.productsList.length;
                    };

                    $scope.toggleAll = function() {
                        $scope.IsSingleSelection = false;
                        if ($scope.selected.length === $scope.productsList.length) {
                            $scope.selected = [];
                        } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
                            $scope.selected = $scope.productsList.slice(0);
                        }
                    };


                    if ($scope.product){
                        $scope.product.forEach(function(element) {
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








        $scope.saveSalesAndPromotion =function(salesAndPromotion,type){

            if (type =='storeWide'){
                salesAndPromotion.salesAndPromotionType = 'storeWide';
            }else if (type == 'minimumOrderValue'){
                salesAndPromotion.salesAndPromotionType = 'minimumOrderValue';
            }else if(type == 'categoryWide'){
                salesAndPromotion.salesAndPromotionType = 'categoryWide';
            }else {
                salesAndPromotion.salesAndPromotionType = 'singleProduct';
                salesAndPromotion.selectedProduct = $scope.selectedProduct;
            }

            salesAndPromotion.appId = $rootScope.appId;
            salesAndPromotionService.saveSalesAndPromotion(salesAndPromotion)
                .success(function (data) {
                    toastr.success('Sales And Promotion Data successfully Added ', 'Message', {
                        closeButton: true
                    });
                }).error(function (error) {
                toastr.error('Sales And Promotion Adding Error', 'Message', {
                    closeButton: true
                });
            })

        }

    }
})();