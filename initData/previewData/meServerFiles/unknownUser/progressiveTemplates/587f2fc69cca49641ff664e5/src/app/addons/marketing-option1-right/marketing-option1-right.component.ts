import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-marketing-option1-right',
  templateUrl: './app/addons/marketing-option1-right/marketing-option1-right.component.html',
  styleUrls: ['./app/addons/marketing-option1-right/marketing-option1-right.component.css']
})
export class MarketingOption1RightComponent {

  constructor() { }

  @Input('lists') lists:marketingOption1RightModel;

}

export class marketingOption1RightModel{
	src:string;
	title1:string;
	title2:string;
	description:string;
}