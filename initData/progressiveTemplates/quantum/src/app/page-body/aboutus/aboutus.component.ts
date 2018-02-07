import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { HttpClient } from '@angular/common/http';
import { AppDataService } from '../../services/appdata-info/appdata-info.service';

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

  constructor(private http: HttpClient, private appdataService: AppDataService) { }

  ngOnInit() {

    this.appdataService.getAboutUs()
      .subscribe((data: any) => {
        console.log("data : " + JSON.stringify(data));
        this.header = data.header;
        this.content = data.content;
        this.openHours = (data.OpenHours);
        // var objSize = Object.keys(this.openHours).length;

        try {
          if (this.openHours.sundayOpenHour) {
            this.openSunday = this.openHours.sundayOpenHour + " to " + this.openHours.sundayCloseHour;
          }
        } catch (e) {
          this.openSunday = "we are closed";
        }


        try {
          if (this.openHours.saturdayOpenHour) {
            this.openSaturday = this.openHours.saturdayOpenHour + " to " + this.openHours.saturdayCloseHour;
          }
        } catch (e) {
          this.openSaturday = "we are closed";
        }


        try {
          if (this.openHours.weekDaysOpenHour) {
            this.openWeekdays = this.openHours.weekDaysOpenHour + " to " + this.openHours.weekDaysCloseHour;
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


  slides = SLIDES;
  lists = LISTS;
}
const LISTS = [
  {
    src: 'https://ae01.alicdn.com/kf/HTB1RuZKPVXXXXaMapXXq6xXFXXXO/Artka-Women-s-2017-Spring-New-Vintage-Appliques-Dress-Fashion-Square-Collar-Butterfly-Sleeve-Empire-Waist.jpg', title1: 'First featurette heading. ', title2: 'It ll blow your mind.',
    description: 'Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.'
  }
];

const SLIDES = [
  { src: 'https://wallpaperscraft.com/image/the_black_keys_sofa_shoes_clothes_relax_5290_1920x1080.jpg', title: 'About Us' }]
