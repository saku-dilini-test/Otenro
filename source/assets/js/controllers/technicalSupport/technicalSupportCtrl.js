/**
 * Created by prasanna on 9/19/16.
 */
/**
 * @ngdoc function
 * @name appBuilderApp.controller:technicalSupportCtrl
 * @description
 * # technicalSupportCtrl
 * Controller of the technical Support
 */
(function() {
    'use strict';
    angular.module('app')
        .controller('technicalSupportCtrl',
            ['$scope','technicalSupportService','$auth','toastr','$state','$stateParams','SERVER_URL',
                technicalSupportCtrl
            ]);

    function technicalSupportCtrl($scope,technicalSupportService,$auth,toastr,$state,$stateParams,SERVER_URL) {


            $scope.splash = [];
            $scope.publishSplash = [];

            if($stateParams){

                $scope.userId = $stateParams.userId;
                $scope.appId = $stateParams.appId;
                $scope.sourcePath = "/home/admin/web/" +
                    "otenro.com/public_html/meAppServer/temp/"+$scope.userId +'/templates' + "/"+$scope.appId ;
                
                var tempImagePath =  SERVER_URL +"templates/viewImages?userId="+ $scope.userId
                    +"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=publish/";


                for (var i=0; i< 6; i++) {
                    try {
                        var tempImageUrl = tempImagePath + i+'.png';
                        $scope.splash.push(tempImageUrl);

                        if(i<=5){

                            var iosTempImageUrl = tempImagePath + i+'ios'+'.png';
                            $scope.publishSplash.push(iosTempImageUrl);
                        }

                    }catch (err){
                        console.log(err);
                    }
                }

                // if pushConfigData undefined
                if(typeof $scope.pushConfigData == 'undefined'){
                    // set App ID
                    var appId = $scope.appId;
                    // API request get push config details
                    technicalSupportService.getPushConfigDetails(appId)
                        .success(function (data) {
                            $scope.pushConfigData = data;
                        }).error(function (error) {
                        toastr.error('Push Config Details Loading Error', 'Warning', {closeButton: true});
                    });
                }


            }

            if($stateParams.adname){
                var addname = $stateParams.adname;

                technicalSupportService.getAdNetworkData(addname)
                    .success(function (data) {
                        $scope.addNetworkData = data;
                    }).error(function (error) {
                    toastr.error('Ad network Details Loading Error', 'Warning', {closeButton: true});
                });
            }


            /**
             * @ngdoc init data
             * @description
             * # view  Publish Details of the apps
             */

            if($stateParams.appId){
                var searchApp = {
                    appId :$stateParams.appId
                }
                technicalSupportService.getPublishDetails(searchApp)
                    .success(function (result) {
                        try{
                            $scope.publishDetails = result;
                            $scope.iosPublishDetails = $scope.publishDetails[1];
                         }catch(err) {
                           console.log(err);
                        }

                    }).error(function (error) {
                    toastr.error('Loading Error', 'Warning', {
                        closeButton: true
                    });
                });
            }


            /**
             *
             * @name auth.isAuthenticated()
             * @description
             * # check  whether is Authenticated user
             *   and assign status of user to defined variable
             */
            if ($auth.isAuthenticated()) {
                $scope.isAuthenticated = true;
            }


            /**
             * @ngdoc function
             * @name getAllAppDataList
             * @description
             * # get all applications  data to list
             */
            var getAllAppDataList = function () {
                technicalSupportService.getAllAppData()
                    .success(function (result) {
                        $scope.appList = result;
                        $scope.serverURL = SERVER_URL;
                    }).error(function (error) {
                    toastr.error('Loading Error', 'Warning', {
                        closeButton: true
                    });
                })
                
            }

            getAllAppDataList();


      /**
                  * @ngdoc init data
                  * @description
                  * # view  Registered user  Details of the system
                  */

             var getAlluserData = function () {
                            technicalSupportService. getAlluserData()
                                .success(function (result) {
                                    $scope.userList = result;
                                }).error(function (error) {
                                toastr.error('Loading Error', 'Warning', {
                                    closeButton: true
                                });
                            })
             }
              getAlluserData();

            var getAllAdNetworkuserData = function () {
                technicalSupportService. getAllAduserData()
                    .success(function (result) {
                        $scope.adUserList = result;
                    }).error(function (error) {
                    toastr.error('Loading Error', 'Warning', {
                        closeButton: true
                    });
                })
            }
            getAllAdNetworkuserData();

            var getAllAddNetworks = function () {
                technicalSupportService.getAllAddNetworks()
                    .success(function (result) {
                        $scope.addNetworkList = result;
                    }).error(function (error) {
                    toastr.error('Loading Error', 'Warning', {
                        closeButton: true
                    });
                })
            }
            getAllAddNetworks();

            /**
             * @ngdoc function
             * @name getPublishDetails
             * @description
             * # get  Publish Details of the apps
             */
            $scope.getPublishDetails  = function (appId,userId) {
                $state.go('user.viewPublishDetails',{appId : appId,userId:userId});
            }

            $scope.adNetworkDetails = function(addnetwork) {
                $state.go('user.viewAdNetworks', {adname : addnetwork.adagentname });
            }

            $scope.deleteAdNetwork = function(addnetwork) {
                technicalSupportService.deleteAdNetwork(addnetwork).success(function (data) {
                    var johnRemoved = $scope.addNetworkList.filter(function(el) {
                        return el.adagentname !== addnetwork.adagentname;
                    });
                    $scope.addNetworkList = johnRemoved;
                    toastr.success('Ad network Successfully deleted', 'Warning', {closeButton: true});
                }).error(function (error) {
                    toastr.error('Ad network delete Error', 'Warning', {closeButton: true});
                });
            }

            $scope.saveAdNetwork= function(addNetwork) {
                technicalSupportService.saveAdNetwork(addNetwork).success(function (data) {
                    toastr.success('Ad network Successfully saved', 'Warning', {closeButton: true});
                    $state.go('user.technicalSupporter');
                }).error(function (error) {
                    toastr.error('Ad network Saving Error', 'Warning', {closeButton: true});
                });
            }

             $scope.cancel = function(){
                 $state.go('user.technicalSupporter');
             }
        
            // View technical user details

              $scope.usersview = function(){
                $state.go('user.technicalRegisteruser');
              };

            // push-config-details save function
            $scope.savePushConfig = function (inputData) {
                // set app ID & user ID
                inputData.appId  = $scope.appId;
                inputData.userId = $scope.userId;
                // API request save push config details
                technicalSupportService.savePushConfigDetails(inputData)
                    .success(function (data) {
                        toastr.success('Push Config Details Successfully saved', 'Warning', {closeButton: true});
                    }).error(function (error) {
                        toastr.error('Push Config Details Saving Error', 'Warning', {closeButton: true});
                });
            };
        
           $scope.changePublishStatus = function () {
               technicalSupportService.changePublishStatus({appId : $scope.appId})
                   .success(function (data) {
                       toastr.success('Successfully Send mail to customer', 'success', {closeButton: true});
                   }).error(function (error) {
                   toastr.error('Send mail Error', 'Warning', {closeButton: true});
               });


           }

    }

})();
