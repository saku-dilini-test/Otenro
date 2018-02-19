import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { Router, ActivatedRoute } from '@angular/router';
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-login',
  templateUrl: './app/page-body/login/login.component.html',
  styleUrls: ['./app/page-body/login/login.component.css']
})
export class LoginComponent implements OnInit {

  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  public params = [];
  name; pass; gate: boolean; navigate;
  constructor(private localStorageService: LocalStorageService, private dataService: PagebodyServiceModule, private router: ActivatedRoute, private route: Router, private http: HttpClient,
              private title: TitleService) {
    this.title.changeTitle("Login");
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.navigate = params['type'];
    });
  }

  login = function (myForm) {

    this.name = myForm.userEmail
    this.password = myForm.password;

    var data = {
      email: this.name,
      password: this.password,
      appId: this.appId
    };

    let requestParams;
    this.http.post(SERVER_URL + "/templatesAuth/authenticateForApp", data)
      .subscribe((res) => {

        requestParams = {
          "token": res.token,
          "email": data.email,
          "name": res.user.name,
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
        this.dataService.isUserLoggedIn.check = true;
        this.dataService.parentobj.userLog = this.dataService.isUserLoggedIn.check;

        if (this.navigate == 'home') {
          this.route.navigate(['home']);
        } else {
          this.route.navigate(['cart']);
        }
      },
      function (err) {
        console.log(err);
      })

  }

  register() {
    this.route.navigate(['register', this.navigate]);
  }

}
