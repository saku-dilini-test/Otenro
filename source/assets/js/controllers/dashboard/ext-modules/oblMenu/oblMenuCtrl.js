/**
 * Created by udeshikaperera on 15/08/2015.
 */
(function(){
    "use strict";
    angular.module('oblMenu').controller('OblMenuCtrl',[
        '$scope','$rootScope','dialogService','oblMenuService', 'contactUsService', 'toastr',
        OblMenuCtrl
    ]);

    function OblMenuCtrl($scope,$rootScope,dialogService,oblMenuService, contactUsService, toastr){

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
            if (clickTitle === 'googlePlay') {
                contactUsService.getContactUsInfo()
                    .success(function(result){
                        if (result.email) {
                            if (result.email !== '' && result.email !== undefined) {
                                dialogService.showDialog(clickTitle);
                            } else {
                                toastr.error('Add Contact email before publish','Error', {closeButton: true});
                            }
                        } else {
                            toastr.error('Add Contact email before publish', 'Error', {closeButton: true});
                        }
                    });
            } else {
                dialogService.showDialog(clickTitle);
            }
        };

        this.goOblMenuService = function(data){
            oblMenuService.setOblMenuService(data);
        };

        $scope.$on('obl-menu-show',function(evt, data){
           $scope.showMenu = data.show;
        });
    }
})();