import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PagebodyServiceModule } from '../../page-body/page-body.service'; 
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './app/page-body/cart/cart.component.html',
  styleUrls: ['./app/page-body/cart/cart.component.css']
})
export class CartComponent implements OnInit {

  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  hide: any;
  tax: any;

  constructor(private http: HttpClient,private router: Router,private dataService : PagebodyServiceModule) { }
  cartItems = this.dataService.cart.cartItems;
  currency : string;
  
  imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
  +this.userId+"&appId="+this.appId+"&"+new Date().getTime()+'&images=thirdNavi';

@Input()
@Output()

  ngOnInit() {

    this.http.get(SERVER_URL + '/edit/getTaxInfo?appId='+this.appId).subscribe(function(data) {
      if(data == ''){
          this.hide = true;
          this.tax = 0;
      }else{
          this.tax = data[0].taxAmount;
          this.hide = false;
      }
  })

    this.http.get(SERVER_URL + '/templates/getCurrency?appId='+ this.appId).subscribe(function(data) {
      this.currency = data;
      console.log("this.currency  : " + JSON.stringify(this.currency.sign));
      this.sign = this.currency.sign;
  }, error => {
    alert('error currency');
    
 });
    console.log("cartItems  : " + JSON.stringify(this.cartItems));
  }

  getTotal = function(){
    var total = 0;
    var amount = 0;
    var tax = 0;
    for(var i = 0; i < this.cartItems.length; i++){
        var product = this.cartItems[i];
        amount = product.total;
        total += (amount*product.qty);

    }
    tax = total * this.tax/100;
    this.taxTotal = total * this.tax/100;
    if(tax > 0){
        //total = total + tax;
        this.dataService.cart.totalPrice = total;
        return total;
    }else{
        this.dataService.cart.totalPrice = total;
        return total;
    }
};

getTotalQuantity = function(){
  var quantity = 0;
  for(var i =0; i<this.cartItems.length; i++){
      var product = this.cartItems[i];
      quantity += product.qty;
  }
  this.dataService.cart.totalQuantity = quantity;
  return quantity;
};

removeItem = function(index){
  this.cartItems.splice(index, 1);
  this.dataService.parseIndex = this.dataService.parseIndex -1;
  this.dataService.cart.cartSize = this.dataService.cart.cartItems.length;
  this.dataService.parentobj.cartSize = this.dataService.cart.cartSize;
};
  
  slides = SLIDES;

  // Routing Method
  navigate(val:string){
    this.router.navigate([val])
  }

}

const SLIDES = [
  { 
  	src:'http://cdn.shopify.com/s/files/1/1462/1226/t/2/assets/slide_2_1024x1024.jpg?4259875999617597102', title:'Shopping Cart'
  }]