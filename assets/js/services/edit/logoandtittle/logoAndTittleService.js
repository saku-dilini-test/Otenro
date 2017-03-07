/**
 * Created by udeshikaperera on 26/08/2015.
 */
(function(){
    angular.module('appEdit').service('logoAndTittleService',[
       '$mdDialog','$http','SERVER_URL','Upload','$rootScope',logoAndTittleService
    ]);

    function logoAndTittleService($mdDialog,$http,SERVER_URL,Upload,$rootScope){
        return {
            showLogoAndTittleDialog: function(){
               return $mdDialog.show({
                   controller: 'LogoAndTittleCtrl',
                   templateUrl: 'user/edit/logoandtittle/logoAndTittleView.html',
                   clickOutsideToClose:true
               }).then(function(answer) {

                       //$scope.status = 'You said the information was "' + answer + '".';
                   }, function() {
                       //$scope.status = 'You cancelled the dialog.';
                   });
           },
            addLogoImage: function(file){
                return Upload.upload({
                    url: SERVER_URL + 'edit/addLogoImage',
                    fields: {
                        'appId':$rootScope.appId
                    },
                    file: file
                });
            }
        };
    }
})();