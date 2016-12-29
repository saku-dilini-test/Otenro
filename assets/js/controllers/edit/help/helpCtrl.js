/**
 * Created by manosh on 12/28/16.
 */
(function () {
    'use strict';
    angular.module("appEdit").controller("taxCtrl", [
        '$scope','$mdDialog','toastr', 'helpService', '$rootScope','initialData',
        HelpCtrl]);

    function helpCtrl($scope, $mdDialog, toastr, helpService, $rootScope,initialData) {

        var appId = $rootScope.appId;
        // --/-- Configuration Data --/--
        $scope.initialData = initialData;
        $scope.selected = [];



        helpService.getcommeceFile().success(function (data) {
            $scope.countryList = data;

        }).error(function (err) {
            alert("MainMenu Loading Error : " + err);
        });

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
        };

        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };

    }
})();
