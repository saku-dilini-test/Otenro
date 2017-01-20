/**
 * Created by amila on 4/1/16.
 */


mobileApp.controller('categoryCtrl', function($scope,$stateParams,$rootScope,$http,constants,readMadeEasy,$log) {

    if (typeof $rootScope.appId === 'undefined'){

        readMadeEasy.readFile().success(function(data){
            $rootScope.appId = data.appId;
            $log.debug("appId " + $rootScope.appId);
        });
    }

    if (typeof $rootScope.userId === 'undefined'){

        readMadeEasy.readFile().success(function(data){
            $rootScope.userId = data.userId;
            $log.debug("userId " + $rootScope.userId);
        });
    }
    if (typeof $rootScope.appName === 'undefined'){

        readMadeEasy.readFile().success(function(data){
            $rootScope.appName = data.name;
            $log.debug("$rootScope.appName " + $rootScope.appName);
        });
    }


    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;

    readMadeEasy.readFile().success(function(data){
        $scope.appId = data.appId;

        $scope.imageURL = constants.SERVER_URL
            +"/templates/viewImages?userId="
            +data.userId+"&appId="+data.appId+"&"+new Date().getTime()+"&img=secondNavi";

        $log.debug($scope.imageURL);
        
      $http.get(constants.SERVER_URL + '/templates/getSpecificChild?appId='+$scope.appId).success(function(data) {
          $scope.categories = data;

          $log.debug("$scope.categories  " + $scope.categories );
      }).error(function(err) {
          alert('warning', "Unable to get categories", err.message);
      });

      $http.get(constants.SERVER_URL + "/app/getIconAllowance?appId="+$rootScope.appId)
        .success(function(data){
            if(data.allowPromote == true){
              $rootScope.allowOtenroToPromote = true;
              $rootScope.icon = data.icon;
            }
            else{
              $rootScope.allowOtenroToPromote = false;
              $rootScope.icon = null;
            }

        },function(err){
          $log.debug(err);
        })
    });

});