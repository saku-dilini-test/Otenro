(function() {
    'use strict';
    angular.module("appEdit").controller("EngageCtrl", ['$scope', '$mdDialog', '$rootScope', '$auth', 'toastr',
        'engageService', '$http', 'SERVER_URL','initialData', EngageCtrl]);




    function EngageCtrl($scope, $mdDialog, $rootScope, $auth, toastr, engageService, $http, SERVER_URL, initialData,$log ) {


        //get all app registered user details

        var getAppUserData = function () {
            engageService. getAppUserData()
                .success(function (result) {
                    for(var i=0; i<result.length; i++){
                        var date = new Date(result[i].updatedAt);
                        $scope.year = date.getFullYear();
                        $scope.month = date.getMonth() + 1;
                        $scope.date = date.getDate();
                        result[i].registeredDate = $scope.year + "-" + $scope.month + "-" + $scope.date;
                    }
                    $scope.appuserList = result;
                }).error(function (error) {
                toastr.error('Loading Error', 'Warning', {
                    closeButton: true
                });
            })
        }
        getAppUserData();

        $scope.redirect = function(data){
            return engageService.showAllordersView(data);
        }

        $scope.sendPushMessage=function(){
            return engageService.showPushMessageSendDialog();
        };

        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.back = function() {
            return engageService.showPushMessageDialog();
        };

        $scope.sendMsgNow = function(message){
        if(message.date != ""){
            toastr.error('Clean the schedule message', 'Warning', {
                closeButton: true
            });
        }
        else{
        message.appId = $rootScope.appId;
        message.userId = $auth.getPayload().id;
            engageService.sendPushMessage(message)
              .success(function(data){
                toastr.success('Successfully Saved ', 'Saved', {
                    closeButton: true
                });
                return engageService.showPushMessageDialog();
              })
              .error(function(err){
               toastr.error('Unable to save. Please try again.', 'Warning', {
                   closeButton: true
               });
              })
        }
        };

        $scope.save = function(message){
            message.appId = $rootScope.appId;
            message.userId = $auth.getPayload().id;
                engageService.sendPushMessage(message)
                  .success(function(data){
                    toastr.success('Successfully Saved ', 'Saved', {
                        closeButton: true
                    });
                    return engageService.showPushMessageDialog();
                  })
                  .error(function(err){
                    toastr.error('Error while Saving', 'Warning', {
                        closeButton: true
                    });
                  })
        };


          var  userId= $auth.getPayload().id

        engageService.getMessageDetails(userId)
            .success(function(data){

                for(var i=0; i<data.length; i++){
                    var date = new Date(data[i].createdAt);
                    $scope.displayDate = date.toLocaleString();
                    $scope.year = date.getFullYear();
                    $scope.month = date.getMonth()+1;
                    $scope.date = date.getDate();
                    data[i].createdDate = $scope.year+"-"+$scope.month+"-"+$scope.date;

                        if(data[i].date == ""){
                            data[i].status = "sent"
                        }
                        else{
                            data[i].status = "pending"
                        }
                }
                $scope.pushedMessages = data;
            })
            .error(function(err){
                $log.debug(err);
            });
         //$log.debug(initialData);
        if(initialData != null) {
            $scope.user = initialData;
              var  registeredUser= $scope.user.id;
            engageService.getUserOrders(registeredUser)
                .success(function (data) {
                    $log.debug(data);
                    $scope.orders = data;
                })
                .error(function (err) {
                    $log.debug(err);
                });
        }
        // Sales & Promotions

        $scope.addNewSalesAndPromotions = function () {
            return engageService.showPromotionsAndSalesAddNewDialog();
        };
    };

})();
