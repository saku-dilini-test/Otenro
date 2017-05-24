/**
 * Created by amila on 4/1/16.
 */


mobileApp.controller('categoryCtrl', function($scope,$stateParams,$rootScope,$http,constants,readMadeEasy,$log) {

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

    readMadeEasy.readFile().success(function(data){
        $scope.appId = data.appId;

        $scope.imageURL = constants.SERVER_URL
            +"/templates/viewImages?userId="
            +data.userId+"&appId="+data.appId+"&"+new Date().getTime()+"&img=secondNavi";

        
      $http.get(constants.server_url + 'cmd=getSpecificChild&appId='+$scope.appId).success(function(res) {
          $scope.categories = res.data;
          console.log($scope.categories);

      }).error(function(err) {
          alert('warning', "Unable to get categories", err.message);
      });

      $http.get(constants.server_url + "cmd=getIconAllowance&appId="+$rootScope.appId)
        .success(function(res){
        console.log('fffffffffffff'+JSON.stringify(res));


        },function(err){
          $log.debug(err);
        })
    });

});