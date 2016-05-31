/**
 * Created by amila on 5/31/16.
 */

angular.module('starter.services', [])

    .service('articleResource', function articleResource($http,constants) {
        return {
            selectedArticle: function (articleId) {
                return $http.get(constants.SERVER_URL + '/templates/getArticleById?articleId=' + articleId);
            }
        }
    });
