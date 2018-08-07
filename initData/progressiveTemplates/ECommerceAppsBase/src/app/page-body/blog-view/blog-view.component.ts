import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products/products.service'
import * as data from '../../../assets/madeEasy.json';
import { SERVER_URL } from '../../../assets/constantsService';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {

  private id;
  blogViewData: any;
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;

  private imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
  + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=blogs";

  constructor(private route: Router, private activatedRoute:ActivatedRoute, private productsService:ProductsService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      // console.log(params['id']); // --> Name must match wanted parameter
      this.id = params['id'];
    });


    this.productsService.getBlogsById(this.id).subscribe( res => {
      console.log(res);
        this.blogViewData = res;
    });

  }

}
