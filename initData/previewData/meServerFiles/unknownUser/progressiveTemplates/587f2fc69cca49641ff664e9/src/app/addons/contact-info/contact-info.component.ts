import { Component, Input } from '@angular/core';
import * as data from '../../madeEasy.json';
@Component({
	selector: 'app-contact-info',
	templateUrl: './app/addons/contact-info/contact-info.component.html',
	styleUrls: ['./app/addons/contact-info/contact-info.component.css']
})
export class ContactInfoComponent {

	private appId = (<any>data).appId;
	private userId = (<any>data).userId;
	 @Input('contacts') contacts:contactInfoModel;

	constructor() {	}
}
export class contactInfoModel {
	address: string;
  telPhone: string;
	email: string;
  webSite: string;
	facebook: string;
	twitter: string;
	pinterest: string;
	linkedin: string;
	instagram: string;
}
