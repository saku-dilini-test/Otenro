/*
Displaying currencies in the drop down box and catching the selected currency by the user and sending it to the
currencyService
 */
(function() {
    'use strict';
    angular.module("appEdit").controller("currencyCtrl", [
        '$scope', '$rootScope', '$mdDialog', 'toastr', 'currencyService',
        currencyCtrl]);
    function currencyCtrl($scope,$rootScope,$mdDialog,toastr, currencyService) {
        $scope.currencyList=[
            {currency:"USD", currID:'1', sign:'$'},
            {currency:"SLR", currID:'2', sign:'Rs.'},
            {currency:"EUR", currID:'3', sign:'€'}];
        $scope.addCurrency = function() {
            var reqParams={
                currency:$scope.selectedOption.currency.sign,
                appId: $rootScope.appId
        };
            currencyService.setCurrency(reqParams).
                success(function(data) {
                    alert("success", 'Awsome! ', ' New Product has been added.!');
                }).error(function(err) {
                    alert('warning', "Unable to get templates", err.message);
                });
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