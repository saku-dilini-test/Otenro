/**
 * Created by udeshikaperera on 26/08/2015.
 **/
(function() {
    angular.module('appEdit').service('publishService', [
        '$mdDialog', '$http', 'SERVER_URL','$q','Upload','$rootScope', publishService
    ]);

    function publishService($mdDialog, $http, SERVER_URL, $q, Upload,$rootScope) {
        return {
            showPublishToAppStoreDialog: function() {
                return $mdDialog.show({
                    controller: 'PublishCtrl',
                    templateUrl: 'user/edit/publish/publishToAppStoreView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            showPublishToGooglePlayDialog: function() {
                return $mdDialog.show({
                    controller: 'PublishCtrl',
                    templateUrl: 'user/edit/publish/publishToGooglePlayView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            addGooglePlayInfo: function(file,playStoreData){
                return Upload.upload({
                    url: SERVER_URL + 'edit/setPublishDetails',
                    fields: {
                        'appId':$rootScope.appId,
                        'name': playStoreData.name,
                        'springBoardName':playStoreData.springBoardName,
                        'language':playStoreData.language,
                        'primaryCategory':playStoreData.primaryCat,
                        'secondaryCategory':playStoreData.secondaryCat,
                        'description':playStoreData.desc,
                        'keywords':playStoreData.keywords,
                         file: file
                    }

                });
            },
            getAllLanguages:function(){
                return $http.get(SERVER_URL + 'edit/getAllLanguages');
            },
            getExistingData:function(){
                return $http.get(SERVER_URL + 'edit/getLanguage?appId='+$rootScope.appId);
            },
            getAllPrimaryCategories:function(){
                 return $http.get(SERVER_URL + 'edit/getAllPrimaryCategories?appId='+$rootScope.appId);
             },
            getAllSecondaryCategories:function(){
                return $http.get(SERVER_URL + 'edit/getAllSecondaryCategories?appId='+$rootScope.appId);
            },
//addGooglePlayInfo: function(file,playStoreData){
//console.log('playStoreData.name '+playStoreData.name);
//                 return $http.post(SERVER_URL+ 'edit/setPublishDetails'+ playStoreData   );
//            },
        };
    }
})();


