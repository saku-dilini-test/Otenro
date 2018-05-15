import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as data from '../../madeEasy.json';
import { SERVER_URL } from '../../constantsService';
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './app/addons/categories/categories.component.html',
  styleUrls: ['./app/addons/categories/categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  private prevCategories:any = [];
  private prevProducts:any = [];
  private imageUrl: any;
  private imageUrl1: any;
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private catName: any;
  private products: any;
  constructor(private router: Router, private dataService: PagebodyServiceModule,private productService: ProductsService) {
  }

  ngOnInit() {
    this.imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=secondNavi";
      this.imageUrl1 = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=thirdNavi";
  }

  @Input('categories') categories:CategoriesModel;


  goToNextSubCategory(nextNode, currentNode, nextProducts){
    console.log(currentNode)
    if(nextNode.length != 0 || nextProducts.length != 0){
      this.prevCategories.push(currentNode);
      this.categories = nextNode;

      this.prevProducts.push(currentNode.products);
      this.products = nextProducts;
    }
  }

  goToPreviousCategory(){
    this.categories = this.prevCategories[this.prevCategories.length-1];
    this.prevCategories.splice(this.prevCategories.length-1);

    this.products = this.prevProducts[this.prevProducts.length-1];;
    this.prevProducts.splice(this.prevProducts.length-1);


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


  owlOptions = {
    loop:false,
    margin:15,
    responsiveClass:true,
    responsive:{
      0:{
        items:2
      },
      600:{
        items:4
      },
      1000:{
        items:5
      }
    }
  }

  navigateProd(val: String, item: any, catName: String) {
    console.log(catName)
      this.catName = catName;
      this.dataService.data = item;
      this.router.navigate([val, this.catName]);


  }

}

export class CategoriesModel{
	id:number;
	title:string;
	nodes:any[];
}
