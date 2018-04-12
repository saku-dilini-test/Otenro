import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { CategoriesService } from '../../services/categories/categories.service'
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './app/page-body/homepage/homepage.component.html',
  styleUrls: ['./app/page-body/homepage/homepage.component.css'],

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

  constructor(private route: Router, private dataService: PagebodyServiceModule, private router: Router, private categoryService: CategoriesService, private title: TitleService) {

    this.title.changeTitle("Your Horoscope");

  }



  ngOnInit() {

    this.imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=secondNavi";

    this.categoryService.getCategories().subscribe(data => {
      if (data.length > 0) {
        // Read the result field from the JSON response.
        this.results = data;
        this.dataService.searchArray = [];
        data.forEach(element => {
          this.dataService.searchArray.push({ 'name': element.name, 'id': element.id });
        });
      } else {
        this.results = null;
      }


    },
      error => {
        console.log('Error retrieving categories');
      });

  }


  // Routing Method
  navigateShop(val: string, id, name) {
    this.dataService.catId = id;
    this.router.navigate(['/' + val, id, name]);
  }

 
}
