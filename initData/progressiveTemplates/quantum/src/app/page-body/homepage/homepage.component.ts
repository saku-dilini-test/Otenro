import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { fadeInAnimation } from '../../animations/fade-in.animation';
import { CategoriesService } from '../../services/categories/categories.service'
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { forEach } from '@angular/router/src/utils/collection';
import { ProductsService } from '../../services/products/products.service';
import { SliderService } from '../../services/slider/slider.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './app/page-body/homepage/homepage.component.html',
  styleUrls: ['./app/page-body/homepage/homepage.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }

})
export class HomepageComponent implements OnInit {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private categoryId;
  private categoryName;
  private imageUrl: any;
  private products: any;
  private results: {};
  private randomIndex;
  private imageUrlProd;
  private randomedArr = [];
  private sliderData: any;
  private imageUrlSlider;
  private catName;
  private isSliderDataAvailable:boolean = false;
  constructor(private route: Router,private sliderService: SliderService, private productService: ProductsService, private dataService: PagebodyServiceModule, private router: Router, private categoryService: CategoriesService,private title: TitleService) {

    this.sliderService.retrieveSliderData().subscribe(data => {
      this.sliderData = data;
       var size = Object.keys(this.sliderData).length;
       if(size >0){
        this.isSliderDataAvailable = true;
       }else{
        this.isSliderDataAvailable = false;
       }
    }, err => {
      console.log(err);
    });

    for (let i = 0; i < 2; i++) {
      this.randomedArr.push({
        imageUrl: 'lazyload-ph.png'
      });
    }

    this.title.changeTitle("Home");

  }



  ngOnInit() {



    this.imageUrlProd = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=thirdNavi';

    this.imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=secondNavi";

    this.imageUrlSlider = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=slider";

    this.categoryService.getCategories().subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data;
      data.forEach(element => {
        this.dataService.searchArray.push({ 'name': element.name, 'id': element.id });
      });

    },
      error => {
        console.log('Error retrieving categories');
      });


    let max;

    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      max = Object.keys(this.products).length;

      let lastIndex = null;
      this.randomedArr = [];
      while (true) {
        this.randomIndex = Math.floor(Math.random() * max);
        if (this.randomedArr.length == 2) {
          break;
        }

        if (lastIndex != null && this.randomedArr.length == 1) {
          if (lastIndex != this.randomIndex) {
            this.randomedArr.push(this.products[this.randomIndex]);
            break;
          }
        } else {
          this.randomedArr.push(this.products[this.randomIndex]);
          lastIndex = this.randomIndex;
        }

      }
    }, err => {
      console.log('Error retrieving all products');
    })

  }


  getWidth(index, length) {
    let styles = {
      'width': '100%'
    };
    let vw = window.innerWidth;
    if (vw < 768 && length - 1 === index && index % 2 === 0) {
      return styles;
    }
  }

  // Routing Method
  navigateShop(val: string, id, name) {
    this.dataService.catId = id;
    this.router.navigate(['/' + val, id, name]);
  }

  navigateFeaturedProd(val, item){

    this.productService.getCategoryData(item.childId).subscribe((data: any) => {
      this.catName = data[0].name
      this.dataService.data = item;
      this.route.navigate([val, this.catName]);
    }), err => {
      console.log(err)
    }

  }

}
