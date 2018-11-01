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
import { CountryDataService } from '../../services/country-data/country-data.service'

@Component({
  selector: 'app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.css']
})
export class AppUserComponent implements OnInit {

  userEditForm: FormGroup;
  private emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;

  private selectedCountry;
  private country = [];
  countries = [];
  passwordEditable;
  private userData;
  isEmailDuplicate:boolean =false;
  private isInvalidPassword:boolean =false;
  isSuccessDetails:boolean =false;
  private isSuccessPassword:boolean =false;
  private provinceData = [];
  provinces = [];
  province;
  cityArr;
  newCity;
  private selectedProvinces;
  private shippingRules;

  constructor(fb: FormBuilder, private localStorageService: LocalStorageService, private http: HttpClient, private dataService: PagebodyServiceModule, private router: ActivatedRoute, private route: Router,
    private title: TitleService, private currencyService: CurrencyService,
    private countryDataService: CountryDataService) {
    this.title.changeTitle("My Account");
    this.countries.push("Sri Lanka");

    this.userData = this.localStorageService.get('appLocalStorageUser' + this.appId);
    console.log(this.userData)
    this.newCity = this.userData.city;
    this.selectedProvinces = this.userData.province;
    console.log(this.newCity)
    this.userEditForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'fName': new FormControl(this.userData.name, Validators.compose([Validators.required, Validators.pattern(/^[A-z]+$/)])),
      'lName': new FormControl(this.userData.lname, Validators.compose([Validators.required, Validators.pattern(/^[A-z]+$/)])),
      'email': new FormControl(this.userData.email, Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])),
      'emailRe': new FormControl('', Validators.compose([ Validators.pattern(this.emailPattern)])),
      'phone': new FormControl(this.userData.phone, Validators.compose([Validators.required, Validators.pattern(/^[+]\d{11,15}$/)])),
      'streetNo': new FormControl(this.userData.streetNumber, Validators.compose([Validators.required])),
      'streetName': new FormControl(this.userData.streetName, Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/)])),
      'province': new FormControl(this.userData.province),
      'city': new FormControl(this.userData.city),
      'zip': new FormControl(this.userData.zip, Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z0-9\-]+\s)*[a-zA-Z0-9\-]+$/)])),
      'password': new FormControl('',Validators.compose([Validators.required])),
      'passwordNew': new FormControl('',Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)])),
      'passwordConfirm': new FormControl('',Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)])),
      'country': new FormControl(this.userData.country)

    },{validator: this.checkIfMatchingPasswords('passwordNew', 'passwordConfirm')});
    this.userEditForm.controls['country'].setValue(this.userData.country, { onlySelf: true });
    this.userEditForm.controls['city'].setValue(this.newCity, {onlySelf: true});

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

    this.countryDataService.getProvinces().subscribe(data => {
      this.provinceData = data.provinces;
      this.provinceData.forEach(ele => {
        this.provinces.push(ele.name);
        if (ele.name == this.userData.province) {
          this.cityArr = ele.cities;
          console.log(this.cityArr);
        }
      });
    });
  }

  countryChanged(data) {
    this.selectedCountry = data;
  }

  togglePassword(event) {
      this.passwordEditable = true;
  }

  selectedProvince(data) {
    // console.log("selected province");
    // console.log(data);
    if (data === 'select a province') {
      this.selectedProvinces = null;
      this.newCity = null;
    } else {
      this.selectedProvinces = data;
      this.provinceData.forEach(ele => {
        if (ele.name == data) {
          this.cityArr = ele.cities;
        }
      });
      this.newCity = this.cityArr[0];
      this.userEditForm.controls['city'].setValue(this.newCity, {onlySelf: true});
    }
    // console.log(this.cityArr);
  }

  selectedCity(city) {
    console.log(city);
  }

  editUserDetails(user) {
    let userData = {
      'firstName': user.fName,
      'lastName': user.lName,
      'phone': user.phone,
      'email': user.email,
      'emailRe': user.emailRe,
      'streetNo': user.streetNo,
      'streetName': user.streetName,
      'province': user.province,
      'city': this.userEditForm.controls['city'].value,
      'country': user.country,
      'zip': user.zip,
      'appId': this.appId,
    }
    this.http.post(SERVER_URL + "/templates/updateUser", (userData), { responseType: 'json' })
      .subscribe((res) => {
        this.userData.name = res[0].firstName;
        this.userData.lname = res[0].lastName;
        this.userData.phone = res[0].phone;
        if(res[0].emailRe){
          this.userData.email = res[0].emailRe;
        }else{
          this.userData.email = res[0].email;
        }
        this.userData.streetNumber = res[0].streetNumber;
        this.userData.streetName = res[0].streetName;
        this.userData.province = res[0].province;
        this.userData.city = res[0].city;
        this.userData.country = res[0].country;
        this.userData.zip = res[0].zip;
        this.localStorageService.set('appLocalStorageUser' + this.appId,this.userData)
        this.isSuccessDetails = true;
        setTimeout(() => {
          this.isSuccessDetails = false;
        }, 5000)
      },(err) =>{
        if(err.status == 409){
          this.isEmailDuplicate = true;
          setTimeout(() => {
            this.isEmailDuplicate = false;
          }, 3000);
        }
      });

  }

  changePassword(user){

    let userData = {
      'appId': this.appId,
      'email': user.email,
      'password': user.password,
      'passwordNew': user.passwordNew
    }

    this.http.post(SERVER_URL + "/templates/updateUserPassword", (userData), { responseType: 'text' })
    .subscribe((res:any) => {
      this.isSuccessPassword = true;
      setTimeout(() => {
        this.isSuccessPassword = false;
      }, 5000)
    },(err) =>{
        this.isInvalidPassword = true;
        setTimeout(() => {
          this.isInvalidPassword = false;
        }, 3000);
    })
  }

}
