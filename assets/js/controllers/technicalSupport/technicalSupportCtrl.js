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

            if($stateParams){
                $scope.userId = $stateParams.userId;
                $scope.appId = $stateParams.appId;
                $scope.sourcePath = "/home/admin/web/" +
                    "otenro.com/public_html/meAppServer/temp/"+$scope.userId +'/templates' + "/"+$scope.appId ;
                
                var tempImagePath =  SERVER_URL +"templates/viewImages?userId="+ $scope.userId
                    +"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=publish/";


                for (var i=0; i< 6; i++) {
                    var tempImageUrl = tempImagePath + i+'.png';
                    $scope.splash.push(tempImageUrl);
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
                        $scope.publishDetails = result;
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
                    }).error(function (error) {
                    toastr.error('Loading Error', 'Warning', {
                        closeButton: true
                    });
                })
                
            }

            getAllAppDataList();


            /**
             * @ngdoc function
             * @name getPublishDetails
             * @description
             * # get  Publish Details of the apps
             */
            $scope.getPublishDetails  = function (appId,userId) {
                $state.go('user.viewPublishDetails',{appId : appId,userId:userId});
            }
        


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
