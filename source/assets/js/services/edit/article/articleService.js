/**
 * Created by amila on 5/9/16.
 */

(function() {
    angular.module('appEdit').service('articleService', [
        '$mdDialog','$http','$rootScope','Upload','SERVER_URL', articleService
    ]);

    function articleService($mdDialog,$http,$rootScope,Upload,SERVER_URL) {
        return {

            showArticleAnalyticsDialog: function () {
                return $mdDialog.show({
                    controller: 'articleAnalyticsCtrl',
                    templateUrl: 'user/edit/analytics/articleAnalytics.html',
                    clickOutsideToClose: true,
                    locals: {
                        initialData: null
                    }
                }).then(function (answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            showPublishArticleDialog: function(data,type,articleDetails) {
                console.log(data,type,articleDetails);
                return $mdDialog.show({
                    controller: 'ArticleCtrl',
                    templateUrl: 'user/edit/article/publishArticleView.html',
                    clickOutsideToClose: false,
                    locals : {
                        initialData : data,
                        type:type,
                        articleDetails : articleDetails
                    }
                });
            },
            showPreviewArticslesDilog: function(data) {
                return $mdDialog.show({
                    controller: 'ArticleCtrl',
                    templateUrl: 'user/edit/article/previewArticles.html',
                    clickOutsideToClose: true,
                    locals : {
                        initialData : data,
                        type:"showPreviewArticslesDilog",
                        articleDetails : null
                    }
                });
            },
            showCategoriesDialog: function(data) {
                return $mdDialog.show({
                    controller: 'ArticleCtrl',
                    templateUrl: 'user/edit/article/viewCategories.html',
                    clickOutsideToClose: true,
                    locals : {
                        initialData : data,
                        type:"showCategoriesDialog",
                        articleDetails: null
                    }
                });
            },
            addCategoryDialog: function(data) {
                return $mdDialog.show({
                    controller: 'ArticleCtrl',
                    templateUrl: 'user/edit/article/addCategories.html',
                    clickOutsideToClose: true,
                    locals : {
                        initialData : data,
                        type:"addCategoryDialog",
                        articleDetails: null
                    }
                });
            },
            editCategoryDialog: function(data) {
                return $mdDialog.show({
                    controller: 'ArticleCtrl',
                    templateUrl: 'user/edit/article/editCategories.html',
                    clickOutsideToClose: true,
                    locals : {
                        initialData : data,
                        type:"editCategoryDialog",
                        articleDetails : null
                    }
                });
            },
            publishArticle: function(appParams){

                return $http.post(SERVER_URL + 'edit/publishArticle', appParams);

//                var UploadFile = '';
//                if(isImageUpdate == true){
//                var dataURItoBlob = function(dataURI) {
//                    var binary = atob(dataURI.split(',')[1]);
//                    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//                    var array = [];
//                    for(var i = 0; i < binary.length; i++) {
//                        array.push(binary.charCodeAt(i));
//                    }
//                    return new Blob([new Uint8Array(array)], {type: mimeString});
//                };
//                var blob = dataURItoBlob(file);
//                UploadFile = new File([blob], 'imageFileName.png');
//                }
//
//                return Upload.upload({
//                    url: SERVER_URL + 'edit/publishArticle',
//                    fields: {
//                        'id' : id,
//                        'categoryId' : categoryId,
//                        'title' : title,
//                        'desc' : desc,
//                        'appId' : appId,
//                        'isNewArticle' : isNewArticle,
//                        'isImageUpdate' : isImageUpdate,
//                        'isNew' : isNew,
//                        'oldImg' : oldImg
//                    },
//                    file: UploadFile
//                });
            },

            updateCategoryImage: function (file, imageUrl, appId,isNew) {
                var dataURItoBlob = function(dataURI) {
                    var binary = atob(dataURI.split(',')[1]);
                    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                    var array = [];
                    for(var i = 0; i < binary.length; i++) {
                        array.push(binary.charCodeAt(i));
                    }
                    return new Blob([new Uint8Array(array)], {type: mimeString});
                };
                var blob = dataURItoBlob(file);
                var UploadFile = new File([blob], 'imageFileName.png');
                return Upload.upload({
                    url: SERVER_URL + 'edit/updateCategoryImage',
                    fields: {
                        'imageUrl': imageUrl,
                        'appId': appId,
                        'isNew': isNew
                    },
                    file: UploadFile
                });
            },

            getArticleList: function(){
                return $http.get(SERVER_URL+ 'edit/getArticles?appId='+$rootScope.appId);
            },
            getCategoryList: function(){
                return $http.get(SERVER_URL+ 'edit/getCategoryList?appId='+$rootScope.appId);
            },
            deleteArticle: function(data){
                return $http.post(SERVER_URL+ 'edit/deleteArticle',data);
            },
            getArticleCategoryByAppId : function(){

                return $http.get(SERVER_URL+ 'templates/getArticleCategoryByAppId?appId='+$rootScope.appId);
            },
            addCategory:function(data){
                return $http.post(SERVER_URL+ 'edit/addCategory',data);
            },
            deleteCategory:function(data){
                return $http.post(SERVER_URL+ 'edit/deleteCategory',data);
            },
            editCategory:function(data){
                return $http.post(SERVER_URL+ 'edit/editCategory',data);
            },
            getCategory:function(categoryId){
                return $http.get(SERVER_URL+ 'templates/getCategory?categoryId='+categoryId);
            },
            getSubscribeUsersCount:function(data){
                return $http.post(SERVER_URL+ 'reports/getSubscribeUsersCount',data);
            },
            getSubscribeUsersCountForDateRange:function(data){
                return $http.post(SERVER_URL+ 'reports/getSubscribeUsersCountForDateRange',data);
            },
            getArticleViewDataForDateRange:function(data){
                return $http.post(SERVER_URL+ 'reports/getArticleViewDataForDateRange',data);
            },






        };
    }
})();
