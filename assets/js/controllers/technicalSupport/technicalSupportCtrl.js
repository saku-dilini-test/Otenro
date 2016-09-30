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
                var tempImagePath =  SERVER_URL +"templates/viewImages?userId="+ $scope.userId
                    +"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=publish/";


                for (var i=0; i< 5; i++) {
                    var tempImageUrl = tempImagePath + i+'.png';
                    $scope.splash.push(tempImageUrl);
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



    }

})();
