import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { CategoriesService } from '../../services/categories/categories.service'
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { TitleService } from '../../services/title.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { AppDataService } from '../../services/appdata-info/appdata-info.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './app/page-body/homepage/homepage.component.html',
  styleUrls: ['./app/page-body/homepage/homepage.component.css']
})
export class HomepageComponent implements OnInit {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private catName;
  private categories:any
  constructor(private localStorageService: LocalStorageService, private route: Router, private dataService: PagebodyServiceModule,
   private router: Router, private categoryService: CategoriesService, private title: TitleService,private appdataService: AppDataService) {


    this.categoryService.getCategories().subscribe(data => {
        this.categories =data;
      }, err => {
        console.log(err);
      });

    this.title.changeTitle("Home");

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

  ngOnInit() {

    let appUser: any = this.localStorageService.get('appLocalStorageUser' + this.appId)

    if (appUser) {
      if (this.localStorageService.get("cart" + appUser.registeredUser)) {
        this.dataService.cart = this.localStorageService.get("cart" + appUser.registeredUser);
      }
    }

  }
}
