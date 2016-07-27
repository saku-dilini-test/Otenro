(function () {
    'use strict';
    angular.module("appEdit").controller("ProductCtrl", [
        '$scope', '$mdDialog', 'toastr', 'commerceService', '$rootScope', 'inventoryService', 'SERVER_URL', '$auth', 'ME_APP_SERVER', 'item',
        ProductCtrl]);

    function ProductCtrl($scope, $mdDialog, toastr, commerceService, $rootScope, inventoryService, SERVER_URL, $auth, ME_APP_SERVER, item) {
        var size, weight;
        var variants;
        $scope.tmpImage = [null, null, null, null, null, null, null, null];
        $scope.mainImg = null;

        $scope.tmpFile = [null, null];
        $scope.mainFile = null;

        $scope.selection = "weight";
        $scope.userId = $auth.getPayload().id;
        $scope.isDigital = false;





        $scope.myImage='';
        $scope.myCroppedImage='';

        $scope.cropeImage = function () {
            var handleFileSelect=function(evt) {
                var file=evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function($scope){
                        $scope.myImage=evt.target.result;
                        $scope.picFile =  $scope.myImage
                    });
                };
                reader.readAsDataURL(file);
            };
            angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        }



        $scope.product = {
            //name:item.name,
            //price:item.price
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
                        commerceService.getCategoryList()
                            .success(function (secondResult) {
                                $scope.mainMenu = secondResult;
                                if (secondResult[0].templateName == 'foodDemoApp' || secondResult[0].templateName == 'foodDemoApp2') {
                                    $scope.show = false;
                                }
                            }).error(function (error) {
                            toastr.error('Loading Error', 'Warning', {
                                closeButton: true
                            });
                        })
                    }
                    else {
                        $scope.mainMenu = result;
                    }

                }).error(function (error) {
                toastr.error('Loading Error', 'Warning', {
                    closeButton: true
                });
            })
        }

        $scope.addType = function (type, current) {

            $scope.product.type = type;
            $scope.selectedTab = current;
            if ($scope.product.type == 'Digital') {
                $scope.isDigital = true;
            } else {
                $scope.isDigital = false;
            }
        };

        $scope.nextStep2 = function (current, product) {
            if ($scope.categories[0].templateName == "foodDemoApp" || $scope.categories[0].templateName == "foodDemoApp2") {
                if (product.name == null || product.mainId == null) {
                    toastr.error('Fill all the fields', 'Warning', {
                        closeButton: true
                    });
                }else if(!(product.sku > 0)){
                    toastr.error('Sku Should be Positive', 'Warning', {closeButton: true});
                }
                else {
                    if (typeof item != 'string') {
                        $scope.selectedTab = current;
                        $scope.variants = [{
                            sku: product.sku,
                            name: product.name,
                            size: item.size,
                            price: item.price,
                            quantity: item.quantity
                        }];
                    }
                    else {
                        $scope.selectedTab = current;
                        $scope.variants = [{
                            sku: product.sku,
                            name: product.name,
                            price: 0,
                            quantity: 0
                        }];
                    }
                }
            }
            else {
                if (product.name == null || product.mainId == null || product.childId == null) {
                    toastr.error('Fill all the fields', 'Warning', {
                        closeButton: true
                    });
                }
                else {
                    $scope.selectedTab = current;
                    $scope.variants = [{
                        sku: product.sku,
                        name: product.name,
                        price: 0,
                        quantity: 0
                    }];
                }
            }
        };

        $scope.nextStep3Digital = function (current, product, variants) {
            if (variants.price == null) {
                toastr.error('Fill all the fields', 'Warning', {
                    closeButton: true
                });
            } else {
                $scope.selectedTab = current;
                $scope.variants = [{
                    sku: product.sku,
                    name: product.name,
                    price: variants.price
                }];

            }
        };

        $scope.addVariants = function (product) {
            $scope.inserted = {
                sku: 0,
                name: product.name,
                price: 0,
                quantity: 0
            };
            $scope.variants.push($scope.inserted);
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

        $scope.nextStep3 = function (current, selection, variants) {
        $scope.variant = variants;
            if ($scope.variants[0].sku == "" || $scope.variants[0].name == "" || $scope.variants[0].size == "" || $scope.variants[0].price == "" || $scope.variants[0].quantity == "") {
                toastr.error('Fill all the fields', 'Warning', {
                    closeButton: true
                });
            }
            else if ($scope.variants[0].size == "0" || $scope.variants[0].price == "0" || $scope.variants[0].quantity == "0") {
                toastr.error('Cannot be 0', 'Warning', {
                    closeButton: true
                });
            }
            else if (!($scope.variants[0].sku > 0)) {
                toastr.error('Sku Should be Positive', 'Warning', {closeButton: true});
            }
            else {
                if (selection == "weight") {
                    weight = variants[0].size;
                }
                else {
                    size = variants[0].size;
                }
                $scope.selectedTab = current;
            }
        };
        if (typeof item != 'string') {
            commerceService.getUpdates(item.productId)
                .success(function (result) {
                    $scope.product = result[0];
                    $scope.selectedLink = $scope.product.type;
                    $scope.picFile = "templates/viewImages?img=thirdNavi/" + result[0].imageUrl + "&userId=" + $scope.userId + "&appId=" + $rootScope.appId;
                    if (result[0].size != null) {
                        item.size = result[0].size;
                        $scope.variants = [{
                            sku: result[0].sku,
                            name: item.name,
                            size: result[0].size,
                            price: item.price,
                            quantity: item.quantity
                        }];
                    }
                    else {
                        item.size = result[0].weight;
                        $scope.variants = [{
                            sku: result[0].sku,
                            name: item.name,
                            size: result[0].weight,
                            price: item.price,
                            quantity: item.quantity
                        }];
                    }
                    commerceService.getChild(result[0].childId)
                        .success(function (data) {
                            $scope.child = data;
//                           $scope.child = data[0];
//                           $scope.child = data[0].name;
                        }).error(function (error) {
                        toastr.error('Loading Error', 'Warning', {
                            closeButton: true
                        });
                    });


                }).error(function (error) {
                toastr.error('Loading Error', 'Warning', {
                    closeButton: true
                });
            });
        }

        $scope.addProducts = function (file, product, productFile) {
            if ($scope.categories[0].templateName == "foodDemoApp" || $scope.categories[0].templateName == "clothingApp"
                || $scope.categories[0].templateName == "foodDemoApp2") {
                if (file == null) {
                    toastr.error('select image', 'Warning', {
                        closeButton: true
                    });
                    return;
                }
                if (product.name == null) {
                    $scope.selectedTab = 1;
                    toastr.error('Fill all the fields', 'Warning', {
                        closeButton: true
                    });
                    return;
                }
                if (product.type == null) {
                    $scope.selectedTab = 0;
                    toastr.error('Choose type', 'Warning', {
                        closeButton: true
                    });
                    return;
                }
                else {
                    variants = {
                        size: size,
                        weight: weight,
                        price: $scope.variants[0].price,
                        quantity: $scope.variants[0].quantity,
                        childId: product.mainId
                    };


                    var variantsList = $scope.variants;
                    variantsList.forEach(function (variants) {
                        variants.childId = product.mainId;
                    });
                    var variantsAttribute;
                        commerceService.addProduct(file, product, item.id, variantsList).success(function (data) {
                        variantsList.forEach(function (variantsAttribute) {
                            variantsAttribute.appId = $rootScope.appId;
                            variantsAttribute.childId = product.mainId;
                            variantsAttribute.productId = data.appId.id;
                            variantsAttribute.id = item.id;

                            commerceService.addToInventory(variantsAttribute).success(function(invnrty){
                                $scope.invntry = invnrty;
                            variantsAttribute.id = $scope.invntry.id;
                            commerceService.addPriceandVariants(variantsAttribute, productFile).success(function (data) {
                                toastr.success('New Price and Variants has been added.', 'Awsome!', {
                                    closeButton: true
                                });
                                $mdDialog.hide();
                            }).error(function (err) {
                                toastr.error('Unable to Add', 'Warning', {
                                    closeButton: true
                                });
                            });
                            }).error(function(err){
                                console.log(err);
                            });
                            });

                        }).error(function (err) {
                            toastr.error('Unable to Add', 'Warning', {
                                closeButton: true
                            });
                        });
                   // });

                    toastr.success('New Product has been added.', 'Awsome!', {
                        closeButton: true
                    });
                    $mdDialog.hide();
//                    inventoryService.getInventoryList()
//                        .success(function (result) {
//                            toastr.success('New Product has been added to the inventory.', 'Awsome!', {
//                                closeButton: true
//                            });
//                            $mdDialog.hide();
//                        }).error(function (err) {
//                        toastr.error('Unable to Add', 'Warning', {
//                            closeButton: true
//                        });
//                    });

                }
            }
            else {
                if (file == null) {
                    toastr.error('select image', 'Warning', {
                        closeButton: true
                    });
                    return;
                }
                if (product.childId == null || product.name == null) {
                    $scope.selectedTab = 1;
                    toastr.error('Fill all the fields', 'Warning', {
                        closeButton: true
                    });
                    return;
                }
                if (product.type == null) {
                    $scope.selectedTab = 0;
                    toastr.error('Choose type', 'Warning', {
                        closeButton: true
                    });
                    return;
                }
                else {

                var variantsList = $scope.variants;
                variantsList.forEach(function (variants) {
                    variants.childId = product.childId;
                });
                var variantsAttribute;

                   commerceService.addProduct(file, product, item.id, variantsList).success(function (data) {

                   variantsList.forEach(function (variantsAttribute) {
                       variantsAttribute.appId = $rootScope.appId;
                       variantsAttribute.childId = product.mainId;
                       variantsAttribute.productId = data.appId.id;

                       commerceService.addToInventory(variantsAttribute).success(function(invnrty){
                           $scope.invntry = invnrty;
                       variantsAttribute.id = $scope.invntry.id;
                       commerceService.addPriceandVariants(variantsAttribute, productFile).success(function (data) {
                           toastr.success('New Price and Variants has been added.', 'Awsome!', {
                               closeButton: true
                           });
                           $mdDialog.hide();
                       }).error(function (err) {
                           toastr.error('Unable to Add', 'Warning', {
                               closeButton: true
                           });
                       });
                       }).error(function(err){
                           console.log(err);
                       });
                       });

                   }).error(function (err) {
                       toastr.error('Unable to Add', 'Warning', {
                           closeButton: true
                       });
                   });
                }
            }

        };

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

        $scope.deleteImg = function (index) {
            $scope.tmpImage[index] = null;
        };
        $scope.addImage = function (img) {
            var im = $scope.tmpImage;
            for (var i = 0; i < im.length; i++) {
                if (im[i] == null) {
                    im[i] = $scope.picFile;
                    break;
                }
            }
            $scope.tmpImage = im;
            $scope.mainImg = img;
            toastr.success('added Image', 'message', {
                closeButton: true
            });
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