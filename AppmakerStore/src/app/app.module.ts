import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppCardComponent } from './app-card/app-card.component';
import { AppDetailsComponent } from './app-details/app-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppCardComponent,
    AppDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
