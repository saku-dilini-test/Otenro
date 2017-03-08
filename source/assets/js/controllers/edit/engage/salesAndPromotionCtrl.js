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


        if (typeof $scope.salesAndPromotionList === 'undefined') {
            salesAndPromotionService.getListOfSalesAndPromotions($rootScope.appId)
                .success(function (data) {
                    $scope.salesAndPromotionList = data;
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

                    $scope.cancel = function(){
                        $mdDialog.hide();
                    };
                    
                    $scope.backToSalesandPromotionsView = function(){
                        return salesAndPromotionService.showPromotionsAndSalesDialog();
                    };


                    // --/-- edit sales and Promotions collection
                    $scope.editSalesAndPromotionsInfo = function (item) {
                        return salesAndPromotionService.showPromotionsAndSalesDialog(item);
                    };
                    // --/-- cancel button
                    $scope.addNewSalesAndPromotions=function(){
                        return salesAndPromotionService.showPromotionsAndSalesAddNewDialog();
                    };

                    
                    // --/-- delete  collection
                    $scope.deleteSalesAndPromotionInfo = function (index,item) {
                        return $mdDialog.show({
                            controllerAs: 'dialogCtrl',
                            controller: function($mdDialog){
                                this.confirm = function click(){

                                    salesAndPromotionService.deleteSalesAndPromotionInfo(item)
                                        .success(function (result) {
                                            toastr.success('Successfully Deleted ', 'Saved', {
                                                closeButton: true
                                            });
                                            $scope.items.splice(index, 1);
                                            $mdDialog.hide();
                                            $scope.backToSalesandPromotionsView();
                                        }).error(function (error) {
                                        toastr.error('Unable to delete. Please try again. ', 'Warning', {
                                            closeButton: true
                                        });
                                    })

                                },
                                    this.cancel = function click(){
                                        $mdDialog.hide();
                                        $scope.backToSalesandPromotionsView();
                                    }
                            },
                            template:'<md-dialog aria-label="Edit Child Menu">'+
                            '<md-content >' +
                            '<div class="md-dialog-header">' +
                            '<h1>Deleting Sales and Promotions Option</h1>' +
                            '</div>' +
                            '<br>'+
                            '<div style="text-align:center">' +
                            '<lable>Are you sure, you want to delete this Sales and Promotions Option ? </lable>' +
                            '</div>' +
                            '<br>' +
                            '<br>' +
                            '<div class="md-dialog-buttons">'+
                            '<div class="inner-section">'+
                            '<md-button class="me-default-button" ng-click="dialogCtrl.cancel()">NO</md-button>'+
                            '<md-button class="me-default-button" ng-click="dialogCtrl.confirm()">YES</md-button>'+
                            '</div>'+
                            '</div>' +
                            '</md-content>' +
                            '</md-dialog>'
                        })
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