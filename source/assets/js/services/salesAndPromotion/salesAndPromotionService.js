/**
 * Created by prasanna on 12/27/16.
 */

(function() {
    angular.module('appEdit').service('salesAndPromotionService', [
        '$mdDialog', '$http', '$rootScope', 'SERVER_URL','$q','productService', salesAndPromotionService
    ]);

    function salesAndPromotionService($mdDialog, $http, $rootScope, SERVER_URL, $q,productService) {
        return {
          showPromotionsAndSalesDialog: function() {
                return $mdDialog.show({
                    controller: 'SalesAndPromotionCtrl',
                    templateUrl: 'user/edit/engage/promotionsAndSalesView.html',
                    clickOutsideToClose: true,
                    locals:{
                        item: null
                    }
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            showPromotionsAndSalesAddNewDialog: function(data) {
                return $mdDialog.show({
                    controller: 'SalesAndPromotionCtrl',
                    templateUrl: 'user/edit/engage/promotionsAndSalesAddNew.html',
                    clickOutsideToClose: true,
                    locals: {
                        item: null
                    }
                    /*resolve:{
                        productService:'productService',
                        initialData:['productService','$q', function(productService,$q){
                            //$log.debug("::P::PPP::PP:P:P "+ item.sku);
                            if('products'== item) {
                                item= {'id':'0'};
                            }
                            return $q.all({
                                product:productService.get({'productId':item.id}).$promise.then(function(product){
                                    product.sku = item.sku;
                                    return product;
                                })
                            });
                        }]
                    }*/

                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            showPromotionsAndSalesUpdateDialog: function(data) {
                return $mdDialog.show({
                    controller: 'SalesAndPromotionCtrl',
                    templateUrl: 'user/edit/engage/promotionsAndSalesAddNew.html',
                    clickOutsideToClose: true,
                    locals: {
                        item: data
                    }
                    /*resolve:{
                        productService:'productService',
                        initialData:['productService','$q', function(productService,$q){
                            //$log.debug("::P::PPP::PP:P:P "+ item.sku);
                            if('products'== item) {
                                item= {'id':'0'};
                            }
                            return $q.all({
                                product:productService.get({'productId':item.id}).$promise.then(function(product){
                                    product.sku = item.sku;
                                    return product;
                                })
                            });
                        }]
                    }*/

                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            saveSalesAndPromotion: function(data){
                return $http.post(SERVER_URL+ 'edit/saveSalesAndPromotion',data);
            },
            getListOfSalesAndPromotions  : function (appId) {
                return $http.get(SERVER_URL+ 'edit/getListOfSalesAndPromotions?appId='+appId);
            }

        };
    }
})();



