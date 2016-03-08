/**
 * Created by udeshikaperera on 31/08/2015.
 */
(function() {
    angular.module('app').service('userProfileService', ['$mdDialog', '$state', userProfileService]);

    function userProfileService($mdDialog, $state) {
        return {
            showUserProfileDialog: function() {

                $mdDialog.show({
                    controller: 'userProfileCtrl',
                    templateUrl: 'user/profile/userProfileView.html',
                    clickOutsideToClose: true
                })
                .then(function(answer) {
                }, function() {

                });
            },
            closeDialog: function() {
                $mdDialog.hide();
            },
            gotoDashboard: function() {
                $mdDialog.cancel();
                $state.go('user.dashboard');
            },
            gotoLogin: function() {
                $mdDialog.cancel();
                $state.go('anon.login');
            }
        }
    }
})();
