/**
 * Created by amila on 7/11/16.
 */

(function () {
    'use strict';
    angular.module("appEdit").controller("ShippingCtrl", [
        '$scope', 'toastr', 'shippingService', '$rootScope','taxService','initialData', ShippingCtrl]);

    function ShippingCtrl($scope, toastr, shippingService, $rootScope,taxService,initialData) {

        // --/-- Configuration Data --/--
        $scope.initialData = initialData;



        // --/-- enable & disable tabs --/--
        // --/-- Common function for enable disable tabs
        // --/-- Parameter : (Selected-Tab number,1-tab boolean,2-tab boolean,3-tab boolean,4-tab boolean)
        function  disableTabs(selectedTab,tab1,tab2,tab3,tab4,tab5) {
            $scope.selectedTab = selectedTab;
            $scope.shippingOptionParams = {
                firstLocked : tab1,
                secondLocked: tab2,
                thirdLocked: tab3,
                pickupLocked : tab4,
                countrySelectionLocked: tab5
            };
        }

        // --/-- view shopping collections mode
        if($scope.initialData == null){
            shippingService.getShippingInfo().
                success(function(data){
                    $scope.items = data;
                }).error(function(err){
                    alert("Shipping Info Loading Error : " + err);
                });
        }
        // --/-- add new shipping collection mode
        else if($scope.initialData == 'newShippingOption'){
                disableTabs(0,false,true,true,true,true);

            $scope.moveToFlatRateOption = function () {
                disableTabs(1,false,false,true,true,true);
            };

            $scope.moveToWeightBasedOption = function () {
                $scope.weightRate = {
                    weightRanges : [{startWeight : '', endWeight : '',cost : ''}]
                };
                $scope.addNewWeightRange = function(){
                    $scope.weightRate.weightRanges.push({startWeight : '',endWeight : '',cost : ''})
                };
                disableTabs(2,false,true,false,true,true);
            };

            $scope.moveToPickupOption = function () {
                disableTabs(3,false,true,true,false,true);
            };
        }
        // --/-- shipping collection editable mode
        else{
            if($scope.initialData.shippingOption == 'Flat Rate'){
                $scope.flatRates = $scope.initialData;
                $scope.data ={
                    group : $scope.initialData.selection
                }
                $scope.country = $scope.initialData.countryRestriction;
                disableTabs(1,true,false,true,true,true);
            }
            if($scope.initialData.shippingOption == 'Weight Base'){
                $scope.weightRate = $scope.initialData;
                $scope.addNewWeightRange = function(){
                    $scope.weightRate.weightRanges.push({startWeight : '',endWeight : '',cost : ''})
                };
                $scope.data ={
                    group : $scope.initialData.selection
                }
                $scope.country = $scope.initialData.countryRestriction;
                disableTabs(2,true,true,false,true,true);
            }
            if($scope.initialData.shippingOption == 'Pick up'){
                $scope.pickup = $scope.initialData;
                $scope.data ={
                    group : $scope.initialData.selection
                }
                $scope.country = $scope.initialData.countryRestriction;
                disableTabs(3,true,true,true,false,true);
            }
        }

        // --/-- insert Flat Rate type shipping collection --/--
        $scope.insertFlatRates = function (shipping) {
            if(typeof shipping == 'undefined'){
                toastr.error('Fill all the fields', 'Warning', {
                    closeButton: true
                });
            }else if(typeof shipping.optionName == 'undefined'
                || typeof shipping.preOrderFee == 'undefined'
                || typeof shipping.feePerItem == 'undefined'){
                toastr.error('Fill all the fields', 'Warning', {
                    closeButton: true
                });
            }else{
                shipping.appId = $rootScope.appId;
                shipping.shippingOption = 'Flat Rate';
                $scope.shipping = shipping;
                disableTabs(4,true,false,true,true,false);
            }
        };

        $scope.insertPickup = function (pickup) {
            if(typeof pickup == 'undefined'){
                toastr.error('Fill all the fields', 'Warning', {
                    closeButton: true
                });
            }
            else if(typeof pickup.number == 'undefined' || typeof pickup.streetAddress == 'undefined' || typeof pickup.city == 'undefined'
                    || typeof pickup.country == 'undefined' || typeof pickup.country == 'undefined' || typeof pickup.cost == 'undefined'){
                        toastr.error('Fill all the fields', 'Warning', {
                            closeButton: true
                        });
            }else{

                pickup.appId = $rootScope.appId;
                pickup.shippingOption = 'Pick up';
                pickup.optionName = pickup.locationName;
                disableTabs(4,true,true,true,false,false);
                $scope.shipping = pickup;
            }
        };
        

        $scope.clearFields = function () {
            $scope.pickup = null;
        }

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
            }
            else if(shipping.weightRanges[0].startWeight == '' || shipping.weightRanges[0].endWeight == ''
                    || shipping.weightRanges[0].cost == ''){
                        toastr.error('Fill all the fields', 'Warning', {
                            closeButton: true
                        });
            }else {
                shipping.appId = $rootScope.appId;
                shipping.shippingOption = 'Weight Base';
                $scope.shipping = shipping;
                disableTabs(3,true,true,false,true,false);
            }
        };

        // --/-- edit shopping collection
        $scope.editShippingInfo = function (item) {
            return shippingService.showUpdateShippingOptionDialog(item);
        };

        // --/-- delete shopping collection
        $scope.deleteShippingInfo = function (index,item) {
            shippingService.deleteShippingInfo(item)
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
        taxService.getAllCountry().success(function (data) {
            $scope.countryList = data;

        }).error(function (err) {
            alert("MainMenu Loading Error : " + err);
        });
        $scope.updateCountryRestriction = function(radio,country){
            $scope.shipping.selection = radio.group;
            $scope.shipping.countryRestriction = country;
            shippingService.updateShippingInfo($scope.shipping)
            .success(function (result) {
                toastr.success('Successfully Saved ', 'Saved', {
                    closeButton: true
                });
                $scope.shipping = null;
                // This part should change according requirement
                $scope.backToShippingView();
            }).error(function (error) {
                toastr.error('Loading Error', 'Warning', {
                    closeButton: true
                });
            })


        };

        // ---  Open dialog ----------
        $scope.addShippingOption = function () {
            return shippingService.showAddShippingOptionDialog('newShippingOption');
        };
        $scope.backToShippingView = function(){
            return shippingService.showShippingDialog();
        };

    }
})();
