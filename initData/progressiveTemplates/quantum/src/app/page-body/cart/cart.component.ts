import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { TaxService } from '../../services/tax/tax.service';
import { CurrencyService } from '../../services/currency/currency.service';

@Component({
  selector: 'app-cart',
  templateUrl: './app/page-body/cart/cart.component.html',
  styleUrls: ['./app/page-body/cart/cart.component.css']
})
export class CartComponent implements OnInit {

  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  public shippingData;
  public amount;
  hide: any;
  tax: any;
  user;
  constructor(private currencyService: CurrencyService, private taxService: TaxService, private localStorageService: LocalStorageService, private http: HttpClient, private router: Router, private dataService: PagebodyServiceModule) { }
  cartItems = this.dataService.cart.cartItems;
  currency: string;

  imageUrl = SERVER_URL + "/templates/viewImages?userId="
    + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&img=thirdNavi';

  @Input()
  @Output()

  ngOnInit() {
    console.log("cart size : " + this.dataService.cart.cartSize);
    this.user = (this.localStorageService.get('appLocalStorageUser' + this.appId));

    this.taxService.getTaxInfo().subscribe(data => {
      if (data == '') {
        this.hide = true;
        this.tax = 0;
      } else {
        this.tax = data[0].taxAmount;
        this.hide = false;
      }
    })

    this.taxService.getShippingInfo().subscribe(data => {
      this.shippingData = data;
    }, err => {
      alert({
        title: 'Policies Data loading error!',
        template: 'Please check your connection!'
      });
    });


    this.currencyService.getCurrencies().subscribe(data => {
      this.currency = data.sign;
      console.log("this.currency  : " + JSON.stringify(this.currency));
    }, error => {
      alert('error currency');

    });

    console.log("cartItems  : " + JSON.stringify(this.cartItems));

    this.amount = this.getTotal();

  }

  getTotal = function () {
    var total = 0;
    var amount = 0;
    var tax = 0;
    for (var i = 0; i < this.cartItems.length; i++) {
      var product = this.cartItems[i];
      amount = product.total;
      total += (amount * product.qty);

    }
    tax = total * this.tax / 100;
    this.taxTotal = total * this.tax / 100;
    if (tax > 0) {
      //total = total + tax;
      this.dataService.cart.totalPrice = total;
      return total;
    } else {
      this.dataService.cart.totalPrice = total;
      return total;
    }
  };

  getTotalQuantity = function () {
    var quantity = 0;
    for (var i = 0; i < this.cartItems.length; i++) {
      var product = this.cartItems[i];
      quantity += product.qty;
    }
    this.dataService.cart.totalQuantity = quantity;
    return quantity;
  };

  removeItem = function (index) {
    this.cartItems.splice(index, 1);
    this.dataService.parseIndex = this.dataService.parseIndex - 1;
    this.dataService.cart.cartSize = this.dataService.cart.cartItems.length;
    this.dataService.parentobj.cartSize = this.dataService.cart.cartSize;
  };

  buttonDisable = function (qty, totalQty, index) {

    console.log("qty  : " + qty);
    console.log("totalQty  : " + totalQty);
    console.log("index  : " + index);

    // Parsing index, changed quantity and the state shows whether value changed
    this.dataService.parseIndex = index;
    this.dataService.parseEnable = true;
    this.dataService.parseQty = qty;
    this.dataService.cart.cartItems[index].totWeight = this.dataService.cart.cartItems[index].weight * this.dataService.parseQty;

    //----------------------------------------------------------------------

    // if(qty > totalQty && totalQty > 1){
    //       $scope.buyButtonDisable = true;
    // }else{
    //       $scope.buyButtonDisable = false;
    // }
  }
  delivery(deliverItems) {

    console.log("deliverItems : " + JSON.stringify(deliverItems));

    if (this.localStorageService.get('appLocalStorageUser' + this.appId) !== null) {
      console.log("pickup : " + this.localStorageService.get('appLocalStorageUser' + this.appId));
      this.dataService.userData = this.localStorageService.get('appLocalStorageUser' + this.appId);
      console.log("this.dataService.userData : " + this.dataService.userData)
      this.router.navigate(['checkout', 'delivery']);
      this.dataService.deliverItems = deliverItems
    }
    else {
      let status = 'delivery'
      this.router.navigate(['login', status]);
      // $state.go('app.login', { item:status });
    }
  }

  pickupDetails(deliverItems) {
    if (this.localStorageService.get('appLocalStorageUser' + this.appId) !== null) {
      this.dataService.userData = this.localStorageService.get('appLocalStorageUser' + this.appId);
      console.log("pickup : " + this.localStorageService.get('appLocalStorageUser' + this.appId));
      this.router.navigate(['checkout', 'pickup']);
      this.dataService.deliverItems = deliverItems;

    }
    else {
      let status = 'pickup'
      this.router.navigate(['login', status]);
      // $state.go('app.login', { item: $scope.status });
    }
  }

  pickUp(details) {
    // $state.go('app.pickup',{
    //     item:$stateParams.item,
    //     deliverDetails:details,
    //     amount: $scope.amount
    // });
  };

  deliver(deliverDetails) {
    console.log("deliverDetails : " + deliverDetails);

    if (typeof deliverDetails.country == 'undefined') {
      var localData: any = (this.localStorageService.get('appLocalStorageUser' + this.appId));
      if (localData == null) {
        this.router.navigate(['login']);
      } else {
        deliverDetails.name = localData.name;
        deliverDetails.streetNumber = localData.streetNumber;
        deliverDetails.streetName = localData.streetName;
        deliverDetails.country = localData.country;
        deliverDetails.city = localData.city;
        deliverDetails.zip = localData.zip;
        deliverDetails.phone = localData.phone;
      }
    }
    deliverDetails.method = 'Delivery';
    // $state.go('app.shipping',{item:deliverDetails});
  }

  slides = SLIDES;

  // Routing Method
  navigate(val: string) {
    this.router.navigate([val])
  }

}

const SLIDES = [
  {
    src: 'http://cdn.shopify.com/s/files/1/1462/1226/t/2/assets/slide_2_1024x1024.jpg?4259875999617597102', title: 'Shopping Cart'
  }]
