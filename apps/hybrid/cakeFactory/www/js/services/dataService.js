/**
 * Created by amila on 5/25/16.
 */


(function () {
  "use strict";
  angular.module('starter')

    // create a data service that provides a store and a shopping cart that
    // will be shared by all views (instead of creating fresh ones for each view).
    .service("DataService", function () {

      // create shopping cart
      var myCart = new shoppingCart("CakeCompanyStore");

      // enable PayPal checkout
      // note: the second parameter identifies the merchant; in order to use the
      // shopping cart with PayPal, you have to create a merchant account with
      // PayPal. You can do that here:
      // https://www.paypal.com/webapps/mpp/merchant
      myCart.addCheckoutParameters("PayPal", "83N3LGMQY22WQ");

      // return data object with store and cart
      return {
        cart: myCart
      };
    });


})();
