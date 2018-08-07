import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../../assets/constantsService';
import * as data from '../../../assets/madeEasy.json';
import { Router, ActivatedRoute } from '@angular/router';
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private params = [];
  loginclicked;
  loading:any;

  name; pass; gate: boolean; navigate;
  ifInvalidUserPassword:boolean;
  constructor(private localStorageService: LocalStorageService, private dataService: PagebodyServiceModule, private router: ActivatedRoute, private route: Router, private http: HttpClient,
              private title: TitleService) {
    this.title.changeTitle("Login");
     this.ifInvalidUserPassword = false;
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.navigate = params['type'];
    });
  }

  login = function (myForm) {

    this.loginclicked = true;
    this.name = myForm.userEmail
    this.password = myForm.password;

    var data = {
      email: this.name,
      password: this.password,
      appId: this.appId
    };

    let requestParams;
    let keepThis = this;
    this.ifInvalidUserPassword = false;
    this.http.post(SERVER_URL + "/templatesAuth/authenticateForApp", data)
      .subscribe((res) => {

        requestParams = {
          "token": res.token,
          "email": data.email,
          "name": res.user.name,
          "lname": res.user.lname,
          "phone": res.user.phone,
          "streetNumber": res.user.streetNumber,
          "streetName": res.user.streetName,
          "country": res.user.country,
          "city": res.user.city,
          "zip": res.user.zip,
          "type": 'internal',
          "appId": res.user.appId,
          "registeredUser": res.user.sub
        };
        this.localStorageService.set('appLocalStorageUser' + this.appId, (requestParams));
        if(this.localStorageService.get("cartUnknownUser")){
          this.localStorageService.set("cart"+requestParams.registeredUser,this.localStorageService.get("cartUnknownUser"));
          this.localStorageService.remove("cartUnknownUser");
        }
        this.dataService.appUserId = requestParams.registeredUser;
        this.dataService.isUserLoggedIn.check = true;
        this.dataService.parentobj.userLog = this.dataService.isUserLoggedIn.check;

        if (this.navigate == 'home') {
          this.route.navigate(['home']);
        } else if(this.navigate == 'cart'){
          this.route.navigate(['cart']);
        }else if(this.navigate == 'delivery'){
          this.route.navigate(['checkout','delivery']);
        }else{
          this.route.navigate(['checkout','pickup']);
        }
      },
      function (err) {
        keepThis.ifInvalidUserPassword =true;
        console.log(err);
      })

  }

  register() {
    this.loginclicked = false;
    this.route.navigate(['register', this.navigate]);
  }

}
