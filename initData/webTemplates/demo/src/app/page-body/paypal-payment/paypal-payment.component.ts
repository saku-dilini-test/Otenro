import { Component, AfterViewChecked } from '@angular/core';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { Router, ActivatedRoute } from '@angular/router';

declare let paypal: any;

@Component({
  selector: 'app-paypal-payment',
  templateUrl: './app/page-body/paypal-payment/paypal-payment.component.html',
  styleUrls: ['./app/page-body/paypal-payment/paypal-payment.component.css']
})
export class PaypalPaymentComponent implements AfterViewChecked {

  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  public localData;
  public user;
  orderHistory = [];

  constructor(private localStorageService: LocalStorageService, private http: HttpClient, private route: ActivatedRoute, private router: Router, private dataService: PagebodyServiceModule) {
    this.localData = (this.localStorageService.get('appLocalStorageUser' + this.appId));
    this.user = (this.localStorageService.get('appLocalStorageUser' + this.appId));
    
  }

  title = 'app';
  
    public didPaypalScriptLoad: boolean = false;
    public loading: boolean = true;
  
    public paypalConfig: any = {
      env: 'sandbox',
      client: {
        sandbox: 'ARYPRpjZB-YjWT8bvDsymCWhFk4hr5z_1iyG6n92JX6ao63d-CCaTIYePznKnPOuW3PQEbBakkO0f3IL',
        production: 'xxxxxxxxxx'
      },
      commit: true,
      payment: (data, actions) => {
        return actions.payment.create({
          payment: {
            transactions: [
              { amount: { total: this.dataService.payPalDetails.amount, currency: this.dataService.paypalCurrency } }
            ]
          }
        });
      },
      onAuthorize: (data, actions) => {
        return actions.payment.execute().then(()=> {

          this.http.post(SERVER_URL + "/templatesOrder/saveOrder", this.dataService.payPalDetails,{responseType: 'text'})
          .subscribe((res) => {
            console.log("inside web save");
            this.dataService.payPalDetails.id = this.dataService.cart.cartItems[0].id;
              this.http.post(SERVER_URL + "/templatesInventory/updateInventory", this.dataService.payPalDetails.item,{responseType: 'text'})
                .subscribe((res)=> {
                  console.log("inside web update");
                    this.dataService.cart.cartItems = [];
                    this.dataService.cart.cartSize = 0;
                    this.dataService.parentobj.cartSize = this.dataService.cart.cartSize;
                    this.dataService.cart.totalPrice = 0;
                    this.dataService.cart.totalQuantity = 0;
                    this.dataService.payPalDetails = {};

                    //Pushing into order purchase history
                    if ((this.localStorageService.get("history" + this.appId + this.user.registeredUser)) != null) {
                      this.orderHistory = (this.localStorageService.get("history" + this.appId + this.user.registeredUser));
                    }
                    this.orderHistory.push({
                      orderHistoryKey: this.appId,
                      createdDate: new Date(),
                      item: this.dataService.payPalDetails.item,
                      amount: this.dataService.payPalDetails.amount,
                    });
                    this.localStorageService.set("history" + this.appId + this.user.registeredUser, (this.orderHistory));

                    alert('Thank You,  Your Order has been successfully processed');
                    // TODO : Currently back to cart
                    //back to Main Menu
                    this.router.navigate(['home'])
                  },
                  function (err) {
                    console.log(err);
                  });
            },
             (err)=> {
              console.log(err);
            });

      },err=>{

        window.alert('Transaction Failed!');
      });        // show success page
      }
    };
  
    public ngAfterViewChecked(): void {
      if(!this.didPaypalScriptLoad) {
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
