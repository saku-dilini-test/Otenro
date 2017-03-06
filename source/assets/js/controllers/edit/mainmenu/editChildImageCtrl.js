/**
 * Created by thusithz on 11/30/15.
 */
(function() {
    'use strict';
    angular.module("appEdit").controller("EditChildImageCtrl", [
        '$scope', '$mdDialog', 'toastr','mainMenuService','commerceService','$rootScope','SERVER_URL','child','imageUrl','$log',
        EditChildImageCtrl]);

    function EditChildImageCtrl($scope, $mdDialog,toastr, mainMenuService,commerceService,$rootScope,SERVER_URL,child,imageUrl,$log) {

        $scope.updateImage = function(file) {

            commerceService.updateCategoryImage(file,imageUrl,child._id,$rootScope.appId).progress(function(evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                $log.debug('progress: ' + progressPercentage + '% ' + evt.config.file.name);
            }).success(function(data, status, headers, config) {
                return mainMenuService.showChildDialog(child);
                // $log.debug('file ' + config.file.name + 'uploaded. Response: ' + data);
            }).error(function(data, status, headers, config) {

            })
        };
        $scope.hide = function() {
            return mainMenuService.showChildDialog(child);
        };
        $scope.cancel = function() {
            return mainMenuService.showChildDialog(child);
        };
        $scope.answer = function() {
            $mdDialog.hide();
        };
    }
})();
