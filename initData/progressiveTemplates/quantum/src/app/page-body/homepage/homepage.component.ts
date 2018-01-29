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

  private results: {};

  constructor(private dataService: PagebodyServiceModule, private router: Router, private categoryService: CategoriesService) { }

  ngOnInit() {

    this.imageUrl = SERVER_URL + "/templates/viewImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&img=secondNavi";

    this.categoryService.getCategories().subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data;
      console.log(data);
      data.forEach(element => {
        this.dataService.searchArray.push({ 'name': element.name, 'id': element.id });
      });

    },
      error => {
        console.log('Error retrieving categories');
      });


  }

  // Routing Method
  navigateShop(val: string, id, name) {
    console.log(val);
    this.dataService.catId = id;
    this.router.navigate(['/' + val, id, name]);
  }



  //   slides = SLIDES;
  //   images: Array<string> = ['sports', 'abstract', 'people', 'transport', 'city', 'technics', 'nightlife', 'animals'];

  //   owlOptions = {
  //     loop: true,
  //     margin: 10,
  //     responsiveClass: true,
  //     responsive: {
  //       0: {
  //         items: 2
  //       },
  //       600: {
  //         items: 4
  //       },
  //       1000: {
  //         items: 6,
  //         loop: true
  //       }
  //     }
  //   }


  //   state: string = 'small';

  //   animateMe() {
  //     this.state = (this.state === 'small' ? 'large' : 'small');
  //   }



  // }

  // const SLIDES = [
  //   { src: './assets/images/slider/1.jpg', title: 'Final Sale' },
  //   { src: './assets/images/slider/2.jpg', title: 'Final Sale' },
  //   { src: './assets/images/slider/3.jpg', title: 'Final Sale' },
  // ];
}
