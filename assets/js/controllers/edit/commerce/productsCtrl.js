(function() {
    'use strict';
    angular.module("appEdit").controller("ProductCtrl", [
        '$scope', '$mdDialog', 'toastr','commerceService','$rootScope','SERVER_URL','$auth','ME_APP_SERVER','item',
        ProductCtrl]);

    function ProductCtrl($scope, $mdDialog,toastr, commerceService,$rootScope,SERVER_URL,$auth,ME_APP_SERVER,item) {


        $scope.tmpImage =[ null , null , null, null, null, null, null, null];
        $scope.mainImg =null;

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

        $scope.idDetails = function(product){
        var ids={
            mainId : product.mainId,
            childId : product.childId
            };
            console.log(ids.childId);
             commerceService.getVariants(ids.childId).
                    success(function(data) {
                     toastr.success('Successfully saved', 'Awsome!', {
                         closeButton: true
                     });
                     console.log(data);
                     console.log(data[0]);
                     console.log(data[0]);

                    $scope.variants=[{
                        type: "cloth",
                        name: data.name,
                        size: "10",
                        price: data.price,
                        qty: "1"
                    }];
                    console.log($scope.variants.name);
                    }).error(function(err) {
                        toastr.error('Saving detals was not Successful', 'Warning', {
                            closeButton: true
                        });
                    });
        },

        $scope.addProducts = function(file,product) {

            if(file == null){
                toastr.error('select image', 'Warning', {
                    closeButton: true
                });
                return;
            }if(product.childId == null || product.name ==null || product.price==null){
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
                commerceService.addProduct(file,product,item.id).
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