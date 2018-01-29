import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { Router, ActivatedRoute } from '@angular/router';
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { CurrencyService } from '../../services/currency/currency.service';
import { ProductsService } from '../../services/products/products.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-shop',
  templateUrl: './app/page-body/shop/shop.component.html',
  styleUrls: ['./app/page-body/shop/shop.component.css'],
})

export class ShopComponent implements OnInit {
  private someRange: number[] = [3, 7];
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private currency;
  private results: {};
  private catId: any;
  private catName: any;
  private catImage: any;
  private slides: any;
  private array;
  private colorArray = ["CFBDAC", "D0DDDE", "EEEEEE", "FFDE8B", "DEBBAF", "C6D3E4"]

  constructor(private currencyService: CurrencyService, private productService: ProductsService,
    private dataService: PagebodyServiceModule, private router: ActivatedRoute, private route: Router) {

    this.array = this.dataService.searchArray;

    //use loadash to filter by unique by name
    this.array = _.uniqBy(this.array, 'name');

  }

  private imageUrl = SERVER_URL + "/templates/viewImages?userId="
    + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&img=thirdNavi';

  private imageUrl2 = SERVER_URL + "/templates/viewImages?userId="
    + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&img=secondNavi";



  ngOnInit() {

    this.currencyService.getCurrencies().subscribe(data => {
      this.currency = data.sign;
      console.log(this.currency)
      console.log(data)
    }, error => {
      console.log("Error retrieving currency");
    });

    this.router.params.subscribe(params => {
      this.catId = params['id']; // --> Name must match wanted parameter
      this.catName = params['name'];
      this.catImage = params['image'];
      console.log("this.value : " + this.catId);
    });

    this.slides = [
      { src: this.imageUrl2 + "/" + this.catImage, title: this.catName }]

    if (this.catId != undefined) {
      this.productService.getProducts().subscribe(data => {
        // Read the result field from the JSON response.
        this.results = data;
        console.log("this.results  : " + JSON.stringify(this.results));
      },
        error => {
          console.log('Error shop service');
        });
    } else {
      this.productService.getAllProducts().subscribe(data => {
        // Read the result field from the JSON response.
        this.results = data;
        console.log("this.results  : " + JSON.stringify(this.results));
      },
        error => {
          console.log('Error shop service all');
        });
    }

  }

  print(test) {
    this.dataService.catId = test.id;
    console.log('test : ' + JSON.stringify(test));
    this.catName = test.name;
    this.productService.getProducts().subscribe(data => {
      this.results = data;
    })
  }

  getColor(index) {

    // var color = this.colorArray[Math.floor(Math.random()*this.colorArray.length)];

    if (index > this.colorArray.length) {
      index = index % this.colorArray.length;
      // console.log(index);
    }

    var color = this.colorArray[index];
    return color;

  }

  navigateProd(val: String, item: any) {

    this.productService.getCategoryData(item.childId).subscribe((data: any) => {
      // console.log(data[0].name);
      this.catName = data[0].name
      this.dataService.data = item;
      this.route.navigate([val, this.catName]);
    }), err => {
      console.log(err)
    }

    console.log('item : ' + JSON.stringify(item))
    // console.log("item  : " + JSON.stringify(this.dataService.data));

  }

  onChange(value: any) {
    console.log('Value changed to', value);
  }



}

