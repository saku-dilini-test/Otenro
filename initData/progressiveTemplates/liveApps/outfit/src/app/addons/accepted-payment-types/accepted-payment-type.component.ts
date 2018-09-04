import { Component, OnInit, Input } from '@angular/core';
import { OrdersService } from '../../services/orders/orders.service';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';

@Component({
  selector: 'app-accepted-payment-type',
  templateUrl: './accepted-payment-type.component.html',
  styleUrls: ['./accepted-payment-type.component.css'],
})
export class AcceptedPaymentTypeComponent implements OnInit {
  @Input('paymentTypes') slides: PaymentModel;
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  ipgInfo: any = null;
  imageUrl;
  constructor( private ordersService: OrdersService) {
      this.ordersService.getIPGinfo().subscribe(data => {
          this.ipgInfo = data;
      });
      this.imageUrl = SERVER_URL + '/templates/viewWebImages?userId='
          + this.userId + '&appId=' + this.appId + '&' + new Date().getTime() + '&images=';

  }

  ngOnInit() {
  }
    /**
     * added by .sanira
     * this method will check whether the app creator was enabled any payment method or not
     */
    isIpgInfoExists(): boolean {
        return (
            this.ipgInfo &&
            (this.ipgInfo.paypalEnable ||
            this.ipgInfo.cashOnDeliveryEnable ||
            this.ipgInfo.cashOnPickupEnable ||
            this.ipgInfo.payHereEnable ||
            this.ipgInfo.authorizeNetEnable ||
            this.ipgInfo.stripeEnable ) > 0
        );
    }
}

export class PaymentModel {
	src: string;
	title: string;
}