(function() {
    'use strict';
    angular.module("appEdit").controller("ProductCtrl", [
        '$scope', '$mdDialog', 'toastr','commerceService','$rootScope','SERVER_URL','$auth','ME_APP_SERVER','item',
        ProductCtrl]);

    function ProductCtrl($scope, $mdDialog,toastr, commerceService,$rootScope,SERVER_URL,$auth,ME_APP_SERVER,item) {

        var size,weight;
        var variants;
        $scope.tmpImage =[ null , null , null, null, null, null, null, null];
        $scope.mainImg =null;
        $scope.selection = "weight";

        $scope.product={
            //name:item.name,
            //price:item.price
        };
        $scope.thumbPic = ME_APP_SERVER+'temp/' +$auth.getPayload().id+'/templates/'+$rootScope.appId+'/img/thirdNavi/default.jpg';



        if (typeof $scope.categories === 'undefined' ) {

            commerceService.getCategoryList()
                .success(function (result) {
                    $scope.categories = result;
                }).error(function (error) {
                    toastr.error('Loading Error', 'Warning', {
                        closeButton: true
                    });
                })
        }

        if(typeof $scope.mainMenu == 'undefined'){
            commerceService.getMainMenuList()
                .success(function (result) {
                    $scope.mainMenu = result;
                }).error(function (error) {
                    toastr.error('Loading Error', 'Warning', {
                        closeButton: true
                    });
                })

        }
        $scope.addType=function(type,id){
            $scope.product.type = type;
            toastr.success(type, 'Choose', {
                closeButton: true
            });
        };

        $scope.nextStep2 = function(current,product){
        if(product.name == "" || product.mainId == null || product.childId == null){
         toastr.error('Fill all the fields', 'Warning', {
                           closeButton: true
                    });
        }
        else{
          var ids={
              mainId : product.mainId,
              childId : product.childId
              };
               commerceService.getVariants(ids.childId).
                      success(function(data) {
                       toastr.success('Successfully saved', 'Awsome!', {
                           closeButton: true
                       });
                      $scope.selectedTab = current;

                      $scope.variants=[{
                          type: "cloth",
                          name: data[0].name,
                          sizeOrweight: "10",
                          price: data[0].price,
                          qty: "1"
                      }];
                      }).error(function(err) {
                          toastr.error('Saving detals was not Successful', 'Warning', {
                              closeButton: true
                          });
                      });
        }
        };

        $scope.typeUpdateHandler = function(newValue) {
          $scope.variants[0].type = newValue;
        };
        $scope.nameUpdateHandler = function(newValue) {
            $scope.variants[0].name = newValue;
        };
        $scope.sizeUpdateHandler = function(newValue) {
            $scope.variants[0].size = newValue;
        };
        $scope.priceUpdateHandler = function(newValue) {
            $scope.variants[0].price = newValue;
        };
        $scope.qtyUpdateHandler = function(newValue) {
            $scope.variants[0].qty = newValue;
        };

        $scope.nextStep3 = function(current,selection) {
        if($scope.variants[0].type == "" || $scope.variants[0].name == "" || $scope.variants[0].size == "" || $scope.variants[0].price == "" || $scope.variants[0].qty == ""){
            toastr.error('Fill all the fields', 'Warning', {
                   closeButton: true
            });
        }
        else if($scope.variants[0].size == "0" || $scope.variants[0].price == "0" || $scope.variants[0].qty == "0"){
            toastr.error('Cannot be 0', 'Warning', {
                  closeButton: true
            });
        }
        else{
                if(selection == "weight"){
                 weight = $scope.variants[0].sizeOrweight;
                }
                else{
                size = $scope.variants[0].sizeOrweight;
                }
              $scope.selectedTab = current;
            }
        };

        $scope.addProducts = function(file,product) {

            if(file == null){
                toastr.error('select image', 'Warning', {
                    closeButton: true
                });
                return;
            }if(product.childId == null || product.name ==null){
                $scope.selectedTab =1;
                toastr.error('Fill all the fields', 'Warning', {
                    closeButton: true
                });
                return;
            }
            if(product.type == null){
                $scope.selectedTab =0;
                toastr.error('Choose type', 'Warning', {
                    closeButton: true
                });
                return;
            }
            else{
            variants = {
                 appId: $rootScope.appId,
                 childId: product.childId,
                 proType: $scope.variants[0].type,
                 name: $scope.variants[0].name,
                 size: size,
                 weight: weight,
                 price: $scope.variants[0].price,
                 quantity: $scope.variants[0].qty
            };
                commerceService.addProduct(file,product,variants,item.id).
                    success(function(data) {
                        toastr.success('New Product has been added.', 'Awsome!', {
                            closeButton: true
                        });
                        $mdDialog.hide();
                    }).error(function(err) {
                        toastr.error('Unable to Add', 'Warning', {
                            closeButton: true
                        });
                    });

                commerceService.addPriceandVariants(variants).
                success(function(data) {
                    toastr.success('New Product has been added.', 'Awsome!', {
                        closeButton: true
                    });
                    $mdDialog.hide();
                }).error(function(err) {
                    toastr.error('Unable to Add', 'Warning', {
                        closeButton: true
                    });
                });
            }

        };

        $scope.setImage = function(img){

            if(img == undefined){
                toastr.error('Upload Image', 'Warning', {
                    closeButton: true
                });
            }else{
                $scope.picFile=$scope.tmpImage[img];
            }
        };

        $scope.changeImage =function(){

            var im=$scope.tmpImage;
            for(var i=0 ; i < im.length ; i++){
                if(im[i] == null) {
                    im[i] = $scope.picFile;
                    break;
                }
            }
            $scope.tmpImage=im;
        };

        $scope.setChild=function(main){

            var childList=$scope.categories;
            var newChild=[];
            for(var i=0 ; i < childList.length ; i++){
                if(childList[i].mainId == main) newChild.push(childList[i]);
            }
            $scope.child=newChild;
        };

        $scope.deleteImg=function(index){
            $scope.tmpImage[index]=null;
        };
        $scope.addImage = function(img){
            $scope.mainImg=img;
            toastr.success('added Image', 'message', {
                closeButton: true
            });
        };

        $scope.nextStep = function(current) {
            $scope.selectedTab = current;
        };

        $scope.answer = function() {
            $mdDialog.hide();
        };
    }
})();