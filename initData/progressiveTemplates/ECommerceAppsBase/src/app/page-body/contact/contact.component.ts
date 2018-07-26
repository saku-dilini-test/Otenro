import { Component } from '@angular/core';
import * as data from '../../madeEasy.json';
import { HttpClient } from '@angular/common/http';
import { AppDataService } from '../../services/appdata-info/appdata-info.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-contact',
  templateUrl: './app/page-body/contact/contact.component.html',
  styleUrls: ['./app/page-body/contact/contact.component.css']
})
export class ContactComponent {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private googleMap;
  lat; lng;
  finish: boolean;
  CONTACNTINFO = [];
  constructor(private http: HttpClient, private appdataService: AppDataService, private title: TitleService) {

    this.appdataService.getContactUs().subscribe(data => {

      if(data.contactInfo){
        this.CONTACNTINFO.push(data.contactInfo);
      }

      this.googleMap = data.branches;
      if(data.branches){
        this.lat = data.branches[0].branch.latitude;
        this.lng = data.branches[0].branch.longitude;
      }


    }), ((err) => {
      alert('warning!' + " Unable to get contact us info\n Please check your connection.");
    });

    this.title.changeTitle("Contact Us");

  }

  contactInfo = this.CONTACNTINFO;
}
