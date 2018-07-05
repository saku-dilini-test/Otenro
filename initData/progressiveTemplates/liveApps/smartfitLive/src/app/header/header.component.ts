import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagebodyServiceModule } from '../page-body/page-body.service';
import { LocalStorageService } from 'angular-2-local-storage';
import * as data from './../madeEasy.json';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { TitleService } from "../services/title.service";
import { CategoriesService } from '../services/categories/categories.service'
import { SERVER_URL } from '../constantsService';
import { Location } from '@angular/common';
import { ProductsService } from '../services/products/products.service';
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})

export class HeaderComponent implements OnInit {
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  cartNo: number;
  public title: string;
  public loginStatus;
  dummy: any;
  private categories: any
  private catName: any;
  imageUrl: any;
  user; localCart; blogData;userUkn;
  enableBlog = false;

  constructor(private location: Location, private localStorageService: LocalStorageService,
    private categoryService: CategoriesService, private router: Router,
    private dataService: PagebodyServiceModule, private titleServ: TitleService,
    private productsService: ProductsService) {

    this.title = 'Home';
    this.dummy = new Date().getTime();

    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.user = (this.localStorageService.get('appLocalStorageUser' + this.appId));
    this.userUkn = (this.localStorageService.get('cartUnknownUser'));

    if (this.user) {
      this.localCart = this.localStorageService.get("cart" + this.user.registeredUser);
      if(this.localCart){
        this.dataService.cart = this.localCart;
      }
    }else if(this.userUkn){
      this.dataService.cart = this.userUkn;
    }

        this.cartNo = this.dataService.cart.cartSize;


    this.productsService.getBlogs().subscribe(res => {

      this.blogData = res;
      if (this.blogData.length > 0) {
        this.enableBlog = true;
      }
    });

    this.imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=";

    this.titleServ.currentTitle.subscribe(message => this.title = message);

    $(".navbar-2").on('show.bs.collapse', function () {
      $('.mobileTitle').removeClass('visible-xs');
      $('.mobileTitle').addClass('hidden');
    });

    $(".navbar-2").on('hide.bs.collapse', function () {
      $('.mobileTitle').addClass('visible-xs');
      $('.mobileTitle').removeClass('hidden');
    });
  }

  ngAfterContentChecked() {

    if (this.user) {
      this.localCart = this.localStorageService.get("cart" + this.user.registeredUser);
    }else{
      this.localCart = null;
    }

      this.cartNo = this.dataService.cart.cartSize;


    if (this.localStorageService.get('appLocalStorageUser' + this.appId) !== null) {
      this.loginStatus = true;
    } else {
      this.loginStatus = false;
    }

  }

  logout() {

    this.localStorageService.remove('appLocalStorageUser' + this.appId);
    localStorage.removeItem(this.appId + ":dataServiceData");
    this.dataService.isUserLoggedIn.check = false;
    this.dataService.cart.cartItems = [];
    this.dataService.cart.cartSize = 0;
    this.cartNo = 0;
    this.router.navigate(['home']);
  }

  navigate(route: string, name: string) {
    this.title = name;

    this.router.navigate([route]);
  }
  goBack() {
    this.location.back();
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "100%";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  manualToggle() {
    this.titleServ.changeTitle("Shopping Cart");
    $('.navbar-2').removeClass('in');
    $('.mobileTitle').addClass('visible-xs');
    $('.mobileTitle').removeClass('hidden');
  }

  navigateProd(val: String, item: any, catName: String) {
    this.catName = catName;
    this.dataService.data = item;
    localStorage.setItem(this.appId + ":dataServiceData", JSON.stringify(this.dataService.data))
    this.router.navigate([val, this.catName]);
  }

  goToRegister() {
    this.router.navigate(['register', "home"]);
  }
}
