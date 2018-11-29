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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// https://ng-bootstrap.github.io/#/getting-started
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// https://angular-maps.com/guides/getting-started/
import { AgmCoreModule } from '@agm/core';
// http://tb.github.io/ng2-nouislider/
import { PagebodyServiceModule } from './page-body/page-body.service';
import { CategoriesService } from './services/categories/categories.service';
import { ProductsService } from './services/products/products.service';
import { AppDataService } from './services/appdata-info/appdata-info.service';
import { TitleService } from './services/title.service';
import { SubscribedDataService } from './services/subscribed-data/subscribed-data.service'
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {SMSService} from "./services/cordova-plugin-services/sms.service";
import {CordovaPluginFirebaseService} from "./services/cordova-plugin-services/cordova-plugin-firebase.service";
import {CordovaPluginDeviceService} from "./services/cordova-plugin-services/cordova-plugin-device.service";
import {MessageService} from "./services/message.service";
import { ParentJWTService } from './services/parent.jwt.service';
import { APIHandlerService } from './services/auth/api.handler.service';
import { AuthenticatorService } from './services/auth/authenticator.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,HttpModule,
    AddonsModule,
    PageBodyModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBanVJ_9ViC-HeJruJzhetGXUERg1eYXag'
    }),
    Ng4LoadingSpinnerModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [PagebodyServiceModule,
    CategoriesService,
    ProductsService,
    AppDataService,
    TitleService,
    SubscribedDataService,
    SMSService,
    CordovaPluginFirebaseService,
    CordovaPluginDeviceService,
    MessageService,
    ParentJWTService,
    APIHandlerService,
    AuthenticatorService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
