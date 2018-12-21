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
import { ProductsService } from '../../services/products/products.service';
declare var $:any;
declare let paypal: any;

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
  countries;
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
  private oldUser;
  private loggedUserData;
  private payHereMID;
  private isCountryChanged = false;
  private selectedCountry;
  ePay = false;
  ePayFail = false;
  ePayNull = false;
  payHereUrl;
  promos = [{promoCode:'Select a promocode'}];
  selectedPromo;
  discountedTotal;
  subTotal;
  totalQuantity = 0;
  promoCodeWarningMessage:string;
  constructor(	fb: FormBuilder,
				private ordersService: OrdersService,
				private shippingService: ShippingService,
				private currencyService: CurrencyService,
				private localStorageService: LocalStorageService,
				private http: HttpClient,
				private route: ActivatedRoute,
				private router: Router,
				private dataService: PagebodyServiceModule,
				private title: TitleService,
				private spinner: Ng4LoadingSpinnerService,
				private productsService: ProductsService) {

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
      'phone': new FormControl(this.dataService.userData.phone, Validators.compose([Validators.required])),
      'streetNo': new FormControl(this.dataService.userData.streetNumber, Validators.compose([Validators.required])),
      'streetName': new FormControl(this.dataService.userData.streetName, Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/)])),
      'city': new FormControl(this.dataService.userData.city, Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)])),
      'zip': new FormControl(this.dataService.userData.zip, Validators.compose([Validators.pattern(/^([a-zA-Z0-9\-]+\s)*[a-zA-Z0-9\-]+$/)])),
      'country': new FormControl(this.dataService.userData.country)

    });
    this.complexForm.controls['country'].setValue(this.dataService.userData.country, { onlySelf: true });

    this.pickupForm = fb.group({
      'name': new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[A-z ]+$/)])),
      'lname': new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[A-z ]+$/)])),
      'email': new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])),
      'phone': new FormControl('', Validators.compose([Validators.required])),

    });



		this.productsService.getSalesAndPromoData(this.appId).subscribe(data => {
			data.forEach(element => {
    				if(element.salesAndPromotionType == 'storeWide' && element.status == 'ACTIVE'){
    					// console.log(element);
    					this.promos.push(element);
    				}
      });
    });
  }

  ngOnInit() {
    let date = (new Date()).getFullYear()
    for (let i = 0; i < 100; i++) {
      this.years.push(date++);
    }

    this._success.next('hello');
    this.cartItems = this.dataService.cart.cartItems;

    this.route.params.subscribe(params => {
      this.formType = params['type']; // --> Name must match wanted parameter
    });

    this.currencyService.getCountryData()
      .subscribe((res) => {
        this.countries = res;
      }, err => {
        this.spinner.hide();
        console.log("Error Retrieving country data!");
      });

    if (this.cartItems.length > 0 && this.formType == 'delivery') {

      this.isAdded = true;


    }
    this.localData = (this.localStorageService.get('appLocalStorageUser' + this.appId));

    /*if (this.localData == null) {
      this.router.navigate(['login'])
    }
*/



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
    if (this.sign && this.countries) {
      this.spinner.hide();
    }

    this.user = (this.localStorageService.get('appLocalStorageUser' + this.appId));

    // get the shipping options

    // if () { }

    if (this.formType == 'delivery') {
      this.spinner.show();
      this.getShippingData(this.appId, this.dataService.userData.country);

    } else {
      this.spinner.show();
      this.shippingService.getShippingPickupInfo()
        .subscribe((data) => {
          this.spinner.hide();
          this.pickup = data;
          // this.spinner.hide();
          /* $scope.header = data.header;
          $scope.content = data.content;*/
          //$state.go('app.category');
        }, (err) => {
          this.spinner.hide();
          alert(
            'Error Retrieving Pickup details!\n Please check your connection.'
          );
        });
    }

    this.amount = this.getTotal();

  }

  getShippingData(appId, Country) {

    this.shippingData = [];


    let param2 = {
      'appId': appId,
      'country': Country
    }

    this.http.post(SERVER_URL + "/edit/getShippingInfoByCountry", param2)
      .subscribe((data) => {
        this.spinner.hide();
        this.shippingDatas = data;
        // $log.debug($scope.shippingData);
        for (var i = 0; i < this.shippingDatas.length; i++) {
          if (this.shippingDatas[i].shippingOption == "Flat Rate" ||
            this.shippingDatas[i].shippingOption == "Weight Based") {
            this.shippingData.push(this.shippingDatas[i]);
          }
        }
      }, (err) => {
        this.spinner.hide();
        alert(
          'Error Retrieving shipping details!\n Please check your connection.'
        );
      });

  }

  check(user, newUserCountry) {
    if (user == 'oldUser') {
      this.oldUser = true;
      this.getShippingData(this.appId, this.dataService.userData.country);
      this.isSelected = false;
      this.shippingForm.controls['shippingOption'].reset();
    }
    if (user == 'newUser') {
      this.oldUser = false;
      if (!newUserCountry) {
        this.getShippingData(this.appId, this.selectedCountry);
      } else {
        this.getShippingData(this.appId, newUserCountry);
      }
    }
    this.isSelected = false;
    this.shippingForm.controls['shippingOption'].reset();
  }

  countryChanged(data) {
    this.hide = true;
    this.isSelected = false;
    this.isCountryChanged = true;
    this.shippingForm.controls['shippingOption'].reset();
    // var param = {
    //   'appId': this.appId,
    //   'country': data
    // };

    // this.http.post(SERVER_URL + '/templatesOrder/getTaxInfoByCountry', param).subscribe((data) => {
    //   if (data == '') {
    //     this.hide = true;
    //     this.tax = 0;
    //   } else {
    //     this.tax = data[0].taxAmount;
    //     this.hide = false;
    //   }
    // })

  }

  login() {
    this.router.navigate(['login', this.formType]);
  }

  checkNote(note) {
    if (!note) {
      this.noteDes = "";
    }
  }

  ngAfterViewInit() {
    if (this.formType == "pickup" && !this.pickupForm.valid) {
      this.isSelected = false;
    }

  }

  itemPriceCal(price, qty) {
    let tot = price * qty
    return (Math.round(tot * 100) / 100);
  }


  getTotal() {
    var total = 0;
    var amount = 0;
    for (var i = 0; i < this.cartItems.length; i++) {

      var product = this.cartItems[i];

	   amount = product.total;
	   this.totalQuantity += product.qty;
       total += (amount * product.qty);
    }
	  this.subTotal = total;
      return total;

  };


  addShipping(shippingDetails, e, formData) {
    this.spinner.show();
    this.isSelected = true;
    this.fname = formData.fName;
    this.lname = formData.lName;
    this.email = formData.email;
    this.phone = formData.phone;
    this.country = formData.country;
    this.city = formData.city;
    this.streetName = formData.streetName;
    this.streetNumber = formData.streetNo;
    this.zip = formData.zip;


    var total = 0;

    var totalWeight = 0;
    var shippingCost = 0;
    var weight = 0; //calculate single item weight

    //there are 3 stated when adding item to cart
    //position 3 - when add a new item in the begening
    //position 1 - adding the same item continously
    //position 2 - when we change the product item adding.

    // if we triggerd the quantity change in the cart
    if (this.dataService.parseEnable == true) {
      //getting the parsed selected item index
      var index = this.dataService.parseIndex;

      //when we added the second item and change its value
      if (this.dataService.position2 == true) {

        //getting item weight of changed item (with the index)
        weight = this.dataService.cart.cartItems[index].weight;

        //resetting its total weight.
        for (var i = 0; i < this.dataService.cart.cartItems.length; i++) {
          this.dataService.cart.cartItems[index].totWeight = weight * this.dataService.parseQty;;
        }

        //calculating the whole item total weight
        for (var i = 0; i < this.dataService.cart.cartItems.length; i++) {
          var product = this.dataService.cart.cartItems[i];
          total = product.totWeight;
          totalWeight += (total);

        }

        // $rootScope.parseEnable=false;
        this.dataService.position2 = false;
        //when we add same item without changing the item (with value change)
      } else {

        var weight2 = 0;
        //getting the parsed selected item index
        var index = this.dataService.parseIndex;


        //getting item weight of changed item (with the index)
        weight2 = this.dataService.cart.cartItems[index].weight;

        //resetting its total weight.
        for (var i = 0; i < this.dataService.cart.cartItems.length; i++) {
          this.dataService.cart.cartItems[index].totWeight = weight2 * this.dataService.parseQty;
        }

        //calculating the whole item total weight
        for (var i = 0; i < this.dataService.cart.cartItems.length; i++) {
          var product = this.dataService.cart.cartItems[i];
          total = product.totWeight;
          totalWeight += (total);

        }
        // resetting the parsed values.
        this.dataService.parseEnable = false;
        this.dataService.parseQty = 0;
      }

      //Normal way to calculate the total weight, when we did not change
      //the value from the cart.
    } else {

      for (var i = 0; i < this.dataService.cart.cartItems.length; i++) {
        var product = this.dataService.cart.cartItems[i];
        total = product.totWeight;
        totalWeight += (total);

      }

    }

    if (shippingDetails.shippingOption == "Flat Rate") {

      var shippingCostPreOrderFee = shippingDetails.preOrderFee;
      var shippingCostFeePerItem = shippingDetails.feePerItem * this.dataService.cart.cartItems.length;
      shippingCost = shippingCostPreOrderFee + shippingCostFeePerItem;

    } else if (shippingDetails.shippingOption == "Weight Based") {
      shippingDetails.overWeight = false;
      shippingDetails.underWeight = false;
      // $log.debug(shippingDetails.shipping.weightRanges);
      for (var i = 0; i < shippingDetails.weightRanges.length; i++) {
        var weightRange = shippingDetails.weightRanges[i];
        if (weightRange.startWeight <= totalWeight && weightRange.endWeight >= totalWeight) {
          shippingCost = shippingDetails.weightRanges[i].cost;
        }
        if (i != shippingDetails.weightRanges.length - 1) {
          if (weightRange.endWeight < totalWeight && shippingDetails.weightRanges[i + 1].startWeight > totalWeight) {
            shippingCost = shippingDetails.weightRanges[i+1].cost;
          }
        }
      }
      if (shippingDetails.weightRanges[0].startWeight > totalWeight) {
        shippingDetails.underWeight = true;
      }
      if (shippingDetails.weightRanges[shippingDetails.weightRanges.length - 1].endWeight < totalWeight) {
        shippingDetails.overWeight = true;
      }

    } else {
      shippingCost = shippingDetails.cost;

    }

    shippingDetails.delivery = this.dataService.data;
    shippingDetails.shippingCost = shippingCost;
    //---------------------- hide spinner after getting shipping cost -------
    if (shippingDetails.shippingCost) {
      this.spinner.hide();
    }
    // this.dataService.finalDetails = shippingDetails;
    this.chk(shippingDetails);

    // setTimeout(()=>{ this.pay("001"); }, 500);


  }


  //------------------------------pickup---------------------------------------



  checkout(data, details) {
    this.isSelected = true;
    this.pickupData = {
      item: this.dataService.deliverItems,
      delivery: { location: "Pick up", method: "Pick up" },
      country: data.country,
      pickupId: data.id,
      pickupCost: data.cost,
      deliverDetails: { name: details.name, lname: details.lname, email: details.email, number: details.phone },

    }
    this.chk(this.pickupData);
    // setTimeout(() => {  }, 500);
  };

  //------------------------------checkout---------------------------------------
  chk(final) {

    this.finalDetails = final;
    this.chkShippingCost = parseFloat(this.finalDetails.shippingCost);
    this.underWeight = this.finalDetails.underWeight;
    this.overWeight = this.finalDetails.overWeight;


    if (typeof this.chkShippingCost === 'undefined' || this.chkShippingCost === null ) {
      this.hideShipping = true;
    } else {
      this.hideShipping = false;
    }

    if (this.localData) {
      if (this.oldUser == true) {
        this.chkCountry = this.localData.country;
      } else {
        this.chkCountry = this.selectedCountry;
      }

    } else {
      if (this.formType == 'delivery') {
        this.chkCountry = this.country;
      } else {
        if (final.country) {
          this.chkCountry = final.country;
        }
      }
    }

    var param = {
      'appId': this.appId,
      'country': this.chkCountry
    };

    this.spinner.show();

    this.http.post(SERVER_URL + '/templatesOrder/getTaxInfoByCountry', param)
      .subscribe((data) => {

        this.spinner.hide();

        if (data == '') {
          this.chkHide = true;
          this.chkTax = 0;
          this.isApplyShippingCharge = false;
        } else {
          this.chkTax = data[0].taxAmount;
          this.isApplyShippingCharge = data[0].isApplyShippingCharge;
          this.chkHide = false;
        }

		this.calculateTotalOrderCost();

      }, err => {
        this.spinner.hide();
        console.log("Error retrieving TaxInfo!,\n Please check Your connection");
      });
  }

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
      this.makeStripePaymentMethod(data, note, type);
    } else {
      this.authorizeCreditCardMethod(data, note, type);
    }

  }

  makeStripePaymentMethod(cardInformation, note, type) {

    this.showSpinner = true;

    cardInformation.amount = this.card.amount;
    cardInformation.appId = this.appId;
    cardInformation.userId = this.userId;
    this.http.post(SERVER_URL + '/templates/makeStripePayment', cardInformation)

      .subscribe((res: any) => {

        this.showSpinner = false;

        if (res.status == 'succeeded') {
          this.orderProcess(note, type);
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
      })

  };

  authorizeCreditCardMethod(cardInformation, note, type) {

    this.showSpinner = true;

    cardInformation.amount = this.card.amount;
    cardInformation.appId = this.appId;

    this.http.post(SERVER_URL + "/templateController/authorizeNetPay", cardInformation)
      .subscribe((res: any) => {

        this.showSpinner = false;

        if (res.status == 'ok') {
          this.orderProcess(note, type);
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
      })
  }

  orderProcess(note, type) {

    if (note) {
      note = note.trim();
    }
    if (this.formType == "delivery") {
      if (this.oldUser) {
        this.orderDetails = {
          'appId': this.appId,
          'registeredUser': this.user.registeredUser,
          'item': this.payInfo.cart,
          'amount': this.payInfo.amount,
          'customerName': this.user.name,
          'deliverName': this.user.name + " " + this.user.lname,
          'deliveryNo': this.user.streetNumber,
          'deliveryStreet': this.user.streetName,
          'deliveryCity': this.user.city,
          'deliveryCountry': this.user.country,
          'deliveryZip': this.user.zip,
          'telNumber': this.user.phone,
          'tax': this.payInfo.taxTotal,
          'shippingCost': this.chkShippingCost,
          'shippingOpt': this.payInfo.item.shippingOption,
          'email': this.user.email,
          'currency': this.dataService.currency,
          'puckupId': null,
          'promotionCode':  this.selectedPromo? this.selectedPromo[0].promoCode : null,
          'note': note,
          'paymentType': type
        };
      } else{
        this.orderDetails = {
          'appId': this.appId,
          'registeredUser': (this.user ? this.user.registeredUser:"Unknown User" ),
          'item': this.payInfo.cart,
          'amount': this.payInfo.amount,
          'customerName': this.complexForm.value.fName,
          'deliverName': this.complexForm.value.fName + " " + this.complexForm.value.lName,
          'deliveryNo': this.complexForm.value.streetNo,
          'deliveryStreet': this.complexForm.value.streetName,
          'deliveryCity': this.complexForm.value.city,
          'deliveryCountry': this.complexForm.value.country,
          'deliveryZip': this.complexForm.value.zip,
          'telNumber': this.complexForm.value.phone,
          'tax': this.payInfo.taxTotal,
          'shippingCost': this.chkShippingCost,
          'shippingOpt': this.payInfo.item.shippingOption,
          'email': this.complexForm.value.email,
          'currency': this.dataService.currency,
          'puckupId': null,
          'promotionCode':  this.selectedPromo ? this.selectedPromo[0].promoCode : null,
          'note': note,
          'paymentType': type
        };
      }


    } else {
      if (this.pickupForm.valid) {
        this.orderDetails = {
          "appId": this.appId,
          "registeredUser": (this.user ? this.user.registeredUser:"Unknown User" ),
          "item": this.payInfo.cart,
          "amount": this.payInfo.amount,
          "customerName": this.pickupForm.value.name+" "+this.pickupForm.value.lname,
          "telNumber": this.pickupForm.value.phone,
          "tax": this.payInfo.taxTotal,
          "pickupId": this.payInfo.item.pickupId,
          "pickupCost": this.chkPickupCost,
          "email": this.pickupForm.value.email,
          "currency": this.dataService.paypalCurrency,
          "promotionCode":  this.selectedPromo ? this.selectedPromo[0].promoCode : null,
          'note': note,
          'paymentType': type
        }
      }
      //  else if(this.user){
      //   this.orderDetails = {
      //     "appId": this.appId,
      //     "registeredUser": 'Unknown User',
      //     "item": this.payInfo.cart,
      //     "amount": this.payInfo.amount,
      //     "customerName": this.payInfo.item.deliverDetails.name,
      //     "telNumber": this.payInfo.item.deliverDetails.number,
      //     "tax": this.payInfo.taxTotal,
      //     "pickupId": this.payInfo.item.pickupId,
      //     "pickupCost": this.chkPickupCost,
      //     "email": this.payInfo.item.deliverDetails.email,
      //     "currency": this.dataService.currency,
      //     "promotionCode": this.payInfo.promotionCode,
      //     'note': note,
      //     'paymentType': 'Cash on pickup'
      //   }
      // }
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

            this.ePayFail = false;
            this.ePayNull = false;
            this.ePay = true;

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
            } else {
              this.localStorageService.remove("cartUnknownUser");
            }


            window.setTimeout(() => {
              $(".alert").fadeTo(500, 0).slideUp(500, () => {
                $(this).remove();
                this.ePay = false;
                this.router.navigate(['payhereSuccess']);
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


  confirmCashPayment(note) {
    this.showSpinner = true;

    if (note) {
      note = note.trim();
    }

    if (this.formType == "delivery") {
      if (this.oldUser) {
        // console.log("from registered user only")
        this.orderDetails = {
          'appId': this.appId,
          'registeredUser': this.user.registeredUser,
          'item': this.payInfo.cart,
          'amount': this.payInfo.amount,
          'customerName': this.user.name,
          'deliverName': this.user.name + " " + this.user.lname,
          'deliveryNo': this.user.streetNumber,
          'deliveryStreet': this.user.streetName,
          'deliveryCity': this.user.city,
          'deliveryCountry': this.user.country,
          'deliveryZip': this.user.zip,
          'telNumber': this.user.phone,
          'tax': this.payInfo.taxTotal,
          'shippingCost': this.chkShippingCost,
          'shippingOpt': this.payInfo.item.shippingOption,
          'email': this.user.email,
          'currency': this.dataService.currency,
          'puckupId': null,
          'promotionCode': this.selectedPromo? this.selectedPromo[0].promoCode : null,
          'note': note,
          'paymentType': 'Cash on delivery'
        };
      } else{

        // console.log("from registered users that choose form or unknown users")
        this.orderDetails = {
          'appId': this.appId,
          'registeredUser':(this.user ? this.user.registeredUser:"Unknown User" ),
          'item': this.payInfo.cart,
          'amount': this.payInfo.amount,
          'customerName': this.complexForm.value.fName,
          'deliverName': this.complexForm.value.fName + " " + this.complexForm.value.lName,
          'deliveryNo': this.complexForm.value.streetNo,
          'deliveryStreet': this.complexForm.value.streetName,
          'deliveryCity': this.complexForm.value.city,
          'deliveryCountry': this.complexForm.value.country,
          'deliveryZip': this.complexForm.value.zip,
          'telNumber': this.complexForm.value.phone,
          'tax': this.payInfo.taxTotal,
          'shippingCost': this.chkShippingCost,
          'shippingOpt': this.payInfo.item.shippingOption,
          'email': this.complexForm.value.email,
          'currency': this.dataService.currency,
          'puckupId': null,
          'promotionCode':  this.selectedPromo ? this.selectedPromo[0].promoCode : null,
          'note': note,
          'paymentType': 'Cash on delivery'
        };


      }


    } else {
      if (this.pickupForm.valid) {
        // console.log("from pickup users only")
        this.orderDetails = {
          "appId": this.appId,
          "registeredUser": (this.user ? this.user.registeredUser:"Unknown User" ),
          "item": this.payInfo.cart,
          "amount": this.payInfo.amount,
          "customerName": this.pickupForm.value.name+" "+this.pickupForm.value.lname,
          "telNumber": this.pickupForm.value.phone,
          "tax": this.payInfo.taxTotal,
          "pickupId": this.payInfo.item.pickupId,
          "pickupCost": this.chkPickupCost,
          "email": this.pickupForm.value.email,
          "currency": this.dataService.currency,
          "promotionCode":  this.selectedPromo ? this.selectedPromo[0].promoCode : null,
          'note': note,
          'paymentType': 'Cash on pickup'
        }
      }
      //  else if(this.user){
      //   this.orderDetails = {
      //     "appId": this.appId,
      //     "registeredUser": 'Unknown User',
      //     "item": this.payInfo.cart,
      //     "amount": this.payInfo.amount,
      //     "customerName": this.payInfo.item.deliverDetails.name,
      //     "telNumber": this.payInfo.item.deliverDetails.number,
      //     "tax": this.payInfo.taxTotal,
      //     "pickupId": this.payInfo.item.pickupId,
      //     "pickupCost": this.chkPickupCost,
      //     "email": this.payInfo.item.deliverDetails.email,
      //     "currency": this.dataService.currency,
      //     "promotionCode": this.payInfo.promotionCode,
      //     'note': note,
      //     'paymentType': 'Cash on pickup'
      //   }
      // }
    }
    this.http.post(SERVER_URL + "/templatesOrder/saveOrder", (this.orderDetails), { responseType: 'text' })
      .subscribe((res:any) => {

        this.responce = JSON.parse(res).name;
        let response = JSON.parse(res);
        if (JSON.parse(res).status == 404) {
          this.showSpinner = false;
          $('#myModal').modal('show')
        } else if (response.message === 'EMAIL_EXISTS') {

          this.showSpinner = false;
          this._success.subscribe((message) => this.errorMessage = message);
          debounceTime.call(this._success, 4000).subscribe(() => this.errorMessage = null);
          this._success.next(response.description);
          setTimeout(() => { }, 3100);
        } else if (response.message === 'EXPIRED') {

          this.showSpinner = false;
          this._success.subscribe((message) => this.errorMessage = message);
          debounceTime.call(this._success, 4000).subscribe(() => this.errorMessage = null);
          this._success.next(response.description);
          setTimeout(() => { }, 3100);
        } else {
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
              } else {
                this.localStorageService.remove("cartUnknownUser");
              }
			  this.router.navigate(['payhereSuccess']);

              // this._success.next('Your Order has been successfully processed');

              // this._success.subscribe((message) => this.successMessage = message);
              // debounceTime.call(this._success, 3000).subscribe(() => this.successMessage = null);
              // this._success.next("Thank You, Your order has been successfully processed");
              // setTimeout(() => { this.router.navigate(['home']); }, 3100)

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
        }
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
      if (this.oldUser) {
        this.orderDetails = {
          'appId': this.appId,
          'registeredUser': this.user.registeredUser,
          'item': this.payInfo.cart,
          'amount': this.payInfo.amount,
          'customerName': this.user.name,
          'deliverName': this.user.name + " " + this.user.lname,
          'deliveryNo': this.user.streetNumber,
          'deliveryStreet': this.user.streetName,
          'deliveryCity': this.user.city,
          'deliveryCountry': this.user.country,
          'deliveryZip': this.user.zip,
          'telNumber': this.user.phone,
          'tax': this.payInfo.taxTotal,
          'shippingCost': this.chkShippingCost,
          'shippingOpt': this.payInfo.item.shippingOption,
          'email': this.user.email,
          'currency': this.dataService.paypalCurrency,
          'puckupId': null,
          'promotionCode': this.selectedPromo? this.selectedPromo[0].promoCode : null,
          'note': note,
          'paymentType': 'PayPal'
        };

      } else{
        this.orderDetails = {
          'appId': this.appId,
          'registeredUser': (this.user ? this.user.registeredUser:"Unknown User" ),
          'item': this.payInfo.cart,
          'amount': this.payInfo.amount,
          'customerName': this.complexForm.value.fName,
          'deliverName': this.complexForm.value.fName + " " + this.complexForm.value.lName,
          'deliveryNo': this.complexForm.value.streetNo,
          'deliveryStreet': this.complexForm.value.streetName,
          'deliveryCity': this.complexForm.value.city,
          'deliveryCountry': this.complexForm.value.country,
          'deliveryZip': this.complexForm.value.zip,
          'telNumber': this.complexForm.value.phone,
          'tax': this.payInfo.taxTotal,
          'shippingCost': this.chkShippingCost,
          'shippingOpt': this.payInfo.item.shippingOption,
          'email': this.complexForm.value.email,
          'currency': this.dataService.paypalCurrency,
          'puckupId': null,
          'promotionCode':  this.selectedPromo? this.selectedPromo[0].promoCode : null,
          'note': note,
          'paymentType': 'PayPal'
        };
      }


    } else {
      if (this.pickupForm.valid) {
        this.orderDetails = {
          "appId": this.appId,
          "registeredUser": (this.user ? this.user.registeredUser:"Unknown User" ),
          "item": this.payInfo.cart,
          "amount": this.payInfo.amount,
          "customerName": this.pickupForm.value.name+" "+this.pickupForm.value.lname,
          "telNumber": this.pickupForm.value.phone,
          "tax": this.payInfo.taxTotal,
          "pickupId": this.payInfo.item.pickupId,
          "pickupCost": this.chkPickupCost,
          "email": this.pickupForm.value.email,
          "currency": this.dataService.paypalCurrency,
          "promotionCode":  this.selectedPromo ? this.selectedPromo[0].promoCode : null,
          'note': note,
          'paymentType': 'PayPal'
        }
      }
      //  else if(this.user){
      //   this.orderDetails = {
      //     "appId": this.appId,
      //     "registeredUser": 'Unknown User',
      //     "item": this.payInfo.cart,
      //     "amount": this.payInfo.amount,
      //     "customerName": this.payInfo.item.deliverDetails.name,
      //     "telNumber": this.payInfo.item.deliverDetails.number,
      //     "tax": this.payInfo.taxTotal,
      //     "pickupId": this.payInfo.item.pickupId,
      //     "pickupCost": this.chkPickupCost,
      //     "email": this.payInfo.item.deliverDetails.email,
      //     "currency": this.dataService.currency,
      //     "promotionCode": this.payInfo.promotionCode,
      //     'note': note,
      //     'paymentType': 'Cash on pickup'
      //   }
      // }
    }

    this.dataService.payPalDetails = this.orderDetails;

  }

  payHere(note) {
    let realHostUrl = encodeURIComponent(window.location.protocol+"//"+window.location.host+"/#/");
    if (note) {
      note = note.trim();
    }

    if (this.formType == "delivery") {
      if (this.oldUser) {

        this.orderDetails = {
          'appId': this.appId,
          'registeredUser': this.user.registeredUser,
          'item': this.payInfo.cart,
          'amount': this.payInfo.amount,
          'customerName': this.user.name,
          'lastName':  this.lname,
          'deliveryNo': this.user.streetNumber,
          'deliveryStreet': this.user.streetName,
          'deliveryCity': this.user.city,
          'deliveryCountry': this.user.country,
          'deliveryZip': this.user.zip,
          'telNumber': this.user.phone,
          'tax': this.payInfo.taxTotal,
          'shippingCost': this.chkShippingCost,
          'shippingOpt': this.payInfo.item.shippingOption,
          'email': this.user.email,
          'currency': this.dataService.paypalCurrency,
          'puckupId': null,
          'promotionCode':  this.selectedPromo ? this.selectedPromo[0].promoCode : null,
          'note': note,
          'paymentType': 'PayHere',
          'realHostUrl': realHostUrl,
          'payHereMerchantId': this.payHereMID
        };
      } else{
        this.orderDetails = {
          'appId': this.appId,
          'registeredUser': (this.user ? this.user.registeredUser:"Unknown User" ),
          'item': this.payInfo.cart,
          'amount': this.payInfo.amount,
          'customerName': this.complexForm.value.fName,
          'lastName':  this.lname,
          'deliveryNo': this.complexForm.value.streetNo,
          'deliveryStreet': this.complexForm.value.streetName,
          'deliveryCity': this.complexForm.value.city,
          'deliveryCountry': this.complexForm.value.country,
          'deliveryZip': this.complexForm.value.zip,
          'telNumber': this.complexForm.value.phone,
          'tax': this.payInfo.taxTotal,
          'shippingCost': this.chkShippingCost,
          'shippingOpt': this.payInfo.item.shippingOption,
          'email': this.complexForm.value.email,
          'currency': this.dataService.paypalCurrency,
          'puckupId': null,
          'promotionCode':  this.selectedPromo? this.selectedPromo[0].promoCode : null,
          'note': note,
          'paymentType': 'PayHere',
          'realHostUrl': realHostUrl,
          'payHereMerchantId': this.payHereMID
        };
      }


    } else {
      if (this.pickupForm.valid) {
        this.orderDetails = {
          'appId': this.appId,
          'registeredUser': (this.user ? this.user.registeredUser:"Unknown User" ),
          'item': this.payInfo.cart,
          'amount': this.payInfo.amount,
          'customerName':  this.pickupForm.value.name+" "+this.pickupForm.value.lname,
          'lastName':  this.payInfo.item.deliverDetails.lname,
          'deliveryNo':  '',
          'deliveryStreet': '',
          'deliveryCity': '',
          'telNumber': this.pickupForm.value.phone,
          'tax': this.payInfo.taxTotal,
          'pickupId': this.payInfo.item.pickupId,
          'pickupCost': this.chkPickupCost,
          'email': this.pickupForm.value.email,
          'currency': this.dataService.paypalCurrency,
          'promotionCode':  this.selectedPromo ? this.selectedPromo[0].promoCode : null,
          'note': note,
          'paymentType': 'PayHere',
          'realHostUrl': realHostUrl,
          'payHereMerchantId': this.payHereMID
        };
      }
      //  else if(this.user){
      //   this.orderDetails = {
      //     "appId": this.appId,
      //     "registeredUser": 'Unknown User',
      //     "item": this.payInfo.cart,
      //     "amount": this.payInfo.amount,
      //     "customerName": this.payInfo.item.deliverDetails.name,
      //     "telNumber": this.payInfo.item.deliverDetails.number,
      //     "tax": this.payInfo.taxTotal,
      //     "pickupId": this.payInfo.item.pickupId,
      //     "pickupCost": this.chkPickupCost,
      //     "email": this.payInfo.item.deliverDetails.email,
      //     "currency": this.dataService.currency,
      //     "promotionCode": this.payInfo.promotionCode,
      //     'note': note,
      //     'paymentType': 'Cash on pickup'
      //   }
      // }
    }
    this.http.post(SERVER_URL + "/templatesOrder/savePendingOrder", this.orderDetails, { responseType: 'json' })
      .subscribe((orderRes: any) => {
        this.responce = orderRes.name;
        this.orderDetails['orderId'] = orderRes.id;
        this.orderDetails['appId'] = orderRes.appId;

        if (orderRes.status == 404) {
          this.showSpinner = false;
          $('#myModal').modal('show');
        } else if (orderRes.message === 'INTERNAL_SERVER_ERROR') {

          this.showSpinner = false;
          this._success.subscribe((message) => this.errorMessage = message);
          debounceTime.call(this._success, 4000).subscribe(() => this.errorMessage = null);
          this._success.next(orderRes.description);
          setTimeout(() => { }, 3100);
        }  else if (orderRes.message === 'NOT_FOUND') {

          this.showSpinner = false;
          this._success.subscribe((message) => this.errorMessage = message);
          debounceTime.call(this._success, 4000).subscribe(() => this.errorMessage = null);
          this._success.next(orderRes.description);
          setTimeout(() => { }, 3100);
        } else if (orderRes.message === 'EMAIL_EXISTS') {

          this.showSpinner = false;
          this._success.subscribe((message) => this.errorMessage = message);
          debounceTime.call(this._success, 4000).subscribe(() => this.errorMessage = null);
          this._success.next(orderRes.description);
          setTimeout(() => { }, 3100);
        } else {
          this.http.post(SERVER_URL + "/templatesInventory/updateInventory", this.payInfo.cart, {responseType: 'text'})
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
                } else {
                  this.localStorageService.remove("cartUnknownUser");
                }

                this.http.post(
                  SERVER_URL + '/mobile/getPayHereForm/', this.orderDetails, {responseType: 'text'})
                .subscribe((res) => {
                  this.payHereUrl = res;
                  $('#payhereProcessModal').modal({backdrop: 'static', keyboard: false});
                 },
                 (err) => {
                    console.log(err);
                 });

              },
              (err) => {
                console.log(err);
              });
        }
      },
      (err) => {
        console.log(err);
      });
  }

  onPromoTypeSelect(e){
    //don't remove this function
  }

	changePromocode(selectedPromo){
    // console.log(selectedPromo)

		this.amount = this.subTotal;

		this.discountedTotal = 0;
		this.selectedPromo = this.promos.filter(
		  promo => promo.promoCode === selectedPromo);

		// console.log(this.selectedPromo[0]);

    if(!this.selectedPromo[0]){
       this._success.subscribe((message) => this.promoCodeWarningMessage = message);
        debounceTime.call(this._success, 4000).subscribe(() => this.promoCodeWarningMessage = null);
        this._success.next('Invalid promocode');
        setTimeout(() => { }, 3100);
    }else{
      if(this.selectedPromo[0].minimumOderValue && this.selectedPromo[0].minimumOderValue > this.subTotal){
        this._success.subscribe((message) => this.promoCodeWarningMessage = message);
        debounceTime.call(this._success, 4000).subscribe(() => this.promoCodeWarningMessage = null);
        this._success.next('minimum order value should be more than '+this.sign+' '+ this.selectedPromo[0].minimumOderValue+ ' to activate this promocode');
        setTimeout(() => { }, 3100);
        this.selectedPromo = null;
        var promoSelect = document.getElementById("promoSelect") as HTMLSelectElement;
        if(promoSelect){
          promoSelect.selectedIndex = 0;
        }
      }else{
        if(selectedPromo == 'Select a promocode'){
          this.discountedTotal = null;
          this.amount = this.subTotal;
          this.selectedPromo = null;
        }else if(this.selectedPromo[0].discountType === 'discountValue'){
            if(this.amount < this.selectedPromo[0].discount){
                this.discountedTotal = 0;
                this.amount = this.discountedTotal;
            }else{
              this.discountedTotal = this.amount - this.selectedPromo[0].discount;
              this.amount = this.discountedTotal;
            }
        }else if(this.selectedPromo[0].discountType === 'discount'){
          this.discountedTotal = this.amount - (this.amount * this.selectedPromo[0].discountPercent / 100);
          this.amount = this.discountedTotal;
        }

        this.calculateTotalOrderCost();
      }
    }




	}

	calculateTotalOrderCost(){

		    var total = this.amount;
        // var amount = 0;
        var tax = 0;
        // for (var i = 0; i < this.cartItems.length; i++) {
          // var product = this.cartItems[i];
          // amount = product.total;
          // total += (amount * product.qty);
        // }
        // $log.debug($scope.isApplyShippingCharge);
        if (this.isApplyShippingCharge == true && this.formType != 'pickup') {
          // $log.debug($scope.shippingCost);
          var shipping = parseFloat(this.chkShippingCost);
          if(total == 0){
            total = this.subTotal;
          }
          total = total + shipping;
          tax = total * this.chkTax / 100;
          this.taxTotal = total * this.chkTax / 100;
          this.taxTotal = (Math.round(this.taxTotal * 100) / 100);
           if(this.selectedPromo != null && this.discountedTotal == 0){
            total = this.discountedTotal + shipping;
          }
          if (tax > 0) {
            total = total + tax;
            this.totalPrice = total;
            this.totalPrice = Math.round(this.totalPrice * 100) / 100;
          } else {
            this.cart.totalPrice = Math.round(total * 100) / 100;
          }
        } else {
          if(total == 0){
            total = this.subTotal;
          }
          tax = total * this.chkTax / 100;
          this.taxTotal = total * this.chkTax / 100;
          this.taxTotal = (Math.round(this.taxTotal * 100) / 100);

          if (!this.finalDetails.pickupCost || this.finalDetails.pickupCost == 0) {
            this.chkPickupCost = 0;
          } else {
            this.chkPickupCost = parseFloat(this.finalDetails.pickupCost);
          }
          if(this.selectedPromo != null &&  this.discountedTotal == 0){
            total = this.discountedTotal;
          }
          if (tax > 0) {
            total = total + tax;
            if (this.chkPickupCost == 0) {
              if (this.chkShippingCost) {
                this.totalPrice = total + parseFloat(this.chkShippingCost);
                this.totalPrice = (Math.round(this.totalPrice * 100) / 100);
              } else {
                this.totalPrice = total;
                this.totalPrice = (Math.round(this.totalPrice * 100) / 100);
              }
            } else {
              this.totalPrice = total + parseFloat(this.chkPickupCost);
              this.totalPrice = (Math.round(this.totalPrice * 100) / 100);
            }
          } else {
            if (this.chkPickupCost == 0) {
              if (this.chkShippingCost) {
                this.totalPrice = total + parseFloat(this.chkShippingCost);
                this.totalPrice = (Math.round(this.totalPrice * 100) / 100);
              } else {
                this.totalPrice = total;
                this.totalPrice = (Math.round(this.totalPrice * 100) / 100);
              }
            } else {
              this.totalPrice = total + parseFloat(this.chkPickupCost);
              this.totalPrice = (Math.round(this.totalPrice * 100) / 100);
            }
          }
        }
        this.pay("001");
  }
  
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
