import { Component, OnInit } from '@angular/core';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../../assets/constantsService';
import * as data from '../../../assets/madeEasy.json';
import { LocalStorageService } from 'angular-2-local-storage';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';
import { TitleService } from '../../services/title.service';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // data = {};
  passwordRegularExpression = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{7,}";
  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  public country = [];
  navigate;
  signUpButton;

  private fname;
  private lname;
  private email;
  private password;
  private streetNumber;
  private streetName;
  private city;
  private zip;
  selectedCountry = null;
  private phone;
  private myForm: FormGroup;
  isEmailDuplicate;
  errorMessage: string;
  successMessage: string;
  private _success = new Subject<string>();
  fullUrl; domainUrl;

  constructor(private localStorageService: LocalStorageService, private http: HttpClient, private dataService: PagebodyServiceModule, private router: ActivatedRoute, private route: Router,
    private title: TitleService) {
    this.title.changeTitle("Register");

  }

  changeCountry(data) {
    this.selectedCountry = data;
  }

  ngOnInit() {
    this.country.push('select a country')
    this.router.params.subscribe(params => {
      this.navigate = params['type'];
    });

    this.http.get(SERVER_URL + "/edit/getAllCountry")
      .subscribe((res) => {
        var data = JSON.stringify(res);

        for (let key in res) {
          this.country.push(res[key].countryName);
        }


      });
      this.generateDomainUrl();
  }

  modelChanged(e) {
    this.isEmailDuplicate = false;
    if (e == this.email) {
      this.isEmailDuplicate = true;
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  signUp = function (myForm) {

    if (this.selectedCountry == null || this.selectedCountry == 'select a country') {

      this._success.subscribe((message) => this.errorMessage = message);
      debounceTime.call(this._success, 4000).subscribe(() => this.errorMessage = null);
      this._success.next("Please select a country!");
      setTimeout(() => { }, 3100);

    }else {

      this.fname = myForm.fname;
      this.lname = myForm.lname;
      this.email = myForm.email;
      this.password = myForm.password;
      let passwordCon = myForm.passwordCon;
      this.city = myForm.city;
      this.phone = myForm.phone;
      this.streetName = myForm.streetName;
      this.streetNumber = myForm.streetNumber;
      this.zip = myForm.zip;


      var data = {
        firstName: this.fname,
        lastName: this.lname,
        email: this.email,
        password: this.password,
        streetNumber: this.streetNumber,
        streetName: this.streetName,
        city: this.city,
        zip: this.zip,
        country: this.selectedCountry,
        phone: this.phone,
        appId: this.appId,
        url: this.domainUrl
      };

      const keepThis = this;
      this.http.post(SERVER_URL + "/templatesAuth/register", data)
        .subscribe((res) => {
          console.log(res);
          if (res.message === 'success') {

            this._success.subscribe((message) => this.successMessage = message);
            debounceTime.call(this._success, 4000)
              .subscribe(() => this.successMessage = null);
            this._success.next('Verify your email address to complete registration.');


            this.http.post(SERVER_URL + '/templatesAuth/authenticateForApp', data)
            .subscribe((res) => {
                if (res.message === 'email not verified') {
                  console.log(res);
                } else {
                  let requestParams = {
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
                }
              },
              (err) => {
                keepThis.ifInvalidUserPassword = true;
                console.log(err);
              });

            // setTimeout(() => {
            //   this.route.navigate(['home']);
            // }, 3100);
          }

        }, err => {

          if (err.status == 409) {
            this.isEmailDuplicate = true;
          }
        });
    }
  }

  //Show login page
  singIn() {
    this.route.navigate(['login', this.navigate]);
  }

  generateDomainUrl() {

    this.fullUrl = window.location.toString();
    let index = this.fullUrl.indexOf('#');
    this.domainUrl = this.fullUrl.substring(0, index + 2);
    this.localStorageService.set('domainUrl', this.domainUrl);
  }

}
