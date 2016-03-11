(function() {
    'use strict';
    angular.module("appEdit").controller("ProductCtrl", [
        '$scope', '$mdDialog', 'toastr','commerceService','$rootScope','SERVER_URL','$auth','ME_APP_SERVER','item',
        ProductCtrl]);

    function ProductCtrl($scope, $mdDialog,toastr, commerceService,$rootScope,SERVER_URL,$auth,ME_APP_SERVER,item) {


        $scope.product={
            name:item.name,
            price:item.price
        };
        $scope.thumbPic = ME_APP_SERVER+'temp/' +$auth.getPayload().id+'/templates/'+$rootScope.appId+'/img/thirdNavi/default.jpg';



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
        
        $scope.addProducts = function(file,product) {
            commerceService.addProduct(file,product,item.id).
                success(function(data) {
                    toastr.success('New Product has been added.', 'Awsome!', {
                        closeButton: true
                    });
                }).error(function(err) {
                    toastr.error('Unable to Add', 'Warning', {
                        closeButton: true
                    });
                });
        };

        $scope.nextStep = function(current) {
            $scope.selectedTab = current;
        };

        $scope.answer = function() {
            $mdDialog.hide();
        };
    }
})();