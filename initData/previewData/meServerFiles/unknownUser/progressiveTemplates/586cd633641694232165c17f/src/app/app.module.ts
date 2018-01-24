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
// http://tb.github.io/ng2-nouislider/
import { NouisliderModule } from 'ng2-nouislider';
import { PagebodyServiceModule } from './page-body/page-body.service';
import { LocalStorageModule } from 'angular-2-local-storage';
import { GithubAuthInterceptor } from './githubauth.interceptor';
import { OrderHistoryComponent } from './page-body/order-history/order-history.component';
import { PaypalPaymentComponent } from './page-body/paypal-payment/paypal-payment.component';
import { CheckoutComponent } from './page-body/checkout/checkout.component';
import { PushNotificationService } from './services/push-notification.service';

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
    NouisliderModule,
    BrowserAnimationsModule,
  ],
  providers: [PagebodyServiceModule,PushNotificationService,{
    provide: HTTP_INTERCEPTORS,
    useClass: GithubAuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
