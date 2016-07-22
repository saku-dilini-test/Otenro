/**
 * Created by amila on 7/21/16.
 */

(function () {
    'use strict';
    angular.module("appEdit").controller("taxCtrl", [
        '$scope','$mdDialog','toastr', 'taxService', '$rootScope','initialData', ShippingCtrl]);

    function ShippingCtrl($scope, $mdDialog, toastr, taxService, $rootScope,initialData) {

        // --/-- Configuration Data --/--
        $scope.initialData = initialData;

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
            $scope.tax = {
                isApplyShippingCharge : false,
                isApplyServicesCharge : false
            }
        }
        // --/-- tax collection editable mode
        else{
            $scope.tax = $scope.initialData;
        }

        // --/-- add new tax collection --/--
        $scope.addNewTaxOption = function (taxInfo) {
            console.log(taxInfo);
            if(typeof taxInfo.country == 'undefined'
                || typeof taxInfo.taxAmount == 'undefined'){
                toastr.error('Fill the empty fields', 'Warning', {
                    closeButton: true
                });
            }else{
                taxInfo.appId = $rootScope.appId;
                taxService.updateTaxInfo(taxInfo)
                    .success(function (result) {
                        toastr.success('Successfully Saved ', 'Saved', {
                            closeButton: true
                        });
                        $scope.backToTaxesView();
                    }).error(function (error) {
                        toastr.error('Loading Error', 'Warning', {
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
            taxService.deleteTaxInfo(item)
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

