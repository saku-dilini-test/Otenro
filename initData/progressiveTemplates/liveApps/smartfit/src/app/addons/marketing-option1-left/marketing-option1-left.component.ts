import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-marketing-option1-left',
  templateUrl: './app/addons/marketing-option1-left/marketing-option1-left.component.html',
  styleUrls: ['./app/addons/marketing-option1-left/marketing-option1-left.component.css']
})
export class MarketingOption1LeftComponent {

  constructor() { }

  @Input('lists') lists:marketingOption1LeftModel;

}

export class marketingOption1LeftModel{
	src:string;
	title1:string;
	title2:string;
	description:string;
}