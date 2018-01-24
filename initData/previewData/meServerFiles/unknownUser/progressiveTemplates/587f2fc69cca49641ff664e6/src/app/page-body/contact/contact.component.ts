import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { HttpClient } from '@angular/common/http';
import { AppDataService } from '../../services/appdata-info/appdata-info.service';

@Component({
  selector: 'app-contact',
  templateUrl: './app/page-body/contact/contact.component.html',
  styleUrls: ['./app/page-body/contact/contact.component.css']
})
export class ContactComponent implements OnInit {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private googleMap;
  CONTACTINFO = [];
  lat; lng;
  contactInfo = [];
  finish: boolean;
  constructor(private http: HttpClient, private appdataService: AppDataService) {

    this.appdataService.getContactUs().subscribe(data => {

      console.log("contact data: " + JSON.stringify(data));

      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;

      console.log("this.lat: " + this.lat);
      console.log("this.lng: " + this.lng);

    }), ((err) => {
      alert('warning' + " Unable to get contact us info");
    });
  }

  ngOnInit() {

  }
}

