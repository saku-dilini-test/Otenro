/**
 * Created by Shashan on 11/23/16.
 */
/**
 * Edited by kalani on 11/23/16.
 */
mobileApp.controller('orderHistoryCtrl', function($scope,$rootScope,constants,$http) {

     //get currency
     $http.get(constants.server_url + 'cmd=getCurrency&appId='+$scope.appId).success(function(data) {
            $scope.currency = data.currency;
        }).error(function(err) {
            alert('warning', "Unable to get Products Selected Category", err.message);
        });
  try {
        $scope.appUserId = angular.fromJson(localStorage.getItem("appLocalStorageUser"+$rootScope.appId)).registeredUser;
        $scope.orders = angular.fromJson(localStorage.getItem("history"+$rootScope.appId+$scope.appUserId));
        var image = [];
        var moreImages = [];

        //change imgURL
        for(var i=0;i<$scope.orders.length;i++){
            if($scope.orders[i].item.length == 1){
                changeImage(i);
            }else{
              for(var k=0;k<$scope.orders[i].item.length;k++){
                changeImages(i,k);
              }
            }

            function changeImages(i,k){
                $http.get(constants.server_url+"cmd=viewImages&userId=" +$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=thirdNavi/"+$scope.orders[i].item[k].imgURL).success(function(data) {
                  moreImages.splice(i, 0, {img:data.imageSrc,i:i,k:k});
                  changeImagePaths()
                }).error(function(err) {
                  return err;
                });
            }

            function changeImage(i){
            console.log($scope.orders)
              $http.get(constants.server_url+"cmd=viewImages&userId=" +$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=thirdNavi/"+$scope.orders[i].item[0].imgURL).success(function(data) {
                  image.splice(0, 0, {img:data.imageSrc,i:i});
                  changeImagePath()
                }).error(function(err) {
                return err;
                });
            }
            function changeImagePath(){
                  for(var j=0;j<$scope.orders.length;j++){
                    var i = image[j].i;
                    $scope.orders[i].item[0].imgURL = image[j].img
                    $scope.orderHistory = $scope.orders;
                  }

            }
            function changeImagePaths(){
                  for(var j=0;j<moreImages.length;j++){
                    var i = moreImages[j].i;
                    var k = moreImages[j].k;
                    $scope.orders[i].item[k].imgURL = moreImages[j].img
                    $scope.orderHistory = $scope.orders;

                  }

            }
        }
       }
       catch(err) {
          console.log("no orderHistory");
       }

});