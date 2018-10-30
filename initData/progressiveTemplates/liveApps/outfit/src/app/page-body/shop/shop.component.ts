import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { Router } from '@angular/router';
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { CurrencyService } from '../../services/currency/currency.service';
import { ProductsService } from '../../services/products/products.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})

export class ShopComponent implements OnInit {
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private currency;
  results: {};
  private catId: any;
  private catName: any;
  searchTerm:any;

  constructor(private currencyService: CurrencyService, private productService: ProductsService,
    private dataService: PagebodyServiceModule, private router: Router,
    private title: TitleService) {

     this.title.changeTitle("Search");

  }

  private imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
    + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=thirdNavi';


  ngOnInit() {

    this.currencyService.getCurrencies().subscribe(data => {
      this.currency = data.sign;
    }, error => {
      console.log("Error retrieving currency");
    });

    this.productService.getAllProducts().subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data;
    },
    error => {
      console.log('Error shop service all');
    });

  }




  navigateProd(val: String, item: any, catName: String) {
    this.catName = catName;
    this.dataService.data = item;
    localStorage.setItem(this.appId+":dataServiceData",JSON.stringify(this.dataService.data))
    this.router.navigate([val, this.catName, item.id]);
  }



  checkSoldOut(product) {

    let count = 0;
    let isSoldOut = false;
    if (product) {
      let variantsLength = product.variants.length;

      for (let i = 0; i < variantsLength; i++) {
        if (product.variants[i].quantity == 0) {
          count++;
        }
      }

      if (count == variantsLength) {
        isSoldOut = true;
      } else {
        isSoldOut = false;
      }
    }
    return isSoldOut;
  }

}

