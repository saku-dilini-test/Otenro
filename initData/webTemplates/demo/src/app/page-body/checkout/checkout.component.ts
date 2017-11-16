import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-checkout',
  templateUrl: './app/page-body/checkout/checkout.component.html',
  styleUrls: ['./app/page-body/checkout/checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  public cartItems;
  hide: boolean;
  tax;
  amount; currency; sign;
  public fname;
  public lname;
  public email;
  public phone;
  public country;
  public city;
  public streetName;
  public streetNumber;
  public zip;
  public taxTotal;
  public user;
  public shippingData;
  public details = {};
  public finalDetails;
  public localData;
  public totalPrice;
  public cart;
  public chkShippingCost;
  countries;
  public chkCountry;
  isApplyShippingCharge;
  chkHide;chkTax;
  public hideShipping = true;
  public shippingCost;
  public isSelected = false;
  public isAdded = false;
  public formType;
  public pkPhone;
  public name;
  public pickup;
  public pickupData;
  underWeight;
  overWeight;
  public paymentData;
  public deliveryShow;
  public pickupShow;
  public paypalShow;
  public stripeShow;
  public braintreeShow;
  public authorizeNet;

  constructor(private localStorageService: LocalStorageService, private http: HttpClient, private route: ActivatedRoute, private router: Router, private dataService: PagebodyServiceModule) {

  }

  ngOnInit() {
    console.log("chk params : " + JSON.stringify(this.dataService.data));
    this.cartItems = this.dataService.cart.cartItems;

    this.route.params.subscribe(params => {
      this.formType = params['type']; // --> Name must match wanted parameter
      console.log("this.value : " + this.formType);
    });

    this.http.get(SERVER_URL + "/edit/getAllCountry")
      .subscribe((res) => {
        this.countries = res;
      });

    console.log(this.dataService.userData);
if(this.cartItems.length >0 && this.formType == 'delivery'){

  this.isAdded = true;

    this.fname = this.dataService.userData.name;
    this.email = this.dataService.userData.email;
    this.phone = this.dataService.userData.phone;
    this.country = this.dataService.userData.country;
    this.city = this.dataService.userData.city;
    this.streetName = this.dataService.userData.streetName;
    this.streetNumber = this.dataService.userData.streetNumber;
    this.zip = this.dataService.userData.zip;
    console.log("this.country : " + this.country);
}
    this.localData = (this.localStorageService.get('appLocalStorageUser' + this.appId));
    console.log('localData : ' + JSON.stringify(this.localData));

    if (this.localData == null) {
      this.router.navigate(['login'])
    }

    
    this.hide = true;

    var param = {
      'appId': this.appId,
      'country': this.country
    };

    this.http.post(SERVER_URL + '/templatesOrder/getTaxInfoByCountry', param).subscribe((data) => {
      if (data == '') {
        this.hide = true;
        this.tax = 0;
      } else {
        this.tax = data[0].taxAmount;
        this.hide = false;
      }
    })

    this.http.get(SERVER_URL + '/templates/getCurrency?appId=' + this.appId).subscribe((data) => {
      this.currency = data;
      console.log("this.currency  : " + JSON.stringify(this.currency.sign));
      this.sign = this.currency.sign;
      console.log("cart sign  : " + this.sign);
    }, error => {
      alert('error currency');

    });

    this.user = (localStorage.getItem('appLocalStorageUser' + this.appId));

    // get the shipping options
    var param2 = {
      'appId': this.appId,
      'country': this.country
    };
if(this.formType == 'delivery'){
    this.http.post(SERVER_URL + "/edit/getShippingInfoByCountry", param2)
      .subscribe((data) => {
        this.shippingData = data;
        // $log.debug($scope.shippingData);
        for (var i = 0; i < this.shippingData.length; i++) {
          if (this.shippingData[i].shippingOption == "Pick up") {
            this.shippingData.splice([i], 1);
          }
        }
      },
      function (err) {
        alert(
          'Policies Data loading error,Please check your connection!'
        );
      });
    }
    this.amount = this.getTotal();


// -------------------pickup--------------------------------------------

    this.http.get(SERVER_URL + "/edit/getShippingPickupInfo?appId="+this.appId)
    .subscribe((data)=> {

            this.pickup = data;
            // console.log("this.pickup : " + JSON.stringify(this.pickup));
           
            /* $scope.header = data.header;
            $scope.content = data.content;*/
            //$state.go('app.category');
        },
        function (err) {
            alert(
                 'Policies Data loading error!,Please check your connection!'
            );
        });



  }


  getTotal() {
    var total = 0;
    var amount = 0;
    var tax = 0;
    for (var i = 0; i < this.cartItems.length; i++) {
      var product = this.cartItems[i];
      amount = product.total;
      total += (amount);
    }
    tax = total * this.tax / 100;
    this.taxTotal = total * this.tax / 100;
    if (tax > 0) {
      total = total + tax;
      this.dataService.cart.totalPrice = total;
      return total;
    } else {
      this.dataService.cart.totalPrice = total;
      return total;
    }
  };

  addShipping(shippingDetails) {
    this.isSelected = true;
    console.log('shippingDetails : ' + JSON.stringify(shippingDetails));
    var total = 0;

    var totalWeight = 0;
    var shippingCost = 0;
    var weight = 0; //calculate single item weight

    //there are 3 stated when adding item to cart
    //position 3 - when add a new item in the begening
    //position 1 - adding the same item continously
    //position 2 - when we change the product item adding.

    // if we triggerd the quantity change in the cart
    if (this.dataService.parseEnable == true) {
      //getting the parsed selected item index
      var index = this.dataService.parseIndex;

      //when we added the second item and change its value
      if (this.dataService.position2 == true) {

        //getting item weight of changed item (with the index)
        weight = this.dataService.cart.cartItems[index].weight;

        //resetting its total weight.
        for (var i = 0; i < this.dataService.cart.cartItems.length; i++) {
          this.dataService.cart.cartItems[index].totWeight = weight * this.dataService.parseQty;;
        }

        //calculating the whole item total weight
        for (var i = 0; i < this.dataService.cart.cartItems.length; i++) {
          var product = this.dataService.cart.cartItems[i];
          total = product.totWeight;
          totalWeight += (total);

        }

        // $rootScope.parseEnable=false;
        this.dataService.position2 = false;
        //when we add same item without changing the item (with value change)
      } else {

        var weight2 = 0;
        //getting the parsed selected item index
        var index = this.dataService.parseIndex;


        //getting item weight of changed item (with the index)
        weight2 = this.dataService.cart.cartItems[index].weight;

        //resetting its total weight.
        for (var i = 0; i < this.dataService.cart.cartItems.length; i++) {
          this.dataService.cart.cartItems[index].totWeight = weight2 * this.dataService.parseQty;
        }

        //calculating the whole item total weight
        for (var i = 0; i < this.dataService.cart.cartItems.length; i++) {
          var product = this.dataService.cart.cartItems[i];
          total = product.totWeight;
          totalWeight += (total);

        }
        // resetting the parsed values.
        this.dataService.parseEnable = false;
        this.dataService.parseQty = 0;
      }

      //Normal way to calculate the total weight, when we did not change
      //the value from the cart.
    } else {

      for (var i = 0; i < this.dataService.cart.cartItems.length; i++) {
        var product = this.dataService.cart.cartItems[i];
        total = product.totWeight;
        totalWeight += (total);

      }

    }

    if (shippingDetails.shippingOption == "Flat Rate") {
      console.log('inside Flat Rate');

      var shippingCostPreOrderFee = shippingDetails.preOrderFee;
      var shippingCostFeePerItem = shippingDetails.feePerItem * this.dataService.cart.cartItems.length;
      shippingCost = shippingCostPreOrderFee + shippingCostFeePerItem;
      console.log("this.shippingCost : " + shippingCost);

    } else if (shippingDetails.shippingOption == "Weight Based") {
      console.log('inside Weight Based');      
      shippingDetails.overWeight = false;
      shippingDetails.underWeight = false;
      // $log.debug(shippingDetails.shipping.weightRanges);
      for (var i = 0; i < shippingDetails.weightRanges.length; i++) {
        var weightRange = shippingDetails.weightRanges[i];
        if (weightRange.startWeight <= totalWeight && weightRange.endWeight >= totalWeight) {
          shippingCost = shippingDetails.weightRanges[i].cost;
        }
      }
      if (shippingDetails.weightRanges[0].startWeight > totalWeight) {
        shippingDetails.underWeight = true;
      }
      if (shippingDetails.weightRanges[shippingDetails.weightRanges.length - 1].endWeight < totalWeight) {
        shippingDetails.overWeight = true;
      }

    } else {
      console.log('inside else');            
      shippingCost = shippingDetails.cost;

    }

    shippingDetails.delivery = this.dataService.data;
    shippingDetails.shippingCost = shippingCost;

    // this.dataService.finalDetails = shippingDetails;
    this.chk(shippingDetails);
  }

    //------------------------------checkout---------------------------------------
chk(final){

  this.finalDetails = final;
  console.log("this.finalDetails  : " + JSON.stringify(this.finalDetails));
  this.chkShippingCost = this.finalDetails.shippingCost;
  console.log("this.chkShippingCost : " + this.chkShippingCost);
  // $log.debug(totalWeight);
  // $log.debug(shippingCost);
  // $log.debug(shippingDetails.shipping);
  // $log.debug(this.dataService.cart.cartItems);
  // $state.go('app.checkout',{item:shippingDetails});
this.underWeight = this.finalDetails.underWeight;
this.overWeight = this.finalDetails.overWeight;

  // this.shippingCost = this.dataService.data.shippingCost;

if(typeof this.chkShippingCost == 'undefined'){
this.hideShipping = false;
  }

  // if (this.finalDetails.delivery.location == "old" || this.finalDetails.item.delivery.location == "Pick up") {
  //   this.chkCountry = this.localData.country;
  // } else {
  //   this.chkCountry = this.finalDetails.delivery.country;
  // }

  this.chkCountry = this.localData.country;

  var param = {
    'appId':this.appId,
    'country': this.chkCountry
};

console.log("this.cartItems : " + JSON.stringify(this.cartItems));

this.http.post(SERVER_URL + '/templatesOrder/getTaxInfoByCountry',param)
.subscribe((data)=> {

  console.log("tax data : " + JSON.stringify(data));

  if(data == ''){
    console.log('no Tax data');
      this.chkHide = true;
      this.chkTax = 0;
      this.isApplyShippingCharge = false;
  }else {
    console.log('Tax data available');    
    this.chkTax = data[0].taxAmount;
      // $log.debug(data[0]);
      this.isApplyShippingCharge = data[0].isApplyShippingCharge;
      this.chkHide = false;
  }
      var total = 0;
      var amount = 0;
      var tax = 0;
      for(var i = 0; i < this.cartItems.length; i++){
          var product = this.cartItems[i];
          amount = product.total;
          total += (amount*product.qty);
      }
      // $log.debug($scope.isApplyShippingCharge);
      if(this.isApplyShippingCharge == true && this.formType != 'pickup'){

          // $log.debug($scope.shippingCost);
          var shipping = parseInt(this.chkShippingCost);
          total = total + shipping;
          tax = total * this.chkTax / 100;
          this.taxTotal = total * this.chkTax / 100;
          if (tax > 0) {
              total = total + tax;
              this.totalPrice = total;
          } else {
              this.cart.totalPrice = total;
          }
      }else {
          tax = total * this.chkTax / 100;
          this.taxTotal = total * this.chkTax / 100;
          if(typeof this.chkShippingCost == "undefined"){
              this.chkShippingCost = 0;
          }
          if (tax > 0) {
              total = total + tax;
              this.totalPrice = total + parseInt(this.chkShippingCost);
          } else {
              this.totalPrice = total + parseInt(this.chkShippingCost);
          }
      }

});

}


  

//------------------------------pickup---------------------------------------



checkout(){
  this.isSelected = true;
  this.pickupData  = {item:this.dataService.data,
      delivery:{location : "Pick up",method:"Pick up"},
      deliverDetails :{name:this.name,number:this.pkPhone} ,
      pickupId :this.pickup.opt
  }
this.chk(this.pickupData);
};



//------------------------------payment---------------------------------------


paymentInit(){
  this.http.get(SERVER_URL + '/edit/getIPGInfo?appId='+this.appId)
  .subscribe((data)=> {
    this.paymentData = data;
    console.log("this.paymentData : " + JSON.stringify(this.paymentData));
    // $log.debug($scope.paymentData);
    if(this.formType == "delivery") {
        this.deliveryShow = this.paymentData.cashOnDeliveryEnable;
        this.pickupShow = false;
    }else{
      this.deliveryShow = false;
      this.pickupShow = this.paymentData.cashOnPickupEnable;
    }
    this.paypalShow = this.paymentData.paypalEnable;
    this.stripeShow = this.paymentData.stripeEnable;
    this.braintreeShow = this.paymentData.braintreeEnable;
    this.authorizeNet = this.paymentData.authorizeNetEnable;
}),function(err) {
    alert('warning Unable to get Products Selected Category');
};

}






  countryChanged(data) {
    console.log(data)
  }

  slides = SLIDES;

}

const SLIDES = [
  {
    src: 'http://orig12.deviantart.net/c024/f/2010/205/0/e/confession_of_a_shopaholic_by_cornerart.jpg', title: 'Checkout'
  }] 