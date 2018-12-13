/**
 * Created by amila on 7/21/16.
 */

(function () {
    'use strict';
    angular.module("appEdit").controller("taxCtrl", [
        '$scope','$mdDialog','toastr', 'taxService', '$rootScope','initialData','$filter',
        ShippingCtrl]);

    function ShippingCtrl($scope, $mdDialog, toastr, taxService, $rootScope,initialData, $filter) {

            var appId = $rootScope.appId;
        // --/-- Configuration Data --/--
        $scope.initialData = initialData;
        // console.log($scope.initialData);
        $scope.selected = [];
        $scope.countryList = [];
        $scope.maxTax = 20;


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
           for(var i=0; i< list.length; i++)
           {
                if(list[i].countryCode == item.countryCode)
                {
                    return true;
                }
           }
           return false;
           //return list.indexOf(item) > -1;
        };
        //select all country
        $scope.isIndeterminate = function() {
            return ($scope.selected.length !== 0 &&
            $scope.selected.length !== $scope.countryList.length);
        };

        $scope.isChecked = function() {
            return $scope.selected.length === $scope.countryList.length;
        };

        $scope.toggleAll = function() {
            $scope.IsSingleSelection = false;
            if ($scope.selected.length === $scope.countryList.length) {
                $scope.selected = [];
            } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
                $scope.selected = $scope.countryList.slice(0);
            }
        };
        
        if ($scope.country){
            $scope.country.forEach(function(element) {
                $scope.exists(element , $scope.selected);
                $scope.toggle(element , $scope.selected);

            });
        }

        // --/-- view tax collections mode
        if($scope.initialData == null){
            taxService.getTaxInfo().
                success(function(data){
                    $scope.items = data;
                }).error(function(err){
                    //alert("Taxes Info Loading Error : " + err);
                });
        }
        // --/-- add new tax collection mode
        else if($scope.initialData == 'newTaxOption'){
            $scope.isDisabled = false;
            $scope.tax = {
                isApplyShippingCharge : false,
                isApplyServicesCharge : false
            }
        }
        // --/-- tax collection editable mode
        else{
            $scope.isDisabled = true;
            $scope.tax = $scope.initialData;
            $scope.selected = $scope.tax.countryRestriction;
        }

        // --/-- add new tax collection --/--
        $scope.addNewTaxOption = function (taxInfo,country) {
             if(typeof taxInfo.taxAmount == 'undefined'){
                toastr.error('Tax should be between 0 to 100', 'Message', {
                    closeButton: true
                });
            }else if (typeof taxInfo.taxName == 'undefined'){
                 toastr.error('Please fill the tax name', 'Message', {
                     closeButton: true
                 });
             }else if(country.length <=0) {
                 toastr.error('Please add at least one country', 'Message', {
                     closeButton: true
                 });
             }
            else{
                 taxInfo.countryRestriction = country;
                taxInfo.appId = $rootScope.appId;
                taxService.updateTaxInfo(taxInfo)
                    .success(function (result) {
                        toastr.success(result.message, 'Saved', {
                            closeButton: true
                        });
                        $scope.backToTaxesView();
                    }).error(function (error) {
                        toastr.error('Saving Error', 'Message', {
                            closeButton: true
                        });
                    })
            }
        };


        // --/-- edit tax collection
        $scope.editTaxInfo = function (item) {
            return taxService.showUpdateTaxOptionDialog(item);
        };

        // --/-- delete tax collection
        $scope.deleteTaxInfo = function (index,item) {
            return $mdDialog.show({
                controllerAs: 'dialogCtrl',
                controller: function($mdDialog){
                    this.confirm = function click(){

                        taxService.deleteTaxInfo(item)
                        .success(function (result) {
                            $scope.initialData = "newTaxOption";
                            toastr.success('Successfully Deleted ', 'Saved', {
                                closeButton: true
                            });
                            $scope.items.splice(index, 1);
                             $mdDialog.hide();
                             $scope.backToTaxesView();
                        }).error(function (error) {
                            toastr.error('Unable to delete. Please try again. ', 'Warning', {
                                closeButton: true
                            });
                        })

                    },
                        this.cancel = function click(){
                            $mdDialog.hide();
                            $scope.backToTaxesView();
                        }
                },
                template:'<md-dialog aria-label="Edit Child Menu">'+
                '<md-content >' +
                '<div class="md-dialog-header">' +
                    '<h1>Deleting Tax Option</h1>' +
                '</div>' +
                '<br>'+
                '<div style="text-align:center">' +
                    '<lable>Are you sure, you want to delete this Tax Option ? </lable>' +
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


        // ---  Open dialog ----------
        $scope.addTaxOption = function () {
            return taxService.showAddTaxOptionDialog('newTaxOption');
        };
        $scope.backToTaxesView = function(){
            return taxService.showTaxesDialog();
        };

        // --- cancel dialog
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }
})();

