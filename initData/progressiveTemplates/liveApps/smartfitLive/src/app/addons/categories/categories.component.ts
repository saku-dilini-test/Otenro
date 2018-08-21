import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as data from '../../madeEasy.json';
import { SERVER_URL } from '../../constantsService';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { CurrencyService } from '../../services/currency/currency.service';
import { ProductsService } from '../../services/products/products.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  private imageUrl: any;
  private imageUrl1: any;
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private catName: any;
  private currentViewName: string;
  private currency: string;
  promoData = []; todayDate;

  @Input('categories') categories: CategoriesModel;
  @Input('products') products: any;

  constructor(private router: Router, private dataService: PagebodyServiceModule,
    private currencyService: CurrencyService, private productsService: ProductsService) {
    this.currentViewName = 'Home';

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
    });
  }

  ngOnInit() {

    var d = new Date();
    var str = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
    this.todayDate = new Date(str);

    this.imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=secondNavi";
    this.imageUrl1 = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=thirdNavi";


    this.currencyService.getCurrencies().subscribe(data => {
      this.currency = data.sign;
    }, error => {
      console.log('Error retrieving currency');
    });

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
    // console.log(product);
    if (product.variants.length > 0 && this.promoData) {
      for (let i = 0; i < this.promoData.length; i++) {
        if (this.promoData[i].sku == product.variants[0].sku) {
          if (new Date(this.promoData[i].toDate) >= this.todayDate) {
            availableFirstVariPromo = true;
            // if (this.promoData[i].discountType == "discountValue") {
            //     this.oldPrice = product.variants[0].price;
            //     this.newPrice = product.variants[0].price - this.promoData[i].discount;
            // } else {
            //     this.oldPrice = product.variants[0].price;
            //     percentagePrice = product.variants[0].price * (this.promoData[i].discount / 100);
            //     this.newPrice = product.variants[0].price - percentagePrice;
            // }
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
    console.log(test);
    if(test[0].discountType  == "discountValue"){
      newPrice = price - test[0].discount;
      return newPrice;
    }else{
      percentagePrice = price * (test[0].discount / 100)
      newPrice = price - percentagePrice;
      return newPrice;
    }
  }

  getWidth(index, length) {
    let styles = {
      'width': '100%'
    };
    let vw = window.innerWidth;
    if (vw < 768 && length - 1 === index && length % 2 === 1) {
      return styles;
    }
  }


  owlOptions = {
    loop: false,
    margin: 15,
    stagePadding: 50,
    nav: true,
    dots: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  }

  navigateProd(val: String, item: any, catName: String) {
    if (!this.checkSoldOut(item)) {
      this.catName = catName;
      this.dataService.data = item;
      localStorage.setItem(this.appId + ":dataServiceData", JSON.stringify(this.dataService.data));
      this.router.navigate([val, this.catName]);
    }
  }

}

export class CategoriesModel {
  id: number;
  title: string;
  nodes: any[];
}
