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
      ['$scope', 'userProfileResource', 'CurrentUser', 'userProfileService','Auth','$auth','$state','$mdDialog','toastr',
            userProfileCtrl
        ]);

    function userProfileCtrl($scope, userProfileResource, CurrentUser, userProfileService,Auth,$auth,$state,$mdDialog,toastr) {

        $scope.password = false;
        $scope.maxMenuCategory = 20;
        $scope.passwordRegularExpression = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{7,}";
        userProfileResource.getUserProfile().success(function (data) {
            $scope.userEdit = data;
        }).error(function (err) {
            /*toastr.error(err.error, 'Error', {
                closeButton: true
            });*/
        });

        $scope.accountType = "Beta";
        $scope.activeTabIndex = 0;
        $scope.viewProfile = "Profile";
        $scope.viewBilling = "Billing Details";
        $scope.goToEditView = function (index){
            $scope.viewProfile = "";
            $scope.viewBilling = "";
            $scope.activeTabIndex = index;
        }

        $scope.backToView = function (index){
            $scope.viewProfile = "Profile";
            $scope.viewBilling = "Billing Details";
            $scope.activeTabIndex = index;
        }

        if (typeof $auth.getPayload().id !== 'undefined' ){
            userProfileResource.getBillingDetails($auth.getPayload().id).success(function (data) {
                $scope.billingEdit= data;
            }).error(function (err) {
                toastr.error(err.error, 'Error', {
                    closeButton: true
                });
            });
        }


        $scope.editUserProfile = function(params){
            $scope.user={
                email : params.email,
                password : params.currentPassword
            }
            Auth.login($scope.user).success(function() {
                userProfileResource.editUserProfile(params).then(function(data){
                    $mdDialog.hide();
                    toastr.success('Password successfully changed', 'Success', {
                        closeButton: true
                    });
                });
            }).error(function(err) {
                $scope.password = true;
                console.log(err);
                toastr.error('Please check your Email/Password', 'Error', {
                  closeButton: true
                });
            })

        };
        $scope.saveBillings = function(billingEdit){
            billingEdit.userId = $auth.getPayload().id;
            userProfileResource.editBillingDetails(billingEdit).then(function(data){
                 toastr.success('Password successfully changed', 'Success', {
                     closeButton: true
                 });
                $scope.backToView(1);
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