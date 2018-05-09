import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { TaxService } from '../../services/tax/tax.service';
import { CurrencyService } from '../../services/currency/currency.service';
import { TitleService } from '../../services/title.service';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-cart',
  templateUrl: './app/page-body/cart/cart.component.html',
  styleUrls: ['./app/page-body/cart/cart.component.css']
})
export class CartComponent implements OnInit {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private shippingData;
  private amount;
  private buyButtonDisable;
  hide: any;
  tax: any;
  user;

  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage: string;

  constructor(private currencyService: CurrencyService, private taxService: TaxService, private localStorageService: LocalStorageService,
    private http: HttpClient, private router: Router, private dataService: PagebodyServiceModule, private title: TitleService) {
    this.title.changeTitle("Shopping Cart");
  }
  cartItems = this.dataService.cart.cartItems;
  currency: string;

  imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
    + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=thirdNavi';

  @Input()
  @Output()

  ngOnInit() {
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
      alert(
        'Error loading shippingInfo!\n Please check your connection.'
      );
    });


    this.currencyService.getCurrencies().subscribe(data => {
      this.currency = data.sign;
    }, error => {
      console.log('error currency');

    });


    this.amount = this.getTotal();

  }

  itemPriceCal(price, qty) {
    let tot = price * qty
    return tot.toFixed(2);
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
    tax = (total * this.tax / 100);
    this.taxTotal = total * this.tax / 100;
    this.taxTotal = this.taxTotal.toFixed(2);
    if (tax > 0) {
      //total = total + tax;
      this.dataService.cart.totalPrice = total;
      return total.toFixed(2);;
    } else {
      this.dataService.cart.totalPrice = total;
      return total.toFixed(2);;
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

    let proceed = true;;
    for (let i = 0; i < deliverItems.length; i++) {
      if (deliverItems[i].qty > deliverItems[i].totalQty) {
        proceed = false;
      }
    }
    if (proceed == false) {

      this._success.subscribe((message) => this.successMessage = message);
      debounceTime.call(this._success, 3000).subscribe(() => this.successMessage = null);
      this._success.next("Please check item quantity!");
      setTimeout(() => { }, 3100)

    } else {
      if (this.localStorageService.get('appLocalStorageUser' + this.appId) !== null) {
        this.dataService.userData = this.localStorageService.get('appLocalStorageUser' + this.appId);
        this.router.navigate(['checkout', 'delivery']);
        this.dataService.deliverItems = deliverItems
      }
      else {
        this.dataService.userData = null;
        this.router.navigate(['checkout', 'delivery']);
        this.dataService.deliverItems = deliverItems

        // let status = 'delivery'
        // this.router.navigate(['login', status]);
        // $state.go('app.login', { item:status });
      }
    }
  }

  pickupDetails(deliverItems) {


    // this.router.navigate(['checkout', 'pickup']);
    // this.dataService.deliverItems = deliverItems;
    let proceed = true;;
    for (let i = 0; i < deliverItems.length; i++) {
      if (deliverItems[i].qty > deliverItems[i].totalQty) {
        proceed = false;
      }
    }
    if (proceed == false) {

      this._success.subscribe((message) => this.successMessage = message);
      debounceTime.call(this._success, 3000).subscribe(() => this.successMessage = null);
      this._success.next("Please check item quantity!");
      setTimeout(() => { }, 3100)

    } else {
      if (this.localStorageService.get('appLocalStorageUser' + this.appId) !== null) {
        this.dataService.userData = this.localStorageService.get('appLocalStorageUser' + this.appId);
        this.router.navigate(['checkout', 'pickup']);
        this.dataService.deliverItems = deliverItems;

      }
      else {
        let status = 'pickup'
        this.router.navigate(['login', status]);
        // $state.go('app.login', { item: $scope.status });
      }
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

  // Routing Method
  navigate(val: string) {
    this.router.navigate([val])
  }

}
