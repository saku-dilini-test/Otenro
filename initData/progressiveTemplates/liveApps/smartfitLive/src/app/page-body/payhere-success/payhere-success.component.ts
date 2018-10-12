import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TitleService } from '../../services/title.service';
declare var $: any;

@Component({
  selector: 'app-payhere-success',
  templateUrl: './payhere-success.component.html',
  styleUrls: ['./payhere-success.component.css']
})
export class PayhereSuccessComponent implements OnInit {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;


  constructor(private router: Router, private http: HttpClient, private title: TitleService,private route: ActivatedRoute) {
    this.title.changeTitle("Success");
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
       var orderId= params['orderId'];
       var appId= params['appId'];
     this.http.get(
        SERVER_URL + '/mobile/payHereSuccess/?orderId='+orderId+"&appId="+appId, {responseType: 'text'})
      .subscribe((res) => {
         // console.log(res);
       },
       (err) => {
          console.log(err);
       });

    });

  }



  backToHome() {
    this.router.navigate(['']);
  }

}
