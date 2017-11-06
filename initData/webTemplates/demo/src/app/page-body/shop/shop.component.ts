import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop', 
  templateUrl: './app/page-body/shop/shop.component.html',
  styleUrls: ['./app/page-body/shop/shop.component.css'],
})

export class ShopComponent implements OnInit {
    public someRange: number[] = [3, 7];
    
    public appId = (<any>data).appId;
    public userId = (<any>data).userId;

    imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
    +this.userId+"&appId="+this.appId+"&"+new Date().getTime()+'&img=thirdNavi';
  constructor(private router: ActivatedRoute,private http: HttpClient) { 
  }
  results:{};
  value: any;
	  ngOnInit() {

      this.router.params.subscribe(params => {
        this.value = params['id']; // --> Name must match wanted parameter
        console.log("this.value : " + this.value);
      });
     
      this.http.get(SERVER_URL + '/templates/getProductsByCatId?appId='+this.appId+'&childId='+this.value).subscribe(data => {
        // Read the result field from the JSON response.
        
        this.results = data;
        console.log("this.results  : " + JSON.stringify(this.results));
             
      },
      error => {
        this.showErrorPage();
     });
	}
  showErrorPage(){
    alert('Somthing went Wrong!');
  }

  onChange(value: any) {
    console.log('Value changed to', value);
  }

  slides = SLIDES;

}

const SLIDES = [
  { src:'https://aos-articlesofstylel.netdna-ssl.com/wp-content/uploads/2014/01/Ebay.jpg', title:"Men's Wear"}]