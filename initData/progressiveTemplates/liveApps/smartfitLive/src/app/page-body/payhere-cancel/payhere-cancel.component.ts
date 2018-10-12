import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
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


  constructor(private http: HttpClient, private title: TitleService, private route: Router,) {
       this.title.changeTitle("Canceled");
  }

  ngOnInit() {

  }

  backToHome() {
    this.route.navigate(['']);
  }


}
