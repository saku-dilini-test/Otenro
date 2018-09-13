import { Component, Input } from '@angular/core';
import * as data from '../../../assets/madeEasy.json';
@Component({
	selector: 'app-contact-info',
	templateUrl: './contact-info.component.html',
	styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  @Input('contacts') contacts: any;

  constructor() {
  }
}