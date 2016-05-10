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
                    clickOutsideToClose: true,
                    locals : {
                      item : 'AppStore',
                    }
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
                    clickOutsideToClose: true,
                    locals : {
                      item : 'GooglePlay',
                    }
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            addGooglePlayInfo: function(file,playStoreData,splash){
                return Upload.upload({
                    url: SERVER_URL + 'edit/setPublishDetails',
                    fields: {
                        'appId':$rootScope.appId,
                        'category':playStoreData.category,
                        'name': playStoreData.name,
                        'springBoardName':playStoreData.springBoardName,
                        'language':playStoreData.language,
                        'primaryCategory':playStoreData.primaryCat,
                        'secondaryCategory':playStoreData.secondaryCat,
                        'description':playStoreData.desc,
                        'keywords':playStoreData.keywords,
                        'copyrights':playStoreData.copyrights,
                        'marketingUrl':playStoreData.marketingUrl,
                        'privacyPolicyUrl':playStoreData.privacyPolicyUrl,
                        'supportUrl':playStoreData.supportUrl,
                         file: file,
                         splash1:splash.splash1,
                         splash2:splash.splash2,
                         splash3:splash.splash3,
                         splash4:splash.splash4

                    }

                });
            },
            getAllLanguages:function(){
                return $http.get(SERVER_URL + 'edit/getAllLanguages');
            },
            getAllRatings:function(){
                return $http.get(SERVER_URL + 'edit/getAllRatings');
            },
            getExistingData:function(category){
                return $http.get(SERVER_URL + 'edit/getLanguage?appId='+$rootScope.appId+'&category='+category);
            },
            getExistingDataAppStore:function(category){
                            return $http.get(SERVER_URL + 'edit/getLanguage?appId='+$rootScope.appId+'&category='+category);
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



