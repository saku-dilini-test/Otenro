import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './app/addons/carousel/carousel.component.html',
  styleUrls: ['./app/addons/carousel/carousel.component.css'],
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

 

  @Input('slides') slides:slideModel;

}

export class slideModel{
	src:string;
	title:string;
}