/**
 * Created by shamilaSallay on 26/08/2015.
 */
 (function() {
    'use strict';
    angular.module("appEdit").controller("InventoryCtrl", [
    '$scope', 'inventoryService','commerceService','$rootScope','SERVER_URL','$auth','toastr',
    InventoryCtrl]);
    function InventoryCtrl($scope, inventoryService,commerceService,$rootScope,SERVER_URL,$auth,toastr) {
            $scope.currentPage = 1;
            $scope.pageSize = 5;
            $scope.userId=$auth.getPayload().id;
            $scope.appId=$rootScope.appId;
            $scope.SERVER_URL = SERVER_URL;
            $scope.imageURL = SERVER_URL+
                "api/edit/viewImages?userId="+$scope.userId
                +"&appId="+$scope.appId+"&"
                +new Date().getTime();
                if (typeof $scope.inventoryList === 'undefined') {
                     inventoryService.getInventoryList()
                         .success(function (result) {

                             $scope.inventoryList = result;
//                             $scope.inventoryList={
//                             quantity:0,
//                             sale: 0,
//                             discount: 0

//                             }
                         }).error(function (error) {
                             alert("Inventory Loading Error : " + error);
                         })
            }
             $scope.gotoedit = function(item){

                 return commerceService.showAddProductsDialog(item);
//               $state.go('user.editApp',{appId: item.id});
             };



            $scope.fulfill =function(inventory){
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

            };

            $scope.deletePro = function(index,inventory){
                $scope.inventoryList.splice(index, 1);
                inventory.userId = $scope.userId;
                commerceService.deleteProducts(inventory).success(function(data) {
                    toastr.success(data.message, 'Message', {
                        closeButton: true
                    });
                }).error(function(err) {
                    toastr.error(err, 'Warning', {
                        closeButton: true
                    });
                });
            }
    }
    })();