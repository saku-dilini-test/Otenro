/**
 * Created by amila on 4/1/16.
 */


mobileApp.controller('categoryCtrl', function($scope,$stateParams,$rootScope,$http,constants,readMadeEasy,$ionicLoading,$ImageCacheFactory,$filter) {

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
  
    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;
    $ionicLoading.show({
        template: '<ion-spinner icon="spiral"></ion-spinner>',
    });

    readMadeEasy.readFile().success(function(data){
        $scope.appId = data.appId;

        $scope.imageURL = constants.SERVER_URL
            +"/templates/viewImages?userId="
            +data.userId+"&appId="+data.appId+"&"+new Date().getTime()+"&img=secondNavi";

        
      $http.get(constants.SERVER_URL + '/templates/getSpecificChild?appId='+$scope.appId).success(function(data) {
            var imagePathArray = [];

            data.forEach(function(category){
                category.fullImagePath = $scope.imageURL + "/" + category.imageUrl;
                imagePathArray.push(category.fullImagePath);
            });  

            var sortedCategories = $filter('orderBy')(data, 'createdAt', true);

            $ImageCacheFactory.Cache(imagePathArray).then(function(){
                console.log("Images done loading!");

                $scope.categories = sortedCategories;
                $ionicLoading.hide();                
            },function(failed){
                console.log("An image filed: "+failed);
                $scope.categories = sortedCategories;
                $ionicLoading.hide();                 
            });  
      }).error(function(err) {
          alert('warning', "Unable to get categories", err.message);
      });
    });

});