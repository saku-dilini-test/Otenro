/**
 * Created by amila on 4/5/16.
 */


mobileApp.controller('paymentCtrl', function($scope,$rootScope, $stateParams) {

   // --/-- Here start Card Payment Function --/--

      // Config Cart payment
      $scope.cardType = {};
      $scope.card = {
          amount : $rootScope.amount
      };


      $scope.makeStripePayment = makeStripePayment;

      /**
       Make Payment Function
       */
      function makeStripePayment(_cardInformation) {

          if (!window.stripe) {
              alert("stripe plugin not installed");
              return;
          }

          if (!_cardInformation) {
              alert("Invalid Card Data");
              return;
          }
          stripe.charges.create({
                  // amount is in cents so * 100
                  amount: _cardInformation.amount * 100,
                  currency: 'usd',
                  card: {
                      "number": _cardInformation.number,
                      "exp_month": _cardInformation.exp_month,
                      "exp_year": _cardInformation.exp_year,
                      "cvc": _cardInformation.cvc,
                      "name": _cardInformation.userName
                  },
                  description: $rootScope.appName
              },
              function(response) {
                  console.log(JSON.stringify(response, null, 2));
                  // TODO : This alert for only testing
                  alert(JSON.stringify(response, null, 2));
                  if(response.error){
                      alert("Error");
                      // TODO : Error handle here
                  }else{
                      alert("Payment Success");
                      // TODO : Currently back to cart
                      $state.go('app.cart');
                  }

              },
              function(response) {
                  alert(JSON.stringify(response));
                  alert("Error");
              }   // error handler
          );
      }
      // --/-- Here end Card Payment Function --/--
});