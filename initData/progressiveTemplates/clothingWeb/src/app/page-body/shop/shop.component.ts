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
  results: {};
  catId: any;
  catName: any;
  catImage: any;
  slides:any;

  constructor(private dataService: PagebodyServiceModule, private router: ActivatedRoute, private route: Router, private http: HttpClient) {

  }

  imageUrl = SERVER_URL + "/templates/viewImages?userId="
    + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&img=thirdNavi';

  imageUrl2 = SERVER_URL + "/templates/viewImages?userId="
  +this.userId+"&appId="+this.appId+"&"+new Date().getTime()+"&img=secondNavi";



  ngOnInit() {
    this.router.params.subscribe(params => {
      this.catId = params['id']; // --> Name must match wanted parameter
      this.catName = params['name'];
      this.catImage = params['image'];
      console.log("this.value : " + this.catId);
    });

    this.slides = [
      { src: this.imageUrl2+"/"+ this.catImage, title: this.catName }]

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
      console.log(this.currency)
    }, error => {
      this.showErrorPage();
    });

  }

  navigateProd(val: String, item: object) {
    this.dataService.data = item;
    this.route.navigate([val, this.catName]);
    console.log("item  : " + JSON.stringify(this.dataService.data));

  }


  showErrorPage() {
    alert('Somthing went Wrong!');
  }

  onChange(value: any) {
    console.log('Value changed to', value);
  }

}

