import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
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