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
      ['$scope', 'userProfileResource', 'CurrentUser', 'userProfileService','Auth','$auth','$state','$mdDialog','toastr','$log',
            userProfileCtrl
        ]);

    function userProfileCtrl($scope, userProfileResource, CurrentUser, userProfileService,Auth,$auth,$state,$mdDialog,toastr,$log) {

        $scope.password = false;
        $scope.maxMenuCategory = 20;
        $scope.maxAddressLength = 50;
        $scope.passwordRegularExpression = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{7,}";
        userProfileResource.getUserProfile().success(function (data) {
            $scope.original = angular.copy(data);
            $scope.userEdit = data;
            $scope.userRole = data.userRole;

        }).error(function (err) {
            /*toastr.error(err.error, 'Error', {
                closeButton: true
            });*/
        });

        $scope.accountType = "Free";
        $scope.activeTabIndex = 0;
        $scope.viewProfile = "Profile";
        $scope.viewBilling = "Billing Details";
        $scope.goToEditView = function (index){
            $scope.viewProfile = "";
            $scope.viewBilling = "";
            $scope.activeTabIndex = index;
        }

        $scope.backToView = function (index,resetData){
            $scope.viewProfile = "Profile";
            $scope.viewBilling = "Billing Details";
            if(resetData == 'userEdit'){
                $scope.userEdit = angular.copy($scope.original);
                $scope.userEdit.password = null;
                $scope.editProfile.$setPristine();
                $scope.editProfile.$setUntouched();
            }
            $scope.activeTabIndex = index;
        }

        $scope.cancel = function () {
            if (typeof $auth.getPayload() !== 'undefined' ){
                userProfileResource.getBillingDetails($auth.getPayload().id).success(function (data) {
                    $scope.billingEdit= data;
                    $scope.backToView(1);
                }).error(function (err) {
                    toastr.error(err.error, 'Error', {
                        closeButton: true
                    });
                });
            }
        }


        if (typeof $auth.getPayload() !== 'undefined' ){
            userProfileResource.getBillingDetails($auth.getPayload().id).success(function (data) {
                $scope.billingEdit= data;
                $scope.originalBillingData = angular.copy(data);
            }).error(function (err) {
                toastr.error(err, 'Error', {
                    closeButton: true
                });
            });
        }




        $scope.editUserProfile = function(params){
            $scope.password = false;
            $scope.user={
                email : params.email,
                password : params.currentPassword
            }
            Auth.login($scope.user).success(function() {
                userProfileResource.editUserProfile(params).then(function(data){
                    // $mdDialog.hide();
                    toastr.success('Successfully Changed', 'Success', {
                        closeButton: true
                    });
                    $scope.userEdit.password = "";
                    $scope.userEdit.confirmPassword = "";
                    $scope.backToView(0);
                });
            }).error(function(err) {
                $scope.password = true;
                $log.debug(err);
                toastr.error('Please check your Email/Password', 'Error', {
                  closeButton: true
                });
            })

            $scope.userEdit.currentPassword = "";

        };
        $scope.saveBillings = function(billingEdit){
            billingEdit.userId = $auth.getPayload().id;
            userProfileResource.editBillingDetails(billingEdit).then(function(data){
                 toastr.success('Successfully Changed', 'Success', {
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