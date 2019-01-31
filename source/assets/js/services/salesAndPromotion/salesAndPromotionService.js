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
                    clickOutsideToClose: false,
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
                    clickOutsideToClose: false,
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
                    clickOutsideToClose: false,
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
            },
            deleteSalesAndPromotions: function(data){
                            return $mdDialog.show({
                                    controllerAs: 'dialogCtrl',
                                    controller: function($mdDialog,appEditResource,toastr,salesAndPromotionService,$scope){
                                        this.confirm = function click(){
                                            appEditResource.deleteSalesAndPromotions({id:data.id}).success(function(data) {

                                                    toastr.success('Your promotion successfully deleted', 'Success', {
                                                        closeButton: true
                                                    });
                                                    salesAndPromotionService.showPromotionsAndSalesDialog("dummy");
                                                $mdDialog.hide();

                                            }).error(function(err) {
                                                toastr.error('Cant Build', 'Error', {
                                                    closeButton: true
                                                });
                                            });
                                        },
                                            this.cancel = function click(){
                                                salesAndPromotionService.showPromotionsAndSalesDialog();
                                            }
                                    },
                                    template:'<md-dialog aria-label="Edit Child Menu">'+
                                    '<md-content >' +
                                    '<div class="md-dialog-header">' +
                                    '<h1>Deleting Demo Data </h1>' +
                                    '</div>' +
                                    '<br>'+
                                    '<div style="text-align:center">' +
                                    '<lable>Are you sure, you want to delete this promotion ?</lable>' +
                                    '</div>' +
                                    '<br><br>' +
                                    '<div class="md-dialog-buttons">'+
                                    '<div class="inner-section">'+
                                    '<md-button class="me-default-button" ng-click="dialogCtrl.cancel()">No</md-button>'+
                                    '<md-button class="me-default-button" ng-click="dialogCtrl.confirm()">Yes</md-button>'+
                                    '</div>'+
                                    '</div>' +
                                    '</md-content>' +
                                    '</md-dialog>'
                                })
            }

        };
    }
})();



