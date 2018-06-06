import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { fadeInAnimation } from '../../animations/fade-in.animation';
import { CategoriesService } from '../../services/categories/categories.service'
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { ProductsService } from '../../services/products/products.service';
import { SliderService } from '../../services/slider/slider.service';
import { TitleService } from '../../services/title.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { AppDataService } from '../../services/appdata-info/appdata-info.service';

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
  private isSliderDataAvailable: boolean = false;
  private isRandomProducts;
  private categories:any
  private header;
  private content;
  constructor(private localStorageService: LocalStorageService, private route: Router, private sliderService: SliderService, private productService: ProductsService, private dataService: PagebodyServiceModule,
   private router: Router, private categoryService: CategoriesService, private title: TitleService,private appdataService: AppDataService) {

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

    for (let i = 0; i < 2; i++) {
      this.randomedArr.push({
        imageUrl: 'lazyload-ph.png'
      });
    }
    this.categoryService.getCategories().subscribe(data => {
        this.categories =data;
      }, err => {
        console.log(err);
      });

    this.title.changeTitle("Home");

  }



  ngOnInit() {

    let appUser: any = this.localStorageService.get('appLocalStorageUser' + this.appId)

    if (appUser) {
      if (this.localStorageService.get("cart" + appUser.registeredUser)) {
        this.dataService.cart = this.localStorageService.get("cart" + appUser.registeredUser);
      }
    }

    $(".carousel").swipe({
      swipe: (event, direction, distance, duration, fingerCount, fingerData) => {
        if (direction == 'left') $(this).carousel('next');
        if (direction == 'right') $(this).carousel('prev');

      },
      allowPageScroll: "vertical"

    });


    $(() => {
      var carouselEl = $('.carousel');
      var carouselItems = carouselEl.find('.item');
      carouselEl.carousel({
        interval: 100000
      }).on('slid.bs.carousel', (event) => {
      });
    });

    this.imageUrlProd = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=thirdNavi';

    this.imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=secondNavi";

    this.imageUrlSlider = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=slider";

    let max;

    this.productService.getAllProducts().subscribe(data => {

      if (data.length >= 2) {
        this.products = data;
        max = Object.keys(this.products).length;
        if (max >= 2) {
          this.isRandomProducts = true;
        }
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
      } else {
        this.products = null;
      }

    }, err => {
      console.log('Error retrieving all products');
    })


    this.appdataService.getAboutUs()
      .subscribe((data: any) => {
        this.header = data.header;
        this.content = data.content;
      }, (err) => {
        console.log(err);
      });

  }

  // ngAfterViewInit() {

  // }

  getWidth(index, length) {
    let styles = {
      'width': '100%'
    };
    let vw = window.innerWidth;
    if (vw < 768 && length - 1 === index && length % 2 === 1) {
      return styles;
    }
  }

  navigateFeaturedProd(val, item) {

    this.productService.getCategoryData(item.childId).subscribe((data: any) => {
      this.catName = data[0].name
      this.dataService.data = item;
      this.route.navigate([val, this.catName]);
    }), err => {
      console.log(err)
    }

  }

  navigateSliderProd(val, item) {
    if (item.optionals.length == 2) {
      this.catName = item.optionals[0].name
      this.dataService.data = item.optionals[1];
      this.route.navigate([val, this.catName]);
    }

  }
}
