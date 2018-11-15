import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../../assets/constantsService';
import * as data from '../../../assets/madeEasy.json';
import { Router, ActivatedRoute } from '@angular/router';
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { ProductsService } from '../../services/products/products.service';
import { TitleService } from '../../services/title.service';
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})

export class ShopComponent implements OnInit {
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private templateName = (<any>data).templateName;
  results: {};
  private catId: any;
  private catName: any;
  catImage: any;
  private description:string[] = [];
  private loadImageCount:number = 0;
  constructor( private productService: ProductsService,
               private dataService: PagebodyServiceModule,
               private router: ActivatedRoute,
               private route: Router,
               private title: TitleService,
               private messageService: MessageService) {

    this.router.params.subscribe(params => {
      let catName = params['name'];

      if(catName){
        this.title.changeTitle(catName);
      }else{
        this.title.changeTitle("Store");
      }
    });
    this.title.setLocation('shop');
    this.messageService.sendMessage({loadImageCount:-1});

  }

  imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
    + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=thirdNavi';

  imageUrl1 = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=secondNavi";


  ngOnInit() {


    this.router.params.subscribe(params => {
      this.catId = params['id']; // --> Name must match wanted parameter
      this.catName = params['name'];
      this.catImage = params['image'];
    });

    if (this.catId != undefined) {
      this.productService.getProducts().subscribe(data => {
          // Read the result field from the JSON response.
          for(let i = 0; i<data.length; i++){
            this.description.push(this.htmlToPlaintext(data[i].desc));
          }
          this.results = data;
          if(this.templateName == "Recipe" || this.templateName == "Magazine" || this.templateName == "News"){
            this.dataService.initialImageCount = data? data.length+1 : 0;
          }else{
            this.dataService.initialImageCount = data? data.length : 0;
          }
        },
        error => {
          console.log('Error shop service');
          this.dataService.initialImageCount = 0;
        });
    } else {
      this.productService.getAllProducts().subscribe(data => {
          // Read the result field from the JSON response.
          this.results = data;
          if(this.templateName == "Recipe" || this.templateName == "Magazine" || this.templateName == "News"){
            this.dataService.initialImageCount = data? data.length+1 : 0;
          }else{
            this.dataService.initialImageCount = data? data.length : 0;
          }
        },
        error => {
          console.log('Error shop service all');
          this.dataService.initialImageCount = 0;
        });
    }

  }

  htmlToPlaintext(html) {
    return html.replace(/<[^>]+>/gm, '')
  }

  navigateProd(val: String, item: any) {
    this.dataService.data = item;
    this.route.navigate([val, this.catName, item.categoryId, item.id]);
  }

   imageLoaded(e){
    this.loadImageCount += 1;
    this.messageService.sendMessage({loadImageCount:this.loadImageCount});
  }

}

