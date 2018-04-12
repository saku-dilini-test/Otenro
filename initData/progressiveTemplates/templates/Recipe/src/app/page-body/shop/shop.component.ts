import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { Router, ActivatedRoute } from '@angular/router';
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { ProductsService } from '../../services/products/products.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-shop',
  templateUrl: './app/page-body/shop/shop.component.html',
  styleUrls: ['./app/page-body/shop/shop.component.css'],
})

export class ShopComponent implements OnInit {
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private results: {};
  private catId: any;
  private catName: any;
  private catImage: any;
  private description:string=[];

  constructor( private productService: ProductsService, private dataService: PagebodyServiceModule, private router: ActivatedRoute, private route: Router,
               private title: TitleService) {

    this.router.params.subscribe(params => {
      let catName = params['name'];

      if(catName){
        this.title.changeTitle(catName);
      }else{
        this.title.changeTitle("Store");
      }
    });

  }

  private imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
    + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=thirdNavi';


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
        },
        error => {
          console.log('Error shop service');
        });
    } else {
      this.productService.getAllProducts().subscribe(data => {
          // Read the result field from the JSON response.
          this.results = data;
        },
        error => {
          console.log('Error shop service all');
        });
    }

  }

  htmlToPlaintext(html) {
    return html.replace(/<[^>]+>/gm, '')
  }

  navigateProd(val: String, item: any) {
    this.catName = item.title;
    this.dataService.data = item;
    this.route.navigate([val, this.catName]);
  }

}

