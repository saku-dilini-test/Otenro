/**
 * Created by amila on 5/5/16.
 */

(function () {

  angular.module('starter.services')
    .service('promotionResources', ['$http', 'SERVER_URL', promotionResources]);

  function promotionResources($http,SERVER_URL) {
    return {
      getPromotionList:function(){
        return $http.get(SERVER_URL+ 'getPromotionList')
      }
    }
  }
})();
