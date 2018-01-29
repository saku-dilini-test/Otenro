import { Component, OnInit } from '@angular/core';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './app/page-body/register/register.component.html',
  styleUrls: ['./app/page-body/register/register.component.css']
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
  private selectedCountry = null;
  private phone;
  private myForm: FormGroup;

  constructor(private http: HttpClient,private dataService : PagebodyServiceModule, private router: ActivatedRoute, private route: Router) {

  }
  changeCountry(data){
console.log(data);
this.selectedCountry = data;
  }

  ngOnInit() {
    this.country.push('select a country')
    this.router.params.subscribe(params => {
      this.navigate = params['type'];
      console.log("this.value : " + this.navigate);
    });

      this.http.get(SERVER_URL+"/edit/getAllCountry")
      .subscribe((res) => {
        var data = JSON.stringify(res);
        console.log("res : " + data);

        for (let key in res) {
          this.country.push(res[key].countryName);
          console.log(res);
        }

          console.log("this.country : " + (this.country));

      });


  }



  signUp=function(myForm) {

    this.fname = myForm.fname;
    this.lname = myForm.lname;
    this.email = myForm.email;
    this.password = myForm.password;
    this.city = myForm.city;
    this.phone = myForm.phone;
    this.streetName = myForm.streetName;
    this.streetNumber = myForm.streetNumber;
    this.zip = myForm.zip;

    // console.log("city : " +myForm.city)
    // console.log(myForm)
    // console.log(this.fname + this.lname+ " : " + this.city)
    // this.localStorageService  = this.localStorageService.get('appLocalStorageUser'+this.appId);

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
    console.log("data : " + JSON.stringify(data));
    localStorage.setItem('appLocalStorageUser'+this.appId, JSON.stringify(data))

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

                localStorage.setItem('appLocalStorageUser'+this.appId,JSON.stringify(requestParams));
                this.dataService.isUserLoggedIn.check = true;
                this.dataService.parentobj.userLog = this.dataService.isUserLoggedIn.check;
                console.log(JSON.parse(localStorage.getItem('appLocalStorageUser'+this.appId)));

                if(this.navigate == 'home'){
                    this.route.navigate(['home']);
                }else{
                  this.route.navigate(['cart']);
                }
            },(err)=>{
                alert("signup error");
            });
}

  slides = SLIDES;


// authenticate = function(provider) {
//   $auth.authenticate(provider).then(function(res){
//       if(typeof res.data.token != 'undefined'){
//           if($stateParams.item == 'delivery'){
//               $state.go('app.cart');
//           }else{
//               $state.go('app.category');
//           }
//       }else{
//           alert(provider+' Login error');
//       }
//   },function(err){
//       alert(provider+' Login error');
//   });
// };

}

const SLIDES = [
  {
    src: 'http://1.bp.blogspot.com/-w3nRkRuOiC4/TvzWH0yKgeI/AAAAAAAAAj0/bLA2ip6MFCA/s1600/CliffJumpWallpaper.jpg', title: 'Register'
  }]
