/**
 * Created by Shashan on 06/11/2017.
 */

(function() {
    'use strict';
    angular.module("appEdit").controller("GetAssistanceCtrl", ['$scope','userProfileResource','appEditResource','$mdDialog','$rootScope','getAssistanceService', GetAssistanceCtrl]);


    function GetAssistanceCtrl($scope,userProfileResource,appEditResource,$mdDialog,$rootScope,getAssistanceService) {

        //Get User Details
        userProfileResource.getUserProfile().success(function (data) {
            $scope.user = data;
        }).error(function (err) {
           console.err(err);
        });

        //Get app details
        appEditResource.getSelectedApp({appId: $rootScope.appId})
            .success(function(data) {
                $scope.appData = data;

                if($scope.appData.templateCategory == '2'){
                    $scope.appType = 'Ecommerce';
                }else{
                    $scope.appType = 'Article';
                }
            }).error(function(err) {

        });

        //Send an Email
        $scope.request = function(app,appType,user) {
            $scope.data = {
                appName: app.appName,
                appType: appType,
                userName: user.firstName +" "+ user.lastName,
                userEmail: user.email
            }

            getAssistanceService.sendGetAssistance($scope.data).success(function () {
                $mdDialog.hide();

                $mdDialog.show({
                    controllerAs: 'dialogCtrl',
                    controller: function($mdDialog){
                      this.confirm = function click(){
                        $mdDialog.hide();
                      }
                    },
                        template:'<md-dialog style="width:500px" aria-label="Thank you">'+
                                '<md-content >'+
                                    '<div class="md-dialog-header">'+
                                        '<h1>Thank you </h1>'+
                                    '</div>'+
                                    '<br>'+
                                    '<div class="md-dialog-header">'+
                                         '<lable>Thank you we will get back to you soon...</lable>'+
                                    '</div>'+
                                    '<br>'+
                                    '<div class="md-dialog-buttons">'+
                                        '<div class="inner-section">'+
                                             '<md-button class="me-default-button" ng-click="dialogCtrl.confirm()">ok</md-button>'+
                                        '</div>'+
                                    '</div>'+
                                '</md-content>'+
                             '</md-dialog>'
                })
            })
        }

        // --- cancel dialog -----
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    };

})();
