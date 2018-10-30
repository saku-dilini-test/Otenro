import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { Router, ActivatedRoute } from '@angular/router';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { TitleService } from '../../services/title.service';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { Subject } from 'rxjs/Subject';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _success = new Subject<string>();

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private params = [];
  loginclicked;
  successMessage; errorMessage;
  loading: any;

  private static EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  name; pass; domainUrl; gate: boolean; navigate;
  ifInvalidUserPassword: boolean;
  constructor(private localStorageService: LocalStorageService, private dataService: PagebodyServiceModule,
              private router: ActivatedRoute, private route: Router, private http: HttpClient, private title: TitleService) {
    this.title.changeTitle("Login");
    this.ifInvalidUserPassword = false;
  }

  ngOnInit() {
    this.domainUrl = this.localStorageService.get('domainUrl');
    this.router.params.subscribe(params => {
      this.navigate = params['type'];
    });
    // Get encrypted email from url query string
    this.router.queryParams
      .subscribe(params => {

        if (params['emailID']) {

          this.verifyEmailAddress(params['emailID']);
        }
      });
  }

  login = function(myForm) {

    this.loginclicked = true;
    this.name = myForm.userEmail

    let data = {
      email: this.name,
      password:  myForm.password,
      appId: this.appId
    };

    let requestParams;
    let keepThis = this;
    this.ifInvalidUserPassword = false;
    this.http.post(SERVER_URL + '/templatesAuth/authenticateForApp', data)
      .subscribe((res) => {
          console.log(res)
          requestParams = {
            'token': res.token,
            'email': data.email,
            'name': res.user.name,
            'lname': res.user.lname,
            'phone': res.user.phone,
            'streetNumber': res.user.streetNumber,
            'streetName': res.user.streetName,
            'country': res.user.country,
            'city': res.user.city,
            'zip': res.user.zip,
            'type': 'internal',
            'appId': res.user.appId,
            'registeredUser': res.user.sub
          };
          this.localStorageService.set('appLocalStorageUser' + this.appId, (requestParams));

          if (this.localStorageService.get('cartUnknownUser')) {
            this.localStorageService.set('cart' + requestParams.registeredUser, this.localStorageService.get('cartUnknownUser'));
            this.localStorageService.remove('cartUnknownUser');
          }
          this.dataService.appUserId = requestParams.registeredUser;
          this.dataService.isUserLoggedIn.check = true;
          this.dataService.parentobj.userLog = this.dataService.isUserLoggedIn.check;

          if (this.navigate == 'home') {
            this.route.navigate(['home']);
          } else if (this.navigate == 'cart') {
            this.route.navigate(['cart']);
          } else if (this.navigate == 'delivery') {
            this.route.navigate(['checkout', 'delivery']);
          } else {
            this.route.navigate(['checkout', 'pickup']);
          }
      },
      (err) => {
        keepThis.ifInvalidUserPassword = true;
        console.log(err);
      });

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

    if (this.isEmailValid(fpEmail)) {
      let data = { email: fpEmail, appId: this.appId, url: this.domainUrl };

      this.http.post(SERVER_URL + '/templatesAuth/forgotPassword', data)
        .subscribe((res: any) => {
          $('#email').val("");

          // if email sent success
          if (res.message == 'success') {

            this._success.subscribe((message) => this.successMessage = message);
            debounceTime.call(this._success, 4000).subscribe(() => this.successMessage = null);
            this._success.next('Please check your email to get password reset link');
            setTimeout(() => { }, 3100);
          } else {

            this._success.subscribe((message) => this.errorMessage = message);
            debounceTime.call(this._success, 4000).subscribe(() => this.errorMessage = null);
            this._success.next('Failed to send password reset link to your email');
            setTimeout(() => { }, 3100);
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
  isEmailValid(fpEmail) {

    if (fpEmail.match(LoginComponent.EMAIL_PATTERN)) {
      return true;
    } else {
      return false;
    }
  }

  verifyEmailAddress(email) {

    let data = { appId: this.appId, emailID: email };

    this.http.post(SERVER_URL + "/templatesAuth/verifyAppUserEmail", data)
      .subscribe((res: any) => {

        if (res.message === 'success') {

          let requestParams = {
            "token": res.token,
            "email": res.data.email,
            "name": res.data.firstName,
            "lname": res.data.lastName,
            "phone": res.data.phone,
            "streetNumber": res.data.streetNumber,
            "streetName": res.data.streetName,
            "country": res.data.country,
            "city": res.data.city,
            "zip": res.data.zip,
            "type": 'internal',
            "appId": res.data.appId,
            "registeredUser": res.user.sub
          };

          this.localStorageService.set('appLocalStorageUser' + this.appId, (requestParams));
          if (this.localStorageService.get("cartUnknownUser")) {
            this.localStorageService.set("cart" + requestParams.registeredUser, this.localStorageService.get("cartUnknownUser"));
            this.localStorageService.remove("cartUnknownUser");
          }
          this.dataService.appUserId = requestParams.registeredUser;
          this.dataService.isUserLoggedIn.check = true;
          this.dataService.parentobj.userLog = this.dataService.isUserLoggedIn.check;

          if (this.navigate == 'home') {
            this.route.navigate(['home']);
          } else if (this.navigate == 'cart') {
            this.route.navigate(['cart']);
          } else if (this.navigate == 'delivery') {
            this.route.navigate(['checkout', 'delivery']);
          } else {
            this.route.navigate(['checkout', 'pickup']);
          }
        } else {

          this._success.subscribe((message) => this.errorMessage = message);
          debounceTime.call(this._success, 4000).subscribe(() => this.errorMessage = null);
          this._success.next('Failed to verify your email address');
          setTimeout(() => { }, 3100);
        }
      });
  }

}
