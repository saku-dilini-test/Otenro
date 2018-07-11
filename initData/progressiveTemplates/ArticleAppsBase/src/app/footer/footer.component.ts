import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from '../services/appdata-info/appdata-info.service';
import { SubscribedDataService } from '../services/subscribed-data/subscribed-data.service'
import * as data from './../madeEasy.json';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { takeWhile } from 'rxjs/operators';
import 'rxjs/add/operator/takeWhile';
import { PagebodyServiceModule } from '../page-body/page-body.service'
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-footer',
  templateUrl: './app/footer/footer.component.html',
  styleUrls: ['./app/footer/footer.component.css']
})

export class FooterComponent implements OnInit{

  private subscriptionStatus;
  private appId = <any>(data).appId;
  private userId = <any>(data).userId;
  private alive = true;
  private isSubscribing = false;
  private isUnsubscribing = false;
  private isFromCMSAppView: boolean = false;

  constructor(private subscription:SubscribedDataService,
              private router: Router,
              private dataService:PagebodyServiceModule) {

  }

  ngOnInit(){
    this.isFromCMSAppView = localStorage.getItem(this.appId + "_isFromCMSAppView")=='1';

    $('#myAccountModelfooter').on('hide.bs.modal', ()=>{
      this.alive = false;
      console.log("model footer close " + this.alive);
      this.isUnsubscribing = false;
    });
  }

  ngDoCheck(){
    if(!this.isFromCMSAppView) {
      this.subscriptionStatus = this.dataService.subscriptionStatus;
    }
  }

  navigate(val: string) {
    this.router.navigate([val])
  }
  close(){
    this.isUnsubscribing = false;
  }
  onUnsubscribe(){
    this.alive = true;
    let data = {appId:this.appId,uuId:this.dataService.uuid}
    this.isUnsubscribing = true;

    IntervalObservable.create(5000)
      .takeWhile(() => this.alive) // only fires when component is alive
      .subscribe(() => {
        this.subscription.getSubscribedData(data).subscribe(data =>{
          console.log(data);
          this.subscriptionStatus = data.isSubscribed;
          this.dataService.subscriptionStatus = data.isSubscribed;
          if(this.subscriptionStatus == false){
            this.isUnsubscribing = false;
            localStorage.removeItem(this.appId+"msisdn")
             this.alive = false;
              //close the model
              $(function () {
                $('#myAccountModelfooter').modal('toggle');
             });
             //close the nav bar
             document.getElementById("mySidenav").style.width = "0";
          }
        });
      });
  }
}
