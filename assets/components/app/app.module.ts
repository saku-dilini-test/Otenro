import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, RequestOptions }  from '@angular/http';
import { DefaultRequestOptions } from './requestoption.service';
import { UpgradeModule } from '@angular/upgrade/static';

import { AppComponent }  from './app.component';
import { MyAppComponent }  from './myapp.component';


@NgModule({
  imports:      [ 
    BrowserModule,
    HttpModule,
    UpgradeModule
  ],
  declarations: [ 
    AppComponent,
    MyAppComponent
  ],  
  providers: [ { provide: RequestOptions, useClass: DefaultRequestOptions }]
})

export class AppModule { 
  ngDoBootstrap() {}
}