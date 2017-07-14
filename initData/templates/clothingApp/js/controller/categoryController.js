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

/*        $scope.imageURL = constants.SERVER_URL
            +"/templates/viewImages?userId="
            +data.userId+"&appId="+data.appId+"&"+new Date().getTime()+"&img=secondNavi";*/

        $log.debug($scope.imageURL);
        var image = [];
        
      $http.get(constants.server_url + 'cmd=getSpecificChild&appId='+$scope.appId).success(function(imageData) {
         // $scope.categories = data;

        for(i=0;i<(imageData.length);i++){

            getData(i)
        }

        function getData(i){
              $http.get(constants.server_url+"cmd=viewImages&userId="+data.userId+"&appId="+data.appId+"&"+new Date().getTime()+"&img=secondNavi/"+imageData[i].imageUrl).success(function(Data) {

                  image.splice(i, 0, {img:Data.imageSrc});
                   replaceByValue(imageData,imageData[i].imageUrl,image[i].img)
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
                    $scope.categories = imageData;
                }
            }

        }

          $log.debug("$scope.categories  " + $scope.categories );
      }).error(function(err) {
          alert('warning', "Unable to get categories", err.message);
      });

      $http.get(constants.server_url + "cmd=getIconAllowance&appId="+$rootScope.appId)
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