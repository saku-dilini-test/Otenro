(function () {
    'use strict';
    angular.module("appEdit").controller("ProductCtrl", [
        '$scope', '$mdDialog', 'toastr', 'commerceService','productService','inventoryService', '$rootScope', '$auth', 'SERVER_URL','initialData',
        'mainMenuService','$log','$q','categoryMaintenanceService','$filter','mySharedService','carouselService', ProductCtrl]);

    function ProductCtrl($scope, $mdDialog, toastr, commerceService, productService,inventoryService, $rootScope,  $auth, SERVER_URL,initialData,
    mainMenuService,$log,$q,categoryMaintenanceService,$filter,mySharedService,carouselService) {
        var size, weight;
        var variants;
        $scope.defaultImage;
        $scope.customPattern =   /^[0-9a-zA-Z ]+$/;
        $scope.qtyPattern = '/^\d+(?:[.]\d{1,}|$)$/';
        $scope.tmpImage = [];
        $scope.bannerImage = null;
        $scope.product = initialData.product;
        $scope.selection = initialData.product.selection;
        $scope.currency = $rootScope.currency;
        //$scope.isNewProduct = true;
        $scope.skuFieldEnable = false;
        $scope.isNew = $rootScope.tempNew;
        $scope.myVariants = [];
        $scope.tmpSku = [];
        $scope.originalSku = [];
        $scope.liveApps = $rootScope.liveApps;
        var selectedSku = $scope.product.selectedSku;

        $scope.selectedSku = [];
        if(!selectedSku){
            $scope.selectedSku = [];
        }else{
            $scope.selectedSku = selectedSku;
        }

        if(initialData.product.variants){

                for(var i = 0;i < initialData.product.variants.length;i++){
                    if(initialData.product.variants[i].price){
                    initialData.product.variants[i].price = parseFloat(initialData.product.variants[i].price);

                    initialData.product.variants[i].price = initialData.product.variants[i].price.toFixed(2);


                    }
                }
//            console.log($scope.myVariants);
            feedSku($scope.product.variants, false);
        }

        function feedSku(array, isNew){

            if(!isNew){
                for(var i =0;i < array.length;i++){
//                    $scope.myVariants.push(array[i].sku);
                $scope.originalSku.push(array[i].sku);
                }

//                for(var j =0; j < 8 ;j++){
//                    $scope.tmpSku[j] = $scope.myVariants;
//                }
            }else{
                $scope.originalSku = [];
                $scope.myVariants = [];

                for(var i =0;i < $scope.product.variants.length;i++){
//                    $scope.myVariants.push($scope.product.variants[i].sku);
                    $scope.originalSku.push($scope.product.variants[i].sku);

                }
//                for(var j =0; j < 8 ;j++){
//                    $scope.tmpSku[j] = $scope.myVariants;
//                }
            }
//            console.log($scope.tmpSku);

        }

        $scope.getSku = function(index){
//            console.log("inside get sku method: " + index);

            var newSku = [];
           $scope.originalSku.forEach(function(sku){

               var skus = $filter('filter')($scope.selectedSku, {'sku':sku});

                if(skus.length == 0){
                    newSku.push(sku);
                }else{
                    if(skus[0].index == index){
                        newSku.push(sku);
                    }
                }
           });

           return newSku;
        }

        $scope.onChange = function(sku,index){
        console.log("Index: " + index + " sku: " + sku);

            var mySku = $scope.selectedSku;

            for(i=mySku.length-1; i>=0;i--){
                console.log("skuMy index: " + i);
                if(mySku[i].index == index){
                    mySku.splice(i,1);
                }
            }

            sku.forEach(function(sku){
                mySku.push({'sku':sku,'index':index});
            });

            $scope.selectedSku = mySku;
        }

        if(initialData.isNewItem)
        {

            console.log(initialData.isNewItem)
            $scope.isNewProduct = initialData.isNewItem;

        }else if($scope.product.sku){

        $scope.defaultImage = $scope.product.defaultImage;
            if($scope.liveApps == true){
                if(!$scope.product.mainType){
                    $scope.product.mainType = "Main";
                }
            }
            $scope.isNewProduct = false;
            $scope.skuFieldEnable = true;
            $scope.initSkuLength = initialData.product.variants.length;
        }

        commerceService.getProdTypeData().success(function (res) {

               $scope.types = JSON.parse(res).data;
        });

        $scope.initSku = function(index){
        console.log(index);
        console.log($scope.product.variants.length);
        console.log($scope.initSkuLength);
            if(index < $scope.initSkuLength || index == 0 || index < $scope.product.variants.length -1){
                return true;
            }
            else{
                return false;
            }
        }

        var tempImagePath;
        var tempImagePathBanner;
        // Third Navigation Image Path ( Image get from server )

          tempImagePath =  SERVER_URL +"templates/viewWebImages?userId="+ $auth.getPayload().id
               +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"&images=thirdNavi/";
         tempImagePathBanner =  SERVER_URL +"templates/viewWebImages?userId="+ $auth.getPayload().id
               +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"&images=banner/";


        function  disableTabs(selectedTab,tab1,tab2,tab3,tab4,tab5) {
            $log.debug(selectedTab);

            $scope.selectedTab = selectedTab;
            $scope.addProductsOptionParams = {
                firstLocked : tab1,
                secondLocked: tab2,
                thirdLocked: tab3,
                bannerLocked: tab4,
                imageUploadLocked : tab5
            };
        }


            disableTabs(0, false, true, true, true, true);

        if (initialData.product.tempImageArray){
            for (var i=0; i<initialData.product.tempImageArray.length; i++) {
                var tempImageUrl = tempImagePath + initialData.product.tempImageArray[i].img;

                var tempVideoUrl;
                var tempImageSku;
                if(initialData.product.tempImageArray[i].videoUrl){
                    tempVideoUrl = initialData.product.tempImageArray[i].videoUrl;
                }else{
                    tempVideoUrl = null;
                }

                if(initialData.product.tempImageArray[i].sku){
                    tempImageSku = initialData.product.tempImageArray[i].sku;
                }else{
                    tempImageSku = null;
                }


                $scope.tmpImage.push({'img':tempImageUrl,'videoUrl':tempVideoUrl,'sku':tempImageSku});
            }
        }

        if(initialData.product.bannerImage){

            var tempImageUrl = tempImagePathBanner + $scope.product.bannerImage;
            $scope.bannerImage = tempImageUrl
            $scope.oldBannerImg = $scope.product.bannerImage;

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
        $scope.maxLengthName = 30;
        $scope.maxLengthSku = 10;
        $scope.enableTab = "true";
        $scope.productTypes = [
                                {type:'Physical', description:'An item that is shipped to your customers',status:''},
                                // {type:'Digital', description:'Content that is downloaded',status:'[Coming Soon]'},
                                // {type:'Services', description:'Provide a Service',status:'[Coming Soon]'}
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
            disableTabs(current,false,false,true,true,true);
        };

        /**
         * General details of a product
         * @param product
         * @param current
         */
        $scope.generalDetails = function (product, current, skuFieldEnable) {
            if(skuFieldEnable === false){
                //When new product is adding to the system
                $scope.checkValidity(product.sku).then(function (result) {
                    if(result === false){
                        if(!$scope.product.variants){
                            $scope.product.variants = [];
                            $scope.product.variants.push({"sku":product.sku,"name":product.name})
                        }
                        if(product.childId == 'Create New Category') {
                            toastr.error('Please select a category continue ', 'Warning', {
                                closeButton: true
                            });
                        }else {
                            if($scope.isNewProduct != false){
                                disableTabs(current, true, true, false, true ,true);
                            }
                        }
                    }
                }, function(reason) {
                    console.error('SKU already exists');
                });
            }else{
                if(!$scope.product.variants){
                    $scope.product.variants = [];
                    $scope.product.variants.push({"sku":product.sku,"name":product.name})
                }
                if(product.childId == 'Create New Category') {
                    toastr.error('Please select a category continue ', 'Warning', {
                        closeButton: true
                    });
                }else {
                    if($scope.isNewProduct != false){
                        disableTabs(current, true, true, false, true,true);
                    }else{
                        $scope.selectedTab = 2;
                    }
                }
            }

        };

    $scope.checkUrl = function(url) {

       var id,URL;
       var res = url.slice(8);
       var res2 = res.split(/\/|&|=/);
       if (res2.length > 2) {
           id = res2[2];
       }else{
           id = res2[1];
       }
       return id;
   }

        /**
         * Product variants tab, add variant of a product.
         * @param product
         * @param index
         * @param variants
         */
        $scope.addVariant = function (selection,product,index,variants) {

            if(product.selection == undefined){
                 product.selection = [];
            }
            if(variants.sku == 0 || variants.price == 0 || variants.quantity == 0
                || variants.size == "" || product.selection.length == 0) {

                if(product.selection.length == 0){
                    toastr.error('Please add atleast one variant to continue ', 'Warning', {
                        closeButton: true
                    });
                }else{
                    toastr.error('Please fill all fields prior to adding a new variant ', 'Warning', {
                        closeButton: true
                    });
                }
            }
            else{
                $scope.selection1 = product.selection;
                $scope.selection2 = [];
                for(var i=0;i<$scope.selection1.length;i++){
                    $scope.selection2.push({
                        name:$scope.selection1[i].name,
                        vType:""
                    });
                }
                $scope.inserted = {
                    sku: null,
                    name: product.name,
                    price: null,
                    quantity: null,
                    selection:$scope.selection2
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
       console.log(sku);
           var length = $scope.product.variants.length;
           var arr = [];
           for(var i = 0; i<length-1; i++){
               arr.push($scope.product.variants[i]);
           }
           var found = arr.some(function (el) {
             return el.sku.toUpperCase() === sku.toUpperCase();
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
                    var confirm = $mdDialog.confirm()
                        .title('Would you like to delete this variant?')
                        .textContent('This action cannot undo.')
                        .ariaLabel('Delete variant')
                        .ok('Delete')
                        .cancel('Cancel');

                    $mdDialog.show(confirm).then(function() {
                        if(initialData.product.id == undefined || initialData.product.id == '0'){
                            $scope.product.variants.splice(index, 1);
                            return commerceService.showAddProductsDialog($scope.product,$scope.isNewProduct, $scope.product.variants,'0', true);

                        }else {
                            $scope.product.variants.splice(index, 1);
                            return commerceService.showAddProductsDialog($scope.product, $scope.isNewProduct, $scope.product.variants, null ,true);

                        }
                    }, function() {
                        if(initialData.product.id == undefined || initialData.product.id == '0'){
                            return commerceService.showAddProductsDialog($scope.product,$scope.isNewProduct, $scope.product.variants,'0', true);

                        }else {
                            return commerceService.showAddProductsDialog($scope.product, $scope.isNewProduct, $scope.product.variants, null ,true);

                        }
                    });

            }
        };

        $scope.addProductVariants = function ( variants,current) {
            feedSku(variants,true);
                if($scope.product.selection == undefined){
                     $scope.product.selection = [];
                }
                if($scope.product.selection.length == 0){
                    toastr.error('Please add atleast one variant to continue ', 'Warning', {
                        closeButton: true
                    });
                }else{
                     $scope.selection = $scope.product.selection;
                     if($scope.isNewProduct != false){
                         disableTabs(current,false,false,false,false,false);
                     }else{
                        $scope.selectedTab = 3;
                     }
                }
        };

        $scope.addBanner = function (){


            disableTabs(4,false,false,false,false,false);
        };

        if (typeof $scope.categories === 'undefined') {

            commerceService.getCategoryList()
                .success(function (result) {
                    $scope.categories = result;
                }).error(function (error) {
                toastr.error('Loading Error', 'Warning', {
                    closeButton: true
                });
            });
        }

        // if (typeof $scope.mainMenu == 'undefined') {
        //     commerceService.getMainMenuList()
        //         .success(function (result) {
        //             if (result == '') {
        //                 $scope.mainMenuHide = true;
        //                 commerceService.getCategoryList()
        //                     .success(function (secondResult) {
        //                         $scope.child = secondResult;
        //                         console.log(secondResult)
        //                     }).error(function (error) {
        //                     toastr.error('Loading Error', 'Warning', {
        //                         closeButton: true
        //                     });
        //                 })
        //             }
        //             else {
        //                 $scope.mainMenuHide = false;
        //                 $scope.childMenuHide = false;
        //                 $scope.mainMenu = result;
        //             }
        //
        //         }).error(function (error) {
        //         toastr.error('Loading Error', 'Warning', {
        //             closeButton: true
        //         });
        //     })
        // }

        categoryMaintenanceService.getAllCategoryWithoutMakingCommerce($rootScope.appId).success(function (results) {
            $scope.child = results;
        }).error(function (error) {
            toastr.error('Category loading error', 'Warning', {
                closeButton: true
            });
        });




        
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
              if(initialData.product.id === '0'){
                  initialData.product.id = undefined;
                  $scope.product.id = undefined;
              }
              if ($scope.tmpImage.length <= 0 ){

                  toastr.error('Please add an image ', 'Warning', {
                      closeButton: true
                  });
              }if($scope.defaultImage === null || $scope.defaultImage === undefined){
                    toastr.error('Please select a default Image from uploaded product images', 'Warning', {
                        closeButton: true
                    });
              }else {

                  $scope.product.selection = $scope.selection;
                  $scope.product.published = 'NO';
                  $scope.product.selectedSku = $scope.selectedSku;
                  commerceService.addOrUpdateProducts({'productImages': $scope.tmpImage,'product':$scope.product,'isNew': $rootScope.tempNew, 'defImg': $scope.defaultImage,bannerImage: $scope.bannerImage,oldBannerImg: $scope.oldBannerImg}).success(function (result) {
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
              if(initialData.product.id == '0'){
                    initialData.product.id = undefined;
                    $scope.product.id = undefined;
              }
              if ($scope.tmpImage.length<=0 ){
                  toastr.error('Please add an image ', 'Warning', {
                      closeButton: true
                  });
              }if($scope.defaultImage == null || $scope.defaultImage == undefined){
                  return toastr.error('Please select a default Image ', 'Warning', {
                      closeButton: true
                  });
                }
//                if($scope.bannerImage === 'undefined' || $scope.bannerImage == null){
//                          disableTabs(3, false, false, false, false,false);
//                     return toastr.error('Please add a Banner Image', 'Warning', {
//                          closeButton: true
//                      });
//                }
                else {


                  $scope.product.selection = $scope.selection;
                  $scope.product.published = 'YES';
                  $scope.product.selectedSku = $scope.selectedSku;
                  commerceService.addOrUpdateProducts({'productImages': $scope.tmpImage,'product':$scope.product, 'isNew': $rootScope.tempNew, 'defImg': $scope.defaultImage,bannerImage:$scope.bannerImage,oldBannerImg: $scope.oldBannerImg}).success(function (result) {
                      toastr.success('Products updated successfully', 'Awesome!', {
                          closeButton: true
                      });
                      var urlPath;
                      urlPath = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + $auth.getPayload().id
                          + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";
                      $scope.appTemplateUrl = urlPath +
                          'src' + new Date().getTime();

                      mySharedService.prepForBroadcast($scope.appTemplateUrl);

                      if(initialData.product.appId){
                         $mdDialog.hide();
                         return commerceService.showInventoryDialog();
                      }else{
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


        $scope.defImg = function(img,id){
            $scope.defaultImage = img;
//            $scope.product.videoUrl = id;
        }
        
        $scope.setImage = function (img) {

            if (img == undefined) {
                toastr.error('Upload Image', 'Warning', {
                    closeButton: true
                });
            } else{
                $scope.picFile = $scope.tmpImage[img];
                $scope.picFileBanner = $scope.bannerImage;
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

        $scope.buttonName = "Select Image";
        $scope.bannerButtonName = "Select Image";

        $scope.cropImage = function () {
            $scope.setAspectRatio();
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
                $scope.buttonName = "Crop Image";
            };
            angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        };

        $scope.cropBannerImage = function () {
            $scope.setAspectRatio();
            $scope.myBannerImage = null;
            var handleFileSelect=function(evt) {

                var file=evt.currentTarget.files[0];
                var reader = new FileReader();

                reader.onload = function (evt) {
                    $scope.$apply(function($scope){
                        $scope.myBannerImage=evt.target.result;
                        $scope.picFileBanner =  $scope.myBannerImage;
                    });
                };
                reader.readAsDataURL(file);
                $scope.imageSelected =false;
                $scope.bannerButtonName = "Crop Image";
            };
            angular.element(document.querySelector('#fileInputbanner')).on('change',handleFileSelect);
        };

        $scope.addImage = function (img,url) {

            if($scope.tmpImage.length < 8 && img && angular.element('#fileInput').val()!=''){
                $scope.tmpImage.push({'img':img, 'videoUrl':url});
                angular.element('#fileInput').val(null);
                $scope.picFile = null;
                $scope.myImage=null;
                $scope.product.videoUrl = null;
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


           $scope.buttonName = "Select Image";
        };

        $scope.addBannerImage = function (img) {

            $scope.bannerImage = img;
            angular.element('#fileInput').val(null);
            $scope.picFile = null;
            $scope.myImage=null;
            $scope.product.videoUrl = null;
            toastr.success('Image has been uploaded successfully', 'Awesome', {
                closeButton: true
            });



           $scope.bannerButtonName = "Select Image";
        };

        $scope.deleteBanner = function(){
            $scope.bannerImage = null;
        }

        $scope.deleteImg = function (index) {
            $scope.defaultImage = null;
            $scope.tmpImage.splice(index, 1);
            if ($scope.product.tempImageArray&&$scope.product.tempImageArray.length > 0){
                $scope.product.tempImageArray.splice(index, 1);
            }

            var delSku = $scope.selectedSku;

            for(i=delSku.length-1; i>=0;i--){
                console.log("skuMy index: " + i);
                if(delSku[i].index == index){
                    delSku.splice(i,1);
                }
            }


            $scope.selectedSku.forEach(function(sku, i){
                if(sku.index > index){
                    if(sku.index == 1){
                        sku.index = 0;
                    }else if(sku.index == 2){
                        sku.index = 1;
                    }else if(sku.index == 3){
                        sku.index = 2;
                    }else if(sku.index == 4){
                        sku.index = 3;
                    }else if(sku.index == 5){
                        sku.index = 4;
                    }else if(sku.index == 6){
                        sku.index = 5;
                    }else if(sku.index == 7){
                        sku.index = 6;
                    }
                }
            });

            $scope.selectedSku = delSku;

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
        $scope.checkValidity = function(sku, position){
        console.log(sku);

            return $q(function(resolve, reject) {
                    $scope.exist = false;
                    var skuData = {
                        userId: $auth.getPayload().id,
                        appId: $rootScope.appId,
                        sku: sku
                    }
                    commerceService.checkUniqueSku(skuData)
                    .success(function(result){
                    console.log(result);
                        if(result == 'true' || result == true){
                             $scope.exist = true;
                             $scope.position = position;
                             if(position) {
                                 $scope.product.variants[position].sku = '';
                             }

                            toastr.error('Can not add duplicate SKU values', 'Warning', {
                                closeButton: true
                            });
                             reject($scope.exist);
                        }else if($scope.product.variants){
                            var count = 0;
                            for(var i=0; i<$scope.product.variants.length; i++){
                                if($scope.product.variants[i].sku && sku && $scope.product.variants[i].sku.toUpperCase() == sku.toUpperCase()){
                                    count = count +1;
                                    if(count == 2) {
                                        $scope.exist = true;
                                        $scope.position = position;
                                        $scope.product.variants[position].sku = '';
                                        toastr.error('Can not add duplicate SKU values', 'Warning', {
                                            closeButton: true
                                        });

                                        reject($scope.exist);
                                    }
                                }
                            }
                        }else{
                            $scope.exist = false;
                            resolve($scope.exist);
                        }
                    }).error(function (error) {
                        $log.debug(error);
                    })
             });
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
                 * Have to change this validation according to the new variants logic
                 * for now a user can add duplicate variant patterns
                 */
//                $scope.validateInputValueVType = function (inputVal,type) {
//                      var count = 0;
//                      if (inputVal){
//                          angular.forEach($scope.product.variants, function(variants){
//                              if (type=='size') {
//                                  if (inputVal.trim().toLowerCase() == variants.size.trim().
//                                      toLowerCase()) {
//                                      count++;
//                                  }
//                              }else{
//
//                                  if(inputVal.trim() == variants.vType.trim()) {
//                                      count++;
//                                  }
//                              }
//                              if (count>=2){
//                                  if (type=='size'){
//                                      variants.size = null;
//                                  }else {
//
//                                      variants.vType = null;
//                                  }
//                                  toastr.error('Can not add duplicate values', 'Warning', {
//                                      closeButton: true
//                                  });
//                              }
//                          });
//                      }
//                };


        $scope.nextStep = function (current) {
            $scope.selectedTab = current;
        };

        $scope.answer = function () {
            $mdDialog.hide();
        };
        
        $scope.back = function(){
            if(initialData.product.name){
                return commerceService.showInventoryDialog();
            }else{
                $mdDialog.hide();
            }


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
        if (initialData.product.id !== undefined || initialData.product.id !== '0'){

            if(initialData.addVariant)
            {
                disableTabs(2, false, false, false, false,true);
            }else if(initialData.product.id == undefined){
                disableTabs(0, true, true, true, true,true);
            }
            else {
                disableTabs(1, false, false, false, false, false);
            }
        }


        /**
         * @description
         */
        $scope.setValue = function(index){
            angular.element('#'+index).val(null);
            $scope.product.variants[index].quantity = null;
        }

        $scope.newcategory = function(){
            categoryMaintenanceService.showAddOrEditCategoryDialog();
//            mainMenuService.showEditMenuNavigationDialog('addNewMenuNavigation',2,$scope.product)
        }

        $scope.goToEditProductWindow = function(item){
             return commerceService.showAddProductsDialog(item);

//               $state.go('user.editApp',{appId: item.id});
         };



         $scope.addNewVariant = function (fullProduct, variantName) {
                var isNewItem =  $scope.isNewProduct;
                return $mdDialog.show({
                    controllerAs: 'dialogCtrl',
                    locals: { name: variantName },
                    controller:  ['$scope', 'name', function($scope, name) {
                        $scope.product = fullProduct;
                        $scope.product.selection = fullProduct.selection;
                        $scope.vType = name;
                        $scope.vTypeRemove = name;
                        $scope.isNewProduct = isNewItem;
                        var n = 0;
                        if ($scope.product.selection == undefined){
                            $scope.product.selection= [];
                        }else{
                            if( $scope.vTypeRemove){
                                for(var i = 0; i< $scope.product.selection.length; i++){
                                    if($scope.vTypeRemove == $scope.product.selection[i].name){
                                        n = i;
                                    }
                                }
                            }

                        }
                        this.confirm = function click(vName){
                            if(!vName){
                                toastr.error('Variant name can not be a empty ', 'Error!', {
                                    closeButton: true
                                });
                            }
                            else if($scope.product.selection.length == 4 && $scope.vTypeRemove == undefined){
                                 toastr.error('You can only add 4 variants', 'Error!', {
                                      closeButton: true
                                 });
                                if(initialData.product.id == undefined || initialData.product.id == '0'){
                                    return commerceService.showAddProductsDialog($scope.product,$scope.isNewProduct, $scope.product.variants,'0', true);

                                }else {
                                    return commerceService.showAddProductsDialog($scope.product, $scope.isNewProduct, $scope.product.variants, null ,true);

                                }
                            }else if($scope.product.selection.length > 0 ){
                                // for (var i = n; i < $scope.product.selection.length; i++){
                                   if( $scope.vTypeRemove && vName.toLowerCase() ==  $scope.vTypeRemove.toLowerCase()){
                                         toastr.error('Cannot rename or add by the same name', 'Error!', {
                                              closeButton: true
                                         });
                                         // break;
                                   }else if( $scope.vTypeRemove &&  $scope.product.selection[n].name ==  $scope.vTypeRemove){

                                        $scope.product.selection[n].name = vName;
                                        for(var j=0;j<$scope.product.variants.length;j++){
                                               $scope.product.variants[j].selection[n].name = vName;
                                       }
                                        toastr.success('Variant renamed', 'Success!', {
                                            closeButton: true
                                        });

                                        if(initialData.product.id == undefined || initialData.product.id == '0'){
                                               return commerceService.showAddProductsDialog($scope.product,$scope.isNewProduct, $scope.product.variants,'0', true);

                                        }else {
                                               return commerceService.showAddProductsDialog($scope.product, $scope.isNewProduct, $scope.product.variants, null ,true);

                                        }
                                        // break;
                                   }else{

                                         $scope.product.selection.push({
                                                 name:vName,
                                                 vType:""
                                         });

                                         for(var j=0;j<$scope.product.variants.length;j++){
                                            $scope.product.variants[j].selection.push({
                                                name:vName,
                                                vType:""
                                            });
                                         }
                                        toastr.success('Variant added', 'Success!', {
                                              closeButton: true
                                        });
                                        if($scope.product.id == undefined || initialData.product.id == '0'){
                                            return commerceService.showAddProductsDialog($scope.product,$scope.isNewProduct, $scope.product.variants,'0', true)
                                        }else{
                                            return commerceService.showAddProductsDialog($scope.product,$scope.isNewProduct, $scope.product.variants,null, true);
                                        }
                                        // break;
                                   }
                                 // }
                            }else{
                                $scope.product.selection.push({
                                    name:vName,
                                    vType:""
                                });
                                for(var j=0;j<$scope.product.variants.length;j++){
                                    $scope.product.variants[j].selection= [];
                                    $scope.product.variants[j].selection.push({
                                        name:vName,
                                        vType:""
                                    });
                                }
                                  toastr.success('Variant added', 'Success!', {
                                      closeButton: true
                                  });
                                if($scope.product.id == undefined || initialData.product.id == '0'){
                                    return commerceService.showAddProductsDialog($scope.product,$scope.isNewProduct, $scope.product.variants,'0', true)
                                }else{
                                    return commerceService.showAddProductsDialog($scope.product,$scope.isNewProduct, $scope.product.variants,null, true);
                                }
                            }

                        },
                        this.cancel = function click(){
                           if(initialData.product.id == undefined || initialData.product.id == '0'){
                               return commerceService.showAddProductsDialog($scope.product,$scope.isNewProduct, $scope.product.variants,'0', true);

                           }else {
                               return commerceService.showAddProductsDialog($scope.product, $scope.isNewProduct, $scope.product.variants, null ,true);

                           }


                        },
                        this.remove = function click(selection){
                            return $mdDialog.show({
                                controllerAs: 'dialogCtrl',
                                controller: function($mdDialog){
                                    this.confirm = function click(){
                                        for (var i = 0; i < $scope.product.selection.length; i++){
                                            if( $scope.product.selection[i].name ==  selection){
                                                $scope.product.selection.splice(i, 1);
                                                for(var j=0;j<$scope.product.variants.length;j++){
                                                    $scope.product.variants[j].selection.splice(i, 1);
                                                }
                                                toastr.success('Variant removed', 'Success!', {
                                                    closeButton: true
                                                });
                                                if(initialData.product.id == undefined || initialData.product.id == '0'){
                                                    return commerceService.showAddProductsDialog($scope.product,$scope.isNewProduct, $scope.product.variants,'0', true);

                                                }else {
                                                    return commerceService.showAddProductsDialog($scope.product, $scope.isNewProduct, $scope.product.variants, null ,true);

                                                }
                                            }
                                        }
                                    },
                                    this.cancel = function click(){
                                        if(initialData.product.id == undefined || initialData.product.id == '0'){
                                            return commerceService.showAddProductsDialog($scope.product,$scope.isNewProduct, $scope.product.variants,'0', true);

                                        }else {
                                            return commerceService.showAddProductsDialog($scope.product, $scope.isNewProduct, $scope.product.variants, null ,true);

                                        }
                                    }
                                },
                                template:'<md-dialog aria-label="Deleting variant">'+
                                '<md-content >' +
                                '<div class="md-dialog-header">' +
                                '<h1>Deleting Variant Type </h1>' +
                                '</div>' +
                                '<br>'+
                                '<div style="text-align:center">' +
                                '<lable>Are you sure you want to delete this variant type?</lable>' +
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
                    }],
                    template:'<md-dialog aria-label="Add new Variant">'+
                    '<md-content >' +
                    '<div class="md-dialog-header">' +
                        '<h1>Price & Variants </h1>' +
                    '</div>' +
                    '<br>'+
                    '<div class="md-dialog-main">' +
                        '<md-input-container class="md-block">'+
                            '<label>Variant name </label>' +
                            '<input type="text"'+
                            'min="1" maxlength="12" ng-model="vType" placeholder="Type a name" >' +
                        '</md-input-container>'+
                        '<label>Eg: Color, Size, Meterial, etc</label>'+
                    '</div>' +
                    '<br>' +
                    '<br>' +
                    '<div class="md-dialog-buttons">'+
                        '<div class="inner-section">'+
                            '<md-button class="me-default-button" ng-click="dialogCtrl.cancel()">CANCEL</md-button>'+
                            '<md-button ng-if="vTypeRemove != null" class="me-default-button" ng-click="dialogCtrl.remove(vType)">REMOVE</md-button>'+
                            '<md-button class="me-default-button" ng-click="dialogCtrl.confirm(vType)">SAVE</md-button>'+
                        '</div>'+
                    '</div>' +
                    '</md-content>' +
                    '</md-dialog>'
                })


            };

        /**
         * set third navigation aspect ratios to $scope
         **/
        $scope.setAspectRatio = function () {
            mainMenuService.getApplicationData($rootScope.appId)
                .success(function (data) {
                    if (data.templateId){
                        mainMenuService.getTemplateData(data.templateId)
                            .success(function (templateData) {
                                if(templateData.thirdNaviAspectRatio){
                                    $scope.thirdNaviAspectRatio = parseFloat(templateData.thirdNaviAspectRatio);
                                }
                                if(templateData.iSizeThird){
                                    $scope.iSizeThird={w:templateData.iSizeThird.w,h:templateData.iSizeThird.h};
                                }
                            }).error(function (err) {
                            toastr.error(err.message, 'Warning', {
                                closeButton: true
                            });
                        });
                    }
                }).error(function (err) {
                toastr.error(err.message, 'Warning', {
                    closeButton: true
                });
            });
        };

        $scope.getAspectRatio = function () {
            carouselService.getApplicationData($rootScope.appId)
                .success(function (data) {
                    if (data.templateId){
                        carouselService.getTemplateData(data.templateId)
                            .success(function (templateData) {

                                if(templateData.sliderSize){
                                    $scope.aspectRatioBanner = parseFloat(templateData.sliderSize.aspectRatio);
                                }
                                if(templateData.iSizeThird){
                                    $scope.sizeBanner={w:templateData.sliderSize.w,h:templateData.sliderSize.h};
                                }
                            }).error(function (err) {
                            toastr.error(err.message, 'Warning', {
                                closeButton: true
                            });
                        });
                    }
                }).error(function (err) {
                toastr.error(err.message, 'Warning', {
                    closeButton: true
                });
            });
        };
        $scope.getAspectRatio();



    }
})();