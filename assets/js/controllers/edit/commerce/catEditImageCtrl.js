/**
 * Created by thusithz on 11/30/15.
 */
(function() {
    'use strict';
    angular.module("appEdit").controller("catEditImageCtrl", [
        '$scope', '$mdDialog', 'toastr','commerceService','$rootScope','SERVER_URL','catId','imageUrl',
        catEditImageCtrl]);

    function catEditImageCtrl($scope, $mdDialog,toastr, commerceService,$rootScope,SERVER_URL,catId,imageUrl) {

        $scope.updateCatImage = function(file) {
            commerceService.updateCategoryImage(file,imageUrl,catId,$rootScope.appId).progress(function(evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
            }).success(function(data, status, headers, config) {
                return commerceService.showCommerceDialog('category');
               // console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            }).error(function(data, status, headers, config) {

            })
        };
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {

            $mdDialog.cancel();
        };
        $scope.answer = function() {
            $mdDialog.hide();
        };
    }
})();
