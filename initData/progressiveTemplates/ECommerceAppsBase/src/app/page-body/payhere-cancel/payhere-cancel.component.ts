import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../../assets/constantsService';
import * as data from '../../../assets/madeEasy.json';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TitleService } from '../../services/title.service';
declare var $: any;

@Component({
  selector: 'app-payhere-cancel',
  templateUrl: './payhere-cancel.component.html',
  styleUrls: ['./payhere-cancel.component.css']
})
export class PayhereCancelComponent implements OnInit {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;


  constructor(private http: HttpClient, private title: TitleService, private route: Router, private activateRouter: ActivatedRoute) {
       this.title.changeTitle("Canceled");
  }

  ngOnInit() {
    this.activateRouter.queryParams.subscribe(params => {
      
      let orderId = params['orderId'];
      this.http.get(SERVER_URL + '/mobile/payHereCancel/?orderId=' + orderId, { responseType: 'text' })
        .subscribe((res) => {
          // console.log(res);
        },
          (err) => {
            console.log(err);
          });
    });
  }

  backToHome() {
    this.route.navigate(['']);
  }

 
}
