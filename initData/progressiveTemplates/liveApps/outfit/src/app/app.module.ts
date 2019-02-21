import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AddonsModule } from './addons/addons.module';
import { PageBodyModule } from './page-body/page-body.module';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './page-body/register/register.component';
import { LoginComponent } from './page-body/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// https://ng-bootstrap.github.io/#/getting-started
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// https://github.com/mujtaba01/ng2-owl-carousel
import { OwlModule } from 'angular-owl-carousel';
// https://angular-maps.com/guides/getting-started/
import { AgmCoreModule } from '@agm/core';
import { PagebodyServiceModule } from './page-body/page-body.service';
import { LocalStorageModule } from 'angular-2-local-storage';
import { GithubAuthInterceptor } from './githubauth.interceptor';
import { OrderHistoryComponent } from './page-body/order-history/order-history.component';
import { PaypalPaymentComponent } from './page-body/paypal-payment/paypal-payment.component';
import { CheckoutComponent } from './page-body/checkout/checkout.component';
import { PushNotificationService } from './services/push-notification.service';
import { CategoriesService } from './services/categories/categories.service';
import { ProductsService } from './services/products/products.service';
import { CountryDataService } from './services/country-data/country-data.service';
import { CurrencyService } from './services/currency/currency.service';
import { TaxService } from './services/tax/tax.service';
import { ShippingService } from './services/shipping/shipping.service';
import { AppDataService } from './services/appdata-info/appdata-info.service';
import { OrdersService } from './services/orders/orders.service';
import { SliderService } from './services/slider/slider.service';
import { TitleService } from './services/title.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ISailsClientConfig, SailsClientModule } from "ngx-sails";
import { SERVER_URL } from './constantsService';

const socketConfig: ISailsClientConfig = { uri: SERVER_URL };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    OrderHistoryComponent
  ],
  imports: [
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
  }),

    BrowserModule,
    FormsModule,
    HttpClientModule,HttpModule,
    AddonsModule,
    PageBodyModule,
    NgbModule.forRoot(),
    OwlModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBanVJ_9ViC-HeJruJzhetGXUERg1eYXag'
    }),
    BrowserAnimationsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule,
    SailsClientModule.configureClient(socketConfig)
  ],
  providers: [PagebodyServiceModule,PushNotificationService,
    CategoriesService,
    ProductsService,
    CountryDataService,
    CurrencyService,
    TaxService,
    ShippingService,
    AppDataService,
    OrdersService,
    SliderService,{
      provide: HTTP_INTERCEPTORS,
      useClass: GithubAuthInterceptor,
      multi: true,
    },
    TitleService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
