/**
 * Created by udeshikaperera on 26/08/2015.
 */
(function(){
    angular.module('appEdit').controller('AppEditAreaCtrl',[
        '$scope', '$stateParams', '$rootScope', '$auth', 'appEditResource', 'userProfileService', 'ME_APP_SERVER','toastr',
        AppEditAreaCtrl]);

    function AppEditAreaCtrl($scope,$stateParams,$rootScope,$auth,appEditResource,userProfileService,ME_APP_SERVER,toastr){

        $rootScope.bodyClass = 'appEdit';

        $scope.appId = $stateParams.appId;
        $rootScope.appId = $stateParams.appId;
        $scope.appTemplateUrl = ME_APP_SERVER+'temp/'+$auth.getPayload().id
                                +'/templates/'+$stateParams.appId;

        console.log($scope.appTemplateUrl);
        $scope.buildSource = function () {
            appEditResource.buildApp({appId: $stateParams.appId})
                .success(function(data) {
                    toastr.success('Successfully Build ', 'Congratulation!', {
                        closeButton: true
                    });
                }).error(function(err) {
                    toastr.error('Cant Build', 'Error', {
                        closeButton: true
                    });
             });
        };
        $scope.expand = false;
        $scope.clicked = function(){
               $scope.expand = !($scope.expand);
        };

        $scope.profileView = function() {
           return userProfileService.showUserProfileDialog();
        }
    }
})();