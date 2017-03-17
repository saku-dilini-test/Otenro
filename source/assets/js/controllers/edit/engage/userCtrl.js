(function() {
    'use strict';

    angular.module("appEdit").controller("UserCtrl", [
        '$scope', '$mdDialog', 'toastr', 'commerceService','initialData','engageService', 'currencyService', 'publishService', '$rootScope',
        'SERVER_URL', '$auth', 'ME_APP_SERVER', '$interval', '$q','aboutUsService','mySharedService','comingSoonService',
        '$filter','contactUsService','uiGmapGoogleMapApi','uiGridConstants','$templateCache','uiGridExporterConstants','uiGridExporterService','$log',
        UserCtrl]);



        function UserCtrl($scope, $mdDialog, toastr, initialData,commerceService, engageService,currencyService, publishService, $rootScope,
                              SERVER_URL, $auth, ME_APP_SERVER, $interval, $q,aboutUsService,mySharedService,comingSoonService, $filter,
                              contactUsService,uiGmapGoogleMapApi,uiGridConstants,$templateCache,uiGridExporterConstants,uiGridExporterService,sendDate,$log) {

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
