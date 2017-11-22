import { Component, AfterViewChecked } from '@angular/core';

declare let paypal: any;

@Component({
  selector: 'app-paypal-payment',
  templateUrl: './app/page-body/paypal-payment/paypal-payment.component.html',
  styleUrls: ['./app/page-body/paypal-payment/paypal-payment.component.css']
})
export class PaypalPaymentComponent implements AfterViewChecked {

    title = 'app';
  
    public didPaypalScriptLoad: boolean = false;
    public loading: boolean = true;
  
    public paypalConfig: any = {
      env: 'sandbox',
      client: {
        sandbox: 'AWlMGZwpQbS0dq_r2Dt0ejp1TxDm72JD7Pt4Uc2mYlihAE3FU5axxS9wr4HcnVc13gB7TcbYDVLp9Vne',
        production: 'xxxxxxxxxx'
      },
      commit: true,
      payment: (data, actions) => {
        return actions.payment.create({
          payment: {
            transactions: [
              { amount: { total: '1.00', currency: 'CAD' } }
            ],
            // return_url:'cordova-app://',
            // cancel_url:'cordova-app://',
          }
        });
      },
      onAuthorize: (data, actions) => {
        // show success page
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
