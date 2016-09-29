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
            addGooglePlayInfo: function(playStoreData){

                   /* return $http.post(SERVER_URL+ 'edit/setPublishDetails',playStoreData);
*/
                return Upload.upload({
                    url: SERVER_URL + 'edit/setPublishDetails',
                    fields: {
                     'appId':$rootScope.appId,
                     'category':playStoreData.category,
                     'title': playStoreData.title,
                     'shortDescription':playStoreData.shortDescription,
                     'language':playStoreData.language,
                     'primaryCategory':playStoreData.primaryCat,
                     'secondaryCategory':playStoreData.secondaryCat,
                     'fullDescription':playStoreData.fullDescription,
                     'copyrights':playStoreData.copyrights,
                     'marketingUrl':playStoreData.marketingUrl,
                     'privacyPolicyUrl':playStoreData.privacyPolicyUrl,
                     'supportUrl':playStoreData.supportUrl,
                     'applicationType':"Application",
                     'contentRating': "Everyone",
                     'email':playStoreData.email,
                     'appType':'GooglePlay'
                     },
                    file:null
                });
            },
            uploadPublishFiles: function(file,imgId){
                return Upload.upload({
                        url: SERVER_URL + 'edit/uploadPublishFiles',
                        fields: {
                            'appId':$rootScope.appId,
                            'imgId':imgId,
                        },
                        file: file
                    });
            },
            addContentRating: function(contentRating){
                return Upload.upload({
                    url: SERVER_URL + 'edit/setContentRating',
                    fields: {
                        'appId':$rootScope.appId,
                        'category':contentRating.category,
                        'alcoholViolence':contentRating.alcoholViolence,
                        'cartoonViolence': contentRating.cartoonViolence,
                        'gamblingViolence':contentRating.gamblingViolence,
                        'horrorViolence':contentRating.horrorViolence,
                        'matureViolence':contentRating.matureViolence,
                        'nudityViolence':contentRating.nudityViolence,
                        'profanityViolence':contentRating.profanityViolence,
                        'realisticViolence':contentRating.realisticViolence,
                    }

                });
            },
            addAppReviewInformation: function(appReview){
                return Upload.upload({
                    url: SERVER_URL + 'edit/setAppReviewInformation',
                    fields: {
                        'appId':$rootScope.appId,
                        'category':appReview.category,
                        'firstName':appReview.firstName,
                        'lastName': appReview.lastName,
                        'email':appReview.email,
                        'phoneNumber':appReview.phoneNumber,
                        'demoAccountUser':appReview.demoAccountUser,
                        'password':appReview.demoAccountPassword
                    }

                });
            },


            getAllLanguages:function(){
                return $http.get(SERVER_URL + 'edit/getAllLanguages');
            },
            getAllRatings:function(){
                return $http.get(SERVER_URL + 'edit/getAllRatings');
            },
            getExistingData:function(appType){
                return $http.get(SERVER_URL + 'edit/getLanguage?appId='+$rootScope.appId+'&appType='+appType);
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



