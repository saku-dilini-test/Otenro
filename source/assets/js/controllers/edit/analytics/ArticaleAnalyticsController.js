/**
 * Created by Shashan on 01/02/2018.
 */

(function () {
    'use strict';
    angular.module("appEdit").controller("articleAnalyticsCtrl", ['$scope', '$mdDialog', 'toastr', 'articleService', 'carouselService', '$rootScope', '$http', 'SERVER_URL', '$auth', articleAnalyticsCtrl]);


    function articleAnalyticsCtrl($scope, $mdDialog, toastr, articleService, carouselService, $rootScope, $http, SERVER_URL, $auth) {

        articleService.getSubscribeUsersCount({appId:$rootScope.appId})
            .success(function (result) {
                    result.forEach(function(data) {
                       if(((data._id).status)=="A"){
                           $scope.activeUser = data.count;
                       }else if(((data._id).status)=="I") {
                           $scope.inactiveUsers = data.count;

                       }
                    });
                $scope.allUsersCount = $scope.activeUser + $scope.inactiveUsers ;

            }).error(function (error) {
        });



        $scope.getDateForRange= function (article) {

            var fromDate;
            var toDate;

            try {

                article.fromDate.toString().length;
                article.toDate.toString().length;
                fromDate = article.fromDate;
                toDate = article.toDate;

            } catch (e) {
                toastr.error('Please fill all fields', 'Warning', {
                    closeButton: true
                });
            }

            if (fromDate != null && toDate != null) {

                if (article.fromDate > article.toDate) {

                    toastr.error('Invalid Date Range', 'Warning', {
                        closeButton: true
                    });

                } else {

                    $scope.allUbscribersForDateRange = 0;
                    $scope.activeUsersForDateRange = 0;
                    $scope.inactiveusersForDateRange = 0;

                    var data = {fromDate: article.fromDate, toDate: article.toDate,appId:$rootScope.appId};

                    articleService.getSubscribeUsersCountForDateRange(data)
                        .success(function (result) {
                            result.forEach(function (forEachData) {
                                if (((forEachData._id).status) == "A") {
                                    $scope.activeUsersForDateRange = forEachData.count;
                                } else if (((forEachData._id).status) == "I") {
                                    $scope.inactiveusersForDateRange = forEachData.count;
                                }
                            });

                            $scope.allUbscribersForDateRange = $scope.activeUsersForDateRange + $scope.inactiveusersForDateRange;
                            articleService.getArticleViewDataForDateRange(data)
                                .success(function (result) {
                                    result.forEach(function (forEachData) {
                                        $scope.allArticleViewsForDateRange = forEachData.count;
                                    });

                                }).error(function (error) {
                            });

                        }).error(function (error) {
                    });
                }
            };
        }
    }
})();
