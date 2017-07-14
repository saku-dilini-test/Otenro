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


    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;

    readMadeEasy.readFile().success(function(data){
        $scope.appId = data.appId;
        var image = [];

/*        $scope.imageURL = constants.SERVER_URL
            +"/templates/viewImages?userId="
            +data.userId+"&appId="+data.appId+"&"+new Date().getTime()+"&img=secondNavi";*/


      $http.get(constants.server_url + 'cmd=getSpecificChild&appId='+$scope.appId).success(function(imageData) {
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

      }).error(function(err) {
          alert('warning', "Unable to get categories", err.message);
      });
    });

});