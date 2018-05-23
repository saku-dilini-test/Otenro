import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { Router, ActivatedRoute } from '@angular/router';
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { TitleService } from '../../services/title.service';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-login',
  templateUrl: './app/page-body/login/login.component.html',
  styleUrls: ['./app/page-body/login/login.component.css']
})
export class LoginComponent implements OnInit {
  private _success = new Subject<string>();

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private params = [];
  private loginclicked;
  private successMessage;
  private errorMessage;

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
        this.dataService.appUserId = requestParams.registeredUser;
        this.dataService.isUserLoggedIn.check = true;
        this.dataService.parentobj.userLog = this.dataService.isUserLoggedIn.check;

        if (this.navigate == 'home') {
          this.route.navigate(['home']);
        } else {
          this.route.navigate(['cart']);
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

  /**
   * Send forgot password email
   * @param fpEmail - password reset link sending email
   **/
  forgotPassword(fpEmail) {
    if (this.isEmailOk(fpEmail)) {
      let url = 'http://localhost/meServer/temp/' + this.userId + '/progressiveTemplates/' + this.appId + '/src';
      let data = { email: fpEmail, url: url, appId: this.appId };
      this.http.post(SERVER_URL + '/templatesAuth/forgotPassword', data)
        .subscribe(res => {
          $('#email').val("");
          // if email sent success
          if (res.message == 'success') {
            this._success.subscribe((message) => this.successMessage = message);
            debounceTime.call(this._success, 4000).subscribe(() => this.successMessage = null);
            this._success.next('Please check your email to get password reset link');
            setTimeout(() => {}, 3100);
          } else {

            this._success.subscribe((message) => this.errorMessage = message);
            debounceTime.call(this._success, 4000).subscribe(() => this.errorMessage = null);
            this._success.next('Failed to send password reset link to your email');
            setTimeout(() => {}, 3100);
          }
        });
    } else {
      $('#email').val("");
    }
  }

  /**
   * Check email is valid
   * @param fpEmail - email that needs to validate
   **/
  isEmailOk(fpEmail) {
    let EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (fpEmail.match(EMAIL_PATTERN)) {
      return true;
    } else {
      return false;
    }
  }

}
