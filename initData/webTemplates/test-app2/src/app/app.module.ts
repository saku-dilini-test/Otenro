import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AddonsModule } from './addons/addons.module';
import { PageBodyModule } from './page-body/page-body.module';
// https://ng-bootstrap.github.io/#/getting-started
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// https://github.com/mujtaba01/ng2-owl-carousel
import { OwlModule } from 'angular-owl-carousel';
// https://angular-maps.com/guides/getting-started/
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AddonsModule,
    PageBodyModule,
    NgbModule.forRoot(),
    OwlModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCoIor1Q1dpEf57CudzEk4rS7XIzAxR8jc'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
