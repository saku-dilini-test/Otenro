/**
 * Created by udeshikaperera on 26/08/2015.
 */
(function() {
    angular.module('appEdit').service('commerceService', [
        '$mdDialog', '$http','$rootScope','Upload', 'SERVER_URL','toastr', commerceService
    ]);

    function commerceService($mdDialog, $http,$rootScope,Upload,SERVER_URL,toastr) {
        return {
            showCommerceDialog: function() {
                return $mdDialog.show({
                    controller: 'CommerceCtrl',
                    templateUrl: 'user/edit/commerce/manageCatView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                });
            },
            showCommerceImageEditDialog: function(imageUrl,catId) {
                return $mdDialog.show({
                    controller: 'catEditImageCtrl',
                    templateUrl: 'user/edit/commerce/categoryImageEdit.html',
                    clickOutsideToClose: true,
                    locals : {
                        imageUrl : imageUrl,
                        catId : catId
                    }
                }).then(function(answer) {

                });
            },
             showAddProductsDialog: function() {
                            return $mdDialog.show({
                                controller: 'CommerceCtrl',
                                templateUrl: 'user/edit/commerce/addPro.html',
                                clickOutsideToClose: true
                            }).then(function(answer) {

                                //$scope.status = 'You said the information was "' + answer + '".';
                            });
                        },
            addCategory: function(file,category){
                console.log(file);
                //$http.post(SERVER_URL+ 'edit/deleteProduct',data)
                return Upload.upload({
                    url: SERVER_URL + 'edit/addSecondNavigation',
                    fields: {
                        'appId':$rootScope.appId,
                        'name': category.name,
                        'desc': category.desc,
                        'mainId' : category.mainId
                    },
                    file : file
                });
            },
            updateProductImage: function(file,imageUrl,proId,appId){
                return Upload.upload({
                    url: SERVER_URL + 'edit/updateThirdNaviImage',
                    fields: {
                        'imageUrl': imageUrl,
                        'categoryId' : proId,
                        'appId' : appId

                    },
                    file: file
                });
            },
            updateCategoryImage: function(file,imageUrl,catId,appId){
                return Upload.upload({
                    url: SERVER_URL + 'edit/updateSecondNaviImage',
                    fields: {
                        'imageUrl': imageUrl,
                        'categoryId' : catId,
                        'appId' : appId
                    },
                    file: file
                });
            },
            addProduct: function(file,product){
                return Upload.upload({
                    url: SERVER_URL + 'edit/addThirdNavigation',
                    fields: {
                        appId:$rootScope.appId,
                        name: product.name,
                        price: product.price,
                        childId: product.childId,
                        desc: product.desc,
                        discount: product.discount
                    },
                    file: file
                });
            },

            showCommerceAddCatDialog: function(){
                return $mdDialog.show({
                    controller: 'CommerceCtrl',
                    templateUrl: 'user/edit/commerce/addCat.html',
                    clickOutsideToClose: true
                }).then(function(answer) {

                    //$scope.status = 'You said the information was "' + answer + '".';
                });
            },
            showOrderDialog: function() {
                return $mdDialog.show({
                    controller: 'CommerceCtrl',
                    templateUrl: 'user/edit/commerce/manageOrderView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                });
            },
            showInventoryDialog: function() {
                return $mdDialog.show({
                    controller: 'CommerceCtrl',
                    templateUrl: 'user/edit/commerce/manageInventoryView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                });
            },
            showShippingDialog: function() {
                return $mdDialog.show({
                    controller: 'CommerceCtrl',
                    templateUrl: 'user/edit/commerce/manageShippingView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                });
            },
            showAddShippingOptionDialog: function() {
                return $mdDialog.show({
                    controller: 'CommerceCtrl',
                    templateUrl: 'user/edit/commerce/addShippingOptionView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            showTaxesDialog: function() {
                return $mdDialog.show({
                    controller: 'CommerceCtrl',
                    templateUrl: 'user/edit/commerce/manageTaxesView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            showAddTaxOptionDialog: function() {
                return $mdDialog.show({
                    controller: 'CommerceCtrl',
                    templateUrl: 'user/edit/commerce/addTaxOptionView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            showEmailSettingsDialog: function() {
                return $mdDialog.show({
                    controller: 'CommerceCtrl',
                    templateUrl: 'user/edit/commerce/manageEmailSettingsView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            showStoreSettingsDialog: function() {
                return $mdDialog.show({
                    controller: 'CommerceCtrl',
                    templateUrl: 'user/edit/commerce/manageStoreSettingsView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            showAddNewUserDialog: function() {
                return $mdDialog.show({
                    controller: 'CommerceCtrl',
                    templateUrl: 'user/edit/commerce/addNewUserView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            getInventoryList: function(){
                return $http.get(SERVER_URL+ 'edit/getInventoryList?appId='+$rootScope.appId);
            },
            getMainMenuList: function(){
                return $http.get(SERVER_URL+ 'edit/getMainNavigation?appId='+$rootScope.appId);
            },
            getCategoryList: function(){
                return $http.get(SERVER_URL+ 'edit/getSecondNavigation?appId='+$rootScope.appId);
            },
            updateCategoryList : function(data){
                return $http.post(SERVER_URL+ 'edit/updateSecondNavi',data);
            },
            getProductList: function(){
                return $http.get(SERVER_URL+ 'edit/getThirdNavigation?appId='+$rootScope.appId);
            },
            getOrderList: function(){
                return $http.get(SERVER_URL+ 'edit/getOrders?appId='+$rootScope.appId);
            },

            updateProductList : function(data){
                return $http.post(SERVER_URL+ 'edit/updateProduct',data);
            },
            checkCategory : function(data){
                return $http.post(SERVER_URL+ 'edit/checkSecondNavi',data);
            },
            deleteCategoryData : function(data){
                return $http.post(SERVER_URL+ 'edit/deleteSecondNavi',data);
            }
            //editStyles: function(fontData) {
            //    return $http.post(SERVER_URL + 'api/edit/addStyles', fontData);
            //}
        };
    }
})();
