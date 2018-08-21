import { Component, AfterViewChecked } from '@angular/core';
import { SERVER_URL } from '../../../assets/constantsService';
import * as data from '../../../assets/madeEasy.json';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';

declare let paypal: any;

@Component({
  selector: 'app-paypal-payment',
  templateUrl: './paypal-payment.component.html',
  styleUrls: ['./paypal-payment.component.css']
})
export class PaypalPaymentComponent implements AfterViewChecked {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private localData;
  private user;
  private description = '';
  orderHistory = [];
  env = this.dataService.env;
  private sandBoxKey = this.dataService.paypalKey;
  private productionKey = this.dataService.paypalKey;
  private _success = new Subject<string>();
  successMessage: string;

  constructor(private localStorageService: LocalStorageService, private http: HttpClient, private route: ActivatedRoute, private router: Router, private dataService: PagebodyServiceModule) {
    this.localData = (this.localStorageService.get('appLocalStorageUser' + this.appId));
    this.user = (this.localStorageService.get('appLocalStorageUser' + this.appId));

    console.log("pre env : " + this.dataService.env)
    console.log("currency : " + this.dataService.paypalCurrency)

    if (this.dataService.env == 'sandbox') {
      this.paypalConfig.client.production = 'xxxxxxxx';
      this.productionKey = 'xxxxxxxx';
      this.sandBoxKey = this.dataService.paypalKey;

    } else if (this.dataService.env == 'live') {
      this.paypalConfig.client.sandbox = 'xxxxxxxx';
      this.sandBoxKey = 'xxxxxxxx';
      this.productionKey = this.dataService.paypalKey;
    }

    for (let i = 0; i < this.dataService.cart.cartItems.length; i++) {
      // this.description.push(this.dataService.cart.cartItems[i].name);
      this.description = this.description + this.dataService.cart.cartItems[i].name + ',\n';
    }
    console.log(this.description);

  }

  title = 'app';

  public didPaypalScriptLoad: boolean = false;
  public loading: boolean = true;

  public paypalConfig: any = {
    env: this.dataService.env,
    client: {
      sandbox: this.sandBoxKey,
      production: this.productionKey,
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {
              amount: { total: this.dataService.payPalDetails.amount, currency: this.dataService.paypalCurrency },
              description: this.description
            }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then(() => {

        this.http.post(SERVER_URL + "/templatesOrder/saveOrder", this.dataService.payPalDetails, { responseType: 'text' })
          .subscribe((res) => {
            console.log("inside web save");
            this.dataService.payPalDetails.id = this.dataService.cart.cartItems[0].id;
            this.http.post(SERVER_URL + "/templatesInventory/updateInventory", this.dataService.payPalDetails.item, { responseType: 'text' })
              .subscribe((res) => {
                console.log("inside web update");
                this.dataService.cart.cartItems = [];
                this.dataService.cart.cartSize = 0;
                this.dataService.parentobj.cartSize = this.dataService.cart.cartSize;
                this.dataService.cart.totalPrice = 0;
                this.dataService.cart.totalQuantity = 0;
                this.dataService.payPalDetails = {};

                let appUser: any = this.localStorageService.get('appLocalStorageUser' + this.appId)

                if (appUser) {
                  if (this.localStorageService.get("cart" + appUser.registeredUser)) {
                    this.localStorageService.remove("cart" + appUser.registeredUser);
                  }
                }else{
                  this.localStorageService.remove("cartUnknownUser");
                }
                //Pushing into order purchase history
                // if ((this.localStorageService.get("history" + this.appId + this.user.registeredUser)) != null) {
                //   this.orderHistory = (this.localStorageService.get("history" + this.appId + this.user.registeredUser));
                // }
                // this.orderHistory.push({
                //   orderHistoryKey: this.appId,
                //   createdDate: new Date(),
                //   item: this.dataService.payPalDetails.item,
                //   amount: this.dataService.payPalDetails.amount,
                // });
                // this.localStorageService.set("history" + this.appId + this.user.registeredUser, (this.orderHistory));

                this._success.next('Your Order has been successfully processed');

                this._success.subscribe((message) => this.successMessage = message);
                debounceTime.call(this._success, 3500).subscribe(() => this.successMessage = null);
                this._success.next("Thank You, Your order has been successfully processed");
                setTimeout(() => { this.router.navigate(['home']); }, 3100)

              }, (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                  console.log("Error Updating Inventory!\n Please check your connection.");
                } else {
                  console.log("Server-side error occured.");
                }
                console.log(err);
              });
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log("Error Processing order!\n Please check your connection.");
            } else {
              console.log("Server-side error occured.");
            }
            console.log(err);
          });

      }, err => {

        window.alert('Transaction Failed!');
      });        // show success page
    },
    onError: function (err) {
      console.log(err);
    }
  };

  public ngAfterViewChecked(): void {
    if (!this.didPaypalScriptLoad) {
      this.loadPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-button');
        this.loading = false;
      });
    }
  }

  public loadPaypalScript(): Promise<any> {
    this.didPaypalScriptLoad = true;
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }
}
