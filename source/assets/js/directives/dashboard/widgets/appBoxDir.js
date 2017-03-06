/**
 * Created by udeshikaperera on 24/08/2015.
 */
(function(){
    angular.module('app').directive('meAppBox',[
        '$state', appBox]);

    function appBox($state){
        return{
            templateUrl:'user/dashboard/widgets/appBoxView.html',
            link: function(scope, el ,attr){
                scope.goToEdit = function(){
                    $state.go('user.editApp',{appId:scope.item._id});
                }
            }
        }
    }
})();