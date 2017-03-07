/**
 * Created by udeshikaperera on 17/08/2015.
 */
(function (){
    angular.module('oblDashboard').directive('oblDashboard', ['userProfileService', oblDashboard]);

    function oblDashboard(userProfileService){
        return{
            templateUrl:"user/ext-modules/oblDashboard/oblDashboard.html",
            link: function(scope){
                scope.profileView = function(){
                    return userProfileService.showUserProfileDialog();
                };
            }
        }
    }
})();