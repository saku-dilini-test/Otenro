/**
 * Created by Shashan on 01/02/2018.
 */

(function () {
    'use strict';
    angular.module("appEdit").controller("CarouselCtrl", ['$scope', '$mdDialog', 'toastr','categoryMaintenanceService', 'mySharedService', 'carouselService', '$rootScope', '$http', 'SERVER_URL', '$auth', 'initialData', CarouselCtrl]);


    function CarouselCtrl($scope, $mdDialog, toastr,categoryMaintenanceService, mySharedService, carouselService, $rootScope, $http, SERVER_URL, $auth, initialData) {

        $scope.tmpImage = [];
        $scope.mainImg = null;
        $scope.isSelectCat = false;
        $scope.categories;
        $scope.products;
        $scope.maxMenuSlider = 20;
        $scope.isDataEdit = false;
        $scope.initialData = initialData;

        //if($scope.initialData){
        //        $scope.catModel = $scope.initialData.menu.optionals[0].name;
        //        $scope.prodModel = $scope.initialData.menu.optionals[1].name;
        //}

        // --- add carousel image --- //
        $scope.addCarouselBanner = function () {
            carouselService.showEditSliderDialog("addNewSlider")
        }


        // --- cancel dialog -----
        $scope.cancelAdd = function () {
            $mdDialog.cancel();
            return carouselService.showCarouselBannerDialog();
        };

         // --- cancel dialog -----
        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        //retrieving slider data
        $http.get(SERVER_URL + 'edit/getSliderData?appId=' + $rootScope.appId).success(function (data) {
            $scope.sliderData = (data);
        });

        $scope.imageUrl = SERVER_URL + "templates/viewWebImages?userId="
            + $auth.getPayload().id + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + '&images=slider'




        //go to edit slider data
        $scope.goToEditSliderView = function (item) {

            $scope.SliderEditData = item;
            $scope.catModel = $scope.SliderEditData.optionals[0];
            $scope.prodModel = $scope.SliderEditData.optionals[1];

            carouselService.showEditSliderDialog(item);
        };



        //retrieving categories data
        categoryMaintenanceService.getAllCategoryWithoutMakingCommerce($rootScope.appId).success(function (results) {
            $scope.categories = results;
        }).error(function (error) {
            toastr.error('Category loading error', 'Warning', {
                closeButton: true
            });
        });


        //category on select
        $scope.changeCat = function (category) {
            $scope.selectedCategory = category;
//            $scope.catModel = category;

            $http.get(SERVER_URL + 'templates/getProductsByCatId?appId=' + $rootScope.appId + '&childId=' + category.id).success(function (data) {
                $scope.products = data;

            });
            $scope.isSelectCat = true;
        }

        //product on select
        $scope.changeProd = function (product) {
            $scope.selectedProduct = product;

        }


        // controller for add carousel banner

        $scope.imageSelected = true;
        $scope.buttonName = "Browse Image";


        // image crop function
        $scope.cropImage = function () {
            var handleFileSelect = function (evt) {
                var file = evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.myImage = evt.target.result;
                        $scope.picFile = $scope.myImage;

                        var img = new Image();
                        img.src = window.URL.createObjectURL( file );

                        img.onload = function() {
                            var width = img.naturalWidth,
                                height = img.naturalHeight;
                            window.URL.revokeObjectURL( img.src );
                            if($scope.size.w > width || $scope.size.h > height){
                                toastr.warning('The uploaded image does not meet minimum required resolution, which could lead to a distorted image', 'Warning', {
                                    closeButton: true
                                });
                            }
                        };
                    });
                };
                reader.readAsDataURL(file);
                $scope.imageSelected = false;
                $scope.buttonName = "Upload";
            };
            angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
        }

        //add image
        $scope.addImage = function (img) {
            if (angular.element('#fileInput').val() == '') {
                toastr.error('Please choose an image to upload', 'Warning', {
                    closeButton: true
                });
            }
            else {
                var im = $scope.tmpImage;
                im[0] = $scope.picFile;
                $scope.tmpImage = im;
                $scope.mainImg = img;
                $scope.myImage = null;
                toastr.success('Image has been uploaded successfully', 'message', {
                    closeButton: true
                });
            }
            console.log($scope.tmpImage);
            $scope.imageSelected = true;
            $scope.buttonName = "Browse Image";
        };







        //check for initial data **controller parse data
        if ($scope.initialData == null) {

        }
        else if ($scope.initialData) {


            if ($scope.initialData.menu == 'addNewSlider') {

            }

            else if ($scope.initialData.menu) {

                $scope.catModel = $scope.initialData.menu.optionals[0];
                $scope.prodModel = $scope.initialData.menu.optionals[1];

                $scope.menu = $scope.initialData.menu;
                $scope.serverImage = $scope.menu.imageUrl;
                $scope.mainImg = $scope.menu.imageUrl;

                var imageURL = SERVER_URL + "templates/viewWebImages?" +
                    "userId=" + $auth.getPayload().id +
                    "&appId=" + $rootScope.appId + "&" + new Date().getTime() +
                    "&images=slider/" + $scope.menu.imageUrl;

                $scope.tmpImage[0] = imageURL;
                $scope.picFile = imageURL;
            }



        }


           //setting selected image
        $scope.setImage = function (img) {
            if (img == undefined) {
                toastr.error('Please choose an image to upload', 'Warning', {
                    closeButton: true
                });
            } else {
                $scope.picFile = $scope.tmpImage[img];
            }
        };

        $scope.deleteImg = function (index) {
            $scope.tmpImage[index] = null;

        };

        $scope.changeImage = function (img) {
            $scope.mainImg = img;
        };



        $scope.addSliderImage = function (file,menu, cat, prod) {

            if ($scope.tmpImage[0] == null) {
                toastr.error('Please upload an image', 'Warning', { closeButton: true });
                return;
            }
            if (cat && !prod) {
                toastr.error('Please select a Product', 'Warning', { closeButton: true });
                return;
            }

            if ($scope.initialData.menu == "addNewSlider") {

                var tempOptArr = [];

                tempOptArr[0] = (cat);
                tempOptArr[1] = (prod);

                if(!menu.name){
                  toastr.error("Please enter a name", 'Message', { closeButton: true });
                }else{
                    carouselService.addSlider({"file":$scope.tmpImage, "appId":$rootScope.appId, "name":menu.name, "isNew": $rootScope.tempNew, "optionals": tempOptArr}).success(function (data) {


                        var urlPath = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + $auth.getPayload().id
                            + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";


                        $scope.appTemplateUrl = urlPath + '' +
                            '#/app/home/' + data.id + '?' + new Date().getTime();

                        mySharedService.prepForBroadcast($scope.appTemplateUrl);

                        toastr.success("New Image Slider Added", 'Message', { closeButton: true });
                        $mdDialog.hide();
            return carouselService.showCarouselBannerDialog();


                    }).error(function (err) {
                        toastr.error(err.message, 'Warning', {
                            closeButton: true
                        });
                    });
                }


            } else {


                if (file.length > 50) {

                    var tempOptArr = [];

                    tempOptArr[0] = (cat);
                    tempOptArr[1] = (prod);


                    if( !menu.name){
                      toastr.error("Please enter a name", 'Message', { closeButton: true });
                    }else{carouselService.updateSliderImage({"file":$scope.tmpImage, "imageUrl":$scope.menu.imageUrl, "name": menu.name, "id":$scope.menu.id, "appId":$rootScope.appId, "optionals":tempOptArr}).success(function (data) {


                            var urlPath = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + $auth.getPayload().id
                                + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";


                            $scope.appTemplateUrl = urlPath + '' +
                                '#/app/home/' + data.id + '?' + new Date().getTime();

                            mySharedService.prepForBroadcast($scope.appTemplateUrl);

                            toastr.success("New Image Updated", 'Message', { closeButton: true });
                            $mdDialog.hide();
                            return carouselService.showCarouselBannerDialog();

                        }).error(function (err) {
                            toastr.error(err.message, 'Warning', {
                                closeButton: true
                            });
                        });
                    }


                } else {

                    var tempOptArr = [];

                    tempOptArr[0] = (cat);
                    tempOptArr[1] = (prod);

                    var updateData = {
                        'name': menu.name,
                        'id': $scope.menu.id,
                        'optArr': tempOptArr
                    }


                    if( !menu.name){
                      toastr.error("Please enter a name", 'Message', { closeButton: true });
                    }else{
                        carouselService.updateSliderData(updateData).success(function (data) {

                            var urlPath = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + $auth.getPayload().id
                                + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";


                            $scope.appTemplateUrl = urlPath + '' +
                                '#/app/home/' + data.id + '?' + new Date().getTime();

                            mySharedService.prepForBroadcast($scope.appTemplateUrl);

                            toastr.success("Slider Data Updated", 'Message', { closeButton: true });
                            $mdDialog.hide();
                            return carouselService.showCarouselBannerDialog();

                        }).error(function (err) {
                            toastr.error(err.message, 'Warning', {
                                closeButton: true
                            });
                        });
                    }
                }

            }


        };
        // Delete slider
        $scope.deleteSlider = function (item) {

            return $mdDialog.show({
                controllerAs: 'dialogCtrl',
                controller: function ($mdDialog) {
                    this.confirm = function click() {

                        carouselService.deleteData(item).success(function (data) {

                            var urlPath = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + $auth.getPayload().id
                                + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";

                            $scope.appTemplateUrl = urlPath + '' +
                                '#/app/update?' + new Date().getTime();
                            mySharedService.prepForBroadcast($scope.appTemplateUrl);
                            return carouselService.showCarouselBannerDialog();
                        }).error(function (err) {
                            $mdDialog.hide();
                        });


                    },
                        this.cancel = function click() {
                            $mdDialog.hide();
                            return carouselService.showCarouselBannerDialog();
                        }
                },
                template: '<md-dialog aria-label="Delete Slider">' +
                    '<md-content >' +
                    '<div class="md-dialog-header">' +
                    '<h1>Deleting slider</h1>' +
                    '</div>' +
                    '<br>' +
                    '<div style="text-align:center">' +
                    '<lable>Are you sure, you want to delete this Slider ?</lable>' +
                    '</div>' +
                    '<br>' +
                    '<br>' +
                    '<div class="md-dialog-buttons">' +
                    '<div class="inner-section">' +
                    '<md-button class="me-default-button" ng-click="dialogCtrl.cancel()">NO</md-button>' +
                    '<md-button class="me-default-button" ng-click="dialogCtrl.confirm()">YES</md-button>' +
                    '</div>' +
                    '</div>' +
                    '</md-content>' +
                    '</md-dialog>'
            })

        };

        $scope.sliderDefault = function(){
            carouselService.showRemoveDefaultDataDialog();
        }

        //remove selected category
        $scope.deleteSelctedCat = function(){
                $scope.catModel = null;
                $scope.prodModel = null;
        }

        //remove selected product
        $scope.deleteSelctedProd = function(){
                $scope.prodModel = null;
        }

        $scope.setAspectRatio = function () {
            carouselService.getApplicationData($rootScope.appId)
                .success(function (data) {
                    if (data.templateId){
                        carouselService.getTemplateData(data.templateId)
                            .success(function (templateData) {
                                if(templateData.sliderSize){
                                    $scope.aspectRatio = parseFloat(templateData.sliderSize.aspectRatio);
                                }
                                if(templateData.iSizeThird){
                                    $scope.size={w:templateData.sliderSize.w,h:templateData.sliderSize.h};
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
        $scope.setAspectRatio();
    };
})();
