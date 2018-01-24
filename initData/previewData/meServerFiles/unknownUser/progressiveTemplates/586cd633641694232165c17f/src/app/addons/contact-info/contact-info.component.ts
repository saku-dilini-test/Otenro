import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';

@Component({
  selector: 'app-contact-info',
  templateUrl: './app/addons/contact-info/contact-info.component.html',
  styleUrls: ['./app/addons/contact-info/contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

	private appId = (<any>data).appId;
	private userId = (<any>data).userId;
	private address;
  private email;
  private webSite;
  private telPhone;
	private description;
	facebook = 'www.facebook.com';
	twitter = 'www.twitter.com';
	pinterest = 'www.pinterest.com';
	linkedin = "www.linkedin.com"
  // @Input('contact') contactInfo:contactInfoModel;

  constructor(private http: HttpClient) {
		this.http.get( SERVER_URL + '/templates/getContactUs?appId='+this.appId).subscribe((data)=> {

						// console.log("contact data: " + JSON.stringify(data));
						this.description = "bl abla bla"
						this.address = data.address;
						this.email = data.email;
						this.website = data.webSite;
						this.phone = data.telPhone;
						this.coords =data.coords;

						// this.lat = this.coords.latitude;
						// this.lng = this.coords.longitude;


				}),((err) =>{
						alert('warning'+ " Unable to get contact us info");
				});
	 }

  ngOnInit() {
  }



}

export class contactInfoModel{
	description:string;
	address:string;
	phone:string;
	email:string;
	website:string;
	facebook:string;
	twitter:string;
	pinterest:string;
	linkedin:string;
}
