import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { CategoriesService } from '../../services/categories/categories.service'
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { TitleService } from '../../services/title.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { AppDataService } from '../../services/appdata-info/appdata-info.service';
import { SliderService } from '../../services/slider/slider.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private catName;
  categories:any;
  products:any;
  primaryCategories:any;
  prevCategories:boolean = false;
  isSliderDataAvailable: boolean = false;
  private sliderData: any;
  header;
  private content;
  private imageUrlSlider;
  private imageUrl;
  private currentCategoryImage;

  constructor(private localStorageService: LocalStorageService, private router: Router, private dataService: PagebodyServiceModule,
   private categoryService: CategoriesService, private title: TitleService,private appdataService: AppDataService,
   private route:ActivatedRoute, sliderService: SliderService) {

    this.title.changeTitle("Home");

    sliderService.retrieveSliderData().subscribe(data => {
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

    this.appdataService.getAboutUs().subscribe((data: any) => {
      this.header = data.header;
      this.content = data.content;
    }, (err) => {
      console.log(err);
    });

    this.route.queryParams.subscribe( params =>{
      if(params.id && params.id != 'Home'){
         this.prevCategories = true;
      }else{
        this.prevCategories = false;
      }
        categoryService.getCategories().subscribe(data => {
          this.primaryCategories = data;
          // console.log(this.primaryCategories,params.id)
              categoryService.getNodeById(this.primaryCategories,params.id).subscribe((result)=>{
          // console.log(result)
                    console.log(this.dataService.categories)
                    this.currentCategoryImage = this.dataService.currentCategoryImage;
                    this.categories = this.dataService.categories;
                    this.products = this.dataService.products;
              });
        });
    });

     this.imageUrlSlider = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=slider";
     this.imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=secondNavi";
  }


  ngOnInit() {

    let appUser: any = this.localStorageService.get('appLocalStorageUser' + this.appId)

    if (appUser) {
      if (this.localStorageService.get("cart" + appUser.registeredUser)) {
        this.dataService.cart = this.localStorageService.get("cart" + appUser.registeredUser);
      }
    }

  }
}
