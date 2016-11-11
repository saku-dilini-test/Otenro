/**
 * Created by amila on 7/11/16.
 */

(function () {
    'use strict';
    angular.module("appEdit").controller("ShippingCtrl", [
        '$scope', 'toastr', 'shippingService', '$rootScope','taxService','initialData','$mdDialog', ShippingCtrl]);

    function ShippingCtrl($scope, toastr, shippingService, $rootScope,taxService,initialData, $mdDialog) {

        // --/-- Configuration Data --/--
        $scope.initialData = initialData;

        $scope.maxFlatRate = 20;
        $scope.maxWeightRate = 20;
        $scope.maxPickup = 20;
        $scope.currency = $rootScope.currency;
        $scope.size = 0;


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

                    $scope.size  = ($scope.weightRate.weightRanges.length);
                    $scope.size  = $scope.size -1;
                    angular.element(document.getElementById('startWeight'+ $scope.size))[0].disabled = true;
                    angular.element(document.getElementById('endWeight'+ $scope.size))[0].disabled = true;
                    $scope.weightRate.weightRanges.push({startWeight : '',endWeight : '',cost : ''})
                };
                $scope.validateInputValue = function(startWeight,endWeight,type,index){
                    if (type=='startWeight'){
                        if ((parseInt(startWeight) >=  parseInt(endWeight))&& endWeight){
                            $scope.weightRate.weightRanges[index].startWeight  = null;
                            toastr.error('Start Weight can not be over than or equals end Weight', 'Warning', {
                                closeButton: true
                            });
                        }
                    }
                    else if (type=='endWeight'){
                        if ((parseInt(endWeight) <= parseInt(startWeight))&& startWeight){
                            $scope.weightRate.weightRanges[index].endWeight  = null;
                            toastr.error('End Weight can not be lower than or equals Start Weight', 'Warning', {
                                closeButton: true
                            });
                        }
                    }

                    if (index > 0){
                        if (((parseInt($scope.weightRate.weightRanges[index-1].startWeight) ) >= parseInt(startWeight))||
                            ((parseInt($scope.weightRate.weightRanges[index-1].endWeight) ) >= parseInt(startWeight)) ){
                            toastr.error('Invalid weight Ranges ', 'Warning', {
                                closeButton: true
                            });
                            $scope.weightRate.weightRanges[index].startWeight  = null;
                        }
                    }

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
            if($scope.initialData.shippingOption == 'Weight Based'){
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
                toastr.error('Please fill all fields', 'Warning', {
                    closeButton: true
                });
            }else if(typeof shipping.optionName == 'undefined'
                || typeof shipping.preOrderFee == 'undefined'
                || typeof shipping.feePerItem == 'undefined'){
                toastr.error('Please fill all fields', 'Warning', {
                    closeButton: true
                });
            }else if(shipping.optionName.length > $scope.maxFlatRate){
                toastr.error('Option name should not exceed 20 characters', 'Warning', {
                    closeButton: true
                });
            }else{
                shipping.appId = $rootScope.appId;
                shipping.shippingOption = 'Flat Rate';
                $scope.shipping = shipping;
                disableTabs(4,true,false,true,true,false);
            }
        };

        // --/-- insert Pickup Base type shipping collection --/--
        $scope.insertPickup = function (pickup) {
            if(typeof pickup == 'undefined'){
                toastr.error('Please fill all fields ', 'Warning', {
                    closeButton: true
                });
            }
            else if(typeof pickup.number == 'undefined' || typeof pickup.streetAddress == 'undefined'
                || typeof pickup.city == 'undefined' || typeof pickup.country == 'undefined'
                || typeof pickup.country == 'undefined'){
                        toastr.error('Please fill all fields', 'Warning', {
                            closeButton: true
                        });
            }else if(pickup.locationName.length > $scope.maxPickup){
                toastr.error('Location name should not exceed 20 characters', 'Warning', {
                    closeButton: true
                });
            }else if(pickup.city.length > $scope.maxPickup){
                toastr.error('City should be less than '+$scope.maxPickup+' letters.', 'Warning', {
                    closeButton: true
                });
            }else if(pickup.streetAddress.length > $scope.maxPickup){
                toastr.error('Street Address should be less than '+$scope.maxPickup+' letters.', 'Warning', {
                    closeButton: true
                });
            }
            else{

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
                toastr.error('Please fill all fields', 'Warning', {
                    closeButton: true
                });
            }else if(typeof shipping.optionName == 'undefined'){
                toastr.error('Please fill all fields', 'Warning', {
                    closeButton: true
                });
            }else if(shipping.optionName.length > $scope.maxWeightRate){
                toastr.error('Option name should not exceed 20 characters', 'Warning', {
                    closeButton: true
                });
            }
            // Only Check Weight in WeightRanges Array '0' index values
            else if(typeof shipping.weightRanges[0].startWeight == 'undefined'
                    || typeof shipping.weightRanges[0].endWeight == 'undefined'){
                        toastr.error('Weight ranges required', 'Warning', {closeButton: true});
            }
            // Only Check Cost in WeightRanges Array '0' index values
            else if(typeof shipping.weightRanges[0].cost == 'undefined'){
                toastr.error('Weight range costs required', 'Warning', {closeButton: true});
            }
            else {
                shipping.appId = $rootScope.appId;
                shipping.shippingOption = 'Weight Based';
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
            return $mdDialog.show({
                controllerAs: 'dialogCtrl',
                controller: function($mdDialog){
                    this.confirm = function click(){
                        shippingService.deleteShippingInfo(item)
                            .success(function (result) {
                                toastr.success('Successfully deleted', 'Saved', {
                                    closeButton: true
                                });
                                $scope.items.splice(index, 1);
                                $mdDialog.hide();
                                $scope.backToShippingView();
                            }).error(function (error) {
                            toastr.error('Unable to delete shipping option. Please try again', 'Warning', {
                                closeButton: true
                            });
                        })

                    },
                        this.cancel = function click(){
                            $mdDialog.hide();
                            $scope.backToShippingView();
                        }
                },
                template:'<md-dialog aria-label="Edit Child Menu">'+
                '<md-content >' +
                '<div class="md-dialog-header">' +
                    '<h1>Deleting Shipping Option</h1>' +
                '</div>' +
                '<br>'+
                '<div style="text-align:center">' +
                    '<lable>Are you sure, you want to delete this Shipping Option ? </lable>' +
                '</div>' +
                '<br>' +
                '<br>' +
                '<div class="md-dialog-buttons">'+
                    '<div class="inner-section">'+
                        '<md-button class="me-default-button" ng-click="dialogCtrl.cancel()">NO</md-button>'+
                        '<md-button class="me-default-button" ng-click="dialogCtrl.confirm()">YES</md-button>'+
                    '</div>'+
                '</div>' +
                '</md-content>' +
                '</md-dialog>'
            })
        };
        
        // Get All Country
        taxService.getAllCountry().success(function (data) {
            $scope.countryList = data;

        }).error(function (err) {
            alert("MainMenu Loading Error : " + err);
        });

        $scope.selected = [];

        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item.countryName);
            if (idx > -1) {
              list.splice(idx, 1);
            }
            else {
              list.push(item.countryName);
            }
         };

        $scope.exists = function (item, list) {
             return list.indexOf(item.countryName) > -1;
        };


//
//         $scope.isIndeterminate = function() {
//            return ($scope.selected.length !== 0 &&
//                $scope.selected.length !== $scope.countryList.length);
//          };
//
//          $scope.isChecked = function() {
//            return $scope.selected.length === $scope.countryList.length;
//          };
//
//          $scope.toggleAll = function() {
//            if ($scope.selected.length === $scope.countryList.length) {
//              $scope.selected = [];
//            } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
//              $scope.selected = $scope.countryList.slice(0);
//            }
//          };



        
        // Update Contry Restriciton 
        $scope.updateCountryRestriction = function(radio,country){
            $scope.shipping.selection = radio.group;
            $scope.shipping.countryRestriction = country;
            shippingService.updateShippingInfo($scope.shipping)
            .success(function (result) {
                if($scope.shipping.shippingOption == "Flat Rate"){
                    toastr.success('Flat rate option has been added successfully ', 'Saved', {
                        closeButton: true
                    });
                }
                else if ($scope.shipping.shippingOption == "Weight Based"){
                    toastr.success('Weight Based Option has been added successfully ', 'Saved', {
                        closeButton: true
                    });
                }
                else{
                    toastr.success('Pick up Option has been added successfully ', 'Saved', {
                        closeButton: true
                    });
                }
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

        // --- cancel dialog
        $scope.cancel = function () {
            $mdDialog.cancel();
        };

    }
})();
