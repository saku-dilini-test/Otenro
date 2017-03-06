(function () {
    'use strict';
    angular.module("appEdit").controller("ProductCtrl", [
        '$scope', '$mdDialog', 'toastr', 'commerceService','productService','inventoryService', '$rootScope', '$auth', 'SERVER_URL','initialData',
        'mainMenuService','$log', ProductCtrl]);

    function ProductCtrl($scope, $mdDialog, toastr, commerceService, productService,inventoryService, $rootScope,  $auth, SERVER_URL,initialData,
    mainMenuService,$log) {
        var size, weight;
        var variants;

        $scope.customPattern =   /^[0-9a-zA-Z ]+$/;
        $scope.qtyPattern = '/^\d+(?:[.]\d{1,}|$)$/';
        $scope.tmpImage = [];
        $scope.product = initialData.product;
        $scope.selection = initialData.product.selection;
        $scope.currency = $rootScope.currency;

        // Third Navigation Image Path ( Image get from server )
        var tempImagePath =  SERVER_URL +"templates/viewImages?userId="+ $auth.getPayload().id
                            +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"&img=thirdNavi/";

        function  disableTabs(selectedTab,tab1,tab2,tab3,tab4) {
            $log.debug(selectedTab);
            $scope.selectedTab = selectedTab;
            $scope.addProductsOptionParams = {
                firstLocked : tab1,
                secondLocked: tab2,
                thirdLocked: tab3,
                imageUploadLocked : tab4
            };
        }
        disableTabs(0,false,true,true ,true);
        if (initialData.product.tempImageArray){
            for (var i=0; i<initialData.product.tempImageArray.length; i++) {
                var tempImageUrl = tempImagePath + initialData.product.tempImageArray[i].img;
                $scope.tmpImage.push(tempImageUrl);
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

        $scope.sizeOrWeight=[
            {name: 'weight(kg)'},
            {name: 'size'},
        ]
        $scope.userId = $auth.getPayload().id;
        $scope.isDigital = false;
        $scope.isValid = false;

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

        $scope.tempVariant=[]

        /**
         * Add product type to the new product
         * @param type
         * @param current
         */
        $scope.addType = function (type, current) {
            $scope.product.type = type.type;
            disableTabs(current,false,false,true,true);
        };

        /**
         * General details of a product
         * @param product
         * @param current
         */
        $scope.generalDetails = function (product, current) {
            //When new product is adding to the system
            if(!$scope.product.variants){
                $scope.product.variants = [];
                $scope.product.variants.push({"sku":product.sku,"name":product.name})
            }
            disableTabs(current,true,true,false,true);

        };


        /**
         * Product variants tab, add variant of a product.
         * @param product
         * @param index
         * @param variants
         */
        $scope.addVariant = function (selection,product,index,variants) {
            if(variants.sku == 0 || variants.price == 0 || variants.quantity == 0
                || variants.size == "") {
                toastr.error('Please fill all fields prior to adding a new variant ', 'Warning', {
                    closeButton: true
                });
            }
            else{
                $scope.selection = selection;
                $scope.inserted = {
                    sku: null,
                    name: product.name,
                    price: null,
                    quantity: null,
                    selection: $scope.selection
                };

                if($scope.product.variants.length >= 2){
                    duplicateSku(variants.sku);
                }
                else{
                    $scope.product.variants.push($scope.inserted);
                }
            }
        };
        /*
            Checking if the sku duplicates.
        */
        function duplicateSku(sku) {
            var length = $scope.product.variants.length;
            var arr = [];
            for(var i = 0; i<length-1; i++){
                arr.push($scope.product.variants[i]);
            }
            var found = arr.some(function (el) {
              return el.sku === sku;
            });
            if (!found) {
                $scope.product.variants.push($scope.inserted);
            }
            else{
                toastr.error('SKU already exists ', 'Warning', {
                    closeButton: true
                });
            }
        }

        /**
         * Delete a Variant from a product
         * @param index
         * @param variants
         */
        $scope.deleteVariant = function (index,variants) {
            if($scope.product.variants.length == 1){
                toastr.error('cannot delete all the variants', 'Warning', {
                    closeButton: true
                });
            }
            else{
                $scope.product.variants.splice(index, 1);
            }
        };

        $scope.addProductVariants = function (selection, variants,current) {
            $scope.selection = selection;
            disableTabs(current,false,false,false,false);

        };

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
                toastr.error('Please fill all fields', 'Warning', {
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



        /**
         * add or update product
         */
        $scope.addOrUpdateProducts = function () {
              if ($scope.tmpImage.length<=0&&$scope.myImage==null){
                  toastr.error('Please add an image ', 'Warning', {
                      closeButton: true
                  });
              }else {
                  if ($scope.myImage){
                      $scope.addImage($scope.myImage);
                  }

                  $scope.product.selection = $scope.selection;
                  $scope.product.published = 'NO';
                  commerceService.addOrUpdateProducts({'productImages': $scope.tmpImage,'product':$scope.product}).success(function (result) {
                      toastr.success('Product added successfully', 'Awsome!', {
                          closeButton: true
                      });
                      if(initialData.product.appId){
                             return commerceService.showInventoryDialog();
                             $mdDialog.hide();

                      }
                      else{
                        $mdDialog.hide();
                      }
                  }).error(function (err) {
                      toastr.error('Product creation failed', 'Warning', {
                          closeButton: true
                      });
                      $mdDialog.hide();

                  });

              }

        };
        $scope.saveAndPublishProducts = function () {
              if ($scope.tmpImage.length<=0&&$scope.myImage==null){
                  toastr.error('Please add an image ', 'Warning', {
                      closeButton: true
                  });
              }else {
                  if ($scope.myImage){
                      $scope.addImage($scope.myImage);
                  }

                  $scope.product.selection = $scope.selection;
                  $scope.product.published = 'YES';
                  commerceService.addOrUpdateProducts({'productImages': $scope.tmpImage,'product':$scope.product}).success(function (result) {
                      toastr.success('Product added successfully', 'Awsome!', {
                          closeButton: true
                      });
                      if(initialData.product.appId){
                             return commerceService.showInventoryDialog();
                             $mdDialog.hide();

                      }
                      else{
                        $mdDialog.hide();
                      }
                  }).error(function (err) {
                      toastr.error('Product creation failed', 'Warning', {
                          closeButton: true
                      });
                      $mdDialog.hide();

                  });

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

//        $scope.imageSelected = true;
////        $scope.buttonName = "Browse Image";

        $scope.cropImage = function () {
            $scope.myImage = null;
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
                $scope.imageSelected =false;
                $scope.buttonName = "Crop";
            };
            angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        };

        $scope.addImage = function (img) {

            if($scope.tmpImage.length < 8 && img && angular.element('#fileInput').val()!=''){
                $scope.tmpImage.push(img);
                angular.element('#fileInput').val(null);
                $scope.picFile = null;
                $scope.myImage=null;
                toastr.success('Image has been uploaded successfully', 'Awesome', {
                    closeButton: true
                });
            }
            else if(angular.element('#fileInput').val() == ''){
                toastr.error('Please choose an image to upload', 'Warning', {
                    closeButton: true
                });
            }
            else{
                toastr.error('A maximum of 8 images are allowed ', 'Warning', {
                    closeButton: true
                });
            }

//             $scope.imageSelected = true;
//             $scope.buttonName = "Browse Image";
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
                toastr.error('Please choose an image to upload', 'Message', {
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



        /**
         * @description
         * validation of duplicate sku and size/weight
         * @param inputVal
         * @param type
         *
         */
        $scope.validateInputValue = function (inputVal,type) {
              var count = 0;
              if (inputVal){
                  angular.forEach($scope.product.variants, function(variants){
                      if (type=='size') {
                          if (inputVal.trim().toLowerCase() == variants.size.trim().
                              toLowerCase()) {
                              count++;
                          }
                      }else{
                          if (inputVal.trim() == variants.sku.trim()) {
                              count++;
                          }

                      }
                      if (count>=2){
                          if (type=='size'){
                              variants.size = null;
                          }else {
                              variants.sku = null;

                          }
                          toastr.error('Can not add duplicate values', 'Warning', {
                              closeButton: true
                          });
                      }
                  });
              }
        };
        /**
        * @description
        * check if the sku already exist
        * @param selectedType
        *
        *
        */
        $scope.checkValidity = function(sku){
            $scope.exist = false;
            var skuData = {
                userId: $auth.getPayload().id,
                appId: $rootScope.appId,
                sku: sku
            }
            commerceService.checkUniqueSku(skuData)
            .success(function(result){
                if(result == 'true'){
                    $scope.exist = true;
                }
            }).error(function (error) {
                $log.debug(error);
            })
        }



        /**
         * @description
         * pattern validation of size/weight
         * @param selectedType
         *
         *
         */
        $scope.setPattern = function(selectedType){
            if(selectedType == 'size') {
                $scope.customPattern =   /^[0-9a-zA-Z ]+$/;
            }
            else {
                $scope.customPattern =   /^[0-9a-zA-Z. ]+$/;
            }

        }



        /**
         * @description
         * validation of duplicate sku and size/weight
         * @param inputVal
         * @param type
         *
         */
        $scope.validateInputValue = function (inputVal,type) {
              var count = 0;
              if (inputVal){
                  angular.forEach($scope.product.variants, function(variants){
                      if (type=='size') {
                          if (inputVal.trim().toLowerCase() == variants.size.trim().
                              toLowerCase()) {
                              count++;
                          }
                      }else{
                          if (inputVal.trim() == variants.sku.trim()) {
                              count++;
                          }

                      }
                      if (count>=2){
                          if (type=='size'){
                              variants.size = null;
                          }else {
                              variants.sku = null;

                          }
                          toastr.error('Can not add duplicate values', 'Warning', 'Warning', {
                              closeButton: true
                          });
                      }
                  });
              }
        };



       // validate varient type

         $scope.validateInputValueVtype = function (inputVal,type) {
                      var count = 0;
                      if (inputVal){
                          angular.forEach($scope.product.variants, function(variants){
                              if (type=='size') {
                                  if (inputVal.trim().toLowerCase() == variants.size.trim().
                                      toLowerCase()) {
                                      count++;
                                  }
                              }else{

                                  if(inputVal.trim() == variants.vType.trim()) {
                                      count++;
                                  }
                              }
                              if (count>=2){
                                  if (type=='size'){
                                      variants.size = null;
                                  }else {

                                      variants.vType = null;
                                  }
                                  toastr.error('Can not add duplicate values', 'Warning', {
                                      closeButton: true
                                  });
                              }
                          });
                      }
                };



                /**
                 * @description
                 * pattern validation of size/weight
                 * @param selectedType
                 *
                 *
                 */
                $scope.setPattern = function(selectedType){
                    if(selectedType == 'size') {
                        $scope.customPattern =   /^[0-9a-zA-Z ]+$/;
                    }
                    else {
                        $scope.customPattern =   /^[0-9a-zA-Z. ]+$/;
                    }

                }



                /**
                 * @description
                 * validation of duplicate sku and size/weight
                 * @param inputVal
                 * @param type
                 *
                 */
                $scope.validateInputValueVType = function (inputVal,type) {
                      var count = 0;
                      if (inputVal){
                          angular.forEach($scope.product.variants, function(variants){
                              if (type=='size') {
                                  if (inputVal.trim().toLowerCase() == variants.size.trim().
                                      toLowerCase()) {
                                      count++;
                                  }
                              }else{

                                  if(inputVal.trim() == variants.vType.trim()) {
                                      count++;
                                  }
                              }
                              if (count>=2){
                                  if (type=='size'){
                                      variants.size = null;
                                  }else {

                                      variants.vType = null;
                                  }
                                  toastr.error('Can not add duplicate values', 'Warning', {
                                      closeButton: true
                                  });
                              }
                          });
                      }
                };


        $scope.nextStep = function (current) {
            $scope.selectedTab = current;
        };

        $scope.answer = function () {
            $mdDialog.hide();
        };
        $scope.back = function(){
            return commerceService.showInventoryDialog();

        };


        /**
         * @description
         * Making the sku readonly after added
         * @param index
         */
        $scope.check = function(index){
            if (initialData.product.id === undefined){
                $scope.product.checked = false;
            }
            else if(index === undefined){
               $scope.product.checked = true;
            }
            else if($scope.product.variants[index].sku === "" ||
                    $scope.product.variants[index].sku === null ||
                    $scope.product.variants[index].sku === undefined ){
                    $scope.product.checked = false;
            }
            else {
                $scope.product.checked = true;
            }
        }

        // when product edit start in second tab and enable pagination
        if (initialData.product.id !== undefined){
            disableTabs(1,false,false,false ,false);
        }


        /**
         * @description
         */
        $scope.setValue = function(index){
            if (angular.element('#'+index).val() > 0){
                angular.element('#'+index).val(null);
            }
        }

        $scope.newcategory = function(){
            $log.debug("innnnnnnnnnnn");
            mainMenuService.showEditMenuNavigationDialog('addNewMenuNavigation',2);
        }




    }
})();