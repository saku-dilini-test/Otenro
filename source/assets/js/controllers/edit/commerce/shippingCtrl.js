/**
 * Created by amila on 7/11/16.
 */

(function () {
    'use strict';
    angular.module("appEdit").controller("ShippingCtrl", [
        '$scope', 'toastr', 'shippingService', '$rootScope', 'taxService', 'initialData', '$mdDialog', ShippingCtrl]);

    function ShippingCtrl($scope, toastr, shippingService, $rootScope, taxService, initialData, $mdDialog) {

        // --/-- Configuration Data --/--
        $scope.initialData = initialData;
        console.log(initialData);
        $scope.maxFlatRate = 20;
        $scope.maxWeightRate = 20;
        $scope.maxPickup = 50;
        $scope.maxPostalCode = 8;
        $scope.currency = $rootScope.currency;
        $scope.size = 0;
        $scope.selected = [];
        $scope.countryList = [];
        //$scope.isDisabled = true;


        // --/-- enable & disable tabs --/--
        // --/-- Common function for enable disable tabs
        // --/-- Parameter : (Selected-Tab number,1-tab boolean,2-tab boolean,3-tab boolean,4-tab boolean)
        function disableTabs(selectedTab, tab1, tab2, tab3, tab4, tab5) {
            $scope.selectedTab = selectedTab;
            $scope.shippingOptionParams = {
                firstLocked: tab1,
                secondLocked: tab2,
                thirdLocked: tab3,
                pickupLocked: tab4,
                countrySelectionLocked: tab5
            };
        }

        // --/-- view shopping collections mode
        if ($scope.initialData == null) {
            shippingService.getShippingInfo().
                success(function (data) {
                    $scope.items = data;
                }).error(function (err) {
                    //alert("Shipping Info Loading Error : " + err);
                });
        }
        // --/-- add new shipping collection mode
        else if ($scope.initialData.shipOption == 'newShippingOption') {
            disableTabs(0, false, true, true, true, true);

            $scope.moveToFlatRateOption = function () {
                disableTabs(1, false, false, true, true, true);
            };

            $scope.moveToWeightBasedOption = function () {
                $scope.weightRate = {
                    weightRanges: [{ startWeight: '', endWeight: '', cost: '' }]
                };
                $scope.addNewWeightRange = function () {

                    $scope.size = ($scope.weightRate.weightRanges.length);
                    $scope.size = $scope.size - 1;

                    if ($scope.weightRate.weightRanges.length > 0) {
                        var lastEndWeight = parseFloat($scope.weightRate.weightRanges[$scope.size].endWeight);
                    console.log(lastEndWeight);
                        if (lastEndWeight % 1 == 0) {
                        console.log("in if");
                            lastEndWeight = lastEndWeight + 0.1 + "";
                        } else {
                        console.log("in else");
                        lastEndWeight += 0.1;
                            lastEndWeight = (Math.round(lastEndWeight * 100) / 100) + "";
                        }
                        angular.element(document.getElementById('startWeight' + $scope.size))[0].disabled = true;
                        angular.element(document.getElementById('endWeight' + $scope.size))[0].disabled = true;
                        $scope.weightRate.weightRanges.push({ startWeight: lastEndWeight, endWeight: '', cost: '' });
                        angular.element(document.getElementById('deleteWeight' + $scope.size)).disabled = true;
                    } else {
                        $scope.weightRate.weightRanges.push({ startWeight: Math.round(lastEndWeight * 100) / 100, endWeight: '', cost: '' });
                    }
                };
                $scope.validateInputValue = function (startWeight, endWeight, type, index) {
                    if (type == 'startWeight') {
                        if ((parseFloat(startWeight) >= parseFloat(endWeight)) && endWeight) {
                            $scope.weightRate.weightRanges[index].startWeight = null;
                            toastr.error('Start Weight can not be over than or equals end Weight', 'Warning', {
                                closeButton: true
                            });
                        }
                    }
                    else if (type == 'endWeight') {
                        if ((parseFloat(endWeight) <= parseFloat(startWeight)) && startWeight) {
                            $scope.weightRate.weightRanges[index].endWeight = null;
                            toastr.error('End Weight can not be lower than or equals Start Weight', 'Warning', {
                                closeButton: true
                            });
                        }
                    }

                    if (index > 0) {
                        if (((parseFloat($scope.weightRate.weightRanges[index - 1].startWeight)) >= parseFloat(startWeight)) ||
                            ((parseFloat($scope.weightRate.weightRanges[index - 1].endWeight)) >= parseFloat(startWeight))) {
                            toastr.error('Invalid weight Ranges ', 'Warning', {
                                closeButton: true
                            });
                            $scope.weightRate.weightRanges[index].startWeight = null;
                        }
                    }

                };
                disableTabs(2, false, true, false, true, true);
            };

            $scope.moveToPickupOption = function () {
                disableTabs(3, false, true, true, false, true);
            };
        }
        // --/-- shipping collection editable mode
        else {
            if ($scope.initialData.shippingOption == 'Flat Rate') {
                $scope.flatRates = $scope.initialData;
                $scope.data = {
                    group: $scope.initialData.selection
                }
                $scope.country = $scope.initialData.countryRestriction;
                disableTabs(1, true, false, true, true, true);
            }
            if ($scope.initialData.shippingOption == 'Weight Based') {
                $scope.weightRate = $scope.initialData;
                $scope.addNewWeightRange = function () {

                    var lastEndWeight = $scope.initialData.weightRanges[$scope.initialData.weightRanges.length - 1].endWeight
                    if (lastEndWeight % 1 == 0) {
                        lastEndWeight = parseFloat(lastEndWeight + 0.1) + "";
                    } else {
                        lastEndWeight = parseFloat((Math.round(lastEndWeight * 100) / 100)).toFixed(1) + "";
                    }

                    $scope.weightRate.weightRanges.push({ startWeight: lastEndWeight, endWeight: '', cost: '' })
                };
                $scope.data = {
                    group: $scope.initialData.selection
                }
                $scope.country = $scope.initialData.countryRestriction;
                disableTabs(2, true, true, false, true, true);
            }
            if ($scope.initialData.shippingOption == 'Pick up') {
                $scope.pickup = $scope.initialData;
                $scope.data = {
                    group: $scope.initialData.selection
                }
                $scope.country = $scope.initialData.countryRestriction;
                disableTabs(3, true, true, true, false, true);
            }
        }


        // --/-- insert Flat Rate type shipping collection --/--
        $scope.insertFlatRates = function (shipping) {

            if (typeof shipping == 'undefined') {
                toastr.error('Please fill all fields', 'Warning', {
                    closeButton: true
                });
            } else if (typeof shipping.optionName == 'undefined'
                || typeof shipping.preOrderFee == 'undefined'
                || typeof shipping.feePerItem == 'undefined') {
                toastr.error('Please fill all fields', 'Warning', {
                    closeButton: true
                });
            } else if (shipping.optionName.length > $scope.maxFlatRate) {
                toastr.error('Option name should not exceed 20 characters', 'Warning', {
                    closeButton: true
                });
            } else {

                var isNameTaken = false;
                if ($scope.initialData.shipData) {
                    $scope.initialData.shipData.forEach(function (ele) {
                        if (ele.optionName == shipping.optionName.trim()) {
                            isNameTaken = true;
                        }
                    })
                }

                if (isNameTaken) {
                    toastr.error('Shipping option with the name ' + shipping.optionName + ' already exist', 'Warning', {
                        closeButton: true
                    });
                } else {
                    shipping.appId = $rootScope.appId;
                    shipping.shippingOption = 'Flat Rate';
                    $scope.shipping = shipping;
                    disableTabs(4, true, false, true, true, false);
                }

            }
        };

        // --/-- insert Pickup Base type shipping collection --/--
        $scope.insertPickup = function (pickup) {
            if (typeof pickup == 'undefined') {
                toastr.error('Please fill all fields ', 'Warning', {
                    closeButton: true
                });
            }
            else if (typeof pickup.number == 'undefined' || typeof pickup.streetAddress == 'undefined'
                || typeof pickup.city == 'undefined' || typeof pickup.country == 'undefined'
                || typeof pickup.country == 'undefined') {
                toastr.error('Please fill all fields', 'Warning', {
                    closeButton: true
                });
            } else if (pickup.locationName.length > $scope.maxPickup) {
                toastr.error('Location name should not exceed 20 characters', 'Warning', {
                    closeButton: true
                });
            } else if (pickup.city.length > $scope.maxPickup) {
                toastr.error('City should be less than ' + $scope.maxPickup + ' letters.', 'Warning', {
                    closeButton: true
                });
            } else if (pickup.number.length > $scope.maxPickup) {
                toastr.error('Address Line 1 should be less than ' + $scope.maxPickup + ' letters.', 'Warning', {
                    closeButton: true
                });
            } else if (pickup.streetAddress.length > $scope.maxPickup) {
                toastr.error('Address Line 2 should be less than ' + $scope.maxPickup + ' letters.', 'Warning', {
                    closeButton: true
                });
            }
            else {
                var isNameTaken = false;
                if ($scope.initialData.shipData) {
                    $scope.initialData.shipData.forEach(function (ele) {
                        if (ele.optionName == pickup.locationName.trim()) {
                            isNameTaken = true;
                        }
                    })
                }

                if (isNameTaken) {
                    toastr.error('Shipping option with the name ' + pickup.locationName + ' already exist', 'Warning', {
                        closeButton: true
                    });
                } else {
                    pickup.appId = $rootScope.appId;
                    pickup.shippingOption = 'Pick up';
                    pickup.optionName = pickup.locationName;
                    disableTabs(4, true, true, true, false, false);
                    $scope.shipping = pickup;
                }
            }
        };


        $scope.clearFields = function () {
            $scope.pickup = null;
        }

        // --/-- insert Weight Base type shipping collection --/--
        $scope.insertWeightBase = function (shipping) {
            if (typeof shipping == 'undefined') {
                toastr.error('Please fill all fields', 'Warning', {
                    closeButton: true
                });
            } else if (typeof shipping.optionName == 'undefined') {
                toastr.error('Please fill all fields', 'Warning', {
                    closeButton: true
                });
            } else if (shipping.optionName.length > $scope.maxWeightRate) {
                toastr.error('Option name should not exceed 20 characters', 'Warning', {
                    closeButton: true
                });
            }
            // Only Check Weight in WeightRanges Array '0' index values
            else if (typeof shipping.weightRanges[0].startWeight == 'undefined'
                || typeof shipping.weightRanges[0].endWeight == 'undefined') {
                toastr.error('Weight ranges required', 'Warning', { closeButton: true });
            }
            // Only Check Cost in WeightRanges Array '0' index values
            else if (typeof shipping.weightRanges[0].cost == 'undefined') {
                toastr.error('Weight range costs required', 'Warning', { closeButton: true });
            }
            else {
                var isNameTaken = false;
                if ($scope.initialData.shipData) {
                    $scope.initialData.shipData.forEach(function (ele) {
                        if (ele.optionName == shipping.optionName.trim()) {
                            isNameTaken = true;
                        }
                    })
                }

                if (isNameTaken) {
                    toastr.error('Shipping option with the name ' + shipping.optionName + ' already exist', 'Warning', {
                        closeButton: true
                    });
                } else {
                    shipping.appId = $rootScope.appId;
                    shipping.shippingOption = 'Weight Based';
                    $scope.shipping = shipping;
                    disableTabs(3, true, true, false, true, false);
                }
            }
        };

        //Delete first or last weight from the weight base
        $scope.deleteWeight = function (index) {

            $scope.weightRate.weightRanges.splice(index, 1);
            $scope.previousIndex = index - 1;
            if ($scope.previousIndex >= 0) {
                angular.element(document.getElementById('startWeight' + $scope.previousIndex))[0].disabled = false;
                angular.element(document.getElementById('endWeight' + $scope.previousIndex))[0].disabled = false;
            }

        };

        // --/-- edit shopping collection
        $scope.editShippingInfo = function (item) {
            return shippingService.showUpdateShippingOptionDialog(item);
        };

        // --/-- delete shopping collection
        $scope.deleteShippingInfo = function (index, item) {
            return $mdDialog.show({
                controllerAs: 'dialogCtrl',
                controller: function ($mdDialog) {
                    this.confirm = function click() {
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
                        this.cancel = function click() {
                            $mdDialog.hide();
                            $scope.backToShippingView();
                        }
                },
                template: '<md-dialog aria-label="Edit Child Menu">' +
                    '<md-content >' +
                    '<div class="md-dialog-header">' +
                    '<h1>Deleting Shipping Option</h1>' +
                    '</div>' +
                    '<br>' +
                    '<div style="text-align:center">' +
                    '<lable>Are you sure, you want to delete this Shipping Option ? </lable>' +
                    '</div>' +
                    '<br>' +
                    '<br>' +
                    '<div class="md-dialog-buttons">' +
                    '<div class="inner-section">' +
                    '<md-button class="me-default-button" ng-click="dialogCtrl.cancel()">NO</md-button>' +
                    '<md-button class="me-default-button" ng-click="dialogCtrl.confirm()">YES</md-button>' +
                    '</div>' +
                    '</div>' +
                    '</md-content>' +
                    '</md-dialog>'
            })
        };

        // Get All Country
        taxService.getAllCountry().success(function (data) {
            $scope.countryList = data;

        }).error(function (err) {
            //alert("MainMenu Loading Error : " + err);
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
            for (var i = 0; i < list.length; i++) {
                if (list[i].countryCode == item.countryCode) {
                    return true;
                }
            }
            return false;
        };


        //select all country
        $scope.isIndeterminate = function () {
            return ($scope.selected.length !== 0 &&
                $scope.selected.length !== $scope.countryList.length);
        };

        $scope.isChecked = function () {
            return $scope.selected.length === $scope.countryList.length;
        };

        $scope.toggleAll = function () {
            $scope.IsSingleSelection = false;
            if ($scope.selected.length === $scope.countryList.length) {
                $scope.selected = [];
            } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
                $scope.selected = $scope.countryList.slice(0);
            }
        };


        if ($scope.country) {
            $scope.country.forEach(function (element) {
                $scope.exists(element, $scope.selected);
                $scope.toggle(element, $scope.selected);

            });
        }


        // Update Contry Restriciton
        $scope.updateCountryRestriction = function (radio, country) {
            /* $scope.shipping.selection = radio.group;*/
            $scope.shipping.countryRestriction = country;
            shippingService.updateShippingInfo($scope.shipping)
                .success(function (result) {
                    if ($scope.shipping.shippingOption == "Flat Rate") {
                        if ($scope.initialData.shippingOption == 'Flat Rate') {
                            toastr.success('Flat rate option has been edited successfully ', 'Saved', {
                                closeButton: true
                            });
                        } else {
                            toastr.success('Flat rate option has been added successfully ', 'Saved', {
                                closeButton: true
                            });
                        }

                    }
                    else if ($scope.shipping.shippingOption == "Weight Based") {
                        if ($scope.initialData.shippingOption == 'Weight Based') {
                            toastr.success('Weight Based Option has been edited successfully ', 'Saved', {
                                closeButton: true
                            });
                        } else {
                            toastr.success('Weight Based Option has been added successfully ', 'Saved', {
                                closeButton: true
                            });
                        }

                    }
                    else {
                        if ($scope.initialData.shippingOption == 'Pick up') {
                            toastr.success('Pick up Option has been edited successfully ', 'Saved', {
                                closeButton: true
                            });
                        } else {
                            toastr.success('Pick up Option has been added successfully ', 'Saved', {
                                closeButton: true
                            });
                        }
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
            var iData = {
                shipOption: 'newShippingOption',
                shipData: $scope.items
            };

            return shippingService.showAddShippingOptionDialog(iData);
        };
        $scope.backToShippingView = function () {
            return shippingService.showShippingDialog();
        };

        // --- cancel dialog
        $scope.cancel = function () {
            $mdDialog.cancel();
        };

    }
})();
