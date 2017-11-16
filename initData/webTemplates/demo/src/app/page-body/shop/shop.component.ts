import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { Router, ActivatedRoute } from '@angular/router';
import { PagebodyServiceModule } from '../../page-body/page-body.service'

@Component({
  selector: 'app-shop',
  templateUrl: './app/page-body/shop/shop.component.html',
  styleUrls: ['./app/page-body/shop/shop.component.css'],
})

export class ShopComponent implements OnInit {
  public someRange: number[] = [3, 7];
  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  public currency;
  imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
  + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=thirdNavi';
  constructor(private dataService: PagebodyServiceModule, private router: ActivatedRoute, private route: Router, private http: HttpClient) {
  }
  results: {};
  catId: any;
  catName: any;
  ngOnInit() {

    this.router.params.subscribe(params => {
      this.catId = params['id']; // --> Name must match wanted parameter
      this.catName = params['name'];
      console.log("this.value : " + this.catId);
    });

    this.http.get(SERVER_URL + '/templates/getProductsByCatId?appId=' + this.appId + '&childId=' + this.catId).subscribe(data => {
      // Read the result field from the JSON response.

      this.results = data;
      console.log("this.results  : " + JSON.stringify(this.results));

    },
      error => {
        this.showErrorPage();
      });
    this.http.get(SERVER_URL + '/templates/getCurrency?appId=' + this.appId).subscribe(function (data) {
      this.currency = data;
    }, error => {
      this.showErrorPage();
    });

  }

  navigateProd(val: String, item: object) {
    this.dataService.data = item;
    this.route.navigate([val, this.catName]);
    // console.log("item  : " + JSON.stringify(item));

  }


  showErrorPage() {
    alert('Somthing went Wrong!');
  }

  onChange(value: any) {
    console.log('Value changed to', value);
  }

  slides = SLIDES;

}

const SLIDES = [
  { src: 'https://aos-articlesofstylel.netdna-ssl.com/wp-content/uploads/2014/01/Ebay.jpg', title: "Men's Wear" }]