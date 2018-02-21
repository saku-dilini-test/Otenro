import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { CurrencyService } from '../../services/currency/currency.service';
import { ShippingService } from '../../services/shipping/shipping.service';
import { OrdersService } from '../../services/orders/orders.service';
import { TitleService } from '../../services/title.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

declare let paypal: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './app/page-body/checkout/checkout.component.html',
  styleUrls: ['./app/page-body/checkout/checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage: string;
  complexForm : FormGroup;

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
  public orderDetails;
  public orderd = false;
  private years = [];
  private months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  private emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(fb: FormBuilder,private ordersService : OrdersService,
    private shippingService: ShippingService,
    private currencyService :CurrencyService,
    private localStorageService: LocalStorageService,
     private http: HttpClient, private route: ActivatedRoute,
     private router: Router, private dataService: PagebodyServiceModule, private title: TitleService) {

    this.title.changeTitle("Checkout");

    this.complexForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'fName' : new FormControl(this.dataService.userData.name,Validators.compose([Validators.required])),
      'lName': new FormControl (this.dataService.userData.lname,Validators.compose([Validators.required])),
      'email' : new FormControl(this.dataService.userData.email,Validators.compose([Validators.required,Validators.pattern(this.emailPattern)])),
      'phone' : new FormControl(this.dataService.userData.phone,Validators.compose([Validators.required,Validators.pattern(/^[().+\d -]{10,15}$/)])),
      'streetNo' : new FormControl(this.dataService.userData.streetNumber,Validators.compose([Validators.required])),
      'streetName' : new FormControl(this.dataService.userData.streetName,Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z ]*$/)])),
      'city': new FormControl(this.dataService.userData.city,Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z ]*$/)])),
      'zip' : new FormControl(this.dataService.userData.zip,Validators.compose([Validators.required,Validators.pattern(/^\d+$/)])),
      'country' : new FormControl(null)

    })
    this.complexForm.controls['country'].setValue(this.dataService.userData.country, {onlySelf: true});

  }

  ngOnInit() {

let date = (new Date()).getFullYear()
    for( let i=0;i<100;i++){
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
      });

    if (this.cartItems.length > 0 && this.formType == 'delivery') {

      this.isAdded = true;


    }
    this.localData = (this.localStorageService.get('appLocalStorageUser' + this.appId));

    if (this.localData == null) {
      this.router.navigate(['login'])
    }


    this.hide = true;

    var param = {
      'appId': this.appId,
      'country': this.dataService.userData.country
    };

    this.http.post(SERVER_URL + '/templatesOrder/getTaxInfoByCountry', param).subscribe((data) => {
      if (data == '') {
        this.hide = true;
        this.tax = 0;
      } else {
        this.tax = data[0].taxAmount;
        this.hide = false;
      }
    })

    this.currencyService.getCurrencies().subscribe((data) => {
      this.currency = data;
      this.sign = this.currency.sign;
      this.dataService.currency = this.sign;
      this.dataService.paypalCurrency = this.currency.currency;
    }, error => {
      alert('error currency');

    });

    this.user = (this.localStorageService.get('appLocalStorageUser' + this.appId));

    // get the shipping options
    var param2 = {
      'appId': this.appId,
      'country': this.dataService.userData.country
    };
    if (this.formType == 'delivery') {
      this.http.post(SERVER_URL + "/edit/getShippingInfoByCountry", param2)
        .subscribe((data) => {
            this.shippingDatas = data;
            // $log.debug($scope.shippingData);
            for (var i = 0; i < this.shippingDatas.length; i++) {
              if (this.shippingDatas[i].shippingOption == "Flat Rate" ||
                this.shippingDatas[i].shippingOption == "Weight Based") {
                this.shippingData.push(this.shippingDatas[i]);
              }
            }
          },
          function (err) {
            alert(
              'Policies Data loading error,Please check your connection!'
            );
          });
    }else{

      this.shippingService.getShippingPickupInfo()
      .subscribe((data) => {

          this.pickup = data;

          /* $scope.header = data.header;
          $scope.content = data.content;*/
          //$state.go('app.category');
        },
        function (err) {
          alert(
            'Policies Data loading error!,Please check your connection!'
          );
        });
    }
    this.amount = this.getTotal();


    // -------------------pickup--------------------------------------------




  }



  getTotal() {
    var total = 0;
    var amount = 0;
    var tax = 0;
    for (var i = 0; i < this.cartItems.length; i++) {
      var product = this.cartItems[i];
      amount = product.total;
      total += (amount);
    }
    tax = total * this.tax / 100;
    this.taxTotal = total * this.tax / 100;
    if (tax > 0) {
      total = total + tax;
      this.dataService.cart.totalPrice = total;
      return total;
    } else {
      this.dataService.cart.totalPrice = total;
      return total;
    }
  };


  addShipping(shippingDetails,e,test) {

    this.fname = test.fName;
    this.lname = test.lName;
    this.email = test.email;
    this.phone = test.phone;
    this.country = test.country;
    this.city = test.country;
    this.streetName = test.streetName;
    this.streetNumber = test.streetNumber;
    this.zip = test.zip;

    console.log(shippingDetails)
    console.log(e)
    console.log(test)

    this.isSelected = true;
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

    // this.dataService.finalDetails = shippingDetails;
    this.chk(shippingDetails);

    setTimeout(()=>{ this.pay("001"); }, 500);


  }


  //------------------------------pickup---------------------------------------



  checkout(data,details,form) {
    console.log(form);
    this.isSelected = true;
    this.pickupData = {
      item: this.dataService.deliverItems,
      delivery: { location: "Pick up", method: "Pick up" },
      pickupId: data.id,
      pickupCost: data.cost,
      deliverDetails: { name: details.name, number: details.phone },

    }
    this.chk(this.pickupData);
    setTimeout(() => { this.pay("001"); }, 500);
  };

checkForm(asd){
  this.isSelected = false;
  var deliver = <HTMLInputElement>document.getElementById('delivery');
  deliver.checked = false;

  var pickup = <HTMLInputElement>document.getElementById('pickup');
  pickup.checked = false;
}
  //------------------------------checkout---------------------------------------
  chk(final) {

    this.finalDetails = final;
    this.chkShippingCost = this.finalDetails.shippingCost;
    // $log.debug(totalWeight);
    // $log.debug(shippingCost);
    // $log.debug(shippingDetails.shipping);
    // $log.debug(this.dataService.cart.cartItems);
    // $state.go('app.checkout',{item:shippingDetails});
    this.underWeight = this.finalDetails.underWeight;
    this.overWeight = this.finalDetails.overWeight;

    // this.shippingCost = this.dataService.data.shippingCost;

    if (typeof this.chkShippingCost == 'undefined') {
      this.hideShipping = false;
    }

    // if (this.finalDetails.delivery.location == "old" || this.finalDetails.item.delivery.location == "Pick up") {
    //   this.chkCountry = this.localData.country;
    // } else {
    //   this.chkCountry = this.finalDetails.delivery.country;
    // }

    this.chkCountry = this.localData.country;

    var param = {
      'appId': this.appId,
      'country': this.chkCountry
    };


    this.http.post(SERVER_URL + '/templatesOrder/getTaxInfoByCountry', param)
      .subscribe((data) => {


        if (data == '') {
          this.chkHide = true;
          this.chkTax = 0;
          this.isApplyShippingCharge = false;
        } else {
          this.chkTax = data[0].taxAmount;
          this.isApplyShippingCharge = data[0].isApplyShippingCharge;
          this.chkHide = false;
        }
        var total = 0;
        var amount = 0;
        var tax = 0;
        for (var i = 0; i < this.cartItems.length; i++) {
          var product = this.cartItems[i];
          amount = product.total;
          total += (amount * product.qty);
        }
        // $log.debug($scope.isApplyShippingCharge);
        if (this.isApplyShippingCharge == true && this.formType != 'pickup') {
          // $log.debug($scope.shippingCost);
          var shipping = parseInt(this.chkShippingCost);
          total = total + shipping;
          tax = total * this.chkTax / 100;
          this.taxTotal = total * this.chkTax / 100;
          if (tax > 0) {
            total = total + tax;
            this.totalPrice = total;
          } else {
            this.cart.totalPrice = total;
          }
        } else {
          tax = total * this.chkTax / 100;
          this.taxTotal = total * this.chkTax / 100;
          if (!this.finalDetails.pickupCost || this.finalDetails.pickupCost == 0) {
            this.chkPickupCost = 0;
          } else {
            this.chkPickupCost = this.finalDetails.pickupCost;
          }
          if (tax > 0) {
            total = total + tax;
            if (this.chkPickupCost == 0) {
              if (this.chkShippingCost) {
                this.totalPrice = total + this.chkShippingCost;
              } else {
                this.totalPrice = total;
              }
            } else {
              this.totalPrice = total + parseInt(this.chkPickupCost);
            }
          } else {
            if (this.chkPickupCost == 0) {
              if (this.chkShippingCost) {
                this.totalPrice = total + this.chkShippingCost;
              } else {
                this.totalPrice = total;
              }            } else {
              this.totalPrice = total + parseInt(this.chkPickupCost);
            }
          }
        }

      });





  }

  pay(promotionCode) {

    this.payInfo = {
      'item': this.finalDetails,
      'taxTotal': this.taxTotal,
      'cart': this.dataService.cart.cartItems,
      'userEmail': this.localData.email,
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
    this.history = (this.localStorageService.get("history" + this.appId + this.user.registeredUser));

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
      }), function (err) {
        alert('warning Unable to get Products Selected Category');
      };

    this.cardType = {};
    this.card = {
      amount: paymentParams.amount
    };

    // this.makeStripePayment = this.makeStripePaymentMethod('');
    // this.authorizeCreditCard = this.authorizeCreditCardMethod('');

  }


  submit(data, type) {

    if (type == 'creditcard') {
      this.makeStripePaymentMethod(data);
    } else {
      this.authorizeCreditCardMethod(data);
    }

  }

  makeStripePaymentMethod(cardInformation) {

    cardInformation.amount = this.card.amount;
    cardInformation.appId = this.appId;
    cardInformation.userId = this.userId;
    this.http.post(SERVER_URL + '/templates/makeStripePayment', cardInformation)

      .subscribe((res: any) => {

        if (res.status == 'succeeded') {
          this.orderProcess();
        } else {
          console.log("makeStripePayment failed");

        }
      },  (err)=> {
        alert('makeStripePayment failed');
      })

  };

  authorizeCreditCardMethod(cardInformation) {

    cardInformation.amount = this.card.amount;
    cardInformation.appId = this.appId

    this.http.post(SERVER_URL + "/templateController/authorizeNetPay", cardInformation)
      .subscribe((res:any) => {
        // var alertPopup = $ionicPopup.alert({
        //     subTitle: res.data.data,
        //     cssClass: 'ionicPopUp',
        //     buttons:[
        //         {text:'OK',
        //             type:'made-easy-button-setting'},
        //     ]
        // });
        if (res.status == 'ok') {
          this.orderProcess();
        }
      }, function (err) {
        alert('authorizeCreditCard' + err)
      })
  }

  orderProcess() {
    if (this.formType == "delivery") {

      this.orderDetails = {
        'appId': this.appId,
        'registeredUser': this.user.registeredUser,
        'item': this.payInfo.cart,
        'amount': this.payInfo.amount,
        'customerName': this.user.name,
        'deliverName': this.fname,
        'deliveryNo': this.streetNumber,
        'deliveryStreet': this.streetName,
        'deliveryCity': this.city,
        'deliveryCountry': this.country,
        'deliveryZip': this.zip,
        'telNumber': this.phone,
        'tax': this.payInfo.taxTotal,
        'shippingCost': this.payInfo.shippingCost,
        'shippingOpt': this.payInfo.item.shippingOption,
        'email': this.payInfo.userEmail,
        'currency': this.dataService.paypalCurrency,
        'puckupId':null,
        'promotionCode': this.payInfo.promotionCode
      };
    }
    else {
      this.orderDetails = {
        "appId": this.appId,
        "registeredUser": this.user.registeredUser,
        "item": this.payInfo.cart,
        "amount": this.payInfo.amount,
        "customerName": this.payInfo.item.deliverDetails.name,
        "telNumber": this.payInfo.item.deliverDetails.number,
        "tax": this.payInfo.taxTotal,
        "shippingCost": this.payInfo.shippingCost,
        "pickupId": this.payInfo.item.pickupId,
        "email": this.payInfo.userEmail,
        "currency": this.dataService.paypalCurrency,
        "promotionCode": this.payInfo.promotionCode
      }
    }

    this.http.post(SERVER_URL + "/templatesOrder/saveOrder", this.orderDetails,{responseType: 'text'})
      .subscribe((res) => {
          this.orderDetails.id = this.dataService.cart.cartItems[0].id;
          this.http.post(SERVER_URL + "/templatesInventory/updateInventory", this.pickupData.cart,{responseType: 'text'})
            .subscribe((res) => {
                this.dataService.cart.cartItems = [];
                this.dataService.cart.cartSize = 0;
                this.dataService.parentobj.cartSize = this.dataService.cart.cartSize;
                this.dataService.cart.totalPrice = 0;
                this.dataService.cart.totalQuantity = 0;

                //Pushing into order purchase history
                if (this.localStorageService.get("history" + this.appId + this.user.registeredUser) != null) {
                  this.orderHistory = (this.localStorageService.get("history" + this.appId + this.user.registeredUser));
                }
                this.orderHistory.push({
                  orderHistoryKey: this.appId,
                  createdDate: new Date(),
                  item: this.payInfo.cart,
                  amount: this.payInfo.amount,
                });

                this.localStorageService.set("history" + this.appId + this.user.registeredUser, (this.orderHistory));

                alert({
                  title: 'Thank You',
                  subTitle: 'Your Order has been successfully processed',
                  cssClass: 'ionicPopUp',
                  buttons: [
                    {
                      text: 'OK',
                      type: 'made-easy-button-setting'
                    },
                  ]
                });
                // TODO : Currently back to cart
                //back to Main Menu
                this.router.navigate(['home']);
              },
              function (err) {
                console.log(err);
              });
        },
        function (err) {
          console.log(err);
        });
  }


  confirmCashPayment() {
    if (this.formType == "delivery") {
      this.orderDetails = {
        'appId': this.appId,
        'registeredUser': this.user.registeredUser,
        'item': this.payInfo.cart,
        'amount': this.payInfo.amount,
        'customerName': this.user.name,
        'deliverName': this.fname,
        'deliveryNo': this.streetNumber,
        'deliveryStreet': this.streetName,
        'deliveryCity': this.city,
        'deliveryCountry': this.country,
        'deliveryZip': this.zip,
        'telNumber': this.phone,
        'tax': this.payInfo.taxTotal,
        'shippingCost': this.payInfo.shippingCost,
        'shippingOpt': this.payInfo.item.shippingOption,
        'email': this.payInfo.userEmail,
        'currency': this.dataService.currency,
        'puckupId':null,
        'promotionCode': this.payInfo.promotionCode
      };

    }
    else {
      this.orderDetails = {
        "appId": this.appId,
        "registeredUser": this.user.registeredUser,
        "item": this.payInfo.cart,
        "amount": this.payInfo.amount,
        "customerName": this.payInfo.item.deliverDetails.name,
        "telNumber": this.payInfo.item.deliverDetails.number,
        "tax": this.payInfo.taxTotal,
        "shippingCost": this.payInfo.shippingCost,
        "pickupId": this.payInfo.item.pickupId,
        "email": this.payInfo.userEmail,
        "currency": this.dataService.currency,
        "promotionCode": this.payInfo.promotionCode
      }
    }

    this.http.post(SERVER_URL + "/templatesOrder/saveOrder", (this.orderDetails),{responseType: 'text'})
      .subscribe((res) => {
        this.orderDetails.id = this.dataService.cart.cartItems[0].id;
          this.http.post(SERVER_URL + "/templatesInventory/updateInventory", this.payInfo.cart,{responseType: 'text'})
            .subscribe(res => {
              this.dataService.cart.cartItems = [];
              this.dataService.cart.cartSize = 0;
              this.dataService.parentobj.cartSize = this.dataService.cart.cartSize;
              this.dataService.cart.totalPrice = 0;
              this.dataService.cart.totalQuantity = 0;

              //Pushing into order purchase history
              if ((this.localStorageService.get("history" + this.appId + this.user.registeredUser)) != null) {
                this.orderHistory = (this.localStorageService.get("history" + this.appId + this.user.registeredUser));
              }
              this.orderHistory.push({
                orderHistoryKey: this.appId,
                createdDate: new Date(),
                item: this.payInfo.cart,
                amount: this.payInfo.amount,
              });

              this.localStorageService.set("history" + this.appId + this.user.registeredUser, (this.orderHistory));

              this._success.next('Your Order has been successfully processed');

              this._success.subscribe((message) => this.successMessage = message);
              debounceTime.call(this._success, 3000).subscribe(() => this.successMessage = null);
              this._success.next("Thank You, Your order has been successfully processed");
              setTimeout(()=>{this.router.navigate(['home']); }, 3100)

            },
             (err)=> {
              console.log(err);
            });
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
          console.log(err);
        });
  }

  // Buy With PayPal
  buyWithPayPal() {
        if (this.formType == "delivery") {
          this.orderDetails = {

            'appId': this.appId,
            'registeredUser': this.user.registeredUser,
            'item': this.payInfo.cart,
            'amount': this.payInfo.amount,
            'customerName': this.user.name,
            'deliverName': this.fname,
            'deliveryNo': this.streetNumber,
            'deliveryStreet': this.streetName,
            'deliveryCity': this.city,
            'deliveryCountry': this.country,
            'deliveryZip': this.zip,
            'telNumber': this.phone,
            'tax': this.payInfo.taxTotal,
            'shippingCost': this.payInfo.shippingCost,
            'shippingOpt': this.payInfo.item.shippingOption,
            'email': this.payInfo.userEmail,
            'currency': this.dataService.paypalCurrency,
            'puckupId':null,
            'promotionCode': this.payInfo.promotionCode
          };
        }
        else {
          this.orderDetails = {
            "appId": this.appId,
            "registeredUser": this.user.registeredUser,
            "item": this.payInfo.cart,
            "amount": this.payInfo.amount,
            "customerName": this.payInfo.item.deliverDetails.name,
            "telNumber": this.payInfo.item.deliverDetails.number,
            "tax": this.payInfo.taxTotal,
            "shippingCost": this.payInfo.shippingCost,
            "pickupId": this.payInfo.item.pickupId,
            "email": this.payInfo.userEmail,
            "currency": this.dataService.paypalCurrency,
            "promotionCode": this.payInfo.promotionCode
          }
        }

    this.dataService.payPalDetails = this.orderDetails;

  }

  countryChanged(data) {
    console.log(data)
    this.isSelected = false;
  }


}
