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
  todayDate;
  promoData = [];
  constructor(private currencyService: CurrencyService, private productService: ProductsService,
    private dataService: PagebodyServiceModule, private router: Router,
    private title: TitleService, private productsService:ProductsService) {

      this.productsService.getSalesAndPromoData(this.appId).subscribe(data => {

        data.forEach(element => {
          element.selectedProduct.forEach(variants => {
  
            variants.fromDate = element.dateFrom;
            variants.toDate = element.dateTo;
  
            if (element.discountType == 'discountValue') {
              variants.discountType = element.discountType;
              variants.discount = element.discount
            } else {
              variants.discountType = element.discountType;
              variants.discount = element.discountPercent
            }
  
            this.promoData.push(variants);
          });
        });
        console.log(this.promoData);
      });

     this.title.changeTitle("Search");

  }

  private imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
    + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=thirdNavi';


  ngOnInit() {

    var d = new Date();
    var str = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
    this.todayDate = new Date(str);

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
    this.router.navigate([val, this.catName]);
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

  checkForPromo(product) {
    var availableFirstVariPromo = false;
    if (product.variants.length > 0 && this.promoData) {
      for (let i = 0; i < this.promoData.length; i++) {
        if (this.promoData[i].sku == product.variants[0].sku) {
          if (new Date(this.promoData[i].toDate) >= this.todayDate) {
            availableFirstVariPromo = true;
          }
          break;
        }

      };

    }
    return availableFirstVariPromo;
  }

  getDiscountPrice(sku,price){
    var newPrice,percentagePrice;
    var test = this.promoData.filter((data)=> data.sku == sku);
    if(test[0] == "discountValue"){
      newPrice = price - test[0].discount;
      return newPrice;
    }else{
      percentagePrice = price * (test[0].discount / 100)
      newPrice = price - percentagePrice;
      return newPrice;
    }

    return newPrice;
  }

}

