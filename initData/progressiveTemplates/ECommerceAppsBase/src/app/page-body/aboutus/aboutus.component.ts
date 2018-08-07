import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../../assets/constantsService';
import * as data from '../../../assets/madeEasy.json';
import { HttpClient } from '@angular/common/http';
import { AppDataService } from '../../services/appdata-info/appdata-info.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private header;
  content;
  private openHours: any;
  openWeekdays = "we are closed";
  openSunday = "we are closed";
  openSaturday = "we are closed";
  aboutUsUrl = SERVER_URL + "/templates/viewWebImages?userId="
    + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=';

  constructor(private http: HttpClient, private appdataService: AppDataService, private title: TitleService) {
    this.title.changeTitle("About Us");
  }

  ngOnInit() {

    this.appdataService.getAboutUs()
      .subscribe((data: any) => {
        this.header = data.header;
        this.content = data.content;
        this.openHours = (data.OpenHours);
        // var objSize = Object.keys(this.openHours).length;

        try {
          if (this.openHours.sundayOpenHour) {
            this.openSunday = this.openHours.sundayOpenHour + '.' + this.openHours.sundayOpenMinute + " AM to " + this.openHours.sundayCloseHour + '.' + this.openHours.sundayCloseMinute + ' PM';
          }
        } catch (e) {
          this.openSunday = "we are closed";
        }


        try {
          if (this.openHours.saturdayOpenHour) {
            this.openSaturday = this.openHours.saturdayOpenHour + '.' + this.openHours.saturdayOpenMinute + " AM  to " + this.openHours.saturdayCloseHour + '.' + this.openHours.saturdayCloseMinute + ' PM';
          }
        } catch (e) {
          this.openSaturday = "we are closed";
        }


        try {
          if (this.openHours.weekDaysOpenHour) {
            this.openWeekdays = this.openHours.weekDaysOpenHour + '.' + this.openHours.weekDaysOpenMinute + " AM  to " + this.openHours.weekDaysCloseHour + '.' + this.openHours.weekDaysCloseMinute + ' PM';
          }
        } catch (e) {
          this.openWeekdays = "we are closed";
        }

        // if ((this.openHours.sundayOpenHour) == false || this.openHours.sundayOpenHour == null || this.openHours.sundayOpenHour == ) {
        //   console.log('s');
        // }

        // if (this.openHours.weekDaysOpenHour === undefined) {
        //   this.openWeekdays = "we are closed"
        // }else{
        //   this.openWeekdays = this.openHours.weekDaysOpenHour + " to " + this.openHours.weekDaysCloseHour;
        // }

        // if (this.openHours.saturdayOpenHour != undefined) {
        //   this.openSaturday = this.openHours.saturdayOpenHour + " to " + this.openHours.saturdayCloseHour;
        // }else{
        //   this.openSaturday = "we are closed"
        // }

        // if (this.openHours.sundayOpenHour != undefined) {
        //   this.openSunday = this.openHours.sundayOpenHour + " to " + this.openHours.sundayCloseHour;
        // }else{
        //   this.openSunday = "we are closed"
        // }



      }, (err) => {
        console.log(err);
      });
  }
}

