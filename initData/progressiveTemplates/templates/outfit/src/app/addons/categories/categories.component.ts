import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as data from '../../madeEasy.json';
import { SERVER_URL } from '../../constantsService';
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { ProductsService } from '../../services/products/products.service';
import { CurrencyService } from '../../services/currency/currency.service';

@Component({
  selector: 'app-categories',
  templateUrl: './app/addons/categories/categories.component.html',
  styleUrls: ['./app/addons/categories/categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  private prevCategories:any = [];
  private prevProducts:any = [];
  private imageUrl: any;
  private imageUrl1: any;
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private catName: any;
  private products:any = [];
  private currentViewName:string;
  private currency: string;
  constructor(private router: Router, private dataService: PagebodyServiceModule,private productService: ProductsService, private currencyService: CurrencyService) {
    this.currentViewName = 'Home';
  }

  ngOnInit() {
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

  @Input('categories') categories:CategoriesModel;


  goToNextSubCategory(nextNode, currentNode, nextProducts, nextName){
    this.prevCategories.push({
      cat:currentNode,
      catName:this.currentViewName
    });

    this.currentViewName = nextName;
    this.categories = nextNode;

    this.prevProducts.push(this.products[0]);

    this.products[0] = nextProducts;

  }

  goToPreviousCategory(index){

    this.categories = this.prevCategories[index].cat;
    if(index != 0){
      this.currentViewName = this.prevCategories[index].catName;
    }else{
      this.currentViewName = 'Home';
    }
    this.prevCategories.splice(index);
    this.products[0] = this.prevProducts[index];

    this.prevProducts.splice(index);
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
    loop:false,
    margin:15,
    responsiveClass:true,
    responsive:{
      0:{
        items:2
      },
      600:{
        items:4
      },
      1000:{
        items:4
      }
    }
  }

  navigateProd(val: String, item: any, catName: String) {
    this.catName = catName;
    this.dataService.data = item;
    this.router.navigate([val, this.catName]);
  }

}

export class CategoriesModel{
  id:number;
  title:string;
  nodes:any[];
}
