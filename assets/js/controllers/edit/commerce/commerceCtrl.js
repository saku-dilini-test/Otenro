(function() {
    'use strict';
    angular.module("appEdit").controller("CommerceCtrl", [
        '$scope', '$mdDialog', 'toastr','commerceService','$rootScope','SERVER_URL','$auth','ME_APP_SERVER',
        CommerceCtrl]);

    function CommerceCtrl($scope, $mdDialog,toastr, commerceService,$rootScope,SERVER_URL,$auth,ME_APP_SERVER) {
        $scope.selectedTab = 0;
        $scope.miniLightBoxShow = false;
        $scope.shippingOptionParams = {
              secondLocked:  true,
              thirdLocked:  true,
              countrySelectionLocked: true
        };
        $scope.userId=$auth.getPayload().id;
        $scope.appId=$rootScope.appId;
        $scope.SERVER_URL = SERVER_URL;
        $scope.imageURL = SERVER_URL+
            "edit/viewImages?userId="+$scope.userId
            +"&appId="+$scope.appId+"&"
            +new Date().getTime();

        $scope.thumbPic = ME_APP_SERVER+'temp/' +$auth.getPayload().id+'/templates/'+$rootScope.appId+'/img/default.jpg';
        $scope.categoryIdList={};

        if (typeof $scope.mainMenus === 'undefined') {
            commerceService.getMainMenuList()
                .success(function (result) {
                    $scope.mainMenus = result;
                }).error(function (error) {
                    alert("MainMenu Loading Error : " + error);
                })
        }

        if (typeof $scope.categories === 'undefined') {
            commerceService.getCategoryList()
                .success(function (result) {
                    $scope.categories = result;
                }).error(function (error) {
                    alert("Category Loading Error : " + error);
                })
        }

        if (typeof $scope.products === 'undefined') {
            commerceService.getProductList()
                .success(function (result) {
                    $scope.products = result;
                    for(var i=0 ;i<$scope.products.length ;i++){
                        $scope.categoryIdList[i]=$scope.products[i].categoryId ;
                    }
                }).error(function (error) {
                    alert("Category Loading Error : " + error);
                })

        }
        if (typeof $scope.inventoryList === 'undefined') {
                    commerceService.getInventoryList()
                        .success(function (result) {
                            $scope.inventoryList = result;
                        }).error(function (error) {
                            alert("Inventory Loading Error : " + error);
                        })
                }

        if (typeof $scope.ordersList === 'undefined') {
            commerceService.getOrderList()
                .success(function (result) {
                    $scope.ordersList = result;
                }).error(function (error) {
                    alert("Orders List Loading Error : " + error);
                })
        }

        $scope.addCategory = function(file, category) {
            console.log(category );
            commerceService.addCategory(file,category)
                .progress(function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function(data, status, headers, config) {
                    $scope.categories.push({name: name,categoryDesc: category.desc,imageUrl: data.appId.imageUrl});
                    //toaster.success("Successfully added");
                    alert("success", 'Awsome! ', ' New Category has been added.!');
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                    return commerceService.showCommerceDialog('category');
                }).error(function(data, status, headers, config) {
                    //alert('warning', "Unable to get templates", err.message);
                })
        };

        $scope.updateCategory= function(){
            var prams={
                childList : $scope.categories,
                appId : $rootScope.appId
            };

            commerceService.updateCategoryList(prams)
                .success(function() {
                    alert("success", 'Awsome! ', 'Category has been Updated.!');
                    $mdDialog.hide();
                }).error(function(err) {
                    alert('warning', "Unable to Updated", err.message);
                })

        };

        $scope.addProducts = function(file,product) {
            commerceService.addProduct(file,product).
                success(function(data) {
                    toastr.success('New Product has been added.', 'Awsome!', {
                        closeButton: true
                    });
                }).error(function(err) {
                    toastr.error('Unable to Add', 'Warning', {
                        closeButton: true
                    });
                });
        };

        $scope.updateProduct= function(){
            var prams={
                subChildList : $scope.products,
                appId : $rootScope.appId
            };
            commerceService.updateProductList(prams)
                .success(function() {
                    toastr.success('ThirdNavigation has been Updated.!', 'Awsome! ', {
                        closeButton: true
                    });
                    $mdDialog.hide();
                }).error(function(err) {
                    toastr.error('Unable to Updated', 'Warning', {
                        closeButton: true
                    });
                })
        };


        $scope.deleteCategory=function($index){
            var prams={
                categoryID : $scope.categories[$index].id,
                appId : $rootScope.appId,
                imageUrl : $scope.categories[$index].imageUrl
            };
            commerceService.checkCategory(prams)
                .success(function(data) {
                    if(data.message == 'Yes'){
                        //alert("Product Exist");
                        toastr.error('Product Exist', 'Warning', {
                            closeButton: true
                        });
                    }else{
                        $scope.categories.splice($index, 1);
                        commerceService.deleteCategoryData( prams)
                            .success(function() {
                                toastr.success('Second Navigation has been Deleted ', 'Deleted', {
                                    closeButton: true
                                });
                            }).error(function(err) {
                                toastr.error('Unable to Delete', 'Warning', {
                                    closeButton: true
                                });
                            })
                    }
                }).error(function(err) {
                    toastr.error('Unable to Updated', 'Warning', {
                        closeButton: true
                    });
                })
        };


        $scope.deleteProduct=function($index){
            if (confirm("Do want delete it .? ") == true){
                var prams={
                    productId : $scope.products[$index]._id,
                    appId : $rootScope.appId,
                    imageUrl : $scope.products[$index].imageUrl
                };
                $scope.products.splice($index, 1);
                commerceService.deleteProductData(prams)
                    .success(function() {
                        toastr.success('Third Navigation has been Deleted', 'Deleted', {
                            closeButton: true
                        });
                    }).error(function(err) {
                        toastr.error('Unable to Updated', 'Warning', {
                            closeButton: true
                        });
                    })
            }

        };

        $scope.editCat=function(imageUrl,$id){
           return commerceService.showCommerceImageEditDialog(imageUrl,$id);
        };

        $scope.editProImage=function(imageUrl,$proId){
           return commerceService.showCommerceProImageEditDialog(imageUrl,$proId);
        };

        $scope.addNewPro=function(){
           return commerceService.showCommerceAddProDialog();
        };

        $scope.catListChange=function($index){
           $scope.products[$index].categoryId=$scope.categoryIdList[$index];
        };

        $scope.addProFinish=function(){
            return commerceService.showAddProductsDialog('products');
        };

        $scope.addNewCat=function(){
            return commerceService.showCommerceAddCatDialog();
        };

        $scope.addCatFinish=function(){
            return commerceService.showCommerceDialog('category');
        };

        $scope.moveToFlatRateOption=function(){
            $scope.shippingOptionParams = {
                  secondLocked:  false,
                  thirdLocked:  true,
                  countrySelectionLocked: false
            };
            $scope.selectedTab = 1;
        };

        $scope.moveToWeightBasedOption=function(){
            $scope.shippingOptionParams = {
                  secondLocked:  true,
                  thirdLocked:  false,
                  countrySelectionLocked: false
            };
            $scope.selectedTab = 2;
        };

        $scope.openMiniLightBox = function(){
            $scope.miniLightBoxShow = true;
        };

        $scope.closeMiniLightBox = function(){
            $scope.miniLightBoxShow = false;
        };

        $scope.addShippingOption=function(){
            return commerceService.showAddShippingOptionDialog();
        };

        $scope.addTaxOption=function(){
            return commerceService.showAddTaxOptionDialog();
        };

        $scope.addNewUser=function(){
            return commerceService.showAddNewUserDialog();
        };


        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function() {
            $mdDialog.hide();
        };


    }
})();
