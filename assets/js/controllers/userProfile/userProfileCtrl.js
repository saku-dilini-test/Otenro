/**
 * @ngdoc function
 * @name appBuilderApp.controller:WelcometemplatesCtrl
 * @description
 * # WelcometemplatesCtrl
 * Controller of the appBuilderApp
 */

(function() {
    'use strict';
    angular.module('app')
        .controller('userProfileCtrl',
      ['$scope', 'userProfileResource', 'userProfileService','Auth','$auth','$state','$mdDialog','toastr',
            userProfileCtrl
        ]);

    function userProfileCtrl($scope, userProfileResource, userProfileService,Auth,$auth,$state,$mdDialog,toastr) {


        userProfileResource.getUserProfile().success(function (data) {
            $scope.userEditData=data;
            console.log($scope.userEdit);
        }).error(function (err) {
            toastr.error(err.error, 'Error', {
                closeButton: true
            });
        });
        userProfileResource.getBillingDetails($auth.getPayload().id).success(function (data) {
              $scope.billingEdit=data[0];
              console.log($scope.billingEdit);
                }).error(function (err) {
                    toastr.error(err.error, 'Error', {
                        closeButton: true
                    });
                });

        $scope.editUserProfile = function(params){
            userProfileResource.editUserProfile(params).then(function(data){
                $mdDialog.hide();
                toastr.success('Successfully Changed', 'Success', {
                    closeButton: true
                });
            });
        };
        $scope.saveBillings = function(billingEdit){
            billingEdit.userId = $auth.getPayload().id;
            userProfileResource.editBillingDetails(billingEdit).then(function(data){
                 toastr.success('Successfully Changed', 'Success', {
                     closeButton: true
                 });
                 $mdDialog.hide();
            })
        }
        $scope.redirectToDashboard = function() {
            return userProfileService.gotoDashboard();
        };
        $scope.redirectToLogin = function() {
            $mdDialog.hide();
            Auth.logout();
            $state.go('anon.login');
           // return userProfileService.closeDialog();
            //return userProfileService.gotoLogin();
        };
        $scope.close = function() {
            return userProfileService.closeDialog();
        }
    }
})();