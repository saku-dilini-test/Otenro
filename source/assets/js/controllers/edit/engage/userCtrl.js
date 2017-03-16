(function() {
    'use strict';
    angular.module("appEdit").controller("UserCtrl", ['$scope', 'initialData','$mdDialog', '$rootScope', '$auth', 'toastr',
        'engageService', '$http', 'SERVER_URL', UserCtrl]);




    function UserCtrl($scope, $mdDialog, $rootScope, initialData,$auth, toastr, engageService, $http, SERVER_URL,$log ) {


        //get all app registered user details

        var getAppUserData = function () {
            engageService. getAppUserData()
                .success(function (result) {
                    for(var i=0; i<result.length; i++){
                        var date = new Date(result[i].updatedAt);
                        $scope.year = date.getFullYear();
                        $scope.month = date.getMonth() + 1;
                        $scope.date = date.getDate();
                        result[i].registeredDate = $scope.year + "-" + $scope.month + "-" + $scope.date;
                    }
                    $scope.appuserList = result;
                }).error(function (error) {
                toastr.error('Loading Error', 'Warning', {
                    closeButton: true
                });
            })
        }
        getAppUserData();
        
        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.redirect = function(data){
            return engageService.showAllordersView(data);
        };

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.backToUserView = function(){
            return engageService.showAppUserDialog();
        };

        if(initialData != null) {
            $scope.user = initialData;
              var  registeredUser= $scope.user.id;
            engageService.getUserOrders(registeredUser)
                .success(function (data) {
        
                    $scope.orders = data;
                  
                })
                .error(function (err) {
                    $log.debug(err);
                });
        }
       
      
    }

})();
