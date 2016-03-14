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
        .controller('DashboardCtrl', ['$scope','dashboardService','toastr','$state','ME_APP_SERVER',
            'mySharedService', DashboardCtrl]);

    function DashboardCtrl($scope, dashboardService,toastr,$state,ME_APP_SERVER,mySharedService) {

        dashboardService.getAllApps().success(function (data) {
            $scope.widgets=data;
        }).error(function (err) {
            toastr.error(err.error, 'Error', {
                closeButton: true
            });
        });

        $scope.goToEdit = function(item){

            var url= ME_APP_SERVER+'temp/'+item.userId
                +'/templates/'+item.id+'/?'+new Date().getTime();

            mySharedService.prepForBroadcast(url);
            $state.go('user.editApp',{appId: item.id});
        }
    }
})();