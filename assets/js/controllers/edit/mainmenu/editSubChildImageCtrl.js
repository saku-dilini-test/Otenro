/**
 * Created by thusithz on 1/26/16.
 */

(function() {
    'use strict';
    angular.module("appEdit").controller("EditSubChildImageCtrl", [
        '$scope', '$mdDialog', 'toastr','mainMenuService','commerceService','$rootScope','SERVER_URL','subChild','imageUrl',
        EditSubChildImageCtrl]);

    function EditSubChildImageCtrl($scope, $mdDialog,toastr, mainMenuService,commerceService,$rootScope,SERVER_URL,subChild,imageUrl) {

        $scope.updateImage = function(file) {

            commerceService.updateProductImage(file,imageUrl,subChild._id,$rootScope.appId).progress(function(evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
            }).success(function(data, status, headers, config) {
                return mainMenuService.showSubChildDialog(subChild);
                // console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            }).error(function(data, status, headers, config) {

            })
        };
        $scope.hide = function() {
            return mainMenuService.showSubChildDialog(subChild);
        };
        $scope.cancel = function() {
            return mainMenuService.showSubChildDialog(subChild);
        };
        $scope.answer = function() {
            $mdDialog.hide();
        };
    }
})();
