/**
 * Created by amila on 4/1/16.
 */


mobileApp.controller('categoryCtrl', function ($ionicSlideBoxDelegate, $scope, $stateParams, $rootScope, $http, constants, readMadeEasy, $ionicLoading, $ImageCacheFactory, $filter, $state) {

    $scope.viewDummySliderImages = constants.SERVER_URL + "/templates/viewDummySliderImages?img=";
    $scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
        console.log('Slide change is beginning');
    });

    $scope.$on('$ionicView.afterEnter', function () {
        // if($scope.sliders){
        $scope.options = {
            initialSlide: 3,
            loop: true,
            autoplay: 5000,
            grabCursor: true,
            speed: 500,
            autoplayDisableOnInteraction: false
        }

        $scope.sliderDelegate;

        //detect when sliderDelegate has been defined, and attatch some event listeners
        $scope.$watch('sliderDelegate', function (newVal, oldVal) {
            if (newVal != null) {
                $scope.sliderDelegate.on('slideChangeEnd', function () {
                    console.log('updated slide to ' + $scope.sliderDelegate.activeIndex);
                    $scope.$apply();
                });
            }
        });
        // }

    });

    $scope.product = function (product) {
        if (product != null || product != undefined) {
            $state.go('app.food', { item: product })
        }
    }

    if (typeof $rootScope.appId === 'undefined') {

        readMadeEasy.readFile().success(function (data) {
            $rootScope.appId = data.appId;
        });
    }

    if (typeof $rootScope.userId === 'undefined') {

        readMadeEasy.readFile().success(function (data) {
            $rootScope.userId = data.userId;
        });
    }
    if (typeof $rootScope.appName === 'undefined') {

        readMadeEasy.readFile().success(function (data) {
            $rootScope.appName = data.name;
        });
    }

    $scope.userId = $rootScope.userId;
    $scope.appId = $rootScope.appId;
    $ionicLoading.show({
        template: '<ion-spinner icon="spiral"></ion-spinner>',
    });

    readMadeEasy.readFile().success(function (data) {
        $scope.appId = data.appId;

        $scope.imageURL = constants.SERVER_URL
            + "/templates/viewImages?userId="
            + data.userId + "&appId=" + data.appId + "&" + new Date().getTime() + "&img=secondNavi";


        $http.get(constants.SERVER_URL + '/templates/getSpecificChild?appId=' + $scope.appId).success(function (data) {
            // $http.get("http://192.168.8.156:1337" + '/templates/getSpecificChild?appId=5aa7ad07a4b5b3577110d2c3').success(function (data) {

            var imagePathArray = [];

            data.forEach(function (category) {
                category.fullImagePath = $scope.imageURL + "/" + category.imageUrl;
                imagePathArray.push(category.fullImagePath);
            });

            var sortedCategories = $filter('orderBy')(data, 'createdAt', true);

            $http.get(constants.SERVER_URL + '/get/dummySlider').success(function (data) {


                data.slider.forEach(function (slider) {
                    imagePathArray.push($scope.viewDummySliderImages + slider.image);
                });

                $ImageCacheFactory.Cache(imagePathArray).then(function () {
                    console.log("Images done loading!");
                    $scope.categories = sortedCategories;
                    $scope.sliders = data.slider;
                    $ionicLoading.hide();
                }, function (failed) {
                    console.log("An image filed: " + failed);
                    $scope.categories = sortedCategories;
                    $ionicLoading.hide();
                });


            });


         }).error(function (err) {
            alert('warning', "Unable to get categories", err.message);
        });
    });

});