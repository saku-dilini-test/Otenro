import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { HttpClient } from '@angular/common/http';
import { AppDataService } from '../../services/appdata-info/appdata-info.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './app/page-body/aboutus/aboutus.component.html',
  styleUrls: ['./app/page-body/aboutus/aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private header;
  private content;
  private openHours: any;
  private openWeekdays = "we are closed";
  private openSunday = "we are closed";
  private openSaturday = "we are closed";

  constructor(private http: HttpClient, private appdataService: AppDataService,private title: TitleService) {
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
            this.openSunday = this.openHours.sundayOpenHour + '.' + this.openHours.sundayOpenMinute + " to " + this.openHours.sundayCloseHour + '.' + this.openHours.sundayCloseMinute;
          }
        } catch (e) {
          this.openSunday = "we are closed";
        }


        try {
          if (this.openHours.saturdayOpenHour) {
            this.openSaturday = this.openHours.saturdayOpenHour + '.' + this.openHours.saturdayOpenMinute + " to " + this.openHours.saturdayCloseHour + '.' + this.openHours.saturdayCloseMinute;
          }
        } catch (e) {
          this.openSaturday = "we are closed";
        }


        try {
          if (this.openHours.weekDaysOpenHour) {
            this.openWeekdays = this.openHours.weekDaysOpenHour + '.' + this.openHours.weekDaysOpenMinute + " to " + this.openHours.weekDaysCloseHour + '.' + this.openHours.weekDaysCloseMinute;
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


        this.aboutUsUrl = SERVER_URL + "/templates/viewWebImages?userId="
          + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=';

      }, (err) => {
        console.log(err);
      });
  }
}

