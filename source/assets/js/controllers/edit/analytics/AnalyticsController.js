/*
 Displaying currencies in the drop down box and catching the selected currency by the user and sending it to the
 currencyService
 */
(function() {
    'use strict';
    angular.module("appEdit").controller("analyticsCtrl", [
        '$scope', '$rootScope', '$mdDialog','toastr','commerceService',
        analyticsCtrl]);
    function analyticsCtrl($scope,$rootScope,$mdDialog,toastr,commerceService) {
        console.log("analytics controller working")

        $scope.salesList = [];
        $scope.dataCount=[];

        $scope.close = function () {
            $mdDialog.hide();
        }

        commerceService.getProductList()
            .success(function (result) {
                $scope.products = result;
            }).error(function (error) {
            toastr.error('Loading Error', 'Warning', {
                closeButton: true
            });
        });





        $scope.searchTerm;
        $scope.clearSearchTerm = function() {
            $scope.searchTerm = '';
        };

        $scope.getSalesSummary  = function (data) {

            commerceService.getSalesSummary({
                appId:$rootScope.appId,selectedProducts:data.selectedProducts,fromDate:data.fromDate,toDate:data.toDate})
                .success(function (result) {
                    $scope.total=0;
                    $scope.salesList = result.data;

                    angular.forEach($scope.salesList, function(sales){
                        $scope.total = $scope.total + sales.totalPrice ;
                    })

                }).error(function (error) {
                toastr.error('Loading Error', 'Warning', {
                    closeButton: true
                });
            });

        };


        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];

        $scope.series = ['Series A', 'Series B'];

        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [10, 20,30, 40, 50, 60, 70]
        ];

        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };

        $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
        $scope.options = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    }
                ]
            }
        };

    }

})();