(function () {
    'use strict';
    angular.module("appEdit").controller("ipgCtrl", [
        '$scope','$mdDialog','toastr', 'ipgService', '$rootScope','$auth',
        ipgCtrl]);

    function ipgCtrl($scope, $mdDialog, toastr, ipgService, $rootScope,$auth) {

        // --/-- Configuration Data --/--
        if(typeof $scope.IPGSettings == 'undefined'){
            ipgService.getIPGInfo().
                success(function(data){                 
                    $scope.IPGSettings = data;
                }).error(function(err){
                    //alert("IPG Info Loading Error : " + err);
                });    
        }



        // --/-- save IPG collection --/--
        $scope.saveIGPSettings = function (IPGInfo) {


        if(IPGInfo.paypalEnable == true && IPGInfo.paypalKey == null){
                toastr.error('Please enter PayPal key ', 'Warning', {
                    closeButton: true
                });
        }else if(IPGInfo.stripeEnable == true && IPGInfo.stripeKey == null){
                toastr.error('Please enter Stripe key ', 'Warning', {
                    closeButton: true
                });
        }else if(IPGInfo.authorizeNetEnable == true && (IPGInfo.apiLoginId == null || IPGInfo.transactionKey == null)){
                if(IPGInfo.apiLoginId == null){
                    toastr.error('Please enter authorizeNet API Login Id ', 'Warning', {
                        closeButton: true
                    });
                }if(IPGInfo.transactionKey == null){
                    toastr.error('Please enter authorizeNet transactionKey ', 'Warning', {
                        closeButton: true
                    });
                }

        }else if(IPGInfo.payHereEnable == true && IPGInfo.payHereMerchantId == null){

                    toastr.error('Please enter PayHere ID ', 'Warning', {
                        closeButton: true
                    });

        }else{
                // Set AppID
                IPGInfo.appId = $rootScope.appId;
                IPGInfo.userId = $auth.getPayload().id;
                IPGInfo.isNew = $rootScope.tempNew;
                IPGInfo.env = '';

                ipgService.updateIPGInfo(IPGInfo)
                    .success(function (result) {
                        toastr.success(result.message, 'Saved', {
                            closeButton: true
                        });
                        $scope.cancel();
                    }).error(function (error) {
                        toastr.error('Saving Error', 'Message', {
                            closeButton: true
                        });
                })
            }
        };
       
        // --- cancel dialog -----
        $scope.cancel = function () {
            $mdDialog.cancel();
        };

    }
})();