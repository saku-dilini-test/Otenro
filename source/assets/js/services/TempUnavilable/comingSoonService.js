/**
 * Created by udeshikaperera on 21/08/2015.
 */
(function(){
    "use strict";
    angular.module('app').service('comingSoonService',[
        '$http','SERVER_URL','$mdDialog','commerceService',comingSoonService
    ]);

    function comingSoonService($http,SERVER_URL,$mdDialog,commerceService){
        return {
            showComingSoonDialog: function () {
                return $mdDialog.show({
                    controllerAs: 'dialogCtrl',
                    controller: function($mdDialog){

                        this.confirm = function click(){
                            $mdDialog.hide();
                            
                        }
                    },
                    template:'<md-dialog aria-label="Edit Child Menu">'+
                    '<md-content >' +
                    '<div class="md-dialog-header">' +
                    '<h1>Coming soon !!!!!</h1>' +
                    '                </div> <br>'+
                    ' <div style="text-align:center"><lable> This Feature will be coming soon! </lable></div>' +
                    '<br><br><div class="md-dialog-buttons">'+
                    '<div class="inner-section">'+
                    '<md-button class="me-default-button" ng-click="dialogCtrl.confirm()">Ok</md-button>'+
                    '</div>'+
                    '</div>' +
                    '</md-content>' +
                    '</md-dialog>'
                })
            },
            showComingSoonDialogWithCallBackFunction: function (service,callBackFunction) {
                return $mdDialog.show({
                    controllerAs: 'dialogCtrl',
                    controller: function($mdDialog){

                        this.confirm = function click(){
                            $mdDialog.hide();
                            if (service=='commerceService'){
                                if (callBackFunction=='showStoreSettingsDialog'){
                                    commerceService.showStoreSettingsDialog();
                                }
                            }
                        }
                    },
                    template:'<md-dialog aria-label="Edit Child Menu">'+
                    '<md-content >' +
                    '<div class="md-dialog-header">' +
                    '<h1>Coming soon !!!!!</h1>' +
                    '                </div> <br>'+
                    ' <div style="text-align:center"><lable> This Feature will be coming soon! </lable></div>' +
                    '<br><br><div class="md-dialog-buttons">'+
                    '<div class="inner-section">'+
                    '<md-button class="me-default-button" ng-click="dialogCtrl.confirm()">Ok</md-button>'+
                    '</div>'+
                    '</div>' +
                    '</md-content>' +
                    '</md-dialog>'
                })
            },
        };
    }
})();