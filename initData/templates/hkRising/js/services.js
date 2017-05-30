/**
 * Created by amila on 5/31/16.
 */

angular.module('starter.services', [])

    .service('articleResource', function articleResource($http,$rootScope,constants) {
        return {
            selectedArticle: function (articleId) {
                return $http.get(constants.server_url + 'cmd=getArticleById&articleId=' + articleId);
            },
            getImageUrl : function (){
                return constants.SERVER_URL
                    +"/templates/viewImages?userId="+$rootScope.userId+"&appId="
                    +$rootScope.appId+"&"+new Date().getTime()+"&img=article"
            }
        }
    });
