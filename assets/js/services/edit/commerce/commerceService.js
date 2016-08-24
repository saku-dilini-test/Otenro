/**
 * Created by udeshikaperera on 26/08/2015.
 */
(function () {
    angular.module('appEdit').service('commerceService', [
        '$mdDialog', '$http', '$rootScope', 'Upload', 'SERVER_URL', 'toastr','inventoryService', commerceService
    ]);

    function commerceService($mdDialog, $http, $rootScope, Upload, SERVER_URL, inventoryService) {
        return {
            showAddProductsDialog: function (item) {
                return $mdDialog.show({
                    controller: 'ProductCtrl',
                    templateUrl: 'user/edit/commerce/addPro.html',
                    clickOutsideToClose: true,
                    resolve:{
                        productService:'productService',
                        initialData:['productService','$q', function(productService,$q){
                            if('products'== item) {
                                item= {'id':'0'};
                            }
                            return $q.all({
                                product:productService.get({'productId':item.id}).$promise
                            });
                        }]
                    }
                }).then(function (answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                });
            },
            updateProductImage: function (file, imageUrl, proId, appId) {
                return Upload.upload({
                    url: SERVER_URL + 'edit/updateThirdNaviImage',
                    fields: {
                        'imageUrl': imageUrl,
                        'categoryId': proId,
                        'appId': appId

                    },
                    file: file
                });
            },
            updateCategoryImage: function (file, imageUrl, catId, appId) {
                var dataURItoBlob = function(dataURI) {
                    var binary = atob(dataURI.split(',')[1]);
                    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                    var array = [];
                    for(var i = 0; i < binary.length; i++) {
                        array.push(binary.charCodeAt(i));
                    }
                    return new Blob([new Uint8Array(array)], {type: mimeString});
                };

                var blob = dataURItoBlob(file);
                var UploadFile = new File([blob], 'imageFileName.png');

                return Upload.upload({
                    url: SERVER_URL + 'edit/updateSecondNaviImage',
                    fields: {
                        'imageUrl': imageUrl,
                        'categoryId': catId,
                        'appId': appId
                    },
                    file: UploadFile
                });
            },

            addProduct: function (file, product, id, variants, tempImageArray) {
                //console.log(product);
                //var dataURItoBlob = function(dataURI) {
                //    var binary = atob(dataURI.split(',')[1]);
                //    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                //    var array = [];
                //    for(var i = 0; i < binary.length; i++) {
                //        array.push(binary.charCodeAt(i));
                //    }
                //    return new Blob([new Uint8Array(array)], {type: mimeString});
                //};

                //var blob = dataURItoBlob(file);
                //var UploadFile = new File([blob], 'imageFileName.png');
                //

               
                return Upload.upload({
                    url: SERVER_URL + 'edit/thirdNavigation',
                    fields:{
                        id: id,
                        productId: product.id,
                        appId: $rootScope.appId,
                        mainId: product.mainId,
                        detailedDesc: product.detailedDesc,
                        name: product.name,
                        childId: variants[0].childId,
                        variants: variants,
                        desc: product.desc,
                        selection: product.selection,
                        //sku: variants.sku,
                        // price: variants.price,
                        //quantity: variants.quantity,
                        type: product.type,
                        discount: product.discount,
                        tempImageArray : tempImageArray
                    } ,
                    file: UploadFile
                });
            },
            // When upload third Navigation images send to server to update
            addProductImages: function (file,id) {
                console.log("KLKLKLKL")
                console.log("KLKLKLKL")
                console.log("KLKLKLKL "+ id)
                console.log("KLKLKLKL")
                var dataURItoBlob = function(dataURI) {
                    var binary = atob(dataURI.split(',')[1]);
                    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                    var array = [];
                    for(var i = 0; i < binary.length; i++) {
                        array.push(binary.charCodeAt(i));
                    }
                    return new Blob([new Uint8Array(array)], {type: mimeString});
                };

                var blob = dataURItoBlob(file);
                var UploadFile = new File([blob], 'imageFileName.png');

                return Upload.upload({
                    url: SERVER_URL + 'edit/addThirdNavigationImages',
                    fields: {
                        id: id,
                        appId: $rootScope.appId
                    },
                    file: UploadFile
                });
            },
            showOrderDialog: function () {
                return $mdDialog.show({
                    controller: 'CommerceCtrl',
                    templateUrl: 'user/edit/commerce/manageOrderView.html',
                    clickOutsideToClose: true
                }).then(function (answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                });
            },
            showInventoryDialog: function () {
                return $mdDialog.show({
                    controller: 'InventoryCtrl',
                    templateUrl: 'user/edit/commerce/manageInventoryView.html',
                    clickOutsideToClose: true,
                    resolve:{
                        inventoryService:'inventoryService',
                        initialData:['inventoryService','$q', function(inventoryService,$q){
                            return $q.all({
                                inventoryList:inventoryService.query({appId:$rootScope.appId}).$promise
                            });
                        }]
                    }
                }).then(function (answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                });
            },
            showEmailSettingsDialog: function () {
                return $mdDialog.show({
                    controller: 'CommerceCtrl',
                    templateUrl: 'user/edit/commerce/manageEmailSettingsView.html',
                    clickOutsideToClose: true
                }).then(function (answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            showStoreSettingsDialog: function () {
                return $mdDialog.show({
                    controller: 'CommerceCtrl',
                    templateUrl: 'user/edit/commerce/manageStoreSettingsView.html',
                    clickOutsideToClose: true
                }).then(function (answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            showAddNewUserDialog: function () {
                return $mdDialog.show({
                    controller: 'CommerceCtrl',
                    templateUrl: 'user/edit/commerce/addNewUserView.html',
                    clickOutsideToClose: true
                }).then(function (answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            showPolicies: function (appId) {
                return $http.get(SERVER_URL + 'edit/showPolicies?appId=' + appId);
            },
            savePolicies: function (appParams) {
                return $http.post(SERVER_URL + 'edit/savePolicies', appParams);
            },
            showStoreSettings: function (appId) {
                return $http.get(SERVER_URL + 'edit/showStoreSettings?appId=' + appId);
            },
            saveStoreSettings: function (appParams) {
                return $http.post(SERVER_URL + 'edit/saveStoreSettings', appParams);
            },
            getChild: function (childId) {
                return $http.get(SERVER_URL + 'edit/getChild?childId=' + childId);
            },
            getUpdates: function (id) {
                return $http.get(SERVER_URL + 'edit/getUpdates?ObjectId=' + id);
            },
//            getVariants:function(idDetails){
//                return $http.get(SERVER_URL+ 'edit/getVariants?appId='+$rootScope.appId+'&childId='+idDetails);
//            },
            addPriceandVariants: function (variants, file) {
                if (file !== null) {
                    return Upload.upload({
                        url: SERVER_URL + 'edit/addVariants',
                        fields: variants,
                        file: file
                    });
                } else {
                    return $http.post(SERVER_URL + 'edit/addVariants', variants);
                }

            },
            addToInventory: function (inventry){
               return $http.post(SERVER_URL + 'edit/addToInventory', inventry);
            },
            getMainMenuList: function () {
                return $http.get(SERVER_URL + 'edit/getMainNavigation?appId=' + $rootScope.appId);
            },
            getCategoryList: function () {
                return $http.get(SERVER_URL + 'edit/getSecondNavigation?appId=' + $rootScope.appId);
            },
            getProductList: function () {
                return $http.get(SERVER_URL + 'edit/getThirdNavigation?appId=' + $rootScope.appId);
            },
            getOrderList: function () {
                return $http.get(SERVER_URL + 'edit/getOrders?appId=' + $rootScope.appId);
            },

            updateProductList: function (data) {
                return $http.post(SERVER_URL + 'edit/updateThirdNavi', data);
            },
            checkCategory: function (data) {
                return $http.post(SERVER_URL + 'edit/checkSecondNavi', data);
            },
            deleteCategoryData: function (data) {
                return $http.post(SERVER_URL + 'edit/deleteSecondNavi', data);
            },

            updateInventory: function (data) {
                return $http.post(SERVER_URL + 'edit/updateInventory', data);
            },

            saveEmailDeliInfo: function (data) {
                return $http.post(SERVER_URL + 'edit/saveEmailDeliInfo', data);
            },
            updateEmailSettings: function (data) {
                return $http.post(SERVER_URL + 'edit/updateEmailSettings', data);
            },
            updateHeaderFooterSettings: function (fileHeader,fileFooter, data) {
                return Upload.upload({
                    url: SERVER_URL + 'edit/updateHeaderFooterSettings',
                    fields: data,
                    file: [fileHeader,fileFooter]
                });
            },
            sendTestEmail: function (data) {
                return $http.post(SERVER_URL + 'edit/sendTestEmail', data);
            },
            getEmailSettings: function (data) {
                return $http.post(SERVER_URL + 'edit/getEmailSettings', data);
            },
            getAllSiteType: function () {
                return $http.get(SERVER_URL + 'edit/getAllSiteType');
            },
            getAllMeasurementType: function () {
                return $http.get(SERVER_URL + 'edit/getAllMeasurementType');
            },
            getAllTimeAndRegion: function () {
                return $http.get(SERVER_URL + 'edit/getAllTimeAndRegion');
            },
            deleteProducts: function (data) {
                return $http.post(SERVER_URL + 'edit/deleteThirdNavigation', data);
            },
            updateOrders: function (data) {
                return $http.post(SERVER_URL + 'edit/updateOrders', data)
            }

        };
    }
})();
