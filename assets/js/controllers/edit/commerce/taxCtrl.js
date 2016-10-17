/**
 * Created by amila on 7/21/16.
 */

(function () {
    'use strict';
    angular.module("appEdit").controller("taxCtrl", [
        '$scope','$mdDialog','toastr', 'taxService', '$rootScope','initialData',
        ShippingCtrl]);

    function ShippingCtrl($scope, $mdDialog, toastr, taxService, $rootScope,initialData) {

            var appId = $rootScope.appId;
        // --/-- Configuration Data --/--
        $scope.initialData = initialData;


        taxService.getAllCountry().success(function (data) {
            $scope.countryList = data;

        }).error(function (err) {
            alert("MainMenu Loading Error : " + err);
        });

        // --/-- view tax collections mode
        if($scope.initialData == null){
            taxService.getTaxInfo().
                success(function(data){
                    $scope.items = data;
                }).error(function(err){
                    alert("Taxes Info Loading Error : " + err);
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
        }

        // --/-- add new tax collection --/--
        $scope.addNewTaxOption = function (taxInfo) {
            if(typeof taxInfo.country == 'undefined'){
                toastr.error('Fill the Country field', 'Message', {
                    closeButton: true
                });
            }else if(typeof taxInfo.taxAmount == 'undefined'){
                toastr.error('Tax Amount should be a between 0 - 100', 'Message', {
                    closeButton: true
                });
            }
            else{
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
                            toastr.success('Successfully Remove ', 'Saved', {
                                closeButton: true
                            });
                            $scope.items.splice(index, 1);
                             $mdDialog.hide();
                             $scope.backToTaxesView();
                        }).error(function (error) {
                            toastr.error('Deleting Error', 'Warning', {
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

