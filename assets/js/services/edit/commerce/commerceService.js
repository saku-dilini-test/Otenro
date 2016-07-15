/**
 * Created by udeshikaperera on 26/08/2015.
 */
(function() {
    angular.module('appEdit').service('commerceService', [
        '$mdDialog', '$http','$rootScope','Upload', 'SERVER_URL','toastr', commerceService
    ]);

    function commerceService($mdDialog, $http,$rootScope,Upload,SERVER_URL,toastr) {
        return {
             showAddProductsDialog: function(item) {
                            return $mdDialog.show({
                                controller: 'ProductCtrl',
                                templateUrl: 'user/edit/commerce/addPro.html',
                                clickOutsideToClose: false,
                                locals : {
                                            item : item,
                                          }
                            }).then(function(answer) {

                                //$scope.status = 'You said the information was "' + answer + '".';
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

            addProduct: function(file,product,id,variants){
                return Upload.upload({
                    url: SERVER_URL + 'edit/addThirdNavigation',
                    fields: {
                        id:id,
                        appId:$rootScope.appId,
                        mainId:product.mainId,
                        detailedDesc: product.detailedDesc,
                        name: product.name,
                        childId: variants.childId,
                        desc: product.desc,
                        sku: product.sku,
                        price: variants.price,
                        quantity: variants.quantity,
                        type : product.type,
                        discount: product.discount
                    },
                    file: file
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
                    controller: 'InventoryCtrl',
                    templateUrl: 'user/edit/commerce/manageInventoryView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
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
            showPolicies:function(appId){
                return $http.get(SERVER_URL+ 'edit/showPolicies?appId='+appId);
            },
            savePolicies:function(appParams){
                return $http.post(SERVER_URL+ 'edit/savePolicies',appParams);
            },
            showStoreSettings:function(appId){
                return $http.get(SERVER_URL+ 'edit/showStoreSettings?appId='+appId);
            },
            saveStoreSettings: function(appParams){
                return $http.post(SERVER_URL+ 'edit/saveStoreSettings',appParams);
            },
            getChild:function(childId){
             return $http.get(SERVER_URL+ 'edit/getChild?childId='+childId);
            },
            getUpdates:function(id){
                   return $http.get(SERVER_URL+ 'edit/getUpdates?ObjectId='+id);
            },
//            getVariants:function(idDetails){
//                return $http.get(SERVER_URL+ 'edit/getVariants?appId='+$rootScope.appId+'&childId='+idDetails);
//            },
            addPriceandVariants:function(variants,file){
                if (file!== null){
                    return Upload.upload({
                        url: SERVER_URL + 'edit/addVariants',
                        fields : variants,
                        file:file
                    });
                }else {
                    return $http.post(SERVER_URL+ 'edit/addVariants',variants);
                }

            },
            getMainMenuList: function(){
                return $http.get(SERVER_URL+ 'edit/getMainNavigation?appId='+$rootScope.appId);
            },
            getCategoryList: function(){
                return $http.get(SERVER_URL+ 'edit/getSecondNavigation?appId='+$rootScope.appId);
            },
            getProductList: function(){
                return $http.get(SERVER_URL+ 'edit/getThirdNavigation?appId='+$rootScope.appId);
            },
            getOrderList: function(){
                return $http.get(SERVER_URL+ 'edit/getOrders?appId='+$rootScope.appId);
            },

            updateProductList : function(data){
                return $http.post(SERVER_URL+ 'edit/updateThirdNavi',data);
            },
            checkCategory : function(data){
                return $http.post(SERVER_URL+ 'edit/checkSecondNavi',data);
            },
            deleteCategoryData : function(data){
                return $http.post(SERVER_URL+ 'edit/deleteSecondNavi',data);
            },

            updateInventory : function(data){
                return $http.post(SERVER_URL+ 'edit/updateInventory',data);
            },

            saveEmailDeliInfo: function (data) {
                return $http.post(SERVER_URL + 'edit/saveEmailDeliInfo', data);
            },
            updateEmailSettings: function (data) {
                return $http.post(SERVER_URL + 'edit/updateEmailSettings', data);
            },
            sendTestEmail: function (data) {
                return $http.post(SERVER_URL + 'edit/sendTestEmail', data);
            },
            getEmailSettings : function(data){
                return $http.post(SERVER_URL+ 'edit/getEmailSettings',data);
            },
            getAllSiteType: function(){
                return $http.get(SERVER_URL + 'edit/getAllSiteType');
            },
            getAllMeasurementType: function(){
                return $http.get(SERVER_URL + 'edit/getAllMeasurementType');
            },
            getAllTimeAndRegion: function(){
                return $http.get(SERVER_URL + 'edit/getAllTimeAndRegion');
            },
            deleteProducts: function(data){
                return $http.post(SERVER_URL+ 'edit/deleteThirdNavigation',data);
            },
            updateOrders: function(data){
                return $http.post(SERVER_URL+ 'edit/updateOrders',data)
            }

        };
    }
})();
