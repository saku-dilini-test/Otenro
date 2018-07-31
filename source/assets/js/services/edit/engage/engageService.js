/**
 * Created by udeshikaperera on 26/08/2015.
 **/
(function() {
    angular.module('appEdit').service('engageService', [
        '$mdDialog', '$http', '$rootScope', 'SERVER_URL','$q', engageService
    ]);

    function engageService($mdDialog, $http, $rootScope, SERVER_URL, $q) {
        return {
            showPushMessageDialog: function() {
                return $mdDialog.show({
                    controller: 'EngageCtrl',
                    templateUrl: 'user/edit/engage/pushMessageView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            showPushMessageSendDialog: function() {
                return $mdDialog.show({
                    controller: 'EngageCtrl',
                    templateUrl: 'user/edit/engage/pushMessageSendView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            showPromotionsAndSalesDialog: function() {
                return $mdDialog.show({
                    controller: 'SalesAndPromotionCtrl',
                    templateUrl: 'user/edit/engage/promotionsAndSalesView.html',
                    clickOutsideToClose: true,
                    locals:{
                        item: null
                    }
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            showPromotionsAndSalesAddNewDialog: function() {
                return $mdDialog.show({
                    controller: 'SalesAndPromotionCtrl',
                    templateUrl: 'user/edit/engage/promotionsAndSalesAddNew.html',
                    clickOutsideToClose: true,
                    locals:{
                        item:null
                    }
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },


            //Get  All order Details
            showAllordersView: function(data) {
                return $mdDialog.show({
                    controller: 'UserCtrl',
                    templateUrl: 'user/edit/engage/registerUserView.html',
                    clickOutsideToClose: true,
                    locals: {
                        initialData: data
                    }
                }).then(function(answer) {

                }, function() {

                });
            },

            //Get  All Registered Users
            showAppUserDialog: function() {
                return $mdDialog.show({
                    controller: 'UserCtrl',
                    templateUrl: 'user/edit/engage/appRegisteredUser.html',
                    clickOutsideToClose: true,
                    locals: {
                        initialData: null
                    }
                }).then(function(answer) {

                }, function() {
                   
                });
            },
            
            sendPushMessage: function(data){
                return $http.post(SERVER_URL+ 'edit/sendPushMessage',data);
            },
            getMessageDetails: function(userId){
                return $http.get(SERVER_URL + 'edit/getMessageDetails?userId='+userId+'&appId='+$rootScope.appId);
            },
            getAppUserData: function () {
                return $http.get(SERVER_URL + 'edit/getAppUserData?appId='+$rootScope.appId);
            },
            getUserOrders: function (registeredUser) {
                return $http.get(SERVER_URL + 'edit/getUserOrders?registeredUser='+registeredUser);
            },
            saveSchedulePushMassage :function (data) {
                return $http.post(SERVER_URL+ 'edit/saveSchedulePushMassage',data);
            }
        };
    }
})();



