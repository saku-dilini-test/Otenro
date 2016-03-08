

/**
 * Created by thusithz on 11/30/15.
 */
(function() {
    'use strict';
    angular.module("appEdit").controller("proEditImageCtrl", [
        '$scope', '$mdDialog', 'toastr','commerceService','$rootScope','SERVER_URL','proId','imageUrl',
        proEditImageCtrl]);

    function  proEditImageCtrl($scope, $mdDialog,toastr, commerceService,$rootScope,SERVER_URL,proId,imageUrl) {

        $scope.updateProImage = function(file) {
            commerceService.updateProductImage(file,imageUrl,proId,$rootScope.appId).progress(function(evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
            }).success(function(data, status, headers, config) {
                return commerceService.showAddProductsDialog('products');
                // console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            }).error(function(data, status, headers, config) {

            })
        };
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {

            return commerceService.showAddProductsDialog('products');
        };
        $scope.answer = function() {

            $mdDialog.hide();
        };
    }
})();
