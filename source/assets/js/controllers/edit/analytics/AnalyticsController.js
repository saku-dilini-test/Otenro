/*
 Displaying currencies in the drop down box and catching the selected currency by the user and sending it to the
 currencyService
 */
(function() {
    'use strict';
    angular.module("appEdit").controller("analyticsCtrl", [
        '$scope', '$rootScope', '$mdDialog','toastr',
        analyticsCtrl]);
    function analyticsCtrl($scope,$rootScope,$mdDialog,toastr,$element) {
        console.log("analytics controller working")

        $scope.close = function () {
            $mdDialog.hide();
        }

        $scope.products = ['Shoe' ,'Bag' ,'Tshir' ,'Wrist Watch' ,'Headphone', 'Frock'];
        $scope.searchTerm;
        $scope.clearSearchTerm = function() {
            $scope.searchTerm = '';
        };


        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
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