/**
 * Created by udeshikaperera on 24/08/2015.
 */
(function(){
    "use strict";
    angular.module('appEdit').directive('meAppEditArea', [
        '$stateParams',meAppEditArea]);

    function meAppEditArea(){
        return{
            transclude:true,
            scope:{
            },
            controller:'AppEditAreaCtrl',
            templateUrl:'user/edit/appEditAreaView.html',
            link:function(scope){
                //scope.appId = $stateParams.appId;
            }
        }
    }
})();