angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

    .controller('HomeCtrl', function($scope,$http,constants,$rootScope) {

    })

    .controller('secondNaviCtrl', function($scope,$http,constants,$rootScope) {
      $scope.appId = $rootScope.appId;

      $http.get(constants.SERVER_URL + '/templates/getSpecificChild?appId='+$rootScope.appId)
          .success(function(data) {
            $scope.secondNaviList = data;
            console.log(data);
          }).error(function(err) {
            alert('loading err');
          });
    })

    .controller('articleCtrl', function($scope,$http,constants,$rootScope,$stateParams,$timeout) {

      $scope.appId = $rootScope.appId;

        $scope.getArticleList = function(){
            $http.get(constants.SERVER_URL + '/templates/getArticles?appId='+$rootScope.appId)
                .success(function(data) {
                    $scope.artilceList = data;
                }).error(function(err) {
                    alert('loading err');
                });
        }
        $timeout( function(){
            $scope.getArticleList();
        }, 1000);

        $http.get(constants.SERVER_URL + '/templates/getArticleById?articleId='+$stateParams.articleId)
            .success(function(data) {
                console.log(data);
                $scope.selectedArticle = data;
            }).error(function(err) {
                alert('loading err');
            });

    });
