(function () {
    'use strict';
    angular.module("appEdit").controller("ProductCtrl", [
        '$scope', '$mdDialog', 'toastr', 'commerceService','productService', '$rootScope', '$auth', 'ME_APP_SERVER','initialData',
        ProductCtrl]);

    function ProductCtrl($scope, $mdDialog, toastr, commerceService, productService, $rootScope,  $auth, ME_APP_SERVER,initialData) {
        var size, weight;
        var variants;

        $scope.tmpImage = [];
        $scope.product = initialData.product;
        if (initialData.product.tempImageArray){

            for (var i=0; i<initialData.product.tempImageArray.length; i++) {
                console.log(initialData.product.tempImageArray[i].img);
               $scope.tmpImage.push(ME_APP_SERVER + 'temp/' + $auth.getPayload().id + '/templates/' + $rootScope.appId +
                                    '/img/thirdNavi/' + initialData.product.tempImageArray[i].img);
            }
        }


        if(!initialData.product.id){
            $scope.product = {'appId':$rootScope.appId}
        }


        $scope.finelImages = [];
        $scope.tmpImageIndex = [];
        $scope.mainImg = null;

        $scope.tmpFile = [null, null];
        $scope.mainFile = null;

        $scope.selection = "size";
        $scope.userId = $auth.getPayload().id;
        $scope.isDigital = false;

        // Maximum Product Name, Des and Sku Length Defined
        $scope.maxLengthName = 15;
        $scope.maxLengthDesc = 100;
        $scope.maxLengthSku = 10;
        $scope.enableTab = "true";
        $scope.productTypes = [
                                {type:'Physical', description:'An item that is shipped to your customers',status:''},
                                {type:'Digital', description:'Content that is downloaded',status:'[Coming Soon]'},
                                {type:'Services', description:'Provide a Service',status:'[Coming Soon]'}
                             ];

        $scope.myImage='';
        $scope.myCroppedImage='';

        /**
         * Add product type to the new product
         * @param type
         * @param current
         */
        $scope.addType = function (type, current) {
            $scope.product.type = type.type;
            $scope.selectedTab = current;
        };

        /**
         * General details of a product
         * @param product
         * @param current
         */
        $scope.generalDetails = function (product, current) {
            $scope.enableTab = "false";
            //When new product is adding to the system
            if(!$scope.product.variants){
                $scope.product.variants = [];
                $scope.product.variants.push({"sku":product.sku,"name":product.name})
            }
            $scope.selectedTab = current;
        };

        /**
         * Product variants tab, add variant of a product.
         * @param product
         * @param index
         * @param variants
         */
        $scope.addVariant = function (product,index,variants) {
            if(variants.sku == 0 || variants.price == 0 || variants.quantity == 0
                || variants.size == ""){
                toastr.error('Fill all the existing fields before adding a new field', 'Warning', {
                    closeButton: true
                });
            }
            else{
                $scope.inserted = {
                    sku: null,
                    name: product.name,
                    price: null,
                    quantity: null
                };
                $scope.product.variants.push($scope.inserted);
            }
        };
        /**
         * Delete a Variant from a product
         * @param index
         * @param variants
         */
        $scope.deleteVariant = function (index,variants) {
            $scope.product.variants.splice(index, 1);
        };

        $scope.addProductVariants = function (selection, variants,current) {
            console.log("<><><><><><>< ")
            console.log("<><><><><><>< "+ JSON.stringify($scope.product))
            console.log("<><><><><><>< ")
            $scope.selection = selection;
            $scope.selectedTab = current;
        };

        $scope.cropImage = function () {

            var handleFileSelect=function(evt) {

                var file=evt.currentTarget.files[0];
                var reader = new FileReader();

                reader.onload = function (evt) {
                    $scope.$apply(function($scope){
                        $scope.myImage=evt.target.result;
                        $scope.picFile =  $scope.myImage;
                    });
                };
                reader.readAsDataURL(file);
            };
            angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        };




        $scope.thumbPic = ME_APP_SERVER + 'temp/' + $auth.getPayload().id + '/templates/' + $rootScope.appId + '/img/thirdNavi/default.jpg';

        if (typeof $scope.categories === 'undefined') {

            commerceService.getCategoryList()
                .success(function (result) {
                    $scope.categories = result;
                }).error(function (error) {
                toastr.error('Loading Error', 'Warning', {
                    closeButton: true
                });
            })
        }

        if (typeof $scope.mainMenu == 'undefined') {
            commerceService.getMainMenuList()
                .success(function (result) {
                    if (result == '') {
                        $scope.mainMenuHide = true;
                        commerceService.getCategoryList()
                            .success(function (secondResult) {
                                $scope.child = secondResult;

                                if (secondResult[0].templateName == 'foodDemoApp' || secondResult[0].templateName == 'foodDemoApp2'
                                    || secondResult[0].templateName == 'clothingApp' || secondResult[0].templateName == 'ECommerceApp') {
                                    $scope.childMenuHide = false;
                                }
                            }).error(function (error) {
                            toastr.error('Loading Error', 'Warning', {
                                closeButton: true
                            });
                        })
                    }
                    else {
                        $scope.mainMenuHide = false;
                        $scope.childMenuHide = false;
                        $scope.mainMenu = result;
                    }

                }).error(function (error) {
                toastr.error('Loading Error', 'Warning', {
                    closeButton: true
                });
            })
        }





        $scope.nextStep3Digital = function (current, product, variants) {
            if (variants.price == null) {
                toastr.error('Fill all the fields', 'Warning', {
                    closeButton: true
                });
            } else {
                $scope.selectedTab = current;
                $scope.variantsList = [{
                    sku: product.sku,
                    name: product.name,
                    price: variants.price
                }];

            }
        };




        $scope.typeUpdateHandler = function (newValue) {
            $scope.variants[0].type = newValue;
        };
        $scope.nameUpdateHandler = function (newValue) {
            $scope.variants[0].name = newValue;
        };
        $scope.sizeUpdateHandler = function (newValue) {
            $scope.variants[0].size = newValue;
        };
        $scope.priceUpdateHandler = function (newValue) {
            $scope.variants[0].price = newValue;
        };
        $scope.quantityUpdateHandler = function (newValue) {
            $scope.variants[0].quantity = newValue;
        };

//
//        if (typeof item != 'string') {
//            commerceService.getUpdates(item.productId)
//                .success(function (result) {
//                    $scope.product = result[0];
//                    $scope.selectedLink = $scope.product.type;
//                    $scope.product.sku = item.sku;
//                    $scope.oldsku = $scope.product.sku;
//                    if($scope.product.sku!==undefined){
//                        $scope.product.checked = true;
//                    }
//
//                    $scope.tmpImageIndex = result[0].tempImageArray;
//                    for(var i = 0; i < result[0].tempImageArray.length; i++){
//                        if(result[0].tempImageArray[i].img != null) {
//                            $scope.tmpImage[i] = ME_APP_SERVER + 'temp/' + $auth.getPayload().id + '/templates/' + $rootScope.appId + '/img/thirdNavi/' + result[0].tempImageArray[i].img;
//                        }
//                    }
//                    var variantsList = result[0].variants;
//                    $scope.variantsList = variantsList;
//                    console.log($scope.variantsList);
//
//                    if (variantsList[0].size != null) {
//                        item.size = variantsList[0].size;
//                        $scope.variants = [{
//                            sku: item.sku,
//                            name: item.name,
//                            size: variantsList[0].size,
//                            price: item.price,
//                            quantity: item.quantity
//                        }];
//                    }
//                    else {
//                        item.size = variantsList[0].weight;
//                        $scope.variants = [{
//                            sku: item.sku,
//                            name: item.name,
//                            size: variantsList[0].weight,
//                            price: item.price,
//                            quantity: item.quantity
//                        }];
//                    }
//                    commerceService.getChild(result[0].childId)
//                        .success(function (data) {
//                            $scope.child = data;
////                           $scope.child = data[0];
////                           $scope.child = data[0].name;
//                        }).error(function (error) {
//                        toastr.error('Loading Error', 'Warning', {
//                            closeButton: true
//                        });
//                    });
//
//
//                }).error(function (error) {
//                toastr.error('Loading Error', 'Warning', {
//                    closeButton: true
//                });
//            });
//        }


        /**
         * add or update product
         */
        $scope.addOrUpdateProducts = function () {
              if ($scope.tmpImage.length<=0){
                  toastr.error('Please add at least one image', 'Warning', {
                      closeButton: true
                  });
              }else {
                  commerceService.addOrUpdateProducts({'productImages': $scope.tmpImage,'product':$scope.product}).success(function (result) {
                      toastr.success('New Product has been added to the inventory.', 'Awsome!', {
                          closeButton: true
                      });
                      $mdDialog.hide();
                  }).error(function (err) {
                      toastr.error('Unable to Add', 'Warning', {
                          closeButton: true
                      });
                      $mdDialog.hide();

                  });

              }

        };




            //console.log("<>><>><><><><> "+ JSON.stringify(productFile))
//            if ($scope.categories[0].templateName == "foodDemoApp" || $scope.categories[0].templateName == "clothingApp"
//                || $scope.categories[0].templateName == "foodDemoApp2" || $scope.categories[0].templateName == "ECommerceApp") {
//                if (file == null) {
//                    toastr.error('select image', 'Warning', {
//                        closeButton: true
//                    });
//                    return;
//                }
//                if (product.name == null) {
//                    $scope.selectedTab = 1;
//                    toastr.error('Fill all the fields', 'Warning', {
//                        closeButton: true
//                    });
//                    return;
//                }
//                if (product.type == null) {
//                    $scope.selectedTab = 0;
//                    toastr.error('Choose type', 'Warning', {
//                        closeButton: true
//                    });
//                    return;
//                }
//                else {
//                    variants = {
//                        size: size,
//                        weight: weight,
//                        price: $scope.variantsList[0].price,
//                        quantity: $scope.variantsList[0].quantity,
//                        childId: product.mainId
//                    };
//
//
//                    var variantsList = $scope.variantsList;
//                    variantsList.forEach(function (variants) {
//                        variants.childId = product.mainId;
//                    });
//                    product.selection = $scope.selection;
//                    var variantsAttribute;
//                    var tempImageArray = $scope.tmpImageIndex;
//                        commerceService.addProduct(file, product, item.id, variantsList,tempImageArray).success(function (data) {
//                        variantsList.forEach(function (variantsAttribute) {
//                            variantsAttribute.appId = $rootScope.appId;
//                            variantsAttribute.childId = product.mainId;
//                            variantsAttribute.productId = data.appId.id;
//                            variantsAttribute.id = item.id;
//                            variantsAttribute.selection = product.selection;
//
//                            commerceService.addToInventory(variantsAttribute).success(function(invnrty){
//                                $scope.invntry = invnrty;
//                            variantsAttribute.id = $scope.invntry.id;
//                            commerceService.addPriceandVariants(variantsAttribute, productFile).success(function (data) {
//                                toastr.success('New Price and Variants has been added.', 'Awsome!', {
//                                    closeButton: true
//                                });
//                                $mdDialog.hide();
//                            }).error(function (err) {
//                                toastr.error('Unable to Add', 'Warning', {
//                                    closeButton: true
//                                });
//                            });
//                            }).error(function(err){
//                                console.log(err);
//                            });
//                            });
//
//                        }).error(function (err) {
//                            toastr.error('Unable to Add', 'Warning', {
//                                closeButton: true
//                            });
//                        });
//                   // });
//
//                    toastr.success('New Product has been added.', 'Awsome!', {
//                        closeButton: true
//                    });
//                    $mdDialog.hide();
////                    inventoryService.getInventoryList()
////                        .success(function (result) {
////                            toastr.success('New Product has been added to the inventory.', 'Awsome!', {
////                                closeButton: true
////                            });
////                            $mdDialog.hide();
////                        }).error(function (err) {
////                        toastr.error('Unable to Add', 'Warning', {
////                            closeButton: true
////                        });
////                    });
//
//                }
//            }
//            else {
//                if (file == null) {
//                    toastr.error('select image', 'Warning', {
//                        closeButton: true
//                    });
//                    return;
//                }
//                if (product.childId == null || product.name == null) {
//                    $scope.selectedTab = 1;
//                    toastr.error('Fill all the fields', 'Warning', {
//                        closeButton: true
//                    });
//                    return;
//                }
//                if (product.type == null) {
//                    $scope.selectedTab = 0;
//                    toastr.error('Choose type', 'Warning', {
//                        closeButton: true
//                    });
//                    return;
//                }
//                else {
//
//                var variantsList = $scope.variantsList;
//                variantsList.forEach(function (variants) {
//                    variants.childId = product.childId;
//                });
//                var variantsAttribute;

//
//                   variantsList.forEach(function (variantsAttribute) {
//                       variantsAttribute.appId = $rootScope.appId;
//                       variantsAttribute.childId = product.mainId;
//                       variantsAttribute.productId = data.appId.id;
//                       variantsAttribute.selection = product.selection;
//
//                       commerceService.addToInventory(variantsAttribute).success(function(invnrty){
//                           $scope.invntry = invnrty;
//                       variantsAttribute.id = $scope.invntry.id;
//                       commerceService.addPriceandVariants(variantsAttribute, productFile).success(function (data) {
//                           toastr.success('New Price and Variants has been added.', 'Awsome!', {
//                               closeButton: true
//                           });
//                           $mdDialog.hide();
//                       }).error(function (err) {
//                           toastr.error('Unable to Add', 'Warning', {
//                               closeButton: true
//                           });
//                       });
//                       }).error(function(err){
//                           console.log(err);
//                       });
//                       });
//
//                   }).error(function (err) {
//                       toastr.error('Unable to Add', 'Warning', {
//                           closeButton: true
//                       });
//                   });
//                }
//            }



        $scope.setImage = function (img) {

            if (img == undefined) {
                toastr.error('Upload Image', 'Warning', {
                    closeButton: true
                });
            } else {
                $scope.picFile = $scope.tmpImage[img];
            }
        };

        $scope.setChild = function (main) {
            var childList = $scope.categories;
            var newChild = [];
            if (childList[0].mainId == undefined) {
                commerceService.getProductList()
                    .success(function (thirdResult) {
                        for (var j = 0; j < thirdResult.length; j++) {
                            if (thirdResult[j].childId == main) newChild.push(thirdResult[j]);
                        }
                    }).error(function (error) {
                    toastr.error('Loading Error', 'Warning', {
                        closeButton: true
                    });
                })
            }
            else {
                for (var i = 0; i < childList.length; i++) {
                    if (childList[i].mainId == main) newChild.push(childList[i]);
                }
            }
            $scope.child = newChild;
        };

       /* $scope.deleteImg = function (index) {
            $scope.tmpImage[index] = null;
            $scope.tmpImageIndex[index].img = null;
        };*/
        /*$scope.addImage = function (img) {
            console.log("KLKLKLKLK")
            console.log("KLKLKLKLK "+ JSON.stringify(img));
            console.log("KLKLKLKLK")
            if($scope.myImage == null){
                 toastr.error('Please choose an image', 'Message', {
                     closeButton: true
                 });
            } else{
                var im = $scope.tmpImage;
                var isPossibleAddImage = false;
                for(var i=0; i < im.length; i++){
                 if(im[i] == null){
                    isPossibleAddImage = true;
                    break;
                }
            }
            if(isPossibleAddImage){
                for (var i = 0; i < im.length; i++) {
                    if (im[i] == null) {
                        im[i] = $scope.picFile;
                        commerceService.addProductImages($scope.picFile)
                            .success(function(data){
                                $scope.tmpImageIndex[i] =  { img : ''};
                                $scope.tmpImageIndex[i]['img'] = data.fileName;
                            });
                        break;
                    }
                }
                $scope.tmpImage = im;
                $scope.mainImg = img;
                $scope.myImage=null;
                toastr.success('added Image', 'message', {
                    closeButton: true
                });
            }else{
                toastr.error('Maximum 8 image only', 'Message', {
                    closeButton: true
                });
            }
            }
        };*/

        $scope.addImage = function (img) {

            if($scope.tmpImage.length < 8 && img && angular.element('#fileInput').val()!=''){
                $scope.tmpImage.push(img);
                angular.element('#fileInput').val(null);
                $scope.picFile = null;
                $scope.myImage=null;
            }
            else if(angular.element('#fileInput').val() == ''){
                toastr.error('Please choose an image to upload', 'Warning', {
                    closeButton: true
                });
            }
            else{
                toastr.error('Only 8 images allowed', 'Warning', {
                    closeButton: true
                });
            }
        };

        $scope.deleteImg = function (index) {
            $scope.tmpImage.splice(index, 1);
            if ($scope.product.tempImageArray&&$scope.product.tempImageArray.length > 0){
                $scope.product.tempImageArray.splice(index, 1);
            }
        };


        $scope.setFile = function (file) {
            if (file == undefined) {
                toastr.error('Upload File', 'Warning', {
                    closeButton: true
                });
            } else {
                $scope.File = $scope.tmpFile[file];
            }
        };


        $scope.deleteFile = function (index) {
            $scope.tmpFile[index] = null;
        };

        $scope.addFile = function (file) {
            if (typeof file == 'undefined') {
                toastr.error('First select image and then upload image', 'Message', {
                    closeButton: true
                });
            } else {
                var fi = $scope.tmpFile;
                for (var i = 0; i < fi.length; i++) {
                    if (fi[i] == null) {
                        fi[i] = $scope.File;
                        break;
                    }
                }
                $scope.tmpFile = fi;
                $scope.mainFile = file;
                toastr.success('added file', 'message', {
                    closeButton: true
                });
            }
        };

        $scope.nextStep = function (current) {
            $scope.selectedTab = current;
        };

        $scope.answer = function () {
            $mdDialog.hide();
        };
    }
})();