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
 console.log($rootScope.appId);

     currencyService.getCurrency().
        success(function(data){
        $scope.existingCurrency = data[0].appSettings.appCurrencyName;
        }).error(function(err){
            alert("MainMenu Loading Error : " + err);
        });

        $scope.currencyList=[
            {currency:"USD", currID:'1', sign:'$'},
            {currency:"SLR", currID:'2', sign:'Rs.'},
            {currency:"EUR", currID:'3', sign:'€'}];


        $scope.addCurrency = function() {
            var reqParams={
                currencySign:$scope.selectedOption.currency.sign,
                currency:$scope.selectedOption.currency.currency,
                appId: $rootScope.appId
        };
            currencyService.setCurrency(reqParams).
                success(function(data) {
                     toastr.success(' Currency has been added.!', {
                                                closeButton: true
                                            });
                }).error(function(err) {
                    toastr.error(' warning',"Unable to get templates", {closeButton: true});
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