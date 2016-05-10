/**
 * Created by amila on 5/9/16.
 */

(function() {
    angular.module('appEdit').service('articleService', [
        '$mdDialog','$http','Upload','SERVER_URL', articleService
    ]);

    function articleService($mdDialog,$http,Upload,SERVER_URL) {
        return {
            showPublishArticleDialog: function() {
                return $mdDialog.show({
                    controller: 'ArticleCtrl',
                    templateUrl: 'user/edit/article/publishArticleView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                });
            },
            publishArticle : function(data){
                return $http.post(SERVER_URL+ 'edit/publishArticle',data);
            },
            publishArticle: function(file,title,desc,appId){
                return Upload.upload({
                    url: SERVER_URL + 'edit/publishArticle',
                    fields: {
                        'title' : title,
                        'desc' : desc,
                        'appId' : appId
                    },
                    file: file
                });
            },
        };
    }
})();
