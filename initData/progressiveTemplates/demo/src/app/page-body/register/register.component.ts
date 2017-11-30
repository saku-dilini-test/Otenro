import { Component, OnInit } from '@angular/core';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { LocalStorageService } from 'angular-2-local-storage';

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
  countries;
  selectedcountry;navigate;
  constructor(private localStorageService: LocalStorageService, private http: HttpClient,private dataService : PagebodyServiceModule, private router: ActivatedRoute, private route: Router) {

  }
  changeCountry(data){
console.log(data);
this.selectedcountry = data;
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.navigate = params['type'];
      console.log("this.value : " + this.navigate);
    });

      this.http.get(SERVER_URL+"/edit/getAllCountry")
      .subscribe((res) => {
          this.countries = res;
      });


  }

  signUp = function() {
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
        country: this.selectedcountry,
        phone: this.phone,
        appId: this.appId
    };
    console.log("data : " + JSON.stringify(data));
    this.localStorageService.set('appLocalStorageUser'+this.appId, (data))

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
                this.dataService.isUserLoggedIn.check = true;
                this.dataService.parentobj.userLog = this.dataService.isUserLoggedIn.check;
                console.log(this.localStorageService.get('appLocalStorageUser'+this.appId));

                if(this.navigate == 'home'){
                    this.route.navigate(['home']);
                }else{
                  this.route.navigate(['cart']);
                }
            },
            function(err){
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
