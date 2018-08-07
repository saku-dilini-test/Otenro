import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../../assets/constantsService';
import * as data from '../../../assets/madeEasy.json';
import { LocalStorageService } from 'angular-2-local-storage';
import { CurrencyService } from '../../services/currency/currency.service';
import { TitleService } from '../../services/title.service';
import { ProductsService } from '../../services/products/products.service';
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  currency; imageURL; appUserId; orderHistory; sign; appUser;
  private parentobj = { cartItems: [], cartSize: 0, totalPrice: 0 };

  constructor(private router: Router, private dataService: PagebodyServiceModule, private productsService: ProductsService, private currencyService: CurrencyService, private localStorageService: LocalStorageService, private title: TitleService) {
    this.title.changeTitle("Order History");
  }

  ngOnInit() {

    this.appUser = this.localStorageService.get('appLocalStorageUser' + this.appId);
    //get currency
    this.currencyService.getCurrencies().
      subscribe(data => {
        this.currency = data;
        this.sign = this.currency.sign;
      }, err => {
        console.log('Unable to get Products Selected Category');
      });

    //get image url
    this.imageURL = SERVER_URL
      + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=thirdNavi";

    try {
      this.appUserId = this.localStorageService.get("appLocalStorageUser" + this.appId);
      // this.orderHistory = (this.localStorageService.get("history"+this.appId+this.appUserId.registeredUser));
    }
    catch (err) {
      console.log("no orderHistory");
    }

    if (this.appUserId) {
      this.currencyService.getOrders(this.appUserId.registeredUser)
        .subscribe((data) => {
          this.orderHistory = (data);
        }), ((err) => {
          console.log('Unable to get orders');
        });
    }
  }

  buyAgain(item) {

    item.totalQty = item.totalQty - item.qty;
    console.log(item);
    // this.dataService.cart.cartItems.push(item);

    if (this.dataService.cart.cartItems.length != 0) {
      console.log("in if");
      var i = 0;
      while (i < this.dataService.cart.cartItems.length) {
        if (item.id == this.dataService.cart.cartItems[i].id && item.sku == this.dataService.cart.cartItems[i].sku) {
          console.log("in if if");
          this.dataService.position2 = false;
          //increasing weight when we add same product again.
          this.dataService.cart.cartItems[i].totWeight += item.weight * item.qty;
          this.dataService.cart.cartItems[i].qty += item.qty;
          this.dataService.cart.cartSize = this.dataService.cart.cartItems.length;
          this.parentobj.cartSize = this.dataService.cart.cartSize;
          this.dataService.parseWeight = item.weight;
          // $state.go('app.category');
          this.router.navigate(['cart']);

          break;
        }
        else if (i == (this.dataService.cart.cartItems.length - 1)) {
          console.log("in if else");
          this.dataService.position2 = true;
          this.dataService.cart.cartItems.push(item);
          this.dataService.cart.cartSize = this.dataService.cart.cartItems.length;
          this.parentobj.cartSize = this.dataService.cart.cartSize;
          this.dataService.parseWeight = item.weight;
          //  $state.go('app.category');

          this.router.navigate(['cart']);

          break;
        }
        i++;
      }
      if (this.appUser) {
        this.localStorageService.set("cart" + this.appUser.registeredUser, (this.dataService.cart));
      }
    } else {

      console.log("in else");
      this.dataService.cart.cartItems.push(item);
      this.dataService.cart.cartSize = this.dataService.cart.cartItems.length;
      this.parentobj.cartSize = this.dataService.cart.cartSize;
      this.dataService.parseWeight = item.weight;
      // $state.go('app.category');

      if (this.appUser) {
        this.localStorageService.set("cart" + this.appUser.registeredUser, (this.dataService.cart));
      }
      this.router.navigate(['cart']);
    }
    // this.productsService.getProductById(id).subscribe(data =>{
    //     console.log("data");
    //     console.log(data);
    // }),err =>{
    //     console.log("err" + err);
    // }
  }
}
