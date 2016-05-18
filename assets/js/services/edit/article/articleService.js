/**
 * Created by amila on 5/9/16.
 */

(function() {
    angular.module('appEdit').service('articleService', [
        '$mdDialog','$http','$rootScope','Upload','SERVER_URL', articleService
    ]);

    function articleService($mdDialog,$http,$rootScope,Upload,SERVER_URL) {
        return {
            showPublishArticleDialog: function(data) {
                return $mdDialog.show({
                    controller: 'ArticleCtrl',
                    templateUrl: 'user/edit/article/publishArticleView.html',
                    clickOutsideToClose: true,
                    locals : {
                        initialData : data
                    }
                });
            },
            showPreviewArticslesDilog: function(data) {
                return $mdDialog.show({
                    controller: 'ArticleCtrl',
                    templateUrl: 'user/edit/article/previewArticles.html',
                    clickOutsideToClose: true,
                    locals : {
                        initialData : data
                    }
                });
            },
            publishArticle: function(file,id,categoryId,title,desc,appId,isNewArticle,isImageUpdate){
                return Upload.upload({
                    url: SERVER_URL + 'edit/publishArticle',
                    fields: {
                        'id' : id,
                        'categoryId' : categoryId,
                        'title' : title,
                        'desc' : desc,
                        'appId' : appId,
                        'isNewArticle' : isNewArticle,
                        'isImageUpdate' : isImageUpdate
                    },
                    file: file
                });
            },
            getArticleList: function(){
                return $http.get(SERVER_URL+ 'edit/getArticles?appId='+$rootScope.appId);
            },
            deleteArticle: function(data){
                return $http.post(SERVER_URL+ 'edit/deleteArticle',data);
            }
        };
    }
})();
