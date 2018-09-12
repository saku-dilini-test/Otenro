import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { CurrencyService } from '../../services/currency/currency.service';
import { ShippingService } from '../../services/shipping/shipping.service';
import { OrdersService } from '../../services/orders/orders.service';
import { TitleService } from '../../services/title.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CountryDataService } from '../../services/country-data/country-data.service'

declare let paypal: any;
declare var $: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage: string;
  errorMessage: string;
  nullMessage: string;
  private showSpinner;
  private hideConfirm = false;
  responce;
  complexForm: FormGroup;
  pickupForm: FormGroup;
  shippingForm: FormGroup;

  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  public cartItems;
  hide: boolean;
  tax;
  amount; currency; sign;
  public fname;
  public lname;
  public email;
  public phone;
  public country;
  public city;
  public streetName;
  public streetNumber;
  public zip;
  public taxTotal;
  public user;
  public shippingData = [];
  public shippingDatas;

  public details = {};
  public finalDetails;
  public localData;
  public totalPrice;
  public cart;
  public chkShippingCost;
  countries = [];
  public chkCountry;
  isApplyShippingCharge;
  chkHide; chkTax;
  public hideShipping = true;
  public shippingCost;
  public isSelected = false;
  public isAdded = false;
  public formType;
  public pkPhone;
  public name;
  public pickup;
  public pickupData;
  underWeight = false;
  overWeight = false;
  public paymentData;
  public deliveryShow;
  public pickupShow;
  public paypalShow;
  public stripeShow;
  public braintreeShow;
  public authorizeNet;
  public payInfo;
  public cardType;
  public card;
  orderHistory = [];
  history;
  private chkPickupCost;
  public makeStripePayment;
  public authorizeCreditCard;
  private payhere;
  public orderDetails;
  public orderd = false;
  private years = [];
  private months = [];
  private emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  noteDes; showUser;
  oldUser;
  private loggedUserData;
  private payHereMID;
  private isCountryChanged = false;
  private selectedCountry;
  private newUser;
  private provinceData = [];
  private provinces = [];
  private province;
  private cityArr;
  private newCity;
  private selectedProvinces;
  private shippingRules;
  ePay = false;
  ePayFail = false;
  ePayNull = false;
  
  constructor(fb: FormBuilder, private ordersService: OrdersService,
    private shippingService: ShippingService,
    private currencyService: CurrencyService,
    private localStorageService: LocalStorageService,
    private http: HttpClient, private route: ActivatedRoute,
    private router: Router, private dataService: PagebodyServiceModule, private title: TitleService,
    private spinner: Ng4LoadingSpinnerService,
    private countryDataService:CountryDataService) {

    this.title.changeTitle("Checkout");

    let d = new Date();
    let n = d.getMonth();
    let s;

    for(let i = n+1;i <= 12; i++){
      if(i< 10){
        s = '0' + i.toString();
      }else{
        s = i.toString();
      }
    this.months.push(s);
    }

    if (this.localStorageService.get('appLocalStorageUser' + this.appId) !== null) {
      this.oldUser = true;
      this.showUser = true;
      this.loggedUserData = this.localStorageService.get('appLocalStorageUser' + this.appId);
      this.dataService.userData = this.localStorageService.get('appLocalStorageUser' + this.appId);

    } else {
      this.oldUser = false;
    }

    if (this.dataService.userData == null) {
      var userData = {
        name: "",
        lname: "",
        email: "",
        phone: "",
        country: "Sri Lanka",
        province:"",
        city: "",
        streetName: "",
        streetNumber: "",
        zip: ""
      };

      this.dataService.userData = userData;

    }
    this.selectedCountry = this.dataService.userData.country;

    this.shippingForm = fb.group({
      shippingOption: new FormControl('', )
    });

    this.complexForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'fName': new FormControl(this.dataService.userData.name, Validators.compose([Validators.required, Validators.pattern(/^[A-z]+$/)])),
      'lName': new FormControl(this.dataService.userData.lname, Validators.compose([Validators.required, Validators.pattern(/^[A-z]+$/)])),
      'email': new FormControl(this.dataService.userData.email, Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])),
      'phone': new FormControl(this.dataService.userData.phone, Validators.compose([Validators.required, Validators.pattern(/^[+]\d{11,15}$/)])),
      'streetNo': new FormControl(this.dataService.userData.streetNumber, Validators.compose([Validators.required])),
      'streetName': new FormControl(this.dataService.userData.streetName, Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/)])),
      'province': new FormControl(this.dataService.userData.province),
      'city': new FormControl(this.dataService.userData.city),
      'zip': new FormControl(this.dataService.userData.zip, Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z0-9\-]+\s)*[a-zA-Z0-9\-]+$/)])),
      'country': new FormControl(this.dataService.userData.country)

    });
    this.complexForm.controls['country'].setValue(this.dataService.userData.country, { onlySelf: true });

    // this.pickupForm = fb.group({
    //   'name': new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[A-z ]+$/)])),
    //   'email': new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])),
    //   'phone': new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[+]\d{11,15}$/), Validators.minLength(12)])),

    // });
  }

  ngOnInit() {

    this.localData = (this.localStorageService.get('appLocalStorageUser' + this.appId));

    this.shippingService.getSmartfitShippingRules().subscribe(data=>{
      this.shippingRules = (data);
      if(this.localData){
        this.getTotal(this.localData.city);
      }
    });

    this.countries.push("Sri Lanka");

    console.log(this.province);
    this.countryDataService.getProvinces().subscribe(data => {
      this.provinceData = data.provinces;
      this.provinceData.forEach(ele => {
        this.provinces.push(ele.name);
        if (ele.name == this.complexForm.controls['province'].value) {
          this.cityArr = ele.cities;
          console.log(this.cityArr);
        }
      });
    });

    let date = (new Date()).getFullYear()
    for (let i = 0; i < 100; i++) {
      this.years.push(date++);
    }

    this._success.next('hello');
    this.cartItems = this.dataService.cart.cartItems;

    this.route.params.subscribe(params => {
      this.formType = params['type']; // --> Name must match wanted parameter
    });


    if (this.cartItems.length > 0 && this.formType == 'delivery') {

      this.isAdded = true;

    }


    this.currencyService.getCurrencies().subscribe((data) => {
      this.currency = data;
      this.sign = this.currency.sign;
      this.dataService.currency = this.sign;
      this.dataService.paypalCurrency = this.currency.symbol.toUpperCase();
    }, error => {
      this.spinner.hide();
      alert('Error Retrieving currencies!\n Please check your connection.');
    });

    //-------- hiding spinner after currencies and countries loaded --------
    if (this.sign) {
      this.spinner.hide();
    }


  }

  selectedProvince(data) {
    console.log("selected province");
    console.log(data);
    this.selectedProvinces = data;
    this.provinceData.forEach(ele => {
      if (ele.name == data) {
        this.cityArr = ele.cities;
      }
    });
    this.newCity = this.cityArr[0];
    this.complexForm.controls['city'].setValue(this.cityArr[0], { onlySelf: true });
    console.log(this.cityArr);
    this.getTotal(this.cityArr[0]);
  }

  selectedCity(city) {
    this.getTotal(city);
  }

  check(user, newUserCountry) {
    if (user == 'oldUser') {
      this.oldUser = true;
      this.newUser = false;
      this.isSelected = false;

      this.fname = this.complexForm.controls['fName'].value;
      this.lname = this.complexForm.controls['lName'].value;
      this.email = this.complexForm.controls['email'].value;
      this.phone = this.complexForm.controls['phone'].value;
      this.country = this.complexForm.controls['country'].value;
      this.province = this.complexForm.controls['province'].value;
      this.city = this.complexForm.controls['city'].value;
      this.streetName = this.complexForm.controls['streetName'].value;
      this.streetNumber = this.complexForm.controls['streetNo'].value;
      this.zip = this.complexForm.controls['zip'].value;
      this.getTotal(this.city);
    }
    if (user == 'newUser') {
      this.oldUser = false;
      this.fname = this.complexForm.controls['fName'].value;
      this.lname = this.complexForm.controls['lName'].value;
      this.email = this.complexForm.controls['email'].value;
      this.phone = this.complexForm.controls['phone'].value;
      this.country = this.complexForm.controls['country'].value;
      this.province = this.complexForm.controls['province'].value;
      this.city = this.complexForm.controls['city'].value;
      this.streetName = this.complexForm.controls['streetName'].value;
      this.streetNumber = this.complexForm.controls['streetNo'].value;
      this.zip = this.complexForm.controls['zip'].value;

    }
    this.isSelected = false;
  }

  countryChanged(data) {
    this.hide = true;
    this.isSelected = false;
    this.isCountryChanged = true;
  }

  login() {
    this.router.navigate(['login', this.formType]);
  }

  checkNote(note) {
    if (!note) {
      this.noteDes = "";
    }
  }

  ngAfterContentChecked() {
    if (this.formType == "pickup" && !this.pickupForm.valid) {
      this.isSelected = false;
    }

  }

  itemPriceCal(price, qty) {
    let tot = price * qty
    return (Math.round(tot * 100) / 100);
  }


  getTotal(city) {

    let main = false;
    let accessories = false;

    var total = 0;
    var amount = 0;

    for (var i = 0; i < this.cartItems.length; i++) {
      var product = this.cartItems[i];
      amount = product.total;
      total += (amount * product.qty);

    }

    for (var i = 0; i < this.cartItems.length; i++) {
      if(!this.cartItems[i].type || this.cartItems[i].type == "Main"){
        main = true;
      }else{
        accessories = true;
      }
    }

    if(main && accessories){
      this.getNewRules("main",city,total);
    }else if(!main && accessories){
      this.getNewRules("accessories",city,total);
    }else{
      this.getNewRules("main",city,total);
    }

  };

  getNewRules(type,cty,total){

    if(type == "main"){
      this.shippingRules.main.forEach(ele =>{
        ele.cities.forEach(city=>{
          if(city == cty){
            this.chkShippingCost = ele.price;
          }
        })
      });
    }else if(type == "accessories"){
      this.shippingRules.accessories.forEach(ele =>{
        ele.cities.forEach(city=>{
          if(city == cty){
            this.chkShippingCost = ele.price;
          }
        })
      });
    }

    this.totalPrice = total + this.chkShippingCost;
    if(this.totalPrice){
      this.spinner.hide();
      this.pay("001");
    }

    console.log(this.chkShippingCost);
  }

  //------------------------------checkout---------------------------------------


  pay(promotionCode) {

    let email;
    if (this.localData) {
      email = this.localData.email
    } else {
      email = this.email
    }

    this.payInfo = {
      'item': this.finalDetails,
      'taxTotal': this.taxTotal,
      'cart': this.dataService.cart.cartItems,
      'userEmail': email,
      'amount': this.totalPrice,
      'promotionCode': promotionCode
    }

    this.paymentInit(this.payInfo);
    // $log.debug(payInfo);
    // $state.go('app.payment',{item:payInfo});
  }





  //------------------------------payment---------------------------------------


  paymentInit(paymentParams) {

    this.orderd = true;
    // this.history = (this.localStorageService.get("history" + this.appId + this.user.registeredUser));

    this.ordersService.getIPGinfo()
      .subscribe((data) => {
        this.paymentData = data;
        this.dataService.paypalKey = this.paymentData.paypalKey;
        this.dataService.env = this.paymentData.env;
        // $log.debug($scope.paymentData);
        if (this.formType == "delivery") {
          this.deliveryShow = this.paymentData.cashOnDeliveryEnable;
          this.pickupShow = false;
        } else {
          this.deliveryShow = false;
          this.pickupShow = this.paymentData.cashOnPickupEnable;
        }
        this.paypalShow = this.paymentData.paypalEnable;
        this.stripeShow = this.paymentData.stripeEnable;
        this.braintreeShow = this.paymentData.braintreeEnable;
        this.authorizeNet = this.paymentData.authorizeNetEnable;
        this.payhere = this.paymentData.payHereEnable;
        this.payHereMID = this.paymentData.payHereMerchantId;
      }), (err) => {
        alert('warning!\n Unable to get Products Selected Category,\n Please check your connection!');
      };

    this.cardType = {};
    this.card = {
      amount: paymentParams.amount
    };

  }


  submit(data, type, note) {

    if (type == 'creditcard') {
      this.makeStripePaymentMethod(data, note);
    } else {
      this.authorizeCreditCardMethod(data, note);
    }

  }

  makeStripePaymentMethod(cardInformation, note) {

    this.showSpinner = true;
    this.hideConfirm = true;

    cardInformation.amount = this.card.amount;
    cardInformation.appId = this.appId;
    cardInformation.userId = this.userId;
    this.http.post(SERVER_URL + '/templates/makeStripePayment', cardInformation)

      .subscribe((res: any) => {

        this.showSpinner = false;

        if (res.status == 'succeeded') {
          this.orderProcess(note);
        } else {
          this.ePay = false;
          this.ePayNull = false;
          this.ePayFail = true;

          window.setTimeout(() => {
            $(".alert-danger").fadeTo(500, 0).slideUp(500, ()=>{
                $(this).remove();
                this.ePayFail = false;
            });
        }, 2000);
        }
      }, (err) => {
        alert('makeStripePayment failed');
        this.showSpinner = false;
        this.hideConfirm = false;

      })

  };

  authorizeCreditCardMethod(cardInformation, note) {

    this.showSpinner = true;
    this.hideConfirm = true;

    cardInformation.amount = this.card.amount;
    cardInformation.appId = this.appId;

    this.http.post(SERVER_URL + "/templateController/authorizeNetPay", cardInformation)
      .subscribe((res: any) => {

        this.showSpinner = false;

        if (res.status == 'ok') {
          this.orderProcess(note);
        } else if (res.data == "Null Response") {

          this.ePay = false;
          this.ePayFail = false;
          this.ePayNull = true;
          window.setTimeout(() => {
            $(".alert-warning").fadeTo(500, 0).slideUp(500, ()=>{
                $(this).remove();
            });
        }, 2000);

        } else if (res.data == "Failed Transaction") {

          this.ePay = false;
          this.ePayNull = false;
          this.ePayFail = true;

          window.setTimeout(() => {
            $(".alert-danger").fadeTo(500, 0).slideUp(500, ()=>{
                $(this).remove();
                this.ePayFail = false;
            });
        }, 2000);

        }

      }, (err) => {
        alert('authorizeCreditCard' + err)
        this.showSpinner = false;
        this.hideConfirm = false;

      })
  }

  orderProcess(note) {

    if (note) {
      note = note.trim();
    }
    if (this.formType == "delivery") {

        this.orderDetails = {
          'appId': this.appId,
          'registeredUser': ((!this.localData) ? "Unknown User" :this.localData.registeredUser),
          'item': this.payInfo.cart,
          'amount': this.payInfo.amount,
          'customerName': ((!this.oldUser) ? this.complexForm.controls['fName'].value : this.localData.name),
          'deliverName': ((!this.oldUser) ? this.complexForm.controls['fName'].value : this.localData.name),
          'deliveryNo': ((!this.oldUser) ? this.complexForm.controls['streetNo'].value : this.localData.streetNumber),
          'deliveryStreet': ((!this.oldUser) ? this.complexForm.controls['streetName'].value : this.localData.streetName),
          'deliveryCity': ((!this.oldUser) ? this.complexForm.controls['city'].value : this.localData.city),
          'deliveryCountry': ((!this.oldUser) ? this.complexForm.controls['country'].value : this.localData.country),
          'deliveryZip': ((!this.oldUser) ? this.complexForm.controls['zip'].value : this.localData.zip),
          'telNumber': ((!this.oldUser) ? this.complexForm.controls['phone'].value : this.localData.phone),
          'tax': this.payInfo.taxTotal,
          'shippingCost': this.chkShippingCost,
          'shippingOpt': "smartfit Delivery",
          'email': this.payInfo.userEmail,
          'currency': this.dataService.currency,
          'puckupId': null,
          'promotionCode': this.payInfo.promotionCode,
          'note': note
        };

    }

    this.http.post(SERVER_URL + "/templatesOrder/saveOrder", this.orderDetails, { responseType: 'text' })
      .subscribe((res) => {
        this.responce = JSON.parse(res).name;
        console.log(this.responce);
        if (JSON.parse(res).status == 404) {
          this.showSpinner = false;
          $('#myModal').modal('show')
        } else {
        this.orderDetails.id = this.dataService.cart.cartItems[0].id;
        this.http.post(SERVER_URL + "/templatesInventory/updateInventory", this.payInfo.cart, { responseType: 'text' })
          .subscribe((res) => {

            this.dataService.cart.cartItems = [];
            this.dataService.cart.cartSize = 0;
            this.dataService.parentobj.cartSize = this.dataService.cart.cartSize;
            this.dataService.cart.totalPrice = 0;
            this.dataService.cart.totalQuantity = 0;

            let appUser: any = this.localStorageService.get('appLocalStorageUser' + this.appId)

            if (appUser) {
              if (this.localStorageService.get("cart" + appUser.registeredUser)) {
                this.localStorageService.remove("cart" + appUser.registeredUser);
              }
            }else{
              this.localStorageService.remove("cartUnknownUser");
            }


            window.setTimeout(() => {
              $(".alert").fadeTo(500, 0).slideUp(500, ()=>{
                  $(this).remove();
                  this.ePay = false;
                  this.router.navigate(['home']);
              });
          }, 2000);

          }, (err: HttpErrorResponse) => {


            if (err.error instanceof Error) {

              console.log("Error Updating Inventory!\n Please check your connection.");

            } else {
              console.log("Server-side error occured.");
            }
            console.log(err);
          });
        }
      }, (err: HttpErrorResponse) => {


        if (err.error instanceof Error) {
          console.log("Error processing order!\n Please check your connection.");
        } else {
          console.log("Server-side error occured.");
        }
        console.log(err);
      });
  }


  confirmCashPayment(note,data) {

    this.showSpinner = true;
    this.hideConfirm = true;

    if (note) {
      note = note.trim();
    }

    if (this.formType == "delivery") {

        this.orderDetails = {
          'appId': this.appId,
          'registeredUser': ((!this.localData) ? "Unknown User" :this.localData.registeredUser),
          'item': this.payInfo.cart,
          'amount': this.payInfo.amount,
          'customerName': ((!this.oldUser) ? this.complexForm.controls['fName'].value : this.localData.name),
          'deliverName': ((!this.oldUser) ? this.complexForm.controls['fName'].value : this.localData.name),
          'deliveryNo': ((!this.oldUser) ? this.complexForm.controls['streetNo'].value : this.localData.streetNumber),
          'deliveryStreet': ((!this.oldUser) ? this.complexForm.controls['streetName'].value : this.localData.streetName),
          'deliveryCity': ((!this.oldUser) ? this.complexForm.controls['city'].value : this.localData.city),
          'deliveryCountry': ((!this.oldUser) ? this.complexForm.controls['country'].value : this.localData.country),
          'deliveryZip': ((!this.oldUser) ? this.complexForm.controls['zip'].value : this.localData.zip),
          'telNumber': ((!this.oldUser) ? this.complexForm.controls['phone'].value : this.localData.phone),
          'tax': this.payInfo.taxTotal,
          'shippingCost': this.chkShippingCost,
          'shippingOpt': "smartfit Delivery",
          'email': this.payInfo.userEmail,
          'currency': this.dataService.currency,
          'puckupId': null,
          'promotionCode': this.payInfo.promotionCode,
          'note': note
        };

    }
    console.log(this.orderDetails);
    console.log(note);
    console.log(data);
    this.http.post(SERVER_URL + "/templatesOrder/saveOrder", (this.orderDetails), { responseType: 'text' })
      .subscribe((res) => {
        this.orderDetails.id = this.dataService.cart.cartItems[0].id;
        this.http.post(SERVER_URL + "/templatesInventory/updateInventory", this.payInfo.cart, { responseType: 'text' })
          .subscribe(res => {

            this.showSpinner = false;

            this.dataService.cart.cartItems = [];
            this.dataService.cart.cartSize = 0;
            this.dataService.parentobj.cartSize = this.dataService.cart.cartSize;
            this.dataService.cart.totalPrice = 0;
            this.dataService.cart.totalQuantity = 0;

            let appUser: any = this.localStorageService.get('appLocalStorageUser' + this.appId)

            if (appUser) {
              if (this.localStorageService.get("cart" + appUser.registeredUser)) {
                this.localStorageService.remove("cart" + appUser.registeredUser);
              }
            }else{
              this.localStorageService.remove("cartUnknownUser");
            }

            this._success.next('Your Order has been successfully processed');

            this._success.subscribe((message) => this.successMessage = message);
            debounceTime.call(this._success, 3000).subscribe(() => this.successMessage = null);
            this._success.next("Thank You, Your order has been successfully processed");
            setTimeout(() => { this.router.navigate(['home']); }, 3100)

          }, (err: HttpErrorResponse) => {

            this.showSpinner = false;

            if (err.error instanceof Error) {

              console.log("Error Updating Inventory!\n Please check your connection.");

              this._success.subscribe((message) => this.errorMessage = message);
              debounceTime.call(this._success, 4000).subscribe(() => this.errorMessage = null);
              this._success.next("Error Updating Inventory!\n Please check your connection.");
              setTimeout(() => { }, 3100);

            } else {
              console.log("Server-side error occured.");
              this._success.subscribe((message) => this.errorMessage = message);
              debounceTime.call(this._success, 4000).subscribe(() => this.errorMessage = null);
              this._success.next("Server-side error occured.");
              setTimeout(() => { }, 3100);
            }
            console.log(err);
          });
      },
      (err: HttpErrorResponse) => {

        this.showSpinner = false;

        if (err.error instanceof Error) {

          console.log("Error Processing order!\n Please check your connection.");

          this._success.subscribe((message) => this.errorMessage = message);
          debounceTime.call(this._success, 4000).subscribe(() => this.errorMessage = null);
          this._success.next("Error Updating Inventory!\n Please check your connection.");
          setTimeout(() => { }, 3100);

        } else {

          console.log("Server-side error occured.");

          this._success.subscribe((message) => this.errorMessage = message);
          debounceTime.call(this._success, 4000).subscribe(() => this.errorMessage = null);
          this._success.next("Server-side error occured.");
          setTimeout(() => { }, 3100);

        }
        console.log(err);
      });
  }

  // Buy With PayPal
  buyWithPayPal(note) {
    if (note) {
      note = note.trim();
    }
    if (this.formType == "delivery") {
        this.orderDetails = {

          'appId': this.appId,
          'registeredUser': ((!this.localData) ? "Unknown User" :this.localData.registeredUser),
          'item': this.payInfo.cart,
          'amount': this.payInfo.amount,
          'customerName': ((!this.oldUser) ? this.complexForm.controls['fName'].value : this.localData.name),
          'deliverName': ((!this.oldUser) ? this.complexForm.controls['fName'].value : this.localData.name),
          'deliveryNo': ((!this.oldUser) ? this.complexForm.controls['streetNo'].value : this.localData.streetNumber),
          'deliveryStreet': ((!this.oldUser) ? this.complexForm.controls['streetName'].value : this.localData.streetName),
          'deliveryCity': ((!this.oldUser) ? this.complexForm.controls['city'].value : this.localData.city),
          'deliveryCountry': ((!this.oldUser) ? this.complexForm.controls['country'].value : this.localData.country),
          'deliveryZip': ((!this.oldUser) ? this.complexForm.controls['zip'].value : this.localData.zip),
          'telNumber': ((!this.oldUser) ? this.complexForm.controls['phone'].value : this.localData.phone),
          'tax': this.payInfo.taxTotal,
          'shippingCost': this.chkShippingCost,
          'shippingOpt': "smartfit Delivery",
          'email': this.payInfo.userEmail,
          'currency': this.dataService.currency,
          'puckupId': null,
          'promotionCode': this.payInfo.promotionCode,
          'note': note
        };


      }


    this.dataService.payPalDetails = this.orderDetails;

  }

  payHere(note) {

    if (note) {
      note = note.trim();
    }

    if (this.formType == "delivery") {

      this.orderDetails = {

        'appId': this.appId,
        'registeredUser': ((!this.localData) ? "Unknown User" :this.localData.registeredUser),
        'item': this.payInfo.cart,
        'amount': this.payInfo.amount,
        'customerName': ((!this.oldUser) ? this.complexForm.controls['fName'].value : this.localData.name),
        'deliverName': ((!this.oldUser) ? this.complexForm.controls['fName'].value : this.localData.name),
        'deliveryNo': ((!this.oldUser) ? this.complexForm.controls['streetNo'].value : this.localData.streetNumber),
        'deliveryStreet': ((!this.oldUser) ? this.complexForm.controls['streetName'].value : this.localData.streetName),
        'deliveryCity': ((!this.oldUser) ? this.complexForm.controls['city'].value : this.localData.city),
        'deliveryCountry': ((!this.oldUser) ? this.complexForm.controls['country'].value : this.localData.country),
        'deliveryZip': ((!this.oldUser) ? this.complexForm.controls['zip'].value : this.localData.zip),
        'telNumber': ((!this.oldUser) ? this.complexForm.controls['phone'].value : this.localData.phone),
        'tax': this.payInfo.taxTotal,
        'shippingCost': this.chkShippingCost,
        'shippingOpt': "smartfit Delivery",
        'email': this.payInfo.userEmail,
        'currency': this.dataService.currency,
        'puckupId': null,
        'promotionCode': this.payInfo.promotionCode,
        'note': note
        };

    }

    this.http.post(SERVER_URL + "/templatesOrder/savePendingOrder", this.orderDetails,{ responseType: 'json' })
      .subscribe((orderRes: any) => {

        this.http.post(SERVER_URL + "/templatesInventory/updateInventory", this.payInfo.cart,{ responseType: 'text' })
          .subscribe((res) => {
            this.dataService.cart.cartItems = [];
            this.dataService.cart.cartSize = 0;
            this.dataService.parentobj.cartSize = this.dataService.cart.cartSize;
            this.dataService.cart.totalPrice = 0;
            this.dataService.cart.totalQuantity = 0;

            //Pushing into order purchase history
            let appUser: any = this.localStorageService.get('appLocalStorageUser' + this.appId)

            if (appUser) {
              if (this.localStorageService.get("cart" + appUser.registeredUser)) {
                this.localStorageService.remove("cart" + appUser.registeredUser);
              }
            }else{
              this.localStorageService.remove("cartUnknownUser");
            }

            let city = this.orderDetails.deliveryCity ? this.orderDetails.deliveryCity : "";
            let streetNo = this.orderDetails.deliveryNo ? this.orderDetails.deliveryNo : "";
            let streetName = this.orderDetails.deliveryStreet ? this.orderDetails.deliveryStreet : "";


            window.location.href=(SERVER_URL + '/mobile/getPayHereForm/?name=' +
              this.orderDetails.customerName + "&amount=" +
              this.orderDetails.amount + "&currency=" +
              this.currency.symbol + "&email=" +
              this.orderDetails.email + "&telNumber=" +
              this.orderDetails.telNumber + "&item=" +
              this.orderDetails.item[0].name + "&address=" +
              streetNo + " " + streetName  + "&city=" +
              city + "&appId=" + orderRes.appId +
              "&orderId=" + orderRes.id + "&payHereMerchantId=" + this.payHereMID);
          },
          (err) => {
            console.log(err);
          });



      },
      (err) => {
        console.log(err);
      });


    // var inAppBrowserRef;

    // function showHelp(url) {

    //   var target = "_blank";

    //   var options = "location=yes,hidden=yes";

    //   inAppBrowserRef = window.open(url, target, options);

    //   inAppBrowserRef.addEventListener('loadstart', loadStartCallBack);

    //   inAppBrowserRef.addEventListener('loadstop', loadStopCallBack);

    //   inAppBrowserRef.addEventListener('loaderror', loadErrorCallBack);

    // }

    // function loadStartCallBack() {

    //   $('#status-message').text("loading please wait ...");

    // }

    // function loadStopCallBack() {

    //   if (inAppBrowserRef != undefined) {

    //     inAppBrowserRef.insertCSS({ code: "body{font-size: 25px;" });

    //     $('#status-message').text("");

    //     inAppBrowserRef.show();
    //   }

    // }

    // function loadErrorCallBack(params) {

    //   $('#status-message').text("");

    //   var scriptErrorMesssage =
    //     "alert('Sorry we cannot open that page. Message from the server is : "
    //     + params.message + "');"

    //   inAppBrowserRef.executeScript({ code: scriptErrorMesssage }, executeScriptCallBack);

    //   inAppBrowserRef.close();

    //   inAppBrowserRef = undefined;

    // }

    // function executeScriptCallBack(params) {

    //   if (params[0] == null) {

    //     $('#status-message').text(
    //       "Sorry we couldn't open that page. Message from the server is : '"
    //       + params.message + "'");
    //   }

    // }
  }

}
