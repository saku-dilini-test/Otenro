import { Component, OnInit } from '@angular/core';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { LocalStorageService } from 'angular-2-local-storage';
import { FormGroup, Validators, FormControl, FormArray, NgForm, FormBuilder } from '@angular/forms';
import { TitleService } from '../../services/title.service';
import { CurrencyService } from '../../services/currency/currency.service';

@Component({
  selector: 'app-app-user',
  templateUrl: './app/page-body/app-user/app-user.component.html',
  styleUrls: ['./app/page-body/app-user/app-user.component.css']
})
export class AppUserComponent implements OnInit {

  userEditForm: FormGroup;
  private emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;

  private selectedCountry;
  private country = [];
  private countries;
  private passwordEditable;
  private emailEditable;
  private nameEditable;
  private addressEditable;
  private phoneEditable;
  private userData;
  private emailChange;
  constructor(fb: FormBuilder, private localStorageService: LocalStorageService, private http: HttpClient, private dataService: PagebodyServiceModule, private router: ActivatedRoute, private route: Router,
    private title: TitleService, private currencyService: CurrencyService, ) {
    this.title.changeTitle("Edit User");

    this.userData = this.localStorageService.get('appLocalStorageUser' + this.appId);

    this.userEditForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'fName': new FormControl(this.userData.name, Validators.compose([Validators.required, Validators.pattern(/^[A-z]+$/)])),
      'lName': new FormControl(this.userData.lname, Validators.compose([Validators.required, Validators.pattern(/^[A-z]+$/)])),
      'email': new FormControl(this.userData.email, Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])),
      'emailRe': new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])),
      'phone': new FormControl(this.userData.phone, Validators.compose([Validators.required, Validators.pattern(/^[().+\d -]{10,15}$/)])),
      'streetNo': new FormControl(this.userData.streetNumber, Validators.compose([Validators.required])),
      'streetName': new FormControl(this.userData.streetName, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
      'city': new FormControl(this.userData.city, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
      'zip': new FormControl(this.userData.zip, Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])),
      'password': new FormControl('',Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)])),
      'passwordNew': new FormControl('',Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)])),
      'passwordConfirm': new FormControl('',Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)])),
      'country': new FormControl(null)

    },{validator: this.checkIfMatchingPasswords('passwordNew', 'passwordConfirm')});
    this.userEditForm.controls['country'].setValue(this.userData.country, { onlySelf: true });

  }


checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
  return (group: FormGroup) => {
    let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
    if (passwordInput.value !== passwordConfirmationInput.value) {
      return passwordConfirmationInput.setErrors({notEquivalent: true})
    }
    else {
        return passwordConfirmationInput.setErrors(null);
    }
  }
}

  ngOnInit() {

    this.currencyService.getCountryData()
      .subscribe((res) => {
        this.countries = res;
      });
  }

  countryChanged(data) {
    this.selectedCountry = data;
  }

  toggleEmail(event) {
    if (event.target.checked) {
      this.emailEditable = true;
      this.passwordEditable = false;
      this.nameEditable = false;
      this.addressEditable = false;
      this.phoneEditable = false;
    } else {
      this.emailEditable = false;
    }
  }
  togglePassword(event) {
    if (event.target.checked) {
      this.passwordEditable = true;
      this.nameEditable = false;
      this.emailEditable = false;
      this.addressEditable = false;
      this.phoneEditable = false;
    } else {
      this.passwordEditable = false;
    }
  }
  toggleName(event) {
    if (event.target.checked) {
      this.nameEditable = true;
      this.emailEditable = false;
      this.passwordEditable = false;
      this.addressEditable = false;
      this.phoneEditable = false;
    } else {
      this.nameEditable = false;
    }
  }
  toggleAddress(event) {
    if (event.target.checked) {
      this.addressEditable = true;
      this.nameEditable = false;
      this.passwordEditable = false;
      this.emailEditable = false;
      this.phoneEditable = false;
    } else {
      this.addressEditable = false;
    }
  }
  togglePhone(event) {
    if (event.target.checked) {
      this.phoneEditable = true;
      this.nameEditable = false;
      this.passwordEditable = false;
      this.emailEditable = false;
      this.addressEditable = false;
    } else {
      this.phoneEditable = false;
    }
  }

  editUserName(user) {
    console.log(user);
    let userData = {
      'email': user.email,
      'firstName': user.fName,
      'lastName': user.lName,
    }
    this.http.post(SERVER_URL + "/templates/updateUser", (userData), { responseType: 'json' })
      .subscribe((res) => {
        console.log(res)
        this.phoneEditable = false;
        this.nameEditable = false;
        this.emailEditable = false;
        this.passwordEditable = false;
        this.addressEditable = false;

        this.userData.name = res[0].firstName;
        this.userData.lname = res[0].lastName;
        this.localStorageService.set('appLocalStorageUser' + this.appId,this.userData)
     
      });
  }
  editUserAddress(user) {
    console.log(user);
    let userData = {
      'email': user.email,
      'streetNo': user.streetNo,
      'streetName': user.streetName,
      'city': user.city,
      'country': user.country,
      'zip': user.zip
    }
    this.http.post(SERVER_URL + "/templates/updateUser", (userData), { responseType: 'json' })
      .subscribe((res) => {
        console.log(res)
        this.phoneEditable = false;
        this.nameEditable = false;
        this.emailEditable = false;
        this.passwordEditable = false;
        this.addressEditable = false;

        this.userData.streetNumber = res[0].streetNumber;
        this.userData.streetName = res[0].streetName;
        this.userData.city = res[0].city;
        this.userData.country = res[0].country;
        this.userData.zip = res[0].zip;
        this.localStorageService.set('appLocalStorageUser' + this.appId,this.userData)
     
      });
  }
  editUserPhone(user) {
    console.log(user);
    let userData = {
      'email': user.email,
      'phone': user.phone
    }
    this.http.post(SERVER_URL + "/templates/updateUser", (userData), { responseType: 'json' })
      .subscribe((res:any) => {

        this.phoneEditable = false;
        this.nameEditable = false;
        this.emailEditable = false;
        this.passwordEditable = false;
        this.addressEditable = false;

        this.userData.phone = res[0].phone;
        this.localStorageService.set('appLocalStorageUser' + this.appId,this.userData)
      });
  }

  changeEmail(user){
    console.log(user);

    let userData = {
      'appId': this.appId,
      'email': user.email,
      'emailRe': user.emailRe
    }

    this.http.post(SERVER_URL + "/templates/updateUserEmail", (userData), { responseType: 'json' })
    .subscribe((res:any) => {

      this.phoneEditable = false;
      this.nameEditable = false;
      this.emailEditable = false;
      this.passwordEditable = false;
      this.addressEditable = false;

      this.userData.email = res[0].email;
      this.localStorageService.set('appLocalStorageUser' + this.appId,this.userData)
    });
  }

  changePassword(user){
    console.log(user);

    let userData = {
      'appId': this.appId,
      'email': user.email,
      'password': user.password,
      'passwordNew': user.passwordNew
    }

    this.http.post(SERVER_URL + "/templates/updateUserPassword", (userData), { responseType: 'text' })
    .subscribe((res:any) => {
      
    });
  }

}
