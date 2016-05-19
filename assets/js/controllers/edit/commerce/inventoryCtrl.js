/**
 * Created by shamilaSallay on 26/08/2015.
 */
 (function() {
    'use strict';
    angular.module("appEdit").controller("InventoryCtrl", [
    '$scope', 'inventoryService','commerceService','$rootScope','SERVER_URL','$auth','toastr',
    InventoryCtrl]);
    function InventoryCtrl($scope, inventoryService,commerceService,$rootScope,SERVER_URL,$auth,toastr) {

            $scope.userId=$auth.getPayload().sub;
            $scope.appId=$rootScope.appId;
            $scope.SERVER_URL = SERVER_URL;
            $scope.imageURL = SERVER_URL+
                "api/edit/viewImages?userId="+$scope.userId
                +"&appId="+$scope.appId+"&"
                +new Date().getTime();
                if (typeof $scope.inventoryList === 'undefined') {
                     inventoryService.getInventoryList()
                         .success(function (result) {
                            console.log(result);
                             $scope.inventoryList = result;
//                             $scope.inventoryList={
//                             quantity:0,
//                             sale: 0,
//                             discount: 0

//                             }
                             console.log("result "+result[0]);
                         }).error(function (error) {
                             alert("Inventory Loading Error : " + error);
                         })
            }
             $scope.gotoedit = function(item){

                 return commerceService.showAddProductsDialog(item);
//               $state.go('user.editApp',{appId: item.id});
             };



            $scope.fulfill =function(inventory){
                console.log(inventory);
                commerceService.updateInventory(inventory)
                    .success(function (result) {
                        toastr.success('Updated', 'Success', {
                            closeButton: true
                        });
                        $scope.mainMenus = result;
                    }).error(function (error) {
                        toastr.error('Fail add', 'Warning', {
                            closeButton: true
                        });

                    })

            }
    }
    })();