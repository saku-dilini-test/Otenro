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
        .controller('DashboardCtrl', ['$scope','dashboardService','toastr','$state', DashboardCtrl]);

    function DashboardCtrl($scope, dashboardService,toastr,$state) {

        dashboardService.getAllApps().success(function (data) {
            $scope.widgets=data;
        }).error(function (err) {
            toastr.error(err.error, 'Error', {
                closeButton: true
            });
        });

        $scope.goToEdit = function(item){
            $state.go('user.editApp',{appId: item.id});
        }
    }
})();