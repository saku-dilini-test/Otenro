/**
 * Created by Shashan on 01/02/2018.
 */

(function () {
    'use strict';
    angular.module("appEdit").controller("CarouselCtrl", ['$scope', '$mdDialog', 'toastr', 'mySharedService', 'carouselService', '$rootScope', '$http', 'SERVER_URL', '$auth', 'initialData', CarouselCtrl]);


    function CarouselCtrl($scope, $mdDialog, toastr, mySharedService, carouselService, $rootScope, $http, SERVER_URL, $auth, initialData) {

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
            console.log("slider data" + JSON.stringify($scope.sliderData))
        });

        $scope.imageUrl = SERVER_URL + "templates/viewWebImages?userId="
            + $auth.getPayload().id + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + '&images=slider'




        //go to edit slider data
        $scope.goToEditSliderView = function (item) {
            $scope.SliderEditData = item;
            $scope.catModel = $scope.SliderEditData.optionals[0];
            $scope.prodModel = $scope.SliderEditData.optionals[1];
            console.log('$scope.catModel : ' + $scope.catModel)
            console.log('$scope.prodModel : ' + $scope.prodModel)
            console.log('item : ' + JSON.stringify(item))
            carouselService.showEditSliderDialog(item);
        };



        //retrieving categories data
        $http.get(SERVER_URL + 'templates/getSpecificChild?appId=' + $rootScope.appId).success(function (data) {
            console.log('data : ' + JSON.stringify(data));
            $scope.categories = data;

        });


        //category on select
        $scope.changeCat = function (category) {
            $scope.selectedCategory = category;
//            $scope.catModel = category;
            console.log("category selected : " + JSON.stringify(category));

            $http.get(SERVER_URL + 'templates/getProductsByCatId?appId=' + $rootScope.appId + '&childId=' + category.id).success(function (data) {
                console.log('data : ' + JSON.stringify(data));
                $scope.products = data;

            });
            $scope.isSelectCat = true;
        }

        //product on select
        $scope.changeProd = function (product) {
            $scope.selectedProduct = product;
            console.log("category product : " + JSON.stringify(product));

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
                        $scope.picFile = $scope.myImage
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

            $scope.imageSelected = true;
            $scope.buttonName = "Browse Image";
        };






        console.log("$scope.initialData : " + $scope.initialData)

        //check for initial data **controller parse data
        if ($scope.initialData == null) {
            console.log('initial data null')
            console.log($scope.initialData)
        }
        else if ($scope.initialData) {


            if ($scope.initialData.menu == 'addNewSlider') {

            }

            else if ($scope.initialData.menu) {
                console.log('initial data available')
                console.log($scope.initialData)
                $scope.catModel = $scope.initialData.menu.optionals[0];
                $scope.prodModel = $scope.initialData.menu.optionals[1];
                console.log()

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



        $scope.addSliderImage = function (file, menu, cat, prod) {

            if ($scope.tmpImage[0] == null) {
                toastr.error('Please upload an image', 'Warning', { closeButton: true });
                return;
            }

            if ($scope.initialData.menu == "addNewSlider") {

                var tempOptArr = [];

                tempOptArr[0] = (cat);
                tempOptArr[1] = (prod);


                carouselService.addSlider(file, $rootScope.appId, menu.name, $rootScope.tempNew, tempOptArr).success(function (data) {

                    console.log("$rootScope.tempNew : " + $rootScope.tempNew);

                    var urlPath = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + $auth.getPayload().id
                        + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";


                    $scope.appTemplateUrl = urlPath + '' +
                        '#/app/home/' + data.id + '?' + new Date().getTime();

                    mySharedService.prepForBroadcast($scope.appTemplateUrl);

                    toastr.success("New Image Slider Added", 'Message', { closeButton: true });
                    $mdDialog.hide();


                }).error(function (err) {
                    toastr.error(err.message, 'Warning', {
                        closeButton: true
                    });
                });


            } else {

//                console.log("inside edit")
//                if (file) {
//                    console.log("old file : " + $scope.menu.imageUrl);
//                    console.log('file available');
//                    console.log(file)
//                    console.log(file.length)
//                } else {
//                    console.log('file not available');
//                }
//                console.log(menu.name);
//                console.log(cat);
//                console.log(prod);


                if (file.length > 50) {

                    var tempOptArr = [];

                    tempOptArr[0] = (cat);
                    tempOptArr[1] = (prod);

                    carouselService.updateSliderImage(file, $scope.menu.imageUrl, menu.name, $scope.menu.id, $rootScope.appId, tempOptArr).success(function (data) {


                        var urlPath = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + $auth.getPayload().id
                            + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";


                        $scope.appTemplateUrl = urlPath + '' +
                            '#/app/home/' + data.id + '?' + new Date().getTime();

                        mySharedService.prepForBroadcast($scope.appTemplateUrl);

                        toastr.success("New Image Updated", 'Message', { closeButton: true });
                        $mdDialog.hide();

                    }).error(function (err) {
                        toastr.error(err.message, 'Warning', {
                            closeButton: true
                        });
                    });


                } else {

                    var tempOptArr = [];

                    tempOptArr[0] = (cat);
                    tempOptArr[1] = (prod);

                    var updateData = {
                        'name': menu.name,
                        'id': $scope.menu.id,
                        'optArr': tempOptArr
                    }

                    carouselService.updateSliderData(updateData).success(function (data) {

                        var urlPath = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + $auth.getPayload().id
                            + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";


                        $scope.appTemplateUrl = urlPath + '' +
                            '#/app/home/' + data.id + '?' + new Date().getTime();

                        mySharedService.prepForBroadcast($scope.appTemplateUrl);

                        toastr.success("Slider Data Updated", 'Message', { closeButton: true });
                        $mdDialog.hide();

                    }).error(function (err) {
                        toastr.error(err.message, 'Warning', {
                            closeButton: true
                        });
                    });

                }

            }




        }

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
                template: '<md-dialog aria-label="Edit Child Menu">' +
                    '<md-content >' +
                    '<div class="md-dialog-header">' +
                    '<h1>Deleting category</h1>' +
                    '</div>' +
                    '<br>' +
                    '<div style="text-align:center">' +
                    '<lable>Are you sure, you want to delete this category ?</lable>' +
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


        //remove selected category
        $scope.deleteSelctedCat = function(){
                $scope.catModel = null;
                $scope.prodModel = null;
        }

        //remove selected product
        $scope.deleteSelctedProd = function(){
                $scope.prodModel = null;
        }



    };




})();
