angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ionicLoading) {

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
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6}
        ];
    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    })

    .controller('HomeCtrl', function ($scope, $http, constants, $rootScope, $timeout, $state, $ionicLoading) {

        $scope.appName = $rootScope.appName;


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
        }, 2000);


    })

    .controller('secondNaviCtrl', function ($scope, $http, constants, $rootScope, $ionicLoading) {
        $scope.appId = $rootScope.appId;
        $scope.appName = $rootScope.appName;
        $ionicLoading.show({
            template: '<ion-spinner icon="lines" ></ion-spinner>'
        });
        $http.get(constants.SERVER_URL + '/templates/getSpecificChild?appId=' + $rootScope.appId)
            .success(function (data) {
                $ionicLoading.hide();
                $scope.secondNaviList = data;
                console.log(data);
            }).error(function (err) {
            alert('loading err');
        });
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

    .controller('aboutUsCtrl', function ($scope, $rootScope, $ionicLoading) {
        $scope.appName = $rootScope.appName;
        $scope.aboutUs = "A guide to things to see and do in Hong Kong. This is a demo app built using Otenro. Please visit www.otenro.com for further information.";

    })

    .controller('articleCtrl', function ($scope, $http, constants, $rootScope, $stateParams, $timeout, $ionicLoading,initialData) {

        console.log(initialData);

        $ionicLoading.show({
            template: '<ion-spinner icon="lines" ></ion-spinner>'
        });
        $scope.appId = $rootScope.appId;
        $scope.appName = $rootScope.appName;

        $scope.changeAppName = function () {
            $scope.appName = $rootScope.appName;

            $scope.appId = $rootScope.appId;
            $scope.userId = $rootScope.userId;

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
                                    $ionicLoading.hide();
                                    $scope.artilceList = data;
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
                        $ionicLoading.hide();
                        $scope.artilceList = data;
                    }).error(function (err) {
                    alert('loading err');
                });
            }

        }
        $timeout(function () {
            $scope.changeAppName();
        }, 2000);

        $http.get(constants.SERVER_URL + '/templates/getArticleById?articleId=' + $stateParams.articleId)
            .success(function (data) {
                $ionicLoading.hide();
                $scope.selectedArticle = data;
            }).error(function (err) {
            alert('loading err');
        });

        $http.get(constants.SERVER_URL + '/templates/getArticles?appId=' + $rootScope.appId + "&categoryId=" + $stateParams.categoryId)
            .success(function (data) {
                $ionicLoading.hide();
                $scope.artilceList = data;
            }).error(function (err) {
            alert('loading err');
        });

    });
