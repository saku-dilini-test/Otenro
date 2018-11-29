import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { TitleService } from '../../services/title.service';
import { CategoriesService } from '../../services/categories/categories.service'
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-newarivals',
  templateUrl: './newarivals.component.html',
  styleUrls: ['./newarivals.component.css']
})
export class NewarivalsComponent {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  categories:any;
  private imageUrl:any;
  private imageUrl1:any;
  private catName: any;
  showComingSoon:boolean = false;
  todayDate;
  promoData = [];
  constructor(private title: TitleService,
    private categoryService: CategoriesService,
    private dataService: PagebodyServiceModule,
    private router: Router,
    private productsService: ProductsService) {
    this.title.changeTitle("New Arrivals");

  this.categoryService.getCategories().subscribe(data => {
    for(let i=0;i<data.length;i++){
      if(data[i].name == 'New Arrivals'){
        this.categories = data[i];
        break;
      }else if(i == data.length-1) {
        this.showComingSoon = true;
      }
    }
  }, err => {
    console.error(err);
  });

  this.imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
  + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=secondNavi";

   this.imageUrl1 = SERVER_URL + "/templates/viewWebImages?userId="
  + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=thirdNavi";

  }

  ngOnInit() {

    let currentData = new Date();
    let cDateStr = currentData.getFullYear() + "/" + (currentData.getMonth() + 1) + "/" + currentData.getDate();
    this.todayDate = new Date(cDateStr);

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
    let availableFirstVariPromo = false;

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

  getDiscountPrice(sku, price) {

    let newPrice, percentagePrice;
    let test = this.promoData.filter((data) => data.sku == sku);

    if (test[0].discountType == "discountValue") {

      newPrice = price - test[0].discount;
      return newPrice;
    } else {

      percentagePrice = price * (test[0].discount / 100)
      newPrice = price - percentagePrice;
      return newPrice;
    }
  }
}
