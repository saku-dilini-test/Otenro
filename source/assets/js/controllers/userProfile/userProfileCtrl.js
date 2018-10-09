/**
 * @ngdoc function
 * @name appBuilderApp.controller:WelcometemplatesCtrl
 * @description
 * # WelcometemplatesCtrl
 * Controller of the appBuilderApp
 */

(function() {
    'use strict';
    var mobileVerificationPin;
    angular.module('app')
    .directive('disallowSpaces', function() {
      return {
        restrict: 'A',

        link: function($scope, $element) {
          $element.bind('input', function() {
            $(this).val($(this).val().replace(/ /g, ''));
          });
        }
      };
    }).controller('userProfileCtrl',
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
        $scope.isPinReqSuccess = false;

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
                toastr.error(err.error, 'Error', {
                    closeButton: true
                });
            });
        }




        $scope.editUserProfile = function(params){
           if ($scope.isValidationOk(params.currentPassword, params.password) == true ) {
               if (!params.currentPassword || !params.password) {
                   params.method = 'WITHOUT_PASSWORD';
               } else {
                   params.method = 'WITH_PASSWORD';
               }
               userProfileResource.editUserProfile(params).then(function(response){
                   if (response.data.message === 'success') {
                       toastr.success('Successfully updated user details.', 'Success', {
                           closeButton: true
                       });
                       $scope.backToView(0);
                   }
                   if (response.data.message === 'NOT_FOUND') {
                       toastr.error('Current password is wrong.', 'Error', {
                           closeButton: true
                       });
                   }
                   if (response.data.message === 'ERROR') {
                       toastr.error('Failed to update profile details.', 'Error', {
                           closeButton: true
                       });
                   }
                   if (response.data.message === 'EXISTS') {
                       toastr.error('Mobile number is already registered. Try with another mobile number!', 'Error', {
                           closeButton: true
                       });
                   }
                   if (response.data.message === 'verify_mobile') {
                       toastr.success('Please check your mobile and enter verification pin to update mobile number.', 'Success', {
                           closeButton: true
                       });
                       $scope.isPinReqSuccess = true;
                   }
               });
           }
           else{
                   if($scope.isValidationOk(params.currentPassword, params.password) == params.currentPassword) {
                       toastr.error('Please enter a  new password!', 'Error',{
                            closeButton: true
                       });
                   }
                   else {
                        toastr.error('You are not allowed to change password without entering current password!', 'Error', {
                            closeButton: true
                        });
                   }
           }

        };
        $scope.saveBillings = function(billingEdit){
            billingEdit.userId = $auth.getPayload().id;
            userProfileResource.editBillingDetails(billingEdit).then(function(data){
                 toastr.success('Successfully Changed', 'Success', {
                     closeButton: true
                 });
                $scope.backToView(1);
            })
        };
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
        };
        $scope.updateUserProfileWithMobile = function (params) {
            if ($scope.isValidationOk(params.currentPassword, params.password)) {
                if (!params.currentPassword || !params.password) {
                    params.method = 'WITHOUT_PASSWORD';
                }else {
                    params.method = 'WITH_PASSWORD';
                }
                params.mobileVerificationPin = $scope.mobileVerificationPin;
                userProfileResource.updateUserProfileWithMobile(params).then(function(response){
                    if (response.data.message === 'success') {
                        $scope.mobileVerificationPin = null;
                        toastr.success('Successfully updated user details.', 'Success', {
                            closeButton: true
                        });
                        $scope.isPinReqSuccess = false;
                        $scope.backToView(0);
                    }
                    if (response.data.message === 'wrong pin') {
                        toastr.error('You entered a wrong pin. Enter correct!', 'Error', {
                            closeButton: true
                        });
                    }
                    if (response.data.message === 'NOT_FOUND') {
                        toastr.error('Current password is wrong.', 'Error', {
                            closeButton: true
                        });
                    }
                    if (response.data.message === 'ERROR') {
                        toastr.error('Failed to update profile details.', 'Error', {
                            closeButton: true
                        });
                    }
                });
            }
            else{
                toastr.error('You are not allowed to change password without entering current password!', 'Error', {
                    closeButton: true
                });
            }


        };
        /**
         * Check whether user try to update profile details with password without entering currentPassword
         * @param currentPassword - current password
         * @param newPassword - new password
         *
         * @return boolean
         **/
        $scope.isValidationOk = function (currentPassword, newPassword) {
            if (newPassword) {
                if (!currentPassword) {
                    return false;
                } else {
                    return true;
                }
            }
            if (currentPassword) {
                return currentPassword;
            }
            else{
                return true;
            }
        };
    }
})();