import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as data from '../../madeEasy.json';
import { SERVER_URL } from '../../constantsService';

@Component({
  selector: 'app-categories',
  templateUrl: './app/addons/categories/categories.component.html',
  styleUrls: ['./app/addons/categories/categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  prevCategories:any = [];
  private imageUrl: any;
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=secondNavi";
  }

  @Input('categories') categories:CategoriesModel;


  goToNextSubCategory(nextNode, currentNode){
    if(nextNode.length != 0){
      this.prevCategories.push(currentNode);
      this.categories = nextNode;
    }
  }

  goToPreviousCategory(){
   this.categories = this.prevCategories[this.prevCategories.length-1];
   this.prevCategories.splice(this.prevCategories.length-1);
  }


  getWidth(index, length) {
    let styles = {
      'width': '100%'
    };
    let vw = window.innerWidth;
    if (vw < 768 && length - 1 === index && length % 2 === 1) {
      return styles;
    }
  }

}

export class CategoriesModel{
	id:number;
	title:string;
	nodes:any[];
}
