/**
 * Created by amila on 5/25/16.
 */


//----------------------------------------------------------------
// shopping cart
//
function shoppingCart(cartName) {
  this.cartName = cartName;
  this.clearCart = false;
  this.checkoutParameters = {};
  this.items = [];
  this.deliveryCharge = 0;
  this.oneDoller = 1;

  // load items from local storage when initializing
  this.loadItems();

  // save items to local storage when unloading
  var self = this;
 $(window).on("unload", function(e) {
    if (self.clearCart) {
      self.clearItems();
    }
    self.saveItems();
    self.clearCart = false;
  });
}

// load items from local storage
shoppingCart.prototype.loadItems = function () {
  var items = localStorage != null ? localStorage[this.cartName + "_items"] : null;
  if (items != null && JSON != null) {
    try {
      var items = JSON.parse(items);
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.sku != null && item.name != null && item.price != null && item.quantity != null) {
          item = new cartItem(item.sku, item.name, item.price, item.quantity);
          this.items.push(item);
        }
      }
    }
    catch (err) {
      // ignore errors while loading...
    }
  }
}

// save items to local storage
shoppingCart.prototype.saveItems = function () {
  if (localStorage != null && JSON != null) {
    localStorage[this.cartName + "_items"] = JSON.stringify(this.items);
  }
}

// Start Custom Modification
// save delivery option to local storage
shoppingCart.prototype.selectDeliveryOption = function (option) {
  if (localStorage != null && JSON != null) {
    if(option == 'pickUp'){
      localStorage['deliveryOption'] = option;
    }
    if(option == 'delivery'){
      localStorage['deliveryOption'] = option;
    }
    localStorage['branchName'] = '';
    localStorage['locationName'] = '';
    localStorage['deliveryAddress'] = '';
    localStorage['deliveryAddress'] = '';
    localStorage['currentCity'] = '';
    localStorage['currentContactNumber'] = 0;
    localStorage['deliveryCharges'] = 0;
    this.deliveryCharge = 0;
  }
}
// get current delivery option
shoppingCart.prototype.getCurretDeliveryOption = function () {
  if (localStorage != null && JSON != null) {
    var currentDeliveyOption = localStorage['deliveryOption'];
    if(!currentDeliveyOption){
      this.selectDeliveryOption('pickUp');
    }
    return localStorage['deliveryOption'];
  }
}

// save branch name to local storage
shoppingCart.prototype.saveBranchName = function (name) {
  if (localStorage != null && JSON != null) {
    localStorage['branchName'] = name;
  }
}

// get branch name from local storage
shoppingCart.prototype.getBranchName = function () {
  if (localStorage != null && JSON != null) {
    var branchName = localStorage['branchName'];
    if(branchName){
      return localStorage['branchName'];
    }else{
      return '';
    }
  }
}

// save location name to local storage
shoppingCart.prototype.saveLocationName = function (name) {
  if (localStorage != null && JSON != null) {
    localStorage['locationName'] = name;
  }
}

// get branch name from local storage
shoppingCart.prototype.getLocationName = function () {
  if (localStorage != null && JSON != null) {
    var locationName = localStorage['locationName'];
    if(locationName){
      return localStorage['locationName'];
    }else{
      return '';
    }
  }
}

// save delivery charges to local storage
shoppingCart.prototype.saveDeliveryCharges = function (charges) {
  if (localStorage != null && JSON != null) {
    localStorage['deliveryCharges'] = charges;
    this.deliveryCharge = charges;
  }
}

// get delivery charges from local storage
shoppingCart.prototype.getDeliveryCharges = function () {
  if (localStorage != null && JSON != null) {
    var deliveryCharges = localStorage['deliveryCharges'];
    if(deliveryCharges){
      return localStorage['deliveryCharges'];
    }else{
      return 0;
    }
  }
}

// get the total price with delivery fee
shoppingCart.prototype.getTotalPriceWithDeliveryCharges = function () {
  var subtotal = parseInt(this.getTotalPrice());
  var deliveryFee = parseInt(this.getDeliveryCharges());
  var total = subtotal + deliveryFee;
  return total;
}


// save delivery address to local storage
shoppingCart.prototype.saveDeliveryAddress = function (name) {
  if (localStorage != null && JSON != null) {
    localStorage['deliveryAddress'] = name;
  }
}

// get delivery address from local storage
shoppingCart.prototype.getDeliveryAddress = function () {
  if (localStorage != null && JSON != null) {
    var deliveryAddress = localStorage['deliveryAddress'];
    if(deliveryAddress){
      return localStorage['deliveryAddress'];
    }else{
      return '';
    }
  }
}

// save delivery address to local storage
shoppingCart.prototype.saveCurrentCity = function (name) {
  if (localStorage != null && JSON != null) {
    localStorage['currentCity'] = name;
  }
}

// get delivery address from local storage
shoppingCart.prototype.getCurrentCity = function () {
  if (localStorage != null && JSON != null) {
    var currentCity = localStorage['currentCity'];
    if(currentCity){
      return localStorage['currentCity'];
    }else{
      return '';
    }
  }
}

// save delivery address to local storage
shoppingCart.prototype.saveCurrentContactNumber = function (name) {
  if (localStorage != null && JSON != null) {
    localStorage['currentContactNumber'] = name;
  }
}

// get delivery address from local storage
shoppingCart.prototype.getCurrentContactNumber = function () {
  if (localStorage != null && JSON != null) {
    var currentCity = localStorage['currentContactNumber'];
    if(currentCity){
      return localStorage['currentContactNumber'];
    }else{
      return '';
    }
  }
}

// save one Doller to local storage
shoppingCart.prototype.saveOneDoller = function (oneDoller) {
  if (localStorage != null && JSON != null) {
    localStorage['oneDoller'] = oneDoller;
    this.oneDoller = oneDoller;
  }
}

// get delivery address from local storage
shoppingCart.prototype.getOneDoller = function () {
  if (localStorage != null && JSON != null) {
    var oneDoller = localStorage['oneDoller'];
    if(oneDoller){
      return localStorage['oneDoller'];
    }else{
      return 1;
    }
  }
}

// get shopping cart from local storage
shoppingCart.prototype.getShoppingCart = function () {
  if (localStorage != null && JSON != null) {
    var cartsItem = localStorage[this.cartName + "_items"]
    return this.items;
  }
}

// get is submitButton true
shoppingCart.prototype.isSubmitButtonDisable = function () {
  if (localStorage != null && JSON != null) {
    var currentDeliveryOption = this.getCurretDeliveryOption();
    if(currentDeliveryOption == 'pickUp'){
      var currentBranch = this.getBranchName();
      if(currentBranch == 'undefined' || currentBranch == ''){
        return true;
      }else{
        return false;
      }
    }else if(currentDeliveryOption == 'delivery'){
      var currentLocation = this.getLocationName();
      var currentAddress = this.getDeliveryAddress();
      var currentCity = this.getCurrentCity();
      var currentContactNumber = this.getCurrentContactNumber();
      if(currentLocation == 'undefined' || currentLocation == ''){
        return true;
      }else {
        if(currentAddress == 'undefined' || currentAddress == '') {
          return true;
        }else if(currentCity == 'undefined' || currentCity == ''){
          return true;
        }else if(currentContactNumber == 'undefined' || currentContactNumber == 'null'){
          return true;
        }else{
          return false;
        }
      }
    }else{
      return true;
    }
  }
}

// End Custom Modification

// adds an item to the cart
shoppingCart.prototype.addItem = function (sku, name, price, quantity) {
  quantity = this.toNumber(quantity);
  if (quantity != 0) {

    // update quantity for existing item
    var found = false;
    for (var i = 0; i < this.items.length && !found; i++) {
      var item = this.items[i];
      if (item.sku == sku) {
        found = true;
        item.quantity = this.toNumber(item.quantity + quantity);
        if (item.quantity <= 0) {
          this.items.splice(i, 1);
        }
      }
    }

    // new item, add now
    if (!found) {
      var item = new cartItem(sku, name, price, quantity);
      this.items.push(item);
    }

    // save changes
    this.saveItems();
  }
}

// get the total price for all items currently in the cart
shoppingCart.prototype.getTotalPrice = function (sku) {
  var total = 0;
  for (var i = 0; i < this.items.length; i++) {
    var item = this.items[i];
    if (sku == null || item.sku == sku) {
      total += this.toNumber(item.quantity * item.price);
    }
  }
  return total;
}

// get the total price for all items currently in the cart
shoppingCart.prototype.getTotalCount = function (sku) {
  var count = 0;
  for (var i = 0; i < this.items.length; i++) {
    var item = this.items[i];
    if (sku == null || item.sku == sku) {
      count += this.toNumber(item.quantity);
    }
  }
  return count;
}

// clear the cart
shoppingCart.prototype.clearItems = function () {
  this.items = [];
  this.saveItems();
}

// define checkout parameters
shoppingCart.prototype.addCheckoutParameters = function (serviceName, merchantID, options) {
  // check parameters
  if (serviceName != "PayPal" && serviceName != "Google" && serviceName != "Stripe") {
    throw "serviceName must be 'PayPal' or 'Google' or 'Stripe'.";
  }
  if (merchantID == null) {
    throw "A merchantID is required in order to checkout.";
  }

  // save parameters
  this.checkoutParameters[serviceName] = new checkoutParameters(serviceName, merchantID, options);
}

// check out
shoppingCart.prototype.checkout = function (serviceName, clearCart) {

  // select serviceName if we have to
  if (serviceName == null) {
    var p = this.checkoutParameters[Object.keys(this.checkoutParameters)[0]];
    serviceName = p.serviceName;
  }

  // sanity
  if (serviceName == null) {
    throw "Use the 'addCheckoutParameters' method to define at least one checkout service.";
  }

  // go to work
  var parms = this.checkoutParameters[serviceName];
  if (parms == null) {
    throw "Cannot get checkout parameters for '" + serviceName + "'.";
  }
  switch (parms.serviceName) {
    case "PayPal":
      this.checkoutPayPal(parms, clearCart);
      break;
    case "Google":
      this.checkoutGoogle(parms, clearCart);
      break;
    case "Stripe":
      this.checkoutStripe(parms, clearCart);
      break;
    default:
      throw "Unknown checkout service: " + parms.serviceName;
  }
}


shoppingCart.prototype.getCartInfo = function(){

  var data = {
    cart : this.items
  }
  data['oneDoller'] = this.oneDoller;
  data['deliveryCharge'] = this.deliveryCharge;

  console.log(this.items);
  //?this.items = [];
  //console.log(this.items);
  this.deliveryCharge = 0;

  localStorage['branchName'] = '';
  localStorage['locationName'] = '';
  localStorage['deliveryAddress'] = '';
  localStorage['deliveryAddress'] = '';
  localStorage['currentCity'] = '';
  localStorage['currentContactNumber'] = 0;
  localStorage['deliveryCharges'] = 0;

  console.log(data);
  return data;

}

// check out using PayPal
// for details see:
// www.paypal.com/cgi-bin/webscr?cmd=p/pdn/howto_checkout-outside
shoppingCart.prototype.checkoutPayPal = function (parms, clearCart) {

  // global data
  var data = {
    cmd: "_cart",
    business: parms.merchantID,
    upload: "1",
    rm: "2",
    no_shipping : "1",
    charset: "utf-8",
    "return" : "http://192.168.8.155:1337/payPalRedirect",
    "custom" : localStorage['token']
  };

  // item data
  for (var i = 0; i < this.items.length; i++) {
    var item = this.items[i];
    var ctr = i + 1;
    if(i == 0 ){
      data["shipping_" + ctr] = (this.deliveryCharge / this.oneDoller).toFixed(2);
    }
    data["item_number_" + ctr] = item.sku;
    data["item_name_" + ctr] = item.name;
    data["quantity_" + ctr] = item.quantity;
    data["amount_" + ctr] = (item.price / this.oneDoller).toFixed(2);
    data["registerId" + ctr] = "DEV-3f2f320a-53f3-4ca0-89a4-5868091497d8";
  }

  console.log(data);
  // build form
  var form = $('<form/></form>');
  form.attr("action", "https://www.sandbox.paypal.com/cgi-bin/webscr");
  form.attr("method", "POST");
  form.attr("style", "display:none;");
  this.addFormFields(form, data);
  this.addFormFields(form, parms.options);
  $("body").append(form);

  // submit form
  //this.clearCart = clearCart == null || clearCart;
  form.submit();
  form.remove();
}

// check out using Google Wallet
// for details see:
// developers.google.com/checkout/developer/Google_Checkout_Custom_Cart_How_To_HTML
// developers.google.com/checkout/developer/interactive_demo
shoppingCart.prototype.checkoutGoogle = function (parms, clearCart) {

  // global data
  var data = {};

  // item data
  for (var i = 0; i < this.items.length; i++) {
    var item = this.items[i];
    var ctr = i + 1;
    data["item_name_" + ctr] = item.sku;
    data["item_description_" + ctr] = item.name;
    data["item_price_" + ctr] = item.price.toFixed(2);
    data["item_quantity_" + ctr] = item.quantity;
    data["item_merchant_id_" + ctr] = parms.merchantID;
  }

  // build form
  var form = $('<form/></form>');
  // NOTE: in production projects, use the checkout.google url below;
  // for debugging/testing, use the sandbox.google url instead.
  //form.attr("action", "https://checkout.google.com/api/checkout/v2/merchantCheckoutForm/Merchant/" + parms.merchantID);
  form.attr("action", "https://sandbox.google.com/checkout/api/checkout/v2/checkoutForm/Merchant/" + parms.merchantID);
  form.attr("method", "POST");
  form.attr("style", "display:none;");
  this.addFormFields(form, data);
  this.addFormFields(form, parms.options);
  $("body").append(form);

  // submit form
  this.clearCart = clearCart == null || clearCart;
  form.submit();
  form.remove();
}

// check out using Stripe
// for details see:
// https:///docs/checkout
shoppingCart.prototype.checkoutStripe = function (parms, clearCart) {

  // global data
  var data = {};

  // item data
  for (var i = 0; i < this.items.length; i++) {
    var item = this.items[i];
    var ctr = i + 1;
    data["item_name_" + ctr] = item.sku;
    data["item_description_" + ctr] = item.name;
    data["item_price_" + ctr] = item.price.toFixed(2);
    data["item_quantity_" + ctr] = item.quantity;
  }

  // build form
  var form = $('.form-stripe');
  form.empty();
  // NOTE: in production projects, you have to handle the post with a few simple calls to the Stripe API.
  // See https://stripe.com/docs/checkout
  // You'll get a POST to the address below w/ a stripeToken.
  // First, you have to initialize the Stripe API w/ your public/private keys.
  // You then call Customer.create() w/ the stripeToken and your email address.
  // Then you call Charge.create() w/ the customer ID from the previous call and your charge amount.
  form.attr("action", parms.options['chargeurl']);
  form.attr("method", "POST");
  form.attr("style", "display:none;");
  this.addFormFields(form, data);
  this.addFormFields(form, parms.options);
  $("body").append(form);

  // ajaxify form
  form.ajaxForm({
    success: function () {
      $.unblockUI();
      alert('Thanks for your order!');
    },
    error: function (result) {
      $.unblockUI();
      alert('Error submitting order: ' + result.statusText);
    }
  });

  var token = function (res) {
    var $input = $('<input type=hidden name=stripeToken />').val(res.id);

    // show processing message and block UI until form is submitted and returns
    $.blockUI({ message: 'Processing order...' });

    // submit form
    form.append($input).submit();
    this.clearCart = clearCart == null || clearCart;
    form.submit();
  };

  StripeCheckout.open({
    key: parms.merchantID,
    address: false,
    amount: this.getTotalPrice() *100, /** expects an integer **/
    currency: 'usd',
    name: 'Purchase',
    description: 'Description',
    panelLabel: 'Checkout',
    token: token
  });
}

// utility methods
shoppingCart.prototype.addFormFields = function (form, data) {
  if (data != null) {
    $.each(data, function (name, value) {
      if (value != null) {
        var input = $("<input></input>").attr("type", "hidden").attr("name", name).val(value);
        form.append(input);
      }
    });
  }
}
shoppingCart.prototype.toNumber = function (value) {
  value = value * 1;
  return isNaN(value) ? 0 : value;
}

//----------------------------------------------------------------
// checkout parameters (one per supported payment service)
//
function checkoutParameters(serviceName, merchantID, options) {
  this.serviceName = serviceName;
  this.merchantID = merchantID;
  this.options = options;
}

//----------------------------------------------------------------
// items in the cart
//
function cartItem(sku, name, price, quantity) {
  this.sku = sku;
  this.name = name;
  this.price = price * 1;
  this.quantity = quantity * 1;
}

