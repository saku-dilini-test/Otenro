/**
 * Created by udeshikaperera on 26/08/2015.
 */
(function () {
    angular.module('appEdit').service('commerceService', [
        '$mdDialog', '$http', '$rootScope', 'Upload', 'SERVER_URL', 'toastr','inventoryService','appEditResource', commerceService
    ]);

    function commerceService($mdDialog, $http, $rootScope, Upload, SERVER_URL, inventoryService,appEditResource) {
        return {
            showAddProductsDialog: function (item) {
                return $mdDialog.show({
                    controller: 'ProductCtrl',
                    templateUrl: 'user/edit/commerce/addPro.html',
                    clickOutsideToClose: false,
                    resolve:{
                        productService:'productService',
                        initialData:['productService','$q', function(productService,$q){
                            //console.log("::P::PPP::PP:P:P "+ item.sku);
                            if('products'== item) {
                                item= {'id':'0'};
                            }
                            return $q.all({
                                product:productService.get({'productId':item.id}).$promise.then(function(product){
                                    product.sku = item.sku;
                                    return product;
                                })
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
            
            
            //service of  add or update product
            addOrUpdateProducts: function (appParams) {
                return $http.post(SERVER_URL + 'edit/thirdNavigation/addOrUpdateProduct', appParams);
            },



            // When upload third Navigation images send to server to update
            /*addProductImages: function (file,id) {

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
            },*/


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
                                  inventoryList : inventoryService.query({appId:$rootScope.appId}).$promise

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
            sendVerificationLinkEmail: function (data) {
                return $http.post(SERVER_URL + 'edit/sendVerificationLinkEmail', data);
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
            },
            showDeleteAppDialog : function () {
                return $mdDialog.show({
                    controllerAs: 'dialogCtrl',
                    controller: function($mdDialog,appEditResource,toastr,$rootScope,$state){
                        this.confirm = function click(){
                            appEditResource.deleteSelectedApp({appId:$rootScope.appId}).success(function(data) {
                                if (data.massage){
                                    toastr.success('You cant delete this app because this app already have send for publishing ', 'Sorry!', {
                                        closeButton: true
                                    });
                                }else {
                                    toastr.success('Successfully deleted ', 'Done!', {
                                        closeButton: true
                                    });
                                    $state.go('user.dashboard');
                                }
                                $mdDialog.hide();

                            }).error(function(err) {
                                toastr.error('Cant Build', 'Error', {
                                    closeButton: true
                                });
                            });
                        },
                            this.cancel = function click(){
                                $mdDialog.hide();
                            }
                    },
                    template:'<md-dialog aria-label="Edit Child Menu">'+
                    '<md-content >' +
                    '<div class="md-dialog-header">' +
                    '<h1>Deleting Application </h1>' +
                    '</div>' +
                    '<br>'+
                    '<div style="text-align:center">' +
                    '<lable>Are you sure, you want to delete this Application ?</lable>' +
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
            }
        };
    }
})();
