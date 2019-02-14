import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagebodyServiceModule } from '../page-body/page-body.service';
import { LocalStorageService } from 'angular-2-local-storage';
import * as data from './../madeEasy.json';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { TitleService } from "../services/title.service";
import { CategoriesService } from '../services/categories/categories.service'
import { SERVER_URL } from '../constantsService';
import {Location} from '@angular/common';
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
  categories:any
  private catName: any;
  imageUrl:any;
  user; localCart; blogData;userUkn;
  showOnWebsitePolicies:boolean;
  showOnWebsiteAbout:boolean;
  showOnWebsiteContact:boolean;
  featuredCategories = [];
  nonFeaturedCategories = [];
  nonFeaturedDropdownLabel;
  curExpMainCategoryId; currentCatId;
  txtDecoratedCatId;
  constructor(private location: Location,private localStorageService: LocalStorageService,
              private categoryService: CategoriesService, private router: Router,
              private dataService: PagebodyServiceModule, private titleServ: TitleService,
              private appdataService: AppDataService) {
    this.cartNo = this.dataService.cart.cartItems.length;
    this.title = 'Home';
    this.dummy = new Date().getTime();

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


    // this.productsService.getBlogs().subscribe(res => {

    //   this.blogData = res;
    //   if (this.blogData.length > 0) {
    //     this.enableBlog = true;
    //   }
    // });

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

  /**
   * Responsible for Adding and Removing Categories to the DOM Dynamically
   * @param catId :: Id of the mouse pointed Category
   * @param mainCatId :: Id of the main category
   */
  appendChildAfter(catId, mainCatId) {

    const mainCategory = this.categories.filter(cat => cat.id === mainCatId);
    const mainCategorySlice = { ...mainCategory[0] };

    const parentCategory = this.getParentCategory(catId, mainCategorySlice);
    const siblingCategories = parentCategory.childNodes.filter(cat => cat.id !== catId);
    let siblingCategoriesSubCatIds = [];

    for (let i = 0; i < siblingCategories.length; i++) {
      this.getSubCategoriesOfSiblingCategories(siblingCategories[i].childNodes, siblingCategoriesSubCatIds);
    }
    this.removeSubCategorisOfSiblingCategories(siblingCategoriesSubCatIds);
    const childCategories = this.getChildCategories(catId, mainCategorySlice);

    // If mouse pointing category has child categories
    if (childCategories.length > 0) {
      // Remove style from previous category 
      if (this.txtDecoratedCatId) {
        $('#' + this.txtDecoratedCatId).css({ 'text-decoration': 'none' });
      }
      // Set style to current category
      $('#' + catId).css({ 'text-decoration': 'underline' });
      this.txtDecoratedCatId = catId;
    }

    for (let i = childCategories.length - 1; i >= 0; i--) {

      // If not in the DOM
      if ($('#' + childCategories[i].id).length === 0) {
        let hasChildNodes = (childCategories[i].childNodes.length > 0) ? true : false;
        let html = this.createHtmlContent(childCategories[i].id, mainCatId, hasChildNodes, childCategories[i].name, childCategories[i].treeLevel);

        $('#' + catId).after(html);
        // Register mouseenter event on newly rendrered category
        $('#' + childCategories[i].id).on("mouseenter", () => {
          this.appendChildAfter(childCategories[i].id, mainCatId);
        });
      }
    }
  }

  /**
   * Return sub categories' Ids of Sibling categories of mouse pointed category
   * @param childNodes 
   * @param siblingCategoriesSubCatIds 
   * 
   * @return siblingCategoriesSubCatIds{Array}
   */
  getSubCategoriesOfSiblingCategories(childNodes, siblingCategoriesSubCatIds) {

    const recursiveFunc = (nodes) => {

      if (nodes.length !== 0) {
        for (let i = 0; i < nodes.length; i++) {

          siblingCategoriesSubCatIds.push(nodes[i].id);
          recursiveFunc(nodes[i].childNodes)
        }
      }
    }
    recursiveFunc(childNodes)
    return siblingCategoriesSubCatIds;
  }

  /**
   * Create html content of sub category
   * This html content is rendered to DOM dynamically
   * @param catId :: Id of the parent category 
   * @param mainCatId :: Id of the main category
   * @param hasChildNodes{boolean} :: Has sub category children categories
   * @param catName :: Category name
   */
  createHtmlContent(catId, mainCatId, hasChildNodes, catName, treeLevel) {

    let html;
    let leftMargin = ((treeLevel - 1) * 10) + 'px';
    if (hasChildNodes) {

      html = `<a href="#/?id=${catId}" style="margin-left: ${leftMargin};" id="${catId}"` +
        `(mouseenter)="appendChildAfter(${catId},${mainCatId})"` +
        `[routerLink]="['']" [queryParams]="{ id:${catId}}">` +
        `<span>${catName}</span>` +
        `<span class="caret"></span></a>`;
    } else {

      html = `<a href="#/?id=${catId}" style="margin-left: ${leftMargin};" id="${catId}"` +
        `(mouseenter)="appendChildAfter(${catId},${mainCatId})"` +
        `[routerLink]="['']" [queryParams]="{ id:${catId}}">` +
        `<span>${catName}</span></a>`;
    }
    return html;
  }

  /**
   * Get child nodes of a specific category
   * @param catId :: Id of the category
   * @param mainCategory :: Main category data
   */
  getChildCategories(catId, mainCategory) {

    for (let i = 0; i < mainCategory.childNodes.length; i++) {

      if (mainCategory.childNodes[i].id === catId) {
        return mainCategory.childNodes[i].childNodes;
      }
      let found = this.getChildCategories(catId, mainCategory.childNodes[i]);
      if (found) return found;
    }
  }

  /**
   * Return parent category of specific child category
   * @param catId :: Id of the child category
   * @param mainCategory :: Category list
   */
  getParentCategory(catId, mainCategory) {

    for (let i = 0; i < mainCategory.childNodes.length; i++) {

      if (mainCategory.childNodes[i].id === catId) {
        return mainCategory;
      }
      let found = this.getParentCategory(catId, mainCategory.childNodes[i]);
      if (found) return found;;
    }
  }

  /**
   * Remove sub categories of sibling categories of mouse pointed category from the DOM
   * @param categoryIds{Array} :: Ids of the sub categories of sibling categories of mouse pointed category
   **/
  removeSubCategorisOfSiblingCategories(categoryIds) {

    // Remove sub categories from DOM using ids which is the IDs of the categories
    categoryIds.forEach(categoryId => {

      $('#' + categoryId).remove();
    });
  }

  // Set style to the main header category
  setStyle(catId) {

    if (this.txtDecoratedCatId) {
      $('#' + this.txtDecoratedCatId).css({ 'text-decoration': 'none' });
    }
    this.txtDecoratedCatId = catId;
    $('#' + this.txtDecoratedCatId).css({ 'text-decoration': 'underline' });
  }

  /**
   * Handle header/toolbar title click event
   * @param title :: header title
   */
  onTitleClickHandler(title) {
    
    if (title === "Search") {
      window.scrollTo(0, 0);
    }
  }
}
