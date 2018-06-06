import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagebodyServiceModule } from '../page-body/page-body.service';
import { LocalStorageService } from 'angular-2-local-storage';
import * as data from './../madeEasy.json';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { TitleService } from "../services/title.service";
import { CategoriesService } from '../services/categories/categories.service'
import { SERVER_URL } from '../constantsService';

@Component({
  selector: 'app-header',
  templateUrl: './app/header/header.component.html',
  styleUrls: ['./app/header/header.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})

export class HeaderComponent implements OnInit {
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private cartNo: number;
  public title: string;
  public loginStatus;
  private dummy: any;
  private categories:any
  private catName: any;
  private imageUrl:any;
  constructor(private localStorageService: LocalStorageService,private categoryService: CategoriesService, private router: Router, private dataService: PagebodyServiceModule, private titleServ: TitleService) {
    this.cartNo = this.dataService.cart.cartItems.length;
    this.title = 'Home';
    this.dummy = new Date().getTime();

    this.categoryService.getCategories().subscribe(data => {
        this.categories =data;
      }, err => {
        console.log(err);
      });
  }

  ngOnInit() {
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
    if (this.dataService.cart.cartItems) {
      this.cartNo = this.dataService.cart.cartItems.length;
    }
    if (this.localStorageService.get('appLocalStorageUser' + this.appId) !== null) {
      this.loginStatus = true;
    } else {
      this.loginStatus = false;
    }

  }

  logout() {
    this.localStorageService.remove('appLocalStorageUser' + this.appId);
    this.dataService.isUserLoggedIn.check = false;
    this.dataService.cart.cartItems = [];
    this.router.navigate(['home']);
  }

  navigate(route: string, name: string) {
    this.title = name;

    this.router.navigate([route]);
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
    this.router.navigate([val, this.catName]);
  }
}
