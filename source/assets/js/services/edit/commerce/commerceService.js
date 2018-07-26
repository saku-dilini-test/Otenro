/**
 * Created by udeshikaperera on 26/08/2015.
 */
(function () {
    angular.module('appEdit').service('commerceService', [
        '$mdDialog', '$http', '$rootScope', 'Upload', 'SERVER_URL', 'toastr','inventoryService','appEditResource', '$auth',
         commerceService
    ]);

    function commerceService($mdDialog, $http, $rootScope, Upload, SERVER_URL, inventoryService,appEditResource,$auth) {
        return {
            showAddProductsDialog: function (item, isNew, secItem, itemID, isAddVariant) {
                return $mdDialog.show({
                    controller: 'ProductCtrl',
                    templateUrl: 'user/edit/commerce/addPro.html',
                    clickOutsideToClose: false,
                    resolve:{
                        productService:'productService',
                        initialData:['productService','$q', function(productService,$q){
                            //$log.debug("::P::PPP::PP:P:P "+ item.sku);
                            if('products'== item) {
                                item= {'id':'0'};
                            }
                            if(itemID){
                                item.id = itemID;
                            }
                            return $q.all({
                                isNewItem: isNew,
                                addVariant: isAddVariant,
                                productItem: item,
                                product:productService.get({'productId':item.id}).$promise.then(function(product){
                                    if(itemID == '0'){
                                        product = item;
                                    }else{
                                        product.sku = item.sku;
                                        product.selection = item.selection;
                                        if(secItem){
                                            product.variants = secItem;
                                        }
                                    }
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


            //Get  One order Details
            showOneOrderDialog: function() {
                return $mdDialog.show({
                    controller: 'CommerceCtrl',
                    templateUrl: 'user/edit/engage/OrderDetailsView.html',
                    clickOutsideToClose: true,
                    locals: {
                        selectedTab: 0
                    }
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },


            updateCategoryImage: function (Data) {

                return $http.post(SERVER_URL + 'edit/updateSecondNaviImage', Data);

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
                    clickOutsideToClose: true,
                    locals: {
                        selectedTab: 0
                    }
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
                    clickOutsideToClose: true,
                    locals: {
                        selectedTab: 0
                    }
                }).then(function (answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            showStoreSettingsDialog: function (selectedTab) {
                return $mdDialog.show({
                    controller: 'CommerceCtrl',
                    templateUrl: 'user/edit/commerce/manageStoreSettingsView.html',
                    clickOutsideToClose: true,
                    locals: {
                        selectedTab: selectedTab
                    }
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
                    clickOutsideToClose: true,
                    locals: {
                        selectedTab: 0
                    }
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
                return $http.get(SERVER_URL + 'edit/getAllCategoryWithoutMakingCommerce?appId='+ $rootScope.appId);
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
            updateHeaderFooterSettings: function (data) {
                return $http.post(SERVER_URL + 'edit/updateHeaderFooterSettings', data);

//                return Upload.upload({
//                    url: SERVER_URL + 'edit/updateHeaderFooterSettings',
//                    fields: data,
//                    file: [fileHeader]
//                });
            },
            sendTestEmail: function (data) {
                return $http.post(SERVER_URL + 'edit/sendTestEmail', data);
            },
            sendVerificationLinkEmail: function (data) {
                return $http.post(SERVER_URL + 'edit/sendVerificationLinkEmail', data);
            },
            sendRegisterVerificationLinkEmail: function (data) {
                return $http.post(SERVER_URL + 'edit/sendRegisterConfirmationEmail', data);
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
            checkUniqueSku: function(data){
                return $http.post(SERVER_URL + 'edit/checkUniqueSku', data)
            },
            showDeleteAppDialog : function () {
                return $mdDialog.show({
                    controllerAs: 'dialogCtrl',
                    controller: function($mdDialog,appEditResource,toastr,$rootScope,$state){
                        this.confirm = function click(){
                            appEditResource.deleteSelectedApp({appId:$rootScope.appId,isNew:$rootScope.tempNew,userId:$rootScope.userId}).success(function(data) {
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
            },
            showRemoveDefaultDataDialog : function () {
                return $mdDialog.show({
                    controllerAs: 'dialogCtrl',
                    controller: function($mdDialog,appEditResource,toastr,$rootScope,$state,ME_APP_SERVER,mySharedService,$auth,$scope){
                        this.confirm = function click(){
                            appEditResource.deleteDefaultData({appId:$rootScope.appId,isNew:$rootScope.tempNew,userId:$auth.getPayload().id}).success(function(data) {
                                if (data.massage){
                                    toastr.success('You cant delete this app because this app already have send for publishing ', 'Sorry!', {
                                        closeButton: true
                                    });
                                }else {
                                    toastr.success('Successfully Removed ', 'Done!', {
                                        closeButton: true
                                    });
                                    var urlPath;

                                    if($rootScope.tempNew == 'true' || $rootScope.tempNew == true){
                                     urlPath =  SERVER_URL +"progressiveTemplates/viewProgUrl?userId="+ $auth.getPayload().id
                                                   +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"/";

                                    $scope.appTemplateUrl = urlPath +
                                    'src'+new Date().getTime();
                                    mySharedService.prepForBroadcast($scope.appTemplateUrl);
                                    }else{
                                    urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                                                  +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"/";

                                    $scope.appTemplateUrl = urlPath+'' +
                                                                        '#/app/home/id?'+new Date().getTime();
                                    }
                                    $scope.appTemplateUrl = urlPath+'' +
                                    '#/app/home/id?'+new Date().getTime();
                                    mySharedService.prepForBroadcast($scope.appTemplateUrl);
                                    //$state.go('user.dashboard');
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
                    '<h1>Deleting Demo Data </h1>' +
                    '</div>' +
                    '<br>'+
                    '<div style="text-align:center">' +
                    '<lable>Are you sure, you want to delete all demo data ?</lable>' +
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
            },
            //Get  One order Details
            showAnalyticsDialog: function() {
                return $mdDialog.show({
                    controller: 'analyticsCtrl',
                    templateUrl: 'user/edit/analytics/analytics.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },

            getSalesSummary :function (data) {
                return $http.post(SERVER_URL + 'reports/getSalesSummary', data);
            },
            getTaxSummary :function (data) {
                return $http.post(SERVER_URL + 'reports/getTaxSummary', data);
            },
            getShippingSummary :function (data) {
                return $http.post(SERVER_URL + 'reports/getShippingSummary', data);
            },
            getChartData :function (data) {
                return $http.post(SERVER_URL + 'reports/getChartData', data);
            },
            uploadFile: function(appParams){

                return $http.post(SERVER_URL + 'edit/uploadFile', appParams);

//                var dataURItoBlob = function(dataURI) {
//                    var binary = atob(dataURI.split(',')[1]);
//                    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//                    var array = [];
//                    for(var i = 0; i < binary.length; i++) {
//                        array.push(binary.charCodeAt(i));
//                    }
//                    return new Blob([new Uint8Array(array)], {type: mimeString});
//                };
//
//                var blob = dataURItoBlob(file);
//                var UploadFile = new File([blob], 'imageFileName.png');
//
//                return Upload.upload({
//                    url: SERVER_URL + 'edit/uploadFile',
//                    fields: {
//                        'appId' : appId,
//                        'userId' : userId,
//                        'uploadedFileType' : uploadedFileType
//                    },
//                    file: UploadFile
//                });
            },
            deleteAboutUsImage : function(data){
                return $http.post(SERVER_URL+ 'edit/deleteFile',data);
            },
             getProdTypeData: function(){
                 return $http.get(SERVER_URL + "get/getMainProdTypes");
             },

             showPreviewBlogDialog: function(data) {
                 return $mdDialog.show({
                     controller: 'BlogCtrl',
                     templateUrl: 'user/edit/commerce/previewBlogs.html',
                     clickOutsideToClose: true,
                     locals : {
                         initialData : data
                     }
                 });
             },
            showPublishBlogDialog: function(data) {
                return $mdDialog.show({
                    controller: 'BlogCtrl',
                    templateUrl: 'user/edit/commerce/publishBlogs.html',
                    clickOutsideToClose: true,
                    locals : {
                        initialData : data
                    }
                });
            },
            getBlogsList: function(){
                return $http.get(SERVER_URL+ 'edit/getBlogs?appId='+$rootScope.appId);
            },

            publishBlog: function(file,id,title,desc,shortDesc,appId,isNewBlog,isImageUpdate){
                var UploadFile = '';
                if(isImageUpdate == true){
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
                UploadFile = new File([blob], 'imageFileName.png');
                }

                return Upload.upload({
                    url: SERVER_URL + 'edit/publishBlog',
                    fields: {
                        'id' : id,
                        'title' : title,
                        'desc' : desc,
                        'shortDesc' : shortDesc,
                        'appId' : appId,
                        'isNewBlog' : isNewBlog,
                        'isImageUpdate' : isImageUpdate
                    },
                    file: UploadFile
                });
            },
            deleteBlog: function(data){
                return $http.post(SERVER_URL+ 'edit/deleteBlog',data);
            },

            showAddNewLocationDialog: function (branch) {
                return $mdDialog.show({
                    templateUrl: 'user/edit/commerce/addNewLocation.html',
                    clickOutsideToClose: false,
                    locals: {
                        branch : branch
                    },
                    controller: 'BranchCtrl'

                }).then(function (answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },

        };
    }
})();
