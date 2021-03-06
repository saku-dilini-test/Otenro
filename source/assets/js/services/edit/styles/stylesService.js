/**
 * Created by udeshikaperera on 26/08/2015.
 */
(function(){
    angular.module('appEdit').service('stylesService',[
       '$mdDialog','$http','SERVER_URL',stylesService
    ]);

    function stylesService($mdDialog,$http,SERVER_URL){
        return {
           showStyleDialog: function(){
               return $mdDialog.show({
                   controller: 'StylesCtrl',
                   templateUrl: 'user/edit/styles/manageStylesView.html',
                   clickOutsideToClose:true
               }).then(function(answer) {

                       //$scope.status = 'You said the information was "' + answer + '".';
                   }, function() {
                       //$scope.status = 'You cancelled the dialog.';
                   });
           },
            showStyleEditBackgorundImageDialog: function(){
                return $mdDialog.show({
                    controller: 'StylesCtrl',
                    templateUrl: 'user/edit/styles/manageStyleEditBackgroundImageView.html',
                    clickOutsideToClose:true
                }).then(function(answer) {

                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            addHeaderImage: function(Data){
                return $http.post(SERVER_URL + 'edit/addStyleImage/addHeaderImage', Data);
            },
            applyBackgroundImage : function(Data){
                return $http.post(SERVER_URL + 'edit/applyStyleImage/applyBackgroundImage', Data);
            },
            addBackgroundImage: function(Data){
                return $http.post(SERVER_URL + 'edit/addStyleImage/addBackgroundImage', Data);
            },
            // add background, navigation bar and footer color common function
            addStyleColor: function(Data){
                return $http.post(SERVER_URL + 'edit/addStyleColor',Data);
            },
            addBackgroundColor: function(Data){
                return $http.post(SERVER_URL + 'edit/addBackgroundColor',Data);
            },
            // add common function to change font family for header, content and footer
            addStyleFontFamily: function(Data){
                return $http.post(SERVER_URL + 'edit/addStyleFontFamily',Data);
            },
            // add common function to change font size for header, content and footer
            addStyleFontSize: function(Data){
                return $http.post(SERVER_URL + 'edit/addStyleFontSize',Data);
            },
            // add common function to change font weight for header, content and footer
            addStyleFontWeight: function(Data){
                return $http.post(SERVER_URL + 'edit/addStyleFontWeight',Data);
            },
            addStyleButtonBorderWidth: function(Data){
                return $http.post(SERVER_URL + 'edit/addStyleButtonBorderWidth',Data);
            },
            addStyleButtonBorderRadius: function(Data){
                return $http.post(SERVER_URL + 'edit/addStyleButtonBorderRadius',Data);
            },
            addFonts: function(Data){
                return $http.post(SERVER_URL + 'edit/addFonts',Data);
            },
            getAppSettings:function(Data){
                return $http.post(SERVER_URL+ 'edit/getAppSettings',Data);
            },
        };
    }
})();