/**
 * Created by amila on 4/1/16.
 */


mobileApp.controller('categoryCtrl', function($scope,$stateParams,$rootScope,$http,constants,readMadeEasy) {

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
    readMadeEasy.readFile().success(function(appData){
    $scope.imageURL = constants.SERVER_URL
        +"/templates/viewImages?userId="
        +appData.userId+"&appId="+appData.appId+"&"+new Date().getTime()+"&img=secondNavi";

        console.log($scope.imageURL);

    $http.get(constants.SERVER_URL + '/templates/getSpecificChild?appId='+appData.appId).success(function(data) {
        $scope.categories = data;
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
          console.log(err);
        })
    });

});