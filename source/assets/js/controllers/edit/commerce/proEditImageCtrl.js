

/**
 * Created by thusithz on 11/30/15.
 */
(function() {
    'use strict';
    angular.module("appEdit").controller("proEditImageCtrl", [
        '$scope', '$mdDialog', 'toastr','commerceService','$rootScope','SERVER_URL','proId','imageUrl','$log',
        proEditImageCtrl]);

    function  proEditImageCtrl($scope, $mdDialog,toastr, commerceService,$rootScope,SERVER_URL,proId,imageUrl,$log) {

        $scope.updateProImage = function(file) {
            commerceService.updateProductImage(file,imageUrl,proId,$rootScope.appId).progress(function(evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                $log.debug('progress: ' + progressPercentage + '% ' + evt.config.file.name);
            }).success(function(data, status, headers, config) {
            //TODO :need to add the refresh
                //return commerceService.showAddProductsDialog('products');
                // $log.debug('file ' + config.file.name + 'uploaded. Response: ' + data);
            }).error(function(data, status, headers, config) {

            })
        };
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {

            //return commerceService.showAddProductsDialog('products');
        };
        $scope.answer = function() {

            $mdDialog.hide();
        };
    }
})();
