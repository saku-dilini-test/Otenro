/**
 * Created by udeshikaperera on 15/08/2015.
 */
(function(){
    "use strict";
    angular.module('oblMenu').controller('OblMenuCtrl',[
        '$scope','$rootScope','dialogService',
        OblMenuCtrl
    ]);

    function OblMenuCtrl($scope,$rootScope,dialogService){

        $scope.showMenu = true;

        this.setActiveElement = function(el){
            $scope.activeElement = el;
        };

        this.getActiveElement = function(){
          return $scope.activeElement;
        };

        this.setRoute = function(route){
            $rootScope.$broadcast('obl-menu-item-selected-event',{route:route});
        };

        this.showAlert = function(clickTitle) {
            dialogService.showDialog(clickTitle);
        };

        $scope.$on('obl-menu-show',function(evt, data){
           $scope.showMenu = data.show;
        });
    }
})();