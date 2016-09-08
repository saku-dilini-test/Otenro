(function () {
    'use strict';
    angular.module("appEdit").controller("ProductCtrl", [
        '$scope', '$mdDialog', 'toastr', 'commerceService','productService', '$rootScope', '$auth', 'SERVER_URL','initialData',
        ProductCtrl]);

    function ProductCtrl($scope, $mdDialog, toastr, commerceService, productService, $rootScope,  $auth, SERVER_URL,initialData) {
        var size, weight;
        var variants;

        $scope.tmpImage = [];
        $scope.product = initialData.product;

        // Third Navigation Image Path ( Image get from server )
        var tempImagePath =  SERVER_URL +"templates/viewImages?userId="+ $auth.getPayload().id
                            +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"&img=thirdNavi/";

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

        $scope.selection = "size";
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
                || variants.size == "") {
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
                toastr.error('SKU already exist', 'Warning', {
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
            $scope.product.variants.splice(index, 1);
        };

        $scope.addProductVariants = function (selection, variants,current) {
            $scope.selection = selection;
            $scope.selectedTab = current;

        };

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
            };
            angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
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

        $scope.nextStep = function (current) {
            $scope.selectedTab = current;
        };

        $scope.answer = function () {
            $mdDialog.hide();
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
            else if($scope.product.variants[index].sku === "" || $scope.product.variants[index].sku === null || $scope.product.variants[index].sku === undefined ){
                    $scope.product.checked = false;
            }
            else {
                $scope.product.checked = true;
            }
        }

        // when product edit start in second tab and enable pagination
        if (initialData.product.id !== undefined){
            $scope.selectedTab = 1;
            $scope.enableTab = false;
        }


    }
})();