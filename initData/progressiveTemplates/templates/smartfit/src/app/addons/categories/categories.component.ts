import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as data from '../../madeEasy.json';
import { SERVER_URL } from '../../constantsService';
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { ProductsService } from '../../services/products/products.service';
import { CurrencyService } from '../../services/currency/currency.service';
import { AppDataService } from '../../services/appdata-info/appdata-info.service';
import { SliderService } from '../../services/slider/slider.service';
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
  private sliderData: any;
  private isSliderDataAvailable: boolean = false;
  private imageUrlSlider;
  private currentCategory;
  private header;
  private content;
  constructor(private router: Router, private dataService: PagebodyServiceModule,private productService: ProductsService, private currencyService: CurrencyService,private appdataService: AppDataService,
    private sliderService: SliderService) {
    this.currentViewName = 'Home';

    this.sliderService.retrieveSliderData().subscribe(data => {
      if (data.length > 0) {
        this.sliderData = data;
        var size = Object.keys(this.sliderData).length;
        if (size > 0) {
          this.isSliderDataAvailable = true;
        } else {
          this.isSliderDataAvailable = false;
        }
      } else {
        this.sliderData = null;
        this.isSliderDataAvailable = false;
      }

    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
      this.imageUrlSlider = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=slider";
    this.imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
        + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=secondNavi";
    this.imageUrl1 = SERVER_URL + "/templates/viewWebImages?userId="
        + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=thirdNavi";


    this.currencyService.getCurrencies().subscribe(data => {
        this.currency = data.sign;
    }, error => {
        console.log('Error retrieving currency');
    });

    this.appdataService.getAboutUs()
      .subscribe((data: any) => {
        this.header = data.header;
        this.content = data.content;
    }, (err) => {
      console.log(err);
    });
  }

  ngAfterViewChecked() {
    $('.carousel').carousel({
      interval: 3000
    });
    // $('.right.carousel-control').trigger('click');
  }
  ngOnDestroy() {
    $('.carousel').carousel('pause');
  }

  @Input('categories') categories:CategoriesModel;


  goToNextSubCategory(nextNode, currentNode, nextProducts, currentCategory){
    this.prevCategories.push({
      cat:currentNode,
      catName:this.currentViewName,
      currentCategory: currentCategory
    });
    this.currentCategory = currentCategory;
    this.currentViewName = currentCategory.name;
    this.categories = nextNode;
    this.prevProducts.push(this.products[0]);
    this.products[0] = nextProducts;
    window.scrollTo(0, 0);
  }


  goToPreviousCategory(index){
    this.categories = this.prevCategories[index].cat;
    if(index != 0){
      this.currentViewName = this.prevCategories[index].catName;
      this.currentCategory = this.prevCategories[index-1].currentCategory;

    }else{
      this.currentViewName = 'Home';
    }
    this.prevCategories.splice(index);
    this.products[0] = this.prevProducts[index];

    this.prevProducts.splice(index);
    window.scrollTo(0, 0);
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
    stagePadding: 50,
    nav:true,
    dots:true,
    responsiveClass:true,
    responsive:{
      0:{
        items:1
      },
      600:{
        items:2
      },
      1000:{
        items:3
      }
    }
  }

  navigateProd(val: String, item: any, catName: String) {
    this.catName = catName;
    this.dataService.data = item;
    this.router.navigate([val, this.catName]);
  }

    navigateSliderProd(val, item) {
      if (item.optionals.length == 2) {
        this.catName = item.optionals[0].name
        this.dataService.data = item.optionals[1];
        this.router.navigate([val, this.catName]);
      }
    }

}

export class CategoriesModel{
  id:number;
  title:string;
  nodes:any[];
}
