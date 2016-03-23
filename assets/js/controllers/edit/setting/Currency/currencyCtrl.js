/*
Displaying currencies in the drop down box and catching the selected currency by the user and sending it to the
currencyService
 */
(function() {
    'use strict';
    angular.module("appEdit").controller("currencyCtrl", [
        '$scope', '$rootScope', '$mdDialog','toastr', 'currencyService',
        currencyCtrl]);
    function currencyCtrl($scope,$rootScope,$mdDialog,toastr, currencyService) {

   currencyService.getAllCurrency().
           success(function(data){
               $scope.currencyList = data;
               console.log(data);
           }).error(function(err){
               alert("MainMenu Loading Error : " + err);
           });
// $scope.currencyList=[
//            {currency:"USD", currID:'1', sign:'$'},
//            {currency:"SLR", currID:'2', sign:'Rs.'},
//            {currency:"EUR", currID:'3', sign:'€'}
//            ];

     currencyService.getCurrency().
        success(function(data){
                $scope.existingCurrency = data;
                $scope.oneCurrency = $scope.existingCurrency;
        }).error(function(err){
            alert("MainMenu Loading Error : " + err);
        });

        $scope.addCurrency = function() {
        for(var i=0; i<$scope.currencyList.length; i++){
                if($scope.oneCurrency.currency == $scope.currencyList[i].currency){
                    $scope.options = $scope.currencyList[i]
                }
        }
            var reqParams={
                currencySign:$scope.options.sign,
                currency:$scope.options.currency,
                id:$scope.options.id,
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