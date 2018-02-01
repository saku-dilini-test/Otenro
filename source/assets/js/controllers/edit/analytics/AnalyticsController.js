/*
 Displaying currencies in the drop down box and catching the selected currency by the user and sending it to the
 currencyService
 */
(function() {
    'use strict';
    angular.module("appEdit").controller("analyticsCtrl", [
        '$scope', '$rootScope', '$mdDialog','toastr','commerceService','$http',
        analyticsCtrl]);
    function analyticsCtrl($scope,$rootScope,$mdDialog,toastr,commerceService,$http) {
        console.log("analytics controller working")

        $scope.appId_ =$rootScope.appId;

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


        $scope.getTaxSummary = function (data) {

            commerceService.getTaxSummary({
                appId:$rootScope.appId,fromDate:data.fromDate,toDate:data.toDate})
                .success(function (result) {

                    $scope.tax_total=0;
                    $scope.taxList = result.data;

                    angular.forEach($scope.taxList, function(tax){
                        $scope.tax_total = $scope.tax_total + tax.taxTotal ;
                    })

                }).error(function (error) {
                toastr.error('Loading Error', 'Warning', {
                    closeButton: true
                });
            });

        };

        $scope.getShippingSummary = function (data) {

            commerceService.getShippingSummary({
                appId:$rootScope.appId,fromDate:data.fromDate,toDate:data.toDate})
                .success(function (result) {

                    $scope.shpping_total=0;
                    $scope.shppingList = result.data;
                    $scope.url ="/reports/getOrderData?appId="+$rootScope.appId+"&fromDate="+data.fromDate+"&toDate="+data.toDate;

                    angular.forEach($scope.shppingList, function(tax){
                        $scope.shpping_total = $scope.shpping_total + tax.totalShippingCost ;
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


        $scope.downloadFile = function (data,type) {

             var paramData ;

             if (type=='sales'){

                 paramData = { appId: $rootScope.appId,
                     fromDate:data.fromDate,toDate:data.toDate,selectedProducts:data.selectedProducts,type:type }
             }else {
                 paramData = { appId: $rootScope.appId,fromDate:data.fromDate,toDate:data.toDate,type:type };
             }

            $http({
                method: 'POST',
                url: '/reports/getOrderData',
                data: paramData,
                responseType: 'arraybuffer'
            }).success(function (data, status, headers) {
                headers = headers();

                var filename = headers['x-filename'];
                var contentType = headers['content-type'];

                var linkElement = document.createElement('a');
                try {
                    var blob = new Blob([data], { type: contentType });
                    var url = window.URL.createObjectURL(blob);

                    linkElement.setAttribute('href', url);
                    linkElement.setAttribute("download", filename);

                    var clickEvent = new MouseEvent("click", {
                        "view": window,
                        "bubbles": true,
                        "cancelable": false
                    });
                    linkElement.dispatchEvent(clickEvent);
                } catch (ex) {
                    console.log(ex);
                }
            }).error(function (data) {
                console.log(data);
            });
        };

    }



})();