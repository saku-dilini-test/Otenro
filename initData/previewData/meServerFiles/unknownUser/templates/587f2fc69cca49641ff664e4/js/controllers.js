angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ionicLoading,$ionicHistory,$rootScope,$http,constants,$log) {

        // show & hide menu icon button
       $scope.$on('$ionicView.beforeEnter', function (e, data) {
           if (data.enableBack) {
               $scope.$root.showMenuIcon = false;
           } else {
               $scope.$root.showMenuIcon = true;
           }
       });
        $scope.goBack = function(){
            $ionicHistory.goBack();

        };

        $scope.appName = $rootScope.appName;
        //$scope.category.name = $rootScope.category.name;

        $scope.changeAppName = function () {
            $scope.appName = $rootScope.appName;

            $http.get(constants.SERVER_URL + '/templates/getArticleCategoryByAppId?appId=' + $rootScope.appId)
                .success(function (data) {
                    $ionicLoading.hide();
                    $scope.articleCategoryList = data;
                }).error(function (err) {
                alert('loading err');
            });
        }

        $timeout(function () {
            $scope.changeAppName();
        }, 1000);

        //get the user name
        $scope.user = angular.fromJson(localStorage.getItem('appLocalStorageUser'+$rootScope.appId));


        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});
        $ionicLoading.show({
            template: '<ion-spinner icon="lines"  class="spinner-energized" ></ion-spinner>'
        });
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            $log.debug('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('HomeCtrl', function ($scope, $http, constants, $rootScope, $timeout, $state, $ionicLoading, $window, $log,readMadeEasy) {

          $scope.options = {
            initialSlide: 0,
            direction: 'horizontal', //or vertical
            speed: 300, //0.3s transition
            pagination: false,
            slidesPerView: 3,
            paginationClickable: true,
            spaceBetween: 30
            };

        $scope.appName = $rootScope.appName;

        $scope.navigateArticles = function(categoryId,categoryName){
             $state.go('app.home.categoryId',{categoryId:categoryId,categoryName:categoryName});
        }

        $scope.changeAppName = function () {


            if (typeof $rootScope.appId === 'undefined'){

                readMadeEasy.readFile().success(function(data){
                    $rootScope.appId = data.appId;
                });
            }

            if (typeof $rootScope.userId === 'undefined'){

                readMadeEasy.readFile().success(function(data){
                    $rootScope.userId = data.userId;
                });
            }
            if (typeof $rootScope.appName === 'undefined'){

                readMadeEasy.readFile().success(function(data){
                    $rootScope.appName = data.name;
                });
            }

            $scope.appName = $rootScope.appName;

            $scope.imageURL =
                        constants.SERVER_URL
                        +"/templates/viewImages?userId="
                        +$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=category";



            $http.get(constants.SERVER_URL + '/templates/getArticleCategoryByAppId?appId=' + $rootScope.appId)
                .success(function (data) {
                    $ionicLoading.hide();
                    $scope.articleCategoryList = data;
                    $log.debug($scope.articleCategoryList)
                }).error(function (err) {
                alert('loading err');
            });
        }

        $timeout(function () {
            $scope.changeAppName();
        }, 1500);


    })

    .controller('contactUsCtrl', function ($scope, $http, constants, $rootScope, $ionicLoading) {
        $ionicLoading.show({
            template: '<ion-spinner icon="lines" ></ion-spinner>'
        });
        $scope.appId = $rootScope.appId;
        $scope.appName = $rootScope.appName;

        $http.get(constants.SERVER_URL + '/templates/getContactUs?appId=' + $scope.appId).success(function (data) {
            $scope.address = data.address;
            $scope.email = data.email;
            $scope.webSite = data.webSite;
            $scope.telPhone = data.telPhone;
            $scope.coords =data.coords;
            $scope.googleMap = data;

            if(!data.coords){
                $scope.coords={
                    latitude : 6.9320204155752050,
                    longitude: 79.8890950584107031
                };
            }

            $scope.map= {
                center: $scope.coords,
                zoom: 11,
                markers: [{
                    id: Date.now(),
                    coords:$scope.coords
                }],
                events: {
                    click: function(map, eventName, originalEventArgs) {
                        var e = originalEventArgs[0];
                        var lat = e.latLng.lat(),
                            lon = e.latLng.lng();
                        var marker = {
                            id: Date.now(),
                            coords: {
                                latitude: lat,
                                longitude: lon
                            }
                        };
                        $scope.map.markers=[];
                        $scope.map.markers.push(marker);
                        $scope.$apply();
                    }
                }
            };


            $ionicLoading.hide();

        }).error(function (err) {
            alert('warning', "Unable to get contact us info", err.message);
        });


    })

    .controller('aboutUsCtrl', function ($scope, $rootScope, $http,$ionicLoading, constants, $log) {
        $scope.appName = $rootScope.appName;
        $scope.aboutUs = "A guide to things to see and do in Hong Kong. This is a demo app built using Otenro. Please visit www.otenro.com for further information.";

        var data = {
            appId: $rootScope.appId
        }

        $http.post(constants.SERVER_URL + "/edit/getAboutUsData", data)
            .success(function (data) {
                    $log.debug(data);
                    $scope.header = data.header;
                    $scope.content = data.content;
                    //$state.go('app.category');
                },
                function (err) {
                    $ionicPopup.alert({
                        title: 'About us Data loading error!',
                        template: 'Please check your connection!'
                    });
                });


    })

    .controller('policiesCtrl', function ($scope, $http, $rootScope, $ionicPopup, constants) {

            // get policies
            $http.get(constants.SERVER_URL + "/templates/getPolicies?appId="+$rootScope.appId)
                .success(function (data) {
                    $scope.privacyPolicy = data.privacyPolicy;
                    $scope.returnPolicy = data.returnPolicy;
                },function (err) {
                    $ionicPopup.alert({
                        title: 'Policies Data loading error!',
                        template: 'Please check your connection!'
                    });
                });
        })
        .controller('termsCtrl', function($scope,$rootScope,$http,constants) {

            $scope.appId = $rootScope.appId;

            $http.get( constants.SERVER_URL + '/templates/getTermsAndConditions?appId='+$scope.appId).success(function(data) {
                $scope.terms = data.termsAndCondition;
            }).error(function(err) {
                alert('warning', "Unable to get terms & condition info", err.message);
            });

            $scope.terms = "This is terms and condition of this application ";
        })


    .controller('articleCtrl', function ($scope, $http, constants, $rootScope, $stateParams, $timeout, $ionicLoading,initialData,readMadeEasy, $state) {
         $scope.options = {
            initialSlide: 0,
            direction: 'horizontal', //or vertical
            speed: 300, //0.3s transition
            pagination: false,
            slidesPerView: 3,
            paginationClickable: true,
            spaceBetween: 30
            };

        $scope.navigateArticles = function(categoryId){
             $state.go('app.home.categoryId',{categoryId:categoryId});
        }


        $ionicLoading.show({
            template: '<ion-spinner icon="lines" ></ion-spinner>'
        });
        $scope.sliderOptions = {
              initialSlide: 0,
              direction: 'horizontal', //or vertical
              speed: 300 //0.3s transition
            };
        $scope.sliderDelegate = null;
        var getInitialData = initialData.selectedArticle;
        if(getInitialData){
            $scope.$emit('hideMenu',{});
            $scope.selectedArticle = getInitialData.data;
        }
        $scope.imageURL = initialData.imageURL;



        $scope.changeAppName = function () {
            if (typeof $rootScope.appId === 'undefined'){

                readMadeEasy.readFile().success(function(data){
                    $rootScope.appId = data.appId;
                });
            }

            if (typeof $rootScope.userId === 'undefined'){

                readMadeEasy.readFile().success(function(data){
                    $rootScope.userId = data.userId;
                });
            }
            if (typeof $rootScope.appName === 'undefined'){

                readMadeEasy.readFile().success(function(data){
                    $rootScope.appName = data.name;
                });
            }

            $scope.appId = $rootScope.appId;
            $scope.appName = $rootScope.appName;
            $scope.userId = $rootScope.userId;
            $scope.categoryName = $stateParams.categoryName;


            $scope.imageURL = constants.SERVER_URL
                +"/templates/viewImages?userId="
                +$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=article";

            if ($stateParams.categoryId == 'firstMenu') {
                $http.get(constants.SERVER_URL + '/templates/getArticleCategoryByAppId?appId=' + $rootScope.appId)
                    .success(function (catList) {
                        if (catList.length > 0) {
                            var firstCat = catList[0];
                            $http.get(constants.SERVER_URL + '/templates/getArticles?appId=' + $rootScope.appId + "&categoryId=" + firstCat.id)
                                .success(function (data) {
                                    $scope.artilceList = data;
                                    $timeout(function () {
                                        $ionicLoading.hide();
                                    }, 2000);
                                }).error(function (err) {
                                alert('loading err');
                            });
                        }
                    }).error(function (err) {
                    alert('loading err');
                });
            } else {
                $http.get(constants.SERVER_URL + '/templates/getArticles?appId=' + $rootScope.appId + "&categoryId=" + $stateParams.categoryId)
                    .success(function (data) {
                        $scope.artilceList = data;
                        $timeout(function () {
                            $ionicLoading.hide();
                        }, 2000);
                    }).error(function (err) {
                    alert('loading err');
                });
            }

        }
        $timeout(function () {
            $scope.changeAppName();
        }, 1000);

    });
