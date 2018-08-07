/**
 * Created by shamilaSallay on 26/08/2015.
 */
 (function() {
    'use strict';
    angular.module("appEdit").controller("InventoryCtrl", [
    '$scope', 'inventoryService','commerceService','$rootScope','mySharedService','SERVER_URL','$auth','toastr','$mdDialog','initialData',
    'productService','$filter','$http','$log',
    InventoryCtrl]);
    function InventoryCtrl($scope, inventoryService,commerceService,$rootScope,mySharedService,SERVER_URL,$auth,toastr,$mdDialog,
    initialData,productService,$filter,$http,currencyService,$log) {
            $scope.currentPage = 1;
            $scope.pageSize = 5;
            $scope.userId=$auth.getPayload().id;
            $scope.appId=$rootScope.appId;
            $scope.SERVER_URL = SERVER_URL;
            $scope.isValideForm = true;
            $scope.inventoryList = [];
            $rootScope.currentProduct = null;
            $rootScope.hasCurrentProduct = false;


            $scope.refreshData = function() {
                $scope.inventoryList = initialData.inventoryList;
                $scope.inventoryList = $filter('filter')($scope.inventoryList, $scope.search.name, undefined);
            }

            $scope.col_defs =[
                {
                    field:'sku',
                    displayName:'SKU',
                    cellTemplate: "<md-input-container class='md-container-modify'>"+
                                        "<div class='md-input input-modify color-link' ng-click='cellTemplateScope.click(row.branch)'>{{row.branch[col.field]}}</div>"+
                                        "</md-input-container>",
                    cellTemplateScope: {
                        click: function(data) {
                            // go to product edit view
                            $scope.goToEditProductWindow(data);
                        }
                    }
                },
                {
                    field:'vType',
                    displayName:'Variants',
                    cellTemplate:   "<div ng-if='row.level == 2'>" +
                    "<md-input-container class='md-container-modify' ng-repeat='x in row.branch.selection'>"+
                    "<div class=' input-modify color-link' ng-click='cellTemplateScope.click(row.branch)'>{{x.name}} - {{x.vType}}</div>"+
                    "</md-input-container>"+ "</div>",
                    cellTemplateScope: {
                        click: function(data) {
                            // go to product edit view
                            $scope.goToEditProductWindow(data);
                        }
                    }

                },
                {
                    field:'quantity',
                    displayName:'Quantity',
                    cellTemplate:   "<div ng-if='row.level == 2'>" +
                                       "<ng-form name='quantityForm'>"+
                                            "<md-input-container class='md-container-modify'>"+
                                                "<input ng-if='row.branch[col.field] !== null ' class='color-link' aria-label='Quantity' name='quantity' ng-model='row.branch[col.field]' maxlength='8' ng-pattern='/^[0-9]*$/' ng-click='cellTemplateScope.click(row.branch)' required/>"+
                                                "<input ng-if='row.branch[col.field] === null' class='color-link' aria-label='Quantity' name='quantity' value='Unlimited' ng-click='cellTemplateScope.click(row.branch)' required/>"+
                                                "<div ng-messages='quantityForm.quantity.$error' ng-show='quantityForm.quantity.$dirty'>"+
                                                    "<div ng-message='required'>Required!</div>"+
                                                    "<div ng-message='pattern'>Invalid Character!</div>"+
                                               "</div>"+
                                           "</md-input-container>"+
                                       "</ng-form></div>",
                    cellTemplateScope: {
                        click: function(data) {
                            // go to product edit view
                            $scope.goToEditProductWindow(data);
                        }
                    }
                },
                {
                    field:'price',
                    displayName:'Price ('+$rootScope.currency + ")",
                    cellTemplate:  "<div ng-if='row.level == 2'>" +
                                       "<ng-form name='priceForm'>"+
                                            "<md-input-container class='md-container-modify'>"+
                                                "<input class='color-link' aria-label='Price' name='price' ng-model='row.branch[col.field]' maxlength='8' ng-pattern='/^[0-9]{0,8}(\.[0-9]{2})?$/' ng-click='cellTemplateScope.click(row.branch)' required/>"+
                                                "<div ng-messages='priceForm.price.$error' ng-show='priceForm.price.$dirty'>"+
                                                    "<div ng-message='required'>Required!</div>"+
                                                    "<div ng-message='pattern'>Invalid Character!</div>"+
                                               "</div>"+
                                           "</md-input-container>"+
                                       "</ng-form></div>",
                    cellTemplateScope: {
                        click: function(data) {
                            // go to product edit view
                            $scope.goToEditProductWindow(data);
                        }
                    }

                },
                {
                    field:'published',
                    displayName:'Published',
                    cellTemplate:   "<div ng-if='row.level == 2'>" +
                    "<md-input-container class='md-container-modify'>"+
                    "<div class='md-input input-modify color-link' ng-click='cellTemplateScope.click(row.branch)'>{{row.branch[col.field]}}</div>"+
                    "</md-input-container>"+ "</div>",
                    cellTemplateScope: {
                        click: function(data) {
                            // go to product edit view
                            $scope.goToEditProductWindow(data);
                        }
                    }

                },
                {
                    displayName:'Delete',
                    cellTemplate:   "<div class='delete-icon'><img " +
                                    " ng-click='cellTemplateScope.click(row.branch)' src='../../../images/delete-icon.png'></div>",
                    cellTemplateScope: {
                        click: function(data) {
                            // go to product delete view
                            $scope.deletePro(data);
                        }
                    }
                },
            ];

        var productList =  initialData.inventoryList;
        //$log.debug(initialData.inventoryList);
        $scope.exportArray = [];

        for(var i = 0; i <  initialData.inventoryList.length; i++){
            if(productList[i].hasOwnProperty("variants")){
                productList[i]["children"] = productList[i]["variants"];

                // This part may be change later according platform integration
                // -- start -- inject product id to child array
                var productID = productList[i]['id'];
                var selection = productList[i]['selection'];
                var published = productList[i]['published'];
                var tempChildArray = productList[i]['children'];
                for(var j = 0; j < tempChildArray.length; j++){
                    tempChildArray[j]['id'] = productID;
//                    tempChildArray[j]['selection'] = selection;
                    tempChildArray[j]['published'] = published;
                    $scope.exportArray.push(tempChildArray[j]);
                }
                productList[i]['children'] = tempChildArray;
                // -- end -- inject product id to child array

                delete productList[i]["variants"];
            }
        }
        $scope.getArray = function(){
            $scope.exportArrayN = [];



            angular.forEach($scope.exportArray, function(value, key) {
                if (value.quantity) {
                    value.quantity = value.quantity;
                } else if (value.unlimited) {
                    value.quantity = 'unlimited';
                }
                $scope.printVariants = function (selection) {
                    $scope.selectionArray = [];
                    $scope.value = "";

                    angular.forEach(selection, function(value) {
                        $scope.value = $scope.value  + value.name  + "-" + value.vType + "  ";

                    });

                    $scope.selectionArray.push($scope.value);
                    $scope.value = "";
                    return $scope.selectionArray ;
                }

                    $scope.exportArrayN.push({

                        'Name': value.name,
                        'sku': value.sku,
                        'price': value.price,
                        'quantity': value.quantity,
                        'weight': value.weight,
                        'variants': $scope.printVariants(value.selection),
                    });


            });
            return $scope.exportArrayN;
        }
        $scope.inventoryList = productList;
        //$log.debug(productList);

//            $log.debug("LLLLLLLLLLLLL")
//            $log.debug("LLLLLLLLLLLLL")
            //$log.debug("LLLLLLLLLLLLL" + JSON.stringify(initialData))
            //$log.debug("LLLLLLLLLLLLL "+ JSON.stringify(inventoryList))
//            $log.debug("LLLLLLLLLLLLL")
//            $log.debug("LLLLLLLLLLLLL")
//            $log.debug("LLLLLLLLLLLLL")
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
                 //set clicked product as the currentProduct
                 $rootScope.currentProduct = item;
                 //this is true when there is a currentProduct
                 $rootScope.hasCurrentProduct = true;
                 return commerceService.showAddProductsDialog(item);
//               $state.go('user.editApp',{appId: item.id});
             };



            $scope.updateInventory =function(){
//                $log.debug("&*&*&*&*&*&&*")
//                $log.debug("&*&*&*&*&*&&*")
//                $log.debug("&*&*&*&*&*&&* "+ JSON.stringify($scope.inventoryList));
//                $log.debug("&*&*&*&*&*&&*")
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
//                        delete productList[i]["children"];
                    }
                }
                productService.updateInventory({'inventoryList':$scope.inventoryList,where:{}}).$promise.then(function(data){
//                   $log.debug("XXXXVXVVVXVX")
//                   $log.debug("XXXXVXVVVXVX")
//                   $log.debug("XXXXVXVVVXVX")
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
                toastr.success("Changes Saved!", 'Message', {
                                                closeButton: true
                                            });

            };

          // hide the dialog box
          $scope.hide = function () {
                    $mdDialog.hide();
          };


        /**
         * Delete a product from the inventory.
         * @param index
         * @param inventory
         * @returns {*}
         */
        $scope.deletePro = function (item,inventory) {
            var itemLength = item.children.length;
            var urlPath;
            return $mdDialog.show({
                controllerAs: 'dialogCtrl',
                controller: function($mdDialog){
                    if(itemLength != 0){
                        this.message = "Are you sure you want to delete this Product and its variants?"
                    }
                    else{
                         this.message = "Are you sure you would like to delete the product variant?"
                    }
                    this.confirm = function click(){
                        var itemIndex = $scope.inventoryList.indexOf(item);
                        $scope.inventoryList.splice(itemIndex, 1);
                        productService.delete({item:item}).$promise.then(function(result){
                            toastr.success("Product successfully deleted", 'Message', {
                                closeButton: true
                            });
                            $mdDialog.hide();
                        if($rootScope.tempNew == 'true'){
                              urlPath =  SERVER_URL +"progressiveTemplates/viewProgUrl?userId="+ $auth.getPayload().id
                                                                             +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"/";
                                                              $scope.appTemplateUrl = urlPath +
                                                                  'src'+new Date().getTime();
                              }else{
                              urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                                                                             +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"/";
                                                              $scope.appTemplateUrl = urlPath+'' +
                                                                  '#/app/update?'+new Date().getTime();
                              }

                              mySharedService.prepForBroadcast($scope.appTemplateUrl);

                            return commerceService.showInventoryDialog();
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
                '</div>' +
                '<br>'+
                '<div style="text-align:center">' +
                    '<lable>{{dialogCtrl.message}}</lable>' +
                '</div>' +
                '<br><br>' +
                '<div class="md-dialog-buttons">'+
                    '<div class="inner-section">'+
                        '<md-button class="me-default-button" ng-click="dialogCtrl.cancel()">No</md-button>'+
                        '<md-button class="me-default-button" ng-click="dialogCtrl.confirm()">Yes</md-button>'+
                    '</div>'+
                '</div>' +
                '</md-content>' +
                '</md-dialog>'
            })

        };

        /*
            To edit the inventory details when click on the name of the product
        */

        $scope.tree_handler = function(branch){
            $scope.goToEditProductWindow(branch);
        }
        /**
         * Show add product dialog
         */
        $scope.addProduct = function () {
            var State = true;
            return commerceService.showAddProductsDialog('products');
        }
    }
    })();