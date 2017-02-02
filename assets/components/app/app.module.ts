import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, RequestOptions }  from '@angular/http';
import { DefaultRequestOptions } from './requestoption.service'


import { AppComponent }  from './app.component';


@NgModule({
  imports:      [ 
    BrowserModule,
    HttpModule
  ],
  declarations: [ 
    AppComponent
  ],
  bootstrap:    [
     AppComponent
  ],
  providers: [ { provide: RequestOptions, useClass: DefaultRequestOptions }]
})
export class AppModule { }