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

        $scope.changeAppName = function () {
            $scope.appName = $rootScope.appName;
            var image = [];
            $http.get(constants.server_url + 'cmd=getArticleCategoryByAppId&appId=' + $rootScope.appId)
                .success(function (data) {
                    for(i=0;i<(data.length);i++){
                        getData(i)
                    }
                    function getData(i){
                        $http.get(constants.server_url+"cmd=viewImages&userId="+$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=category/"+data[i].imageUrl).success(function(Data) {
                        image.splice(i, 0, {img:Data.imageSrc});
                        replaceByValue(data,data[i].imageUrl,image[i].img)
                        }).error(function(err) {
                            alert('warning', "Unable to get categories", err.message);
                        });

                    }

                    function replaceByValue(imageData,equalImage,image) {
                        //console.log(imageData[0].imageUrl)

                        //console.log(image)

                        for( var k = 0; k < imageData.length; k++ ) {
                            if( equalImage == imageData[k].imageUrl ) {

                          //console.log('dsadsadsadasdadsad'+imageData[k].imageUrl)
                          //console.log('dsadsadsadasdadsad'+image)

                            imageData[k].imageUrl = image ;
                            console.log(imageData)
                            $scope.articleCategoryList = data;

                            }
                        }


                    }
                }).error(function (err) {
                alert('loading err');
            });
        }

        $timeout(function () {
            $scope.changeAppName();
        }, 1000);



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

    .controller('HomeCtrl', function ($scope, $http, constants, $rootScope, $timeout, $state, $ionicLoading,$log, readMadeEasy) {

        $scope.appName = $rootScope.appName;

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
            var image = [];

/*            $scope.imageURL =
                        constants.SERVER_URL
                        +"/templates/viewImages?userId="
                        +$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=category";*/



            $http.get(constants.server_url + 'cmd=getArticleCategoryByAppId&appId=' + $rootScope.appId)
                .success(function (data) {
                    $ionicLoading.hide();
                    for(i=0;i<(data.length);i++){
                        getData(i)
                    }
                    function getData(i){
                        $http.get(constants.server_url+"cmd=viewImages&userId="+$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=category/"+data[i].imageUrl).success(function(Data) {
                        image.splice(i, 0, {img:Data.imageSrc});
                        replaceByValue(data,data[i].imageUrl,image[i].img)
                        }).error(function(err) {
                            alert('warning', "Unable to get categories", err.message);
                        });

                    }

                    function replaceByValue(imageData,equalImage,image) {
                        //console.log(imageData[0].imageUrl)

                        //console.log(image)

                        for( var k = 0; k < imageData.length; k++ ) {
                            if( equalImage == imageData[k].imageUrl ) {

                          //console.log('dsadsadsadasdadsad'+imageData[k].imageUrl)
                          //console.log('dsadsadsadasdadsad'+image)

                            imageData[k].imageUrl = image ;
                            console.log(imageData)
                            $scope.articleCategoryList = data;

                            }
                        }


                    }

                   console.log('data.ArticleData='+$scope.articleCategoryList)
                }).error(function (err) {
                alert('loading err');
            });
        }

        $timeout(function () {
            $scope.changeAppName();
        }, 1000);


    })

    .controller('contactUsCtrl', function ($scope, $http, constants, $rootScope, $ionicLoading,$log) {
        $ionicLoading.show({
            template: '<ion-spinner icon="lines" ></ion-spinner>'
        });
        $scope.appId = $rootScope.appId;
        $scope.appName = $rootScope.appName;

        $http.get(constants.server_url + 'cmd=getContactUs&appId=' + $scope.appId).success(function (data) {
            $scope.address = data.address;
            $scope.email = data.email;
            $scope.webSite = data.webSite;
            $scope.telPhone = data.telPhone;
            $scope.coords =data.coords;
            $scope.googleMap = data;

            $scope.myLatLng = {lat: $scope.coords.latitude, lng: $scope.coords.longitude};
            $scope.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: $scope.myLatLng
            });

            $scope.marker = new google.maps.Marker({
                position: $scope.myLatLng,
                map:  $scope.map,
                title: data.address
            });

            $ionicLoading.hide();

        }).error(function (err) {
            alert('warning', "Unable to get contact us info", err.message);
        });


    })

    .controller('aboutUsCtrl', function ($scope, $rootScope, $http,$ionicLoading, constants,$log) {
        $scope.appName = $rootScope.appName;
        $scope.aboutUs = "A guide to things to see and do in Hong Kong. This is a demo app built using Otenro. Please visit www.otenro.com for further information.";

        var data = {
            appId: $rootScope.appId
        }

        $http.post(constants.server_url + "cmd=getAboutUs&appId=" + $rootScope.appId)
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
        $http.get(constants.server_url + "cmd=getPolicies&appId="+$rootScope.appId)
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

        $http.get( constants.server_url + 'cmd=getTermsAndConditions&appId='+$scope.appId).success(function(data) {
            $scope.terms = data.termsAndCondition;
        }).error(function(err) {
            alert('warning', "Unable to get terms & condition info", err.message);
        });

        $scope.terms = "This is terms and condition of this application ";
    })

    .controller('articleCtrl', function ($scope, $http, constants, $rootScope, $stateParams, $timeout, $ionicLoading,initialData,readMadeEasy,$log) {



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
            $http.get(constants.server_url+"cmd=viewImages&userId="+$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=article/"+getInitialData.data.imageUrl).success(function(Data) {
                getInitialData.data.imageUrl = Data.imageSrc ;
                $scope.selectedArticle = getInitialData.data

                }).error(function(err) {
                    alert('warning', "Unable to get categories", err.message);
                });
        }
        $scope.imageURL = initialData.imageURL;
        var image = [];



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


/*            $scope.imageURL = constants.SERVER_URL
                +"/templates/viewImages?userId="
                +$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=article";*/

            if ($stateParams.categoryId == 'firstMenu') {
                $http.get(constants.server_url + 'cmd=getArticleCategoryByAppId&appId=' + $rootScope.appId)
                    .success(function (catList) {
                    for(i=0;i<(catList.length);i++){
                        getData(i)
                    }
                    function getData(i){
                        $http.get(constants.server_url+"cmd=viewImages&userId="+$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=article/"+catList[i].imageUrl).success(function(Data) {
                        image.splice(i, 0, {img:Data.imageSrc});
                        replaceByValue(catList,catList[i].imageUrl,image[i].img)
                        }).error(function(err) {
                            alert('warning', "Unable to get categories", err.message);
                        });

                    }

                    function replaceByValue(imageData,equalImage,image) {
                        //console.log(imageData[0].imageUrl)

                        //console.log(image)

                        for( var k = 0; k < imageData.length; k++ ) {
                            if( equalImage == imageData[k].imageUrl ) {

                          //console.log('dsadsadsadasdadsad'+imageData[k].imageUrl)
                          //console.log('dsadsadsadasdadsad'+image)

                            imageData[k].imageUrl = image ;
                            console.log(imageData)
                            if (imageData.length > 0) {
                                var firstCat = imageData[0];
                                console.log('______________'+firstCat)
                                $http.get(constants.server_url + 'cmd=getArticles&appId=' + $rootScope.appId + "&categoryId=" + firstCat.id)
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
                        }


                    }
                    }).error(function (err) {
                    alert('loading err');
                });
            } else {
                $http.get(constants.server_url + 'cmd=getArticles&appId=' + $rootScope.appId + "&categoryId=" + $stateParams.categoryId)
                    .success(function (data) {
                    for(i=0;i<(data.length);i++){
                        getData(i)
                    }
                    function getData(i){
                        $http.get(constants.server_url+"cmd=viewImages&userId="+$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=article/"+data[i].imageUrl).success(function(Data) {
                        image.splice(i, 0, {img:Data.imageSrc});
                        replaceByValue(data,data[i].imageUrl,image[i].img)
                        }).error(function(err) {
                            alert('warning', "Unable to get categories", err.message);
                        });

                    }

                    function replaceByValue(imageData,equalImage,image) {
                        //console.log(imageData[0].imageUrl)

                        //console.log(image)

                        for( var k = 0; k < imageData.length; k++ ) {
                            if( equalImage == imageData[k].imageUrl ) {

                          //console.log('dsadsadsadasdadsad'+imageData[k].imageUrl)
                          //console.log('dsadsadsadasdadsad'+image)

                            imageData[k].imageUrl = image ;
                            console.log(imageData)
                            $scope.artilceList = data;

                            }
                        }


                    }
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
