/**
 * Created by udeshikaperera on 06/11/2015.
 */
(function () {

    angular.module('starter.services')
        .service('paymentResources', ['$http', 'SERVER_URL', paymentResources]);

    function paymentResources($http,SERVER_URL) {
        return {
            paymentDetails: function (paymentDetails) {
                return $http.post(SERVER_URL + 'products/paymentDetails' ,paymentDetails);
            },
          pickupPaymentDetails: function (paymentDetails) {
            return $http.post(SERVER_URL + 'products/pickupPaymentDetails' ,paymentDetails);
          },
            amountInUSD:function(amount){
                return $http.get(SERVER_URL+ 'products/totalAmountInUSD',{params:{totalAmount:amount}})
            },
          oneUSD:function(){
            return $http.get(SERVER_URL+ 'products/oneUSD')
          },
          getOrderSummary:function(orderId){
            return $http.get(SERVER_URL+ 'products/orderSummary',{params:{orderId:orderId}})
          },
          getBranchLocations:function(){
            return $http.get(SERVER_URL+ 'locations/getBranchLocations')
          },
          getDeliveryLocations:function(){
            return $http.get(SERVER_URL+ 'locations/getDeliveryLocations')
          }
        }
    }
})();
