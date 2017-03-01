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
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },

            showUpdateSalesandPromotionsOptionDialog: function (initialData) {
                return $mdDialog.show({
                    controller: 'SalesAndPromotionCtrl',
                    templateUrl: 'user/edit/engage/promotionsAndSalesAddNew.html',
                    clickOutsideToClose: true,
                    locals: {
                        initialData: initialData
                    }
                }).then(function (answer) {
                }, function () {

                });
            },
            
          showPromotionsAndSalesAddNewDialog: function() {
                return $mdDialog.show({
                    controller: 'SalesAndPromotionCtrl',
                    templateUrl: 'user/edit/engage/promotionsAndSalesAddNew.html',
                    clickOutsideToClose: true
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
            deleteSalesAndPromotionInfo : function(data){
                return $http.post(SERVER_URL+ 'edit/deleteSalesAndPromotionInfo',data);
            },
            
            getListOfSalesAndPromotions  : function (appId) {
                return $http.get(SERVER_URL+ 'edit/getListOfSalesAndPromotions?appId='+appId);
            }

        };
    }
})();



