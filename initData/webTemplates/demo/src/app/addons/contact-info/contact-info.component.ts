import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contact-info',
  templateUrl: './app/addons/contact-info/contact-info.component.html',
  styleUrls: ['./app/addons/contact-info/contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input('contact') contactInfo:contactInfoModel;


}

export class contactInfoModel{
	description:string;
	address:string;
	phone:string;
	email:string;
	facebook:string;
	twitter:string;
	pinterest:string;
	linkedin:string;
}