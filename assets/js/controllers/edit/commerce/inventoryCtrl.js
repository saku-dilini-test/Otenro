/**
 * Created by shamilaSallay on 26/08/2015.
 */
 (function() {
    'use strict';
    angular.module("appEdit").controller("InventoryCtrl", [
    '$scope', 'inventoryService','commerceService','$rootScope','SERVER_URL','$auth','toastr','$mdDialog','initialData','productService',
    InventoryCtrl]);
    function InventoryCtrl($scope, inventoryService,commerceService,$rootScope,SERVER_URL,$auth,toastr,$mdDialog,initialData,productService) {
            $scope.currentPage = 1;
            $scope.pageSize = 5;
            $scope.userId=$auth.getPayload().id;
            $scope.appId=$rootScope.appId;
            $scope.SERVER_URL = SERVER_URL;
            $scope.isValideForm = true;
            $scope.inventoryList = [];
            $scope.col_defs =[
                {
                    field:'sku',
                    displayName:'SKU'
                },
                {
                    field:'size',
                    displayName:'Size',
                    cellTemplate:"<input type='text' width='40' ng-model='row.branch[col.field]'/>"
                },
                {
                    field:'quantity',
                    displayName:'Quantity'
                },
                {
                    field:'price',
                    displayName:'Price'
                }
            ];

        var productList =  initialData.inventoryList;
        for(var i = 0; i <  initialData.inventoryList.length; i++){
            if(productList[i].hasOwnProperty("variants")){
                productList[i]["children"] = productList[i]["variants"];
                delete productList[i]["variants"];
            }
        }
        $scope.inventoryList = productList;

            console.log("LLLLLLLLLLLLL")
            console.log("LLLLLLLLLLLLL")
            //console.log("LLLLLLLLLLLLL" + JSON.stringify(initialData))
            //console.log("LLLLLLLLLLLLL "+ JSON.stringify(inventoryList))
            console.log("LLLLLLLLLLLLL")
            console.log("LLLLLLLLLLLLL")
            console.log("LLLLLLLLLLLLL")
            $scope.imageURL = SERVER_URL+
                "api/edit/viewImages?userId="+$scope.userId
                +"&appId="+$scope.appId+"&"
                +new Date().getTime();
        
            //
            //    if (typeof $scope.inventoryList === 'undefined') {
            //         inventoryService.createInventory()
            //             .success(function (result) {
            //                 inventoryService.getInventoryList().success(function (result) {
            //                     $scope.inventoryList = result;
            //                 }).error(function (error) {
            //                     alert("Inventory Loading Error : " + error);
            //                 })
            //             }).error(function (error) {
            //                 alert("Inventory Loading Error : " + error);
            //             })
            //}
             $scope.goToEditProductWindow = function(item){
                 return commerceService.showAddProductsDialog(item);
//               $state.go('user.editApp',{appId: item.id});
             };



            $scope.updateInventory =function(){
                console.log("&*&*&*&*&*&&*")
                console.log("&*&*&*&*&*&&*")
                console.log("&*&*&*&*&*&&* "+ JSON.stringify($scope.inventoryList));
                console.log("&*&*&*&*&*&&*")
                var inventoryList = inventoryList;


                //inventoryList.forEach(function (inventory) {
                //    var inventoryAttribute = inventory;
                //    if (inventoryAttribute.quantity < 0 || inventoryAttribute.quantity == null
                //         ||inventoryAttribute.price < 0 || inventoryAttribute.price == null
                //         ||inventoryAttribute.discount < 0){
                //         $scope.isValideForm =  false;
                //     }
                //});
                //if ($scope.isValideForm==false){
                //    toastr.error('Please fill valid data', 'Warning', {
                //        closeButton: true
                //    });
                //    $scope.isValideForm =  true;
                //}
                //else if ($scope.isValideForm==true){
                for(var i = 0; i <  initialData.inventoryList.length; i++){
                    if(productList[i].hasOwnProperty("children")){
                        productList[i]["variants"] = productList[i]["children"];
                        delete productList[i]["children"];
                    }
                }
                productService.updateInventory({'inventoryList':$scope.inventoryList,where:{}}).$promise.then(function(data){
                   console.log("XXXXVXVVVXVX")
                   console.log("XXXXVXVVVXVX")
                   console.log("XXXXVXVVVXVX")
                });
                    //commerceService.updateInventory(inventoryList)
                    //    .success(function (result) {
                    //        toastr.success('Updated', 'Success', {
                    //            closeButton: true
                    //
                    //        });
                    //        $scope.mainMenus = result;
                    //        $mdDialog.hide();
                    //    }).error(function (error) {
                    //    toastr.error('Fail add', 'Warning', {
                    //        closeButton: true
                    //    });
                    //    $mdDialog.hide();
                    //})
                //}
            };


        /**
         * Delete a product from the inventory.
         * @param index
         * @param inventory
         * @returns {*}
         */
        $scope.deletePro = function (index,inventory) {
            return $mdDialog.show({
                controllerAs: 'dialogCtrl',
                controller: function($mdDialog){
                    this.confirm = function click(){
                        $scope.inventoryList.splice(index, 1);
                        inventory.userId = $scope.userId;
                        commerceService.deleteProducts(inventory).success(function(data) {
                            toastr.success("product deleted", 'Message', {
                                closeButton: true
                            });
                            $mdDialog.hide();
                            return commerceService.showInventoryDialog();
                        }).error(function(err) {
                            toastr.error(err, 'Warning', {
                                closeButton: true
                            });
                            $mdDialog.hide();
                        });
                    },
                        this.cancel = function click(){
                            $mdDialog.hide();
                            return commerceService.showInventoryDialog();
                        }
                },
                template:'<md-dialog aria-label="Edit Child Menu">'+
                '<md-content >' +
                '<div class="md-dialog-header">' +
                '<h1>Deleting Product </h1>' +
                '                </div> <br>'+
                ' <div style="text-align:center"><lable> Deleting product will delete this product ! </lable></div>' +
                '<br><br><div class="md-dialog-buttons">'+
                '<div class="inner-section">'+
                '<md-button class="me-default-button" ng-click="dialogCtrl.cancel()">Cancel</md-button>'+
                '<md-button class="me-default-button" ng-click="dialogCtrl.confirm()">Ok</md-button>'+
                '</div>'+
                '</div>' +
                '</md-content>' +
                '</md-dialog>'
            })

        };
    }
    })();