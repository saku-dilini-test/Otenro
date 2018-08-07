import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service'
import * as data from '../../../assets/madeEasy.json';
import { SERVER_URL } from '../../../assets/constantsService';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  blogData;
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
  + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=blogs";
  constructor(private productsService:ProductsService, private router: Router) { }

  ngOnInit() {
    this.productsService.getBlogs().subscribe( res => {
        this.blogData = res;
        console.log(this.blogData)
    });
  }

  navigate(id){
    this.router.navigate(['blogView',id]);
  }

}
