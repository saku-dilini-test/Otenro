import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-aboutus',
  templateUrl: './app/page-body/aboutus/aboutus.component.html',
  styleUrls: ['./app/page-body/aboutus/aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private header;
  private content;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.http.get(SERVER_URL + "/templates/getAboutUs?appId="+this.appId)
    .subscribe( (data)=> {
      console.log("data : " + JSON.stringify(data));
        this.header = data.header;
        this.content = data.content;
    }, (err)=> {
        alert(
           'About us Data loading error!,Please check your connection!'
        );
    });
  }


  slides = SLIDES;
  lists = LISTS;
}
const LISTS = [
  { src:'https://ae01.alicdn.com/kf/HTB1RuZKPVXXXXaMapXXq6xXFXXXO/Artka-Women-s-2017-Spring-New-Vintage-Appliques-Dress-Fashion-Square-Collar-Butterfly-Sleeve-Empire-Waist.jpg', title1:'First featurette heading. ', title2:'It ll blow your mind.',
   description:'Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.' }
   ];

const SLIDES = [
  { src:'https://wallpaperscraft.com/image/the_black_keys_sofa_shoes_clothes_relax_5290_1920x1080.jpg', title:'About Us' }]
