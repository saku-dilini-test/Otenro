/**
 * Created by amila on 4/1/16.
 */


mobileApp.controller('categoryCtrl', function($scope,$stateParams,$rootScope,$http,constants,readMadeEasy) {

    if (typeof $rootScope.appId === 'undefined'){

        readMadeEasy.readFile().success(function(data){
            $rootScope.appId = data.appId;
            console.log("appId " + $rootScope.appId);
        });
    }

    if (typeof $rootScope.userId === 'undefined'){

        readMadeEasy.readFile().success(function(data){
            $rootScope.userId = data.userId;
            console.log("userId " + $rootScope.userId);
        });
    }
    if (typeof $rootScope.appName === 'undefined'){

        readMadeEasy.readFile().success(function(data){
            $rootScope.appName = data.name;
            console.log("$rootScope.appName " + $rootScope.appName);
        });
    }


    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;

    readMadeEasy.readFile().success(function(data){
        $scope.appId = data.appId;

        $scope.imageURL = constants.SERVER_URL
            +"/templates/viewImages?userId="
            +$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=secondNavi";
        console.log($scope.imageURL);
        
      $http.get(constants.SERVER_URL + '/templates/getSpecificChild?appId='+$scope.appId).success(function(data) {
          $scope.categories = data;
          console.log("$scope.categories  " + $scope.categories );
      }).error(function(err) {
          alert('warning', "Unable to get categories", err.message);
      });
    });

});