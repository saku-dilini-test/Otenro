import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagebodyServiceModule } from '../page-body/page-body.service';
import { LocalStorageService } from 'angular-2-local-storage';
import * as data from './../../assets/madeEasy.json';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { TitleService } from "../services/title.service";
import { CategoriesService } from '../services/categories/categories.service'
import { SERVER_URL } from '../../assets/constantsService';
import { Location } from '@angular/common';
import { ProductsService } from '../services/products/products.service';
import { AppDataService } from '../services/appdata-info/appdata-info.service';
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
  categories: any;
  private catName: any;
  imageUrl: any;
  user; localCart; blogData;userUkn;
  enableBlog = false;
  showOnWebsitePolicies:boolean;
  showOnWebsiteAbout:boolean;
  showOnWebsiteContact:boolean;
  featuredCategories = [];
  nonFeaturedCategories = [];
  nonFeaturedDropdownLabel;
  curExpMainCategoryId; currentCatId;

  constructor(private location: Location, private localStorageService: LocalStorageService,
    private categoryService: CategoriesService, private router: Router,
    private dataService: PagebodyServiceModule, private titleServ: TitleService,
    private productsService: ProductsService, private appdataService: AppDataService) {

    this.title = 'Home';
    this.dummy = new Date().getTime();
    this.nonFeaturedDropdownLabel = 'other';

    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      this.categories.forEach(category => {

        category.isFeaturedCategory ?
          this.featuredCategories.push(category) : this.nonFeaturedCategories.push(category);
      });
    }, err => {
      console.log(err);
    });

	this.appdataService.getAboutUs()
      .subscribe((data: any) => {
		  if(data.showOnWebsitePolicies){
		    this.showOnWebsitePolicies = data.showOnWebsitePolicies;
          }
          if(data.showOnWebsiteAbout){
            this.showOnWebsiteAbout = data.showOnWebsiteAbout;
          }

	  }, (err) => {
        console.log(err);
      });

	this.appdataService.getContactUs().subscribe(data => {
      if(data.contactInfo && data.contactInfo.showOnWebsiteContact){
        this.showOnWebsiteContact = data.contactInfo.showOnWebsiteContact;
      }
    }), ((err) => {
      alert('warning!' + " Unable to get contact us info\n Please check your connection.");
    });

    // Get app header details
    this.appdataService.getAppHeaderdata()
      .subscribe(res => {

        if (res.status === 'SUCCESS') {

          this.nonFeaturedDropdownLabel = res.data.nonFeaturedDropdownLabel;
          if (!this.nonFeaturedDropdownLabel) {

            this.nonFeaturedDropdownLabel = 'other';
          }
        }
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
    if(this.title == 'Home'){
      this.router.navigate([route],{ queryParams: { id: 'Home'}});
    }else{
      this.router.navigate([route]);
    }
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
  
  /**
   * Add or Remove sub categories to the DOM
   * @param catId :: Id of the category that mouse cursor pointing
   * @param mainCatId :: Id of the Main Category of the cursor pointing category
   */
  appendChildAfter(catId, mainCatId) {

    // Collapse category if expanded
    if (this.curExpMainCategoryId && this.currentCatId) {

      const currentExpandedMainCategory = this.categories.filter(cat => cat.id === this.curExpMainCategoryId);
      const currentExpandedMainCategorySlice = { ...currentExpandedMainCategory[0] };
      const currentExpandedChildCategories = this.getChildCategories(this.currentCatId, currentExpandedMainCategorySlice);
      // Remove from the DOM
      for (let i = 0; i < currentExpandedChildCategories.length; i++) {
        $('#' + currentExpandedChildCategories[i].id).remove();
      }
    }
    const mainCategory = this.categories.filter(cat => cat.id === mainCatId);
    const mainCategorySlice = { ...mainCategory[0] };
    const childCategories = this.getChildCategories(catId, mainCategorySlice);
    // Add to the DOM
    for (let i = 0; i < childCategories.length; i++) {
      let hasChildNodes = (childCategories[i].childNodes.length > 0) ? true : false;
      let html = this.createHtmlContent(childCategories[i].id, mainCatId, hasChildNodes, childCategories[i].name);
      $('#' + catId).after(html);
    }
    this.curExpMainCategoryId = mainCatId;
    this.currentCatId = catId;
  }

  /**
   * Generate html content
   * @param catId :: Id of the category
   * @param mainCatId :: Id of the Main category
   * @param hasChildNodes{boolean} :: Are there child categories
   * @param catName :: Name of the category
   */
  createHtmlContent(catId, mainCatId, hasChildNodes, catName) {

    let html;
    // If there are child categories
    if (hasChildNodes) {

      html = '<a href="#/?id=' + catId + '" style="margin-left: 10px;" id="' + catId + '"' +
        '(mouseenter)="appendChildAfter(' + catId + ',' + mainCatId + ',' + catId + ')"' +
        '[routerLink]="[""]" [queryParams]="{ id:' + catId + '}">' +
        '<span>' + catName + '</span>' +
        '<span class="caret"></span></a>';
    } else {

      html = '<a href="#/?id=' + catId + '" style="margin-left: 10px;" id="' + catId + '"' +
        '(mouseenter)="appendChildAfter(' + catId + ',' + mainCatId + ',' + catId + ')"' +
        '[routerLink]="[""]" [queryParams]="{ id:' + catId + '}">' +
        '<span>' + catName + '</span></a>';
    }
    return html;
  }
  
  /**
   * Get childnodes of a specific category
   * @param catId :: Id of the category
   * @param mainCategory :: Main category data
   */
  getChildCategories(catId, mainCategory) {
    
    for(let i = 0; i < mainCategory.childNodes.length; i++) {

      if (mainCategory.childNodes[i].id === catId) {
        return mainCategory.childNodes[i].childNodes;
      }
      let found = this.getChildCategories(catId, mainCategory.childNodes[i]);
      if (found) return found;
    }
  }
}
