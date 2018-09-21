import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { TitleService } from '../../services/title.service';
import { CategoriesService } from '../../services/categories/categories.service'
import { PagebodyServiceModule } from '../../page-body/page-body.service'

@Component({
  selector: 'app-newarivals',
  templateUrl: './newarivals.component.html',
  styleUrls: ['./newarivals.component.css']
})
export class NewarivalsComponent {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  categories:any;
  private imageUrl:any;
  private imageUrl1:any;
  private catName: any;
  showComingSoon:boolean = false;
  constructor(private title: TitleService, private categoryService: CategoriesService,private dataService: PagebodyServiceModule, private router: Router) {
    this.title.changeTitle("New Arrivals");

  this.categoryService.getCategories().subscribe(data => {
    for(let i=0;i<data.length;i++){
      if(data[i].name == 'New Arrivals'){
        this.categories = data[i];
        break;
      }else if(i == data.length-1) {
        this.showComingSoon = true;
      }
    }
  }, err => {
    console.error(err);
  });

  this.imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
  + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=secondNavi";

   this.imageUrl1 = SERVER_URL + "/templates/viewWebImages?userId="
  + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=thirdNavi";

  }


  checkSoldOut(product) {

    let count = 0;
    let isSoldOut = false;
    if (product) {
      let variantsLength = product.variants.length;

      for (let i = 0; i < variantsLength; i++) {
        if (product.variants[i].quantity == 0) {
          count++;
        }
      }

      if (count == variantsLength) {
        isSoldOut = true;
      } else {
        isSoldOut = false;
      }
    }
    return isSoldOut;
  }

  navigateProd(val: String, item: any, catName: String) {
    this.catName = catName;
    this.dataService.data = item;
    localStorage.setItem(this.appId+":dataServiceData",JSON.stringify(this.dataService.data))
    this.router.navigate([val, this.catName]);
  }


}
