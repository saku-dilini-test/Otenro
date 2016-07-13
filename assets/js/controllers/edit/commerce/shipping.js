/**
 * Created by amila on 7/11/16.
 */

(function () {
    'use strict';
    angular.module("appEdit").controller("ShippingCtrl", [
        '$scope', 'toastr', 'commerceService', '$rootScope', ShippingCtrl]);

    function ShippingCtrl($scope, toastr, commerceService, $rootScope) {

        // --/-- Configuration Data --/--
        $scope.selectedTab = 0;
        $scope.shippingOptionParams = {
            firstLocked : false,
            secondLocked: true,
            thirdLocked: true,
            countrySelectionLocked: true
        };
        $scope.weightRate = {
            weightRanges : [{startWeight : 0.1, endWeight : '',cost : ''}]
        };
        $scope.addNewWeightRange = function(){
            $scope.weightRate.weightRanges.push({startWeight : '',endWeight : '',cost : ''})
        };
        // --/-- enable & disable tabs --/--
        // --/-- Common function for enable disable tabs
        // --/-- Parameter : (Selected-Tab number,1-tab boolean,2-tab boolean,3-tab boolean,4-tab boolean)
        $scope.enableDisableTabs = function (selectedTab,tab1,tab2,tab3,tab4) {
            $scope.selectedTab = selectedTab;
            $scope.shippingOptionParams = {
                firstLocked : tab1,
                secondLocked: tab2,
                thirdLocked: tab3,
                countrySelectionLocked: tab4
            };
        };
        $scope.moveToFlatRateOption = function () {
            $scope.enableDisableTabs(1,false,false,true,true);
        };
        $scope.moveToWeightBasedOption = function () {
            $scope.enableDisableTabs(2,false,true,false,true);
        };

        // --/-- get shopping collections
        if(typeof  $scope.items == 'undefined'){
            commerceService.getShippingInfo().
                success(function(data){
                    console.log(data);
                    $scope.items = data;
                }).error(function(err){
                    alert("Shipping Info Loading Error : " + err);
                });
        }

        // --/-- edit shopping collection
        $scope.editShippingInfo = function (index,item) {

            // --/-- this part still developing --/--
        };

        // --/-- delete shopping collection
        $scope.deleteShippingInfo = function (index,item) {
            commerceService.deleteShippingInfo(item)
                .success(function (result) {
                    toastr.success('Successfully Remove ', 'Saved', {
                        closeButton: true
                    });
                    $scope.items.splice(index, 1);
                }).error(function (error) {
                    toastr.error('Deleting Error', 'Warning', {
                        closeButton: true
                    });
                })
        };

        // --/-- insert Flat Rate type shipping collection --/--
        $scope.insertFlatRates = function (shipping) {
            if(typeof shipping == 'undefined'){
                toastr.error('Fill all the fields', 'Warning', {
                    closeButton: true
                });
            }else if(typeof shipping.optionName == 'undefined' || typeof shipping.preOrderFee == 'undefined' || typeof shipping.feePerItem == 'undefined'){

                toastr.error('Fill all the fields', 'Warning', {
                    closeButton: true
                });
            }else{
                shipping.appId = $rootScope.appId;
                shipping.shippingOption = 'Flat Base';
                commerceService.insertFlatRateData(shipping)
                    .success(function (result) {
                        toastr.success('Successfully Saved ', 'Saved', {
                            closeButton: true
                        });
                        $scope.enableDisableTabs(3,true,false,true,false);
                    }).error(function (error) {
                        toastr.error('Loading Error', 'Warning', {
                            closeButton: true
                        });
                    })
            }
        };

        // --/-- insert Weight Base type shipping collection --/--
        $scope.insertWeightBase = function (shipping) {
            if(typeof shipping == 'undefined'){
                toastr.error('Fill all the fields', 'Warning', {
                    closeButton: true
                });
            }else if(typeof shipping.optionName == 'undefined'){
                toastr.error('Fill all the fields', 'Warning', {
                    closeButton: true
                });
            }else {
                shipping.appId = $rootScope.appId;
                shipping.shippingOption = 'Weight Base';
                commerceService.insertFlatRateData(shipping)
                    .success(function (result) {
                        toastr.success('Successfully Saved ', 'Saved', {
                            closeButton: true
                        });
                        $scope.enableDisableTabs(3,true,true,false,false);
                    }).error(function (error) {
                        toastr.error('Loading Error', 'Warning', {
                            closeButton: true
                        });
                    });
            }
        };

        $scope.updateCountryRestriction = function(){
            // This part should change according requirement
            $scope.backToShippingView();
        };

        // ---  Open dialog ----------
        $scope.addShippingOption = function () {
            return commerceService.showAddShippingOptionDialog();
        };
        $scope.backToShippingView = function(){
            return commerceService.showShippingDialog();
        };

    }
})();
