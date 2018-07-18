import { Component, OnInit } from '@angular/core';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { LocalStorageService } from 'angular-2-local-storage';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';
import { TitleService } from '../../services/title.service';

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

  constructor(private localStorageService: LocalStorageService, private http: HttpClient,private dataService : PagebodyServiceModule, private router: ActivatedRoute, private route: Router,
              private title: TitleService) {
    this.title.changeTitle("Register");

  }

  changeCountry(data){
      this.selectedCountry = data;
  }

  ngOnInit() {
    this.country.push('select a country')
    this.router.params.subscribe(params => {
      this.navigate = params['type'];
    });

      this.http.get(SERVER_URL+"/edit/getAllCountry")
      .subscribe((res) => {
        var data = JSON.stringify(res);

        for (let key in res) {
          this.country.push(res[key].countryName);
        }


      });


  }

  modelChanged(e){
    this.isEmailDuplicate = false;
    if(e == this.email){
      this.isEmailDuplicate = true;
    }
  }


  signUp=function(myForm) {

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
        email : this.email,
        password : this.password,
        streetNumber: this.streetNumber,
        streetName: this.streetName,
        city: this.city,
        zip: this.zip,
        country: this.selectedCountry,
        phone: this.phone,
        appId: this.appId
    };

    this.http.post(SERVER_URL+"/templatesAuth/register",data)
        .subscribe((res) =>{

                var requestParams = {
                    "token": res.token,
                    "email": data.email,
                    "name": data.firstName,
                    "lname": data.lastName,
                    "phone": data.phone,
                    "streetNumber": data.streetNumber,
                    "streetName": data.streetName,
                    "country": data.country,
                    "city": data.city,
                    "zip": data.zip,
                    "type": 'internal',
                    "appId":data.appId,
                    "registeredUser": res.user.sub
                };

                this.localStorageService.set('appLocalStorageUser'+this.appId,(requestParams));
                this.dataService.appUserId = requestParams.registeredUser;
                this.dataService.isUserLoggedIn.check = true;
                this.dataService.parentobj.userLog = this.dataService.isUserLoggedIn.check;

                if(this.navigate == 'home'){
                    this.route.navigate(['home']);
                }else if(this.navigate == 'cart'){
                  this.route.navigate(['cart']);
                }else if(this.navigate == 'delivery'){
                  this.route.navigate(['checkout','delivery']);
                }else{
                  this.route.navigate(['checkout','pickup']);
                }
            },err =>{

              if(err.status == 409){
                this.isEmailDuplicate = true;
              }
            });
  }

}
