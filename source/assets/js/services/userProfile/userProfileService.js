/**
 * Created by udeshikaperera on 31/08/2015.
 */
(function() {
    angular.module('app').service('userProfileService', ['$mdDialog', '$state','$auth', userProfileService]);

    function userProfileService($mdDialog, $state, $auth) {
        return {
            showUserProfileDialog: function() {
                if (!$auth.isAuthenticated()) {
                    $state.go('anon.login');
                }else {
                    $mdDialog.show({
                        controller: 'userProfileCtrl',
                        templateUrl: 'user/profile/userProfileView.html',
                        clickOutsideToClose: true
                    })
                        .then(function (answer) {
                        }, function () {

                        });
                }

            },
            showDownloadMobileViewerDialog: function() {

                $mdDialog.show({
                    controller: 'userProfileCtrl',
                    templateUrl: 'user/profile/downloadMobileViewer.html',
                    clickOutsideToClose: true
                })
                .then(function (answer) {
                }, function () {

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
