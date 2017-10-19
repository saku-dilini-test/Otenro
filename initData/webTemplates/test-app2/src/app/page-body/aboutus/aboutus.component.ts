import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './app/page-body/aboutus/aboutus.component.html',
  styleUrls: ['./app/page-body/aboutus/aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
